
<template>
  
    <div class="custom-model">
        <div class="close-button">
          <button type="button" class="close-btn" @click="handleClose">
              <span><img src="../assets/close-icon.png" alt="close icon" /></span>
          
          </button>
        </div>
        <div class="modal__content">
            <img src="../assets/reactive-Icon.svg" alt="delete"/>
            <span class="modal__title">Do you want to {{statusChange ? 'deactive' : 'reactive'}} <br> this project?</span>
            <div class="btn-action-wrape">
               <button type="button" class="btn-action" @click="handleSubmitClick">Yes</button>
               <button type="button" class="btn-action" @click="handleClose">No</button>
            </div>
        </div>
    </div>
</template>
<script setup>

import {ref} from 'vue'
import { useToast } from 'vue-toastification';
import createProjectService from '../services/createProject.service';
const emit = defineEmits([
  'close','closeNo'
])

const props = defineProps({
  projectId: {
    type: Number,
    requuired: true
  },
  statusChange: {
    type: Boolean, 
  } 
})

const handleClose = () =>  {
 emit('closeNo')
}



const handleSubmitClick = () => {
  createProjectService.projectStatusChange(props.projectId).then((res) => {
    useToast().success(res.data,{
            timeout: 3000});
    emit('close')
  }).catch((error) => {
    emit('closeNo')
  })

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
    max-width: 280px;
    margin: 0 auto;
    position: fixed;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    padding: 20px;
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
  margin: 10px 0 20px;
}


.btn-action-wrape{
  justify-content: center;
  display: flex;
  flex-direction: column;
}

.btn-action{
  background: #FFFFFF;
  border: 1px solid #D1D5DB;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 6px;
  color: #113A6B;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0;
  height: 38px;
}


.btn-action:hover{
  background: #E3201C;
  color: #fff;
}

</style>

