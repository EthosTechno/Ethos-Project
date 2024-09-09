<template>
  <div
    class="GraphRings">
    <div
      class="ProgressRings">
      <ProgressRing
        v-for="ring in dataDescending"
        class="__ProgressRing"
        :size="ring.size"
        :percent="ring.percent"
        :color="ring.color"
        :key="ring.label"
      />
      <span class="__ring-logo">
        <img :src='logo' v-if='logo' >
        <span v-else>{{ companyName }}</span>
      </span>
      <div
        class="__metric">
        {{ featuredData.metric }}
      </div>

      <div
        class="__label">
        {{ featuredData.label }}
      </div>

      <TrendBit
        class="__TrendBit"
        :percent="featuredData.trendPercent"
        :sentiment="featuredData.trendSentiment"
      />
    </div>

    <GraphLegend
      :legend="legendKeys"
    />
  </div>
</template>


<script setup>
import { computed } from 'vue'
import ProgressRing from '@/components/ProgressRing.vue'
import TrendBit from '@/components/TrendBit.vue'
import GraphLegend from '@/components/GraphLegend.vue'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  logo: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  }
})

const featuredData = computed(() => props.data.find((d) => d.isFeatured))
const dataDescending = computed(() => {
  return props.data.sort((a, b) => b.percent - a.percent)
})

const legendKeys = computed(() => {
  return dataDescending.value.filter((d) => !d.isFeatured)
})
</script>


<style scoped>
 /* Progress Rings  */
.ProgressRings {
  display: flex;
  position: relative;
  width: 280px;
  height: 280px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.__ProgressRing {
  position: absolute;
  top: 0;
  left: 0;
}

.__metric {
  font-size: 64px;
  font-weight: 700;
}

.__label {
  font-size: 16px;
  font-weight: 600;
}

.__change {
  font-size: 18px;
  font-weight: 700;
}
.__ring-logo{
  margin: 0 auto;
  text-align: center;
  max-width: 135px;
  font-size: 21px;
  line-height: 24px;
  color: rgb(52, 125, 231);
  font-weight: 700;
}
.__ring-logo img{
  max-width: 100%;
}
</style>
