<template>
  <div class="main">
    <div class="main-sidebar"></div>
    <div class="portal-table">
      <div class="top-title">
        <div class="title">
          <!-- <h2>Explore Portals</h2> -->
        </div>
        <div class="top-button"></div>
      </div>
    </div>
    <!--Create Portal Start-->
    <div class="create-portal">
      <div class="portal-form-title">
        <h2>Create New Portal</h2>
      </div>
      <div class="close-button">
        <button type="button" class="close-btn" @click="handleClose">
          <span><img src="../assets/close-icon.png" alt="close icon" /></span>
       
        </button>
      </div>
      <div class="portal-new-form">
        <form  @submit.prevent="handleSubmit">
          <div class="form-items-main">
            <div
              class="form-items"
              :class="{ error: v$.createPortal.firstName.$errors.length }"
            >
              <label for="fname">First Name<span>*</span></label>
              <InputGroup
                id="firstName"
                v-model.trim="v$.createPortal.firstName.$model"
                @keydown.space.prevent
                @keydown="nameKeydown($event)"
                @blur="noSpace(createPortal.firstName)"
                :input-props="{
                  placeholder: 'First Name',
                  maxlength: '35',
                }"
              />
              <div
                class="input-errors"
                v-for="error of v$.createPortal.firstName.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>

            <div
              class="form-items"
              :class="{ error: v$.createPortal.lastName.$errors.length }"
            >
              <label for="lname">Last Name<span>*</span></label>
              <InputGroup
                v-model="v$.createPortal.lastName.$model"
                @keydown.space.prevent
                @change="nameKeydown($event)"
                @keydown="nameKeydown($event)"
                @blur="noSpace(createPortal.lastName)"
                :input-props="{
                  placeholder: 'Last Name',
                  maxlength: '35',
                }"
              />
              <div
                class="input-errors"
                v-for="error of v$.createPortal.lastName.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </div>
          <!--form-items-main-->
          <div class="form-items-main">
            <div
              class="form-items"
              :class="{ error: v$.createPortal.emailAdress.$errors.length }"
            >
              <label for="emailid">Email Address<span>*</span></label>

              <InputGroup
                v-model.trim="v$.createPortal.emailAdress.$model"
                :input-props="{
                  placeholder: 'Email Address',
                }"
              />
              <div
                class="input-errors"
                v-for="error of v$.createPortal.emailAdress.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>

            <div
              class="form-items"
              :class="{ error: v$.createPortal.phoneNumber.$errors.length }"
            >
              <label for="lname">Phone Number<span>*</span></label>

              <InputGroup
                v-model.trim="v$.createPortal.phoneNumber.$model"
                @keydown.space.prevent
                @keydown="phonemask()"
                :input-props="{
                  placeholder: 'Phone Number',
                  type: 'text',
                  maxlength: 14,
                  id: 'phone',
                  complete: 'off',
                }"
              />
              <div
                class="input-errors"
                v-for="error of v$.createPortal.phoneNumber.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </div>
          <!--form-items-main-->
          <div class="form-items-main">
            <div class="form-address">
              <label for="address">Address</label>

              <InputGroup
                v-model.trim="createPortal.address"
                :input-props="{
                  placeholder: 'Address',
                  maxlength: '255',
                }"
              />
            </div>
          </div>
          <div class="form-items-main">
            <div class="form-address">
              <InputGroup
                v-model.trim="createPortal.city"
                :input-props="{
                  placeholder: 'City',
                  maxlength: '75',
                }"
              />
            </div>
          </div>
          <!--form-items-main-->
          <div class="form-items-main">
            <div class="form-items">
              <InputGroup
                v-model.trim="createPortal.state"
                :input-props="{
                  placeholder: 'State',
                  maxlength: '75',
                }"
              />
            </div>

            <div
              class="form-items"
              :class="{ error: v$.createPortal.zipCode.$errors.length }"
            >
              <InputGroup
                v-model.trim="v$.createPortal.zipCode.$model"
                @keydown="zipKeydown($event)"
                :input-props="{
                  placeholder: 'Zip Code',
                  minLength: '5',
                  maxlength: '9',
                }"
              />
              <div
                class="input-errors"
                v-for="error of v$.createPortal.zipCode.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </div>
          <!--form-items-main-->
          <div class="form-items-main">
            <div
              class="projecttype"
              :class="{ error: v$.createPortal.projectTypeId.$errors.length }"
            >
              <label style="margin-bottom: 12px"
                >Project Type<span>*</span></label
              >
              <InputSelects
                v-model="v$.createPortal.projectTypeId.$model"
                :options="dateRangeOptions"
                auto-size="min"
                placement="bottom"
              />
              <div
                class="input-errors"
                v-for="error of v$.createPortal.projectTypeId.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </div>
          <!--form-items-main-->
          <div class="form-items-main updates-group-form"> 
            <label style="margin-bottom: 15px"
                >Updates Sent To Customer *
            </label>

            <div class="toggle-btn-main">
              <div class="Toggle">
                <span class="__label">Email </span>
                <InputToggle class="__InputToggle"  v-model="createPortal.isemailSend" @click="handleEmailChange(createPortal.isemailSend)"/>
              </div>
            </div>

            <div class="toggle-btn-main">
              <div class="Toggle">
                <span class="__label"> SMS </span>
                <InputToggle class="__InputToggle" v-model="createPortal.issmsSend" @click="handleSMSChange(createPortal.issmsSend)" />
              </div>
            </div>
            <div
                class="input-errors"
                v-if="errorMessage"
            >
              <div class="error-msg-toggle-point">Please select at least one option.</div>
            </div>


          </div>
          <!--form-items-main-->
          <div class="portal-button">
            <button class="cancel-btn" type="button" @click="handleCancel">Cancel</button>
            <button class="portal-btn" @submit.prevent="handleSubmit">
              Create Portal
            </button>
          </div>
        </form>
      </div>
      <!--portal-new-form-->
    </div>
  </div>
