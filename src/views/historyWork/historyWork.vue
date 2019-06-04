<template>
 <!--历史数据 -->
    <div style="padding: 20px;height:890px" class='historyWork'>
        <Card>
             <div style="min-height: 200px;">
                <div class='select_box'>
                    <span>
                      管线 
                      <Select v-model="tube_name" @on-query-change='sel_tube' style="width:200px">
                        <Option v-for="(item,index) in select_tube" :value="item.tubeName" :key='index'>{{item.tubeName}} <span style='display:none'>{{item.tubeId}}</span> </Option>
                      </Select>
                      计划类型
                      <Select v-model="plan_type" style="width:200px">
                        <Option v-for="(item,index) in select_type" :value="item" :key='index'>{{ item}}</Option>
                      </Select>&nbsp;
                      起止时间
                      <DatePicker type="date" format="yyyy-MM-dd" placeholder="请选择起始时间" v-model='start_time' style="width: 200px" :options="startTimeOption" @on-change="onStartTimeChange"></DatePicker> - <DatePicker type="date" format="yyyy-MM-dd" placeholder="请选择结束时间" v-model='end_time' style="width: 200px" :options="endTimeOption" @on-change="onEndTimeChange"></DatePicker>&nbsp;
                      <Button type="primary" icon="ios-search" @click='search_history'>搜索</Button>&nbsp;
                      <Button @click='reset'>重置</Button>
                    </span>
                </div>
                <div class='content'>
                  <Table :columns="columns1" :data="data1"></Table>
                  <Page :total="total" :pageSize="pageSize" show-total @on-change='changePageNum'/>
                  <!-- 输油详情模态框 -->
                  <Modal
                      title="输油详情"
                      v-model="showDetail"
                      class="vertical-center-modal" width='396'>
                      <table class='detail_table'>
                        <tr>
                          <td>输油类型：</td>
                          <td>{{gx_details.planType==0?'输油计划':'卸油计划'}}</td>
                        </tr>
                        <tr>
                          <td>管线名称：</td>
                          <td>{{gx_details.lineinfoName}}</td>
                        </tr>
                        <tr>
                          <td>油品名称：</td>
                          <td>{{gx_details.oilName}}</td>
                        </tr>
                        <tr>
                          <td>输油油罐：</td>
                          <td>{{gx_details.storageTankStartName}}</td>
                        </tr>
                        <tr>
                          <td>收油油罐：</td>
                          <td>{{gx_details.storageTankEndName}}</td>
                        </tr>
                        <tr>
                          <td>混油长度：</td>
                          <td>{{gx_details.planType}}</td>
                        </tr>
                        <tr>
                          <td>输油时长：</td>
                          <td>{{gx_details.duration}}</td>
                        </tr>
                        <tr>
                          <td>输油起始时间：</td>
                          <td>{{gx_details.startTime|getTime}}</td>
                        </tr>
                        <tr>
                          <td>输油结束时间：</td>
                          <td>{{gx_details.endTime|getTime}}</td>
                        </tr>
                        <tr>
                          <td>计划创始人：</td>
                          <td>{{gx_details.triggerType}}</td>
                        </tr>
                      </table>
                  </Modal>
                </div>
            </div>
        </Card>
    </div>
</template>

