<template>
  <div class="custom-model">
    <div class="modal__content">
      <div class="modal-header">
        <span class="modal__title">{{ userId? 'Update User': 'Add New User' }}</span>
        <span class="modal_subtitle">Needs updated text</span>
        <div class="close-button">
          <button type="button" class="close-btn" @click="handleClose">
            <span><img src="../assets/close-icon.png" alt="close" /></span>
          </button>
        </div>
      </div>

      <div class="content-part">

        <div class="portal-new-form">
          <form @submit.prevent="handleSubmit">
            <div class="form-group" :class="{ error: v$.addUser.fname.$errors.length }">
              <label>First Name <span>*</span></label>
              <input type="text" class="form-control no_space" @blur="noSpace(addUser.fname)" @keydown.space.prevent @keydown="nameKeydown($event)" v-model.trim="v$.addUser.fname.$model" placeholder="First Name"
                maxlength="35">
              <div class="input-errors" v-for="error of v$.addUser.fname.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>


            <div class="form-group" :class="{ error: v$.addUser.lname.$errors.length }">
              <label>Last Name <span>*</span></label>
              <input type="text" class="form-control" @blur="noSpace(addUser.lname)" @keydown.space.prevent @keydown="nameKeydown($event)" v-model.trim="v$.addUser.lname.$model" placeholder="Last Name"
                maxlength="35">
              <div class="input-errors" v-for="error of v$.addUser.lname.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>

            <div class="form-group" :class="{ error: v$.addUser.email.$errors.length }">
              <label>Email Address <span>*</span></label>
              <input type="text" class="form-control" v-model.trim="v$.addUser.email.$model" placeholder="Email Address"
                maxlength="255">
              <div class="input-errors" v-for="error of v$.addUser.email.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="btn-action-wrape">
        <button type="button" class="dlt-btn" @click="handleClose">Cancel</button>
        <button class="btn-action" @click="handleSubmit">{{ userId? 'Update User': 'Add User' }}</button>
      </div>

    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, helpers, email } from "@vuelidate/validators";
import message from "../messages";
import { reactive, watch } from 'vue'
import companySettingsService from "../services/companySettings.service";
import { useToast } from "vue-toastification";

export default {
  name: 'AddUserModal',
  emits: ["close", "closeNo"],
  props: {
    userId: {
      type: Number,
    },
    editUserData: {
      type: Object,
    }
  },
  setup() {
    const getInitialFormData = () => ({
      fname: '',
      lname: '',
      email: '',
    });
    return {
      v$: useVuelidate(),
      getInitialFormData,
    };
  },

  data() {
    return {
      addUser: reactive(this.getInitialFormData()),
      editUserData: this.editUserData,
    }
  },
  watch: {
    editUserData: function () {
      this.addUser.fname = this.editUserData.firstName,
        this.addUser.lname = this.editUserData.lastName,
        this.addUser.email = this.editUserData.email
    }
  },

  validations() {
    return {
      addUser: {
        fname: {
          required: helpers.withMessage(message.firstName_required, required),
        },
        lname: {
          required: helpers.withMessage(message.lastName_required, required)
        },
        email: {
          required: helpers.withMessage(message.email_required, required),
          email: helpers.withMessage(message.email_valid, email),
        }
      },
    };
  },
  methods: {
    nameKeydown(e) {
      if (!/[a-zA-Z0-9\s.'-]+$/.test(e.key)) {
        e.preventDefault();
      }
    },
    noSpace(value){
      if(value == this.addUser.fname){
        return this.addUser.fname = value.replace(/ /g, "")
      }else{
        return this.addUser.lname = value.replace(/ /g, "")
      }
    },
    getBody() {
      const value = this.addUser
      return {
        userId: this.userId ?? null,
        firstName: value.fname,
        lastName: value.lname,
        email: value.email,
        HostName: window.location.host
      }
    },

    handleSubmit() {
      this.v$.$touch();
      if (this.v$.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        const body = this.getBody();
        companySettingsService.AddCompanyUser(body).then((res) => {
          useToast().success(res, {
            timeout: 3000,
          });
          this.v$.$reset();
          Object.assign(this.addUser, this.getInitialFormData());
          this.$emit("close");
        }).catch(() => {
        });
      }
    },

    handleClose() {
      this.v$.$reset();
      Object.assign(this.addUser, this.getInitialFormData());
      this.$emit("closeNo");
    }
  }
}






</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700;1,900&display=swap');


.modal-header {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  background: transparent;
  border-radius: 0px;
  padding: 30px 28px;
  position: relative;
}

.modal-header .modal__title {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  color: #113A6B;
  margin-bottom: 5px;
}

.modal-header .modal_subtitle {
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #525252;
}

.close-button {
  position: absolute;
  width: 44px;
  height: 44px;
  background: transparent;
  border: 1px solid #ddd;
  left: auto;
  right: 30px;
  top: 38px;
  border-radius: 50%;
}

.close-button button.close-btn {
  background: transparent;
  border: none;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
  border-radius: 50%;
  transition: 0.5s;
}

.close-button button.close-btn:hover {
  background: transparent !important;
}

.close-button button.close-btn img {
  padding-top: 4px;
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


.custom-model {
  background: #fff;
  box-shadow: 0px 20px 25px -5px rgba(16, 24, 40, 0.1), 0px 8px 10px -6px rgba(16, 24, 40, 0.1);
  border-radius: 0;
  max-width: 345px;
  margin: 0 auto;
  position: fixed;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  cursor: auto;
}

.content-part {
  padding: 0 30px 25px;
}

.custom-model .modal__content {
  width: 100%;
  display: block;
  text-align: center;
}

.modal__title {
  font-family: 'Inter';
  display: block;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  color: #111827;
}


.btn-action-wrape {
  justify-content: space-between;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F4F4F4;
  border-top: 1px solid #E5E5E5;
  padding: 18px 0;
}

.btn-action-wrape .dlt-btn {
  font-weight: 600;
  font-size: 14px;
  line-height: 175%;
  color: #525252;
  margin-right: 35px;
}

.btn-action {
  font-family: 'Inter';
  background: #44EA9F;
  border-radius: 100px;
  color: #113a6b;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 175%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 24px 9px;
}

.btn-action:hover {
  background: #113a6b;
  color: #44ea9f;
  transition: all 400ms ease;
}

.dlt-btn {
  background: transparent;
}

.dlt-btn:hover {
  background: transparent;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 15px;
}

.form-group label {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  /* text-transform: uppercase; */
  color: #111827;
  margin-bottom: 5px;
}

.form-group .form-control {
  width: 100%;
  background: #FFFFFF;
  border: 1px solid #D1D5DB;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 6px;
  padding: 5px 10px;
  height: 40px;
}

.form-group .form-control:focus {
  border: 1px solid #44EA9F;
}


.form-group textarea.form-control {
  height: 130px;
}

.error-msg {
  margin-top: 5px;
  text-align: left;
  color: red;
  font-size: 14px;
  font-weight: 400;
}

.custom-model .portal-new-form {
  padding: 10px 0 0;
}

.custom-model .portal-new-form .form-group .form-control {
  border-radius: 33px;
  padding: 10px 12px;
}

.custom-model .portal-new-form .form-group textarea {
  resize: none;
}

.custom-model .portal-new-form .form-group {
  margin-bottom: 20px;
}
</style>

