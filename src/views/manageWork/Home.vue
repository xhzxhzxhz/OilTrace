<template>
    <div>
        <Card style='height:633px'>
            <div style="min-height: 200px">
                <div class='select_box'>
                  <div style='float:left'>
                     <span>
                      管线 
                      <Select v-model="tube_name" @on-query-change='sel_tube' style="width:200px">
                        <Option v-for="(item,index) in select_tube" :value="item.tubeName" :key='index'>{{item.tubeName}} <span style='display:none'>{{item.tubeId}}</span> </Option>
                      </Select>
                      跟踪方式
                      <Select v-model="gz_type" style="width:200px">
                        <Option v-for="(item,index) in select_gz" :value="item" :key='index'>{{ item}}</Option>
                      </Select>&nbsp;
                      <Select v-model="gz_xz" style="width:200px">
                        <Option v-for="(item,index) in select_density" :value="item" :key='index'>{{ item}}</Option>
                      </Select>&nbsp;
                      <InputNumber :max="100" v-model="gz_wave" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')"></InputNumber>&nbsp; 
                      <Button type="primary" icon="ios-search" style='margin-top:-5px' @click='search_tube'>搜索</Button>
                    </span>
                  </div>
                  <div style='float:right' @click="showCheckHistory">
                    <Button>
                        查看历史
                        <Icon type="ios-arrow-down"></Icon>
                    </Button>  
                  </div>
                 
                </div>
                <div class='check_history' v-show='hide'>  
                  <p>日期：<DatePicker :value="searchDate" format="yyyy年MM月dd日" type="date" style="width: 190px!important;margin-left:30px"></DatePicker></p> 
                  <p>整点时间：
                    <Select v-model="selectTime" style="width:200px">
                      <Option v-for="(item,index) in zdTime" :value="item" :key="index">{{item}}</Option>
                    </Select>
                  </p>  
                  <p>  
                    <Button type="primary" style='background:#539BF3' @click="search_history">搜索</Button>
                    <Button style="margin-left: 8px" @click='cancle_search'>取消</Button>
                  </p>        
                </div>
                <div class='content'>
                  <!-- <img src="../../assets/pic_kong.png" class='kong_content'> -->
                  <TraceWork :tube_name='tube_name' :gz_data='gz_data' :gz_type='gz_type' :gz_xz='gz_xz' :gz_wave='gz_wave' v-show='content_not_null'></TraceWork>
                  <div v-show='content_null'>
                    <img src="../../assets/pic_kong.png" style='margin-top:100px'>
                  </div>
                </div>
            </div>
           
        </Card>
        <Card  style='height:720px;margin-top:20px'>
          <div class='menu_card'>
            <ul>
              <li v-for='(item,index) in menu_card' :key='index' :class='{active:index==current}' @click='changeStyle(index)' :style='style'>{{item}}</li>
            </ul>
          </div>
          <!-- 正在执行 -->
          <div v-show='doing'>
            <Table ref="selection" :columns="columns1" :data="data1"></Table>
            <Page :total="data1_total" show-total @on-change='changePageNum_now'/>
            <!-- 正在执行计划详情模态框 -->
            <Modal
                title="正在执行计划详情"
                v-model="showDoingDetails"
                class="vertical-center-modal" width='396'>
                <table class='detail_table' height='500px'>
                  <tr>
                    <td>计划类型：</td>
                    <td>{{working_data.establishState}}</td>
                  </tr>
                  <tr>
                    <td>油品名称：</td>
                    <td>{{working_data.oilsName}}</td>
                  </tr>
                  <tr>
                    <td>输油油罐：</td>
                    <td>{{working_data.storageTankStartName}}</td>
                  </tr>
                  <tr>
                    <td>收油油罐：</td>
                    <td>{{working_data.storageTankEndName}}</td>
                  </tr>
                  <tr>
                    <td>混油长度：</td>
                    <td>{{working_data.mixingLength}}</td>
                  </tr>
                  <tr>
                    <td>计划输量：</td>
                    <td>{{working_data.oilTransportationVolume}}</td>
                  </tr>
                  <tr>
                    <td>已输量：</td>
                    <td>{{working_data.throughput}}</td>
                  </tr>
                  <tr>
                    <td>管存量：</td>
                    <td>{{working_data.oilAmout}}</td>
                  </tr>
                  <tr>
                    <td>剩余时间：</td>
                    <td>{{working_data.remainingTime}}</td>
                  </tr>
                  <tr>
                    <td>外输起始时间：</td>
                    <td>{{working_data.startTime}}</td>
                  </tr>
                  <tr>
                    <td>预计到达下一站时间：</td>
                    <td>{{working_data.nextTime}}</td>
                  </tr>
                   <tr>
                  <td>预计外输完成时间：</td>
                    <td>{{working_data.fishTime}}</td>
                  </tr>
                  <tr>
                    <td>距下一站距离：</td>
                    <td>{{working_data.distance}}</td>
                  </tr>
                </table>
            </Modal>
          </div>
           <!-- 输油计划 -->
          <div v-show='planing'>
            <div class='select_box2'>
              <span class='updateCg' @click='addPlan'>
                <img src="../../assets/icon_xinjian.png" alt="">
                新建计划
              </span>
              <span class='updateCg' @click='updatePlan'>
                <img src="../../assets/icon_nor_xiugai.png" alt="">
                修改计划
              </span>
              <span class='updateCg'>
                <el-button type="text" style='color:#000;font-weight:normal' @click="deletePlan"><img src="../../assets/icon_shanchu.png" alt="">
                删除计划</el-button>
              </span>
            </div>
            <Table ref="selection" @on-selection-change='planing_selectItem' :columns="columns2" :data="data2"></Table>
            <Page :total="plan_totalData" @on-change='changePageNum_plan' show-total />       
            <!-- 新建计划模态框 -->
            <Modal
                title="新建计划"
                v-model="showAddPlanModel"
                class="vertical-center-modal" width='660'>
                <div class='update_table'>
                  <p style='margin-bottom:24px;position:relative'>
                    <span>原油名称：&nbsp;&nbsp;
                      <Input style="width: 548px!important;margin-left:0px;" v-model="add_oilsName" @on-focus='show_Selectbox'></Input>
                    </span>
                    <!--选择原油-->
                    <div class='select_oilCu' v-show='select_oilBox'>
                      <div class='select_title'>
                        查找原油：<Input v-model="search_oilsName" size='small' placeholder="拼音/名称" style="width: 200px;margin-right:10px"/>
                        <Button type="primary" size='small' style="margin-right:10px;height:23.3px" @click.native='search_oil'>确定</Button>
                        <Button type="error" size='small' @click.native='hide_Selectbox'>关闭</Button>
                        <Table border ref="selection" size='small' class='select_table' :columns="columns5" :data="data5" width='410px' height='270' @on-selection-change='check_plan_oil'></Table>
                      </div>
                    </div>
                  </p>
                  <p style='margin-bottom:24px'>
                    <span> 输油量：&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;<Input v-model="addPlanParams.oilTransportationVolume" style="width: 216px" class='gw dw'> <span slot="append">万吨</span></Input></span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; H2S气含量：&nbsp;<Input v-model="addPlanParams.h2sGas" style="width: 216px" class='gw dw'> <span slot="append">ppm</span></Input></span>
                  </p>
                  <p style='margin-bottom:24px'>
                    <span> 硫含量：&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;<Input v-model="addPlanParams.sulfur" style="width: 216px" class='gw dw'> <span slot="append">ppm</span></Input></span>
                    <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; H2S液含量：<Input v-model="addPlanParams.h2sLiquid" style="width: 216px" class='gw dw'> <span slot="append">ppm</span></Input></span>
                  </p>
                  <!-- <p style='margin-bottom:24px'>
                    <span> 源输油站：&nbsp;&nbsp;<Input v-model="addPlanParams.sulfur" style="width: 216px" /></span>
                    <span> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; 目的输油站：&nbsp; <Input v-model="addPlanParams.sulfur" style="width: 216px" /></span>
                  </p> -->
                  
                  <p style='margin-bottom:24px'>
                    <span> 源站储罐：
                        <CheckboxGroup  v-model="storageTankStartName" @on-change="check_start">
                            <Checkbox v-for='(item,index) in start_cg' :key='index' :label='item'></Checkbox>
                        </CheckboxGroup>
                    </span>
                  </p>
                  <p style='margin-bottom:24px'>
                    <span> 目的站储罐：
                      <CheckboxGroup  v-model="storageTankEndName" @on-change="check_end">
                         <Checkbox v-for='(item,index) in end_cg' :key='index' :label='item'></Checkbox>
                      </CheckboxGroup>
                    </span>
                  </p>
                  <p style='margin-bottom:10px;text-align:center'>
                    <Button type="primary" style='width:145px;height:36px;' @click='addPlanOk'>提交</Button> 
                  </p>  
                </div>
            </Modal>
              <!-- 修改计划模态框 -->
            <Modal
                title="修改计划"
                v-model="showUpdatePlanModel"
                class="vertical-center-modal" width='660'>
                <div class='update_table'>
                   <p style='margin-bottom:24px;position:relative'>
                    <span>原油名称：&nbsp;&nbsp;
                      <Input style="width: 548px!important;margin-left:0px;" v-model="update_plan_data.oilsName" @on-focus='show_Selectbox'></Input>
                    </span>
                    <!--选择原油-->
                    <div class='select_oilCu' v-show='select_oilBox'>
                      <div class='select_title'>
                        查找原油：<Input v-model="search_oilsName" size='small' placeholder="拼音/名称" style="width: 200px;margin-right:10px"/>
                        <Button type="primary" size='small' style="margin-right:10px;height:23.3px" @click.native='search_oil'>确定</Button>
                        <Button type="error" size='small' @click.native='hide_Selectbox'>关闭</Button>
                        <Table border ref="selection" size='small' class='select_table' :columns="columns5" :data="data5" width='410px' height='270' @on-selection-change='check_plan_oil'></Table>
                      </div>
                    </div>
                  </p>
                  <p style='margin-bottom:24px'>
                    <span> 硫含量：&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;<Input v-model="update_plan_data.sulfur" style="width: 216px" class='gw dw'> <span slot="append">ppm</span></Input></span>
                    <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; H2S液含量：<Input v-model="update_plan_data.h2sLiquid" style="width: 216px" class='gw dw'> <span slot="append">ppm</span></Input></span>
                  </p>
                  <p style='margin-bottom:24px'>
                    <span> 输油量：&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;<Input v-model="update_plan_data.oilTransportationVolume" style="width: 216px" class='gw dw'> <span slot="append">万吨</span></Input></span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; H2S气含量：&nbsp;<Input v-model="update_plan_data.h2sGas" style="width: 216px" class='gw dw'> <span slot="append">ppm</span></Input></span>
                  </p>
                  <p style='margin-bottom:24px'>
                    <span> 源站储罐：
                        <CheckboxGroup v-model="update_plan_data.storageTankStartName" @on-change="check_start">
                            <Checkbox v-for='(item,index) in start_cg' :key='index' :label='item'></Checkbox>
                        </CheckboxGroup>
                    </span>
                  </p>
                   <p style='margin-bottom:24px'>
                    <span> 目的站储罐：
                      <CheckboxGroup v-model="update_plan_data.storageTankEndName" @on-change="check_end">
                         <Checkbox v-for='(item,index) in end_cg' :key='index' :label='item'></Checkbox>
                      </CheckboxGroup>
                    </span>
                  </p>
                  <p style='margin-bottom:10px;text-align:center'>
                    <Button type="primary" style='width:145px;height:36px;' @click='updatePlanOk'>提交</Button> 
                  </p>  
                </div>
            </Modal>
          </div>
          <!-- 卸油计划 -->
          <div v-show='did'>
            <div class='select_box2'>
              <span class='updateCg' @click='addDid'>
                <img src="../../assets/icon_xinjian.png" alt="">
                新建计划
              </span>
              <span class='updateCg' @click='updateDid'>
                <img src="../../assets/icon_nor_xiugai.png" alt="">
                修改计划
              </span>
              <span class='updateCg' @click='deleteDid'>
                <el-button type="text" style='color:#000;font-weight:normal'><img src="../../assets/icon_shanchu.png" alt="">
                删除计划</el-button>
              </span>
            </div>
            <Table ref="selection"  @on-selection-change='did_selectItem' :columns="columns3" :data="data3"></Table>
            <Page :total="did_totalData" @on-change='changePageNum_did' show-total />
            <!-- 新建计划模态框 -->
            <Modal
                title="新建计划"
                v-model="showAddDidModel"
                class="vertical-center-modal" width='660'>
                 <div class='update_table'>
                  <p style='margin-bottom:24px;position:relative'>
                    <span>原油名称：&nbsp;&nbsp;
                      <Input style="width: 548px!important;margin-left:0px;" v-model="add_did_oilsName" @on-focus='show_Selectbox'></Input>
                    </span>
                    <!--选择原油-->
                    <div class='select_oilCu' v-show='select_oilBox'>
                      <div class='select_title'>
                        查找原油：<Input v-model="search_oilsName" size='small' placeholder="拼音/名称" style="width: 200px;margin-right:10px"/>
                        <Button type="primary" size='small' style="margin-right:10px;height:23.3px" @click.native='search_oil'>确定</Button>
                        <Button type="error" size='small' @click.native='hide_Selectbox'>关闭</Button>
                        <Table border ref="selection" size='small' class='select_table' :columns="columns5" :data="data5" width='410px' height='270' @on-selection-change='check_did_oil'></Table>
                      </div>
                    </div>
                  </p>
                  <p style='margin-bottom:24px'>
                    <span> 输油量：&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;<Input v-model="addDidParams.oilTransportationVolume" style="width: 216px" class='gw dw'> <span slot="append">万吨</span></Input></span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; H2S气含量：&nbsp;<Input v-model="addDidParams.h2sGas" style="width: 216px" class='gw dw'> <span slot="append">ppm</span></Input></span>
                  </p>
                  <p style='margin-bottom:24px'>
                    <span> 硫含量：&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;<Input v-model="addDidParams.sulfur" style="width: 216px" class='gw dw'> <span slot="append">ppm</span></Input></span>
                    <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; H2S液含量：<Input v-model="addDidParams.h2sLiquid" style="width: 216px" class='gw dw'> <span slot="append">ppm</span></Input></span>
                  </p>
                  <!-- <p style='margin-bottom:24px'>
                    <span> 源输油站：&nbsp;&nbsp;<Input v-model="addPlanParams.sulfur" style="width: 216px" /></span>
                    <span> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; 目的输油站：&nbsp; <Input v-model="addPlanParams.sulfur" style="width: 216px" /></span>
                  </p> -->
                  
                  <p style='margin-bottom:24px'>
                    <span> 源站储罐：
                        <CheckboxGroup  v-model="addDidParams.starttankarray" @on-change="check_start">
                            <Checkbox v-for='(item,index) in start_cg' :key='index' :label='item'></Checkbox>
                        </CheckboxGroup>
                    </span>
                  </p>
                  <p style='margin-bottom:24px'>
                    <span> 目的站储罐：
                      <CheckboxGroup  v-model="addDidParams.endtankarray" @on-change="check_start">
                         <Checkbox v-for='(item,index) in end_cg' :key='index' :label='item'></Checkbox>
                      </CheckboxGroup>
                    </span>
                  </p>
                  <p style='margin-bottom:10px;text-align:center'>
                    <Button type="primary" style='width:145px;height:36px;' @click='addDidOk'>提交</Button> 
                  </p>  
                </div>
            </Modal>
            <!-- 修改计划模态框 -->
            <Modal
                title="新建计划"
                v-model="showUpdateDidModel"
                class="vertical-center-modal" width='660'>
                  <div class='update_table'>
                   <p style='margin-bottom:24px;position:relative'>
                    <span>原油名称：&nbsp;&nbsp;
                      <Input style="width: 548px!important;margin-left:0px;" v-model="update_did_oilsName" @on-focus='show_Selectbox'></Input>
                    </span>
                    <!--选择原油-->
                    <div class='select_oilCu' v-show='select_oilBox'>
                      <div class='select_title'>
                        查找原油：<Input v-model="search_oilsName" size='small' placeholder="拼音/名称" style="width: 200px;margin-right:10px"/>
                        <Button type="primary" size='small' style="margin-right:10px;height:23.3px" @click.native='search_oil'>确定</Button>
                        <Button type="error" size='small' @click.native='hide_Selectbox'>关闭</Button>
                        <Table border ref="selection" size='small' class='select_table' :columns="columns5" :data="data5" width='410px' height='270' @on-selection-change='check_did_oil'></Table>
                      </div>
                    </div>
                  </p>
                  <p style='margin-bottom:24px'>
                    <span> 硫含量：&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;<Input v-model="updateDidParams.sulfur" style="width: 216px" class='gw dw'> <span slot="append">ppm</span></Input></span>
                    <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; H2S液含量：<Input v-model="updateDidParams.h2sLiquid" style="width: 216px" class='gw dw'> <span slot="append">ppm</span></Input></span>
                  </p>
                  <!-- <p style='margin-bottom:24px'>
                    <span> 源输油站：&nbsp;&nbsp;<Input v-model="updateDidParams.sulfur" style="width: 216px" /></span>
                    <span> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; 目的输油站：&nbsp; <Input v-model="updateDidParams.sulfur" style="width: 216px" /></span>
                  </p> -->
                  <p style='margin-bottom:24px'>
                    <span> 输油量：&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;<Input v-model="updateDidParams.oilTransportationVolume" style="width: 216px" class='gw dw'> <span slot="append">万吨</span></Input></span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; H2S气含量：&nbsp;<Input v-model="updateDidParams.h2sGas" style="width: 216px" class='gw dw'> <span slot="append">ppm</span></Input></span>
                  </p>
                   <p style='margin-bottom:24px'>
                    <span> 源站储罐：
                        <CheckboxGroup  v-model="updateDidParams.storageTankStartName" @on-change="check_start">
                            <Checkbox v-for='item in start_cg' :key='item' :label='item'></Checkbox>
                        </CheckboxGroup>
                    </span>
                  </p>
                  <p style='margin-bottom:24px'>
                    <span> 目的站储罐：
                      <CheckboxGroup  v-model="updateDidParams.storageTankEndName" @on-change="check_start">
                         <Checkbox v-for='item in end_cg' :key='item' :label='item'></Checkbox>
                      </CheckboxGroup>
                    </span>
                  </p>
                  <p style='margin-bottom:10px;text-align:center'>
                    <Button type="primary" style='width:145px;height:36px;' @click='updateDidOk'>提交</Button> 
                  </p>  
                </div>
            </Modal>
          </div>
          <!-- 未选中行时模态框 -->
          <Modal v-model="errorModal">
              <Icon type="md-close-circle" style='font-size:30px;margin-right:20px;color:#E6A23C'/>
              <span  style='font-size:16px'>请选择要操作的数据</span>
          </Modal>
        </Card>
    </div>
