<template>
  <span
    class="TrendBit"
    :class="[sentiment]">
    {{ percent }}%
  </span>
</template>


<script setup>
defineProps({
  percent: {
    type: [String, Number],
    default: 0,
  },
  sentiment: {
    type: String,
    default: 'neutral',
    validator: (sentiment) => ['neutral', 'positive', 'negative'].includes(sentiment),
  },
})
</script>


<style scoped>
.TrendBit {
  font-size: 18px;
  font-weight: 700;
}
.TrendBit:before { font-size: 12px; }

.TrendBit.neutral { color: var(--color-mute); }
.TrendBit.neutral:before { content: '▶︎'; }

.TrendBit.positive { color: var(--color-green); }
.TrendBit.positive:before { content: '▲'; }

.TrendBit.negative { color: var(--color-red); }
.TrendBit.negative:before { content: '▼'; }
</style>
