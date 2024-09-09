<template>
  <div
    class="InputToggle"
    :class="{ isOn: modelValue }"
    @click="handleToggle">
    <div
      class="__thumb">
    </div>
  </div>
</template>


<script setup>
const emit = defineEmits([
  'update:modelValue',
])

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const handleToggle = () => {
  emit('update:modelValue', !props.modelValue)
}
</script>


<style scoped>
.InputToggle {
  --toggle-width: 36px;
  --toggle-height: 18px;
  display: inline-block;
  position: relative;
  width: var(--toggle-width);
  height: var(--toggle-height);
  background: var(--color-lighter);
  border-radius: calc(var(--toggle-height) / 2);
  cursor: pointer;
}
.InputToggle.isOn {
  background: var(--color-green) !important;
}
.InputToggle.isOn .__thumb {
  border-color: var(--color-green);
  transform: translateX(100%);
}

.__thumb {
  width: var(--toggle-height);
  height: var(--toggle-height);
  background-color: var(--color-white);
  border-radius: 50%;
  border: 1px solid var(--color-lighter);
  box-shadow: inset 0 0 0 2px var(--color-light);
}
</style>
