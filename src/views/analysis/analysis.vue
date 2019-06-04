<template>
 <!-- 统计分析 -->
  <div>
    <Card class='first_card' style='height:151px;margin-top:102px; margin-bottom:30px'>
      <div class='card_title'>
        <img src="../../assets/icon_shijian.png"> 今天是{{todayDate}}
      </div>
      <div class='title_tj'>
        <ul>
          <li>  
            <p><span class='number1'>{{today_num}} </span> <span class='dw'> 万吨</span></p>
            <p>今日输油量</p>
          </li>
          <li>
            <p><span class='number2'>{{cal_num}}</span> <span class='dw'> 万吨</span></p>
            <p>累计输油量</p>
          </li>
        </ul>
      </div>
    </Card>
    <div>
      <Row  :gutter="30">
        <Col span="12">
          <Card>
            <div id="myChart1" :style="{width:'93%', height:'332px'}"></div>
          </Card>
        </Col>
        <Col span="12">
          <Card style='margin-left:30px'>
            <div id="myChart2" :style="{width:'93%', height:'332px'}"></div>
          </Card>
        </Col>
      </Row>
    </div>
    <Card class='card1'>
      <div class='qh'>
        <Select v-show="show_cal" v-model="tube_name" @on-query-change='sel_tube' style="width:200px">
          <Option v-for="(item,index) in select_tube" :value="item.tubeName" :key='index'>{{item.tubeName}} <span style='display:none'>{{item.tubeId}}</span> </Option>
        </Select>
        <ul class='qhul'>
          <li @click='changeStyle(1)' :style="style1">今日</li>
          <li @click='changeStyle(2)' :style="style2">累计</li>
        </ul>
      </div>
      <div id="myChart3" :style="{width:'93%',height:'300px',position:'absolute',top:'99px'}" v-show='today1'></div>
      <div :style="{width:'93%',height:'300px',position:'absolute',top:'99px'}" v-show='lj1'>
         <div id="myChart4" :style="{width:'1201px',height:'300px'}" v-show='lj1'></div>
      </div>
    </Card>
    <Card class='card1'>
      <div class='qh2'>
         <ul class='qhul2'>
            <li @click='changeStyle(3)' :style="style3">今日</li>
            <li @click='changeStyle(4)' :style="style4">累计</li>
        </ul>
      </div>
       
      <div id="myChart5" :style="{width:'93%', height:'300px'}" v-show='today2'></div>
      <div :style="{width:'93%',height:'300px',position:'absolute',top:'99px'}" v-show='lj2'>
        <div id="myChart6" :style="{width:'1201px',height:'300px'}"></div>
      </div>
    </Card>
    <Card class='card1'>
      <div>
        <p class='title_yg'>原油管网全部油站库存量统计  </p>
        <p class='title_s_yg'>单位:万吨</p>
        <ul>
          <li class='yg' v-for='(item,index) in stationLevel' :key='index'>
            <div :style="'height:'+item[1]/5+'px'"></div>
            <img src="../../assets/pic_big_youguan.png" alt="">
            <span>{{item[1]}}</span>
            <p>{{item[0]}}</p>
          </li>
        </ul>
      </div>
    </Card>
  </div>
</template>

