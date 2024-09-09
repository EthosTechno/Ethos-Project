<template>
  <div class="SignInView">
    <div class="Form">
      <div v-if="isExpiredLink" class="__title expired-link-title">Your reset password link has expired</div>
      <div v-else>
        <div class="__title create-pass-title">Reset Password</div>
        <span class="toster-msg" v-if="errorMsg">{{ errorMsg }}</span>
        <form @submit.prevent="handleSubmit">
          <div class="inputs" :class="{ error: v$.loginForm.password.$errors.length }">
            <InputGroup v-if="showPassword" @keyup.enter="handleSubmit()" label="Password *"
              v-model="v$.loginForm.password.$model" :input-props="{
                type: 'text',
                placeholder: 'Password',
                complete: 'off',
              }" />
            <InputGroup v-else label="Password *" @keyup.enter="handleSubmit()" v-model="v$.loginForm.password.$model"
              :input-props="{
                type: 'password',
                placeholder: 'Password',
                complete: 'off',
              }" />
            <button type="button" class="button" @click="toggleShow">
              <span class="icon is-small is-right">
                <i class="fa" :class="{
                  'fa-eye-slash': showPassword,
                  'fa-eye': !showPassword,
                }"></i>
              </span>
            </button>
            <div class="input-errors" v-for="error of v$.loginForm.password.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>

          <div class="inputs" :class="{ error: v$.loginForm.confirmPassword.$errors.length }">
            <InputGroup @keyup.enter="handleSubmit()" label="Confirm Password *"
              v-model="v$.loginForm.confirmPassword.$model" :input-props="{
                type: 'password',
                placeholder: 'Confirm Password',
              }" />
            <div class="input-errors" v-for="error of v$.loginForm.confirmPassword.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>

          <ButtonBase class="__ButtonBase" @click="handleSubmit">
            Save Password
          </ButtonBase>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import InputGroup from "@/components/InputGroup.vue";
import ButtonBase from "@/components/ButtonBase.vue";
import useVuelidate from "@vuelidate/core";
import { required, helpers, sameAs } from "@vuelidate/validators";
import message from "../messages";
import { useToast } from "vue-toastification";
import setupProfileSvc from "../services/setup-profile.service";
import { useRoute } from "vue-router";
import router from "../router";

export default {
  components: {
    InputGroup,
    ButtonBase,
    setupProfileSvc,
  },

  setup() {
    const alpha = helpers.regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#`~()_+={}[\]?!@$%^&|\\:;"'<>,.?/'";"*-]).{8,}$/
    );
    const route = useRoute();
    return {
      v$: useVuelidate(),
      alpha,
      route,
    };
  },
  data() {
    return {
      loginForm: {
        password: "",
        confirmPassword: "",
      },
      submitStatus: null,
      showPassword: false,
      isExpiredLink: false,
      errorMsg: false
    };
  },
  validations() {
    return {
      loginForm: {
        password: {
          required: helpers.withMessage(message.password_required, required),
          alpha: helpers.withMessage(message.password_valid, this.alpha),
        },
        confirmPassword: {
          sameAsPassword: helpers.withMessage(
            message.confirm_password,
            sameAs(this.loginForm.password)
          ),
        },
      },
    };
  },
  methods: {
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    handleSubmit() {
      this.v$.$touch();
      if (this.v$.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        const body = {
          resetToken: this.route.params.token,
          password: this.loginForm.password,
          confirmPassword: this.loginForm.confirmPassword,
        };
        setupProfileSvc
          .ResetUserPassword(body)
          .then((res) => {
            useToast().success(res.data, { timeout: 5000 });
            router.push("/sign-in");
          })
          .catch((error) => {
            if (error.response.status === 404) {
              useToast().error("Invalid URL request", {
                timeout: 3000,
              });
            } else if (error.response.status == 401) {
              useToast().error("Your session is expired. Please login again.", {
                timeout: 3000,
              });
              localStorage.removeItem("user");
              router.push("sign-in");
            } else if (error.response.status == 400) {
              this.errorMsg = error.response.data.Errors[0]
            } else if (error.response.status == 500) {
              useToast().error("Sorry something went wrong", {
                timeout: 3000,
              });
            }
          });
      }
    },
  },

  beforeCreate() {
    setupProfileSvc.CheckResetPasswordLink(this.route.params.token).then((res) => {
      this.isExpiredLink = res.data;
    });
  }
};
</script>


<style scoped>
.button {
  position: absolute;
  top: 40px;
  right: 18px;
  background-color: transparent;
  border: 0;
  font-size: 15px;
}

.button:focus {
  outline: 0;
}

.inputs {
  position: relative;
  margin-bottom: 30px;
}

.error-msg {
  margin: 5px 0 5px 11px;
  text-align: left;
  color: red;
}

.SignInView {
  display: flex;
  min-height: 100vh;
  align-items: center;
  padding: 64px 32px;
  padding-top: 120px;
  background-size: cover;
  background-position: right top;
  background-repeat: no-repeat;
  background-image: url("@/assets/texture.png");
}

.Form {
  position: relative;
  width: 100%;
  max-width: 610px;
  margin: 0 auto;
  padding: 48px 32px;
  text-align: center;
  background-color: var(--color-white);
  border-radius: 25px;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.15);
}

.Form:before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 36px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url("@/assets/logo-portalcx.svg");
  transform: translateY(-180%);
}

.__title {
  padding-bottom: 32px;
  font-size: 28px;
  font-weight: 700;
}

.__ButtonBase {
  margin-top: 32px;
  padding: 20px 42px !important;
  height: auto !important;
}

.__ButtonBase:hover {
  background: #113a6b;
  color: #44ea9f;
  transition: all 400ms ease;
}

.expired-link-title {
  padding-bottom: 0;
  color: #E73B9A;
}

.create-pass-title {
  padding-bottom: 70px;
}

.signup-text {
  margin-top: 24px;
  font-weight: 400;
  font-size: 18px;
  line-height: 23px;
  text-align: center;
  color: #000000;
}

.signup-text .sign-up-link {
  color: #2784bf;
}

.signup-text .sign-up-link:hover {
  color: var(--color-green);
}

.toster-msg {
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  /* color: #E73B9A; */
  color: red;
  display: block;
  margin-bottom: 22px;
}

/* Desktop */
@media only screen and (min-width: 500px) {
  .Form {
    padding: 48px;
  }
}
</style>
