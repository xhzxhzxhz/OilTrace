<template>
    <div>
        <div class='select_box s3'>
            <span class='updateCg' @click='addUser'>
                <img src="../../assets/icon_xinjian.png" alt="">
                新建
            </span>
            <span class='updateCg' @click='updateUser'>
                <img src="../../assets/icon_nor_xiugai.png" alt="">
                修改
            </span>
            <span class='updateCg' @click='deleteUser'>
                <img src="../../assets/icon_shanchu.png" alt="">
                删除
            </span>
            <span style='float:right'>
                <Input search enter-button placeholder="单位查询" v-model="kwords"  @on-search='searchUserInfo'/>
            </span>
        </div>
        <Table ref="selection" @on-selection-change='isSelect' :columns="columns1" :data="data1"></Table>
        <Page :total="dep_total" show-total @on-change='changePageNum'/>
        <!-- 添加用户 -->
        <Modal
            title="添加用户"
            v-model="showAddDep"
            class="vertical-center-modal" width='660'>
            <div class='update_table'>
                <p style='margin-bottom:24px'>
                <span>单位名称：&nbsp;&nbsp; <Select v-model='add_bmmc' class='bm' style="width:200px" @on-query-change='getbmId'>
                    <Option v-for="(item,index) in select_dep" :value="item.bmmc==null?'':item.bmmc" :key='index'>{{item.bmmc}} <span style='display:none'>{{item.bmid}}</span></Option>
                  </Select>
                </span>
                <span>&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;负责人：&nbsp; &nbsp;&nbsp; &nbsp;
                  <Select v-model="add_depInfo.fzr" style="width:216px" filterable>
                      <Option v-for="(item,index) in  fzrList" :value="item" :key="index">{{item }}</Option>
                  </Select>
                </span>
                </p>
                <p style='margin-bottom:24px'>
                <span>移动电话：&nbsp;&nbsp;<Input v-model="add_depInfo.yddh" style="width: 210px" /></span>
                <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;办公电话：&nbsp; <Input v-model="add_depInfo.bgdh" style="width: 216px" /></span>
                </p>
                <Input v-model="add_depInfo.bz" class='textInput' style="width:608px;height:92px;margin-bottom:24px" />  
                <p style='margin-bottom:10px;text-align:center'>
                <Button type="primary" style='width:145px;height:36px;' @click='addUserSubmit'>提交</Button> 
                </p>  
            </div>
        </Modal>
        <!-- 修改用户 -->
        <Modal
            title="修改用户"
            v-model="showUpdateDep"
            class="vertical-center-modal" width='660'>
            <div class='update_table'>
                <p style='margin-bottom:24px'>
                <span>单位名称：&nbsp;&nbsp;<Select v-model='update_bmmc' class='bm' style="width:200px" @on-query-change='getbmId'>
                    <Option v-for="(item,index) in select_dep" :value="item.bmmc==null?'':item.bmmc" :key='index'>{{item.bmmc}} <span style='display:none'>{{item.bmid}}</span></Option>
                  </Select>
                </span>
                <span>&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;负责人：&nbsp; &nbsp;&nbsp; &nbsp; <Select v-model="update_depInfo.fzr" style="width:216px" filterable>
                      <Option v-for="(item,index) in fzrList" :value="item" :key="index">{{item}}</Option>
                  </Select>
                </span>
                </p>
                <p style='margin-bottom:24px'>
                <span>移动电话：&nbsp;&nbsp;<Input v-model="update_depInfo.yddh" style="width: 210px" /></span>
                <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;办公电话：&nbsp; <Input v-model="update_depInfo.bgdh" style="width: 216px" /></span>
                </p>
                <Input v-model="update_depInfo.bz" class='textInput' style="width:608px;height:92px;margin-bottom:24px" />  
                <p style='margin-bottom:10px;text-align:center'>
                <Button type="primary" style='width:145px;height:36px;' @click='updateUserSubmit'>提交</Button> 
                </p>  
            </div>
        </Modal>
        <!-- 未选中行时模态框 -->
        <Modal v-model="showError">
            <Icon type="md-close-circle" style='font-size:30px;margin-right:20px;color:#E6A23C'/>
            <span v-text="error_text" style='font-size:16px'>请选择要操作的数据</span>
        </Modal>
    </div>
