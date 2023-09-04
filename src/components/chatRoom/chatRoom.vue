<template>
  <div class="chat-room">
    <particles-bg type="random" :bg="true" :config="config" />
    <div class="chat-container">
      <div class="header">
        <span class="quit-btn" @click="quitRoom">X</span>
        <div>{{ currentRoom.roomName }}</div>
      </div>
      <div class="online-avatar-container">
        <div
          class="online-avatar-item"
          v-for="(user, key) in currentRoom.onlineUsers.users"
          :key="key"
          :style="realignAvatar(key)"
        >
          <img :src="user.data.avatar" />
        </div>
        <div class="online-amount">
          {{ currentRoom.onlineUsers.users.length }}
        </div>
      </div>
      
      <div class="chat-room-container">
        <div class="chat-room-content" ref="myscroll">
          <div class="message-box" v-for="(message, key) in currentRoom.messages" :key="key" :id="'message-box' + key">
            <div class="message-item">
              <div class="user-name">{{ message.senderNickname }}:</div>
              <div :class="message.senderUserId === currentRoom.currentUser.id ? 'user-message self' : 'user-message'">
                <div v-if="message.type === MessageType.CHAT">{{ message.content }}</div>
                <div v-else-if="message.type === MessageType.PROP">{{ message.content === Prop.HEART ? "送出了一个大大的比心" : "送出了一枚大火箭" }}</div>
                </div>
            </div>
          </div>
        </div>
        <div class="chat-room-action">
          <div class="message-input-box">
            <input
              class="message-input"
              :value="newMessageContent"
              placeholder="说点什么..."
              @keydown="sendMessageByEnter"
              @input="onInputMessage"
            />
            <div
              class="message-btn"
              @click="sendMessage(MessageType.CHAT, newMessageContent)"
            >
              ↑
            </div>
          </div>
          <img
            class="heart"
            @click="sendMessage(MessageType.PROP, Prop.HEART)"
            src="../../../public/static/images/handle-heart.png"
          />
          <img
            class="rocket"
            @click="sendMessage(MessageType.PROP, Prop.ROCKET)"
            src="../../../public/static/images/rocket.png"
          />
        </div>
      </div>
      <div class="show-animation" v-if="propDisplay.play">
        <div class="prop-hearts" v-if="propDisplay.showPropType === Prop.HEART">
          <img
            class="prop-heart"
            v-for="img in 4"
            :key="img"
            src="../../../public/static/images/handle-heart.png"
          />
        </div>
        <img
          class="prop-rocket"
          src="../../../public/static/images/rocket.png"
          v-if="propDisplay.showPropType === Prop.ROCKET"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ParticlesBg } from "particles-bg-vue";
