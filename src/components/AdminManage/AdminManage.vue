<template>
  <div style="background-color: transparent; width: 100%; height: 100%">
    <particles-bg type="random" :bg="true" :config="config"></particles-bg>
    <div class="Echarts">
      <div class="main">
        <div id="main" style="width: 350px; height: 350px"></div>
      </div>
      <div class="main1">
        <div id="main1" style="width: 350px; height: 350px"></div>
      </div>
      <div class="main2">
        <div id="main2" style="width: 350px; height: 350px"></div>
      </div>
    </div>
    <div>
      <div class="main3">
        <div id="main3" style="width: 350px; height: 350px"></div>
      </div>
      <div class="main4">
        <div id="main4" style="width: 350px; height: 350px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ParticlesBg } from "particles-bg-vue";
export default {
  name: "admin",
  components: {
    ParticlesBg,
  },
  data() {
    return {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
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
    };
  },
  mounted() {
    this.myEcharts();
    this.myEcharts2();
    this.myEcharts3();
    this.myEcharts4();
    this.myEcharts5();
  },
  methods: {
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main"));

      // 指定图表的配置项和数据
      var option = {
        title: {},
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: this.data,
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    myEcharts2() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main1"));
      var option = {
        dataset: {
          source: [
            ["score", "amount", "product"],
            [89.3, 58212, "Matcha Latte"],
            [57.1, 78254, "Milk Tea"],
            [74.4, 41032, "Cheese Cocoa"],
            [50.1, 12755, "Cheese Brownie"],
            [89.7, 20145, "Matcha Cocoa"],
            [68.1, 79146, "Tea"],
            [19.6, 91852, "Orange Juice"],
            [10.6, 101852, "Lemon Juice"],
            [32.7, 20112, "Walnut Brownie"],
          ],
        },
        xAxis: {},
        yAxis: { type: "category" },
        tooltip: {
          trigger: "axis", //坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        series: [
          {
            type: "bar",
            encode: {
              // 将 "amount" 列映射到 X 轴。
              x: "amount",
              // 将 "product" 列映射到 Y 轴。
              y: "product",
            },
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    myEcharts3() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main2"));

      // 指定图表的配置项和数据
      var option = {
        xAxis: {
          data: ["A", "B", "C", "D", "E"],
        },
        yAxis: {},
        tooltip: {},
        series: [
          {
            data: [10, 22, 28, 43, 49],
            type: "line",
            stack: "x",
          },
          {
            data: [5, 4, 3, 5, 10],
            type: "line",
            stack: "x",
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    myEcharts4() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main3"));

      // 指定图表的配置项和数据
      var option = {
        tooltip: {},
        series: [
          {
            type: "pie",
            data: [
              {
                value: 100,
                name: "A",
              },
              {
                value: 200,
                name: "B",
              },
              {
                value: 300,
                name: "C",
              },
              {
                value: 400,
                name: "D",
              },
              {
                value: 500,
                name: "E",
              },
            ],
            roseType: "area",
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    myEcharts5() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main4"));

      // 指定图表的配置项和数据
      var option = {
        xAxis: {
          data: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        },
        yAxis: {},
        tooltip: {},
        series: [
          {
            type: "scatter",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
};
</script>

<style>
.Echarts {
  width: 100%;
  height: 400px;
}
.main {
  float: left;
}
.main1 {
  float: left;
}
.main2 {
  float: left;
}
.main3 {
  float: left;
}
.main4 {
  float: left;
}
</style>
