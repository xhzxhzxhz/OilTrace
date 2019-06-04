<template>
     <div>
        <div class='select_box'>
            <span class='updateCg' @click='addRole'>
              <img src="../../assets/icon_xinjian.png" alt="">
              新建角色
            </span>
            <span class='updateCg' @click='updateRole'>
              <img src="../../assets/icon_nor_xiugai.png" alt="">
              修改角色
            </span>
            <span class='updateCg' @click="deleteRole">
              <img src="../../assets/icon_shanchu.png" alt="">
              删除角色
            </span>
        </div>
        <Table ref="selection" @on-selection-change='isSelect' :columns="columns1" :data="data1"></Table>
        <Page :total="role_total" show-total @on-change='changePageNum'/>
        <!-- 添加角色 -->
        <Modal
            title="添加角色"
            v-model="showAddRole"
            class="vertical-center-modal" width='660'>
            <div class='update_table'>
                <p style='margin-bottom:24px'>
                <span>角色名称：&nbsp;&nbsp;<Input v-model="add_roleInfo.jsmc" style="width: 230px" /></span>
                <span>&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;描述：&nbsp; <Input v-model="add_roleInfo.jsms" style="width: 240px" /></span>
                </p>
                <Input v-model="add_roleInfo.bz" class='textInput' placeholder="备注" style="width:614px;height:92px;margin-bottom:24px" />  
                <Checkbox v-model="single" @on-change='zy_one' @click.native='zy_one_item(resource)'>{{resource.cdmc}}</Checkbox>
                <ul class='check_box'>
                  <li v-for="(item,index) in resource.children" :key='index'>
                      <Icon :type="arrow" @click.native='changeArrow'/><Checkbox :value="item.zyid" @on-change='zy_two' @click.native='zy_two_item(item)'>{{item.cdmc}}</Checkbox>
                      <ul class='second_check'>
                        <li v-for="(zy,index) in item.children" :key='index'>
                          <CheckboxGroup v-model="two_zy">
                            <!-- <Checkbox :label="zy.cdmc"></Checkbox> -->
                          </CheckboxGroup>
                        </li>
                      </ul>
                  </li>
                </ul>
                <div class='check_box_after'></div>
                <p style='margin-bottom:10px;text-align:center'>
                <Button type="primary" style='width:145px;height:36px;' @click='addRoleSubmit'>提交</Button> 
                </p>  
            </div>
        </Modal>
        <!-- 修改角色 -->
        <Modal
            title="修改角色"
            v-model="showUpdateRole"
            class="vertical-center-modal" width='660'>
            <div class='update_table'>
                <p style='margin-bottom:24px'>
                <span>角色名称：&nbsp;&nbsp;<Input v-model="update_roleInfo.jsmc" style="width: 230px" /></span>
                <span>&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;描述：&nbsp; <Input v-model="update_roleInfo.jsms" placeholder="" style="width: 240px" /></span>
                </p>
                <Input v-model="update_roleInfo.bz" class='textInput' placeholder="备注" style="width:614px;height:92px;margin-bottom:24px" />  
                <Checkbox v-model="single" @on-change='zy_one' @click.native='zy_one_item(resource)'>{{resource.cdmc}}</Checkbox>
                <ul class='check_box'>
                  <li v-for="(item,index) in resource.children" :key='index'>
                      <Icon :type="arrow" @click.native='changeArrow'/><Checkbox :value="item.zyid" @on-change='zy_two' @click.native='zy_two_item(item)'>{{item.cdmc}}</Checkbox>
                      <ul class='second_check'>
                        <li v-for="(zy,index) in item.children" :key='index'>
                          <CheckboxGroup v-model="two_zy">
                            <!-- <Checkbox :label="zy.cdmc"></Checkbox> -->
                          </CheckboxGroup>
                        </li>
                      </ul>
                  </li>
                </ul>
                <div class='check_box_after'></div>
                <p style='margin-bottom:10px;text-align:center'>
                <Button type="primary" style='width:145px;height:36px;' @click='updateRoleSubmit'>提交</Button> 
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
            single:'',showAddRole:false,showUpdateRole:false,showError:false,role_total:0,update_jsid:'',
            pageSize:10,role_selected:[],roleList:[],arrow:'md-arrow-dropright',resource:[],
            update_roleInfo:{"jsmc":'',"jsms":'',"bz":'',"zyIdList":[]},delete_id:[],one_id:'',one_id_true:'',
            add_roleInfo:{"jsmc":'',"jsms":'',"bz":'',"zyIdList":[]},two_zy:[],one_zy:[],two_id:'',two_id_true:'',
            columns1:[
              {
                type: 'selection',
                width:60
              },
              {
                  title: '角色名称',
                  key: 'jsmc'
              },
                {
                  title: '描述',
                  key: 'jsms'
              }, 
              {
                  title: '备注',
                  key: 'bz'
              }
            ],data1:[{"":""}],page_num:1
           
          }
        },
        mounted(){
          //获取角色列表
          this.getRole()
          //资源树展示
          this.axios.get("/OilTrack/resource/showResource").then(res=>{          
            let result=res.data.data.slice(1);
            let result1=result.slice(0,-1);
            let result2=JSON.parse(result1)
            this.resource=result2
          })
        },
        methods:{
           //获取角色列表
           getRole(){
              this.axios.get("/OilTrack/jsb/show",{params:{page:this.page_num}}).then(res=>{
               let result=res.data.data
                this.data1 = result;
                this.role_total=res.data.total
              })
           },
            changeArrow(){
              if(this.arrow=='md-arrow-dropdown') this.arrow='md-arrow-dropright'
              else if(this.arrow=='md-arrow-dropright') this.arrow='md-arrow-dropdown'
            },
            //监听一级资源
            zy_one(e){
              if(e==false){
                this.one_id_true=''
              }else{
                this.one_id_true=this.one_id
              }
            },
            zy_one_item(item){
              this.one_id=item.zyid
            },
            //监听二级资源
            zy_two(e){
              if(e==false){
                this.two_id_true=''
              }else{
                this.two_id_true=this.two_id
              }
            },
            zy_two_item(item){
              this.two_id=item.zyid
            },
           //判断复选框是否选中
            isSelect(e){
                //this.update_userId=this.update_userInfo.userId
                if(e.length>0){
                  this.update_jsid=e[0].jsid
                  this.update_roleInfo=e[0]
                  for(var i=0;i<e.length;i++){
                    this.delete_id[i]=e[i].jsid
                    
                  }
                }
                this.role_selected=e.length
            },
            addRole(){
                this.showAddRole=true
            },
            //添加角色
            addRoleSubmit(){
              this.axios.post('/OilTrack/jsb/insert',
              {	"qxJsb":{	"jsmc":this.add_roleInfo.jsmc,"jsms":this.add_roleInfo.jsms,"bz":this.add_roleInfo.bz},"zyIdList":[this.one_id_true,this.two_id_true]}).then(res=>{
                this.showAddRole=false
                this.getRole()
              })
            },
            updateRole(){
              if(this.role_selected==0){
                  this.showError=true;
                  this.error_text="请选择要操作的数据"
                } 
                else if(this.role_selected>1){
                  this.showError=true;
                  this.error_text="只能选择一条要修改的数据"
                }
              else this.showUpdateRole=true
            },
            //修改角色
            updateRoleSubmit(){
              this.axios.post('/OilTrack/jsb/update',
              {	"qxJsb":{	"jsid":this.update_jsid,"jsmc":this.update_roleInfo.jsmc,"jsms":this.update_roleInfo.jsms,"bz":this.update_roleInfo.bz},"zyIdList":[this.one_id_true,this.two_id_true]}).then(res=>{
                this.showUpdateRole=false
                this.getRole()
              })
            },
            //删除角色
            deleteRole(){
              if(this.role_selected==0) this.showError=true;
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
                  this.axios.post('/OilTrack/jsb/delete',this.delete_id).then(res=>{
                    this.getRole()
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
                this.getRole()
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
      cursor pointer
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
