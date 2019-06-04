<template>
     <!-- 岙山站——册子岛站 -->
    <div class='traceWork_step'>
        <div class='first_station'>
            <ul class='yg' @mouseleave="hideDetails(1)">
                <li v-for='(item,index) in aoshanData' :key='index' @mouseenter="showDetails(index,1)">
                    <img src="../../../assets/pic_youguan.png"/>
                   <div class='yHeight' :class="[item.runState==1?'blink':'']" v-bind:style="{background:`linear-gradient(bottom,${item.oilsInfo!==null?item.oilsInfo.nameColor:''},${item.oilsInfo!==null?item.oilsInfo.nameColor:''}) `,height:`${item.nowLevel/10}px`}"></div>
                    <span class='oilName'>{{item.storageTankName}}</span>
                    <div class='ygDetails' :class='{active:index==current1}'>
                      <div class='sjtb'></div>
                      <div>
                          <p ><img class="yg_img" src="../../../assets/icon_chuguan.png" alt="">{{item.storageTankName}}罐</p>
                          <p><span>油种：</span><span>{{item.oilsInfo!==null?item.oilsInfo.oilName:''}}</span></p>
                          <p><span>实时液位：</span><span>{{item.oilsInfo!==null?item.oilsInfo.nowLevel:''}} m</span></p>
                          <p><span>毛重：</span><span>{{item.oilsInfo!==null?item.oilsInfo.grossWeight:''}} kg</span></p>
                          <p><span>出站阀编号：</span><span>{{item.oilStationNumber}}</span></p>
                          <p><span>出站阀开度：</span><span>{{item.openingDegree}}</span></p>
                          <p><span>状态：</span><span>{{item.oilsInfo!==null?item.oilsInfo.runState:''}}</span></p>
                          <p><span>密度：</span><span>{{item.oilsInfo!==null?item.oilsInfo.density:''}} t/m³</span></p>
                          <p><span>粘度：</span><span>{{item.oilsInfo!==null?item.oilsInfo.viscosity:''}} mPa·s</span></p>
                          <p><span>硫含量：</span><span>{{item.oilsInfo!==null?item.oilsInfo.sulfur:''}} ppm</span></p>
                          <p><span>H2S气体含量：</span><span>{{item.oilsInfo!==null?item.oilsInfo.h2sGas:''}} ppm</span></p>
                          <p><span>H2S液体含量：</span><span>{{item.oilsInfo!==null?item.oilsInfo.h2sLiquid:''}} ppm</span></p>
                      </div>
                  </div>
                </li>
            </ul>        
            <div class='station_logo'>
                <img src="../../../assets/png_dibiao.png" alt="">
                <span>岙山站</span>
            </div>
            <div class='tube'>
                   <div class='tube1' @mouseleave="hideGuanDaoDetails()">
                      <img class='img1' src="../../../assets/png_guandao.png" alt="">
                      <div class='famenDetails' :class='{active:guandaoDetail==index}' :style="{left:parseInt(item.percentageDistance)+10+'%'}" v-for="(item,index) in gxDetails" :key="index">
                          <div class='sjtb'></div>
                          <div class='famen_content'>
                              <p><img class="yg_img" src="../../../assets/icon_guanxian.png" alt="">管线信息</p>
                              <p>
                                  <span>罐内油品：</span><span>{{gxDetails.oilInfo.oilName}}</span>
                              </p>
                              <p>
                                  <span>已输量：</span><span>{{gxDetails.throughput}} 万吨</span>
                              </p>
                              <p>
                                  <span>混油长度：</span><span>{{gxDetails.mixingLength}}m</span>
                              </p>
                              <p>
                                  <span>剩余时间：</span><span>{{gxDetails.remainingTime}}h</span>
                              </p>
                              <p>
                                  <span>剩余长度：</span><span>{{gxDetails.distance}}km</span>
                              </p>
                              <p>
                                  <span>累计流量：</span><span>{{line.sumOil}} m³</span>
                              </p>
                              <p>
                                  <span>瞬时流量：</span><span>{{line.speed}} m³/h</span>
                              </p>
                          </div>
                      </div>
                  </div>
                  <div class='famen_img1' @mouseleave="hideFaMenDetails(1)">
                      <img class='img2' src="../../../assets/png_famen.png" @mouseover="showFaMenDetails(1)">
                      <div class='famenDetails' :class='{active:current3==1}'>
                          <div class='sjtb'></div>
                          <div class='famen_content'>
                              <p><img class="yg_img" src="../../../assets/icon_famen.png" alt="">出站阀</p>
                              <p>
                                  <span>出站阀：</span>
                                  <span>3312</span>
                              </p>
                              <p>
                                  <span>开度数：</span>
                                  <span>3312</span>
                              </p>
                          </div>
                      </div>
                  </div>
                  <div class='famen_img2' @mouseleave="hideFaMenDetails(2)">
                      <img class='img3' src="../../../assets/png_famen.png" alt="" @mouseover="showFaMenDetails(2)">
                      <div class='famenDetails' :class='{active:current4==1}'>
                          <div class='sjtb'></div>
                          <div class='famen_content'>
                              <p><img class="yg_img" src="../../../assets/icon_famen.png" alt="">出站阀</p>
                              <p>
                                  <span>罐前阀：</span>
                                  <span>3312</span>
                              </p>
                              <p>
                                  <span>开度数：</span>
                                  <span>3312</span>
                              </p>
                          </div>
                      </div>
                  </div>
                  <div class='flow_arrow'  >
                    <img src="../../../assets/png_liuxiang.png" class=' move ar-animated'>
                  </div>
                  <div class='yg_flow' v-for='(item,index) in gxDetails' :key='index' :style="gz_style(item,index)"  @mouseover="showGuanDaoDetails(index)">
                  </div>
                  <div class='tube_color'></div>
                <span class='tubeName'>岙册线</span>
                <img class='img4' src="../../../assets/png_youtou.png" alt="">
            </div>
        </div>
        <div class='end_station'>
            <div class='cyg'>
                <ul class='yg' @mouseleave="hideDetails(2)">
                  <li v-for='(item,index) in cezidaoData' :key='index' @mouseenter="showDetails(index,2)">
                      <img src="../../../assets/pic_youguan.png"/>
                    <div class='yHeight' :class="[item.runState==1?'blink':'']" :height='item.nowLevel/10' v-bind:style="{background:`linear-gradient(bottom,${item.oilsInfo!==null?item.oilsInfo.nameColor:''},${item.oilsInfo!==null?item.oilsInfo.nameColor:''}) `,height:`${item.nowLevel}/10px`}"></div>
                    <span class='oilName'>{{item.storageTankName}}</span>
                    <div class='ygDetails' :class='{active:index==current2}'>
                        <div class='sjtb'></div>
                        <div>
                            <p ><img class="yg_img" src="../../../assets/icon_chuguan.png" alt="">{{item.storageTankName}}罐</p>
                            <p><span>油种：</span><span>{{item.oilsInfo!==null?item.oilsInfo.oilName:''}}</span></p>
                            <p><span>实时液位：</span><span>{{item.oilsInfo!==null?item.oilsInfo.nowLevel:''}} m</span></p>
                            <p><span>毛重：</span><span>{{item.oilsInfo!==null?item.oilsInfo.grossWeight:''}} kg</span></p>
                            <p><span>罐前阀编号：</span><span>{{item.valve}}</span></p>
                            <p><span>罐前阀开度：</span><span>{{item.openingDegree}}</span></p>
                            <p><span>状态：</span><span>{{item.oilsInfo!==null?item.oilsInfo.runState:''}}</span></p>
                            <p><span>密度：</span><span>{{item.oilsInfo!==null?item.oilsInfo.density:''}} t/m³</span></p>
                            <p><span>粘度：</span><span>{{item.oilsInfo!==null?item.oilsInfo.viscosity:''}} mPa·s</span></p>
                            <p><span>硫含量：</span><span>{{item.oilsInfo!==null?item.oilsInfo.sulfur:''}} ppm</span></p>
                            <p><span>H2S气体含量：</span><span>{{item.oilsInfo!==null?item.oilsInfo.h2sGas:''}} ppm</span></p>
                            <p><span>H2S液体含量：</span><span>{{item.oilsInfo!==null?item.oilsInfo.h2sLiquid:''}} ppm</span></p>
                        </div>
                    </div>
                  </li>
                </ul>
            </div>
            <div class='station_logo'>
              <img src="../../../assets/png_dibiao.png" alt="">
              <span>册子岛站</span>
            </div>
        </div>
    </div>
