<template>
     <div>
        <div class='select_box'>
            <span style='float:left;'>
                起止时间  <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择起始时间" v-model='start_time' style="width: 200px" :options="startTimeOption" @on-change="onStartTimeChange"></DatePicker> - <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss"  placeholder="请选择结束时间" v-model='end_time' style="width: 200px" :options="endTimeOption" @on-change="onEndTimeChange"></DatePicker>&nbsp;
            </span>                   
            <span style='float:left;margin-left:10px'>
                <Input search enter-button v-model='kwords' placeholder="关键词" @on-search='searchLog'/>
            </span>
            <span class='updateCg' @click='setStart'>
                <Button>重置</Button>
            </span>
            <span style='float:right;'>
                批量删除  <Select v-model="delete_time" style="width:200px" @on-change='getStartTime'>
                    <Option v-for="(item,index) in timeList" :value="item" :key="index">{{item}}</Option>
                </Select>
                <Button @click='deleteLog'>删除</Button>
            </span>
        </div>
        <Table ref="selection" @on-selection-change='isSelect' :columns="columns1" :data="data1"></Table>
        <Page :total="log_total" show-total @on-change='changePageNum'/>
         <!-- 未选中行时模态框 -->
        <Modal v-model="showError">
          <Icon type="md-close-circle" style='font-size:30px;margin-right:20px;color:#E6A23C'/>
          <span  style='font-size:16px'>请选择要操作的数据</span>
        </Modal>
    </div>
