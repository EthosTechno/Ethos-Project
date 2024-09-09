<template>
  <VDropdown class="InputSelect" :placement="placement" :auto-size="autoSize" :distance="4"
    @apply-show="handleOpenDropdown" @apply-hide="handleCloseDropdown">
    <template v-slot:default="{ show }">
      <div ref="labelRef" tabindex="0" @keydown.prevent.space.enter="show()" @focus="handleFocusLabel"
        @blur="handleBlurLabel">
        <slot name="label" :selected-option="selectedOption" :is-focused="isLabelFocused">
          <div class="DefaultLabel">
            <span v-if="status">
              {{ selected.length > 1 ? selected.length + ' items Selected' : selected[0] == 0 ? 'Active' : selected[0] == 1 ? 'Completed' : selected[0] == 2 ? 'Canceled' : '' }}
            </span>
            <span v-else>
              {{ selected.length > 1 ? selected.length + ' items Selected' : selected[0] }}
            </span>
            <IconBase class="__icon" name="caret-down" width="18" height="18" />
          </div>
        </slot>
      </div>
    </template>

    <template v-slot:popper>
      <div class="Dropdown">
        <div class="Option" v-for="option in options" @click="handleInput" ref="optionsRef" tabindex="0"
          :key="option">
          <label>{{ status ?  option.name : option }}
            <input type="checkbox" @change="oncheck" :checked="checkValue(option)"  :value="`${status ?  option.name : option}`">
            <span class="checkmark"></span>
          </label>
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
  prvSelected: {
    type: Array,
  }
})

const labelRef = ref(null)
const optionsRef = ref([])

const isLabelFocused = ref(false)
const selected =  ref(props.prvSelected ?? [])
const oncheck = (target) => {
  if(target.target.checked) {
    if(props.status) {
      selected.value.push(target.target.value == 'Active' ? 0 : target.target.value == 'Completed' ? 1 : 2)
    }
    else {
      selected.value.push(target.target.value)
    }
     emit('update:modelValue', selected.value)
  }
  else {
   selected.value =  selected.value.reduce((acc,item) => {
    if(props.status){
      if((item == 0 ? 'Active' : item == 1 ? 'Completed' : 'Canceled')  !== target.target.value) {
        acc.push(item);
      }
    }
    else {
      if(target.target.value !== item)  acc.push(item);
    }
    return acc;
    },[]);
     emit('update:modelValue', selected.value)
  }
}

const checkValue = (value) => {
  if(props.status) {
    for(let i = 0; i < selected.value.length; i++) {
        if(selected.value[i] == value.value) {
          return true; 
        }    
    }
  }
  else {
    for(let i = 0; i < selected.value.length; i++) {
        if(selected.value[i] == value) {
          return true; 
        }    
    }
  } 
}

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
const handleInput = () => {
  emit('update:modelValue', selected.value)
}

const handleOpenDropdown = () => {
  // console.log('122',selected.value);
  // setTimeout(() => {
  //   focusOption(selectedOptionIndex.value)
  // }, 200)
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
  // optionsRef.value[optionIndex].focus()
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

.v-popper--shown .DefaultLabel {
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
  max-height: 205px;
  overflow-y: auto;
}

.Option {
  padding: 8px 16px;
  cursor: pointer;
  position: relative;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 16px;
  line-height: 18px;
  color: #333333;
  font-weight: 600;
}

.Option:focus {
  /* background-color: #30E694; */
}

.Option.isSelected {
  background-color: var(--color-green);
}

.Option.isSelected img {
  display: inline-block;
}

.Option img {
  display: none;
  position: absolute;
  right: 15px;
  top: 8px;
}

.filter-detail .DefaultLabel {
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

.filter-detail .DefaultLabel .__icon {
  margin: 0 0 0 auto;
}

.active_status {
  width: 12px;
  height: 12px;
  background: #44EA9F;
  border-radius: 100px;
  display: inline-block;
  margin-right: 12px;
  margin-top: 1px
}

.completes_status {
  width: 12px;
  height: 12px;
  background: #69B6F8;
  border-radius: 100px;
  display: inline-block;
  margin-right: 12px;
  margin-top: 1px
}

.container input:checked .checkmark {
  background-color: #30E694;
}





/* The container */
label {
  display: block;
  position: relative;
  padding-left: 30px;
  margin-bottom: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 400;
  width: 270px;
  color: #525252;
}

/* Hide the browser's default checkbox */
label input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 16px;
  width: 16px;
  border-radius: 2px;
  background-color: #FFFFFF;
  border: 1px solid #E5E5E5;
}

/* On mouse-over, add a grey background color */
label:hover input~.checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
label input:checked~.checkmark {
  background-color: #30E694;
  border-color: #44EA9F;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  left: 0;
  display: none;
}

/* Show the checkmark when checked */
label input:checked~.checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
label .checkmark:after {
  left: 5px;
  top: 1px;
  width: 5px;
  height: 10px;
  border: solid #113A6B;
  border-width: 0 1px 1px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
