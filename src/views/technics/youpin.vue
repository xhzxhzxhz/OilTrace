<template>
    <div>
        <div class='select_box select_box1'>
            <span class='updateCg' @click='showAddOil'>
                <img src="../../assets/icon_nor_jiayou.png" alt="">
                添加油品
            </span>
            <span class='updateCg' @click='showUpdateOil'>
                <img src="../../assets/icon_nor_gaiyou.png" alt="">
                修改油品
            </span>
            <span class='updateCg'>
                <el-button type="text" style='color:#000;font-weight:normal' @click="deleteOil"><img src="../../assets/icon_nor_shanyou.png" alt="">
                删除油品</el-button> 
            </span>
            <span class='search_box' style='float:right;margin-top:-8px;'>
                <Input search enter-button v-model="queryOilName" placeholder="油品名称" @on-search='selectOil'/>
            </span>
        </div>
        <Table id='colorname' ref="selection" @on-selection-change='cs' :columns="columns1" :data="data1"></Table>
        <Page :total="yp_total" show-total @on-change='changePageNum_yp'/>
        <!-- 添加油品 -->
        <Modal
            title="添加油品"
            v-model="showAddOilModel"
            class="vertical-center-modal" width='660'>
            <div class='update_table'>
            <p style='margin-bottom:24px'>
                <span>油品名称：&nbsp;&nbsp;&nbsp;<Input v-model="addParams.oilName" style="width: 216px" /></span>
                <span class='second_col'>英文名称：&nbsp;&nbsp;&nbsp;&nbsp;<Input v-model="addParams.englishName" style="width: 216px" /></span>
            </p>
            <p style='margin-bottom:24px'>
                <span> 国家：&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Input v-model="addParams.site" style="width: 216px" /></span>
                <span class='second_col'>密度：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Input v-model="addParams.density" style="width: 216px" class='gw dw'> <span slot="append">t/m³</span></Input></span>
            </p>
            <p style='margin-bottom:24px'>
                <span>粘度：&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Input v-model="addParams.viscosity" style="width: 216px" class='gw dw'> <span slot="append">mPa·s</span></Input></span>
                <span class='second_col'>硫含量：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Input v-model="addParams.sulfur" style="width: 216px" class='gw dw'> <span slot="append">ppm</span></Input></span>
            </p>
            <p style='margin-bottom:24px'>
                <span>H2S气含量：<Input v-model="addParams.h2sGas" style="width: 216px" class='gw dw'> <span slot="append">ppm</span></Input></span>
                <span class='second_col'>H2S液含量：<Input v-model="addParams.h2sLiquid" style="width: 216px" class='gw dw'> <span slot="append">ppm</span></Input></span>
            </p>
            <p style='margin-bottom:24px'>
                <span>名称跟踪颜色： <ColorPicker v-model="addParams.nameColor" /></span>
                <span class='second_col'>物性跟踪颜色： <ColorPicker v-model="addParams.propertyColor" /></span>
            </p>
            <Input v-model="addParams.remarks" placeholder="备注" class='textInput' style="width:624px;height:92px;margin-bottom:24px" />  
            <p style='margin-bottom:10px;text-align:center'>
                <Button type="primary" style='width:145px;height:36px;' @click='addOil'>提交</Button> 
            </p>  
            </div>
        </Modal>
        <!-- 修改油品 -->
        <Modal
            title="修改油品"
            v-model="showUpdateOilModel"
            class="vertical-center-modal" width='660'>
            <div class='update_table'>
            <p style='margin-bottom:24px'>
                <span>油品名称：&nbsp;&nbsp;&nbsp;<Input v-model="updateParams.oilName" style="width: 216px" /></span>
                <span class='second_col'>英文名称：&nbsp;&nbsp;&nbsp;&nbsp;<Input v-model="updateParams.englishName" style="width: 216px" /></span>
            </p>
            <p style='margin-bottom:24px'>
                <span> 国家：&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Input v-model="updateParams.site" style="width: 216px" /></span>
                <span class='second_col'>密度：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Input v-model="updateParams.density" style="width: 216px" class='gw dw'> <span slot="append">t/m³</span></Input></span>
            </p>
            <p style='margin-bottom:24px'>
                <span>粘度：&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Input v-model="updateParams.viscosity" style="width: 216px" class='gw dw'> <span slot="append">mPa·s</span></Input></span>
                <span class='second_col'>硫含量：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Input v-model="updateParams.sulfur" style="width: 216px" class='gw dw'> <span slot="append">ppm</span></Input></span>
            </p>
            <p style='margin-bottom:24px'>
                <span>H2S气含量：<Input v-model="updateParams.h2sGas" style="width: 216px" class='gw dw'> <span slot="append">ppm</span></Input></span>
                <span class='second_col'>H2S液含量：<Input v-model="updateParams.h2sLiquid" style="width: 216px" class='gw dw'> <span slot="append">ppm</span></Input></span>
            </p>
            <p style='margin-bottom:24px'>
                <span>名称跟踪颜色： <ColorPicker v-model="updateParams.nameColor" /></span>
                <span class='second_col'>物性跟踪颜色： <ColorPicker v-model="updateParams.propertyColor" /></span>
            </p>
            <Input v-model="updateParams.remarks" placeholder="备注" class='textInput' style="width:624px;height:92px;margin-bottom:24px" />  
            <p style='margin-bottom:10px;text-align:center'>
                <Button type="primary" style='width:145px;height:36px;' @click='updateOilPz'>提交</Button> 
            </p>  
            </div>
        </Modal>
        
        <!-- 删除油品模态框 -->
        <Modal v-model="showDeleteOilModel" width="360">
            <p slot="header" style="color:#fff;text-align:center">
                <Icon type="ios-information-circle" style="font-size:20px"></Icon>
                <span>删除提醒</span>
            </p>
            <div style="text-align:center">
                <p>您确定要删除该项吗?</p>
            </div>
            <div slot="footer" style='display:block;color:#fff'>
                <Button type="error" size="large" long @click="deleteOil">删除</Button>
            </div>
        </Modal>
        <!-- 未选中行时模态框 -->
        <Modal v-model="showError">
            <Icon type="md-close-circle" style='font-size:30px;margin-right:20px;color:#E6A23C'/>
            <span  v-text="error_text" style='font-size:16px'>请选择要操作的数据</span>
        </Modal>
    </div>