</template>
<script>
    export default {
        data(){
          return {
             start_time:'',end_time:'',startTimeOption: {},endTimeOption: {},kwords:'',delete_time:'',logList:[],
            value:'',model1: '',timeList:["一周前","一个月前","半年前"],log_total:0,pageSize:10,log_selected:[],showError:false,
            delete_start:'',columns1:[
              {
                type: 'selection',
                width:60
              },
              {
                  title: '单位名称',
                  key: 'operationInfo'
              }, 
              {
                  title: '操作人',
                  key: 'operationUser'
              },
              {
                  title: '操作类型',
                  key: 'operationType'
              },
              {
                  title: '操作日期',
                  key: 'operationTime'
              },
              {
                  title: '操作URL',
                  align: 'center',
                  key: 'operationUrl'
              }, 
            ],data1:[{}],page_num:1
          }
        },
        mounted(){
          this.getLogList()
          this.onStartTimeChange(this.start_time)
		      this.onEndTimeChange(this.end_time)
        },
        methods:{
          //获取日志列表
          getLogList(){
            this.axios.get("/OilTrack/log/showPage",{params:{page:this.page_num}}).then(res=>{
              console.log(res)
              this.data1 =res.data.data.logList
              this.log_total=res.data.data.count
            })
          },
          //重置功能
          setStart(){
            this.start_time='';
            this.end_time="";
            this.kwords=""
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
          //判断复选框是否选中
          isSelect(e){
            //this.update_userId=this.update_userInfo.userId
            this.log_selected=e.length
          },
          //点击，切换页面
          changePageNum(index) {
            this.page_num=index  
            this.getLogList()  
          },
          //查找日志
          searchLog(){
            this.axios.get('/OilTrack/log/showPage',{params:{keywords:this.kwords,page:this.page_num,beginTime:this.start_time,endTime:this.end_time}}).then(res=>{
              this.data1 =res.data.data.logList
              this.log_total=res.data.data.count
              this.onStartTimeChange(this.start_time)
              this.onEndTimeChange(this.end_time)
            })
          },
          //获取批量删除的日期
          getStartTime(){
            //获取系统当前时间
            var nowdate = new Date();
            var y = nowdate.getFullYear();
            var m = nowdate.getMonth()+1;
            var d = nowdate.getDate();
            var h = nowdate.getHours();
            var ms = nowdate.getMinutes();
            var s = nowdate.getSeconds();
            var formatnowdate = y+'-'+m+'-'+d+' '+h+':'+ms+':'+s;
            //获取系统前一周的时间
            var oneweekdate = new Date(nowdate-7*24*3600*1000);
            var y = oneweekdate.getFullYear();
            var m = oneweekdate.getMonth()+1;
            var d = oneweekdate.getDate();
            var h = oneweekdate.getHours();
            var ms = oneweekdate.getMinutes();
            var s = oneweekdate.getSeconds();
            var formatwdate = y+'-'+m+'-'+d+' '+h+':'+ms+':'+s;
            //获取系统前一个月的时间
            nowdate.setMonth(nowdate.getMonth()-1);
            var y = nowdate.getFullYear();
            var m = nowdate.getMonth()+1;
            var d = nowdate.getDate();
            var h = nowdate.getHours();
            var ms = nowdate.getMinutes();
            var s = nowdate.getSeconds();
             var formatMdate = y+'-'+m+'-'+d+' '+h+':'+ms+':'+s;
            //获取系统前半年的时间
            nowdate.setMonth(nowdate.getMonth()-6);
            var y = nowdate.getFullYear();
            var m = nowdate.getMonth()+1;
            var d = nowdate.getDate();
            var h = nowdate.getHours();
            var ms = nowdate.getMinutes();
            var s = nowdate.getSeconds();
            var formatYdate = y+'-'+m+'-'+d+' '+h+':'+ms+':'+s;
            if(this.delete_time=='一周前'){
              this.delete_start=formatwdate
            }else if(this.delete_time=='一个月前'){
              this.delete_start=formatMdate
            }else if(this.delete_time=='半年前'){
              this.delete_start=formatYdate
            }
          },
          //删除日志
          deleteLog(){
            if(this.log_selected==0 && this.delete_time=="") this.showError=true;
            else {
                this.$confirm('您确定要删除该项内容吗?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning',
                  center: true
                }).then(() => {
                  this.$message({
                      type: 'success',
                      message: '删除成功!'
                  });
                  this.axios.get('/OilTrack/log/delete',{params:{beginTime:this.delete_start}}).then(res=>{
                      this.getLogList()
                  })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
          },
        
        }
    }
</script>


<style lang="stylus">
    .ivu-select-selection
      border-radius 0px
    .ivu-page
      float right
      margin-top 20px
    .second_check
      margin 0
      padding 0
      margin-left 12px
    .search
      div
        top 11px
    .dep 
      input
        width 541px!important
    .second_col
      display inline-block
      margin-left 50px
    .ivu-color-picker-color
      width 159px
    .table2 th
      background #2070D1!important
      color #fff
    .textInput
      input 
        height 92px
    .gw 
      input 
        width 216px
    .dw
      display inline-block
      position relative
      div
        position absolute
        right 32px
        top 6px
        z-index 10
        background-color #ffffff
        border none


    .ivu-input-group-append
    .ivu-input-group-prepend
      border-radius 0
  
    .check_box
      margin-bottom 50px
      margin-top 10px
      >li
        float left 
        margin-left 25px
    .check_box_after
      clear both   
</style>

<style lang="stylus" scoped>

  .runData
  
    .update_table
      width 600px
    .layout
      border 1px solid #d7dde4
      background #f5f7f9
      position relative
      border-radius 4px
      overflow hidden
    .ivu-menu-item
      font-size 16px 
    .last_menu
      margin-right 200px
      margin-left 50px
    .ivu-menu-horizontal 
      .ivu-menu-item
        float right  
    .ivu-dropdown-rel
      a
        color rgba(255,255,255,.7)
        font-size 16px
    .ivu-menu-horizontal 
      .ivu-menu-item
        padding 0 10px !important
    .select_box
      text-align left
      padding 10px 0
      margin-bottom 20px
      text-align left
      cursor pointer
      border-bottom 1px dashed #eee
    .s3
      padding-bottom 23px
    .second_menu
      padding 0 442px
      margin 0 -50px
      width 1920px
      margin-top -88px
      position fixed
      z-index 2
  
    .ivu-layout-header
        width 1920px
        height 72px
        background-color #185194!important
    .layout-footer-center
        text-align center
    
    .ivu-card-bordered
      margin-top 160px
      height 753px
     
    .ivu-select
      width 190px !important
      height 36px
    .ivu-select-selection
    .ivu-btn
       border-radius 0px!important
    .ivu-select
      margin-left 10px
      margin-right 10px
    .first_menu
      margin-right 50px!important
    .updateCg
      diaplay inline-block
      margin-left 30px
      img 
        width 14px
        height 15px
</style>