import Vue from 'vue'
export default {
  name: "chatRoom",
  components:{
    ParticlesBg
  },
  data() {
    return {
      config: {
        num: [4, 7],
        rps: 0.1,
        radius: [5, 40],
        life: [1.5, 3],
        v: [2, 3],
        tha: [-30, 30],
        alpha: [0.6, 0],
        scale: [0.1, 0.4],
        position: "all",
        cross: "dead",
        random: 15,
      },
      currentRoom: {
        roomId: null,
        roomName: null,
        onlineUsers: {
          amount: 0,
          users: [],
        },
        messages: [],
        currentUser: {
          id: null,
          nickname: null,
          avatar: null,
        },
      },
      propDisplay: {
        showPropType: 0,
        play: false,
        timer: null,
      },
      newMessageContent: "",
      Prop: {
        HEART: 0, //桃心
        ROCKET: 1, //火箭
      },
      MessageType: {
        CHAT: 0, //文字聊天
        PROP: 1, //道具
      },
    };
  },
  async mounted() {
    const roomToken = this.$route.query;
    this.currentRoom.roomId = roomToken.roomId;
    this.currentRoom.roomName = roomToken.roomName;
    this.currentRoom.currentUser = {
      id: roomToken.userId,
      nickname: roomToken.nickname,
      avatar: roomToken.avatar,
    };
    // 连接goEasy
    this.connectGoEasy();

    // 监听用户上下线
    await this.listenUsersOnlineOffline();

    // 监听新消息
    this.listenNewMessage();
    // 加载最后10条消息历史
    this.loadHistory();

    // 加载在线用户列表
    await this.loadOnlineUsers();
  },
  beforeDestroy() {
    this.quitRoom();
  },
  methods: {
    // 连接goEasy
  connectGoEasy() {
    const userData = {
      avatar: this.currentRoom.currentUser.avatar,
      nickname: this.currentRoom.currentUser.nickname
    }
    this.goEasy.connect({
      id: this.currentRoom.currentUser.id,
      data: userData,
      onSuccess: function () {
        console.log("GoEasy connect successfully.");
      },
      onFailed: function (error) {
        console.log("Failed to connect GoEasy, code:" + error.code + ",error:" + error.content);
      },
      onProgress: function (attempts) {
        console.log("GoEasy is connecting", attempts);
      }
    });
  },
  // 监听用户上下线
  listenUsersOnlineOffline() {
    const roomId = this.currentRoom.roomId;
    return new Promise((resolve, reject) => {
      this.goEasy.pubsub.subscribePresence({
        channel: roomId,
        onPresence: (presenceEvents) => {
          this.currentRoom.onlineUsers = {
            amount: presenceEvents.amount,
            users: presenceEvents.members
          }

          let content;
          if (presenceEvents.action==="join" || presenceEvents.action==="back") {
            content = "进入房间";
          } else {
            content = "退出房间";
          }
          const message = {
            content: content,
            senderUserId: presenceEvents.member.id,
            senderNickname: presenceEvents.member.data.nickname,
            type: this.MessageType.CHAT
          };

          this.currentRoom.messages.push(message);
          Vue.nextTick(() => {
            this.$refs.myscroll.scrollTo(0, this.$refs.myscroll.scrollHeight)
          })
        },
        onSuccess: function () {
          console.log("用户上下线监听成功")
          resolve();
        },
        onFailed: function (error) {
          console.log("监听用户上下线失败, code:" + error.code + ",content:" + error.content);
          reject(error);
        }
      })
    })
  },
  // 监听新消息
  listenNewMessage() {
    let that = this
    // 监听当前聊天室的消息
    const roomId = that.currentRoom.roomId;
    this.goEasy.pubsub.subscribe({
      channel: roomId,
      presence: { // 可选
        enable: true,
      },
      onMessage: (message) => {
        const content = JSON.parse(message.content);
        this.currentRoom.messages.push(content);
        if (content.type === that.MessageType.PROP) {
          that.propAnimation(parseInt(content.content))
        }
        Vue.nextTick(() => {
          this.$refs.myscroll.scrollTo(0, this.$refs.myscroll.scrollHeight)
        })
      },
      onSuccess: function () {
        console.log("监听新消息成功")
      },
      onFailed: function (error) {
        console.log("订阅消息失败, code:" + error.code + ",错误信息:" + error.content);
      }
    })
  },
  // 加载在线用户列表
  loadOnlineUsers() {
    let that = this
    const roomId = that.currentRoom.roomId;
    return new Promise((resolve, reject) => {
      this.goEasy.pubsub.hereNow({
        channel: roomId,
        onSuccess: function (result) {
          that.currentRoom.onlineUsers = {
            amount: result.content.amount,
            users: result.content.members
          };
          resolve(result);
        },
        onFailed: function (error) {
          console.log("获取在线用户失败, code:" + error.code + ",错误信息:" + error.content);
          reject(error);
        }
      });
    })
  },
  // 加载最后10条消息历史
  loadHistory() {
    let that = this
    const roomId = that.currentRoom.roomId;
    this.goEasy.pubsub.history({
      channel: roomId, //必需项
      limit: 10, //可选项，返回的消息条数
      onSuccess: function (response) {
        that.currentRoom.messages = [];
        response.content.messages.map(message => {
          const historyMessage = JSON.parse(message.content);
          that.currentRoom.messages.push(historyMessage);
        });
      },
      onFailed: function (error) {
        //获取失败
        console.log("获取历史消息失败, code:" + error.code + ",错误信息:" + error.content);
      }
    });
  },
  realignAvatar(key) {//排列头像
    let len = this.currentRoom.onlineUsers.users.length - 1;
    if (key !== len) {
      let p = (len - key + 1) * 0.1 + 'rem';
      return {
        transform: 'translateX(' + p + ')',
        zIndex: 100 - key
      }
    }
  },
  onInputMessage(event) {//双向绑定消息 兼容
    this.newMessageContent = event.target.value;
  },
  sendMessageByEnter(event) {
    if (event.keyCode === 13) { // enter发送
      event.preventDefault();
      this.sendMessage(this.MessageType.CHAT, this.newMessageContent)
    }
  },
  sendMessage(messageType, content) {
    //发送消息
    if (content === "" && messageType === this.MessageType.CHAT) {
      return;
    }
    const message = {
      senderNickname: this.currentRoom.currentUser.nickname,
      senderUserId: this.currentRoom.currentUser.id,
      type: messageType,
      content: content
    };
    const roomId = this.currentRoom.roomId;
    this.goEasy.pubsub.publish({
      channel: roomId,
      message: JSON.stringify(message),
      onSuccess: function () {
        console.log("发送成功",);
      },
      onFailed: function (error) {
        console.log("消息发送失败，错误编码：" + error.code + " 错误信息：" + error.content);
      }
    });
    this.newMessageContent = "";
  },
  propAnimation(type) {//道具动画
    //动画的实现，可以不用关心
    if (this.propDisplay.timer) {
      return;
    }
    this.propDisplay.showPropType = type;
    this.propDisplay.play = true;
    this.propDisplay.timer = setTimeout(() => {
      this.propDisplay.play = false;
      this.propDisplay.timer = null;
    }, 2000)
  },
  quitRoom() {
    let that = this
    this.goEasy.disconnect({
      onSuccess:function() {
        that.$router.replace({path: '/textDemo'});
        console.log("GoEasy disconnect successfully");
      },
      onFailed:function(error) {
        console.log("GoEasy disconnect failed" + JSON.stringify(error));
      }
    });
  }
  },
};
</script>