</template>
<script>
    import {oilStation} from './api.js'
    import Qs from 'qs'
    export default {
        data(){
          return {
            update_color: '#00A0E9',modelTitle:"",
            select_address:[],yp_total:0,will_updateData:[],
            oilName:"",pageSize:10,
            showError:false,selected:0,queryOilName:'',error_text:"",
            showUpdateOilModel:false,showAddOilModel:false,showDeleteOilModel:false, //油品配置模态框状态
            color1: '#00A0E9',color2:'#F8B551',deleteOilId:[],oil_color:'',
            addParams:{"hydrogenSulfide":'',"oilName":'','site':'','density':'','viscosity':'','sulfur':'','h2sGas':'','h2sLiquid':'','propertyColor':'#00A0E9',"nameColor":'#1B042A','remarks':'',"englishName":'',"containWater":''},//增加油品参数
            updateParams:{"hydrogenSulfide":'',"oilName":'','site':'','density':'','viscosity':'','sulfur':'','h2sGas':'','h2sLiquid':'','propertyColor':'#00A0E9',"nameColor":'#1B042A','remarks':'',"englishName":'',"containWater":''},//修改油品参数
            columns1: [
              {
                type: 'selection',
                width:60
              },
              {
                  title: '油品名称',
                  width:100,
                  key: 'oilName'
              },
              {
                  title: '密度（t/m³）',
                  key: 'density'
              },
              {
                  title: '粘度（mPa-5）',
                  key: 'viscosity'
              },
                {
                  title: '硫含量（ppm）',
                  key: 'sulfur'
              },
                {
                  title: '硫化氢气相含量（ppm）',
                  key: 'h2sGas'
              },
              {
                  title: '颜色',
                  key: 'nameColor',
                  render: (h, params) => {
                        this.oil_color=params.row.nameColor
                        this._index=params.row._index                   
                        return h('div',{
                          class:'sd_color', 
                        });
                  } 
              }, 
              {
                  title: '备注',
                  key: 'remarks'
              }
            ],data1:[], _index:0,page_num:1
          }
        },
        updated(){
          this.changeColor()
        },
        mounted(){ 
            //获取油站列表
          oilStation().then(res=>{
            this.select_address=res.data.data
          })
          //获取油品列表        
          this.getOilList()
        },
        methods:{
           //获取油品列表   
           getOilList(){
              this.axios.post("/OilTrack/oilsinfo/listByQueryPage",Qs.stringify({page:this.page_num,rows:10,oilName:this.queryOilName})).then(res=>{
                let result=res.data.data
                this.yp_total=res.data.total   
                this.data1 =result;
              })
           },
         //油品颜色
          changeColor(){
            var sheet=document.getElementsByTagName('head')[0];
            var pp=document.getElementsByClassName('sd_color');
            for(var i=0;i<this.data1.length;i++){
              pp[i].classList.add('sd_color'+i)
              var tt=`
              .sd_color${i}:after{background:${this.data1[i].nameColor}!important;}
              .sd_color${i}::before{border-top-color:${this.data1[i].nameColor}!important; }`
              sheet.children[7].innerHTML+=tt
            }
          },
          //查询油品
          selectOil(){
            this.getOilList()
          },
          cs(e){
            this.will_updateData=e[0]
            for(var i=0;i<e.length;i++){
              if( this.deleteOilId.indexOf(e[i].oilId)==-1)
                this.deleteOilId.push(e[i].oilId)
            }
            this.selected=e.length
          },
          //点击，切换页面-----油品页面
          changePageNum_yp(index) {
            this.page_num=index;
            this.getOilList();
          },     
          nowPageSize(index) {
            //实时获取当前需要显示的条数
            this.pageSize = index;
          },
          //添加油品
          showAddOil(){
            this.showAddOilModel=true;
          },
          addOil(){
            this.axios.post('/OilTrack/oilsinfo/insert',Qs.stringify({
              hydrogenSulfide:this.addParams.hydrogenSulfide,
              h2sLiquid:this.addParams.h2sLiquid,
              containWater:this.addParams.containWater,
              oilName:this.addParams.oilName,
              h2sGas:this.addParams.h2sGas,
              englishName:this.addParams.englishName,
              propertyColor:this.addParams.propertyColor,
              nameColor:this.addParams.nameColor,
              remarks:this.addParams.remarks,
              density:this.addParams.density,
              viscosity:this.addParams.viscosity,
              site:this.addParams.site,
              sulfur:this.addParams.sulfur})).then(res=>{
                this.showAddOilModel=false;
                this.getOilList()
            })


          },
          //修改油品模态框
          showUpdateOil(){
            if(this.selected==0){
              this.showError=true
              this.error_text="请选择要操作的数据"
            }else if(this.selected>1){
              this.showError=true
              this.error_text="请选择一条要操作的数据"
            }
            else{
              this.showUpdateOilModel=true;
              this.updateParams=this.will_updateData
            } 
          },
          //修改油品
          updateOilPz(){
            this.axios.post('/OilTrack/oilsinfo/update',Qs.stringify({
            oilId:this.updateParams.oilId,
            hydrogenSulfide:this.updateParams.hydrogenSulfide,
            h2sLiquid:this.updateParams.h2sLiquid,
            containWater:this.updateParams.containWater,
            oilName:this.updateParams.oilName,
            h2sGas:this.updateParams.h2sGas,
            englishName:this.updateParams.englishName,
            propertyColor:this.updateParams.propertyColor,
            nameColor:this.updateParams.nameColor,
            remarks:this.updateParams.remarks,
            density:this.updateParams.density,
            viscosity:this.updateParams.viscosity,
            site:this.updateParams.site,
            sulfur:this.updateParams.sulfur})).then(res=>{
              this.showUpdateOilModel=false;
              this.getOilList()
            })
          },
          //删除油品
          deleteOil(){
            if(this.selected==0) this.showError=true
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
              for(var i=0;i<this.deleteOilId.length;i++){
                this.axios.post("/OilTrack/oilsinfo/delete",Qs.stringify({oilId:this.deleteOilId[i]})).then(res=>{
                 this.getOilList()
                })
              }
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
            }
          }
        }
    }
