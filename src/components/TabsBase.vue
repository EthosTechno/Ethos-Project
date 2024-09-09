<template>
  <div
    class="TabsBase">

    <TabBase
      v-for="tab in tabs"
      :label="tab.label"
      :is-active="isTabActive(tab)"
      :key="tab.value"
      @click="handleTabClick(tab)"
    />

  </div>
</template>


<script setup>
import TabBase from '@/components/TabBase.vue';

const emit = defineEmits([
  'tab',
])

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  activeTab: {
    type: Object,
    default: null,
  },
})

const handleTabClick = (tab) => {
  return emit('tab', tab);
}

const isTabActive = (tab) => {
  return props.activeTab && props.activeTab.value === tab.value;
}
</script>


<style scoped>
</style>