<script>
import {line,listhistory} from './api.js'
import Qs from 'qs'
export default {
  data(){
      return {
        start_time:'',end_time:'',tubeId:'',startTimeOption: {},endTimeOption: {},tube_name:'',
        select_type:['全部','输油计划','卸油计划'],plan_type:'',showDetail:false, cz:require('../../assets/btn_nor_xqing.png'),
        select_tube:[],gx_details:{},total:0,history_list:[],pageSize:10,
        columns1: [
                    {
                        title: '管线名称',
                        key: 'lineinfoName'
                    },
                    {
                        title: '计划类型',
                        key: 'planType',	    
                        render: (h, params) => {
                          var text=params.row.planType==1?'输油计划':'卸油计划'
                          return h('span',{
                          },text)
                        }
          
                    },
                    {
                        title: '油品名称',
                        key: 'oilName'
                    },
                     {
                        title: '输油量（万吨）',
                        key: 'oilVolume'
                    },
                     {
                        title: '执行时间',
                        key: 'startTime',
                        align: 'center',
                        render:(h,params) => {
                          var startTime=this.$options.filters.getTime(params.row.startTime)
                          return h('span',{
                          },startTime)
                        }
                    },
                     {
                        title: '完成时间',
                        key: 'endTime',
                        align: 'center',
                        render:(h,params) => {
                          var endTime=this.$options.filters.getTime(params.row.endTime)
                          return h('span',{
                          },endTime)
                        }
                    }, 
                    {
                        title: '操作',
                        key: 'cz',
                        render: (h, params) => {
                              return h('img',{
                                  attrs:{
                                      src:this.cz,style:"width:20px;height:19px;"
                                  },
                                  on: {
                                    click: () => {
                                        this.showDetail=true
                                        this.gx_details=params.row
                                    }
                                  }
                              });
                        }
                    }, 
                ],
                data1: [ ]
      }
  },
  filters: {
    
    getTime: function (time){
      function add0(m){return m<10?'0'+m:m };
      var time = new Date(time);
      var y = time.getFullYear();
      var m = time.getMonth()+1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      var endTime=y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
      return endTime
    }
  },
  mounted(){
    this.onStartTimeChange(this.start_time)
		this.onEndTimeChange(this.end_time)

    line().then(res=>{
      this.select_tube=res.data.data
    })
    //获取历史数据列表
    listhistory().then(res=>{
      this.history_list=res.data.data
      this.total=res.data.total
      if(res.data.total<this.pageSize){
         this.data1=this.history_list
      }else{
        this.data1=this.history_list.slice(0,this.pageSize);
      }
    })
  },
  methods:{
    //分页
    changePageNum(){
      let _start = (index - 1) * this.pageSize;
      let _end = index * this.pageSize;
      this.data3 = this.history_list.slice(_start, _end);   
    },
    //起始时间
    onStartTimeChange(startTime,type) {
       this.start_time=startTime
      this.endTimeOption = {
        disabledDate(endTime) {
          return endTime < new Date(startTime) || endTime > Date.now()
        }
      }
    },
    //结束时间
    onEndTimeChange(endTime, type) {
      this.end_time=endTime
      this.startTimeOption = {
        disabledDate(startTime) {
          return startTime > new Date(endTime) || startTime > Date.now()
        }
      }
    },
    //重置
    reset(){
      this.start_time='';
      this.end_time='';
      this.select_type='';
      this.tube_name='';
    },
    sel_tube(e){
      this.tube_name=e.split(' ')[0]
      this.tubeId=e.split(' ')[1]
    },
    //搜索历史数据
    search_history(){
      if(this.plan_type=='输油计划') this.plan_type=1
      else if(this.plan_type=='卸油计划') this.plan_type=2
      var data={planType:this.plan_type,lineName:this.tubeId,startTime:this.start_time,endTime:this.end_time}
      if(this.plan_type=='全部') delete data.planType
      this.axios.post("/OilTrack/planhistory/listhistory",Qs.stringify(data)).then(res=>{
        this.data1=res.data.data
      })
    },
   
  }
};
</script>
<style lang="stylus">
    .ivu-select
      width 190px !important
      height 36px
    
    .ivu-date-picker
      width 156px!important
    
    .ivu-btn-primary
      height 30px
    .ivu-select
      margin-left 10px
      margin-right 10px
    .ivu-page
      margin-top 10px
      float right
    .ivu-modal-footer
      display none
    .select_box
      border-bottom 1px dashed #0001
      margin-bottom 10px
      padding-bottom 10px
    .ivu-card-bordered
      margin-top 73px
      height 753px
    .detail_table
      width 360px
      height 500px
    .ivu-select-selection
    .ivu-input
    .ivu-btn
      -webkit-border-radius 0px

    .detail_table tr
      padding 5px
    
    .detail_table 
      tr 
        td:last-child
          text-align right
    .ivu-modal 
      height 541px!important
    .ivu-modal-header
      background #3D7AD5
</style>
