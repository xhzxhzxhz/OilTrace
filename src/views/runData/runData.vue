
<template>
    <div style='height:890px;' class='runData'>
        <Menu mode="horizontal" :theme="theme1" active-name="1" class='second_menu'>
          <MenuItem name="2" @click.native='showGx'>
              管线数据
          </MenuItem>
          <MenuItem name="1" class='first_menu' @click.native='showCg'>
              储罐数据
          </MenuItem>
        </Menu>
        <Card>
            <div style="min-height: 200px">
                <div class='select_box'>
                    <span>
                      油站名称 
                      <Select v-model="tube_name" @on-query-change='sel_tube' style="width:200px">
                        <Option v-for="(item,index) in select_tube" :value="item.tubeName" :key='index'>{{item.tubeName}} <span style='display:none'>{{item.tubeId}}</span> </Option>
                      </Select>
                    </span>
                </div>
                <div class='content'>
                  <div v-show='show_cg'>
                    <Table :columns="columns1" :data="data1"></Table>
                    <Page :total="total1" show-total class="page2" @on-change='changePageNum_cg'/>
                  </div>
                  <div v-show='show_gx'>
                    <Table :columns="columns2" :data="data2" class='table2'></Table>
                    <Page :total="total2" show-total class="page2" @on-change='changePageNum_gx'/>
                  </div>
                </div>
            </div>
        </Card>
    </div>
</template>
<script>
    import Qs from 'qs'
    export default {
        data(){
          return {
            theme1: 'light',model1: '',show_gx:false,show_cg:true, select_tube:[],total1:0,total2:0,
            tube_name:'日仪线',cg_list:[],gx_list:[],pageSize:10,page_num_cg:1,page_num_gx:1,
             columns1: [
                    {
                        title: '储罐名称',
                        key: 'tankName'
                    },
                    {
                        title: '所属油站',
                        key: 'stationName'
                    },
                    {
                        title: '储罐液位示数',
                        key: 'liquidLevel'
                    },
                     {
                        title: '油种组成',
                        key: 'oilName'
                    },
                     {
                        title: '密度（t/m³）',
                        key: 'density'
                    },
                     {
                        title: '粘度（mPa-5）',
                        key: 'viscosity'
                    }
                ],data1: [{"viscosity":0,"density":0,"oilName":"","liquidLevel":0,"stationName":"","tankName":""}],
            columns2:[
              {
                  title: '管线名称',
                  align: 'center',
                  key: 'stationName'
              },
                {
                  title: '瞬时流量（m³/h）',
                  align: 'center',
                  key: 'instantFlow'
              }, 
              {
                  title: '累计流量（m³）',
                  align: 'center',
                  key: 'totalFlow'
              } 
            ],data2:[{"stationName":"","instantFlow":"","totalFlow":""}]
          }
        },
        mounted(){
          this.axios.post("/OilTrack/line/lines").then(res=>{
            this.select_tube=res.data.data
          })
          //获取储罐列表
          this.getCgList()
          //获取管线列表
          this.getGxList()
        },
        methods:{
          //获取储罐列表
          getCgList(){
            this.axios.post("/OilTrack/Mstation/datatank",Qs.stringify({rows:10,page:this.page_num_cg,stationName:this.tube_name})).then(res=>{
              this.total1=res.data.total
              this.data1=res.data.data
              for(var i=0;i<res.data.data.length;i++){
                this.data1[i].stationName=res.data.data[i].stationName
                this.data1[i].tankName=res.data.data[i].tankName
                this.data1[i].liquidLevel=res.data.data[i].liquidLevel
                this.data1[i].viscosity=res.data.data[i].oilsInfo!==null?res.data.data[i].oilsInfo.viscosity:''
                this.data1[i].density=res.data.data[i].oilsInfo!==null?res.data.data[i].oilsInfo.density:''
                this.data1[i].oilName=res.data.data[i].oilsInfo!==null?res.data.data[i].oilsInfo.oilName:''         
              }
           
            })
          },
          //获取管线列表
          getGxList(){
            this.axios.post("/OilTrack/Mstation/dataline",Qs.stringify({rows:10,page:this.page_num_gx,stationName:this.tube_name})).then(res=>{
              this.total2=res.data.total
              this.data2=res.data.data  
              for(var i=0;i<res.data.total;i++){
                this.data2[i].stationName=res.data.data[i].stationName
                this.data2[i].instantFlow=res.data.data[i].station[0].instantFlow
                this.data2[i].totalFlow=res.data.data[i].station[0].totalFlow
              }        
            })
          },
          showGx(){
            this.show_gx=true;
            this.show_cg=false;
          },
          showCg(){
            this.show_gx=false;
            this.show_cg=true;
          },
          sel_tube(e){
            this.tube_name=e.split(' ')[0]
            this.tubeId=e.split(' ')[1]
            this.getCgList()
            this.getGxList()

          },
          changePageNum_cg(index){
            this.page_num_cg=index;  
            this.getCgList()
          },
          changePageNum_gx(index){
            this.page_num_cg=index;  
            this.getGxList()
          }


        }
    }
</script>
<style lang="stylus">
    .table2 th
      background #2070D1!important
      color #fff
    .ivu-select-selection
      border-radius 0px
    .select_box
      margin-bottom 10px
    .ivu-table-wrapper
      margin-bottom 10px
    .page2
      float right
</style>

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