<template>
    <div class="PortalsTable">
      <div class="__rows row-custom">
        <UserTableRow class="__header-row" :is-header-row="true"  :active-sort-key="activeSortKey"
        :is-sort-descending="isSortDescending" @sort="handleSort"/>
        <UserTableRow class="__row" v-for="portal in computedPortals" @updateData="updateData" :portal="portal" :key="portal"/>
      </div>
  
      <div class="__empty" v-show="!computedPortals.length">
        No results found
      </div>
  
      <div>
        <pagination :pageName="'Users'" :totalPages="totalPages" :perPage="perPageData" :totalItems="totalItem" :currentPage="currentPage" @pagechanged="onPageChange" />
      </div>
      <div class="user-btn-main" :class="totalItem > 10 ? '' : 'toggle_class'">
          <button class="user-btn" @click="openAddUserModal">
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.3333 8.38888V12M12.3333 12V15.6111M12.3333 12H15.9444M12.3333 12H8.72222M23.1667 12C23.1667 17.9831 18.3164 22.8333 12.3333 22.8333C6.35025 22.8333 1.5 17.9831 1.5 12C1.5 6.0169 6.35025 1.16666 12.3333 1.16666C18.3164 1.16666 23.1667 6.0169 23.1667 12Z" stroke="#113A6B" stroke-width="2.225" stroke-linecap="round" stroke-linejoin="round"/>
            </svg> Add User
          </button>
          <vue-final-modal classes="modal-container" content-class="modal-content" name="user-modal" v-model="userAddModal" :click-to-close='false'>
              <AddEditUserModal @close="closeModal" @closeNo="closeNoModal"></AddEditUserModal>
          </vue-final-modal>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import { nextTick, ref, computed, onMounted } from 'vue'
  import InputText from '@/components/InputText.vue'
  import UserTableRow from '@/components/UserTableRow.vue'
  import Pagination from '@/components/Pagination.vue'
  import userListSvc from '../services/companySettings.service'
  import '@vuepic/vue-datepicker/dist/main.css';
  import moment from "moment";
  import filteDropDownValue from "../dummy/filter-dropdown-value";
  import { useToast } from "vue-toastification";
  import AddEditUserModal from './AddEditUserModal.vue'
  
  
  
  import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
  
  
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
  const pageNumber = ref(1);
  const activeSortKey = ref('Name')
  const isSortDescending = ref(false)
  const oldSortValue = ref(true);
  const userAddModal= ref(false)

  
  computed(() => {
    return props.portals
  })
  
  
  
  onMounted(() => {
  
    const valueStatic = {
      "pageNumber": pageNumber.value,
      "pageSize": perPageData.value,
      "sortingColumnName": activeSortKey.value,  
      "orderDirection": oldSortValue.value ? 'ASC' : 'DESC',
    }
    
    userListSvc.UserListing(valueStatic).then((res) => {
      computedPortals.value = res.data.items
      totalPages.value = res.data.totalPages
      totalItem.value = res.data.totalItems
    })
  })

  const updateData = () => {
    const valueStatic = {
      "pageNumber": 1,
      "pageSize": perPageData.value,
      "sortingColumnName": activeSortKey.value,  
      "orderDirection": oldSortValue.value ? 'ASC' : 'DESC',
    }
    
    userListSvc.UserListing(valueStatic).then((res) => {
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
    const valueStatic = {
      "pageNumber": 1,
      "pageSize": perPageData.value,
      "sortingColumnName": key,
      "orderDirection": isSortDescending.value ? "ASC" : "DESC"
    }
    activeSortKey.value = key
    userListSvc.UserListing(valueStatic).then((res) => {
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
      "sortingColumnName": activeSortKey.value,  
      "orderDirection": oldSortValue.value ? 'ASC' : 'DESC',
    }
  
  
    userListSvc.UserListing(valueStatic).then((res) => {
      computedPortals.value = res.data.items
      currentPage.value = res.data.pageNumber
      totalPages.value = res.data.totalPages
      totalItem.value = res.data.totalItems
    })
    renderComponent.value = false;
    await nextTick();
    renderComponent.value = true;
  }

  const openAddUserModal = () => {
    userAddModal.value= true
  }

  const closeModal = () => {
    userAddModal.value = false
    updateData();
  }

  const closeNoModal = () => {
    userAddModal.value = false
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
  
  .user-btn-main {
  width: 100%;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  padding: 12px 0;
}
.user-btn {
  background: #44ea9f;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 40px;
  color: #113a6b;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  transition: all 400ms ease; 
  cursor: pointer;
}

.user-btn:hover{
  background: #113A6B;
  color: #44EA9F;
  transition: all 400ms ease; 
}

.user-btn svg{
  margin-right: 10px;
}

.user-btn:hover{
  background: #113A6B;
  color: #44EA9F;
  transition: all 400ms ease; 
}

.user-btn:hover svg path{
  fill: #113a6b;
  stroke: #44ea92;
}
.toggle_class{
  margin-top: -35px;
}
  </style>
  