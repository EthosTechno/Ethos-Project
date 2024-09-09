<template>
  <div class="PortalsTable">
    <header class="Controls">
      <InputText class="__search" @keyup.enter="handleSubmitSearch(searchText)" v-model="searchText"
        placeholder="Search Customer Referrals" icon-leading="search" icon-trailing="cancel"
        @update:resetButton="handleSubmitSearch('')" @update:searchClick="handleSubmitSearch(searchText)" />

      <div class="top-part">
        <InputSelect v-model="dateRange" :options="dateRangeOptionss" auto-size="min" placement="bottom"
          @update:modelValue="updateGraphData(dateRange)" />
        <a :disabled="!portalData.length" :style="portalData.length ? 'cursor: pointer' : ''" @click="exportCSV"
          v-tooltip.bubble="'Save Referral Report'"><img src="../assets/save-referral-report.svg"></a>
      </div>

    </header>
    <div class="__rows row-custom">
      <PortalsTableRow class="__header-row" :is-header-row="true" />
      <PortalsTableRow class="__row" v-for="portal in portalData" :portal="portal" :key="portal" />
    </div>

    <div class="__empty" v-show="!portalData.length">
      No results found
    </div>

    <div>
      <pagination  :pageName="'Referrals'" :totalPages="totalPages" :perPage="10" :totalItems="totalItem" :currentPage="currentPage"
        @pagechanged="onPageChange" />
    </div>
  </div>
</template>


<script setup>
import { nextTick, ref, computed, onMounted } from 'vue'
import InputText from '@/components/InputText.vue'
import PortalsTableRow from '@/components/explorereferrals-row.vue'
import Pagination from '@/components/Pagination.vue'
import InputSelect from '@/components/InputSelect.vue'
import dashboardService from '../services/dashboard.service'
import exploreReferralService from '../services/exploreReferrals.service';
import filteDropDownValue from "../dummy/filter-dropdown-value";

const currentPage = ref(1);
const totalPages = ref(1);
const totalItem = ref(0);
const perPageData = ref(filteDropDownValue.perPageData);
const pageNumber = ref(1);
const dateRange = ref(3);
const searchText = ref('');
const dateRangeOptionss = ref([]);
const portalData = ref([]);



const getBody = {
  "pageNumber": 1,
  "pageSize": perPageData.value,
  "searchText": searchText.value,
  "range": dateRange.value
}
onMounted(() => {
  exploreReferralService.getExploreReferrals(getBody).then((res) => {
    const item = res.data
    portalData.value = item.items
    currentPage.value = 1;
    totalPages.value = item.totalPages
    totalItem.value = item.totalItems

    dashboardService.GetAllDashboardEnums().then((res) => {
      dateRangeOptionss.value = res.data;
    });
  })
})

const exportCSV = () => {
  const csvData = {
    searchText: searchText.value,
    range: dateRange.value,
  };
  exploreReferralService.exportReferrals(csvData).then((response) => {
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(new Blob([response.data]));

    link.setAttribute("download", "PortalCX - Referrals.xlsx");

    document.body.appendChild(link);

    link.click();
  })
};

const handleSubmitSearch = (value) => {
  searchText.value = value
  const body = {
    "pageNumber": 1,
    "pageSize": perPageData.value,
    "searchText": value,
    "range": dateRange.value
  }
  exploreReferralService.getExploreReferrals(body).then((res) => {
    const item = res.data
    portalData.value = item.items
    currentPage.value = 1;
    totalPages.value = item.totalPages;
    totalItem.value = item.totalItems;
  });
};


const updateGraphData = (value) => {
  dateRange.value = value
  const body = {
    "pageNumber": 1,
    "pageSize": perPageData.value,
    "searchText": searchText.value,
    "range": value
  }
  exploreReferralService.getExploreReferrals(body).then((res) => {
    const item = res.data
    portalData.value = item.items
    currentPage.value = 1;
    totalPages.value = item.totalPages
    totalItem.value = item.totalItems
  })
}



const onPageChange = (page) => {
  pageNumber.value = page;
  const data = {
    "pageNumber": page,
    "pageSize": perPageData.value,
    "searchText": searchText.value,
    "range": dateRange.value
  }
  exploreReferralService.getExploreReferrals(data).then((res) => {
    const item = res.data
    portalData.value = item.items
    currentPage.value = item.pageNumber
    totalPages.value = item.totalPages
    totalItem.value = item.totalItems
  })
}
</script>


<style scoped>
.create-portal-btn {
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

.create-portal-prnt {
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
  font-family: "Inter";
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

.__ButtonBase {
  background-color: #cbcbcb;
  padding: 6px 30px;
  border-radius: 20px;
  cursor: pointer;
}

.PortalsTable .InputText {
  height: 37px;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 100px;
  padding: 7px 24px;
}

.isHeaderRow {
  margin-top: 2px;
}

.row-custom {
  border: none;
  box-shadow: 0px 20px 25px -5px rgba(16, 24, 40, 0.1),
    0px 8px 10px -6px rgba(16, 24, 40, 0.1);
  margin-top: 20px;
}

.toggle-btn-main {
  display: flex;
  justify-content: flex-end;
  padding: 20px 0 30px;
}

.Toggle .__InputToggle {
  vertical-align: middle;
}

.__empty {
  padding: 12px 20px;
  color: var(--color-mute);
}

.top-part {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: column;
}

.top-part .v-popper {
  margin-bottom: 30px;
  margin-top: -50px;
}

.top-part a {
  margin-right: 8px;
}
</style>
