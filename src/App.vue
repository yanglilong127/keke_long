<template>
  <div id="app">
    <Loading v-if='loading'></Loading>
    <!--进入时的画面-->
    <transition mode='out-in'
      enter-active-class="animated flip"
      leave-active-class="animated rollOut">
      <div class="kaiji" v-show='qidongState'>
        <!--下雪的特效-->
        <div class="snow_xiaoguo">
          <Snow></Snow>
        </div>
        <p class="daojishi">{{count}}</p>
      </div>
    </transition>

    <Home v-show="!qidongState"></Home>
  </div>
</template>

<script>
import Home from './components/Home.vue'
import {mapGetters} from 'vuex'

export default {
  data(){
    return{
      count:5,   //倒计时时间
    }
  },
  mounted(){
    this.come_to_home();  //5秒后进入主页
  },
  computed:{
    ...mapGetters(['qidongState','loading'])
  },
  components:{
    Home
  },
  methods:{
    come_to_home:function(){
      var time0=setInterval(function(){
        this.count--;
      }.bind(this),1000);
      setTimeout(function() {
        clearInterval(time0);
        this.$store.commit('hide_qidong');
      }.bind(this),1000);
    }
    
  }
}
</script>

<style scoped lang='less'>
#app{
  position: relative;
  width: 100%; height: 100%;
}
#app .kaiji{
  width: 100%; height: 100%;
  position: fixed;
  background-image: url(./assets/images/background.jpg);
  background-position: 50% 50%;
  background-size:cover;
  background-repeat: no-repeat;
  .snow_xiaoguo{
    width: 100%; height: 100%;
  }
  p.daojishi{
    width:80px; height: 80px;
    text-align: center;
    line-height: 80px;
    border-radius:40px;
    box-sizing: border-box;
    border: 1px solid white;
    position: absolute;
    z-index: 3;
    left:50%; top:50%;
    margin-left:-40px; margin-top:-40px;
    background: rgba(0,0,0,0.8);
    box-shadow: 0 0 5px #5cb85c;
    color:white; font-size:40px;
  }
}
</style>
