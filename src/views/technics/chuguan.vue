<template>
     <div v-show='show_cg'>
        <div class='select_box'>
            <span>
            油站名称 
            <Select style="width:200px" v-model='oil_startion_cg' @on-query-change='search_oilStation_cg'>
                <Option v-for="(item,index) in select_address" :value="item.oilStationName" :key='index'>{{item.oilStationName}}<span style='display:none'> {{item.oilStationId}}</span></Option>
            </Select>
            </span>
            <span class='updateCg' @click='show_updateCg'>
              <img src="../../assets/icon_nol_chuguan.png" alt="">
              修改储罐
            </span>
        </div>
        <Table ref="selection" :columns="columns2" :data="data2" ></Table>
        <Page :total="cg_total" @on-change='changePageNum_cg' show-total />
        <!-- 储罐修改模态框 -->
        <Modal
            title="储罐修改"
            v-model="showUpdateCgModel"
            class="vertical-center-modal" width='650'>
            <div class='update_table'>
                <p style='margin-bottom:24px'>
                <span>储罐名称：&nbsp;&nbsp;&nbsp; <Input v-model="updateCgParams.storageTankName" style="width: 216px" /></span>
                <span class='second_col'>
                    储罐原油：
                  <Select style="width:216px;margin-left:0px" v-model='update_oilName' @on-query-change='update_oil'>
                    <Option v-for="(item,index) in oilList" :value="item.oilName" :key="index">{{item.oilName}}<span style='display:none'> {{item.oilId}}</span> </Option>
                  </Select>
                </span>
                </p>
                <p style='margin-bottom:24px'>
                <span> 储罐类型：&nbsp;&nbsp;&nbsp; <Input v-model="updateCgParams.type" style="width: 216px" /></span>
                <span class='second_col'> 储罐直径：<Input v-model="updateCgParams.diameter" style="width: 190px" /></span>
                </p>
                <p style='margin-bottom:24px'>
                <span>安全高液位：<Input v-model="updateCgParams.securityLevelMax" style="width: 205px" class='gw'/></span>
                <span class='second_col'>安全低液位：<Input v-model="updateCgParams.securityLevelMin" style="width: 190px" class='dd'/></span>
                </p>
                <Input v-model="updateCgParams.remarks" class='textInput' style="width:602px;height:92px;margin-bottom:24px" />  
                <p style='margin-bottom:10px;text-align:center'>
                <Button type="primary" style='width:145px;height:36px;' @click='updateCgInfo'>提交</Button> 
                </p>  
            </div>
        </Modal>
        <!-- 未选中行时模态框 -->
        <Modal v-model="showError">
            <Icon type="md-close-circle" style='font-size:30px;margin-right:20px;color:#E6A23C'/>
            <span  style='font-size:16px'>请选择要操作的数据</span>
        </Modal>
    </div>
