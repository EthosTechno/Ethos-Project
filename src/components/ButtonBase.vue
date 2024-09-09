<template>
  <button
    class="ButtonBase"
    :type="type"
    :disabled="isDisabled"
    @click="handleClick">
    <slot></slot>
  </button>
</template>


<script setup>
const emit = defineEmits([
  'click',
])

const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
})

const handleClick = () => {
  emit('click')
}
</script>


<style scoped>
.ButtonBase {
  display: inline-block;
  height: 52px;
  padding: 0 42px;
  font-size: 18px;
  font-weight: 700;
  background-color: var(--color-green);
  color: #113a6b;
  border-radius: 32px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
}
</style>
