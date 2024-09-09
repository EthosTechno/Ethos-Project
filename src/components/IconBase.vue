<template>
  <svg
    class="IconBase"
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :aria-labelledby="name"
    role="presentation">
    <title
      :id="name"
      lang="en">
      {{ name }}
    </title>
    <g
      :fill="color">
      <component
        :is="AsyncIcon"
      />
    </g>
  </svg>
</template>


<script setup>
import { shallowRef, watch, defineAsyncComponent } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  width: {
    type: [Number, String],
    default: 24,
  },
  height: {
    type: [Number, String],
    default: 24,
  },
  color: {
    type: String,
    default: 'currentColor',
  },
})

const getIcon = (name) => defineAsyncComponent(() => import(`./icon/${name}.vue`))

const AsyncIcon = shallowRef(getIcon(props.name))

watch(() => props.name, (name) => { AsyncIcon.value = getIcon(name) })
</script>


<style scoped>
.IconBase {
  display: inline-block;
  vertical-align: middle;
  
}
</style>