<style scoped>
  .chat-room {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .chat-container {
    background-color: #fff;
    width: 850px;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .header {
    height: 44px;
    line-height: 44px;
    text-align: center;
    position: relative;
  }

  .quit-btn {
    position: absolute;
    left: 30px;
  }

  .online-avatar-container {
    position: absolute;
    top: 44px;
    right: 0;
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    padding: 14px;
    box-shadow: 5px 15px 25px #fff;
    z-index: 40;
    background: #ffffff;
  }

  .online-avatar-item {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    text-align: center;
    line-height: 40px;
    background: rgba(51, 51, 51, 0.3);
    color: #fff;
    font-size: 9px 14px;
  }

  .online-amount {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    text-align: center;
    line-height: 40px;
    background: rgba(51, 51, 51, 0.3);
    color: #fff;
    font-size: 14px;
  }

  .online-avatar-item img {
    width: 40px;
    height: 40px;
  }

  .chat-room-container {
    padding-top: 50px;
    flex: 1;
  }

  .chat-room-content {
    height: 270px;
    overflow-y: auto;
    padding: 8px 15px 20px 15px;
    scrollbar-width: thin;
  }

  .chat-room-content::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  /*滚动条里面小方块*/
  .chat-room-content::-webkit-scrollbar-thumb {
    border-radius: 10px !important;
    background:#b6b6b6!important;
  }

  .message-box {
    margin-top: 8px;
    
  }

  .message-item {
    height: 36px;
    background-color: rgba(196, 196, 196, 0.2);
    display: inline-block;
    font-size: 14px;
    border-radius: 50px;
    padding: 9px 150px;
  }

  .user-name {
    color: #D02129;
    float: left;
  }

  .user-message {
    color: #333;
    float: left;
  }

  .chat-room-action {
    position: fixed;
    bottom: 0;
    width: 820px;
    height: 52px;
    line-height: 36px;
    padding: 4px 15px 8px 15px;
    display: flex;
    background: #ffffff;
  }

  .message-input {
    width: 740px;
    background-color: rgba(51, 51, 51, 0.1);
    height: 40px;
    border-radius: 50px;
    padding: 13px 20px;
    font-size: 14px;
    outline: none;
    border: none;
  }

  .message-btn {
    position: absolute;
    z-index: 1000;
    width: 33px;
    height: 33px;
    background: #D02129;
    right: 70px;
    top: 7px;
    border-radius: 36px;
    text-align: center;
    line-height: 36px;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
  }

  .heart {
    width: 50px;
    height: 46px;
    padding: 0 7.5px;
  }

  .rocket {
    width: 20px;
    height: 46px;
  }

  .self {
    color: #D02129;
  }

  .show-animation {
    width: 40px;
    height: 160px;
    position: fixed;
    z-index: 44;
    left: 50%;
    bottom: 40px;
    margin: 0 -20px;
    justify-content: flex-end;
    animation: myanimation 2s linear;
  }

  .prop-heart {
    height: 40px;
    width: 40px;
  }

  .prop-rocket {
    height: 80px;
    width: 40px;
  }

  @keyframes myanimation {
    from {
      bottom: 40px;
    }
    to {
      bottom: 300px;
    }
  }
</style>