</template>
<script>
    import '../animation.css'
    export default {
        data(){
            return {
                start_station:[1,2,3,4],gz_data_true:[], blink:0,//正在输油的储罐的状态
                oilHeight:'',//储罐油品高度
                currentGx:0,
                current1:-1,current2:-1,current3:-1,current4:-1,current5:-1,current6:-1,guandaoDetail:0,
                aoshanData:[ ],
                cezidaoData:[],
                line:{ }, //管段信息 
                gxDetails:{}//输油计划跟踪
            }
        },
        props:['tube_name','gz_wave','gz_type','gz_xz','gz_data'],
        mounted(){
          this.oil_gz()
        },
        methods:{
          getLineInfo(){
              asxInfo().then(res=>{
                // this.aoshanData=res.data.aoshan[0][0].station;
                // this.cezidaoData=res.data.cezidao[0][0].station;
                // this.line=res.data.line
                // this.gxDetails=res.data.plan           
                // console.log(res.data,666)
                
              })
          },
          //颜色转变
          colorRgb(hex, al) {
            var hexColor = /^#/.test(hex) ? hex.slice(1) : hex,
                alp = hex === 'transparent' ? 0 : Math.ceil(al),
                r, g, b;
            hexColor = /^[0-9a-f]{3}|[0-9a-f]{6}$/i.test(hexColor) ? hexColor : 'fffff';
            if (hexColor.length === 3) {
                hexColor = hexColor.replace(/(\w)(\w)(\w)/gi, '$1$1$2$2$3$3');
            }
            r = hexColor.slice(0, 2);
            g = hexColor.slice(2, 4);
            b = hexColor.slice(4, 6);
            r = parseInt(r, 16);
            g = parseInt(g, 16);
            b = parseInt(b, 16);
            return {
                hex: '#' + hexColor,
                alpha: alp,
                rgba: 'rgba(' + r + ',' + g + ',' + b + ',' + (alp / 100).toFixed(2) + ')'
            };
          },
          //判断储罐是否正在输油
          is_working(){
            if(this.s_==true){
              this.working
            }
          },
          //改变管内状态
          gz_style(item,index){
            var sHex = item.color;
            //var sHexColor = sRgb.colorHex();
            var sRgbColor = this.colorRgb(sHex,100);
            var sRgbColor_end = this.colorRgb(sHex,item.mixoildistance-10);
            var width_=100
            let left_=208+item.distance*2.5; 
            if(item.mixoil==true){
              sRgbColor_end = this.colorRgb('#3ee',item.mixoildistance+10);
            }
           

            return "background:"+`linear-gradient(90deg,${sRgbColor.rgba} 34%,${sRgbColor_end.rgba} 90%)`+";"+"width:"+`${width_}px`+";"+"left:"+`${left_}px`+";"+"opacity:"+item.propertymidu/2
          },
          oil_gz(){
            let ww= [
              {
                  "propertyniandu": 1.2,//粘度
                  "propertymidu": 2.2,//密度
                  "distance": 60,//距离，位置
                  "mixoil": false,//是否有混油
                  "mixoildistance": 78,//混油长度
                  "color": "#1E90FF"
              },
              {
                  "propertyniandu": 2.2,
                  "propertymidu": 3.2,
                  "distance": 20,
                  "mixoil": true,
                  "mixoildistance": 56,
                  "color": "#4B0082	"
              }
            ]
            this.gz_data_true=ww.reverse(); 
          },
          showDetails(index,id){
              if(id==1){
                  this.current1=index
              }
              if(id==2){
                  this.current2=index
              }
              
          },
          hideDetails(id){
              if(id==1){
                  this.current1=-1
              }
              if(id==2){
                  this.current2=-1
              }
              
          },
          showFaMenDetails(id){
              if(id==1) this.current3=1
              if(id==2) this.current4=1
              if(id==3) this.current5=1
              if(id==4) this.current6=1
          },
          hideFaMenDetails(id){
              if(id==1) this.current3=-1
              if(id==2) this.current4=-1
              if(id==3) this.current5=-1
              if(id==4) this.current6=-1
            
          },
          showGuanDaoDetails(id){
              this.currentGx=id
              if(id==this.currentGx) this.guandaoDetail=id
          },
          hideGuanDaoDetails(id){
            this.currentGx=-1
            this.guandaoDetail=-1  
          }
        }
    }