<script>
import Qs from 'qs'
export default {
  data(){
      return {
        style1:'background:rgba(241,247,255,1);border:1px solid #539BF3;color:rgba(83,155,243,1)',style2:'', style3:'background:rgba(241,247,255,1);border:1px solid #539BF3;color:rgba(83,155,243,1)',style4:'',
        gHeight:'height:100px',today1:true,lj1:false,today_num:'',cal_num:'',
        today2:true,lj2:false,todayDate:'',select_tube:[],tube_name:'日仪线',stationLevel:[],
        oilSumFolw:[],oilSumFolw_num:[],toDayFolw:[],toDayFolw_num:[],
        comparativelyStationFolw:[],comparativelyStationFolw_num:[],sumStationFolw:[],sumStationFolw_num:[],
        comparativelyFolw:[],comparativelyFolw_num:[],sumFolw:[],sumFolw_num:[],show_cal:false
      }
  },
  mounted(){
    this.nowTime();
     //管线列表
    this.axios.post('/OilTrack/line/lines').then(res=>{
      this.select_tube=res.data.data
    })
    this.getAnalysis()
  },
  methods:{
    //  统计分析数据
    getAnalysis(){
      this.axios.post("/OilTrack/statistics/liststatistics",Qs.stringify({stationName:this.tube_name})).then(res=>{
        console.log(res.data,this.tube_name)
        this.stationLevel=res.data.StationLevel//原油管网全部油站库存量统计
        for(var i=0;i<res.data.sumFolw.length;i++){
          this.sumFolw.push(res.data.sumFolw[i][0])//原油管网全部油站总输油量统计，累计
          this.sumFolw_num.push(res.data.sumFolw[i][1])
          if(res.data.sumFolw[i][0]==this.todayDate){
            this.cal_num=res.data.sumFolw[i][1]
          }
        }
        for(var i=0;i<res.data.comparativelyFolw.length;i++){
          this.comparativelyFolw.push(res.data.comparativelyFolw[i][0])//原油管网全部油站总输油量统计，今日
          this.comparativelyFolw_num.push(res.data.comparativelyFolw[i][1])
          if(res.data.comparativelyFolw[i][0]==this.todayDate){
            this.today_num=res.data.comparativelyFolw[i][1]
          }
        }
        for(var i=0;i<res.data.comparativelyStationFolw.length;i++){
          this.comparativelyStationFolw.push(res.data.comparativelyStationFolw[i][0])//各站输油量统计，今日
          this.comparativelyStationFolw_num.push(res.data.comparativelyStationFolw[i][1])
        }
        console.log(res.data.comparativelyStationFolw,"//各站输油量统计，今日")
        for(var i=0;i<res.data.sumStationFolw.length;i++){
          this.sumStationFolw.push(res.data.sumStationFolw[i][0])//各站输油量统计，累计
          this.sumStationFolw_num.push(res.data.sumStationFolw[i][1])
        }
        console.log(this.sumStationFolw,"//各站输油量统计，累计")
        for(var i=0;i<res.data.OilSumFolw.length;i++){
          this.oilSumFolw.push(res.data.OilSumFolw[i][0])//原油管网输送油品种类及输量统计，累计
          this.oilSumFolw_num.push(res.data.OilSumFolw[i][1])
        }
        for(var i=0;i<res.data.toDayFolw.length;i++){
          this.toDayFolw.push(res.data.toDayFolw[i][0])//原油管网输送油品种类及输量统计，今日
          this.toDayFolw_num.push(res.data.toDayFolw[i][1])
        }
        console.log(this.toDayFolw,"今日", this.oilSumFolw_num)
        var ss=this.oilSumFolw_num
        var aa=this.toDayFolw_num
        let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
        myChart1.setOption({
          color:['#3D7AD5'],
          title:{
              text:'原油管网全部油站总输油量统计（按日）  ',
              x:'center',
              y:'top',
              textAlign:'left'
          },
          tooltip : {
              trigger: 'axis',
          },
          calculable : true,
          xAxis : [
              {
                  type : 'category',
                  boundaryGap : false,
                  data : this.comparativelyFolw
              }
          ],
          yAxis : [
              {
                  type : 'value',
                  name:'单位：万吨'
              }
          ],
          series : [
              {
                  name:'输油量',
                  type:'line',
                  stack: '总量',
                  symbolSize:6, 
                  itemStyle: {
                  },
                  areaStyle: {
                      // 区域图，纵向渐变填充
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0,
                          color: 'rgba(61,122,213,1)'
                      }, {
                          offset: 1,
                          color: 'rgba(61,122,213,0)'
                      }])
                  },
                  data:this.comparativelyFolw_num
              }
          ]        
        });
        let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
        myChart2.setOption({
          color:['#FF6695'],
          title:{
              text:'原油管网全部油站总输油量统计（累计）  ',
              x:'center',
              y:'top',
              textAlign:'left'
          },
          tooltip : {
              trigger: 'axis'
          },
          calculable : true,
          xAxis : [
              {
                  type : 'category',
                  boundaryGap : false,
                  data : this.sumFolw
              }
          ],
          yAxis : [
              {
                  type : 'value'
              }
          ],
          series : [
              {
                  name:'输油量',
                  symbolSize:6, 
                  type:'line',
                  stack: '总量',
                  itemStyle: {
                    
                  },
                  areaStyle: {
                      // 区域图，纵向渐变填充
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0,
                          color: 'rgba(255,102,149,1)'
                      }, {
                          offset: 1,
                          color: 'rgba(255,102,149,0)'
                      }])
                  },
                  data:this.sumFolw_num
              }
          ]        
        });
        let myChart3 = this.$echarts.init(document.getElementById('myChart3'))
        myChart3.setOption({
            color: 'rgba(61,122,213,1)',
            title: {
                text: '各油站输油量统计',
                x:'center',
                y:'top',
                textAlign:'left'
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            
                    type : 'shadow'
                },
                formatter: function (params) {
                    var tar;
                    tar = params[0];
                    return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value+"万吨";
                }
            },
            
            xAxis : [
                {
                    type : 'category',
                    splitLine: {show:false},
                    data : this.comparativelyStationFolw
                }
            ],
            yAxis : [
                {
                    name:"单位:万吨",
                    type:'value',
                    max:2000,
                    splitNumber:10
                }
            ],
            series : [
                {
                    name:'辅助',
                    type:'bar',
                    stack: '总量',
                    itemStyle:{
                      
                    },
                    //data:this.comparativelyStationFolw_num
                },
                {
                    name:'输油量',
                    type:'bar',
                    stack: '总量',
                    itemStyle : { normal: {label : {show: true, position: 'top'}}},
                    data:this.comparativelyStationFolw_num
                }
            ]
        });
        let myChart4 = this.$echarts.init(document.getElementById('myChart4'))
        myChart4.setOption({
          title:{
            text:'各油站输油量统计',
            x:'center',
            y:'top',
            textAlign:'left'
          },
          tooltip : {
            trigger: 'axis'
          },
          
          calculable : true,
          xAxis : [
              {
                  type : 'category',
                  boundaryGap : false,
                  data :this.sumStationFolw
              }
          ],
          yAxis : [
              {
                  type : 'value',
                  name:'单位：万吨',
                  //data : ["100","200","300","400"]
              }
          ],
          series : [
              {
                name:'日照站',
                type:'line',
                stack: '总量',
                symbol: 'none',
                smooth:true,
                itemStyle: {
                  color:'#FF6695'
                },
                data:this.sumStationFolw_num
              }
          ]
        });
        let myChart5 = this.$echarts.init(document.getElementById('myChart5'))
        myChart5.setOption({
            title: {
                text: '原油管网输送油品种类及数量统计',
                x:'center',
                y:'top',
                textAlign:'left'
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {          
                    type : 'shadow'  
                },
                formatter: function (params) {
                    var tar;
                    if (params[1].value != '-') {
                        tar = params[1];
                    }
                    else {
                        tar = params[0];
                    }
                    return tar.name + ' : '+  tar.value +'<br/>' ;
                }
            },       
            xAxis : [
                {
                    type : 'category',
                    splitLine: {show:false},
                    data : this.toDayFolw,
                    axisTick:{
                      "show":false
                    },
                }
            ],
            yAxis : [
                { 
                    name:"单位:万吨",
                    type:'value',
                    max:1800,
                    splitNumber:10
                }
            ],
            series : [
                {
                    name:'辅助',
                    type:'bar',
                    stack: '总量',
                    barWidth : 40,
                    itemStyle:{
                        normal:{
                            barBorderColor:'rgba(0,0,0,0)',
                            color:'rgba(0,0,0,0)'
                        },
                        emphasis:{
                            barBorderColor:'rgba(0,0,0,0)',
                            color:'rgba(0,0,0,0)'
                        }
                    },
                    data:function(){
                          var start_num=[0]
                          var s=0
                          for(var i=0;i<ss.length-1;i++){
                            s=ss[i]-ss[i+1]
                            start_num.push(s)
                          }
                          console.log(start_num)
                          return start_num
                        }()
                },
                {
                    name:'市场份额',
                    type:'bar',
                    stack: '总量',
                    itemStyle : { normal: {label : {show: true, position: 'top'}}},
                    data:this.toDayFolw_num
                }
            ]
        });
        let myChart6 = this.$echarts.init(document.getElementById('myChart6'))
        myChart6.setOption({
            title: {
                text: '原油管网输送油品种类及数量统计',
                x:'center',
                y:'top',
                textAlign:'left'
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {         
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function (params) {
                    var tar;
                    if (params[1].value != '-') {
                        tar = params[1];
                    }
                    else {
                        tar = params[0];
                    }
                    return tar.name + ' : '+  tar.value +'<br/>' ;
                }
            },       
            xAxis : [
                {
                    type : 'category',
                    nameLocation :'middle',
                    splitLine: {show:false},
                    data : this.oilSumFolw ,
                    axisTick:{
                      "show":false
                    },
                }
            ],
            yAxis : [
                { 
                    name:"单位:万吨",
                    type:'value',
                    max:2000,
                    splitNumber:10
                }
            ],
            series : [
                {
                    name:'辅助',
                    type:'bar',
                    stack: '总量',
                    barWidth : 40,
                    itemStyle:{
                        normal:{  
                            // color: function (params){
                            //     var colorList = ['rgb(164,205,238)','rgb(42,170,227)','rgb(25,46,94)','rgb(195,229,235)'];
                            //     return colorList[params.dataIndex];
                            // }
                        },
                    },
                    data:function(){
                          var start_num=[0]
                          var s=0
                          for(var i=0;i<ss.length-1;i++){
                            
                            s=ss[1]-ss[0]
                            start_num.push(s)
                          }
                          console.log(start_num)
                          return start_num
                        }()
                },
                {
                    name:'市场份额',
                    type:'bar',
                    stack: '总量',
                    itemStyle : { normal: {label : {show: true, position: 'top'}}},
                    data:this.oilSumFolw_num
                }
            ]
        });
      })
    },
    //获取当前时间
    nowTime(){
      let myDate=new Date();
      var year =  myDate.getFullYear();
      var month =  myDate.getMonth() + 1;
      var day =  myDate.getDate();
      if (month < 10) {
          month = "0" + month;
      }
      if (day < 10) {
          day = "0" + day;
      }
      this.todayDate=year + "年" + month + "月" + day + "日";    //获取当前日期
    },
    changeStyle(index){    
      let ss=  'background:rgba(241,247,255,1);border:1px solid #539BF3;color:rgba(83,155,243,1)'
      if(index==1){this.style2='';this.show_cal=false,this.style1=ss;this.today1=true;this.lj1=false} 
      if(index==2){this.style1='';this.show_cal=true,this.style2=ss;this.today1=false;this.lj1=true} 
      if(index==3){this.style4='';this.style3=ss;this.today2=true;this.lj2=false} 
      if(index==4){this.style3='';this.style4=ss;this.today2=false;this.lj2=true} 
    },
    sel_tube(e){
      console.log(e)
      this.tube_name=e.split(' ')[0]
      //this.tube_id=e.split(' ')[1]
      this.getAnalysis()
    }
  }
};
</script>
<style lang="stylus">
  .ivu-select-selection
    border-radius 0px
    margin-right 10px
