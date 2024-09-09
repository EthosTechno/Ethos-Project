<template>
    <VDropdown
      class="InputSelects"
      :placement="placement"
      :auto-size="autoSize"
      :distance="4"
      @apply-show="handleOpenDropdown"
      @apply-hide="handleCloseDropdown">
      <template
        v-slot:default="{ show }">
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
              <span class="LabelValue">{{ computedDefaultValueLabel }}</span>
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
          <div class="Option" v-if="options.length <= 0" >
             No Result Found
          </div>
          <div
            class="Option"
            v-else
            v-for="option in options"
            :class="{ isSelected: isOptionSelected(option)}"
            v-close-popper
            ref="optionsRef"
            tabindex="0"
            :key="option.projectId"
            @click="handleInput(option)">
            {{ option.name }} <img src="../assets/check-icon.svg" alt="CheckIcon" />
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
    return props.options.find((o) => o.projectId === props.modelValue) || null
  })
  
  const selectedOptionIndex = computed(() => {
    return props.options.findIndex((o) => o.projectId === props.modelValue)
  })
  
  const computedDefaultValueLabel = computed(() => {
    if (selectedOption.value) {
      return selectedOption.value.labelSelected || selectedOption.value.name
    }
    return 'Project Type'
  })
  
  // Methods
  const handleInput = (option) => {
    emit('update:modelValue', option.projectId)
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
    return option.projectId === props.modelValue
  }
  
  const focusOption = (optionIndex) => {
    optionsRef.value[optionIndex].focus()
  }
  </script>
  
  
  <style scoped>
  .DefaultLabel {
    --default-label-height: 38px;
    padding: 0 16px;
    font-size: 16px;
    font-weight: 600;
    line-height: var(--default-label-height);
    background-color: transparent;
    border: none;
    border-radius: calc(var(--default-label-height) / 2);
    box-shadow: inset 0 0 0 2px var(--color-light);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    text-align: left;

  }
  .DefaultLabel .LabelValue{
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 100%;
    overflow: hidden;
    display: block;
    flex: 100%;
  }
  .DefaultLabel .__icon {
    margin-left: 16px;
    margin-top: 11px;
  }
  
  .Dropdown {
    padding: 8px 0;
    font-size: 16px;
    font-weight: 400;
    overflow-y: auto;
    max-height: 190px;
  }
  
  .Option {
    padding: 8px 36px 8px 16px;
    cursor: pointer;
    position: relative;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 530px;
  }
  .Option:focus {
    background-color: var(--color-lighter);
  }
  .Option.isSelected {
    /* background-color: var(--color-green); */
  }
.Option.isSelected img{
  display: inline-block;
}
.Option img{
  display: none;
  position: absolute;
  right: 10px;
  top: 8px;
}
  </style>
  