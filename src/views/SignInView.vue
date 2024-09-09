<template>
  <div class="SignInView">
    <div class="Form">
      <div class="__title">
        Sign In
      </div>
      <span class="toster-msg" v-if="errorMsg">{{ errorMsg }}</span>
      <form @submit.prevent="handleSubmit">
        <div class="inputs" :class="{ error: v$.loginForm.email.$errors.length }">
          <InputGroup label="Email Address" @keyup.enter="handleSubmit()" v-model="v$.loginForm.email.$model"
            :input-props="{
              placeholder: 'Email',
            }" />
          <div class="input-errors" v-for="error of v$.loginForm.email.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

        <div class="inputs" :class="{ error: v$.loginForm.password.$errors.length }">
          <InputGroup v-if="showPassword" @keyup.enter="handleSubmit()" label="Password"
            v-model="v$.loginForm.password.$model" :input-props="{
              type: 'text',
              placeholder: 'Password',
            
            }" />
          <InputGroup v-else label="Password" @keyup.enter="handleSubmit()" v-model="v$.loginForm.password.$model"
            :input-props="{
              type: 'password',
              placeholder: 'Password',
            }" />
          <button type="button" class="button" @click="toggleShow"><span class="icon is-small is-right">
              <i class="fa" :class="{ 'fa-eye-slash': showPassword, 'fa-eye': !showPassword }"></i>
            </span>
          </button>
          <div class="input-errors" v-for="error of v$.loginForm.password.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
          <button @click="$router.push('/forgot-password')" class="forgot-password-btn" type="button">
            <span class="forgot-password">
              Forgot your password?
            </span>
          </button>
        </div>


        <ButtonBase class="__ButtonBase" @click="handleSubmit">
          Login<i class="fa-solid fa-arrow-right"></i>
        </ButtonBase>
      </form>
      <ul class="terms-main">
        <li><a :href="terms" target="_blank">Terms & Conditions</a></li>
        <li><a :href="privacy" target="_blank">Privacy Policy</a></li>
      </ul>
    </div>
  </div>
</template>


<script>
import InputGroup from '@/components/InputGroup.vue'
import ButtonBase from '@/components/ButtonBase.vue'
import store from '@/store/index.js';
import useVuelidate from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import message from '../messages'
import { useToast } from 'vue-toastification';


export default {
  components: {
    InputGroup,
    ButtonBase
  },

  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      },
      submitStatus: null,
      showPassword: false,
      errorMsg: false,
      terms: import.meta.env.VITE_APP_TERMS,
      privacy: import.meta.env.VITE_APP_PRIVACY
    }
  },
  validations() {
    return {
      loginForm: {
        email: {
          required: helpers.withMessage(message.email_required, required),
          email: helpers.withMessage(message.email_valid, email),
        },
        password: {
          required: helpers.withMessage(message.password_required, required),
        }
      }
    }
  },
  methods: {
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    handleSubmit() {
      this.v$.$touch()
      if (this.v$.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        store.dispatch('auth/login', this.loginForm).then((res) => {
          if (res) {
            localStorage.removeItem('setError');
            this.$router.push({
              name: 'overview',
            })
          }
          this.errorMsg = localStorage.getItem('setError');
        })
      }
    }
  },

  beforeCreate() {
    let sessionTimeOut = localStorage.getItem('sessionTimeout')

    if (sessionTimeOut) {
      useToast().error("Your session is expired. Please login again.", {
        timeout: 3000
      });
      localStorage.removeItem('sessionTimeout')
    }
  }

}
</script>


<style scoped>
.forgot-password-btn {
  background-color: transparent;
  position: absolute;
  right: 0;
  color: #2784bf;
}

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
  background-image: url('@/assets/texture.png');
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
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 36px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('@/assets/logo-portalcx.svg');
  transform: translateY(-180%);
}

.__title {
  padding-bottom: 32px;
  font-size: 28px;
  font-weight: 700;
}

.__ButtonBase {
  margin-top: 32px;
  height: auto !important;
  padding: 18px 70px 20px !important;
}

.__ButtonBase:hover {
  background: #113A6B;
  color: #44EA9F;
  transition: all 400ms ease;
}

.__ButtonBase i {
  vertical-align: -1px;
  margin-left: 6px;
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

.terms-main {
  display: flex;
  align-items: center;
  justify-content: center;
  list-style-type: none;
  padding: 0;
  margin: 15px 0 0;
}

.terms-main li {
  position: relative;
}

.terms-main li+li {
  padding-left: 12px;
  margin-left: 12px;
}

.terms-main li+li::before {
  position: absolute;
  content: "";
  left: 0;
  top: 2px;
  bottom: 2px;
  width: 1px;
  background: #888888;
}

.terms-main li a {
  color: #888888;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
}

.terms-main li a:hover {
  color: var(--color-green);
}

.forgot-password {
  float: right;
  margin: 10px;
  font-size: 16px;
}

button.forgot-password-btn:hover {
    color: var(--color-green);
}

/* Desktop */
@media only screen and (min-width: 500px) {
  .Form {
    padding: 48px;
  }
}
</style>