</template>
<script>
    import TraceWork from './TraceWork.vue'
    import {line,ryxInfo,tsxInfo,cjInfo,asInfo,czdInfo,dxdInfo,sbqInfo,bswInfo,lnxInfo,ycxInfo,ycfxInfo,
       tyLineInfo,dhfxLineInfo,lsLineInfo} from './api.js'
    import Qs from 'qs'
    export default {
        data(){
          return {
            value:'',search_oilsName:'',page_num_plan:1,page_num_did:1,page_num_now:1,
            gz_xz:'',gz_type:'',gz_wave: 10,content_not_null:true,content_null:false,gz_data:{},working_data:{},select_oilBox:false,
            showAddPlanModel:false,u:'',showDeletePlan:false,showAddDidModel:false,showUpdateDidModel:false,selectTime:'',pageSize:10,
            zdTime:['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00'],
            theme1: 'light',model1: '',doing:true,planing:false,did:false,
            cz1:require('../../assets/btn_nor_zhiding.png'),cz2:require('../../assets/btn_nor_syi.png'),
            cz3:require('../../assets/btn_nor_xyi.png'),cz4:require('../../assets/btn_nor_zhidi.png'),
            cz5:require('../../assets/btn_dis_zhiding.png'),cz6:require('../../assets/btn_dis_syi.png'),
            cz7:require('../../assets/btn_dis_xyi.png'),cz8:require('../../assets/btn_dis_zhiding.png'),
            searchDate:'',
            select_tube:[],tube_id:'',oilList:[],data1_total:0,
            tube_name:'日仪线',showDoingDetails:false,planing_item:[],did_item:[],errorModal:false,did_totalData:0,plan_totalData:0,
            select_gz:[ '物性跟踪','名称跟踪'],select_density:['密度跟踪','粘度跟踪'],select_percent:['10%'],style:'',menu_card:['正在执行','输油计划','卸油计划'],current:0,
            cz:require('../../assets/btn_nor_xqing.png'),single:'',showUpdatePlanModel:false,showError:false,def:'',hide:false,
            start_cg:[],//源站储罐
            end_cg:[],//目的站储罐
            storageTankEndName:[],
            storageTankStartName:[],
            percent:'',
            percentArr:[],
            //planing模态框参数
            start_station:[1,2,3],add_oilsName:'',add_oilsId:[],update_oilsName:'',update_oilsId:[],delete_planId:[],position_sort:"",
            end_station:[1,2,3],add_did_oilsName:'',update_did_oilsName:'',
            addPlanParams:{"oilsName":[],"h2sGas":"","h2sLiquid":"","sulfur":"","oilTransportationVolume":"","starttankarray":[],"endtankarray":[]},
            update_plan_data:{},
            //did模态框参数
            delete_did_planId:[],did_order:"",
            addDidParams:{"oilsName":[],"h2sGas":"","h2sLiquid":"","sulfur":"","oilTransportationVolume":"","starttankarray":[],"endtankarray":[]},
            updateDidParams:{"oilsName":[],"h2sGas":"","h2sLiquid":"","sulfur":"","oilTransportationVolume":"","starttankarray":[],"endtankarray":[]},
            columns1:[
              {
                  title: '计划类型',
                  key: 'establishState'
              }, 
              {
                  title: '输油油罐',
                  key: 'storageTankStartName'
              },
              {
                  title: '收油油罐',
                  key: 'storageTankEndName'
              },
              {
                  title: '油种',
                  key: 'oilsName'
              },
              {
                  title: '计划量（万吨）',
                  key: 'oilTransportationVolume'
              }, 
               {
                  title: '已输量（万吨）',
                  key: 'throughput'
              }, 
              {
                  title: '管存量（万吨）',
                  key: 'oilAmout'
              },
              {
                  title: '剩余时间（小时）',
                  key: 'remainingTime'
              },
              {
                  title: '混油长度（米）',
                  key: 'mixingLength'
              },
              {
                  title: '操作',
                  key: 'cz',
                  render: (h, params) => {
                        return h('img',{
                            attrs:{
                                src:this.cz,style:"width:20px;height:19px;"
                            },
                            on: {
                                click: () => {
                                    this.showDoingDetails=true
                                    this.working_data=params.row
                                }
                            }
                        });
                  }
              }, 
            ],data1:[],
            columns2:[
              {
                type: 'selection',
                width:60
              },
              {
                  title: '序号',
                  width:60,
                  key: 'sort',
                  type: 'index',
              },
              {
                  title: '管线名称',
                  key: 'lineName',
                  render:(h, params) => {
                    return h('span',{},this.tube_name)
                  }
              }, 
              {
                  title: '计划输油量（万吨）',
                  key: 'oilTransportationVolume'
              },
              {
                  title: '输油油罐',
                  key: 'storageTankStartName'
              },
              {
                  title: '油种',
                  key: 'oilsName'
              },
              {
                  title: '收油油罐',
                  key: 'storageTankEndName'
              },
              {
                  title: '状态',
                  align: 'center',
                  key: 'implementState',
                  render: (h, params) => {
                    var text=params.row.planType==1?'未执行':params.row.planType==2?'正在执行':'已完成'
                    return h('span',{
                    },text)
                  }
              }  ,
              {
                  title: '操作',
                  key: 'cz',
                  render: (h, params) => {
                     
                        return h('div',[
                          h('img',{
                            attrs:{
                                src:this.cz1,style:"width:15px;height:16px;margin-right:10px"
                            },
                            on: {
                                click: () => {
                                  this.position_sort="uppermost"
                                  this.changeSort(params.row.planId)
                                }
                            }
                          }),
                          h('img',{
                            attrs:{
                                src:this.cz2,style:"width:15px;height:16px;margin-right:10px"
                            },
                            on: {
                                click: () => {
                                  this.position_sort="up"
                                  this.changeSort(params.row.planId)
                                }
                            }
                          }),
                          h('img',{
                            attrs:{
                                src:this.cz3,style:"width:15px;height:16px;margin-right:10px"
                            },
                            on: {
                                click: () => {
                                  this.position_sort="down"
                                  this.changeSort(params.row.planId)
                                }
                            }
                          }),
                          h('img',{
                            attrs:{
                                src:this.cz4,style:"width:15px;height:16px;margin-right:10px"
                            },
                            on: {
                                click: () => {
                                  this.position_sort="bottom"
                                  this.changeSort(params.row.planId)
                                }
                            }
                          })
                        ]);
                  } 
              }, 
            ],data2:[{}],
             columns3:[
              {
                type: 'selection',
                width:60
              },
              {
                  title: '序号',
                  key: 'storageTankName'
              },
              {
                  title: '计划输油量（万吨）',
                  key: 'oilStation'
              }, 
              {
                  title: '油种',
                  key: 'type'
              },
              {
                  title: '收油油罐',
                  key: 'securityLevelMin'
              },
              {
                  title: '状态',
                  align: 'center',
                  key: 'remarks',
                  render: (h, params) => {
                    var text=params.row.planType==1?'未执行':params.row.planType==2?'正在执行':'已完成'
                    return h('span',{
                    },text)
                  }
              },
              {
              title: '操作',
              key: 'cz',
              render: (h, params) => {
                  return h('div',[
                    h('img',{
                      attrs:{
                          src:this.cz5,style:"width:15px;height:16px;margin-right:10px"
                      },
                      on: {
                          click: () => {
                              this.position_sort="uppermost"
                              this.changeDidOrder(params.row.planId)
                          }
                      }
                    }),
                    h('img',{
                      attrs:{
                          src:this.cz6,style:"width:15px;height:16px;margin-right:10px"
                      },
                      on: {
                          click: () => {
                              this.position_sort="up"
                              this.changeDidOrder(params.row.planId)
                          }
                      }
                    }),
                      h('img',{
                      attrs:{
                          src:this.cz7,style:"width:15px;height:16px;margin-right:10px"
                      },
                      on: {
                          click: () => {
                                this.position_sort="down"
                              this.changeDidOrder(params.row.planId)
                          }
                      }
                    }),
                      h('img',{
                      attrs:{
                          src:this.cz8,style:"width:15px;height:16px;margin-right:10px"
                      },
                      on: {
                          click: () => {
                              this.position_sort="bottom"
                              this.changeDidOrder(params.row.planId)
                          }
                      }
                    })
                  ]);
                } 
              }, 
            ],data3:[{}],
            columns5: [
                    {
                        type: 'selection',
                        title:'选择',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '原油名称',
                        key: 'oilName'
                    },
                    {
                        title: '占比（%）',
                        key: 'percent',
                        render: (h, params) => {
                            return h('input',{
                              props:{
                                value:this.percent
                              },
                              on:{
                                input:(e)=>{
                                  this.percent =e.target.value
                                  params.row.percent=e.target.value
                                  this.data5[params.index]=params.row
                                }
                              }
                            })     
                        }
                    },
            ],data5:[]
          }
        },
        components:{
          TraceWork
        },
        mounted(){
          //管线列表
          line().then(res=>{
            this.select_tube=res.data.data
          })
          this.search_oil()
          this.ryLine()
          this.getDidList()
          this.getPlanList()
        },
       methods:{
          //原油的模糊查询
          search_oil(){
            this.axios.post('/OilTrack/oilsinfo/listlike',Qs.stringify({oilsName:this.search_oilsName})).then(res=>{
              this.oilList=res.data.data
              this.data5=res.data.data
            })
          },     
          //默认日仪线
          ryLine(){
              ryxInfo().then(res=>{
                var plan=res.data.plan[0];
                this.data1=plan;  
                this.tube_id=res.data.line[0].configureId               
                this.end_cg=res.data.yizheng[0][0].station.map(function (item){return item.storageTankName});
                this.start_cg=res.data.rizhao[0][0].station.map(function (item){return item.storageTankName});
              })
          },
          //显示原油选择框
          show_Selectbox(){
            this.select_oilBox=true
          },
          hide_Selectbox(){
            this.select_oilBox=false
          },
          //选择管线
          sel_tube(e){
            this.tube_name=e.split(' ')[0]
            switch(this.tube_name){
              case '日仪线':
                ryxInfo().then(res=>{
                  this.gz_data=res.data
                  var plan=res.data.plan[0];
                  this.data1=plan;  
                  this.tube_id=res.data.line[0].configureId  
                })
                break;
              case '天石线':
                tsxInfo().then(res=>{
                  this.gz_data=res.data
                  var plan=res.data.plan[0];
                  this.data1=plan;     
                  this.tube_id=res.data.line[0].configureId       
                })
                break;
              case '曹津线':
                cjInfo().then(res=>{
                  this.gz_data=res.data
                  var plan=res.data.plan[0];
                  this.data1=plan;          
                  this.tube_id=res.data.line[0].configureId   
                })
                break;
              case '岙山线':
                asInfo().then(res=>{
                  this.gz_data=res.data
                  var plan=res.data.plan[0];
                  this.data1=plan;      
                  this.tube_id=res.data.line[0].configureId       
                })
                break;
              case '册子岛线':
                czdInfo().then(res=>{
                  this.gz_data=res.data
                  var plan=res.data.plan[0];
                  this.data1=plan;      
                  this.tube_id=res.data.line[0].configureId       
                })
                break;
              case '大榭岛线':
                dxdInfo().then(res=>{
                  this.gz_data=res.data
                  var plan=res.data.plan[0];
                  this.data1=plan;    
                  this.tube_id=res.data.line[0].configureId         
                })
                break;
              case '石埠桥线':
                sbqInfo().then(res=>{
                  this.gz_data=res.data
                  var plan=res.data.plan[0];
                  this.data1=plan;         
                  this.tube_id=res.data.line[0].configureId    
                })
                break;
              case '白沙湾线':
                bswInfo().then(res=>{
                  this.gz_data=res.data
                  var plan=res.data.plan[0];
                  this.data1=plan;       
                  this.tube_id=res.data.line[0].configureId      
                })
                break;
              case '鲁宁线':
                lnxInfo().then(res=>{
                  this.gz_data=res.data
                  var plan=res.data.plan[0];
                  this.data1=plan;        
                  this.tube_id=res.data.line[0].configureId     
                })
                break;
              case '仪长线':
                ycxInfo().then(res=>{
                  this.gz_data=res.data
                  var plan=res.data.plan[0];
                  this.data1=plan;       
                  this.tube_id=res.data.line[0].configureId      
                })
                break;
              case '仪长复线':
                ycfxInfo().then(res=>{
                  this.gz_data=res.data
                  var plan=res.data.plan[0];
                  this.data1=plan;           
                  this.tube_id=res.data.line[0].configureId  
                })
                break;
              case '塘燕复线':
                tyLineInfo().then(res=>{
                  this.gz_data=res.data
                  var plan=res.data.plan[0];
                  this.data1=plan;           
                  this.tube_id=res.data.line[0].configureId  
                })
                break;
              case '东黄复线':
                dhfxLineInfo().then(res=>{
                  this.gz_data=res.data
                  var plan=res.data.plan[0];
                  this.data1=plan;           
                  this.tube_id=res.data.line[0].configureId  
                })
                break;
              case '岚山线':
                lsLineInfo().then(res=>{
                  this.gz_data=res.data
                  var plan=res.data.plan[0];
                  this.data1=plan;           
                  this.tube_id=res.data.line[0].configureId  
                })
                break;
              default:
                break;
            }
          },
          //搜索历史
          search_history(){
            //this.searchDate
            //this.selectTime
          },
          //取消搜索
          cancle_search(){
            this.hide=false
          },
          changeStyle(index){      
              this.current=index; 
              if(index==0){
                this.doing=true;this.planing=false;this.did=false
              }
              else if(index==1){
                this.doing=false;this.planing=true;this.did=false
              }
              else if(index==2){
                this.doing=false;this.planing=false;this.did=true
              }
          },
          showCheckHistory(){
            this.hide=!this.hide
          },
          hideCheckHistory(){
            this.hide='display:none'
          },   
          //岙山线
          search_tube(){
            if(this.tube_name=='岙山线'){
              if(this.gz_type=='物性跟踪'){
                if(this.gz_xz=='密度跟踪'){var typeId=1}
                else if(this.gz_xz=='粘度跟踪'){var typeId=2}
                this.axios.post("/OilTrack/asToczd/propertyTrack",Qs.stringify({type:typeId,wave:this.gz_wave})).then(res=>{
                  console.log(res.data)
                })
              }
            }else{
              this.content_null=true;
              this.content_not_null=false;
            }
          },
           //=========================正在执行=================================
          //正在执行分页
          changePageNum_now(index){
            this.page_num_now=index;
          },
          //=========================输油计划=================================
          //获取输油计划列表
          getPlanList(){
            this.axios.post('/OilTrack/transportationPlan/list',Qs.stringify({page:this.page_num_plan,rows:10,configureId:this.tube_id})).then(res=>{
              this.data2=res.data.data
              this.plan_totalData=res.data.total
              console.log(res.data.data)
            }) 
          },
          //输油计划调整顺序
          changeSort(id){
            this.axios.post('/OilTrack/transportationPlan/sort',Qs.stringify({sortState:this.position_sort,planId:id,configureId:this.tube_id})).then(res=>{
              this.getPlanList()
            })
          },
          //选择油品
          check_plan_oil(e){
            if(e.length>0){
              this.add_oilsName=[]
              this.add_oilsId=[]
              this.update_oilsId=[]
              this.update_oilsName=[]
              for(var i=0;i<e.length;i++){
                this.add_oilsName+=`${e[i].oilName}:${e[i].percent};`
                this.add_oilsId+=`${e[i].oilId},`
                this.update_oilsName+=`${e[i].oilName}:${e[i].percent};`
                this.update_oilsId+=`${e[i].oilId},`
              }
            }
          },
          //输油计划复选框
          planing_selectItem(e){
            this.delete_planId=[]
            if(e.length>0){
              this.planing_item=e
              let id=e[0].planId
              this.axios.post('/OilTrack/transportationPlan/oneplan',Qs.stringify({planId:id})).then(res=>{
                 this.update_plan_data=res.data.data
                 console.log(res,2222)
                 if(this.update_plan_data.storageTankEndName!==null && this.update_plan_data.storageTankEndName.indexOf(",")==-1){
                    this.update_plan_data.storageTankEndName=this.update_plan_data.storageTankEndName.split(" ")
                 }else{
                    this.update_plan_data.storageTankEndName=this.update_plan_data.storageTankEndName.split(",")
                 }
                 if(this.update_plan_data.storageTankStartName!==null && this.update_plan_data.storageTankStartName.indexOf(",")==-1){
                    this.update_plan_data.storageTankStartName=this.update_plan_data.storageTankStartName.split(" ")
                 }else{
                    this.update_plan_data.storageTankStartName=this.update_plan_data.storageTankStartName.split(",")
                 }
              })
              for(var i=0;i<e.length;i++){
                this.delete_planId.push(e[i].planId)
              }
            }
           
          },
          //原站储罐复选框
          check_start(e){
            this.storageTankStartName=e
          },
          check_end(e){
            this.storageTankEndName=e
          },
          //新建输油计划
          addPlan(){
            this.showAddPlanModel=true;
          },
          addPlanOk(){
            let oilsName=this.add_oilsName.slice(0,this.add_oilsName.length-1).split(';')
            let oilsId=this.add_oilsId.slice(0,this.add_oilsId.length-1).split(',') 
            let data={configureId:this.tube_id,
            oilsId:oilsId,oilTransportationVolume:this.addPlanParams.oilTransportationVolume,
            storageTankEndName:this.storageTankEndName,storageTankStartName:this.storageTankStartName,
            sulfur:this.addPlanParams.sulfur,h2sGas:this.addPlanParams.h2sGas,
            h2sLiquid:this.addPlanParams.h2sLiquid,oilsName:oilsName}
            this.axios.post('/OilTrack/transportationPlan/insert',Qs.stringify(data,{ indices: false})).then(res=>{
              this.showAddPlanModel=false;
              this.getPlanList()
            })
          },
          //修改输油计划
          updatePlan(){
            if(this.planing_item.length===0) this.errorModal=true
            else this.showUpdatePlanModel=true;  
          },
          updatePlanOk(){
            if(this.update_oilsName!==null &&this.update_oilsId!==null){
              let oilsName=this.update_oilsName.slice(0,this.update_oilsName.length-1).split(';')
              let oilsId=this.update_oilsId.slice(0,this.update_oilsId.length-1).split(',') 
            }
            let data={configureId:this.tube_id,
            oilsId:oilsId,oilTransportationVolume:this.update_plan_data.oilTransportationVolume,
            storageTankEndName:this.update_plan_data.storageTankEndName,storageTankStartName:this.update_plan_data.storageTankStartName,
            sulfur:this.update_plan_data.sulfur,h2sGas:this.update_plan_data.h2sGas,
            h2sLiquid:this.update_plan_data.h2sLiquid,oilsName:oilsName}
            this.axios.post('/OilTrack/transportationPlan/update',Qs.stringify(data,{arrayFormat: 'repeat'})).then(res=>{
              this.showAddPlanModel=false;
              this.getPlanList()
            })
          },
          //删除输油计划
          deletePlan() {
            if(this.planing_item.length===0) this.errorModal=true;
            else{
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
                this.axios.post("/OilTrack/transportationPlan/delete",Qs.stringify({planId:this.delete_planId},{ indices: false})).then(res=>{
                  this.getPlanList()
                })
               
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              });
            }
          },
          //分页
          changePageNum_plan(index){
            this.page_num_plan=index;
            this.getPlanList()
          },
          //=========================卸油计划=================================
          //获取卸油计划列表
          getDidList(){
            this.axios.post('/OilTrack/unloadingOilPlan/list',{page:this.page_num_did,rows:10,lineId:this.tube_id}).then(res=>{
              this.data3=res.data.data
              this.did_totalData=res.data.total
            })   
          },
          //更改卸油计划列表
          changeDidOrder(id){
            this.axios.post('/OilTrack/unloadingOilPlan/sort',Qs.stringify({sortState:this.did_order,planId:id,lineId:this.tube_id})).then(res=>{
              this.getDidList()
            })
          },
          //选择油品
          check_did_oil(e){
            if(e.length>0){
              this.add_did_oilsName=[]
              this.add_did_oilsId=[]
              this.update_did_oilsName=[]
              this.update_did_oilsId=[]
              for(var i=0;i<e.length;i++){
                this.add_did_oilsName+=`${e[i].oilName}:${e[i].percent};`
                this.add_did_oilsId+=`${e[i].oilId},`
                this.update_did_oilsName+=`${e[i].oilName}:${e[i].percent};`
                this.update_did_oilsId+=`${e[i].oilId},`
              }
            }
          },
          //卸油计划复选框
          did_selectItem(e){
            this.did_item=e
            this.delete_did_planId=[]
            if(e.length>0){
              this.updateDidParams=e[0]
              this.axios.post('/OilTrack/unloadingOilPlan/oneplan',Qs.stringify({planId:this.updateDidParams.planId})).then(res=>{
                console.log(res.data.data)
                 this.updateDidParams=res.data.data
                 if(this.updateDidParams.storageTankEndName.indexOf(",")==-1){
                    this.updateDidParams.storageTankEndName=this.updateDidParams.storageTankEndName.split(" ")
                 }else{
                   this.updateDidParams.storageTankEndName=this.updateDidParams.storageTankEndName.split(",")
                 }
                 if(this.updateDidParams.storageTankStartName.indexOf(",")==-1){
                    this.updateDidParams.storageTankStartName=this.updateDidParams.storageTankStartName.split(" ")
                 }else{
                    this.updateDidParams.storageTankStartName=this.updateDidParams.storageTankStartName.split(",")
                 }
              })   
              for(var i=0;i<e.length;i++){
                this.delete_did_planId.push(e[i].planId)
              }
            }
          },
          //新建卸油计划
          addDid(){
            this.showAddDidModel=true;
          },
          addDidOk(){
            let oilsName=this.add_did_oilsName.slice(0,this.add_did_oilsName.length-1).split(';')
            let oilsId=this.add_did_oilsId.slice(0,this.add_did_oilsId.length-1).split(',') 
             let data={configureId:this.tube_id,
             oilsId:oilsId,oilTransportationVolume:this.addDidParams.oilTransportationVolume,
             storageTankEndName:this.storageTankEndName,storageTankStartName:this.storageTankStartName,
             sulfur:this.addDidParams.sulfur,h2sGas:this.addDidParams.h2sGas,
             h2sLiquid:this.addDidParams.h2sLiquid,oilsName:oilsName}
             this.axios.post('/OilTrack/unloadingOilPlan/insert',Qs.stringify(data,{arrayFormat: 'repeat'})).then(res=>{
               this.showAddDidModel=false;
                this.getDidList()
             })
          },
          //修改卸油计划
          updateDid(){
            if(this.did_item.length===0) this.errorModal=true
            else this.showUpdateDidModel=true;  
          },
          updateDidOk(){
            let oilsName=this.update_did_oilsName.slice(0,this.update_did_oilsName.length-1).split(';')
            let oilsId=this.update_did_oilsId.slice(0,this.update_did_oilsId.length-1).split(',') 
            let data={configureId:this.tube_id,
             oilsId:oilsId,oilTransportationVolume:this.updateDidParams.oilTransportationVolume,
             storageTankEndName:this.updateDidParams.storageTankEndName,storageTankStartName:this.updateDidParams.storageTankStartName,
             sulfur:this.updateDidParams.sulfur,h2sGas:this.updateDidParams.h2sGas,
             h2sLiquid:this.updateDidParams.h2sLiquid,oilsName:oilsName}
             this.axios.post('/OilTrack/unloadingOilPlan/update',Qs.stringify(data,{arrayFormat: 'repeat'})).then(res=>{
               this.showUpdateDidModel=false;
                this.getDidList()
             })
          },
          //删除卸油计划
          deleteDid(){
            if(this.did_item.length===0) {this.errorModal=true; }
            else{
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
                this.axios.post("/OilTrack/unloadingOilPlan/delete",Qs.stringify({planId:this.delete_did_planId},{arrayFormat: 'repeat'})).then(res=>{
                  this.getDidList()
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              });
            }
          },
          //分页
          changePageNum_did(index){
           this.page_num_did=index;
           this.getDidList()
          },
       }
    }
