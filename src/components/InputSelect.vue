<template>
  <VDropdown
    class="InputSelect"
    :placement="placement"
    :auto-size="autoSize"
    :distance="4"
    @apply-show="handleOpenDropdown"
    @apply-hide="handleCloseDropdown">
    <template
      v-slot:default="{ show  }">
      <div
        ref="labelRef"
        tabindex="0"
        @keydown.prevent.space.enter="show()"
        @focus="handleFocusLabel"
        @blur="handleBlurLabel">
        <slot
          name="label"
          :selected-option="selectedOption"
          :is-focused="isLabelFocused">
          <div
            class="DefaultLabel">
            <span v-if="status && computedDefaultValueLabel == 'Completed'" class="completes_status"></span> 
            <span v-if="status && computedDefaultValueLabel == 'Active'" class="active_status"></span> {{ computedDefaultValueLabel }}
            <IconBase
              class="__icon"
              name="caret-down"
              width="18"
              height="18"
            />
          </div>
        </slot>
      </div>
    </template>

    <template
      v-slot:popper>
      <div
        class="Dropdown">
        <div
          class="Option"
          v-for="option in options"
          :class="{ isSelected: isOptionSelected(option)}"
          v-close-popper
          ref="optionsRef"
          tabindex="0"
          :key="option.value"
          @click="handleInput(option)">
          <span v-if="status && option.name == 'Completed'" class="completes_status"></span>
          <span v-if="status && option.name == 'Active'" class="active_status"></span>{{ option.name }} <img src="../assets/check-icon.svg" alt="CheckIcon" />
        </div>
      </div>
    </template>
  </VDropdown>
</template>


<script setup>
import { ref, computed } from 'vue'
import IconBase from '@/components/IconBase.vue';

const emit = defineEmits([
  'update:modelValue',
])

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    required: true,
  },
  placement: {
    type: String,
    default: 'bottom-start',
  },
  status: {
    type: Boolean,
    default: false
  },
  autoSize: {
    type: [Boolean, String],
    default: false,
    validator: (val) => typeof val === 'boolean' || ['min', 'max'].includes(val),
  },
})

const labelRef = ref(null)
const optionsRef = ref([])

const isLabelFocused = ref(false)

// Computed
const selectedOption = computed(() => {
  return props.options.find((o) => o.value === props.modelValue) || null
})

const selectedOptionIndex = computed(() => {
  return props.options.findIndex((o) => o.value === props.modelValue)
})

const computedDefaultValueLabel = computed(() => {
  if (selectedOption.value) {
    return selectedOption.value.labelSelected || selectedOption.value.name
  }
  return 'Select'
})

// Methods
const handleInput = (option) => {
  emit('update:modelValue', option.value)
}

const handleOpenDropdown = () => {
  setTimeout(() => {
    focusOption(selectedOptionIndex.value)
  }, 200)
}

const handleCloseDropdown = () => {
}

const handleFocusLabel = () => {
  isLabelFocused.value = true
}

const handleBlurLabel = () => {
  isLabelFocused.value = false
}

const isOptionSelected = (option) => {
  return option.value === props.modelValue
}

const focusOption = (optionIndex) => {
  optionsRef.value[optionIndex].focus()
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Roboto:ital,wght@0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700&family=Source+Sans+3:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Source+Sans+Pro:ital,wght@0,300;0,400;0,600;0,700;0,900;1,300;1,400;1,600;1,700&display=swap');
.DefaultLabel {
  --default-label-height: 38px;
  padding: 0 20px;
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 18px;
  color: #333333;
  white-space: nowrap;
  text-overflow: ellipsis;
  background-color: transparent;
  border: none;
  border-radius: calc(var(--default-label-height) / 2);
  border: 2px solid #D8D8D8;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  height: 38px;
  align-items: center;
  text-align: center;
}
.v-popper--shown .DefaultLabel{
  box-shadow: initial;
  border: 2px solid #30E694;
}


.DefaultLabel .__icon {
  margin-left: 5px;
  margin-top: 3px;
}

.Dropdown {
  padding: 8px 0;
  font-size: 14px;
  font-weight: 400;
  color: #525252;
  text-transform: uppercase;
}

.Option {
  padding: 8px 16px;
  cursor: pointer;
  position:relative;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 16px;
  line-height: 18px;
  color: #333333;
  font-weight: 600;
}
.Option:focus {
  background-color: #30E694;
}
.Option.isSelected {
  background-color: var(--color-green);
}
.Option.isSelected img{
  display: inline-block;
}
.Option img{
  display: none;
  position: absolute;
  right: 15px;
  top: 8px;
}

.filter-detail .DefaultLabel{
  height: 37px;
  background: #FFFFFF;
  border: 1px solid #E5E5E5;
  border-radius: 100px;
  box-shadow: none;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  padding: 10px 18px;
  justify-content: flex-start;
}
.filter-detail .DefaultLabel .__icon{
  margin:0 0 0 auto;
}

.active_status {
  width: 12px;
  height: 12px;
  background: #44EA9F;
  border-radius: 100px;
  display:inline-block;
  margin-right:12px;
  margin-top: 1px
}

.completes_status {
  width: 12px;
  height: 12px;
  background: #69B6F8;
  border-radius: 100px;
  display:inline-block;
  margin-right:12px;
  margin-top: 1px
}
</style>
