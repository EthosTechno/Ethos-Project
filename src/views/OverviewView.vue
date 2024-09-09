<template>
  <div class="OverviewView">
    <header class="__header">
      <div class="title">Portals Dashboard</div>
      <button @click="$router.push('/explore-referrals')" class="create-btn">
        <svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21.7593 12.7963H4.90741M21.7593 12.7963C23.0888 12.7963 24.1667 13.8741 24.1667 15.2037V22.4259C24.1667 23.7555 23.0888 24.8333 21.7593 24.8333H4.90741C3.57783 24.8333 2.5 23.7555 2.5 22.4259V15.2037C2.5 13.8741 3.57783 12.7963 4.90741 12.7963M21.7593 12.7963V10.3889C21.7593 9.05932 20.6814 7.98149 19.3519 7.98149M4.90741 12.7963V10.3889C4.90741 9.05932 5.98524 7.98149 7.31481 7.98149M7.31481 7.98149V5.57408C7.31481 4.2445 8.39265 3.16667 9.72222 3.16667H16.9444C18.274 3.16667 19.3519 4.2445 19.3519 5.57408V7.98149M7.31481 7.98149H19.3519"
            stroke="#111827" stroke-width="2.67" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        Explore Referrals
      </button>
    </header>

    <div class="Graphs">
      <!-- <GraphRings class="__GraphRings" :data="graphRingsData" :logo="companyLogoURL" :companyName="companyName" /> -->
      <div class="cutom-legend-graph">
        <div class="custom-graph">
          <DoughnutChart :activePortals="totalActive" :completedPortals="totalCompleted"
            :canceledPortals="totalCancel" />
          <div class="graph-content">
            <!-- <img :src="companyLogoURL" v-if='companyLogoURL' >
            <span v-else>{{ companyName }}</span> -->
            <img src="../assets/portal-logo.svg" alt="logo">
            <h3>{{ totalPortal }}</h3>
            <p>Total New Portals</p>
          </div>
        </div>
        <GraphLegend class="__GraphLegend" :legend="graphRingsData" />
      </div>

      <!-- <GraphBarStacked class="__GraphBarStacked" axis-label-y="PORTALS" :data="GRAPH_BAR_STACKED_DATA" /> -->
      <div class="right-side-part">
        <InputSelect v-model="dateRange" :options="dateRangeOptionss" auto-size="min" placement="bottom"
          @update:modelValue="updateGraphData()" />
        <div class="MetricCards">
          <MetricCard class="__MetricCard" v-for="metric in metrics" v-bind="metric" :key="metric.label" />
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import GRAPH_BAR_STACKED_DATA from '@/dummy/graph-bar-stacked'
import InputSelect from '@/components/InputSelect.vue'
// import GraphRings from '@/components/GraphRings.vue'
import GraphBarStacked from '@/components/GraphBarStacked.vue'
import MetricCard from '@/components/MetricCard.vue'
import GraphLegend from '@/components/GraphLegend.vue'
import dashboardService from '../services/dashboard.service'
import DoughnutChart from '@/components/DoughnutChart.vue'

const dateRange = ref(3)
const totalActive = ref();
const totalOpened = ref();
const totalCompleted = ref();
const totalOpenedPercentage = ref();
const totalCompletedPercentage = ref();
const companyLogoURL = ref();
const totalPortal = ref();
const totalCancel = ref(0)
const companyName = ref()
const dateRangeOptionss = ref([])
const metrics = [
  {
    label: "Total Portals",
    description: "Total Customers Created",
    metric: totalPortal,
    trendPercent: "15",
    trendSentiment: "positive",
  },
  {
    label: "Active Portals",
    description: "Total Active Customers",
    metric: totalActive,
    trendPercent: "21",
    trendSentiment: "positive",
    summaryMetric: '5%',
    summaryLabel: 'Growth Rate',
  },
  {
    label: "Completed Portals",
    description: "Total Completed Customers",
    metric: totalCompleted,
    trendPercent: "8",
    trendSentiment: "negative",
    summaryMetric: '5%',
    summaryLabel: 'Completion Rate',
  },
  {
    label: "Canceled Portals",
    description: "Canceled Customers",
    metric: totalCancel,
    trendPercent: "8",
    trendSentiment: "negative",
    summaryMetric: '5%',
    summaryLabel: 'Completion Rate',
  },
]
const graphRingsData = [
  {
    label: 'Total Portals',
    size: 260,
    percent: 100,
    color: '#44EA9F',
    isFeatured: true,
    metric: totalActive,
    trendPercent: 15,
    trendSentiment: 'positive',
  },
  {
    label: 'Active Portals',
    size: 285,
    percent: totalOpenedPercentage.value,
    color: '#347DE7',
  },
  {
    label: 'Completed Portals',
    size: 285,
    percent: totalCompletedPercentage.value,
    color: '#113A6B',
  },
  {
    label: 'Canceled Portals',
    size: 285,
    percent: totalCompletedPercentage.value,
    color: '#E73B9A',
  },
]


