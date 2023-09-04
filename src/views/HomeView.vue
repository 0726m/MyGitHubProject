<template>
  <div id="index_container">
    <particles-bg type="random" :bg="true" :config="config"></particles-bg>
    <div id="search_wrap">
      <search></search>
    </div>
    <div id="map_wrap">
      <map-container></map-container>
    </div>
    <div id="heatMap_wrap">
      <heat-map-search-box></heat-map-search-box>
    </div>
    <div id="shadow">
    </div>
    <div id="info_window_wrap">
      <info-window></info-window>
    </div>
  </div>
</template>

<script>
import { ParticlesBg } from 'particles-bg-vue'
import MapContainer from '@/components/MapContainer/MapContainer.vue'
import Search from '@/components/Search/Search.vue'
import HeatMapSearchBox from '@/components/heatMapSearchBox/heatMapSearchBox.vue'
import InfoWindow from '@/components/InfoWindow/InfoWindow.vue'
export default {
  name:'Home',
  data(){
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
              position: 'all',
              cross: 'dead',
              random: 15,
          },
    }
  },
  components: { MapContainer, Search, HeatMapSearchBox, InfoWindow,ParticlesBg }
}
</script>

   
<style lang="less" scoped>
#index_container {
  overflow: hidden;
  background-color: transparent;
  height: 750px;
  width: 100%;
  position: relative;
  #map_wrap {
    z-index: 10;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 60%;
    width: 100%;
  }
  #search_wrap {
    z-index: 10;
    position: absolute;
    top: 10%;
    left: 50%;
    height: 60px;
    width: 400px;
    transform: translate(-50%, -50%);
  }
  #shadow {
    height: 80%;
    width: 80%;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color:  transparent;
  }
  #heatMap_wrap {
    z-index: 12;
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  #info_window_wrap {
    z-index: 100;
    position: absolute;
  }
}
</style>