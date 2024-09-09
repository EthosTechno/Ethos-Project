<template>
  <div
    class="ProgressBar">
    <div
      class="__progress"
      :style="computedProgressStyle">
    </div>
  </div>
</template>


<script setup>
import { computed } from 'vue'

const props = defineProps({
  progress: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    default: '#44EA9F',
  },
})

const computedProgressStyle = computed(() => ({
  width: `${props.progress}%`,
  backgroundColor: `${props.color}`,
}))
</script>


<style scoped>
.ProgressBar {
  --progress-bar-height: 6px;
  width: 100%;
  height: var(--progress-bar-height);
  background-color: var(--color-lighter);
  border-radius: calc(var(--progress-bar-height) / 2);
  overflow: hidden;
}

.__progress {
  height: 100%;
  background-color: var(--color-green);
  border-radius: calc(var(--progress-bar-height) / 2);
}
</style>
