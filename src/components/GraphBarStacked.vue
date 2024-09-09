<template>
  <div
    class="GraphBarStacked">
    <div
      class="__graph">
      <div
        class="AxisLabel AxisLabelY"
        v-if="axisLabelY"
        key="graph-bar-stacked-axis-label-y">
        {{ axisLabelY }}
      </div>

      <div
        class="Bars"
        @mouseleave="handleMouseLeave">
        <div
          class="Bar"
          v-for="(bar, barIndex) in computedBarsData"
          :style="getBarStyle(bar)"
          :key="bar.key"
          ref="barsRef"
          @mouseenter="handleMouseEnter(bar, barIndex)">
          <div
            class="BarStacked"
            v-for="stackedBar in bar.values"
            :key="stackedBar"
            :style="getStackedBarStyle(stackedBar, bar)">
          </div>
        </div>

        <div
          class="Axis">
          <div
            class="__line"
            v-for="line in computedAxis"
            :style="{ bottom: line.bottom }"
            :key="line.label">
            <span
              class="__label">
              {{ line.label }}
            </span>
          </div>
        </div>

        <div
          class="Popper"
          :style="computedPopperStyle"
          ref="popperRef">
          {{ popperLabel }}
        </div>
      </div>
    </div>
<!-- 
    <GraphLegend
      class="__GraphLegend"
      :legend="data"
    /> -->
  </div>
</template>


<script setup>
import { ref, computed } from 'vue'
import { round } from 'lodash'
import GraphLegend from '@/components/GraphLegend.vue'

// Props
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  axisLabelY: {
    type: String,
    default: null,
  },
})


// Refs
const popperRef = ref(null)
const barsRef = ref([])
const hoveredBarRef = ref(null)
const popperLabel = ref('')


// Computed
const longestDataCategory = computed(() => {
  return props.data.reduce((longestCategory, thisCategory) => {
    return (thisCategory.data.length > longestCategory.length)
      ? thisCategory.data
      : longestCategory
  }, [])
})

const computedBarsData = computed(() => {
  return longestDataCategory.value.map(({ key }) => {
    const barNode = {
      key,
      totalValue: 0,
      values: [],
    }

    props.data.forEach(({ label, color, data }) => {
      const matchingDataEntry = data.find((thisData) => thisData.key === key)

      barNode.values.push({
        label,
        color,
        value: matchingDataEntry?.value || 0, 
      })
    })

    const totalValue = barNode.values.reduce((total, { value }) => total + value, 0)

    barNode.totalValue = totalValue

    return barNode
  }) 
})

const greatestTotalValue = computed(() => {
  return Math.max(...computedBarsData.value.map(({ totalValue }) => totalValue))
})

const computedAxis = computed(() => {
  // @TODO could be tens, thousands, millions, etc.
  const NUMBER_LINES = 3
  const nextTenth = Math.ceil(greatestTotalValue.value / 10) * 10
  const interval = nextTenth / NUMBER_LINES

  return new Array(NUMBER_LINES + 1).fill(null).map((_, index) => ({
    label: `${interval * index}`,
    bottom: `${index / NUMBER_LINES * 100}%`,
  }))
})

const computedPopperStyle = computed(() => {
  if (!hoveredBarRef.value || !popperRef.value) return {
    visibility: 'hidden',
  }

  return {
    top: `${hoveredBarRef.value.offsetTop}px`,
    left: `${hoveredBarRef.value.offsetLeft}px`,
  }
})


// Methods
const getBarStyle = (bar) => ({
  height: `${round(bar.totalValue / greatestTotalValue.value * 100)}%`,
})

const getStackedBarStyle = (stackedBar, bar) => ({
  height: `${round(stackedBar.value / bar.totalValue * 100)}%`,
  backgroundColor: stackedBar.color,
})

const resetPopper = () => {
  hoveredBarRef.value = null
  popperLabel.value = ''
}

const handleMouseEnter = (bar, barIndex) => {
  hoveredBarRef.value = barsRef.value[barIndex]
  popperLabel.value = bar.key
}

const handleMouseLeave = () => {
  resetPopper()
}
</script>


<style scoped>
/* Graph */
.__graph {
  display: flex;
  height: 100%;
  padding: 20px;
  padding-top: 32px;
  background-color: var(--color-lighter);
  border-radius: var(--radius);
}


/* Axis Labels */
.AxisLabel {
  font-size: 12px;
  font-weight: 600;
  text-align: center;
}
.AxisLabelY {
  flex: 0 0 32px;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
}


/* Bars */
.Bars {
  display: flex;
  position: relative;
  flex: 1 1 100%;
  height: 100%;
  margin-left: 40px;
  align-items: flex-end;
}
.Bar {
  position: relative;
  z-index: 1;
  flex: 1 1 20px;
  height: 100%;
  overflow: hidden;
}
.Bar + .Bar {
  margin-left: 4px;
}


/* Axis */
.Axis {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: var(--color-mute);
  white-space: nowrap;
}
.__line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.04);
}
.__label {
  display: inline-block;
  position: relative;
  padding-right: 10px;
  text-align: right;
  transform: translate(-100%, -50%);
}


/* Popper */
.Popper {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  padding: 0 8px;
  color: var(--color-white);
  font-size: 12px;
  font-weight: 700;
  line-height: 20px;
  white-space: nowrap;
  background-color: var(--color-mute);
  border-radius: 10px;
  transform: translateY(-150%);
}
.Popper:after {
  --arrow-size: 6px;
  content: '';
  display: block;
  position: absolute;
  right: 0;
  left: 0;
  width: var(--arrow-size);
  margin: 0 auto;
  border-top: var(--arrow-size) solid var(--color-mute);
  border-right: var(--arrow-size) solid transparent;
  border-left: var(--arrow-size) solid transparent;
}


/* Legend */
.__GraphLegend {
  margin-top: 16px;
}
</style>
