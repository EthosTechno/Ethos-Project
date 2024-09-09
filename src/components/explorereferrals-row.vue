<template>
  <div class="PortalsTableRow" :class="{ isHeaderRow }">
    <div
      class="__cell __cell-neme"
      :class="{ isActive: isHeaderActive('Name') }"
    >
      <span :class="isActive ? 'tooltip' : ''" @mouseenter="hoverTooltipAdd(portal.customerName)" @mouseleave="hoverTooltipRemove(portal.customerName)" v-tooltip="portal.customerName">{{ portal.customerName }}</span>
      <div
        v-if="isHeaderRow"
        key="header-customer"
      >
        Customer
      </div>
    </div>

    <div
      class="__cell __cell-id"
      :class="{ isActive: isHeaderActive('PortalID') }"
    >
      <span v-tooltip="portal.email" v-if="!isHeaderRow"
        >{{ portal.email ? portal.email : '-'}}</span>
      <div v-if="isHeaderRow" key="header-email">Email</div>
    </div>

    <div
      class="__cell __cell-Stages"
      :class="{ isActive: isHeaderActive('Stages')}">
      <span>{{phonemask(portal.phone)}}</span>
      <div
        v-if="isHeaderRow"
        key="header-phone"
      >
        Phone
      </div>
    </div>

    <div
      class="__cell __cell-date"
      :class="{ isActive: isHeaderActive('CreatedOn') }"
    >
      {{ portal.createdOnStr }}

      <div
        v-if="isHeaderRow"
        key="header-open-date"
      >
       Date
      </div>
    </div>
    <div
      class="__cell __cell-status"
      :class="{ isActive: isHeaderActive('Status') }"
    >
      <div
        class="__status"
        :style="getStatusStyle('Inactive')"
        v-if="!isHeaderRow"
      >
      <span v-tooltip="portal.referralByName"> {{ portal.referralByName }}</span>  
      </div>
      <div
        v-if="isHeaderRow"
        key="header-status"
      >
        Referred by
      </div>
    </div>
    
  </div>
</template>


<script setup>
import { ref } from "vue";


const isActive = ref(false)

const props = defineProps({
  portal: {
    type: Object,
    default: Object,
  },
  isHeaderRow: {
    type: Boolean,
    default: false,
  },
  
});

const openDeleteModal = () => {
  deleteModalValue.value = true;
};





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

const getStatusColor = (status) => {
  const STATUS_COLOR_MAP = [
    { status: "Active", color: "#30E694" },
    { status: "Inactive", color: "#F4F4F4" },
  ];
  const mappedStatus = STATUS_COLOR_MAP.find((map) => map.status === status);

  return mappedStatus ? mappedStatus.color : STATUS_COLOR_MAP[0].color;
};

const hoverTooltipAdd = (value) => {
  if(value.length > 50) {
    isActive.value = true
  }
}

const hoverTooltipRemove = (value) => {
  if(value.length > 50) {
    isActive.value = false
  }
} 



const getStatusStyle = (status) => {
  return {
    backgroundColor: `${getStatusColor(status)}`,
  };
};

const portalClick = (value) => {
  window.open(value);
};
const handleHeaderClick = (header) => {
  emit("sort", header);
};

const isHeaderActive = (header) => {
  return header === props.activeSortKey;
};

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
  font-size: 13px;
  font-weight: 700;
  line-height: 28px;
  color: var(--color-dark-blue);
  background-color: var(--color-green);
  border-radius: 14px;
}
.isHeaderRow{
  border: 2px solid var(--color-lighter);
  margin-top: 0;
}

.setting-non {
  display: none;
}

.setting-block {
  display: block;
}
.__cell {
  padding: 6px 20px;
  min-height: 50px;
  flex: 1 1 auto;
}
.__cell + .__cell {
  border-left: 2px solid var(--color-lighter);
}

.__cell-customer {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.isHeaderRow .__cell.__cell-link{
  width: 65px;
}

.__cell.__cell-Stages{
  max-width: 15% !important;
  flex-basis: 15% !important;
  justify-content: center;
}

/* .PortalsTableRow.isHeaderRow .__cell.__cell-id{
  max-width: 30%;
}*/

.PortalsTableRow .__cell.__cell-id span{
  max-width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: inline-block;
  position: relative;
  padding-right: 20px;
} 

.PortalsTableRow .__cell.__cell-id span img{
  position: absolute;
  top: 3px;
  right: 5px;
  cursor: pointer;
}




.__cell-phone,
.__cell-date,
.__cell-status,
.__cell-progress,
.__cell-link {
  flex: 0 0 auto;
  color: var(--color-mute);
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.__cell-date{
  text-align: center !important;
  width: 130px;
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
}
.isHeaderRow .__cell.__cell-phone {
  /* flex: 0 0 20%; */
  text-align: left;
}
.PortalsTableRow:not(.isHeaderRow) .__cell.__cell-neme{
  line-height: 38px;
}
.PortalsTableRow:not(.isHeaderRow) .__cell.__cell-id span{
  line-height: 33px;
}
.PortalsTableRow:not(.isHeaderRow) .__cell.__cell-Stages{
  text-align: center;
  line-height: 38px;
}
.PortalsTableRow:not(.isHeaderRow) .__cell.__cell-date{
  line-height: 38px;
}

.isHeaderRow .__cell:after {
  content: "▲";
  display: none;
  position: absolute;
  top: 7px;
  right: 8px;
  width: 10px;
  height: 10px;
  font-size: 10px;
  line-height: 10px;
}
.isHeaderRow.isSortDescending .__cell:after {
  transform: rotate(180deg);
}
.isHeaderRow .__cell.isSortable:hover,
.isHeaderRow .__cell.isSortable:focus {
  background-color: #fff;
  cursor: pointer;
}
.isHeaderRow .__cell.isSortable:hover:after,
.isHeaderRow .__cell.isSortable:focus:after,
.isHeaderRow .__cell.isActive:after {
  display: block;
}

.__cell.__cell-status {
  width: 200px;
}
.__cell.__cell-neme {
  width: 20%;
   white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: inline-block;
  position: relative;
  padding-right: 20px;
  font-weight: 600;
}

.__cell.__cell-id {
    width: 30%;
}


.PortalsTableRow.__row .__cell-status .__status {
  padding: 0 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 158px;
  text-align: center;
  margin-top: 5px;
}

.action-link .action-btn {
  display: inline-block;
  margin-left: 10px;
  background: transparent;
}
</style>




