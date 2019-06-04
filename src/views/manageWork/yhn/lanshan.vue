<template>
     <!-- 岚山站——白沙湾 -->
    <div class='traceWork_step'>
        <div class='first_station'>
            <ul class='yg' @mouseleave="hideDetails(1)">
                <li v-for='(item,index) in rizhaoData' :key='index' @mouseenter="showDetails(index,1)">
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
                <span>岚山站</span>
            </div>
            <div class='tube'>
                <div class='tube1' @mouseleave="hideGuanDaoDetails(1)">
                    <div class='tube_img1'>
                        <img class='img1' src="../../../assets/png_guandao.png" alt="" @mouseover="showGuanDaoDetails(1)">
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
                    <div class='famen_img1' @mouseleave="hideFaMenDetails(1)">
                        <img class='img2' src="../../../assets/png_famen.png" alt="" @mouseover="showFaMenDetails(1)">
                        <div class='famenDetails' :class='{active:current3==1}'>
                            <div class='sjtb'></div>
                            <div class='famen_content'>
                                <p><img class="yg_img" src="../../../assets/icon_famen.png" alt=""><span> 出站阀</span></p>
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
                                <p><img class="yg_img" src="../../../assets/icon_famen.png" alt=""><span> 出站阀</span></p>
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
                    <img class='img4' src="../../../assets/png_youtou.png" alt="">
                    <span class='tubeName'>岚白711线</span>
                </div>
                <div class='tube2'  @mouseleave="hideGuanDaoDetails(2)">
                    <div class='tube_img2'>
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
                    <div class='famen_img1' @mouseleave="hideFaMenDetails(3)">
                        <img class='img2' src="../../../assets/png_famen.png" alt="" @mouseover="showFaMenDetails(3)">
                        <div class='famenDetails' :class='{active:current5==1}'>
                            <div class='sjtb'></div>
                            <div class='famen_content'>
                                <p><img class="yg_img" src="../../../assets/icon_famen.png" alt=""><span> 出站阀</span></p>
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
                    <div class='famen_img2' @mouseleave="hideFaMenDetails(4)">
                        <img class='img3' src="../../../assets/png_famen.png" alt="" @mouseover="showFaMenDetails(4)">
                        <div class='famenDetails' :class='{active:current6==1}'>
                            <div class='sjtb'></div>
                            <div class='famen_content'>
                                <p><img class="yg_img" src="../../../assets/icon_famen.png" alt=""><span> 出站阀</span></p>
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
                    <img class='img4' src="../../../assets/png_youtou.png" alt="">
                    <span class='tubeName'>岚白762线</span>
                </div>
            </div>
        </div>
        <div class='end_station'>
            <div class='cyg'>
                <ul class='yg' @mouseleave="hideDetails(2)">
                    <li v-for='(item,index) in yizhengData' :key='index' @mouseenter="showDetails(index,2)">
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
                <span>白沙湾</span>
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
                showDetailsModel:false,current1:-1,current2:-1,current3:-1,current4:-1,current5:-1,current6:-1,guandaoDetail:0,
                ygDetails:[],
                rizhaoData:[ ],//日照站储罐
                yizhengData:[ ],//仪征站储罐
                line:{},//管段信息              
                gxDetails:[],//输油计划跟踪     
                gzInfo:{},    

            }
        },
        props:['tube_name','gz_wave','gz_type','gz_xz','gz_data'],
        methods:{
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
    .first_station
        position relative
        width 201px
        height 308px
        background url('../../../assets/pic_chuxiang.jpg')
        padding 9px
        float left
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
            left -1px
            .tube1
                .famen_img1
                .famen_img2
                .tube_img1
                    .famenDetails
                        width 247px
                        height 170px
                        background #F7FBFF
                        box-shadow 0 0 10px #D7D7D7
                        position absolute
                        top 59px
                        left 237px
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
                             p:first-child        
                                .yg_img
                                span
                                    width 30px
                                    height 30px
                                    vertical-align middle
                                    position absolute
                                    left 75px
                                span
                                    left 110px
                                    width 59px      
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
                        left 916px
                        padding 10px
                .tube_img1
                    .famenDetails
                        top 79px
                        left 500px
                        height 320px  
                .tube_img2
                    .famenDetails
                        top 79px
                        left 500px
                        height 320px   
            .tube1
            .tube2
                position absolute
                left 0px
                top -87px
                width 500px
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
                    top 159px
                    left 562px
                .tubeName
                    position absolute
                    top 108px
                    left 520px
                    width 100px

                .tube_color
                .yg_flow
                    height 24px
                    width 716px
                    background rgba(32,112,209,1)
                    opacity 0.34
                    position absolute
                    top 132px
                    left 203px  
                .yg_flow
                    background:linear-gradient(90deg,rgb(0,255,234,0.9) 34%,rgba(255,255,234,1) 90%);
                    opacity 0.82
                    width 200px
                    left 203px
                img 
                    //left 12px
                    position absolute
                    top 6px
            .tube2
                top 30px
                .tube_img2
                .famen_img1
                .famen_img2
                    .famenDetails
                        width 247px
                        height 170px
                        background #F7FBFF
                        box-shadow 0 0 10px #D7D7D7
                        position absolute
                        top 59px
                        left 237px
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
                            p:first-child        
                                .yg_img
                                span
                                    width 30px
                                    height 30px
                                    vertical-align middle
                                    position absolute
                                    left 75px
                                span
                                    left 110px
                                    width 59px
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
                        left 916px
                .tube_img2
                    .famenDetails
                        top 83px
                        left 500px
                        height 320px   
                .tube_color
                .yg_flow
                    height 24px
                    width 716px
                    background rgba(32,112,209,1)
                    opacity 0.34
                    position absolute
                    top 132px
                    left 203px  
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
      right -917px
      top 0px
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


