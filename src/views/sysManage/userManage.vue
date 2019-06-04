<template>
    <div>
        <div class='select_box'>
            <span>
                所属部门
                <Select v-model='bmmc' class='bm' style="width:200px" @on-query-change='searchInfo'>
                    <Option v-for="(item,index) in select_dep" :value="item.bmmc==null?'':item.bmmc" :key='index'>{{item.bmmc}} <span style='display:none'>{{item.bmid}}</span></Option>
                </Select>
            </span>
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
                <Input search enter-button placeholder="人员查询" v-model="kwords"  @on-search='searchUserInfo'/>
            </span>
        </div>
        <Table ref="selection" @on-selection-change='isSelect' :columns="columns1" :data="data1"></Table>
        <Page :total="user_total" show-total @on-change='changePageNum'/>
        <!-- 未选中行时模态框 -->
        <Modal v-model="showError">
            <Icon type="md-close-circle" style='font-size:30px;margin-right:20px;color:#E6A23C'/>
            <span v-text="error_text" style='font-size:16px'>请选择要操作的数据</span>
        </Modal>
         <!-- 重置密码弹框 -->
        <Modal
            title="修改密码"
            v-model="showChangePwd"
            class="vertical-center-modal" width='396'>
            <div class='update_table'>
                <p style='margin-bottom:24px'>
                    <span>旧密码：&nbsp;&nbsp;&nbsp;&nbsp;<Input v-model="pwd" type='password' style="width: 216px" /></span>
                </p>
                <p style='margin-top:-18px;margin-left:63px;color:#ff0000' v-show='warning_old_pwd'>*旧密码填写错误!</p>
                <p style='margin-bottom:24px'>
                    <span>新密码：&nbsp;&nbsp;&nbsp;&nbsp;<Input v-model="new_pwd" type='password' style="width: 216px" /></span>
                </p>
                <p style='margin-top:-18px;margin-left:63px;color:#ff0000' v-show='warning_pwd'>*两次密码不一致!</p>
                <p style='margin-bottom:24px'>
                    <span>确认密码：<Input v-model="new_cf_pwd" type='password' style="width: 216px" /></span>
                </p>
                <p style='margin-bottom:10px;text-align:center'>
                    <Button type="primary" style='width:145px;height:36px;' @click='changePwdSubmit'>提交</Button> 
                </p>  
            </div>
        </Modal>
        <!-- 添加用户 -->
        <Modal
            title="添加用户"
            v-model="showaddUser"
            class="vertical-center-modal" width='650'>
            <div class='update_table'>
                <p style='margin-bottom:24px'>
                <span>用户名称：<Input v-model="add_userInfo.nc" style="width: 216px" /></span>
                <span class='second_col'>用户账号：<Input v-model="add_userInfo.ryzh" style="width: 216px" /></span>
                </p>
                <p style='margin-bottom:24px'>
                <span> 姓名：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Input v-model="add_userInfo.ryxm" style="width: 216px" /></span>
                <span class='second_col'>角色：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Select v-model='jsmc' style="width:216px" @on-query-change='changeRoles'>
                      <Option v-for="(item,index) in roleList" :value="item.jsmc==null?'':item.jsmc" :key='index'>{{item.jsmc}} <span style='display:none'>{{item.jsid}}</span>  </Option>
                  </Select>
                </span>
                </p>
                <p style='margin-bottom:24px'>
                <span>移动电话：<Input v-model="add_userInfo.yddh" style="width: 205px" class='gw'/></span>
                <span class='second_col'> &nbsp; &nbsp;办公电话：<Input v-model="add_userInfo.bgdh" style="width: 205px" class='gw'/></span>
                </p>
                <p style='margin-bottom:24px'>
                <span>所属部门： <Select v-model="add_bmmc" style="width:203px" @on-query-change='changeBm'>
                      <Option v-for="(item,index) in select_dep" :value="item.bmmc==null?'':item.bmmc" :key='index'>{{item.bmmc}} <span style='display:none'>{{item.bmid}}</span>  </Option>
                  </Select>
                </span>
                </p>
                <Input v-model="add_userInfo.bz" placeholder="备注" class='textInput' style="width:602px;height:92px;margin-bottom:24px" />  
                <p style='margin-bottom:10px;text-align:center'>
                <Button type="primary" style='width:145px;height:36px;' @click.native='addUserOk'>提交</Button> 
                </p>  
            </div>
        </Modal>
        <!-- 修改用户 -->
       <Modal
            title="修改用户"
            v-model="showUpdateUser"
            class="vertical-center-modal" width='650'>
            <div class='update_table'>
                <p style='margin-bottom:24px'>
                <span>用户名称：<Input v-model="update_userInfo.nc" style="width: 216px" /></span>
                <span class='second_col'>用户账号：<Input v-model="update_userInfo.yhzh"  style="width: 216px" /></span>
                </p>
                <p style='margin-bottom:24px'>
                <span> 姓名：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Input v-model="update_userInfo.ryxm"   style="width: 216px" /></span>
                <span class='second_col'>角色：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Select v-model='update_jsmc' style="width:216px" @on-query-change='changeUpdateRoles'>
                      <Option v-for="(item,index) in roleList" :value="item.jsmc==null?'':item.jsmc" :key='index'>{{item.jsmc}} <span style='display:none'>{{item.jsid}}</span>  </Option>
                  </Select>
                </span>
                </p>
                <p style='margin-bottom:24px'>
                <span>移动电话：<Input v-model="update_userInfo.yddh" style="width: 205px" class='gw'/></span>
                <span class='second_col'> &nbsp; &nbsp;办公电话：<Input v-model="update_userInfo.bgdh"   style="width: 205px" class='gw'/></span>
                </p>
                <p style='margin-bottom:24px'>
                <span>所属部门： <Select v-model="update_bmmc" style="width:203px" @on-query-change='changeUpdateBm'>
                    <Option v-for="(item,index) in select_dep" :value="item.bmmc==null?'':item.bmmc" :key='index'>{{item.bmmc}} <span style='display:none'>{{item.bmid}}</span>  </Option>
                  </Select> 
                </span>
                </span>
                </p>
                <Input v-model="update_userInfo.bz" class='textInput' placeholder="备注"   style="width:602px;height:92px;margin-bottom:24px" />  
                <p style='margin-bottom:10px;text-align:center'>
                <Button type="primary" style='width:145px;height:36px;' @click='updateUserOK'>提交</Button> 
                </p>  
            </div>
        </Modal>
        
    </div>
