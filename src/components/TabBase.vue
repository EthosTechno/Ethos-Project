<template>
  <div
    class="TabBase"
    :class="{ isActive }"
    @click="$emit('click', $event)">
    {{ label }}
  </div>
</template>


<script setup>
defineEmits([
  'click',
])

defineProps({
  label: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
})
</script>


<style scoped>
.TabBase {
  display: inline-block;
  position: relative;
  padding: 12px 16px;
  color: var(--color-light);
  font-weight: 600;
  cursor: pointer;
}
.TabBase:after {
  content: '';
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: var(--color-lighter);
  border-radius: 2px;
}

.TabBase.isActive {
  color: var(--color-dark);
}
.TabBase.isActive:after {
  background-color: var(--color-green);
}
</style>
