<template>
  <div
    class="ProgressRing">
    <svg
      class="__svg"
      xmlns="http://www.w3.org/2000/svg"
      :width="size"
      :height="size"
      role="presentation">
      <circle
        class="__circle"
        ref="circleRef"
        :style="computedRingStyle"
        :stroke-width="thickness"
        stroke-linecap="butt"
        :stroke="color"
        fill="transparent"
        :r="(size / 2) - (thickness / 2)"
        :cx="size / 2"
        :cy="size / 2"
      />
    </svg>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  size: {
    type: Number,
    default: 280,
  },
  thickness: {
    type: Number,
    default: 20,
  },
  percent: {
    type: Number,
    default: 0,
  },
  color: {
    type: String,
    default: '#44EA9F',
  },
})

const circleRef = ref(null)
const circleLength = ref(0)

const computedRingStyle = computed(() => {
  const offset = circleLength.value - ((props.percent / 100) * circleLength.value);

  return {
    strokeDashoffset: offset,
    strokeDasharray: `${circleLength.value} ${circleLength.value}`,
  };
})

onMounted(() => {
  circleLength.value = circleRef.value.getTotalLength();
})
</script>


<style scoped>
.ProgressRing {
  --progress-ring-default-size: 280px;
  position: relative;
  width: var(--progress-ring-default-size);
  height: var(--progress-ring-default-size);
  border-radius: 100%;
}

.__svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.__circle {
  /* stroke: var(--color-green); */
  transform-origin: 50% 50%;
  transform: rotate(270deg);
  transition-property: stroke-dashoffset;
  transition-timing-function: ease;
}
</style>