</template>
<script>
    import Qs from 'qs'
    export default {
        data(){
          return {
            error_text:"",
            pwd:'',new_pwd:'',new_cf_pwd:'',warning_old_pwd:false,warning_pwd:false,
            value:'',model1: '',showUpdateUser:false,select_dep:[],showaddUser:false,userList:[],
            pageSize:10,user_total:0,update_userId:'',user_selected:[],showError:false,
            showChangePwd:false,kwords:'',roleList:[],add_bmmc:'',jsmc:'',select_id:'',update_jsmc:'',update_bmmc:'',update_jsid:'',update_bmid:'',
            update_userInfo:{},delete_id:[],add_jsid:'',add_bmid:'',bmmc:'',userId:"",
            add_userInfo:{ryxm:"",ryzh:"",dlmm:"",bmId:"",jsId:"",yddh:"",bgdh:"",bz:"",nc:''},
            columns1: [
                {
                  type: 'selection',
                  width:60
                },
                {
                    title: '用户名称',
                    key: 'nc'
                },
                {
                    title: '姓名',
                    key: 'ryxm'
                },
                {
                    title: '所属部门',
                    key: 'bmmc'
                },
                  {
                    title: '角色',
                    key: 'jsmc'
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
                    key: 'bz'
                },
                {
                    title: '操作',
                    key: 'address',
                     render: (h, params) => {
                        return h('a',{
                            attrs:{
                                href:'#',style:"width:15px;height:16px;margin-right:11px"
                            },
                            on: {
                                click: () => {
                                    this.showChangePwd=true
                                    this.userId=params.row.ryzhid
                                }
                            }
                        },'重置密码');
                  } 
                }
            ],data1: [], page_num:1,
          }
        },
        mounted(){
          //查询所有部门
          this.axios.get("/OilTrack/ryzhb/showDepartmnet").then(res=>{
            this.select_dep=res.data.data;
            console.log(this.select_dep,22222)
          })
          //展示所有的用户
          this.getUser()
          //获取所有角色
         this.axios.get("/OilTrack/ryzhb/showRole").then(res=>{
            this.roleList=res.data.data
          })
        },
        methods:{
            //展示所有用户
            getUser(){
              this.axios.get("/OilTrack/ryzhb/show",{params:{page:this.page_num}}).then(res=>{
                console.log(res)
                this.data1=res.data.data==null?[]:res.data.data
                  this.user_total=res.data.total
              })
            },
            //判断复选框是否选中
            isSelect(e){
              if(e.length>0){
                this.update_userInfo=e[0]
                this.update_userId=this.update_userInfo.ryzhid  
                for(var i=0;i<e.length;i++){
                  this.delete_id[i]=e[i].ryzhid
                }
                this.user_selected=e.length
              }else{
                this.user_selected=0
              }
              
            },
            //通过部门id去查询这个部门下的用户信息
            searchInfo(e){
                let id=e.split(' ')[1]
                this.bmmc=e.split(' ')[0]
                this.select_id=id;
                this.axios.get('/OilTrack/ryzhb/searchByDepartmnet',{params:{page:this.page_num,departmentId:id}}).then(res=>{
                  this.data1=res.data.data.list
                  this.user_total=res.data.data.count
                
                })
            },
            //通过关键字去搜索用户
            searchUserInfo(){
                this.axios.get('/OilTrack/ryzhb/searchByKeywords',{params:{page:this.page_num,keywords:this.kwords}}).then(
                  res=>{
                    if(res.data.data==null){
                      this.data1=[]
                    }else{
                        this.data1=res.data.data
                        this.user_total=res.data.total
                    }
                  }
                )
            },
            //添加模态框中的选择角色
            changeRoles(e){
              this.add_jsid=e.split(' ')[1]
            },
            //添加模态框中的选择部门
            changeBm(e){
              this.add_bmid=e.split(' ')[1]
              this.update_userInfo.bmmc=e.split(' ')[0]
              this.add_bmmc=e.split(' ')[0]
            },
            //修改模态框中的选择角色
            changeUpdateRoles(e){
              this.update_jsid=e.split(' ')[1]
              this.update_jsmc=e.split(' ')[0]
            },
            //修改模态框中的选择部门
            changeUpdateBm(e){
              this.update_bmid=e.split(' ')[1]
              this.update_bmmc=e.split(' ')[0]
            },
            //添加用户模态框
            addUser(){
                this.showaddUser=true
            },
            //添加用户成功
            addUserOk(){
                this.axios.post('/OilTrack/ryzhb/insert',{ryxm:this.add_userInfo.ryxm,ryzh:this.add_userInfo.ryzh,dlmm:this.add_userInfo.dlmm,bmid:this.add_bmid,
                jsid:this.add_jsid,yddh:this.add_userInfo.yddh,nc:this.add_userInfo.nc,bgdh:this.add_userInfo.bgdh,bz:this.add_userInfo.bz,
                nc:this.add_userInfo.ryzh}).then(res=>{
                  this.showaddUser=false
                  this.getUser()
                })
            },
            //修改用户
            updateUser(){
                if(this.user_selected==0){
                  this.showError=true;
                  this.error_text="请选择要操作的数据"
                } 
                else if(this.user_selected>1){
                  this.showError=true;
                  this.error_text="只能选择一条要修改的数据"
                }
                else this.showUpdateUser=true
            },
             //修改用户成功
            updateUserOK(){
              this.axios.post('/OilTrack/ryzhb/update',{ryzhid:this.update_userId,
              nc:this.update_userInfo.nc,
              ryzh:this.update_userInfo.ryzh,
              ryxm:this.update_userInfo.ryxm,
              bmid:this.update_bmid,
              jsid:this.update_jsid,
              yddh:this.update_userInfo.yddh,
              bgdh:this.update_userInfo.bgdh,
              bz:this.update_userInfo.bz}).then(res=>{
                  this.showUpdateUser=false
                  this.getUser()
                })
            },
            //删除用户
            deleteUser(){
                if(this.user_selected==0) this.showError=true;
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
                        this.axios.post('/OilTrack/ryzhb/delete',this.delete_id).then(res=>{
                          this.getUser()
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
                this.getUser()
            },
            //重置密码
            changePwdSubmit(){
              if(this.new_pwd!==this.new_cf_pwd){
                  this.warning_pwd=true; 
              }else{
                  this.axios.get('/OilTrack/login/repassword',{params:{repassword:this.pwd,password:this.new_pwd,id:this.userId}}).then(res=>{
                    if(res.data.code=="203"){
                      this.warning_old_pwd=true; 
                    }else{  
                      this.$Message.success('密码重置成功');
                      this.$Message.config({
                          top: 1000,
                          duration: 3
                      });
                      this.showChangePwd=false
                    }
                      
                })
                
              }
           
               
            },
         

        }
    }
</script>

<style lang="stylus">
    .ivu-modal-header
      background #3D7AD5
      .ivu-modal-header-inner
        color #fff
    .ivu-page
      float right
      margin-top 20px
    .ivu-input
      border-radius 0px
    .bm
      .ivu-select-selection
        border-radius 0px
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
    .update_table
      width 602px
    .select_box
      padding 10px 0
      margin-bottom 20px
      text-align left
      cursor pointer
      border-bottom 1px dashed #eee
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
