<template>
  <div class="CompanyInfoView">
    <div class="form">
      <form @submit.prevent="submitSave" autocomplete="on">
        <div class="form-items" :class="{ error: v$.companySettings.companyName.$errors.length }">
          <div class="__leading">

            <InputGroup :label="'Company Name *'" :input-props="{
            
              placeholder: 'Company Name',
              maxlength: '155',
            }" v-model.trim="v$.companySettings.companyName.$model" />
            <div class="input-errors" v-for="error of v$.companySettings.companyName.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>

        </div>

        <div class="form-items" :class="{ error: v$.companySettings.contactName.$errors.length }">
          <div class="__leading">

            <InputGroup :label="'Contact Name *'" :input-props="{
              placeholder: 'Contact Name',
              maxlength: '70',
            }" v-model.trim="v$.companySettings.contactName.$model" />
            <div class="input-errors" v-for="error of v$.companySettings.contactName.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
        </div>

        <div class="form-items" :class="{ error: v$.companySettings.emailAdress.$errors.length }">
          <div class="__leading">

            <InputGroup :label="'Email Address *'" :input-props="{
              placeholder: 'Email Address'
            }" v-model.trim="v$.companySettings.emailAdress.$model" />
            <div class="input-errors" v-for="error of v$.companySettings.emailAdress.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
        </div>

        <div class="form-items" :class="{ error: v$.companySettings.phoneNumber.$errors.length }">
          <div class="__leading">

            <InputGroup :label="'Phone Number *'" @keydown="phonemask()" :input-props="{
              placeholder: 'Phone Number',
              type: 'text',
              maxlength: 14,
              id: 'phone',
            }" v-model.trim="v$.companySettings.phoneNumber.$model" />
            <div class="input-errors" v-for="error of v$.companySettings.phoneNumber.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
        </div>

        <!-- <div class="form-items" :class="{ error: v$.companySettings.password.$errors.length }">
          <div class="__leading">

            <InputGroup :label="'Password *'" :input-props="{
              placeholder: 'Password',
              type: 'text',
              maxlength: 14,
            }" v-model.trim="v$.companySettings.password.$model" />
            <div class="input-errors" v-for="error of v$.companySettings.password.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
        </div> -->
      </form>
    </div>

    <ButtonBase class="btn-action" @click="handleSubmit">
      Save Changes
    </ButtonBase>
  </div>
</template>


<script>
import InputGroup from '@/components/InputGroup.vue'
import ButtonBase from '@/components/ButtonBase.vue'
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import { reactive } from "vue";
import { useToast } from "vue-toastification";
import message from '../../messages';
import companySettingsService from '../../services/companySettings.service';
export default {
  components: {
    InputGroup,
    ButtonBase
  },
  setup() {
    const getInitialFormData = () => ({
      companyName: "",
      contactName: "",
      emailAdress: "",
      phoneNumber: "",
      // password: "",
    });

    return {
      v$: useVuelidate(),
      getInitialFormData,
    }

  },

  data() {
    return {
      companySettings: reactive(this.getInitialFormData()),
      companyData: {},
      companyAllData : {}
    }
  },

  mounted() {
    companySettingsService.GetCompanyById().then((res) => {
      this.companyData = res.data.data.companyId;
      this.companyAllData = res.data.data;
      this.getCompanyData(this.companyAllData);
    });
  },

  validations() {
    return {
      companySettings: {
        companyName: {
          required: helpers.withMessage(message.company_name, required),
        },
        contactName: {
          required: helpers.withMessage(message.contact_name_required, required),
        },
        emailAdress: {
          required: helpers.withMessage(message.email_required, required),
          email: helpers.withMessage(message.email_valid, email),
        },
        phoneNumber: {
          required: helpers.withMessage(message.phoneNumber_required, required),
          // minLength: helpers.withMessage(message.phone_minLength, minLength(7)),
        },
        // password: {
        //   required: helpers.withMessage(message.password_required, required),
        // },
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
    sendWithoutMask(value) {
      let val = value.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      return val[0];
    },
    getPhoneMask(value) {
      let val = value.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      return !val[2] ? val[1] : "(" + val[1] + ") " + val[2] + (val[3] ? "-" + val[3] : "");
    },
    getBody() {
      const formValue = this.companySettings;
      return {
        companyId: this.companyData,
        companyName: formValue.companyName,
        contactName: formValue.contactName,
        phoneNumber: this.sendWithoutMask(formValue.phoneNumber),
        emailAddress: formValue.emailAdress,
      };
    },
    getCompanyData(value) {
      this.v$.companySettings.companyName.$model = value.companyName;
      this.v$.companySettings.contactName.$model = value.contactName;
      this.v$.companySettings.phoneNumber.$model = this.getPhoneMask(
        value.phoneNumber
      );
      this.v$.companySettings.emailAdress.$model = value.emailAddress;
    },
    handleSubmit() {
      this.v$.$touch();
      if (this.v$.$invalid) {
        this.submitStatus = "ERROR";
      }

      else {
        const body = this.getBody();
        companySettingsService.UpdateCompanyInfo(body).then((res) => {
          useToast().success(res, {
            timeout: 3000,
          });

          this.v$.$reset();
          // Object.assign(this.companySettings, this.getInitialFormData());
        });
      }
    },
  }

}
</script>


<style scoped>
.form {
  max-width: 356px;
}

.__leading,
.__trailing {
  padding-bottom: 20px;
}

.CompanyInfoView .__leading .InputGroup+.InputGroup {
  margin-top: 28px;
}

.error-msg {
  margin: 5px 0 5px 11px;
  text-align: left;
  color: red;
  font-size: 14px;
  font-weight: 400;
}

.btn-action:hover {
  background: #113a6b;
  color: #44ea9f;
  transition: all 400ms ease;
}

@media only screen and (min-width: 700px) {
  
  .__trailing {
    padding-left: 20px;
  }
}
</style>