</template>
<script>
import Multiselect from "../components/Multiselect.vue";
import useVuelidate from "@vuelidate/core";
import InputGroup from "@/components/InputGroup.vue";
import InputSelects from "@/components/InputSelects.vue";
import { required, email, helpers, minLength } from "@vuelidate/validators";
import message from "../messages";
import portalService from "../services/portal.service";
import { reactive } from "vue";
import { useToast } from "vue-toastification";
import useEmitter from '@/composables/useEmitter';
import InputToggle from "@/components/InputToggle.vue";
export default {
  name: "CreatePortalModal",
  components: {
    Multiselect,
    InputGroup,
    InputSelects,
    InputToggle
  },
  emits: ["closed", "submitted"],

  setup() {
    const getInitialFormData = () => ({
      firstName: "",
      lastName: "",
      emailAdress: "",
      phoneNumber: "",
      address: "",
      state: "",
      city: "",
      zipCode: "",
      projectTypeId: "",
      isemailSend: true,
      issmsSend: true,
      
    });
    const emitter = useEmitter()
    return {
      v$: useVuelidate(),
      getInitialFormData,
      emitter
    };
  },
  mounted() {
    portalService.getProjectTypes().then((res) => {
      this.dateRangeOptions = res.data.data;
      if(res.status == 200){
        this.emitter.emit('noapiError');
      }
    });
  },
  data() {
    return {
      createPortal: reactive(this.getInitialFormData()),
      dateRangeOptions: [],
      setValue: false,
      setValue2: false,
      dropDown1Value: "Created Date",
      dropDown2Value: "Is",
      value: 0,
      value2: true,
      isRemove: false,
      isEmailSent: false,
      isTextSent: false,
      filterFeilds: [],
      isemailSend: true,
      issmsSend: true,
      errorMessage: false
    };
  },
  validations() {
    return {
      createPortal: {
        emailAdress: {
          required: helpers.withMessage(message.email_required, required),
          email: helpers.withMessage(message.email_valid, email),
        },
        firstName: {
          required: helpers.withMessage(message.firstName_required, required),
        },
        lastName: {
          required: helpers.withMessage(message.lastName_required, required),
        },
        phoneNumber: {
          required: helpers.withMessage(message.phoneNumber_required, required),
          // minLength: helpers.withMessage(message.phone_minLength, minLength(7)),
        },
        projectTypeId: {
          required: helpers.withMessage(message.projectType_required, required),
        },
        zipCode: {
          minLength: helpers.withMessage(
            message.zipCpde_minLength,
            minLength(5)
          ),
        },
      },
    };
  },
  methods: {
    phonemask() {
      document.getElementById("phone").addEventListener("input", function (e) {
        var x = e.target.value
          .replace(/\D/g, "")
          .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2]
          ? x[1]
          : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
      });
    },
    noSpace(value){
      if(value == this.createPortal.lastName){
        return this.createPortal.lastName = value.replace(/ /g, "")
      }else{
        return this.createPortal.firstName = value.replace(/ /g, "")
      }
    },
    nameKeydown(e) {
      if (!/[a-zA-Z0-9\s.'-]+$/.test(e.key)) {
        e.preventDefault();
      }
    },
    zipKeydown(e) {
      if (!/[a-zA-Z0-9\s-]+$/.test(e.key)) {
        e.preventDefault();
      }
    },
    handleCancel() {
      this.v$.$reset();
      Object.assign(this.createPortal, this.getInitialFormData());
      this.$emit("close");
    },
    handleEmailChange(value) {
      if(value == false) {
        if(this.createPortal.issmsSend == false){
          this.errorMessage = true;
        }
      } 
      else {
        this.errorMessage = false;
      }
    },
    handleSMSChange(value) {
      if(value == false) {
        if(this.createPortal.isemailSend == false){
          this.errorMessage = true;
        }
      } 
      else {
        this.errorMessage = false;
      }
    },
    sendWithoutMask(value){
      let val = value.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      return val[0];
    },
    getBody() {
      const formValue = this.createPortal;
      return {
        portalCustomerId: 0,
        projectId: formValue.projectTypeId,
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.emailAdress,
        phoneNumber: this.sendWithoutMask(formValue.phoneNumber),
        address: formValue.address,
        city: formValue.city,
        stateCode: formValue.state,
        notifyViaEmail: formValue.isemailSend,
        notifyViaSMS: formValue.issmsSend,
        zip: formValue.zipCode,
      };
    },
    handleClose() {
      this.v$.$reset();
      Object.assign(this.createPortal, this.getInitialFormData());
      this.$emit("close");
    },
    handleSubmit() {
      this.v$.$touch();
      if(this.createPortal.isemailSend == false && this.createPortal.issmsSend == false) {
        this.errorMessage = true;
      }
      else this.errorMessage = false;
      if (this.v$.$invalid || this.errorMessage) {
        this.submitStatus = "ERROR";
      }
      else {
        const body = this.getBody();
        portalService.submitCreatePortal(body).then((res) => {
          useToast().success(res, {
            timeout: 3000,
          });
          this.v$.$reset();
          this.isEmailSent = false;
          this.isTextSent = false;
          Object.assign(this.createPortal, this.getInitialFormData());
          this.$emit("close");
          this.emitter.emit('submitted');
        });
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap");

/* * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
} */

/* .main {
  width: 100%;
  margin-right: 60px;
  padding: 0 60px;
  position: relative;
} */

/* .main .main-sidebar {
  width: 75px;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
} */

.hide {
  display: none;
}

.portal-new-form {
  width: 100%;
  padding: 30px 0 0;
  background: #ffffff;
}

.portal-new-form form {
  position: relative;
}

/* .main .filter-overlay {
  width: 727px;
  height: 200px;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  position: absolute;
  left: auto;
  right: 60px;
  padding: 20px 32px;
} */

.main .create-portal {
  width: 617px;
  margin: 0 auto 30px;
  position: relative;
  padding: 0px;
  background: #f4f4f4;
}

.portal-form-title {
  width: 100%;
  padding: 30px 30px 0;
  background: #ffffff;
}

/* .__label[data-v-1002a485] {
  font-weight: 400 !important;
} */

.create-portal .form-items input[type="text"]{
  border: 1px solid #e5e5e5;
}
.create-portal .form-items input[type="text"]:focus{
  border-color: #30E694 !important;
}
.create-portal .portal-form-title h2 {
  color: var(--color-dark-blue);
  font-size: 24px;
  font-weight: 700;
  /* font-family: "Roboto", sans-serif; */
  line-height: 34px;
  text-align: left;
}

.create-portal .portal-form-title p {
  /* font-family: "Roboto", sans-serif; */
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #525252;
  text-align: left;
}

.main .create-portal .close-button {
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
  background: #fafafa;
  color: #fff;
}

.close-button button.close-btn span {
  font-size: 0;
  color: #525252;
}

.portal-new-form form label {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: #000000;
  text-align: left;
  margin-bottom: 10px;
}
.portal-new-form form label span{
  margin-left: 3px;
}

.form-items-main {
  width: 100%;
  display: flex;
  margin: 16px 0px;
  padding: 0 20px;
  position: relative;
}

.form-items-main .form-items {
  width: 50%;
  display: flex;
  justify-content: start;
  align-items: self-start;
  flex-direction: column;
  padding: 0 10px;
}
.form-items-main .form-items .InputGroup {
  width: 100%;
}
.create-portal .close-button i.fa.fa-close {
  color: #1c1c1c;
  font-size: 21px;
  line-height: 25px;
  padding: 4px 6px;
  border-radius: 50%;
  cursor: pointer;
}

.form-items input[type="text"] {
  width: 100%;
  background: transparent;
  /* border: 1px solid #e5e5e5; */
  border-radius: 100px;
  font-size: 16px;
  padding: 6px 15px;
  margin: 10px 0;
}

.form-items-main .form-address {
  width: 100%;
  display: grid;
}

.form-items-main .form-address label {
  width: 100%;
  padding-left: 10px;
}

.form-items-main .form-address input {
  background: transparent;
  border: 1px solid #e5e5e5;
  border-radius: 100px;
  font-size: 16px;
  padding: 6px 15px;
  margin: 16px 10px;
}

.form-items-main .form-items .InputText {
  height: 44px;
  border: none;
}

.form-items-main .form-address .InputText {
  border: none;
  height: 40px;
}

.normal_icon {
  position: absolute;
  left: auto;
  right: 44px;
  top: 53px;
}

.form-items-main .projecttype input {
  background: #fafafa;
  border: 1px solid #e5e5e5;
  border-radius: 100px;
  padding: 15px 15px;
  font-size: 16px;
  margin: 10px 0px;
}

.form-items-main .projecttype {
  display: block;
  width: 100%;
  margin-top: 0px;
  padding: 15px 10px;
}

.form-items-main .update {
  display: grid;
  width: 100%;
  margin: 0 0 30px 0px;
  padding: 0 10px;
}

.form-items-main .update input {
  background: #fafafa;
  border: 1px solid #e5e5e5;
  border-radius: 100px;
  padding: 15px 15px;
  font-size: 16px;
  margin: 16px 0px;
  position: relative;
}

.update-ites button.update-item-btn {
  width: auto;
  height: auto;
  left: 105px;
  top: 5.5px;
  background: #69b6f8;
  border-radius: 100px;
  border: none;
  margin-right: 10px;
  color: #fff;
  font-size: 16px;
  padding: 10px 22px;
}

.portal-button {
  width: 100%;
  left: 0px;
  background: #f4f4f4;
  border-top: 1px solid #e5e5e5;
  padding: 20px 30px;
  text-align: right;
  position: static;
  min-height: 77px;
}

.portal-button button.cancel-btn {
  font-size: 16px;
  font-weight: 500;
  line-height: 26px;
  color: #525252;
  padding: 0 10px;
  margin-right: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
}

.portal-button button.portal-btn {
  font-size: 16px;
  font-weight: 700;
  width: 138px;
  height: 41px;
  line-height: 26px;
  border: none;
  background: var(--color-green);
  border-radius: 100px;
  color: var(--color-dark-blue);
  margin-left: 10px;
  cursor: pointer;
}

.portal-button button.portal-btn.portal-btn:hover {
  background: #113a6b;
  color: #44ea9f;
  transition: all 400ms ease;
}

.projecttype span i {
  position: absolute;
  right: 46px;
  top: 58px;
  cursor: pointer;
}

.update span i {
  position: absolute;
  right: 46px;
  top: 50px;
  cursor: pointer;
}

.projecttype .project-list-item {
  width: 100%;
  height: auto;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-shadow: 0px 0px 15px rgb(0 0 0 / 15%);
  border-radius: 6px;
  padding: 20px;
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: self-start;
}

.project-list-item button.project-list-btn {
  width: 100%;
  padding: 10px 10px;
  margin: 3px 0;
  background: transparent;
  border: none;
  text-align: left;
  font-size: 16px;
  font-weight: 400;
  border-radius: 5px;
  position: relative;
  transition: 0.5s;
}

.project-list-item button.project-list-btn span {
  position: absolute;
  right: -30px;
  top: -64px;
}

.project-list-item button.project-list-btn:hover {
  background: #e5e5e5;
}

.Update-list-item {
  width: 100%;
  height: auto;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-shadow: 0px 0px 15px rgb(0 0 0 / 15%);
  border-radius: 6px;
  padding: 20px;
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: self-start;
}

.Update-list-item button.project-list-btn {
  width: 100%;
  padding: 10px 10px;
  margin: 8px px 0;
  background: transparent;
  border: none;
  text-align: left;
  font-size: 16px;
  font-weight: 400;
  border-radius: 5px;
  position: relative;
  transition: 0.5s;
}

.Update-list-item button.project-list-btn:hover {
  background: #e5e5e5;
}

.Update-list-item button.project-list-btn span {
  position: absolute;
  right: -30px;
  top: -64px;
}

.error-msg {
  margin: 5px 0 5px 11px;
  text-align: left;
  color: red;
  font-size: 14px;
  font-weight: 400;
}
.error-msg-toggle-point {
  margin: 0px 0 5px 2px;
  text-align: left;
  color: red;
  font-size: 14px;
  font-weight: 400;
}

.form-items-main .projecttype .DefaultLabel {
  box-shadow: none;
  background: transparent;
  border: 1px solid #e5e5e5;
  border-radius: 100px;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  padding: 10px 24px;
  margin: 10px 0;
}
.form-items-main .projecttype .DefaultLabel .__icon {
  margin-left: 0;
  margin-top: 0;
}
.form-items-main .multiselect {
  box-shadow: none;
  background: #fafafa;
  border: 1px solid #e5e5e5;
  border-radius: 100px;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  padding: 5px 24px;
}
.form-items-main .multiselect .multiselect-wrapper {
  min-height: auto;
}
.form-items-main .multiselect .multiselect-tags {
  padding-left: 0;
}
.form-items-main .multiselect .multiselect-tag {
  background: #69b6f8;
  padding: 5px 14px;
  border-radius: 100px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
}
.form-items-main .multiselect .multiselect-tag-remove {
  padding-right: 0;
  margin-right: 0;
}

.form-items-main .multiselect .multiselect-placeholder {
  padding-left: 0;
  color: #aeaeae;
}

.form-items-main .multiselect .multiselect-caret {
  margin-right: 0;
  background-color: #000;
  width: 11px;
  height: 22px;
}

.toggle-btn-main {
  display: flex;
  justify-content: flex-start;
  padding: 10px 0 30px;
}

.Toggle .__label {
  padding-right: 8px;
  font-family: "Source Sans Pro";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  color: #333333;
  vertical-align: middle;
}
.Toggle .__InputToggle {
  vertical-align: middle;
}
.updates-group-form{
  flex-direction: column;
  padding: 0 30px;
}
.updates-group-form .toggle-btn-main{
  padding: 0;
  margin-bottom: 15px;
}
.updates-group-form .Toggle{
  width: 224px;
  justify-content: space-between;
  display: flex;
  align-items: center;
}
.updates-group-form .Toggle .__label{
  font-weight: 400;
}
.updates-group-form .InputToggle{
  width: 28px !important;
  height: 17px !important;
  background: #E5E7EB !important;
}
.updates-group-form .InputToggle .__thumb{
  border: none;
  box-shadow: none;
  height: 15px;
  width: 15px;
  margin-top: 1px;
  margin-left: 1px;
}
.updates-group-form .InputToggle.isOn .__thumb{
  transform: translateX(calc(100% - 3px)) !important;
}

</style>