</template>
<script>
    import {oilStation,cgList} from './api.js'
    import Qs from 'qs'
    export default {
        data(){
          return {
            oilList:[],update_oilName:'',update_id:'',oil_startion_cg:'',
            select_address:[],will_updateData:[],cg_total:0,page_num:1,
            oilName:"",pageSize:10,will_updateCgData:[],update_storageTankId:'',
            add:require('../../assets/icon_xinjian.png'),
            showError:false,selected:0,queryOilName:'',select_id:"",
            show_gx:false,show_cg:false,show_yp:true,//切换配置
            showUpdateCgModel:false,//储罐配置模态框状态
            color1: '#00A0E9',color2:'#F8B551',deleteOilId:[],cg_select:[],will_updateCgData:[],update_tubeId:'',
            updateCgParams:{},//修改储罐参数
            columns2:[
              {
                title: '选择',
                align:'center',
                key: 'checkBox',
                render:(h,params)=>{
                    return h('div',[
                        h('Checkbox',{
                            props:{
                                value:params.row.checkBox
                            },
                            on:{
                                'on-change':(e)=>{
                                    this.will_updateCgData=params.row
                                    this.update_storageTankId=this.will_updateCgData.storageTankId
                                    this.update_oilName=this.will_updateCgData.oilName
                                    this.update_id=this.will_updateCgData.oilsId
                                    this.data2.forEach((items)=>{      //先取消所有对象的勾选，checkBox设置为false
                                        this.$set(items,'checkBox',false)
                                    });
                                    this.data2[params.index].checkBox = e;  //再将勾选的对象的checkBox设置为true
                                    this.cg_select=1
                                    if(e==false){
                                       this.cg_select=0
                                    }
                                }
                            }
                        })
                    ])
                }
            },
              {
                  title: '储罐名称',
                  key: 'storageTankName'
              },
              {
                  title: '输油站',
                  key: 'oilStationName'
              }, 
              {
                  title: '储罐原油',
                  key: 'oilName'
              }, 
              {
                  title: '储罐类型',
                  key: 'type'
              },
              {
                  title: '安全低液位（m）',
                  key: 'securityLevelMin'
              },
              {
                  title: '安全高液位（m）',
                  key: 'securityLevelMax'
              },
              {
                  title: '储罐直径（m）',
                  key: 'diameter'
              },
              {
                  title: '备注',
                  align: 'center',
                  key: 'remarks'
              }  

            ],data2:[{}],
          }
        },
        mounted(){
          //获取油站列表
          this. getOilStation()
          //获取储罐列表
          this.getCgList()
          this.getOilName()    
        },
        methods:{
          //获取油站列表
          getOilStation(){
            oilStation().then(res=>{
              this.select_address=res.data.data
            }) 
          },
          //获取储罐列表
          getCgList(){
            this.axios.post("/OilTrack/storageTankInfo/list",Qs.stringify({page:this.page_num,rows:10,tubeName:this.oil_startion_cg})).then(res=>{
              let result=res.data.data
              this.cg_total=res.data.total
              this.data2 = result;
            })  
           },
            //获取油品
            getOilName(){
              this.axios.post('/OilTrack/oilsinfo/listlike').then(res=>{
                this.oilList=res.data.data
              })
            },
          //点击，切换页面-----储罐页面
          changePageNum_cg(index){
            this.page_num=index;
            this.getCgList()
          },
          //储罐原油的模糊查询
          update_oil(e){
            this.update_oilName=e.split(' ')[0]
            this.update_id=e.split(' ')[1]
          },
          //获取油站数据
          search_oilStation_cg(e){
            this.oil_startion_cg=e.split(' ')[0]
            this.select_id=e.split(' ')[1]
            cgList(`oilStation=${this.select_id}`).then(res=>{
              this.data2=res.data.data
              this.cg_total=res.data.data.length
            })
             //this.getCgList()
          },
          //修改储罐模态框
          show_updateCg(){
              if(this.cg_select==0){
                this.showError=true
              }
              else{
                this.showUpdateCgModel=true;
                this.updateCgParams=this.will_updateCgData
              } 
          },
          updateCgInfo(){
            this.axios.post("/OilTrack/storageTankInfo/update",Qs.stringify({
              storageTankId:this.update_storageTankId,
              storageTankName:this.updateCgParams.storageTankName,
              oilStation:this.updateCgParams.oilStation,
              type:this.updateCgParams.type,
              cautionLevelMax:"",
              cautionLevel:"",
              floatingPlate:"",
              floatingUp:"",
              brace:"",
              levelMin:"",
              positionNumber:"",
              cautionLevelMin:"",
              openingDegree:"",
              volumeMax:"",
              valve:"",
              nowLevel:"",
              runState:"",
              wallType:"",
              oilsId:this.update_id,
              grossWeight:"",
              diameter:this.updateCgParams.diameter,
              securityLevelMax:this.updateCgParams.securityLevelMax,
              securityLevelMin:this.updateCgParams.securityLevelMin,
              remarks:this.updateCgParams.remarks,
            })).then(res=>{
              this.showUpdateCgModel=false;
              cgList(`oilStation=${this.select_id}`).then(res=>{
                this.data2=res.data.data
                this.cg_total=res.data.data.length
              })
            })
           },
        }
    }
</script>
<style lang="stylus">
    .dd
      width 200px
    .ivu-page
      float right
      margin-top 20px
    .ivu-select
      .ivu-select-selection
        border-radius 0
    .ivu-input-wrapper
      .ivu-input
        border-radius 0
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
      background #3D7AD5
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


    .ivu-input-group-append
    .ivu-input-group-prepend
      border-radius 0
</style>

<style lang="stylus" scoped>
    .update_table
      width 635px
      span 
        display inline-block
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
      margin-bottom 20px
      padding 10px 0
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
