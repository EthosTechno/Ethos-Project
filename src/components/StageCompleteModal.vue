
<template>
    <div class="custom-model">
        <div class="close-button">
          <button type="button" class="close-btn" @click="handleClose">
              <span><img src="../assets/close-icon.png" alt="close icon" /></span>
          </button>
        </div>
        <div class="modal__content">
            <span class="modal__title">Confirm Complete Date:</span>
            <div class="btn-action-wrape" :class="{ error: v$.date.$errors.length }">
                <datepicker
                  placeholder="MM/DD/YYYY"
                  v-model="v$.date.$model"
                  :enableTimePicker="false"
                  auto-apply
                  input-class="my-picker-class"
                  utc
                />
                <div
                  class="input-errors"
                  v-for="error of v$.date.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
                <div class="toggle-btn-main" :class="totalItem > 10 ? '' : 'toggle_class'">
                  <div class="Toggle">
                    <span class="__label">Send Customer Portal Update?</span>
                    <InputToggle class="__InputToggle"
                    v-model="customerPortalToggalValue" />
                  </div>
                </div>
               <button type="button" class="btn-action" @click="handleUpdatePortal">Update Portal</button>
            </div>
        </div>
    </div>
</template>
<script>

import {ref,reactive} from 'vue'
import { useToast } from 'vue-toastification';
import datepicker from "@vuepic/vue-datepicker";
import InputToggle from "@/components/InputToggle.vue";
import { required,helpers } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import message from "../messages";
import useEmitter from '@/composables/useEmitter';

export default {
  name: "StageCompleteModal",
  components: {
    datepicker,
    InputToggle,
  },
  emits: ["updatePortal","closeNo"],
  setup() {
    const emitter = useEmitter()
    return {
      v$: useVuelidate(),
      useEmitter
    };
  },
  data() {
    return {
     date: '',
     customerPortalToggalValue: true
    };
  },
  validations() {
    return {
      date: {
          required: helpers.withMessage(message.confirm_complete_date_required, required),
        },
    };
  },
  methods: {
    handleUpdatePortal() {
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      }
      else{
        this.$emit('updatePortal',this.date,this.customerPortalToggalValue)
      }
    },
    resetFormValue() {
      this.date = ''
      this.customerPortalToggalValue = false
    },
    handleClose() {
      this.v$.$reset();
      this.resetFormValue();
      this.$emit('closeNo')
    }
  }
}

</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700&display=swap');
.modal__title {
  font-size: 1.5rem;
  font-weight: 700;
}
.close-button {
  position: absolute;
  width: 25px;
  height: 25px;
  right: -10px;
  top: -10px;
  background: #f4f4f4;
  border: 0px solid #000;
  left: auto;
  border-radius: 50%;
}

.close-button button.close-btn {
  background: transparent;
  border: none;
  width: 100%;
  position: absolute;
  left: 0;
  top: 4px;
  right: 0;
  bottom: 0;
  cursor: pointer;
  border-radius: 50%;
  transition: 0.5s;
}

.close-button button.close-btn img{
  width: 15px;
}

.close-button button.close-btn:hover {
  background: #fafafa;
  color: #fff;
}

.close-button button.close-btn span {
  font-size: 0;
  color: #525252;
}

.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}


.custom-model{
    background: #fff;
    box-shadow: 0px 20px 25px -5px rgba(16, 24, 40, 0.1), 0px 8px 10px -6px rgba(16, 24, 40, 0.1);
    border-radius: 6px;
    max-width: 205px;
    margin: 0 auto;
    position: fixed;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
}

.custom-model .modal__content{
  width: 100%;
  display: block;
  text-align: center;
}

.modal__title{
  font-family: 'Inter';
  display: block;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 175%;
  color: #000000;
  margin: 0 0 12px;
  text-align: left;
}

.btn-action-wrape{
  justify-content: center;
  display: flex;
  flex-direction: column;
}

.btn-action{
  background: #44EA9F;
  border-radius: 100px;
  color: #113A6B;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 175%;
  padding: 8px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ;
  width: 145px;
  height: 38px;
  margin-bottom: 4px;
}

.btn-action:hover{
  background: #113A6B;
  color: #44EA9F;
}
.custom-model .toggle-btn-main{
  margin-top: 25px;
}
.custom-model .Toggle{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}
.custom-model .toggle-btn-main .__label{
  font-weight: 500;
  font-family: 'Inter';
  font-size: 12px;
  line-height: 175%;
  color: #000000;
  max-width: calc(100% - 40px);
  display: block;
  white-space: break-spaces;
  text-align: left;
}
.custom-model .toggle-btn-main .InputToggle{
  height: 24px;
  width: 39px;
  border-radius: 28px;
  background: #E5E7EB;
}
.custom-model .toggle-btn-main .InputToggle.isOn{
  background: var(--color-green);
}

.error-msg {
  margin: 0px 0 -13px 1px;
  text-align: left;
  color: red;
  font-weight: 500;
  font-family: 'Inter';
  font-size: 12px;
}
</style>

<style>
.custom-model .toggle-btn-main .InputToggle .__thumb{
  background: #FFFFFF;
  border-radius: 75px;
  width: 22px;
  height: 22px;
  margin: 1px 0 0 1px;
  border: none;
  box-shadow: none;
}
.custom-model .toggle-btn-main .InputToggle.isOn .__thumb{
  transform: translateX(calc(100% - 7px));
}
.custom-model .dp__input{
  background: #FFFFFF;
  border: 1px solid #44EA9F;
  border-radius: 100px;
  padding: 11px 18px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #525252;
  text-align: center;
}
.custom-model .dp__input_icon{
  left: 6px;
  color: #525252;
}


</style>