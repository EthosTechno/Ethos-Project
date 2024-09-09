<template>
  <div class="PortalsTable">
    <header class="Controls">
     
    </header>

    <div class="__rows row-custom">
      <PortalsTableRow class="__header-row" :is-header-row="true"  :active-sort-key="activeSortKey" 
      :is-sort-descending="isSortDescending" @sort="handleSort" />
      <PortalsTableRow class="__row" v-for="portal in computedPortals" :portal="portal" :portals="computedPortals" :key="portal" @updateData="updateData"/>
    </div>

    <div class="__empty" v-show="!computedPortals.length">
      No results found
    </div>

    <div>
      <Pagination  :pageName="'Projects'" :totalPages="totalPages" :perPage="perPageData" :totalItems="totalItem" :currentPage="currentPage" @pagechanged="onPageChange" />
    </div>

    <div class="toggle-btn-main" :class="totalItem > 10 ? '' : 'toggle_class'">
      <div class="Toggle">
        <span class="__label"> Show Deactivated Projects  </span>
        <InputToggle class="__InputToggle"
         v-model="statusToggalValue" @click="handleStatusChange" />
      </div>
    </div>
  </div>
</template>


<script setup>
import { nextTick, ref, computed } from 'vue'
import InputText from '@/components/InputText.vue'
import PortalsTableRow from '@/components/project-list-row.vue'
import FilterDropDown from '@/components/FilterDropDown.vue'
import Pagination from '@/components/Pagination.vue'
import portalService from '../services/portal.service'
import '@vuepic/vue-datepicker/dist/main.css';
import moment from "moment";
import  CretateProject from "../services/createProject.service"
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import InputToggle from "@/components/InputToggle.vue";
import filteDropDownValue from "../dummy/filter-dropdown-value";



const props = defineProps({
  portals: {
    type: Array,
    required: true,
  },

})

const currentPage = ref(1)
const computedPortals = ref([])
const totalPages = ref(1)
const totalItem = ref()
const perPageData = ref(filteDropDownValue.perPageData)
const pageNumber = ref(1);
const activeSortKey = ref('CreatedOn')
const statusToggalValue =  ref(false);
const isSortDescending = ref(false)


computed(() => {
  return props.portals
})



const data = {
  "pageNumber": 1,
  "pageSize": perPageData.value,
  "ShowDeactiveProject": statusToggalValue.value,
  "sortingColumnName": activeSortKey.value,
  "orderDirection": "DESC"
}
CretateProject.projectList(data).then((res) => { 
  const item = res.data
  computedPortals.value = item.items
  totalPages.value = item.totalPages
  totalItem.value = item.totalItems
})


const updateData = () => {
  const data = {
  "pageNumber": 1,
  "pageSize": perPageData.value,
  "ShowDeactiveProject": statusToggalValue.value,
  "sortingColumnName": activeSortKey.value,
  "orderDirection": isSortDescending.value ? "ASC" : "DESC"
}
  CretateProject.projectList(data).then((res) => { 
    const item = res.data
    computedPortals.value = item.items
    currentPage.value = 1;
    totalPages.value = item.totalPages
    totalItem.value = item.totalItems
  })
}

computedPortals.value = computed(() => {
  return props.portals
})

const handleSort = (key) => {
  isSortDescending.value = !isSortDescending.value
  const data = {
    "pageNumber": 1,
    "pageSize": perPageData.value,
    "ShowDeactiveProject": statusToggalValue.value, 
    "sortingColumnName": key,
    "orderDirection": isSortDescending.value ? "ASC" : "DESC"
  }
  activeSortKey.value = key
  CretateProject.projectList(data).then((res) => {
    const item = res.data 
    computedPortals.value = item.items,
    totalPages.value = item.totalPages
    currentPage.value = 1
    totalItem.value = item.totalItems
    totalItem.value = item.totalItems
  })
}

const handleStatusChange = () => {  
  const data = {
    "pageNumber": 1,
    "pageSize": perPageData.value,
    "sortingColumnName": activeSortKey.value,
    "ShowDeactiveProject": statusToggalValue.value,
    "orderDirection": isSortDescending.value ? "ASC" : "DESC"
  }
  CretateProject.projectList(data).then((res) => {
    const item = res.data
    computedPortals.value = item.items
    currentPage.value = 1
    totalPages.value = item.totalPages
    totalItem.value = item.totalItems
  })
}

const onPageChange =  (page) => {
  pageNumber.value = page;
  const data = {
    "pageNumber": page,
    "pageSize": perPageData.value,
    "sortingColumnName": activeSortKey.value,
    "ShowDeactiveProject": statusToggalValue.value,
    "orderDirection": isSortDescending.value ? "ASC" : "DESC"
  }
  CretateProject.projectList(data).then((res) => {
    const item = res.data
    computedPortals.value = item.items
    currentPage.value = item.pageNumber
    totalPages.value = item.totalPages
    totalItem.value = item.totalItems
  })
}
</script>


<style scoped>
.create-portal-btn{
  display: inline-block;
    height: 52px;
    padding: 15px 33px;
    font-size: 17px;
    background-color: var(--color-green);
    border-radius: 32px;
    box-shadow: 0 3px 15px rgb(0 0 0 / 10%);
    color: white;
    cursor: pointer;
}

.create-portal-prnt{
  width: 100%;
  text-align: right;
  margin-bottom: 35px;
}
.Controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.Controls .__search {
  flex: 1 1 280px;
  max-width: 280px;
}

.Toggle .__label {
  padding-right: 8px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #888888;
  vertical-align: middle;
}

.Toggle .__InputToggle {
  vertical-align: middle;
}


.__header-row {
  margin-top: 24px;
}

.__rows {
  background-color: var(--color-white);
  border-radius: var(--radius);
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.07);
}

.__row+.__row {
  border-top: 2px solid var(--color-lighter);
}


.__empty {
  padding: 12px 20px;
  text-align: center;
  color: var(--color-mute);
}

.__ButtonBase{
  background-color: #cbcbcb;
  padding: 6px 30px;
  border-radius: 20px;
  cursor: pointer;
}
.PortalsTable .InputText{
  height: 37px;
  background: #FFFFFF;
  border: 1px solid #E5E5E5;
  border-radius: 100px;
  padding: 7px 24px;
}

.isHeaderRow {
  margin-top: 2px;
}

.row-custom{
  border: none;
  box-shadow: 0px 20px 25px -5px rgba(16, 24, 40, 0.1), 0px 8px 10px -6px rgba(16, 24, 40, 0.1);
  margin-top: 20px;
}

.toggle-btn-main {
  display: flex;
  justify-content: flex-end;
  padding: 0 0 40px;
}


.Toggle .__InputToggle {
  vertical-align: middle;
}

.__empty {
  padding: 12px 20px;
  color: var(--color-mute);
}
.toggle_class{
  margin-top: -35px;
}


</style>
