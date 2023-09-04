<template>
  <div class="login-container">
    <div class="login-main">
      <div class="header">
        <span class="title">欢迎来到</span>
        <span class="description">交友聊天室</span>
      </div>
      <div class="content">
        <input
          :class="nickname === '' ? 'nick-input input-notice' : 'nick-input'"
          :value="nickname"
          placeholder="请输入昵称"
          @input="onInputUserName"
        />
        <div class="avatar-container">
          <div class="avatar-notice">
            <span>请选择头像</span>
            <span class="avatar-notice-info" v-if="selectedAvatar.imgUrl === ''"
              >请选一个头像哦!!!</span
            >
          </div>
          <div class="avatar-box">
            <div
              :class="selectedAvatar.id === avatar.id ? 'avatar-box-item active': 'avatar-box-item'"
              v-for="(avatar, key) in avatarList"
              :key="key"
              @click="onSelectAvatar(avatar)"
            >
              <img :src="avatar.imgUrl" />
            </div>
          </div>
        </div>
        <div class="room-container">
          <span class="room-title">请选择聊天室</span>
          <div class="room-box">
            <span
              class="room-box-item"
              v-for="room in roomList"
              :key="room.roomId"
              @click="onSelectRoom(room)"
              >{{ room.name }}
            </span>
          </div>
          <div class="error-info" v-show="errorInfo">
            <span class="error-info-title">请输入昵称，并选择头像</span>
          </div>
        </div>
      </div>
      
      <!-- <div class="version">{{ version }}</div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "textDemo",
  data() {
    return {
      avatarList: [
        { id: "1", imgUrl: "/static/images/1.png" },
        { id: "2", imgUrl: "/static/images/2.png" },
        { id: "3", imgUrl: "/static/images/3.png" },
        { id: "4", imgUrl: "/static/images/4.png" },
        { id: "5", imgUrl: "/static/images/5.png" },
        { id: "6", imgUrl: "/static/images/6.png" },
        { id: "7", imgUrl: "/static/images/7.png" },
        { id: "8", imgUrl: "/static/images/8.png" },
      ],
      roomList: [
        { roomId: "001", name: "周杰伦" },
        { roomId: "002", name: "陶喆" },
        { roomId: "003", name: "林俊杰" },
        { roomId: "004", name: "王力宏" },
        { roomId: "005", name: "原来你也玩原神" },
        { roomId: "006", name: "珍德食泥鸭" },
        { roomId: "007", name: "你干嘛，哎呦" },
        { roomId: "008", name: "白京的爷就是爷" },
      ],
      nickname: "",
      selectedAvatar: {
        imgUrl: "",
        id: "",
      },
      selectedRoom: {
        roomId: null,
        roomName: '',
      },
      errorInfo: false,
    };
  },
  methods: {
    onInputUserName(event) {
      // 输入用户名
      this.nickname = event.target.value;
    },
    onSelectAvatar(avtar) {
      //选择头像
      this.selectedAvatar = avtar;
  },
    onSelectRoom(room) {
        //登录
      if (this.selectedAvatar.imgUrl !== "" && this.nickname !== "") {
        let roomToken = {
            roomId: room.roomId,
            roomName: room.name,
            userId: (Math.random() * 1000).toString(),
            nickname: this.nickname,
            avatar: this.selectedAvatar.imgUrl
      };
      this.$router.replace({
        path: './chatRoom',
        query: roomToken
      });
    } else {
      this.errorInfo = true;
      setTimeout(() => {
        this.errorInfo = false;
      }, 2000);
    }
  },
}}
</script>

<style scoped>
  .login-container {
    width: 800px;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .login-main {
    width: 850px;
    margin-bottom: 200px;
  }

  .header {
    margin-top: 0px;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    display: flex;
    flex-direction: column;
  }

  .title {
    color: #D02129;
    font-weight: bold;
    font-size: 22px;
    line-height: 33px;
  }

  .description {
    color: #D02129;
    font-size: 24px;
    line-height: 33px;
  }

  .content {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 0 30px;
  }

  .avatar-container {
    width: 100%;
    padding: 15px 0;
  }

  .avatar-notice {
    line-height: 28px;
    font-size: 14px;
  }

  .avatar-notice-info {
    padding-left: 10px;
    color: #D02129;
  }

  .avatar-box {
    height: 80px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }

  .avatar-box-item {
    height: 70px;
    width: 70px;
    margin: 4px;
  }

  .avatar-box-item img {
    height: 62px;
    width: 62px;
    background-color: #F0AD4E;
    border-radius: 35px;
  }

  .avatar-box .active {
    border: 4px solid red;
    border-radius: 64.5px;
  }

  .avatar-box .active image {
    border: 4px solid #fff;
  }

  .room-container {
    width: 100%;
    height: 100px;
  }

  .room-title {
    font-size: 15px;
    line-height: 19px;
  }

  .room-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .room-box-item {
    width: 144px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background-color: #D02129;
    border-radius: 50px;
    color: #fff;
    margin-top: 16px;
    font-size: 13px;
  }

  .input-notice {
    border: 1px solid #D02129 !important;
  }

  .nick-input {
    width: 450px;
    height: 28px;
    outline: none;
    border-radius: 80px;
    padding: 6px 12px;
    font-size: 9px;
    text-align: center;
    border: 1px solid rgba(0,0,0,0.1);
  }

  .error-info {
    text-align: center;
    font-size: 14px;
    color: #d02129;
    padding-left: 30px;
  }

  .version {
    color: #FFFFFF;
    text-align: center;
  }

</style>

