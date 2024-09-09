<template>
  <div
    class="GraphLegend">
    <div
      v-for="legendKey in legend"
      class="__key"
      :key="legendKey.label">
      <span
        class="__swatch"
        :style="{ backgroundColor: legendKey.color }">
      </span>
      {{ legendKey.label }}
    </div>
  </div>
</template>


<script setup>
defineProps({
  legend: {
    type: Array,
    required: true,
  },
})
</script>


<style scoped>
.GraphLegend {
  text-align: center;
  font-size: 14px;
  font-weight: 700;
}
.__key {
  display: inline-block;
  padding: 8px;
}
.__swatch {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 2px;
}
</style>
