<template>
     <!-- 册子岛站——岚山站 -->
    <div class='traceWork_step'>
        <div class='in_tube'>
          <div class='tube1'>
            <span>岚白711线</span>
            <img src="../../../assets/png_guandao.png"/>
            <div class='tube_color'></div>
          </div>
          <div class='tube2'>
            <span>岚白762线</span>
            <img src="../../../assets/png_guandao.png"/> 
            <div class='tube_color'></div>   
          </div>
        </div>
        <div class='first_station'>
            <ul class='yg' @mouseleave="hideDetails(1)">
                <li v-for='(item,index) in bswData' :key='index' @mouseenter="showDetails(index,1)">
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
                <span>白沙湾站</span>
            </div>
            <div class='tube'>
              <div class='tube1'>
                  <div class='tube_img1'>
                      <img class='img1' src="../../../assets/png_guandao.png" alt="">
                       <div class='famenDetails' :class='{active:guandaoDetail==index}' :style="{left:parseInt(item.percentageDistance)+10+'%'}" v-for="(item,index) in gxDetails" :key="index">
                          <div class='sjtb'></div>
                          <div class='famen_content'>
                              <p><img class="yg_img" src="../../../assets/icon_guanxian.png" alt="">管线信息</p>
                              <p>
                                 <span>罐内油品：</span><span>{{item.oilsName}}</span> 
                              </p>
                              <p>
                                  <span>已输量：</span><span>{{item.throughput}} 万吨</span>
                              </p>
                              <p>
                                  <span>混油长度：</span><span>{{item.mixingLength}}m</span>
                              </p>
                              <p>
                                  <span>剩余时间：</span><span>{{item.remainingTime}}h</span>
                              </p>
                              <p>
                                  <span>剩余长度：</span><span>{{item.distance}}km</span>
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
                  <div class='flow_arrow'  >
                    <img src="../../../assets/png_liuxiang.png" class=' move ar-animated'>
                  </div>
                  <div class='yg_flow' v-for='(item,index) in gxDetails' :key='index' :style="gz_style(item,index)"  @mouseover="showGuanDaoDetails(index)">
                  </div>
                  <div class='tube_color'></div>
                  <img class='img3' src="../../../assets/png_zhongjian.png" alt="">
                  <span class='tubeName'>白石线</span>
              </div>
               <div class='tube2' @mouseleave="hideGuanDaoDetails(2)">
                  <div class='tube_img1'>
                      <img class='img1' src="../../../assets/png_guandao.png"> 
                      <div class='famenDetails' :class='{active:guandaoDetail==2}'>
                          <div class='sjtb'></div>
                           <div class='famen_content'>
                              <p><img class="yg_img" src="../../../assets/icon_guanxian.png" alt="">管线信息</p>
                              <p>
                                  <!-- <span>罐内油品：</span><span>{{gxDetails.oilInfo.oilName}}</span> -->
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
                  <div class='yg_flow' @mouseover="showGuanDaoDetails(2)">
                    <img src="../../../assets/png_liuxiang.png" class='move ar-animated'>
                  </div>
                  <div class='tube_color' @mouseover="showGuanDaoDetails(2)"></div>
                  <span class='tubeName'>白石线</span>
              </div>
            </div>
        </div>
        <div class='other_station'>
          <img src="../../../assets/png_wu.png" alt="">
          <span>高桥石化</span>
        </div>
        <div class='end_station'>
            <div class='cyg'>
                <ul class='yg' @mouseleave="hideDetails(2)">
                  <li v-for='(item,index) in sbqData' :key='index' @mouseenter="showDetails(index,2)">
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
                <span>石埠桥站</span>
            </div>
        </div>
    </div>
