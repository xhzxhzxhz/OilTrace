<template>
    <div class='runData'>
        <Menu mode="horizontal" :theme="theme1" active-name="1" class='second_menu'>
          <MenuItem name="3" @click.native='showGx'>
              管线配置
          </MenuItem>
          <MenuItem name="2" class='first_menu' @click.native='showCg'>
              储罐配置
          </MenuItem>
          <MenuItem name="1" class='first_menu' @click.native='showYp'>
              油品配置
          </MenuItem>        
        </Menu>
        <Card>
            <div style="min-height: 200px;cursor:pointer">
                <div class='content'>
                  <!-- 储罐配置 -->
                  <Chuguan v-show='show_cg'/>         
                  <!-- 管线配置 -->
                  <GuanXian v-show='show_gx'/>
                  <!-- 油品配置 -->
                  <Youpin v-show='show_yp'/>
              </div>
            </div>
        </Card>
    </div>
</template>
<script>
   import GuanXian from './guanxian.vue'
   import Youpin from './youpin.vue'
   import Chuguan from './chuguan.vue'
    export default {
        data(){
          return {
            theme1: 'light',
            show_gx:false,
            show_cg:false,
            show_yp:true
          }
        },
        components:{
          GuanXian,
          Youpin,
          Chuguan
        },
        mounted(){
        
        },
        methods:{
          showGx(){
            this.show_gx=true;
            this.show_cg=false;
            this.show_yp=false;
          },
          showCg(){
            this.show_gx=false;
            this.show_cg=true;
            this.show_yp=false;
          },
          showYp(){
            this.show_gx=false;
            this.show_cg=false;
            this.show_yp=true;
          },
        }
    }
</script>
<style lang="stylus">
    .ivu-btn-error
      background #539BF3
      border-color #539BF3
      &:hover
        background #539BF3
        border-color #539BF3
    .ivu-modal-footer
      display block
    .search_box
      .ivu-input-group
        z-index 0
    .el-table__expand-icon
      .el-icon
        background url('../../assets/btn_nor_fend.png')
        width 30px
        height 30px
        background-size 30px 30px
        background-repeat no-repeat
        top 19%
        left 25%
        margin-top -8px
    
    .el-table__expand-icon--expanded
      -ms-transform:rotate(0deg);
      -moz-transform:rotate(0deg);
      -webkit-transform:rotate(0deg);
      transform:rotate(0deg);
      .el-icon
        background url('../../assets/btn_sel_fend.png')
        left 37%
    .el-cascader-menu__item--extensible:after
    .el-icon-arrow-right:before 
      content ""
    .ivu-modal-header-inner
      color #fff
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
</style>

<style lang="stylus">
  .runData
    .update_table
      width 600px
    .select_box1
      margin-bottom 20px
      span 
        display inline-block
        margin-right 50px
    .layout
      border 1px solid #d7dde4
      background #f5f7f9
      position relative
      border-radius 4px
      overflow hidden
    .ivu-menu-item
      font-size 16px 
    .ivu-menu-horizontal 
      .ivu-menu-item
        margin-right 200px
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
      min-height 700px
      padding-bottom 50px
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
      margin-left 10px
      img 
        vertical-align middle
  
</style>