onMounted(() => {

  dashboardService.getDashboard(dateRange.value).then((res) => {
    const item = res.data
    companyName.value = item.companyName
    companyLogoURL.value = item.companyLogoUrl
    totalActive.value = item.totalActive;
    totalPortal.value = item.totalPortals
    totalOpened.value = item.totalOpened;
    totalCompleted.value = item.totalCompleted;
    totalCancel.value = item.totalCanceled
    graphRingsData.map((item) => {
      if (item.label === 'Portals Opened') {
        item.percent = res.data.openPercentage;
      }
      if (item.label === 'Portals Completed') {
        item.percent = res.data.completedPercentage;
      }

    })


    dashboardService.GetAllDashboardEnums().then((res) => {
      dateRangeOptionss.value = res.data


    })
  })

})
const updateGraphData = () => {
  dashboardService.getDashboard(dateRange.value).then((res) => {
    const item = res.data
    companyName.value = item.companyName
    companyLogoURL.value = item.companyLogoUrl
    totalActive.value = item.totalActive;
    totalPortal.value = item.totalPortals
    totalOpened.value = item.totalOpened;
    totalCompleted.value = item.totalCompleted;
    totalCancel.value = item.totalCanceled
    graphRingsData.map((item) => {
      if (item.label === 'Portals Opened') {
        item.percent = res.data.openPercentage;
      }
      if (item.label === 'Portals Completed') {
        item.percent = res.data.completedPercentage;
      }

    })
  })
}

</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Roboto:ital,wght@0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700&family=Source+Sans+3:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Source+Sans+Pro:ital,wght@0,300;0,400;0,600;0,700;0,900;1,300;1,400;1,600;1,700&display=swap');

.title {
  color: #113a6b;
  font-style: normal;
  font-weight: 700;
  font-size: 34px;
  line-height: 22px;
  margin: 20px 0 50px;
  display: inline-block;
}

.OverviewView {
  padding-bottom: 80px;
}


/* Header */
.__header {
  display: flex;
  justify-content: space-between;
}


/* Graphs */
.Graphs {
  /* margin-top: 40px; */
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
}

.right-side-part {
  padding-left: 25px;
}

.custom-graph {
  position: relative;
  margin-left: -25px;
}

.graph-content {
  position: absolute;
  top: 28%;
  left: 0;
  right: 0;
  margin: 0 auto;
  text-align: center;
}

.graph-content img {
  width: 210px;
}

.graph-content span {
  color: #113a6b;
  font-style: normal;
  font-weight: 700;
  font-size: 38px;
  line-height: 22px;
}

.graph-content h3 {
  font-style: normal;
  font-weight: 700;
  font-size: 70px;
  line-height: 106px;
  letter-spacing: -1.33333px;
  color: #113A6B;
}

.graph-content p {
  font-family: 'Source Sans 3';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
  color: #333333;
}

.__GraphRings {
  flex: 0 0 290px;
  margin-right: 8%;
}

.__GraphBarStacked {
  flex: 1 1 100%;
  height: 265px;
}


/* Metric Cards */

.MetricCards {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  margin-left: 0 !important;
}

.right-side-part .InputSelect {
  width: 150px;
}

.cutom-legend-graph .GraphLegend {
  margin-top: 30px;
  text-align: left;
}

.create-btn {
  background: #44ea9f;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 5%);
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
  margin-top: -50px;
}

.create-btn svg {
  margin-right: 20px;
}

.create-btn:hover svg path {
  stroke: #44EA9F;
}

.create-btn:hover {
  background: #113A6B;
  color: #44EA9F;
  transition: all 400ms ease;
}



/* Responsive */
@media only screen and (min-width: 1024px) {
  .cutom-legend-graph {
    width: 510px;
  }

  .right-side-part {
    width: 100%;
  }
}

@media only screen and (min-width: 1280px) {
  .cutom-legend-graph {
    width: 510px;
  }

  .right-side-part {
    width: calc(100% - 510px);
  }
}

@media only screen and (min-width: 1920px) {
  .cutom-legend-graph {
    width: 600px;
  }

  .right-side-part {
    width: calc(100% - 600px);
  }
}

@media only screen and (min-width: 2100px) {
  .cutom-legend-graph {
    width: 700px;
  }

  .right-side-part {
    width: calc(100% - 700px);
  }

  .graph-content {
    top: 50%;
    transform: translateY(-50%);
  }
}

@media only screen and (min-width: 2800px) {
  .cutom-legend-graph {
    width: 800px;
  }

  .right-side-part {
    width: calc(100% - 800px);
  }

  .graph-content {
    top: 50%;
    transform: translateY(-50%);
  }
}

@media only screen and (max-width: 1279px) {
  .right-side-part {
    padding-left: 0;
  }
}

@media only screen and (max-width: 1200px) {
  .right-side-part {
    margin-top: 40px;
  }
}
</style>
<style>
.apexcharts-canvas::after {
  content: "";
  position: absolute;
  top: 0;
  border: 13px solid #44ea9f;
  border-radius: 50%;
}

@media only screen and (min-width: 1024px) {
  .apexcharts-canvas::after {
    left: 58px;
    width: 422px;
    height: 422px;
  }
}

@media only screen and (min-width: 1920px) {
  .apexcharts-canvas::after {
    left: 65px;
    width: 497px;
    height: 497px;
  }
}

@media only screen and (min-width: 2100px) {
  .apexcharts-canvas::after {
    left: 73px;
    width: 579px;
    height: 579px;
  }
}

@media only screen and (min-width: 2800px) {
  .apexcharts-canvas::after {
    left: 83px;
    width: 661px;
    height: 661px;
  }
}
</style>