<template>
  <div class="PortalsTable">
    <header class="Controls">
      <InputText class="__search" @keyup.enter="handleSubmitSearch(searchText)" v-model="searchText"
        placeholder="Search customer portals" icon-leading="search" icon-trailing="cancel" @update:resetButton="resetForm()" @update:searchClick="searchClick(searchText)" />
      <FilterDropDown  @applyFilter="handleApplyFilter" />
    </header>

    <div class="__rows row-custom">
      <PortalsTableRow class="__header-row" :is-header-row="true"  :active-sort-key="activeSortKey"
      :is-sort-descending="isSortDescending" @sort="handleSort"/>
      <PortalsTableRow class="__row" v-for="portal in computedPortals" :portal="portal" :key="portal" @statusChange="statusChange" @stageChange="stageChange"/>
    </div>

    <div class="__empty" v-show="!computedPortals.length">
      No results found
    </div>

    <div>
      <pagination  :pageName="'Portals'" :totalPages="totalPages" :perPage="perPageData" :totalItems="totalItem" :currentPage="currentPage" @pagechanged="onPageChange" />
    </div>
  </div>
</template>


<script setup>
import { nextTick, ref, computed, onMounted } from 'vue'
import InputText from '@/components/InputText.vue'
import PortalsTableRow from '@/components/PortalsTableRow.vue'
import FilterDropDown from '@/components/FilterDropDown.vue'
import Pagination from '@/components/Pagination.vue'
import portalService from '../services/portal.service'
import '@vuepic/vue-datepicker/dist/main.css';
import moment from "moment";
import filteDropDownValue from "../dummy/filter-dropdown-value";
import { useToast } from "vue-toastification";
import useEmitter from '@/composables/useEmitter'


const props = defineProps({
  portals: {
    type: Array,
    required: true,
  formData: {
    type: Array,
    default: []
  }
  },
})

let currentPage = ref(1)
const computedPortals = ref([])
const totalPages = ref(1)
const totalItem = ref()
const perPageData = ref(filteDropDownValue.perPageData)
const searchText = ref('')
const isActive = ref(true);
const pageNumber = ref(1);
const activeSortKey = ref('UpdatedOn')
const isSortDescending = ref(false)
const oldSortValue = ref(true);
let filterNumber = ref([])

const emitter = useEmitter()
computed(() => {
  return props.portals
})

const updateData = () => {
  
  const valueStatic = {
    "pageNumber": pageNumber.value,
    "pageSize": perPageData.value,
    "sortingColumnName": activeSortKey.value,  
    "orderDirection": oldSortValue.value ? 'ASC' : 'DESC',
    "searchText": searchText.value,
    "isActive": isActive.value,
    "filters":  filterNumber.value
  }
  portalService.getAllPortals(valueStatic).then((res) => {
    computedPortals.value = res.data.items
    totalPages.value = res.data.totalPages
    totalItem.value = res.data.totalItems
  })
}

onMounted(() => {
  const valueStatic = {
    "pageNumber": pageNumber.value,
    "pageSize": perPageData.value,
    "sortingColumnName": activeSortKey.value,  
    "orderDirection": oldSortValue.value ? 'ASC' : 'DESC',
    "searchText": "",
    "isActive": isActive.value,
    "filters":  filterNumber.value
  }
  emitter.on("submitted", () => {
    searchText.value = '';
    portalService.getAllPortals(valueStatic).then((res) => {
      computedPortals.value = res.data.items;
      totalPages.value = res.data.totalPages;
      totalItem.value = res.data.totalItems;
    });
  });
  emitter.on("noapiError", () => {  
    portalService.getAllPortals(valueStatic).then((res) => {
      computedPortals.value = res.data.items
      totalPages.value = res.data.totalPages
      totalItem.value = res.data.totalItems
    })
  })
})


const resetForm = () => {
  searchText.value = '';
  const valueStatic = {
    "pageNumber": 1,
    "pageSize": perPageData.value,
    "sortingColumnName": activeSortKey.value,  
    "orderDirection": oldSortValue.value ? 'ASC' : 'DESC',
    "searchText": "",
    "isActive": isActive.value,
    "filters":  filterNumber.value.reduce((acc,item)=> {
       if(item.isApplyFilter){
        acc.push(item);
       }
       return acc;
    },[])
  }
  portalService.getAllPortals(valueStatic).then((res) => {
    computedPortals.value = res.data.items
    currentPage.value = 1;
    totalPages.value = res.data.totalPages
    totalItem.value = res.data.totalItems
  })
}

const searchClick = (searchText) => {
  const searchClickBody = {
    "pageNumber": 1,
    "pageSize": perPageData.value,
    "searchText": searchText,
    "sortingColumnName": activeSortKey.value,  
    "orderDirection": oldSortValue.value ? 'ASC' : 'DESC',
    "isActive": isActive.value,
    "filters":  filterNumber.value.reduce((acc,item)=> {
       if(item.isApplyFilter){
        acc.push(item);
       }
       return acc;
    },[])
  }
  portalService.getAllPortals(searchClickBody).then((res) => {
    computedPortals.value = res.data.items,
    currentPage.value = 1;
    totalPages.value = res.data.totalPages
    totalItem.value = res.data.totalItems
  })

}