</template>
<script>
    export default {
        data(){
          return {
            error_text:"",
            value:'',showUpdateDep:false,showAddDep:false,showError:false,dep_total:0,pageSize:10,dep_selected:[],add_bmmc:'',
            update_depInfo:{"bmmc":'',"fzr":'',"yddh":'',"bgdh":'',"bz":''},update_userId:'',delete_userId:[],update_bmmc:'',
            add_depInfo:{"bmmc":'',"fzr":'',"yddh":'',"bgdh":'',"bz":''},depList:[],select_dep:[],update_id:'',
            fzrList: [ ],kwords:'',page_num:1,
            columns1:[
              {
                type: 'selection',
                width:60
              },
              {
                  title: '单位名称',
                  key: 'bmmc'
              }, 
              {
                  title: '负责人',
                  key: 'fzr'
              },
              {
                  title: '联系电话',
                  key: 'yddh'
              },
              {
                  title: '办公电话',
                  key: 'bgdh'
              },
              {
                  title: '备注',
                  align: 'center',
                  key: 'bz'
              }, 
            ],data1:[]
          }
        },
        mounted(){
          //查询所有部门
          this.axios.get("/OilTrack/ryzhb/showDepartmnet").then(res=>{
            this.select_dep=res.data.data;
          })
          //获取所有负责人列表
          this.getUserList()
          this.getFindDepartment()
        },
        methods:{
          //查询所有部门信息
          getFindDepartment(){
            this.axios.get("OilTrack/department/findPage",{params:{page:this.page_num}}).then(res=>{
              console.log(res)
              let result=res.data.data
              this.data1 = result==null?[]:result;
              this.dep_total=res.data.total
            })
          },
          getUserList(){
            this.axios.get('/OilTrack/department/showUserList').then(res=>{
                this.fzrList=res.data.data
              })
          },
          //判断复选框是否选中
            isSelect(e){
                if(e.length>0){
                  this.update_depInfo=e[0]
                  this.update_id=e[0].bmid
                  for(var i=0;i<e.length;i++){
                    this.delete_userId[i]=e[i].bmid
                  }
                }
                //this.update_userId=this.update_userInfo.userId
                this.dep_selected=e.length
            },
            getbmId(e){
                let id=e.split(' ')[1]
                let bmmc=e.split(' ')[0]
                this.select_id=id;
                this.update_bmmc=bmmc
                this.add_bmmc=bmmc
            },
            //模糊查询
            searchUserInfo(){
              this.axios.get('/OilTrack/department/search',{params:{page:this.page_num,keywords:this.kwords}}).then(res=>{
                let result=res.data.data.departmentList
                this.data1 = result
                this.dep_total=result.length
              })
            },
            addUser(){
                this.showAddDep=true
            },
            addUserSubmit(){
               this.axios.post('/OilTrack/department/insert',{"bmmc":this.add_bmmc,"fzr":this.add_depInfo.fzr,
               "yddh":this.add_depInfo.yddh,"bgdh":this.add_depInfo.bgdh,"bz":this.add_depInfo.bz}).then(res=>{
                 this.showAddDep=false
                  this.getFindDepartment();
               })
            },
            updateUser(){
                if(this.dep_selected==0){this.showError=true;this.error_text="请选择要修改的数据"} 
                else if(this.dep_selected>1){this.showError=true;this.error_text="只能选择一条要修改的数据"}
                else this.showUpdateDep=true
            },
            updateUserSubmit(){
              this.axios.post('/OilTrack/department/update',{bmmc:this.update_bmmc,bmid:this.update_id,fzr:this.update_depInfo.fzr
              ,yddh:this.update_depInfo.yddh,bgdh:this.update_depInfo.bgdh,bz:this.update_depInfo.bz
              }).then(res=>{
                this.showUpdateDep=false
                this.getFindDepartment()
              })
            },
            //删除部门
            deleteUser(){
                if(this.dep_selected==0) this.showError=true;
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
                    this.axios.post('/OilTrack/department/delete',this.delete_userId).then(res=>{
                      this.getFindDepartment()
                    })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
            },
            //点击，切换页面
            changePageNum(index) {
             this.page_num=index  
             this.getFindDepartment()
            },

        }
    }
</script>

<style lang="stylus" scoped>
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
      cursor pointer
      padding 10px 0
      margin-bottom 20px
      text-align left
      cursor pointer
      border-bottom 1px dashed #eee
    .s3
      padding-bottom 23px
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