</script>
<style lang="stylus" scoped>
  .traceWork
    overflow:scroll
    overflow-y hidden
    height 450px
  .traceWork_step
    position relative 
    float left
    .active
      display block!important
    .first_station
      position relative
      width 201px
      height 308px
      background url('../../../assets/pic_chuxiang.jpg')
      padding 9px
      .yg
        li
          float left
          margin-right 9px
          position relative    
          .ygDetails
              width 247px
              height 370px
              background #F7FBFF
              box-shadow 0 0 10px #D7D7D7
              position absolute
              top 0px
              left 62px
              z-index 1
              display none
              padding 28px
              p
                margin-top 10px
                display block
                height 24px
                span:first-child
                    float left 
                span:last-child
                    float right
                      
              .yg_img
                width 30px
                height 30px
                vertical-align middle
                margin-right 10px
              .sjtb
                position absolute
                top 28px
                left -10px
                width 0px
                height 0px
                border-width:10px 10px 10px 0;
                border-style:solid;
                border-color:transparent #F7FBFF transparent transparent;

          .oilName
            position absolute
            top 24px
            left 9px
          .yHeight 
            position absolute
            width 7px
            height 21px
            bottom 6px
            right 2px
            align-items center
            background-color rgb(118, 218, 255)
            overflow hidden
          img 
            width 52px
            height 68px
          
      .station_logo
        position absolute
        left 200px
        top 214px
        span 
          position absolute
          left 25px
          top 11px
          color rgb(174,118,37)
      .tube
        position absolute
        left -1px
        width: 700px;
        .tubeName
          position absolute
          top 108px
          left 580px
        .tube_color
          height 24px
          background rgba(32,112,209,1)
          opacity 0.34
          position absolute
          width 716px
          top 132px
          left 202px
        .flow_arrow
          position relative
          width 716px
          top 132px
          left 202px
          img 
            left 12px
            position absolute
            top 6px
        .yg_flow
          position absolute
          top 145px
          height 24px
          transform translate(-50%, -50%)
          overflow hidden
        .tube_img1
        .famen_img1
        .famen_img2
          .famenDetails
            width 247px
            height 170px
            background #F7FBFF
            box-shadow 0 0 10px #D7D7D7
            position absolute
            top 81px
            left 423px
            z-index 1
            display none
            padding 10px
            .famen_content
              width 200px
              height 300px
              p
                margin-top 10px
                display block
                height 24px
                span:first-child
                  float left 
                span:last-child
                  float right         
                .yg_img
                  width 30px
                  height 30px
                  vertical-align middle
                  margin-right 10px
            .sjtb
              position absolute
              top 51px
              left -10px
              width 0px
              height 0px
              border-width:10px 10px 10px 0;
              border-style:solid;
              border-color:transparent #F7FBFF transparent transparent;
        .famen_img2
          .famenDetails
            left 912px!important
            top 57px!important
        .tube_img1
          .famenDetails
            height 310px
        .famen_img1
          .famenDetails
            left 230px!important
            top 57px!important
        .img1 
          width 716px
          height 32px
          position absolute
          left 202px
          top 128px
        .img2
        .img3
          width 36px
          height 30px
          position absolute
          left 202px
          top 97px
        .img3
          left 882px
        .img4
          position absolute
          top 156px
          left 594px
   
    .end_station
      width 600px
      height 300px
      position relative
      right -917px
      top -308px
      .cyg
        width 384px
        height 308px
        background url('../../../assets/pic_chuxiang.jpg')
        padding 9px
        position absolute
        left 0px
        top 0px
       .yg
          li
            float left
            margin-right 9px
            position relative
            .ygDetails
              width 221px
              height 290px
              box-shadow 0 0 10px #D7D7D7
              background #F7FBFF
              position absolute
              top 0px
              left 62px
              z-index 1
              display none
              padding 20px
              p
                margin-top 5px
                display block
                height 20px
                span 
                  font-size 12px
                span:first-child
                  float left 
                span:last-child
                  float right
                      
              .yg_img
                width 30px
                height 30px
                vertical-align middle
                margin-right 10px
              .sjtb
                position absolute
                top 28px
                left -10px
                width 0px
                height 0px
                border-width:10px 10px 10px 0;
                border-style:solid;
                border-color:transparent #F7FBFF transparent transparent;
            .oilName
                position absolute
                top 24px
                left 9px
            .yHeight {
              position absolute
              width 7px
              height 21px
              //background-color #0066FF
              bottom 6px
              right 2px
              align-items: center;
              background-color: rgb(118, 218, 255);
              overflow: hidden;
            }	
            .yHeight::before,.yHeight::after {
              content: "";
              position: absolute;
              left: 50%;
              min-width:7px;
              min-height: 21px;
              background-color: #fff;
              animation-name: rotate;
              animation-iteration-count: infinite;
              animation-timing-function: linear;
            }

            .yHeight::before {
              bottom: 3vh;
              border-radius: 45%;
              animation-duration: 10s;
            }

            .yHeight::after {
              bottom: 3vh;
              opacity: .5;
              border-radius: 47%;
              animation-duration: 10s;
            }

            @keyframes rotate {
              0% {
                transform: translate(-50%, 0) rotateZ(0deg);
              }
              50% {
                transform: translate(-50%, -2%) rotateZ(180deg);
              }
              100% {
                transform: translate(-50%, 0%) rotateZ(360deg);
              }
            }
            img 
              width 52px
              height 68px
      .station_logo
        position absolute
        left 384px
        top 214px
        span 
          position absolute
          left 25px
          top 11px
          color rgb(174,118,37)
      .tube
        position absolute
        left 0px
        top 7px
       
        .img1 
          width 733px
          height 24px
          position absolute
          left 202px
          top 128px
        ul
          position absolute
          left 250px
          top 83px
          width 500px
          li
            float left 
            margin-left 130px
            width 91px
            height 80px
            display inline-block
            img 
              width 91px
              height 80px
        .end_img
          position absolute
          top 0px
          .img3
          span
            width 246px
            height 230px
            position absolute
            top 0px
            float right
            margin-left 50px
          span 
            left 39px
            top 10px
            color rgb(174,118,37)
</style>


