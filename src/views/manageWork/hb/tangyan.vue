<template>
    <div class='traceWork_step'>
        <div class='first_station'>
            <ul class='yg' @mouseleave="hideDetails(1)">
                <li v-for='(item,index) in start_station' :key='index' @mouseenter="showDetails(index,1)">
                    <img src="../../../assets/pic_youguan.png"/>
                    <div class='yHeight'></div>
                    <span class='oilName'>34#</span>
                    <div class='ygDetails' :class='{active:index==current1}'>
                        <div class='sjtb'></div>
                        <div>
                            <p ><img class="yg_img" src="../../../assets/icon_chuguan.png" alt="">T-12罐</p>
                            <p v-for='(item,index) in ygDetails' :key='index'>
                                <span>{{item.name}}：</span>
                                <span>{{item.content}}</span>
                            </p>
                        </div>
                    </div>
                </li>
            </ul>        
            <div class='station_logo'>
                <img src="../../../assets/png_dibiao.png" alt="">
                <span>塘沽站</span>
            </div>
            <div class='tube'>
              <div class='tube1'  @mouseleave="hideGuanDaoDetails(1)">
                  <div class='tube_img1'>
                      <img class='img1' src="../../../assets/png_guandao.png" alt="">
                      <div class='famenDetails' :class='{active:guandaoDetail==1}'>
                          <div class='sjtb'></div>
                          <div class='famen_content'>
                              <p><img class="yg_img" src="../../../assets/icon_guanxian.png" alt="">管线信息</p>
                              <p v-for='(item,index) in gxDetails' :key='index'>
                                  <span>{{item.name}}：</span>
                                  <span>{{item.content}}</span>
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
          <span>天津石化</span>
        </div>
        <div class='other_station2'>
            <img src="../../../assets/png_wu.png" alt="">
            <span>燕山石化</span>
        </div>
        <div class='end_station'>
            <div class='cyg'>
                <ul class='yg' @mouseleave="hideDetails(2)">
                  <li v-for='(item,index) in end_station' :key='index' @mouseenter="showDetails(index,2)">
                      <img src="../../../assets/pic_youguan.png"/>
                      <div class='yHeight'></div>
                      <span class='oilName'>34#</span>
                      <div class='ygDetails' :class='{active:index==current2}'>
                          <div class='sjtb'></div>
                          <div>
                              <p style='margin-bottom:15px'><img class="yg_img" src="../../../assets/icon_chuguan.png" alt="">T-12罐</p>
                              <p v-for='(item,index) in ygDetails' :key='index'>
                                  <span>{{item.name}}：</span>
                                  <span>{{item.content}}</span>
                              </p>
                          </div>
                      </div>
                  </li>
                </ul>
                </div>
                <div class='station_logo'>
                <img src="../../../assets/png_dibiao.png" alt="">
                <span>天津站</span>
            </div>
            <div class='tube'>
                <div class='tube1' @mouseleave="hideGuanDaoDetails(2)">
                    <div class='tube_img1'>
                        <img class='img1' src="../../../assets/png_guandao.png" alt="">
                        <div class='famenDetails' :class='{active:guandaoDetail==2}'>
                            <div class='sjtb'></div>
                            <div class='famen_content'>
                                <p><img class="yg_img" src="../../../assets/icon_guanxian.png" alt="">管线信息</p>
                                <p v-for='(item,index) in gxDetails' :key='index'>
                                    <span>{{item.name}}：</span>
                                    <span>{{item.content}}</span>
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
                <div class='tube2'  @mouseleave="hideGuanDaoDetails(3)">
                    <div class='tube_img1'>
                        <img class='img1' src="../../../assets/png_guandao.png" alt="">
                        <div class='famenDetails' :class='{active:guandaoDetail==3}'>
                            <div class='sjtb'></div>
                            <div class='famen_content'>
                                <p><img class="yg_img" src="../../../assets/icon_guanxian.png" alt="">管线信息</p>
                                <p v-for='(item,index) in gxDetails' :key='index'>
                                    <span>{{item.name}}：</span>
                                    <span>{{item.content}}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class='yg_flow' @mouseover="showGuanDaoDetails(3)">
                        <img src="../../../assets/png_liuxiang.png" class='move ar-animated'>
                    </div>
                    <div class='tube_color' @mouseover="showGuanDaoDetails(3)"></div>
                    <div class='zr1'>
                        <img src="../../../assets/png_zhongjian.png" alt="">
                        <span>廊坊站</span>
                    </div>
                    <div class='zr2'>
                        <img src="../../../assets/png_zhongjian.png" alt="">
                        <span>牛口峪站</span>
                    </div>
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
                end_station:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],
                start_station:[1,2,3,4,5,6,7,8,9,10],
                current1:-1,current2:-1,current3:-1,current4:-1,current5:-1,current6:-1,guandaoDetail:0,
                ygDetails:[{"name":'油种',"content":'110%fff'},{"name":'实时液位',"content":''},{"name":'毛重',"content":''},
                {"name":'状态',"content":''},{"name":'密度',"content":'110%fff'},{"name":'粘度',"content":''},
                {"name":'硫含量',"content":''},{"name":'H2S气体含量',"content":''},{"name":'H2S液体含量',"content":''}],
                gxDetails:[{"name":'罐内油品',"content":'110%fff'},{"name":'已输量',"content":''},{"name":'混油长度',"content":''},
                {"name":'剩余时间',"content":''},{"name":'剩余长度',"content":'110%fff'},{"name":'累计流量',"content":''},
                {"name":'瞬时流量',"content":''}]

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
        left -1px
        width: 700px;
        .tube1
          .tubeName
            position absolute
            top 49px
            left 430px
          .tube_img1
            .famenDetails
              width 247px
              height 289px
              background #F7FBFF
              box-shadow 0 0 10px #D7D7D7
              position absolute
              top 88px
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
            width 506px
            height 32px
            position absolute
            left 202px
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
            left 203px
            img 
              left 12px
              position absolute
              top 6px
       
    .end_station
      width 600px
      height 300px
      position relative
      right -707px
      top -310px
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
        left 382px
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
              left 164px
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
            width 330px
            height 32px
            position absolute
            left 2px
            top 49px
          .tube_color
          .yg_flow
            height 24px
            background:rgba(32,112,209,1);
            opacity:0.34;
            position absolute
            top 53px
            left 2px
            width 330px  
          .yg_flow
            background:linear-gradient(90deg,rgb(0,255,234,0.9) 34%,rgba(255,255,234,1) 90%);
            opacity 0.82
            width 200px
            left 3px
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
          .img1 
          .tube_color
            top 171px
            width 770px
          .tube_img1
            .famenDetails
              top 130px
          .tube_color
            top 175px
          .yg_flow
            height 24px
            background:rgba(32,112,209,1);
            opacity:0.34;
            position absolute
            top 175px
            left 2px
            width 770px
          .yg_flow
            background:linear-gradient(90deg,rgb(0,255,234,0.9) 34%,rgba(255,255,234,1) 90%);
            opacity 0.82
            width 200px
            left 3px
          .zr1
          .zr2
            height 100px
            position relative
            top 120px
            img
                width 100px
                height 100px
                position absolute
                left 200px
               
            span 
                position absolute
                left 225px
                width 60px
                top 80px
                color #FDB525
          .zr2
            left 345px
            top 21px
    .other_station1
    .other_station2
      position absolute
      top 3px
      left 1400px
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
    .other_station2
      position absolute
      top 95px
      left 1840px
      width 236px
</style>