const stageChange = (value,portalCustomerId,date,customerPortalUpdate,selectedData) => {
  const body = {
    portalCustomerId: portalCustomerId,
    projectStages: value,
    completedDate: date,
    notifyViaEmail: customerPortalUpdate,
    stageId: selectedData.stageId,
    projectStageId: selectedData.projectStageId
  }
  portalService.chnagePortalStage(body).then((res)=> {
    console.log(res)
    useToast().success(res,{timeout: 5000});
    updateData();
  })

}

const handleSubmitSearch = (searchTexts) => {
  const handleSubmitSearchBody = {
    "pageNumber": 1,
    "pageSize": perPageData.value,
    "searchText": searchTexts,
    "isActive": isActive.value,
    "sortingColumnName": activeSortKey.value,  
    "orderDirection": oldSortValue.value ? 'ASC' : 'DESC',
    "filters": filterNumber.value.reduce((acc,item)=> {
       if(item.isApplyFilter){
        acc.push(item);
       }
       return acc;
    },[])
  }
  portalService.getAllPortals(handleSubmitSearchBody).then((res) => {
    computedPortals.value = res.data.items,
    currentPage.value = 1;
    totalPages.value = res.data.totalPages
    totalItem.value = res.data.totalItems
  })
}


computedPortals.value = computed(() => {
  return props.portals
})

const statusChange = (value,projectStageID,date,cutomerPortalUpdate) => {
  const body= {
    portalCustomerId: projectStageID,
    status: value,
    completedDate: date,
    notifyViaEmail: cutomerPortalUpdate
  }
  portalService.changePortalStatus(body).then((res) => {
    useToast().success(res,{timeout: 5000});
    updateData();
  })
}

const handleSort = (key) => {
  const valueStatic = {
    "pageNumber": 1,
    "pageSize": perPageData.value,
    "sortingColumnName": key,
    "orderDirection": isSortDescending.value ? "ASC" : "DESC",
    "searchText": searchText.value,
     "isActive": isActive.value,
    "filters": filterNumber.value.reduce((acc,item)=> {
       if(item.isApplyFilter){
        acc.push(item);
       }
       return acc;
    },[])
  }
  activeSortKey.value = key
  portalService.getAllPortals(valueStatic).then((res) => {
    computedPortals.value = res.data.items,
    totalPages.value = res.data.totalPages
    currentPage.value = 1
    totalItem.value = res.data.totalItems
    totalItem.value = res.data.totalItems
    oldSortValue.value  = isSortDescending.value
    isSortDescending.value = !isSortDescending.value
  })
}



const onPageChange = async (page) => {
  const renderComponent = ref(true);
  renderComponent.value = false;
  pageNumber.value = page;
  const valueStatic =
  {
    "pageNumber": page,
    "pageSize": perPageData.value,
    "searchText": searchText.value,
    "sortingColumnName": activeSortKey.value,  
    "orderDirection": oldSortValue.value ? 'ASC' : 'DESC',
    "isActive": isActive.value,
    "filters": filterNumber.value.reduce((acc,item)=> {
       if(item.isApplyFilter){
        acc.push(item);
       }
       return acc;
    },[])
  }


  portalService.getAllPortals(valueStatic).then((res) => {
    computedPortals.value = res.data.items
    currentPage.value = res.data.pageNumber
    totalPages.value = res.data.totalPages
    totalItem.value = res.data.totalItems
  })
  renderComponent.value = false;
  await nextTick();
  renderComponent.value = true;
}

const handleApplyFilter = (formData) => { 
   formData.reduce((acc,item)=> {
    if(item.field == 0 || item.field == 1) {
      if(item.date) { 
        item.fromDate = item.date === null ? null : moment(item.date[0]).format('yyyy-MM-DD')+' 12:00 AM';
        item.todate = item.date === null  ? null : moment(item.date[1]).format('yyyy-MM-DD') + ' 11:59 PM';
      } 
      item.value = null;
      item.StageValue = []
    }
    if(item.field == 2) {
      item.fromDate = null;
      item.todate = null;
      item.StageValue = []
    }
    if(item.field == 3) {
      item.fromDate = null;
      item.todate = null;
      item.value = null 
    }
    acc.push(item);
    return acc;
  },[])
  filterNumber.value =  formData
  isActive.value = formData.length === 0 ? true: false
  const valueStatic = {
    "pageNumber": 1,
    "pageSize": perPageData.value,
    "searchText": searchText.value,
    "sortingColumnName": activeSortKey.value,  
    "orderDirection": oldSortValue.value ? 'ASC' : 'DESC',
    "isActive": formData.length === 0 ? true: false,
    "filters":  filterNumber.value.reduce((acc,item)=> {
       if(item.isApplyFilter){
        acc.push(item);
       }
       return acc;
    },[])
  }

  
  portalService.getAllPortals(valueStatic).then((res) => {
    computedPortals.value = res.data.items
    currentPage.value = 1
    totalPages.value = res.data.totalPages
    totalItem.value = res.data.totalItems
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
  color: var(--color-mute);
  font-size: 14px;
  font-weight: 600;
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

</style>
