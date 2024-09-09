<template>
  <div
    class="NavigationGlobalLink"
    :class="{ isActive }"
    @click="$emit('click', $event)">
    <IconBase
      :name="iconName"
      width="24"
      height="24"
    />
    <!-- <span
      class="__label">
      {{ label }}
    </span> -->
  </div>
</template>


<script setup>
import IconBase from '@/components/IconBase.vue'

defineEmits([
  'click',
])

const props = defineProps({
  iconName: {
    type: String,
    required: true,
  },
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
.NavigationGlobalLink {
  --navigation-link-size: 50px;
  flex: 0 0 var(--navigation-link-size);
  width: var(--navigation-link-size);
  height: var(--navigation-link-size);
  padding-top: 11px;
  font-size: 8px;
  white-space: nowrap;
  border: 2px solid transparent;
  border-radius: 50%;
  cursor: pointer;
}

.NavigationGlobalLink + .NavigationGlobalLink {
  margin-top: 16px;
}

.NavigationGlobalLink:not(.isActive):hover {
  background-color: var(--color-lighter);
}

.NavigationGlobalLink.isActive {
  border-color: var(--color-green);
}

/* .__label {
  display: block;
  margin-top: 4px;
  font-weight: 600;
} */
</style>
