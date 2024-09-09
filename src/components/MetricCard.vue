<template>
  <div  
    class="MetricCard">
    <div
      class="__card">
      <div
        class="__label">
        {{ label }}
      </div>

      <div
        class="__description">
        {{ description }}
      </div>

      <div
        class="__metric">
         {{ metric }} 
      </div>
     
    </div>

   
  </div>
</template>


<script setup>
import TrendBit from '@/components/TrendBit.vue'


defineProps({
  label: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  metric: {
    type: [String, Number],
    default: 'N/A',
  },
  trendPercent: {
    type: [String, Number],
    default: 0,
  },
  trendSentiment: {
    type: String,
    default: 'neutral',
  },
  summaryMetric: {
    type: [String, Number],
    default: 'N/A',
  },
  summaryLabel: {
    type: String,
    default: '',
  },
})
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Roboto:ital,wght@0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700&family=Source+Sans+Pro:ital,wght@0,300;0,400;0,600;0,700;0,900;1,300;1,400;1,600;1,700&display=swap');

.MetricCard {
  text-align: center;
  white-space: nowrap;
  width: calc(50% - 15px);
  display: flex;
  flex-wrap: wrap;
  margin-left: 0 !important;
}

@media only screen and (min-width: 1600px) {
  .MetricCard {
    width: calc(50% - 20px);
  }
}

/* Card */
.__card {
  width: 100%;
  padding: 24px;
  padding-bottom: 16px;
  text-align: left;
  background: #FFFFFF;
  box-shadow: 0px 20px 25px -5px rgba(16, 24, 40, 0.1), 0px 8px 10px -6px rgba(16, 24, 40, 0.1);
  border-radius: 6px;
  margin-bottom: 40px;
}

.MetricCard:nth-child(1) .__card{
  border-top: 10px solid #44EA9F;
}
.MetricCard:nth-child(2) .__card{
  border-top: 10px solid #347DE7;
}
.MetricCard:nth-child(3) .__card{
  border-top: 10px solid #113A6B;
}
.MetricCard:nth-child(4) .__card{
  border-top: 10px solid #E73B9A;
}
.MetricCard:nth-child(5) .__card{
  border-top: 10px solid #44EA9F;
}

/* Label */
.__label {
  padding-bottom: 2px;
  font-family: 'Source Sans Pro', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 25px;
  line-height: 31px;
  color: #113A6B;
}


/* Description */
.__description {
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  text-transform: uppercase;
  color: #888888;
}


/* Metric */
.__metric {
  display: inline-block;
  margin-top: 32px;
  font-family: 'Source Sans Pro', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 70px;
  line-height: 64px;
  letter-spacing: -1.33333px;
  color: #113A6B;

}


/* TrendBit */
.__TrendBit {
  margin-left: 8px;
}


/* Summary */
.__summary {
  display: inline-block;
  margin-top: 20px;
  padding: 8px 16px;
  font-size: 16px;
  font-weight: 400;
  background-color: var(--color-lighter);
  border-radius: var(--radius);
}
.__summary__metric {
  font-weight: 700;
}
</style>
