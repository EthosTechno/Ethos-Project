<template>
  <div
    class="PortalsTableRow"
    :class="{ isHeaderRow, isSortDescending }">
    <div
      class="__cell __cell-customer  isSortable"
      :class="{ isActive: isHeaderActive('CustomerName')}">
      <span :class="isActive ? 'tooltip' : ''" @mouseenter="hoverTooltipAdd(portal.customerName)" @mouseleave="hoverTooltipRemove(portal.customerName)" v-tooltip="portal.customerName">{{ portal.customerName }}</span>
      <div
        v-if="isHeaderRow"
        key="header-customer"
        @click="handleHeaderClick('CustomerName')"
      >
        Customer
      </div>
    </div>

    <div
      class="__cell __cell-email isSortable"
      :class="{ isActive: isHeaderActive('Email')}">
      <span :class="isActive ? 'tooltip' : ''" @mouseenter="hoverTooltipAdd(portal.email)" @mouseleave="hoverTooltipRemove(portal.email)" v-tooltip="portal.email">{{ portal.email }}</span>
      <div
        v-if="isHeaderRow"
        key="header-email"
        @click="handleHeaderClick('Email')"
      >
        Email
      </div>
    </div>

    <div
      class="__cell __cell-phone"
      :class="{ isActive: isHeaderActive('Phone')}">
      <span v-if="portal.phoneNumber != '-'" v-tooltip="phonemask(portal.phoneNumber)">{{ phonemask(portal.phoneNumber)  }}</span>
      <span v-else>-</span>
      <div
        v-if="isHeaderRow"
        key="header-phone"
      >
        Phone
      </div>
    </div>

    <div
      class="__cell __cell-date isSortable"
      :class="{ isActive: isHeaderActive('CreatedOn')}">
       {{portal.createdOnStr}}

      <div
        v-if="isHeaderRow"
        key="header-open-date"
        @click="handleHeaderClick('CreatedOn')"
       >
        Created
      </div>
    </div>

    <div
      class="__cell __cell-date isSortable"
      :class="{ isActive: isHeaderActive('UpdatedOn')}">
       {{portal.updatedOnStr}}

      <div
        v-if="isHeaderRow"
        key="header-updated-date"
        @click="handleHeaderClick('UpdatedOn')"
      >
        Updated
      </div>
    </div>
    <div
      class="__cell __cell-status __cell-stage"
      :class="{ isActive: isHeaderActive('Stage')}">
      <InputSelectStage
        v-model="projectStageName"
        :options="projectStageList"
        :status="true"
        @updatedStageData="changeStgeEvent"
        auto-size="min"
        placement="bottom"
        v-if="!isHeaderRow"
      />
      <div
        v-if="isHeaderRow"
        key="header-progress"
       >
        Stage
      </div>
    </div>

    <div
      class="__cell __cell-status"
      :class="{ isActive: isHeaderActive('Status')}">
      <statusDropDown v-model="statusValue" :statusValue="statusValue"  :status="true" :options="filteDropDownValue.statusDropDownName"  auto-size="min"
        placement="bottom" @update:model-value="changeStatusEvenet(statusValue,portal.portalCustomerId,portal.status)"
        v-if="!isHeaderRow"/>
      <div
        v-if="isHeaderRow"
        key="header-status"
      >
        Status
      </div>
    </div>

    <div
      class="__cell __cell-link">
      <IconBase
        v-if="!isHeaderRow"
        name="link"
        key="link"
        @click="portalClick(portal.portalLink)"
      />
      <div
        v-else
        key="header-link">
        Link
      </div>
    </div>
  </div>
</template>


<script setup>
import {ref , computed, onMounted} from 'vue'
import InputSelectStage from "@/components/InputSelectStage.vue";
import ProgressBar from '@/components/ProgressBar.vue';
import IconBase from '@/components/IconBase.vue';
import statusDropDown from "@/components/statusDropDown.vue";
import filteDropDownValue from "../dummy/filter-dropdown-value";

const emit = defineEmits([
  'sort','statusChange','stageChange'
])

const projectStageList = ref(props.portal.projectStages ? props.portal.projectStages : [])
const props = defineProps({
  portal: {
    type: Object,
    default: Object,
  },
  isHeaderRow: {
    type: Boolean,
    default: false,
  },
  activeSortKey: {
    type: String,
    default: '',
  },
  isSortDescending: {
    type: Boolean,
    default: false,
  },
})
const projectStageName = ref();
onMounted(() => {
  projectStageList.value =  projectStageList.value.reduce((acc,item,i) => {
      item.valueIndex  = i;
      acc.push(item)
      return acc
  },[])
  for(let i=0;i<projectStageList.value.length; i++) {
    if(projectStageList.value[i].isCompleted && (projectStageList.value.length-1) !== i){
      projectStageName.value = projectStageList.value[i+1].projectStageName
    }
    else if(projectStageList.value[i].isCompleted) {
      projectStageName.value = projectStageList.value[i].projectStageName
    }
  }
})
  
