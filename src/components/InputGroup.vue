<template>
  <div
    class="InputGroup">
    <div
      class="__label"
      v-if="label"
      key="input-group-label">
      {{ label }}
    </div>

    <div
      class="__description"
      v-if="description"
      key="input-group-description">
      {{ description }}
    </div>

    <InputText
      v-bind="inputProps"
      :model-value="modelValue"
      @update:modelValue="handleInput"
      @blur="handleBlur"
      
    />
  </div>
</template>


<script setup>
import InputText from '@/components/InputText.vue'

const emit = defineEmits([
  'update:modelValue','blur'
])

defineProps({
  modelValue: {
    type: String, // <- @TODO could be others
    default: '',
  },
  spaceValue: {
    type: Boolean,
    default: false 
  },
  label: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  inputProps: {
    type: Object,
    required: true,
  },
})

const handleInput = (val) => {
  emit('update:modelValue', val)
  }

const handleBlur= (val) => {
  emit('blur',val)
}
</script>


<style scoped>
.InputGroup {
  text-align: left;
}

.__label {
  padding-bottom: 8px;
  font-size: 16px;
  font-weight: 700;
}

.__description {
  padding-bottom: 8px;
  color: var(--color-mute);
  font-size: 14px;
}

.InputGroup + .InputGroup {
  margin-top: 32px;
}
</style>
