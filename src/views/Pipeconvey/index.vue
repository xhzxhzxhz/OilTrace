

<template>
    <div class="layout">
        <Layout>
            <Header :style="{width: '100%'}">
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <!-- <div class="layout-logo"></div> -->
                    <!-- <span class='logo_img'></span>
                    <span class='logo_text'>原油管网顺序输送混油界面跟踪系统</span> -->
                    <img src="../../assets/logo.png" class='logo_img'>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <router-link to='/manageWork' class="menu_item"><span @click="changecolor(1)" :class="{'color':current==1}"> 管理作业</span> </router-link>
                        </MenuItem>
                        <MenuItem name="2">
                            <router-link to='/historyWork' class="menu_item"><span @click="changecolor(2)" :class="{'color':current==2}"> 历史作业 </span></router-link>
                        </MenuItem>
                        <MenuItem name="3">
                            <router-link to='/runData' class="menu_item"><span @click="changecolor(3)" :class="{'color':current==3}">运行数据 </span></router-link>
                        </MenuItem>
                        <MenuItem name="4">
                           <router-link to='/analysis' class="menu_item"><span @click="changecolor(4)" :class="{'color':current==4}">统计分析 </span></router-link>
                        </MenuItem>
                        <MenuItem name="5">
                            <router-link to='/technics' class="menu_item"><span @click="changecolor(5)" :class="{'color':current==5}">工艺配制 </span></router-link>
                        </MenuItem>
                        <MenuItem name="6">
                            <router-link to='/sysManage' class="menu_item"><span @click="changecolor(6)" :class="{'color':current==6}">系统管理 </span></router-link>
                        </MenuItem>
                        <MenuItem name="4">
                           |
                        </MenuItem>
                    </div>
                </Menu>
                <div class='set_out'>
                    <img src="../../assets/btn_nor_gaimi.png" @click='changePwd'>
                    <img src="../../assets/btn_nor_back.png" @click='outLogin'>
                </div>
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
            </Header>
            <Content :style="{padding: '0 50px'}">
                <router-view></router-view>
            </Content>
           
        </Layout>
    </div>
</template>
<script>
    export default {
        data(){
          return {
            theme1: 'light',model1: '',showComponents:'home',showChangePwd:false,value:'',showOutLogin:false,
            select_tupe:['塘燕复线'],select_gz:[ '物性跟踪'],select_density:['密度'],select_percent:['10%'],warning_pwd:false,
            pwd:'',new_pwd:'',new_cf_pwd:'',warning_old_pwd:false,current:1
          }
        },
        methods:{
            tohome(){
                this.showComponents='home'
            },
            toHistory(){
                this.showComponents='historyWork'
            },
            toAnalysis(){
                this.showComponents='analysis'
            },
            toRundata(){
                this.showComponents='rundata'
            },
            toSysmanage(){
                this.showComponents='sysmanage'
            },
            toTechnis(){
                this.showComponents='technics'
            },
            changePwd(){
                this.showChangePwd=true
            },
            changePwdSubmit(){
                let password=sessionStorage.getItem('pwd')
                if(this.new_pwd!==this.new_cf_pwd){
                    this.warning_pwd=true; 
                }else if(password!==this.pwd){
                    this.warning_old_pwd=true; 
                }
                else{
                    let uid=sessionStorage.getItem('uid');
                    this.axios.get('/OilTrack/login/repassword',{params:{repassword:this.pwd,password:this.new_pwd,id:uid}}).then(res=>{
                            this.$Message.success('密码重置成功');
                            this.$Message.config({
                                top: 1000,
                                duration: 3
                            });
                            this.showChangePwd=false
                     })
                }
            },
            outLogin(){
                //this.showOutLogin=true
                this.$Modal.confirm({
                    title: '您确定要退出登录吗？',
                    okText: '确定',
                    cancelText: '取消',
                    onOk:()=>{
                        sessionStorage.setItem('uid','');
                        this.$router.push('/')
                    }
                });
            },
            changecolor(index){
                 this.current=index
            }
        }
        
    }
</script>
<style  lang="stylus" >
    .ivu-modal-footer
      display none !important
    .menu_item
        color #BCD2FF!important
    .color  
        color #fff
</style>
   
<style lang="stylus" scoped>

    .layout
       border 1px solid #d7dde4
        background #f5f7f9
        position relative
        border-radius 4px
        overflow hidden
    .ivu-layout
        padding-bottom 20px
    .set_out
        position absolute
        right 5px
        top 13px
        img 
            margin-right 25px
    .logo_img
      margin-top 13px
      margin-bottom 12px
      float left
      display inline-block
      cursor default
    .ivu-menu-item
      font-size 16px 
      a
        color #fff
    .ivu-dropdown-rel
      a
        color rgba(255,255,255,.7);
        font-size 16px
    .ivu-menu-horizontal 
      .ivu-menu-item
       padding 0 10px !important;
    .ivu-menu-dark
      background-color rgba(255,255,255,0)
      width 97%

    .ivu-layout-header
        width 1920px
        height 72px
        background url(../../assets/pic_top.jpg)
        background url(../../assets/pic_top.jpg)
        background-size 1920px 70px
        z-index 100
        position fixed
        cursor pointer
    .ivu-select-selection
    .ivu-btn
       border-radius 0px!important
    .layout-logo
        width 100px
        height 30px
        background #5b6270
        border-radius 3px
        float left
        position relative
        top 15px
        left 20px
    .layout-nav
      height 16px
      font-size 16px !important
      color #ffffff
      font-weigh 400
      color rgba(255,255,255,1)
      display inline-block
      float right
      margin-top 9px
      z-index 100
      position absolute 
      right 50px
    .layout-footer-center
        text-align center
    
    .ivu-select
      width 190px !important
      height 36px
    
    
</style>