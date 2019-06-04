<template>
  <div class='traceWork'>
      <AoShan v-if="tube_name=='岙山线'" :gz_data='gz_data' :tube_name='tube_name' :gz_type='gz_type' :gz_xz='gz_type' :gz_wave='gz_type'/>
      <CeziDao  v-else-if="tube_name=='册子岛线'" :gz_data='gz_data' :tube_name='tube_name' :gz_type='gz_type' :gz_xz='gz_type' :gz_wave='gz_type'/>
      <DaXieDao v-else-if="tube_name=='大榭岛线'" :gz_data='gz_data' :tube_name='tube_name' :gz_type='gz_type' :gz_xz='gz_type' :gz_wave='gz_type'/>
      <LanShan v-else-if="tube_name=='岚山线'" :gz_data='gz_data' :tube_name='tube_name' :gz_type='gz_type' :gz_xz='gz_type' :gz_wave='gz_type'/>
      <BaiShanWan v-else-if="tube_name=='白沙湾线'" :gz_data='gz_data' :tube_name='tube_name' :gz_type='gz_type' :gz_xz='gz_type' :gz_wave='gz_type'/>
      <ShiBuQiao v-else-if="tube_name=='石埠桥线'" :gz_data='gz_data' :tube_name='tube_name' :gz_type='gz_type' :gz_xz='gz_type' :gz_wave='gz_type'/>
      <TangYan v-else-if="tube_name=='塘燕复线'" :gz_data='gz_data' :tube_name='tube_name' :gz_type='gz_type' :gz_xz='gz_type' :gz_wave='gz_type'/>
      <TianShi v-else-if="tube_name=='天石线'" :gz_data='gz_data' :tube_name='tube_name' :gz_type='gz_type' :gz_xz='gz_type' :gz_wave='gz_type'/>
      <CaoJin v-else-if="tube_name=='曹津线'" :gz_data='gz_data' :tube_name='tube_name' :gz_type='gz_type' :gz_xz='gz_type' :gz_wave='gz_type'/>
      <RiYi v-else-if="tube_name=='日仪线'" :gz_data='gz_data' :gxDetails='gxDetails' :tube_name='tube_name' :gz_type='gz_type' :gz_xz='gz_type' :gz_wave='gz_type'/>
      <DongHuang v-else-if="tube_name=='东黄复线'" :gz_data='gz_data' :tube_name='tube_name' :gz_type='gz_type' :gz_xz='gz_type' :gz_wave='gz_type'/>
      <DongLin v-else-if="tube_name=='东临复线'" :gz_data='gz_data' :tube_name='tube_name' :gz_type='gz_type' :gz_xz='gz_type' :gz_wave='gz_type'/>
      <YiChangFuXian v-else-if="tube_name=='仪长复线'" :gz_data='gz_data' :tube_name='tube_name' :gz_type='gz_type' :gz_xz='gz_type' :gz_wave='gz_type'/>
      <YiChang v-else-if="tube_name=='仪长线'" :gz_data='gz_data' :tube_name='tube_name' :gz_type='gz_type' :gz_xz='gz_type' :gz_wave='gz_type'/>
      <LuNing v-else-if="tube_name=='鲁宁线'" :gz_data='gz_data' :tube_name='tube_name' :gz_type='gz_type' :gz_xz='gz_type' :gz_wave='gz_type'/>
  </div>
</template>

<script>
  import AoShan from './yhn/aoshan.vue';
  import CeziDao from './yhn/cezidao.vue'
  import DaXieDao from './yhn/daxiedao.vue'
  import LanShan from './yhn/lanshan.vue'
  import BaiShanWan from './yhn/baishawan.vue'
  import ShiBuQiao from './yhn/shibuqiao.vue'
  import TangYan from './hb/tangyan.vue'
  import TianShi from './hb/tianshi.vue'
  import CaoJin from './hb/caojin.vue'
  import RiYi from './sd/riyi.vue'
  import DongLin from './sd/donglin.vue'
  import DongHuang from './sd/donghuang.vue'
  import YiChang from './kz/yichang.vue'
  import YiChangFuXian from './kz/yichangfuxian.vue'
  import LuNing from './kz/luning.vue'
  export default {
    name: "TraceWork",
    data(){
        return {
          ygNum:[1,2,3,4,5,6,7,8],
          middle_station:[1,2],
          gxDetails: [//管段信息
              {
                  "configureId": "",//管段信息id
                  "tubeLineId": "",//管线信息
                  "tubeLineName": "日照-仪征",//管段名称
                  "storageTankStartId": "",
                  "storageTankEndId": "",
                  "nowOil": null,
                  "throughputMin": null,
                  "throughputMax": null,
                  "flowMeter": null,
                  "cumulativeOil": null,
                  "cumulativeOilBoolean": null,
                  "remarks": null,
                  "physicalProperty": null,
                  "physicalPropertyRange": null,
                  "nowCustody": null,
                  "nextTubeId": null,
                  "segmentLength": null
              }
          ],
           gxDetails:{//输油计划跟踪
                "planId": "",//计划id
                "oilsId": " ",//油品id
                "oilsName": " ",//油品名称
                "configureId": "",//管段id
                "storageTankStartId": "",//起始站储罐id
                "storageTankEndId": null,
                "storageTankEndName": null,//收油油罐
                "storageTankStartName": "",//输油油罐
                "oilTransportationVolume": 0,//计划输油
                "startTime": null,
                "instantaneousLevel": null,
                "cumulativeOilBegin": 0,
                "implementOrder": 1,
                "implementState": 2,
                "organizationTime": null,
                "organizationUser": null,
                "modifyUser": null,
                "modifyTime": null,
                "implementUser": null,
                "implementTime": 37020000,//计划执行时间
                "storageTankState": null,
                "establishState": null,//计划状态
                "remarks": null,//备注
                "throughput": 0,//已输量
                "distance": null,//距离下一站的距离
                "remainingTime": 0,//剩余时间
                "mixingLength": null,//混油长度
                "triggerMode": null, //触发方式
                "oilAmout": null,  //管存量
                "nextTime": null,  //预计到达下一站的时间
                "fishTime": null,	//预计外输完成时间
                "oilInfo": {
                    "oilId": "76d9f33e8cb8475d83da8bc0fd2265f7",
                    "hydrogenSulfide": 5,
                    "oilName": "胜利",
                    "density": 348.82,
                    "viscosity": 925.8,
                    "site": null,
                    "sulfur": null,
                    "h2sGas": null,
                    "h2sLiquid": null,
                    "containWater": null,
                    "color": null,
                    "establishTime": null,
                    "modifyTime": null,
                    "remarks": null,
                    "refinery": null
                }
            }

        }
    },
    props:['tube_name','gz_wave','gz_type','gz_xz','gz_data'],
    components:{
      AoShan,
      CeziDao,
      DaXieDao,
      LanShan,
      BaiShanWan,
      ShiBuQiao,
      TangYan,
      TianShi,
      CaoJin,
      RiYi,
      DongLin,
      DongHuang,
      YiChang,
      YiChangFuXian,
      LuNing 
    },
    methods:{

    },
    mounted(){

    }
  };
</script>

<style lang="stylus" scoped>
  .traceWork
    overflow:scroll
    overflow-y hidden
    height 540px
</style>