</style>

<style lang="stylus" scoped>
  .qh
  .qh2
    width 400px
    float right
    position relative
    top 45px
    z-index 10
    .ivu-select-single 
    .ivu-select-selection
      width 157px
      float left
    .qhul
    .qhul2
      li
        float left
        cursor pointer
        text-align center
        width 92px
        line-height 30px
        border 1px solid #D7D7D7
        color #666666
        font-size 14px
      li:last-child
        border-left none
  .qh2
    left 208px
  .ivu-card-bordered
    height 383px
  .card1
    height 383px
    margin-top 30px
  .card2
    width 894px
    height 383px
    margin-top 30px
    float left
    display inline-block
  .card_title
    text-align left
    img 
      vertical-align middle
      margin-right 8px
  .first_card
    background url(../../assets/pic_poxing.png)
    background-size 1816px 157px
  .title_yg
    font-size 18px
    color #504F55
 
  
  .title_s_yg
    font-size 14px
    color #AFAFB1
  .active
    background rgba(241,247,255,1)
    border 1px solid #539BF3
    color rgba(83,155,243,1)
  .yg
    position relative
    height 248px
    width 156px
    text-align center
    margin-left 66px
    float left
    img 
      position absolute
      bottom 30px
      left 0
      z-index 0
    p
      position absolute
      bottom 0
      left 37px
      font-size 14px
      color #5C5A68
    span  
      position absolute
      bottom 100px
      left 41px
      font-size 20px
    div 
      position absolute
      bottom 30px
      left 4px
      z-index 10
      width 112px
      // height 74px
      background: -moz-linear-gradient(to right, rgba(117,156,214,.7) 0%, rgba(168,195,236,.7) 30%,rgba(61,122,213,.7) 100%);
      background: -webkit-linear-gradient(to right, rgba(117,156,214,.7) 0%, rgba(168,195,236,.7) 30%,rgba(61,122,213,.7) 100%);
      background: -o-linear-gradient(to right, rgba(117,156,214,.7) 0%, rgba(168,195,236,.7) 30%,rgba(61,122,213,.7) 100%);
      background: -ms-linear-gradient(to right, rgba(117,156,214,.7) 0%, rgba(168,195,236,.7) 30%,rgba(61,122,213,.7) 100%);
      background: linear-gradient(to right, rgba(117,156,214,.7) 0%, rgba(168,195,236,.7) 30%,rgba(61,122,213,.7) 100%);
  .title_tj
    margin 0 auto
    height 100px
    width 800px
    ul
      text-align center
      li
        float left 
        width 400px
        .number1
          font-weight bold
          color #3D7AD5
          font-size 41px
        .number2
          font-weight bold
          color #FF6695
          font-size 41px
        p:last-child
          color #000
          font-size 16px
        .dw
          font-weight 600
          font-size 20px
          color #D7D7D7
      li:first-child
        border-right 1px solid #E5E5E5






</style>