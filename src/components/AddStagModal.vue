<template>
    <div class="custom-model">
        <div class="modal__content">
          <div class="modal-header">
            <span class="modal__title">Portal Project Stage</span>
            <div class="close-button">
              <button type="button" class="close-btn" @click="handleClose">
                  <span><img src="../assets/modal-head-close.png" alt="close" /></span>
              </button>
            </div>
          </div>

          <div class="content-part">

            <div class="portal-new-form">
              <form  @submit.prevent="handleSubmit">
                <div class="form-group" :class="{ error: v$.stageForm.stageName.$errors.length }">
                  <label>Stage Name *</label>
                  <input type="text" class="form-control" v-model.trim="v$.stageForm.stageName.$model" placeholder="Stage Name" maxlength="155">
                </div>
                <div
                  class="input-errors"
                  v-for="error of v$.stageForm.stageName.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
                <div class="form-group" :class="{ error: v$.stageForm.stageDescription.$errors.length }">
                  <label>Stage Description *</label>
                  <textarea class="form-control" rows="5" v-model.trim="v$.stageForm.stageDescription.$model" placeholder="Stage Description" maxlength="500"></textarea>
                </div>
                <div
                  class="input-errors"
                  v-for="error of v$.stageForm.stageDescription.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div> 
                <div class="form-group">
                  <label>Stage Prompt button copy</label>
                  <input type="text" class="form-control"  v-model="stageForm.stagePromptCopy" placeholder="Stage copy"  maxlength="30">
                </div>
               
                <div class="form-group">
                  <label>Stage Prompt button url</label>
                  <input type="text" class="form-control"  v-model.trim="stageForm.stagePromptUrl" placeholder="Stage url"  maxlength="255">
                </div>
              </form>
              <div class="btn-action-wrape">
                <button type="button" class="dlt-btn" @click="handleClose"><img src="../assets/modal-stage-detele.svg" alt="delete" /></button>
                <button  class="btn-action" @click="handleSubmit">Save Stage</button>
              </div>
            </div>

            
          </div>

        </div>
    </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import InputGroup from "@/components/InputGroup.vue";
import { required,  helpers } from "@vuelidate/validators";
import message from "../messages";
import {ref, reactive, computed, nextTick} from 'vue'
import projectStageService from "../services/projectStage.service";
import { useToast } from "vue-toastification";

export default {
  name: 'StageModal',
  components: {
    InputGroup,
  },
  emits:["close","closeNo"],
  props: {
    projectId:{
      type: Number, 
    },
    projectStageId: {
      type: Number,
    },
    editFormValue: {
      type: Object
    }
  },
  setup() {
    const getInitialFormData = () => ({
      stageName:'',
      stageDescription: '',
      stagePromptCopy: '',
      stagePromptUrl: ''
    });
    return {
      v$: useVuelidate(),
      getInitialFormData,
    };
  },

  data() {
    return {
      stageForm: reactive(this.getInitialFormData()),
      showModal: false,
    } 
    
  },
  validations() {
    return {
      stageForm: {
        stageName: {
          required: helpers.withMessage(message.stageName_requierd, required),
        },
        stageDescription: {
          required: helpers.withMessage(message.stageDesc_requierd, required)
        }
      },
    };
  },  
  methods: {
     editForm(value) {
        this.v$.stageForm.stageName.$model = value.stageName;
        this.stageForm.stageDescription = value.stageDescription ??  '' ;
        this.stageForm.stagePromptCopy = value.stagePromptButtonCopy ?? '';
        this.stageForm.stagePromptUrl = value.stagePromptButtonUrl ?? '';
    },
    handleSubmit() {
      this.v$.$touch();
      if (this.v$.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        const body = this.getBody();
        projectStageService.cretaeProjectSatge(body).then((res) => {
          useToast().success(res, {
            timeout: 3000,
          });
          this.v$.$reset();
          Object.assign(this.stageForm, this.getInitialFormData());
          this.$emit("close");
        });
      }
    },
    getBody() {
      const value = this.stageForm
      return {
        projectStageId: 0,
        projectId:  this.projectId,
        stageName: value.stageName,
        stageDescription: value.stageDescription,
        stagePromptButtonCopy: value.stagePromptCopy,
        stagePromptButtonUrl: value.stagePromptUrl
      }
    },
    handleClose() {
      this.v$.$reset();
      Object.assign(this.stageForm, this.getInitialFormData());
      this.$emit("closeNo");
    }
  }
}






</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700;1,900&display=swap');


.modal-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #113A6B;
  border-radius: 6px 6px 0px 0px;
  height: 50px;
  padding: 0 25px;
}
.modal-header .modal__title{
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #FFFFFF;
}

 .close-button {
  position: relative;
  top: 2px;
  right: -18px;
  height: 20px;
  width: 20px;
}

.close-button button.close-btn {
  background: transparent;
}

.close-button button.close-btn:hover {
  background: transparent !important;
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
    max-width: 520px;
    margin: 0 auto;
    position: fixed;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
}

.content-part{
  padding: 25px 50px;
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
  font-size: 18px;
  line-height: 28px;
  color: #111827;
}


.btn-action-wrape{
  justify-content: space-between;
  display: flex;
  padding: 10px 0;
}

.btn-action{
  background: #44ea9f;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 5%);
  border-radius: 40px;
  color: #113a6b;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px;
}
.btn-action:hover{
  background: #113a6b;
  color: #44ea9f;
  transition: all 400ms ease;
}

.dlt-btn{
  background: transparent;
}

.dlt-btn:hover{
  background: transparent;
}

.form-group{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 15px;
}

.form-group label{
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  /* text-transform: uppercase; */
  color: #111827;
  margin-bottom: 5px;
}

.form-group .form-control{
    width: 100%;
    background: #FFFFFF;
    border: 1px solid #D1D5DB;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 6px;
    padding: 5px 10px;
    height: 40px;
}

.form-group .form-control:focus{
  border: 1px solid #44EA9F;
}


.form-group textarea.form-control{
    height: 130px;
}

.error-msg {
  margin: -10px 0 10px 2px;
  text-align: left;
  color: red;
  font-size: 14px;
  font-weight: 400;
}

.custom-model .portal-new-form{
  padding: 10px 0 0;
}
.custom-model .portal-new-form .form-group .form-control{
  border-radius: 20px;
  padding: 10px 12px;
}
.custom-model .portal-new-form .form-group textarea{
  resize: none;
}
.custom-model .portal-new-form .form-group{
  margin-bottom: 20px;
}
</style>