const isActive = ref(false);
const statusValue =  ref(props.portal.status);
const getStatusColor = (status) => {
  const STATUS_COLOR_MAP = [
    { status: 'Active',   color: '#30E694' },
    { status: 'Completed', color: '#4EB6FE' },
    { status: 'Stage', color: ' #113a6b'}
  ]

  const mappedStatus = STATUS_COLOR_MAP.find((map) => map.status === status)

  return mappedStatus ? mappedStatus.color : STATUS_COLOR_MAP[0].color
}
const  phonemask = (value) => {        
  if(value) {
    if(value.length == 10) {
      var USNumber = value.match(/(\d{3})(\d{3})(\d{4})/);
      USNumber = "(" + USNumber[1] + ") " + USNumber[2] + "-" + USNumber[3];
      return USNumber
    }
    else if(value.length > 10) return value;
    else return value
  }
  else return value
}
const getStatusStyle = (status) => {
  return {  
    backgroundColor: `${getStatusColor(status)}`
  }
}
const changeStatusEvenet = (value,portalCustomerId,preStatusValue) => {
  if(value !== preStatusValue)
 { 
    emit('statusChange',value,portalCustomerId)
 }
}

const getProgress = (stagesTotalCount, stagesCompletedCount) => {
  return Math.floor((stagesCompletedCount / stagesTotalCount) * 100)
}

const portalClick = (value) => {
  window.open(value)
}
const handleHeaderClick = (header) => {
  emit('sort', header)
}

const isHeaderActive = (header) => {
  return header === props.activeSortKey
}

const changeStgeEvent = (value,date,customerPortalUpdate) => {
  projectStageList.value.forEach(element => {
    const lastStage = value.valueIndex == (projectStageList.value.length-1)
    if(lastStage) {
      element.isCompleted = true;
    }
    else if(element.projectStageId === value.projectStageId) {
      element.isCompleted = true;
    }
  });
  emit('stageChange',projectStageList.value,props.portal.portalCustomerId,date,customerPortalUpdate,value)
}

const hoverTooltipAdd = (value) => {
  if(value.length > 40) {
    isActive.value = true
  }
}

const hoverTooltipRemove = (value) => {
  if(value.length > 40) {
    isActive.value = false
  }
} 
</script>


<style scoped>
.PortalsTableRow {
  display: flex;
  padding: 0px;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
}

.__status {
  width: 80px;
  font-size: 11px;
  font-weight: 700;
  line-height: 28px;
  color: var(--color-dark-blue);
  background-color: var(--color-green);
  border-radius: 14px;
}
.PortalsTableRow:not(.isHeaderRow) .__cell{
  line-height: 38px;
}
.isHeaderRow{
  border: 2px solid var(--color-lighter);
}

.__cell {
  padding: 6px 20px;
  min-height: 50px;
  flex: 1 1 auto;
}
.__cell + .__cell {
  border-left: 2px solid var(--color-lighter);
}

.__cell-customer,
.__cell-email {
  flex-basis: 20%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.__cell-phone {
  flex-basis: 15% !important;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  min-width: 2px;
  min-height: 50px;
  justify-content: center;
}

.__cell-phone,
.__cell-date,
.__cell-status,
.__cell-progress,
.__cell-link {
  flex: 0 0 auto;
  color: #24292F;
  text-align: center;
   white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.__cell-link {
  cursor: pointer;
}
.__cell-customer {
  font-weight: 600;
}

.__cell-date {
  flex-basis: 105px;
  text-align: left;
}

.__cell-progress {
  display: flex;
  align-items: center;
  flex-basis: 175px;
}

.isHeaderRow .__cell-progress{
  display: block;
  text-align: left;
}

/* isHeaderRow */
.isHeaderRow .__cell {
  position: relative;
  color: var(--color-dark);
  font-size: 12px;
  font-weight: 600;
  line-height: 36px;
  text-transform: uppercase;
  border-left: none !important;
  border-radius: 12px;
  min-height: 50px;
  /* display: flex; */
  align-items: center;
}
.isHeaderRow .__cell.__cell-phone{
  /* flex: 0 0 20%; */
  justify-content: flex-start;
  text-align: left;
}
.isHeaderRow .__cell.__cell-date{
  text-align: center;
}
.isHeaderRow .__cell.__cell-status {
  text-align: center;
}
.isHeaderRow .__cell:after {
  content: '▲';
  display: none;
  position: absolute;
  top: 45%;
  transform: translateY(-50%);
  right: 8px;
  width: 10px;
  height: 10px;
  font-size: 10px;
  line-height: 10px;
}
.isHeaderRow.isSortDescending .__cell:after {
  transform: rotate(180deg) translateY(50%);
}
.isHeaderRow .__cell.isSortable:hover,
.isHeaderRow .__cell.isSortable:focus {
  /* background-color: var(--color-lighter); */
  cursor: pointer;
}
.isHeaderRow .__cell.isSortable:hover:after,
.isHeaderRow .__cell.isSortable:focus:after,
.isHeaderRow .__cell.isActive:after {
  display: block;
}

.PortalsTableRow .__cell-status{
  min-width: 122px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.PortalsTableRow .__cell-status.__cell-stage{
  min-width: 200px;
}
.PortalsTableRow.__row .__cell-status .__status{
  padding: 0 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

</style>



