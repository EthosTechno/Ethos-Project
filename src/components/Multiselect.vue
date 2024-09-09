<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <multiselect :value="modelValue" :options="options"  ref="input" :close-on-select="false"
      :class="multiselect-no-results" @input="handleInput" :searchable="searchable" :multiple="true" placeholder="Select">
      <span class="checkbox-label" :v-slot="options" slotScope="scope" @click.self="select(scope.option)">
        <input class="test" type="checkbox"  v-model="scope.options.checked" @focus.prevent />
      </span>
    </multiselect>
  </div>
</template>
  
<script setup>
import { ref } from 'vue'
import multiselect from '@vueform/multiselect'

const emit = defineEmits([
  'update:modelValue',
])

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  options: {
    type: Array
  },
  searchable: {
    type: Boolean,
    default: false
  }
})

const input = ref('')
const handleInput = (val) => {
  emit('update:modelValue', val)
}

</script>
  
<style src="@vueform/multiselect/themes/default.css">
.multiselect-no-options,
.multiselect-no-results {
  display: flex;
  color: var(--ms-empty-color, #4b5563);
  padding: var(--ms-option-py, .5rem) var(--ms-option-px, .75rem);
}

.multiselect {
  border-radius: calc(var(--default-label-height) / 2) !important;
  box-shadow: inset 0 0 0 2px var(--color-light);
}

.multiselect .multiselect-placeholder {
  padding-left: 0;
}

.multiselect .multiselect-caret {
  margin-right: 0;
  background-color: #000;
  width: 11px;
  height: 22px;
}

.checkbox-label {
  display: block;
}

.test {
  position: absolute;
  right: 1vw;
  appearance: auto;
}
</style>