<template>
    <div class='traceWork_step'>
        <div class='first_station'>
            <ul class='yg' @mouseleave="hideDetails(1)">
                <li v-for='(item,index) in tianjinData' :key='index' @mouseenter="showDetails(index,1)">
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
                <span>天津站</span>
            </div>
            <div class='tube'>
              <div class='tube1'>
                  <div class='tube_img1'  @mouseleave="hideGuanDaoDetails(1)">
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
                  <!-- <span class='tubeName'>白石线</span> -->
              </div>
            </div>
        </div>
        <div class='other_station1'>
          <img src="../../../assets/png_wu.png" alt="">
          <span>沧州炼化</span>
        </div>
        <div class='other_station2'>
            <img src="../../../assets/png_wu.png" alt="">
            <span>石家庄石化</span>
        </div>
       
        <div class='end_station'>
            <div class='cyg'>
                <ul class='yg' @mouseleave="hideDetails(2)">
                  <li v-for='(item,index) in cangzhouData' :key='index' @mouseenter="showDetails(index,2)">
                      <img src="../../../assets/pic_youguan.png"/>
                      <div class='yHeight'></div>
                      <span class='oilName'>34#</span>
                      <div class='ygDetails' :class='{active:index==current2}'>
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
                </div>
                <div class='station_logo'>
                <img src="../../../assets/png_dibiao.png" alt="">
                <span>沧州站</span>
            </div>
            <div class='tube'>
                <div class='tube1'>
                    <div class='tube_img1'  @mouseleave="hideGuanDaoDetails(2)">
                        <img class='img1' src="../../../assets/png_guandao.png" alt="">
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
                    <div class='yg_flow'>
                        <img src="../../../assets/png_liuxiang.png" class='move ar-animated'>
                    </div>
                    <div class='tube_color'  @mouseover="showGuanDaoDetails(2)"></div>
                    <!-- <span class='tubeName'>白石线</span> -->
                </div>
                <div class='tube2'>
                    <div class='tube_img1'  @mouseleave="hideGuanDaoDetails(3)">
                        <img class='img1' src="../../../assets/png_guandao.png" alt="">
                        <div class='famenDetails' :class='{active:guandaoDetail==3}'>
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
                    <div class='yg_flow'>
                        <img src="../../../assets/png_liuxiang.png" class='move ar-animated'>
                    </div>
                    <div class='tube_color'  @mouseover="showGuanDaoDetails(3)"></div>
                  
                    <!-- <span class='tubeName'>白石线</span> -->
                </div>
            </div>
        </div>
         <div class='other_station3'>
             <ul class='yg' @mouseleave="hideDetails(1)">
                <li  @mouseenter="showDetails(1,3)">
                    <img src="../../../assets/pic_youguan.png"/>
                    <div class='yHeight'></div>
                    <span class='oilName'>34#</span>
                    <div class='ygDetails' :class='{active:1==current3}'>
                        <div class='sjtb'></div>
                        <div>
                            <!-- <p ><img class="yg_img" src="../../../assets/icon_chuguan.png" alt="">T-12罐</p>
                            <p><span>油种：</span><span>{{item.oilName}}</span></p>
                            <p><span>实时液位：</span><span>{{item.nowLevel}} m</span></p>
                            <p><span>毛重：</span><span>{{item.grossWeight}} kg</span></p> -->
                            <!-- <p><span>罐前阀编号：</span><span>{{item.grossWeight}}</span></p>
                            <p><span>罐前阀开度：</span><span>{{item.runState}}</span></p> -->
                            <!-- <p><span>状态：</span><span>{{item.runState}}</span></p> -->
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
                <span>河间站</span>
            </div>
            <div class='zr2'>
                <img src="../../../assets/png_zhongjian.png" alt="">
                <span>安平站</span>
            </div>
            <div class='tube'>
              <div class='tube1'>
                  <div class='tube_img1'  @mouseleave="hideGuanDaoDetails(4)">
                      <img class='img1' src="../../../assets/png_guandao.png" alt="">
                      <div class='famenDetails' :class='{active:guandaoDetail==4}'>
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
                  <div class='yg_flow'  @mouseover="showGuanDaoDetails(4)">
                    <img src="../../../assets/png_liuxiang.png" class='move ar-animated'>
                  </div>
                  <div class='tube_color'  @mouseover="showGuanDaoDetails(4)"></div>
                  <!-- <span class='tubeName'>白石线</span> -->
              </div>
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
                start_station:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],
                current1:-1,current2:-1,current3:-1,current4:-1,current5:-1,current6:-1,guandaoDetail:0,
                tianjinData:[ ],//天津站储罐
                cangzhouData:[ ],//沧州站储罐
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
            this.tianjinData=this.gz_data.tankinfo1[0];
            for(var i=0;i<this.tianjinData.length;i++){
                //this.oilHeight=this.cfdData[i].nowLevel;
                if(this.tianjinData[i].runState==1){
                  this.blink=1
                }
            }
            //this.oilHeight
            this.cangzhouData=this.gz_data.tankinfo2[0][0].station;
            this.gxDetails=this.gz_data.plan[0][0];
          },
           showDetails(index,id){
                if(id==1){
                    this.current1=index
                }
                if(id==2){
                    this.current2=index
                }
                if(id==3){
                    this.current3=index
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
                if(id==3) this.guandaoDetail=3
            },
            hideGuanDaoDetails(id){
                if(id==1) this.guandaoDetail=-1
                if(id==2) this.guandaoDetail=-1
                if(id==3) this.guandaoDetail=-1
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
    .other_station3
      position relative
      width 384px
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
        left 384px
        top 214px
        span 
          position absolute
          left 25px
          top 11px
          color rgb(174,118,37)
      .tube
        position absolute
        left -1px
        width: 500px;
        .tube1
          .tubeName
            position absolute
            top 49px
            left 430px
          .tube_img1
            .famenDetails
              width 247px
              height 289px
              box-shadow 0 0 10px #D7D7D7
              background #F7FBFF
              position absolute
              top 84px
              left 460px
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
            width 526px
            height 32px
            position absolute
            left 385px
            top 131px
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
            top 134px
          .yg_flow
            background:linear-gradient(90deg,rgb(0,255,234,0.9) 34%,rgba(255,255,234,1) 90%);
            opacity 0.82
            width 200px
            left 386px
            img 
              left 12px
              position absolute
              top 6px
       
    .end_station
      width 600px
      height 300px
      position relative
      right -909px
      top -306px
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
        top 7px
        .tube1
        .tube2
          .tubeName
            position absolute
            top 108px
            left 413px
          .famenDetails
              width 247px
              height 289px
              background #F7FBFF
              box-shadow 0 0 10px #D7D7D7
              position absolute
              top 1px
              left 109px
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

          .img1 
            width 300px
            height 32px
            position absolute
            left 19px
            top 49px
          .tube_color
          .yg_flow
            height 24px
            background:rgba(32,112,209,1);
            opacity:0.34;
            position absolute
            top 53px
            left 20px
            width 300px  
          .yg_flow
            background:linear-gradient(90deg,rgb(0,255,234,0.9) 34%,rgba(255,255,234,1) 90%);
            opacity 0.82
            width 200px
            img 
              left 12px
              position absolute
              top 6px    
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
        .tube2
          .famenDetails
            top 127px 
          .img1 
            top 171px
            width 587px
          .tube_color
          .yg_flow
            height 24px
            background:rgba(32,112,209,1);
            opacity:0.34;
            position absolute
            top 175px
            left 20px
            width 587px
          .yg_flow
            background:linear-gradient(90deg,rgb(0,255,234,0.9) 34%,rgba(255,255,234,1) 90%);
            opacity 0.82
            width 100px
        
    .other_station1
    .other_station2
      position absolute
      top 3px
      left 1390px
      width 236px
      img 
        width 200px
        height 150px
        position absolute
        left -3px
        top -1px
      span
        position absolute
        left 106px
        top 4px
        font-size 10px
        color #ae7625
    .other_station2
      position absolute
      top 95px
      left 2312px
      width 236px
    .other_station2
      img 
        width 250px
        height 170px
      span
        left 130px
    .other_station3
        left 1697px
        top -446px
        width 69px
        height 121px
        .yg
          li
            .yHeight
              bottom -68px
              right -50px
            .oilName
              color #000
              left -5px

        .station_logo
            top 54px
            left -31px
            width 200px
            img
                width 67px
                height 67px
            span
                left 118px
                top 6px
        .tube
            .tube1
                .tube_img1
                    img 
                        left 70px
                        top -88px
                        width 570px
                    .famenDetails
                      top -134px
                      left 140px
                      z-index 11
                .yg_flow
                .tube_color
                    left 70px
                    top -85px
                    width 570px
                .yg_flow
                    width 200px
                    img 
                        height 14px
                        width 20px
        .zr2
            height 100px
            position relative
            left 250px
            top -37px
            z-index 10
        img
            width 100px
            height 100px
            position absolute
        span 
            position absolute
            left 50px
            width 60px
            top 80px
            color #FDB525
</style>


