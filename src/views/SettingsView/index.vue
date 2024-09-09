<template>
  <div
    class="SettingsView">
    <div
      class="h1">
      Company Settings
    </div>

    <TabsBase
      class="__tabs"
      :tabs="tabs"
      :active-tab="activeTab"
      @tab="handleTab"
    />

    <component
      :is="activeTab.component">
    </component>
  </div>
</template>


<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import TabsBase from '@/components/TabsBase.vue'

const router = useRouter()
const route = useRoute()

const tabs = [
  {
    value: 'company-info',
    label: 'Company Info',
    component: defineAsyncComponent(() => import('./CompanyInfoView.vue')),
  },
  {
    value: 'branding',
    label: 'Users',
    component: defineAsyncComponent(() => import('./BrandingView.vue')),
  },
  // {
  //   value: 'billing',
  //   label: 'Billing',
  //   component: defineAsyncComponent(() => import('./BillingView.vue')),
  // },
]

const activeTab = computed(() => tabs.find((tab) => tab.value === route.params.activeSetting))

const handleTab = (tab) => {
  router.replace({
    name: route.name,
    params: {
      activeSetting: tab.value,
    },
  })   
}
</script>


<style scoped>
.__tabs {
  margin-top: 30px;
  margin-bottom: 48px;
}
.SettingsView .h1{
  color: #113a6b;
  font-style: normal;
  font-weight: 700;
  font-size: 34px;
}
</style>
