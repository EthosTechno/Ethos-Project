<template>
  <div
    class="InputText"
    :class="{ isMultiline }">
    <IconBase
      class="__icon __icon-leading"
      v-if="iconLeading"
      :name="iconLeading"
      color="#525252"
      width="18"
      height="18"
      key="input-text-icon-leading"
      @click="searchIcon"
    />

    <input
      class="__input"
      v-if="!isMultiline"
      ref="input"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :minlength="minlength"
      :maxlength="maxlength"
      :pattern="pattern"
      :disabled="disabled"
      key="input-text-input"
      :autocomplete="complete"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <textarea
      class="__input"
      v-if="isMultiline"
      ref="input"
      type="text"
      rows="7"
      :value="modelValue"
      :placeholder="placeholder"
      key="input-text-textarea"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <IconBase
      class="__icon __icon-trailing"
      v-if="iconTrailing && modelValue !== ''"
      :name="iconTrailing"
      color="#888888"
      width="18"
      height="18"
      key="input-text-icon-trailing"
      @click="resetInput"
    />

    <IconBase
      class="__icon __icon-cancel"
      v-if="iconCancel"
      :name="iconCancel"
      color="#888888"
      width="18"
      height="18"
      key="input-text-icon-cancel"
    
    />
  </div>
</template>


<script setup>
import { ref } from 'vue'
import IconBase from '@/components/IconBase.vue'

const emit = defineEmits([
  'update:modelValue',
  'focus',
  'blur',
  'update:resetButton',
  'update:searchClick'
])

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: null,
  },
  maxlength: {
    type: Number,
    default: null
  },
  minlength: {
    type: Number,
    default: null
  },
  pattern: {
    type: String,
    default: null
  },
  isMultiline: {
    type: Boolean,
    default: false,
  },
  iconLeading: {
    type: String,
    default: null,
  },
  iconTrailing: {
    type: String,
    default: null,
  },
  iconCancel: {
    type: String,
    default: null,
  },
  vmask: {
    type: String,
    default: null
  },
  complete:{
    type:String,
    default : ""
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const input = ref('')

const focus = () => input.focus()

const resetInput = ($event) => {
  input.value.value = '';
  emit('update:resetButton', $event.target.value)
}

const  searchIcon = ($event) => {
  emit('update:searchClick',$event.target.value)
}

const handleInput = ($event) => {
  emit('update:modelValue', $event.target.value)
}

const handleFocus = ($event) => {
  emit('focus', $event)
}

const handleBlur = ($event) => {
  emit('blur', $event)
}
</script>


<style scoped>
.InputText {
  --input-height: 46px;
  display: flex;
  position: relative;
  height: var(--input-height);
  align-items: center;
  border: 2px solid var(--color-lighter);
  border-radius: calc(var(--input-height) / 2);
}
.InputText:focus-within {
  border-color: #30E694 !important;
}

.__input {
  flex: 1 1 100%;
  width: 100%;
  height: 100%;
  padding: 0px 16px;
  font-size: 16px;
  text-overflow: ellipsis;
  background: transparent;
  border: none;
}
.__input:-webkit-autofill{
  border-radius: calc(var(--input-height) / 2);
}
.__icon + .__input {
  padding-left: 6px;
}

.__icon {
  flex: 0 0 24px;
}
.__icon-leading {
  /* margin-left: 8px; */
  cursor: pointer;
  margin-left: 0;
  margin-right: 10px;
  flex: 0 0 14px;
}
.__icon-trailing {
  margin-right: 8px;
  cursor: pointer;
}
.__icon-cancel {
  margin-right: 8px;
}
.InputText.isMultiline {
  height: auto;
  min-height: var(--input-height);
}
.InputText.isMultiline .__input {
  padding-top: 12px;
  resize: none;
}
.PortalsTable .InputText .__input{
  padding: 0;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
}

input::-webkit-input-placeholder {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #9CA3AF;
}

input::-moz-placeholder {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #9CA3AF;
}
input:-ms-input-placeholder {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #9CA3AF;
}
input:-moz-placeholder {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #9CA3AF;
}

.__input:focus{
  border-color: #30E694;
}

/* .__input::-webkit-input-placeholder { 
  color:  #AEAEAE;
    opacity: 1;
}
.__input::-moz-placeholder {
  color:  #AEAEAE;
  opacity: 1;
}
 .__input:-ms-input-placeholder {
  color: #AEAEAE;
  opacity: 1;
}
.__input:-moz-placeholder {
  color: #AEAEAE;
  opacity: 1;
}

.PortalsTable .InputText .__input::-webkit-input-placeholder { 
  color:  #525252;
    opacity: 1;
}
.PortalsTable .InputText .__input::-moz-placeholder {
  color:  #525252;
  opacity: 1;
}
 .PortalsTable .InputText .__input:-ms-input-placeholder {
  color: #525252;
  opacity: 1;
}
.PortalsTable .InputText .__input:-moz-placeholder {
  color: #525252;
  opacity: 1;
}
.input-cus .InputText{
  border: 2px solid #E8E8E8;
} */
</style>