</script>
<style lang="stylus"> 
    .ivu-page
      float right
      margin-top 20px
    .sd_color
      height 40px 
      display block 
      position relative
      width 26px
      transform  rotate(180deg)
      &:after
        content:'';
        height:15px;
        width:15px; 
        display:block; 
        position:absolute;
        top:10px; 
        left:5px; 
        z-index:1; 
        line-height:26px; 
        background:#333; 
        border-radius:40px;
        -webkit-border-radius:40px;
        -moz-border-radius:40px; 
        color:#fff;
        text-align:center;
      &:before
        content '' 
        height 0px 
        width 0px 
        display block 
        position absolute 
        bottom 7px 
        left 6px 
        border 10px transparent solid
        border-top-color #333 
        border-width 11px 6px 0px 7px
    .ivu-btn-error
      background #539BF3
      border-color #539BF3
      &:hover
        background #539BF3
        border-color #539BF3
    .ivu-modal-footer
      display block
    .ivu-input-group
      z-index 0
      .ivu-input
        border-radius 0
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
    .ivu-modal-header
      background #3D7AD5
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

</style>

<style lang="stylus" scoped>
    .update_table
      width 635px
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
      border-bottom 1px dashed #eee;
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
      margin-left 10px
      img 
        vertical-align middle
  
</style>