</template>
<script>
    import '../animation.css'
    export default {
        data(){
            return {
                 blink:0,//正在输油的储罐的状态
                oilHeight:'',//储罐油品高度
                currentGx:0,
                current1:-1,current2:-1,current3:-1,current4:-1,current5:-1,current6:-1,guandaoDetail:0,//控制弹框显示隐藏
                bswData:[ ],//白沙湾站储罐
                sbqData:[ ],//石埠桥站储罐
                line:{},//管段信息              
                gxDetails:{}//输油计划跟踪    
            }
        },
        props:['tube_name','gz_wave','gz_type','gz_xz','gz_data'],
        mounted(){
          this.getLineInfo()
         
        },
        methods:{
           //获取该管线的信息
            getLineInfo(){
              this.axios.post("/OilTrack/bsw/lineInfo").then(res=>{
                this.bswData=res.data.rizhao[0][0].station;
                this.sbqData=res.data.yizheng[0][0].station;
                this.line=res.data.line
                this.gxDetails=res.data.plan           
                console.log(res.data,666) 
              })
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
             //管线详情的显示隐藏
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
    .in_tube
      position absolute
      top 100px
      left 0px
      .tube1
      .tube2
        position absolute
        img
          width 200px
          height 32px
        .tube_color
          height 24px
          background:rgba(32,112,209,1);
          opacity:0.34;
          position absolute
          top 25px
          width 200px
      .tube2
        top 66px       
      .tube1
        top -41px
    .first_station
      position relative
      width 384px
      height 308px
      left 200px
      background url('../../../assets/pic_chuxiang.jpg')
      padding 9px
      .yg
        li
          float left
          margin-right 9px
          position relative    
          .ygDetails
              width 247px
              height 286px
              background #F7FBFF
              box-shadow 0 0 10px #D7D7D7
              position absolute
              top 0px
              left 62px
              z-index 1
              display none
              padding 18px
              p
                margin-top 10px
                display block
                height 14px
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
          .yHeight 
            position absolute
            width 7px
            height 21px
            background-color #0066FF
            bottom 6px
            right 2px
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
        left 182px
        width: 500px;
        .tube1
        .tube2
          .tubeName
            position absolute
            top 49px
            left 430px
          .tube_img1
            .famenDetails
              width 247px
              height 300px
              background #F7FBFF
              box-shadow 0 0 10px #D7D7D7
              position absolute
              top 28px
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
          .tube_color
          .img1 
            width 716px
            height 32px
            position absolute
            left 202px
            top 70px
          .img2
          .img3
            width 36px
            height 30px
            position absolute
            left 202px
            top 97px
          .img3
            left 472px
            width 125px
            height 115px
            top 0px
          .tube_color
          .yg_flow
            height 24px
            background rgba(32,112,209,1)
            opacity 0.34
            position absolute
            top 74px
          .yg_flow
            background:linear-gradient(90deg,rgb(0,255,234,0.9) 34%,rgba(255,255,234,1) 90%);
            opacity 0.82
            width 200px
            left 203px
            img 
              left 12px
              position absolute
              top 6px
        .tube2
          .tube_img1
            .img1 
              width 475px
              height 32px
              position absolute
              top 173px
              left 202px
            .famenDetails
              top 128px
          .yg_flow
          .tube_color
            height 24px
            width 475px
            background:rgba(32,112,209,1);
            opacity:0.34;
            position absolute
            left 202px
            top 177px
          .yg_flow
            background:linear-gradient(90deg,rgb(0,255,234,0.9) 34%,rgba(255,255,234,1) 90%);
            opacity 0.82
            width 200px
            left 203px
            img 
              left 12px
              position absolute
              top 6px
    .end_station
      width 600px
      height 300px
      position relative
      right -1297px
      top -310px
      .cyg
        width 201px
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
              background #F7FBFF
              box-shadow 0 0 10px #D7D7D7
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
            .yHeight 
              position absolute
              width 7px
              height 21px
              background-color #0066FF
              bottom 6px
              right 2px
            img 
              width 52px
              height 68px
      .station_logo
        position absolute
        left 201px
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
        .tubeName
          position absolute
          top 108px
          left 413px
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
    .other_station
      position absolute
      top 134px
      left 1037px
      width 236px
      img 
        width 200px
        height 150px
        position absolute
        left 0px
      span
        position absolute
        left 106px
        top 4px
        font-size 10px
        color #ae7625
</style>


