<template>
    <div class='traceWork_step'>
        <div class='first_station'>
            <ul class='yg' @mouseleave="hideDetails(1)">
              <li v-for='(item,index) in cfdData' :key='index' @mouseenter="showDetails(index,1)">
                    <img src="../../../assets/pic_youguan.png"/>
                    <!-- <div class='yHeight' :class="[blink==1?'blink':'']" :height='item.nowLevel/10' v-bind:style="{background:`linear-gradient(bottom,${item.oilsInfo.nameColor},${item.oilsInfo.nameColor}) `}"></div> -->
                    <span class='oilName'>{{item.storageTankName}}</span>
                    <div class='ygDetails' :class='{active:index==current1}'>
                        <div class='sjtb'></div>
                        <div>
                            <p ><img class="yg_img" src="../../../assets/icon_chuguan.png" alt="">T-12罐</p>
                            <p><span>油种：</span><span>{{item.oilName}}</span></p>
                            <p><span>实时液位：</span><span>{{item.nowLevel}} m</span></p>
                            <p><span>毛重：</span><span>{{item.grossWeight}} kg</span></p>
                            <!-- <p><span>罐前阀编号：</span><span>{{item.grossWeight}}</span></p>
                            <p><span>罐前阀开度：</span><span>{{item.runState}}</span></p> -->
                            <p><span>状态：</span><span>{{item.runState}}</span></p>
                            <!-- <p><span>密度：</span><span>{{item.oilsInfo.density}} t/m³</span></p>
                            <p><span>粘度：</span><span>{{item.oilsInfo.viscosity}} mPa·s</span></p>
                            <p><span>硫含量：</span><span>{{item.oilsInfo.sulfur}} ppm</span></p>
                            <p><span>H2S气体含量：</span><span>{{item.oilsInfo.h2sGas}} ppm</span></p>
                            <p><span>H2S液体含量：</span><span>{{item.oilsInfo.h2sLiquid}} ppm</span></p> -->
                        </div>
                    </div>
                </li>
            </ul>        
            <div class='station_logo'>
                <img src="../../../assets/png_dibiao.png" alt="">
                <span>曹妃甸站</span>
            </div>
            <div class='tube'>
              <div class='tube1' @mouseleave="hideGuanDaoDetails(1)">
                  <div class='tube_img1'>
                      <img class='img1' src="../../../assets/png_guandao.png" alt="">
                      <div class='famenDetails' :class='{active:guandaoDetail==1}'>
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
                  <div class='yg_flow'  @mouseover="showGuanDaoDetails(1)">
                    <img src="../../../assets/png_liuxiang.png" class='move ar-animated'>
                  </div>
                  <div class='tube_color'  @mouseover="showGuanDaoDetails(1)"></div>
                  <div class='zr'>
                       <img class='img3' src="../../../assets/png_zhongjian.png" alt="">
                       <span>汉沽站</span>
                  </div>
                 
                  <!-- <span class='tubeName'>白石线</span> -->
              </div>
            </div>
        </div>
        <div class='end_station'>
            <div class='cyg'>
                <ul class='yg' @mouseleave="hideDetails(2)">
                  <li v-for='(item,index) in tjData' :key='index' @mouseenter="showDetails(index,2)">
                      <img src="../../../assets/pic_youguan.png"/>
                      <div class='yHeight'></div>
                      <span class='oilName'>34#</span>
                      <!-- <div class='ygDetails' :class='{active:index==current2}'>
                          <div class='sjtb'></div>
                          <div>
                              <p style='margin-bottom:15px'><img class="yg_img" src="../../../assets/icon_chuguan.png" alt="">T-12罐</p>
                              <p v-for='(item,index) in ygDetails' :key='index'>
                                  <span>{{item.name}}：</span>
                                  <span>{{item.content}}</span>
                              </p>
                          </div>
                      </div> -->
                  </li>
                </ul>
                </div>
                <div class='station_logo'>
                <img src="../../../assets/png_dibiao.png" alt="">
                <span>天津输油站</span>
            </div>
        </div>
    </div>
</template>
<script>
  import '../animation.css'
    export default {
        data(){
            return {
                blink:'',//正在输油的储罐的状态
                oilHeight:'',//储罐油品高度
                current1:-1,current2:-1,current3:-1,current4:-1,current5:-1,current6:-1,guandaoDetail:0,
                cfdData:[ ],//曹妃甸站储罐
                tjData:[ ],//天津站储罐
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
            console.log(this.gz_data)
            this.cfdData=this.gz_data.tankinfo1[0];
            for(var i=0;i<this.cfdData.length;i++){
                //this.oilHeight=this.cfdData[i].nowLevel;
                if(this.cfdData[i].runState==1){
                  this.blink=1
                }
            }
            //this.oilHeight
            this.tjData=this.gz_data.tankinfo2[0][0].station;
            this.gxDetails=this.gz_data.plan[0][0];
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
                console.log(id);
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
                if(id==1) this.guandaoDetail=1
                if(id==2) this.guandaoDetail=2
            },
            hideGuanDaoDetails(id){
                if(id==1) this.guandaoDetail=-1
                if(id==2) this.guandaoDetail=-1
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
      left 0px
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
        left 201px
        top 214px
        span 
          position absolute
          left 25px
          top 11px
          color rgb(174,118,37)
      .tube
        position absolute
        left 182px
        width: 900px;
        .tube1
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
              top 81px
              left 223px
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
            width 900px
            height 32px
            position absolute
            left 19px
            top 114px
          .img2
          .zr
            width 36px
            height 30px
            position absolute
            left 202px
            top 97px
          .zr
            left 400px
            width 225px
            height 115px
            top 23px
            span 
                position absolute
                left 97px
                top 128px
                color #FDB525
          .tube_color
          .yg_flow
            height 24px
            background rgba(32,112,209,1)
            opacity 0.34
            position absolute
            top 118px
          .yg_flow
            background:linear-gradient(90deg,rgb(0,255,234,0.9) 34%,rgba(255,255,234,1) 90%);
            opacity 0.82
            width 200px
            left 19px
            img 
              left 12px
              position absolute
              top 6px
    .end_station
      width 600px
      height 300px
      position relative
      right -1100px
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
        top 199px
        img
            width 95px
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
      left 863px
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


