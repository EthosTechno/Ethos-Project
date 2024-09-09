<template>
    <VDropdown
      class="InputSelectStage"
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
              <span class="DefaultLabelText">
                {{ computedDefaultValueLabel }}
              </span>
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
          <div class="Option stage-option" v-if="options.length == 0">
            No Result Found
          </div>
          <div
            class="Option stage-option"
            v-else
            v-for="option in options"
            :class="{ isSelected: isOptionSelected(option)}"
            v-close-popper
            ref="optionsRef"
            tabindex="0"
            :key="option.projectStageName"
            @click="handleInput(option)">
            {{ option.projectStageName }} <img  src="../assets/check-icon.svg" alt="CheckIcon" />
          </div>
        </div>
      </template>
    </VDropdown>
    <vue-final-modal classes="modal-container" content-class="modal-content" name="stage-completed-modal" v-model="stageCompleteModal" :click-to-close='false'>
          <StageCompleteModal @updatePortal="updatePortal" @closeNo="closeNoModal" ></StageCompleteModal>
    </vue-final-modal>
</template>
  
  
  <script setup>
  import { ref, computed } from 'vue'
  import IconBase from '@/components/IconBase.vue';
  import StageCompleteModal from '../components/StageCompleteModal.vue';

  
  const emit = defineEmits([
    'updatedStageData',
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
  const stageCompleteModal  = ref(false);
  const modalOpenData = ref({})
  const isLabelFocused = ref(false)
  
 // Computed
  const selectedOption = computed(() => {
    return props.options.find((o) =>o.projectStageName === props.modelValue) || null
  })
  
  const selectedOptionIndex = computed(() => {
    return props.options.findIndex((o) => o.projectStageName === props.modelValue)
  })
  
  const computedDefaultValueLabel = computed(() => {
    if (selectedOption.value) {
      return selectedOption.value.projectStageName || selectedOption.value.projectStageName
    }
    return 'Select'
  })
  
  // Methods
  const handleInput = (option) => {
    if(!option.isCompleted) {
      stageCompleteModal.value = true;
      modalOpenData.value  = option
    }
  }

  const closeNoModal = () => {
    stageCompleteModal.value = false;
  }

  const updatePortal = (date,customerPortalToggalValue) => {
    emit('updatedStageData',modalOpenData.value,date,customerPortalToggalValue)
    stageCompleteModal.value = false;
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
    return option.isCompleted === true
  }
  
  const focusOption = (optionIndex) => {
    optionsRef.value[optionIndex].focus()
  }
  </script>
  
  
  <style scoped>
  .DefaultLabel {
    --default-label-height: 38px;
    padding: 0 24px;
    font-size: 12px;
    font-weight: 600;
    line-height: 28px;
    background-color: transparent;
    border: none;
    border-radius: calc(var(--default-label-height) / 2);
    box-shadow: inset 0 0 0 1px #24292F;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    text-align: center;
    width: 158px;
  }
  .DefaultLabelText{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 100%;
  }
  .DefaultLabel .__icon {
    margin-left: 6px;
    margin-top: 6px;
    min-width: 18px;
  }
  
  .Dropdown {
    padding: 8px 0;
    font-size: 16px;
    font-weight: 400;
    overflow-y: auto;
    max-height: 270px;
  }
  
  .Option {
    padding: 8px 16px;
    cursor: pointer;
    position: relative;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 500px;
  }
  .stage-option{
    width: 200px;
    padding: 8px 40px 8px 16px;
    color: #525252;
    font-weight: 500;
    font-size: 12px;
    line-height: 160%;
    font-family: 'Inter';
    color: #525252;
    text-transform: uppercase;
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
  right: 15px;
  top: 8px;
}
.stage-option img{
  right: 22px;
}
  </style>
  