</script>
<style lang="stylus">
  .ivu-input
  .ivu-input-group-append
  .ivu-input-group-prepend
  .ivu-select-selection
    border-radius 0px
</style>

<style lang="stylus">
  .ivu-modal-header-inner
    color #fff
  .detail_table
    width 350px
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
  .ivu-modal-header
    color #fff
    background #3D7AD5
  .ivu-page
    float right
    margin-top 10px
  .ivu-checkbox-group
    display inline-block
</style>

<style lang="stylus" scoped>
    .select_oilCu
      width 400px
      height 320px 
      padding 5px
      position absolute
      z-index 11
      top 103px
      left 83px
      background #eee
      border 2px solid #eee
      .select_table
        margin-top 10px
    .ivu-input-number
      border-radius 0!important
      margin-top -4px
      height 31px
    .check_history
      width 337px
      height 170px
      padding 20px
      border 1px solid #eee
      position absolute
      right 17px
      z-index 6
      top 51px
      box-shadow: 0px 0px 0px 1px #eee;
      background #fff
      //display none
      p
        margin-bottom 10px
    .ivu-modal-footer
      display none !important
    .select_box2
      text-align left
      height 40px
      margin-left 10px
      span
        margin-right 50px
    .layout
       border 1px solid #d7dde4
        background #f5f7f9
        position relative
        border-radius 4px
        overflow hidden
    .ivu-menu-item
      font-size 16px 
    .ivu-dropdown-rel
      a
        color rgba(255,255,255,.7)
        font-size 16px
    .ivu-menu-horizontal 
      .ivu-menu-item
        padding 0 10px !important
    .check_history
      .ivu-btn-primary
        background #D3D3D3  
    .select_box
      height 54px
    .second_menu
      padding 0 442px
      margin 0 -50px
      width 1920px
      margin-top -88px
      position fixed
      z-index 50
  
    .ivu-layout-header
        width 1920px
        height 72px
        background-color #185194!important
    .layout-footer-center
        text-align center
    
    .ivu-card-bordered
      margin-top 99px
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
    .content
      margin-top 20px
    .menu_card
      margin 0 auto 
      width 456px
      height 37px
      margin-top 26px
      margin-bottom 26px
      ul
        li
          float left
          cursor pointer
          width 152px
          height 37px
          text-align center
          box-sizing border-box
          padding-top 6px
          border 1px solid #D7D7D7
          border-left 0
          &:hover
            border 1px solid #2070D1
        li:first-child 
          border-left 1px solid #D7D7D7
          &:hover
            border-left 1px solid #2070D1
    .active
      background #2070D1
      color #fff
    .updateCg
      cursor pointer
</style>