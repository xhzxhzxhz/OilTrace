<template>
    <div style='height:890px;' class='runData'>
        <Menu mode="horizontal" :theme="theme1" active-name="1" class='second_menu'>   
          <MenuItem name="1" class='first_menu' @click.native='showModule(1)'>
              用户管理
          </MenuItem>
          <MenuItem name="2" class='first_menu' @click.native='showModule(2)'>
              角色管理
          </MenuItem>
          <MenuItem name="3" class='first_menu' @click.native='showModule(3)'>
              单位管理
          </MenuItem>
          <MenuItem name="4" class='last_menu' @click.native='showModule(4)'>
              系统日志
          </MenuItem>
        </Menu>
        <Card>
            <div style="min-height: 200px">
                <div class='content'>
                  <!-- 用户管理 -->
                  <UserManage v-if='show_module=="用户管理"'/>
                  <!-- 角色管理 -->
                  <RoleManage v-else-if='show_module=="角色管理"'/>
                  <!-- 单位管理 -->
                  <DepartmentManage v-else-if='show_module=="单位管理"'/>
                  <!-- 系统日志 -->
                  <LogManage v-else-if='show_module=="系统日志"'/>
                </div>
            </div>
        </Card>
    </div>
</template>
<script>
    import UserManage from './userManage.vue'
    import RoleManage from './roleManage.vue'
    import DepartmentManage from './departmentManage.vue'
    import LogManage from './logManage.vue'
    export default {
        data(){
          return {
            show_module:'用户管理',theme1:'light'
          }
        },
        components:{
          UserManage,
          RoleManage,
          DepartmentManage,
          LogManage
        },
       
        methods:{
          showModule(index){
            if(index==1) this.show_module='用户管理';
            else if(index==2) this.show_module='角色管理';
            else if(index==3) this.show_module='单位管理';
            else if(index==4) this.show_module='系统日志';        
          },
        

        }
    }
</script>

<style lang="stylus" scoped>
  .runData
    .layout
      border 1px solid #d7dde4
      background #f5f7f9
      position relative
      border-radius 4px
      overflow hidden
    .ivu-menu-item
      font-size 16px 
    // .last_menu
    //   margin-right 200px
    //   margin-left 50px
    .ivu-menu-horizontal 
      .ivu-menu-item
        //float right  
    .ivu-dropdown-rel
      a
        color rgba(255,255,255,.7)
        font-size 16px
    .ivu-menu-horizontal 
      .ivu-menu-item
        padding 0 10px !important
    .second_menu
      padding-left 767px
      margin 0 -50px
      width 1920px
      margin-top -88px
      position fixed
      z-index 4
  
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
</style>