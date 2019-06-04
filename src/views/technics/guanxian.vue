<template>  
    <div>
        <div class='select_box select_box1'>
            <span>
            管线查询
            <Select style="width:200px" v-model='oil_station' @on-query-change='search_oilStation_gx'>
                <Option v-for="(item,index) in select_address" :value="item.tubeName" :key='index'>{{ item.tubeName}}<span style='display:none'> {{item.tubeId}}</span></Option>
            </Select>
            </span>
            <span class='showUpdateCg' @click='showUpdateCg'>
            <img src="../../assets/icon_nor_xiangai.png" alt="">
            管线修改
            </span>
        </div>
        <el-table class="ss" :header-cell-style="{background:'#eef1f6',color:'#606266'}" @expand-change="expandChange" @row-click="expandChange" @selection-change='cs2' :data="data3" element-loading-background="rgba(0, 0, 0, .3)" style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="管线名称" align="left" >
            <template slot-scope="scope">
                <span>{{scope.row.tubeName}}</span>
            </template>
            </el-table-column>
            <el-table-column label="源输油站" align="left" >
            <template slot-scope="scope">
                <span>{{scope.row.storageTankStart}}</span>
            </template>
            </el-table-column>
            <el-table-column label="目的输油站" align="left" >
            <template slot-scope="scope">
                <span>{{scope.row.storageTankEnd}}</span>
            </template>
            </el-table-column>
            <el-table-column label="管线长度（km）" align="left" >
            <template slot-scope="scope">
                <span>{{scope.row.tubeLength}}</span>
            </template>
            </el-table-column>
            <el-table-column label="平均内径（m）" align="left" >
            <template slot-scope="scope">
                <span>{{scope.row.tubeDiameter}}</span>
            </template>
            </el-table-column>
            <el-table-column label="壁厚（mm）" align="left" >
            <template slot-scope="scope">
                <span>{{scope.row.wallThickness}}</span>
            </template>
            </el-table-column>
            <el-table-column label="备注" align="left" >
              <template slot-scope="scope">
                  <span>{{scope.row.remarks}}</span>
              </template>
            </el-table-column>
            <el-table-column type="expand" align="center" width="100" label="操作">
              <template slot-scope="scope">                
                   <Table disabled-hover :columns="columns4" border :data="data4" class='second_table' :add_bool="add_bool" :no-data-text="add_btn" @click.native="addFd_model(add_bool)"></Table>
              </template>
            </el-table-column>
        </el-table>
        <Page :total="gx_total" @on-change='changePageNum_gx' show-total />
        <!-- 修改管线模态框 -->
        <Modal
            title="修改管线"
            v-model="showUpdateGxModel"
            class="vertical-center-modal" width='660'>
            <div class='update_table'>
                <p style='margin-bottom:24px'>
                <span>管线名称：&nbsp;&nbsp;{{updateGxParams.tubeName}}</span>
                <span style="display:inline-block;margin-left:230px;">壁厚：&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Input v-model="updateGxParams.wallThickness" placeholder="" style="width: 216px" class='gw dw'> <span slot="append">mm</span></Input></span>
                </p>
                <p style='margin-bottom:24px'>
                <span> 管线长度：&nbsp;&nbsp;<Input v-model="updateGxParams.tubeLength" style="width: 216px" class='gw dw'> <span slot="append">mm</span></Input></span>
                    <span> &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; 平均内径：&nbsp;&nbsp;<Input v-model="updateGxParams.tubeDiameter" placeholder="" style="width: 216px" class='gw dw'> <span slot="append">m</span></Input></span>
                </p>
                <Input v-model="updateGxParams.remarks" placeholder="备注" class='textInput' style="width:614px;height:92px;margin-bottom:24px" />  
                <p style='margin-bottom:10px;text-align:center'>
                <Button type="primary" style='width:145px;height:36px;' @click='updateGxInfo'>提交</Button> 
                </p>  
            </div>
        </Modal>
        <!-- 添加分段模态框 -->
        <Modal
            title="添加分段"
            v-model="showAddFdModel"
            class="vertical-center-modal" width='660'>
            <div class='update_table'>
                <p style='margin-bottom:24px'>
                <span>分段：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Input v-model="addFdParams.sort" style="width: 216px" /></span>
                <span class='second_col'>起始位置：<Input v-model="addFdParams.tubeLengthStart" style="width: 216px" class='gw dw'> <span slot="append">km</span></Input></span>
                </p>
                <p style='margin-bottom:24px'>
                <span> 结束位置：&nbsp;&nbsp;<Input v-model="addFdParams.tubeLengthEnd" style="width: 216px" class='gw dw'> <span slot="append">km</span></Input></span>
                <span> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;管径：&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;<Input v-model="addFdParams.tubeDiameter" placeholder="" style="width: 216px" class='gw dw'> <span slot="append">mm</span></Input></span>
               </p>
                <p style='margin-bottom:24px'>
                    <span> 壁厚：&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;<Input v-model="addFdParams.wallThickness" style="width: 216px" class='gw dw'> <span slot="append">mm</span></Input></span>
                </p>

                <Input v-model="addFdParams.remarks" class='textInput' style="width:624px;height:92px;margin-bottom:24px" />  
                <p style='margin-bottom:10px;text-align:center'>
                <Button type="primary" style='width:145px;height:36px;' @click='addFd'>提交</Button> 
                </p>  
            </div>
        </Modal>
        <!-- 修改分段模态框 -->
        <Modal
            title="修改分段"
            v-model="showUpdateFdModel"
            class="vertical-center-modal" width='660'>
            <div class='update_table'>
            <p style='margin-bottom:24px'>
                <span>分段：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Input v-model="updateFdParams.sort" style="width: 216px" /></span>
                <span class='second_col'>起始位置：<Input v-model="updateFdParams.tubeLengthStart" style="width: 216px" class='gw dw'> <span slot="append">km</span></Input></span>
            </p>
            <p style='margin-bottom:24px'>
                <span> 结束位置：&nbsp;&nbsp;<Input v-model="updateFdParams.tubeLengthEnd" style="width: 216px" class='gw dw'> <span slot="append">km</span></Input></span>
                <span> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;管径：&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;<Input v-model="updateFdParams.tubeDiameter" style="width: 216px" class='gw dw'> <span slot="append">mm</span></Input></span>
           </p>
            <p style='margin-bottom:24px'>
             
                <span>壁厚：&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;<Input v-model="updateFdParams.wallThickness" style="width: 216px" class='gw dw'> <span slot="append">mm</span></Input></span>
            </p>

            <Input v-model="updateFdParams.remarks" class='textInput' style="width:624px;height:92px;margin-bottom:24px" />  
            <p style='margin-bottom:10px;text-align:center'>
                <Button type="primary" style='width:145px;height:36px;' @click='updateFd'>提交</Button> 
            </p>  
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
    import {oilStation,fdList} from './api.js'
    import Qs from 'qs'
    export default {
        data(){
          return {
            select_address:[],will_updateData:[],gx_total:0,oil_station:'',add_btn:"",add_bool:false,
            oilName:"",pageSize:10,yp_list:0,gx_list:0,will_updateCgData:[],update_storageTankId:'',
            cz:require('../../assets/btn_sel_fend.png'),gx_select:[],select_tubeId:"",
            bj:require('../../assets/icon_nor_xiugai.png'),page_gx:1,
            del:require('../../assets/icon_shanchu.png'),
            add:require('../../assets/icon_xinjian.png'),error_text:"",
            showError:false,selected:0,queryOilName:'',update_fdId:'',
            showUpdateGxModel:false,showUpdateFdModel:false,showAddFdModel:false,showDeleteFdModel:false,//管线配置模态框状态
            deleteOilId:[],cg_select:[],will_updateGxData:[],update_tubeId:'',add_fdId:'',
            updateGxParams:{"tubeName":'',"wallThickness":'',"tubeDiameter":'',"remarks":'',"tubeLength":''},//修改管线参数
            addFdParams:{"pipeSegmentId":'',"tubeLengthStart":'',"tubeLengthEnd":'',"tubeDiameter":'',"tubeLength ":'',"wallThickness":'',"remarks":''},//添加分段参数
            updateFdParams:{"pipeSegmentId":'',"tubeLineName":'',"tubeLengthStart":'',"tubeLengthEnd":'',"tubeDiameter":'',"tubeLength ":'',"wallThickness":'',"remarks":''},//修改分段参数
            data3:[{"tubeName":'',"storageTankStart":'',"storageTankEnd":'',"remarks":'',"tubeDiameter":'',"tubeLength":'',"wallThickness":''}],
            columns4:[
              {
                  title: '分段',
                  align:'center',
                  key: 'sort'
              },
              {
                  title: '起始位置',
                   align:'center',
                  key: 'tubeLengthStart'
              },
              {
                  title: '结束位置',
                   align:'center',
                  key: 'tubeLengthEnd'
              },
                {
                  title: '管长',
                  align:'center',
                  key: 'tubeLengthSum'
              },
                {
                  title: '管径',
                  align:'center',
                  key: 'tubeDiameter'
              },
                {
                  title: '壁厚',
                  align:'center',
                  key: 'wallThickness'
              }, 
              {
                  title: '备注',
                   align:'center',
                  key: 'remarks'
              },
              {
                  title: '操作',
                  key: 'cz',
                  align: 'center',
                  render: (h, params) => {
                        return h('div',[
                          h('img',{
                            attrs:{
                                src:this.bj,style:"width:15px;height:16px;margin-right:11px"
                            },
                            on: {
                                click: () => {
                                    this.updateFdParams=params.row
                                    this.update_fdId=params.row.tubeLengthId
                                    this.showUpdateFdModel=true; 
                                }
                            }
                          }),
                          h('img',{
                            attrs:{
                              src:this.del,style:"width:15px;height:16px;margin-right:11px"
                            },
                            on: {
                              click: () => {
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
                                  //删除分段
                                    deleteFd(`tubeLengthId=${params.row.tubeLengthId}`).then(res=>{
                                      fdList(`pipeSegmentId=${params.row.pipeSegmentId}`).then(res=>{
                                        let result2=res.data.data
                                         this.data4=result2
                                         this.expandChange()
                                      })
                                    })
                                                        
                                }).catch(() => {
                                  this.$message({
                                    type: 'info',
                                    message: '已取消删除'
                                  });
                                });
                                }
                              }
                          }),
                          h('img',{
                            attrs:{
                                src:this.add,style:"width:15px;height:16px;"
                            },
                            on: {
                                click: () => {
                                    this.showAddFdModel=true
                                    this.addFdParams={}
                                }
                            }
                          })
                        ]);
                  } 
              }
            ],data4:[]
          }
        },
        mounted(){
         this.get_gx()
         this.getOilStation()
        },
        methods:{
   
          get_gx(){
             //获取管线列表
             this.axios.post("/OilTrack/pipelineCompositon/list",Qs.stringify({rows:10,page:this.page_gx,tubeName:this.oil_station})).then(res=>{
              let result=res.data.data
              this.gx_total=res.data.total
              this.data3 = result;
              for(var i=0;i<result.length;i++){
                this.data3[i].tubeName=result[i].tubeName
                this.data3[i].storageTankStart=result[i].pipeAlloction[0].tubeLineName.split('-')[0]
                this.data3[i].storageTankEnd=result[i].pipeAlloction[0].tubeLineName.split('-')[1]
                this.data3[i].tubeDiameter=result[i].pipeAlloction[0].tubeDiameter
                this.data3[i].tubeLength=result[i].pipeAlloction[0].tubeLength
                this.data3[i].wallThickness=result[i].pipeAlloction[0].wallThickness
                this.data3[i].remarks=result[i].pipeAlloction[0].remarks
              }
            })
           
          },
           //获取油站列表
          getOilStation(){
            this.axios.post("/OilTrack/line/lines").then(res=>{
              this.select_address=res.data.data
            }) 
          },
          //获取分段列表
          expandChange(row){
             if(typeof(row)!=="string"){
                 this.add_fdId=row.pipeAlloction[0].configureId
             }
             //获取分段列表
              this.axios.post('/OilTrack/segmentlength/list',Qs.stringify({pipeSegmentId:this.add_fdId})).then(res=>{
                let result2=res.data.data
                this.data4=result2
                if(result2.length>0){
                  this.add_bool=true
                } else{
                  this.add_bool=false
                  this.add_btn="<p>暂无数据<p><button id='add_btn' class='add_btn' type='primary'>增加分段</button>"
                }
               
              })
            
           
          },
          //切换管线
          search_oilStation_gx(e){
            this.oil_station=e.split(' ')[0]
            this.select_tubeId=e.split(' ')[1]
            this.get_gx()
          },
           //管线复选框
          cs2(e){
            if(e.length>0){
              this.will_updateGxData=e[0]
              this.update_tubeId=this.will_updateGxData.pipeAlloction[0].configureId
              this.gx_select=e.length
            }else{
              this.gx_select=0
            }
           
          },    
          //点击，切换页面-----管线页面
          changePageNum_gx(index) {
         
            this.page_gx=index
            this.get_gx()
          },
          nowPageSize(index) {
            //实时获取当前需要显示的条数
            this.pageSize = index;
          },      
          //修改管线模态框
          showUpdateCg(){
            if(this.gx_select==0){
              this.showError=true
              this.error_text="请选择要操作的数据"
            }else if(this.gx_select>1){
              this.showError=true
              this.error_text="请选择一条要操作的数据"
            }
            else{
              this.showUpdateGxModel=true;
              this.updateGxParams=this.will_updateGxData
            } 
          },
          updateGxInfo(){    
            this.axios.post("/OilTrack/pipelineCompositon/update",Qs.stringify({configureId:this.update_tubeId,
              tubeName:this.will_updateGxData.tubeName,
              wallThickness:this.updateGxParams.wallThickness,
              tubeDiameter:this.updateGxParams.tubeDiameter,
              remarks:this.updateGxParams.remarks,
              tubeLength:this.updateGxParams.tubeLength})).then(res=>{
                this.showUpdateGxModel=false;
                this.get_gx()
            })

            
          },
          //增加分段模态框
          addFd_model(add_bool){
            if(add_bool==false){
              this.showAddFdModel=true
            }
          },
          //添加分段
          addFd(){
            this.axios.post("/OilTrack/segmentlength/insert",Qs.stringify({pipeSegmentId:this.add_fdId,
            tubeLengthStart:this.addFdParams.tubeLengthStart,
            tubeLengthEnd:this.addFdParams.tubeLengthEnd,
            tubeDiameter:this.addFdParams.tubeDiameter,
            wallThickness:this.addFdParams.wallThickness,
            remarks:this.addFdParams.remarks,
            sort:this.addFdParams.sort})).then(res=>{
               this.showAddFdModel=false
               this.expandChange(this.add_fdId)
            })
          },
          //修改分段
          updateFd(){
            this.axios.post("/OilTrack/segmentlength/update",Qs.stringify({
              tubeLengthId:this.update_fdId,
              tubeLengthStart:this.updateFdParams.tubeLengthStart,
              tubeLengthEnd:this.updateFdParams.tubeLengthEnd,
              tubeDiameter:this.updateFdParams.tubeDiameter,
              wallThickness:this.updateFdParams.wallThickness,
              remarks:this.updateFdParams.remarks,
              sort:this.updateFdParams.sort
            })).then(res=>{
              this.showUpdateFdModel=false;
              this.expandChange(this.add_fdId)
            })
          },      
        }
      
    }
</script>
<style lang="stylus">
    .add_btn
      padding 5px 11px
      color #fff
      background-color #2d8cf0
      border-color #2d8cf0
      margin-top 10px
    .ivu-page
      float right
      margin-top 20px
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
    .select_box1
      padding 10px 0
      border-bottom 1px dashed #eee
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
      padding-bottom 100px
   
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
