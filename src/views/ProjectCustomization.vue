<template>
  <div class="create-btn-main" :class="route.params.id ? '' : 'save-btn'">
    <a class="create-btn" @click="submitSave"
      >{{ route.params.id ? "Update" : "Save" }} and Continue
    </a>
  </div>

  <div class="StagesView">
    <div class="title">
      <router-link to="/stages" class="back-btn">
        <img src="../assets/back-Icon.svg" alt="create" />
      </router-link>
      Portal Project Customization
    </div>
  </div>

  <div class="project-custo-two">
    <div class="project-cust-one">
      <h2 class="sub-title">Customer Portal Information</h2>
      <div class="portal-new-form">
        <form @submit.prevent="submitSave" autocomplete="on">
          <div class="form-items-main">
            <div
              class="form-items"
              :class="{ error: v$.createProject.companyName.$errors.length }"
            >
              <label for="fname">Company Name<span>*</span></label>
              <InputGroup
                class="input-cus"
                id="companyName"
                v-model.trim="v$.createProject.companyName.$model"
                @keydown="nameKeydown($event)"
                :input-props="{
                  placeholder: 'Company Name',
                  maxlength: '155',
                }"
              />
              <div
                class="input-errors"
                v-for="error of v$.createProject.companyName.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>

            <div
              class="form-items"
              :class="{ error: v$.createProject.projectTitle.$errors.length }"
            >
              <label for="lname">Project Title<span>*</span></label>
              <InputGroup
                class="input-cus"
                v-model="v$.createProject.projectTitle.$model"
                @change="nameKeydown($event)"
                @keydown="nameKeydown($event)"
                :input-props="{
                  placeholder: 'Project Title',
                  maxlength: '155',
                }"
              />
              <div
                class="input-errors"
                v-for="error of v$.createProject.projectTitle.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>

            <div
              class="form-items"
              :class="{ error: v$.createProject.phoneNumber.$errors.length }"
            >
              <label for="lname">Phone Number<span>*</span></label>

              <InputGroup
                class="input-cus"
                v-model.trim="v$.createProject.phoneNumber.$model"
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
                v-for="error of v$.createProject.phoneNumber.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>

            <div
              class="form-items"
              :class="{ error: v$.createProject.emailAdress.$errors.length }"
            >
              <label for="emailid">Email Address<span>*</span></label>

              <InputGroup
                class="input-cus"
                v-model.trim="v$.createProject.emailAdress.$model"
                :input-props="{
                  placeholder: 'Email Address',
                }"
              />
              <div
                class="input-errors"
                v-for="error of v$.createProject.emailAdress.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div class="toggle-btn-main">
        <div class="Toggle">
          <span class="__label"> Enable Customer Referrals </span>
          <InputToggle class="__InputToggle" v-model="isCustomerReferrals" />
        </div>
      </div>
    </div>

    <div class="project-cust-two">
      <h2 class="sub-title">Customer Portal Branding</h2>

      <div class="prtal-two-part">
        <div class="prtal-part">
          <h3>Portal App Logo</h3>
          <p>
            Please upload a white transparant PNG logo for use in the Portal
            App.
          </p>

          <div class="drop-zone">
            <div class="drop-zone-content" v-if="!appLogoImage">
              <span class="drop-zone__prompt">Drag & Drop File<br />or</span>
              <span class="browse-file"
                ><img
                  src="../assets/browse-icon.svg"
                  alt="browse"
                />Browse</span
              >
              <input
                type="file"
                accept="image/*"
                @change="previewFiles"
                ref="appLogoUpload"
                name="myFile"
                class="drop-zone__input"
              />
            </div>

            <div class="drop-zone-img" v-if="appLogoImage">
              <button class="drop-delete-btn" @click="removeAppLogo">
                <svg
                  width="23"
                  height="24"
                  viewBox="0 0 23 24"
                  fill="red"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Group 9">
                    <path
                      id="Fill 1"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18.232 22.046H4.388L3.083 4.038H8.083H14.537H19.537L18.232 22.046ZM9.437 1H13.183L13.848 3.038H8.771L9.437 1ZM22.12 3.038H20.074H14.9L14.021 0.344C13.954 0.139 13.762 0 13.545 0H9.074C8.858 0 8.666 0.139 8.599 0.344L7.72 3.038H2.545H0.5C0.223 3.038 0 3.262 0 3.538C0 3.814 0.223 4.038 0.5 4.038H2.081L3.424 22.582C3.443 22.843 3.661 23.046 3.923 23.046H18.697C18.959 23.046 19.177 22.843 19.195 22.582L20.539 4.038H22.12C22.396 4.038 22.62 3.814 22.62 3.538C22.62 3.262 22.396 3.038 22.12 3.038Z"
                      fill="red"
                    />
                    <path
                      id="Fill 3"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.3194 6.0909C11.0434 6.0909 10.8194 6.3149 10.8194 6.5909V19.4189C10.8194 19.6949 11.0434 19.9189 11.3194 19.9189C11.5954 19.9189 11.8194 19.6949 11.8194 19.4189V6.5909C11.8194 6.3149 11.5954 6.0909 11.3194 6.0909Z"
                      fill="red"
                    />
                    <path
                      id="Fill 5"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M14.9864 19.9176C14.9974 19.9176 15.0084 19.9186 15.0204 19.9186C15.2804 19.9186 15.5014 19.7156 15.5184 19.4516L16.3724 6.6236C16.3904 6.3486 16.1824 6.1106 15.9064 6.0916C15.6394 6.0876 15.3924 6.2826 15.3744 6.5576L14.5204 19.3856C14.5024 19.6606 14.7114 19.8986 14.9864 19.9176Z"
                      fill="red"
                    />
                    <path
                      id="Fill 7"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.73197 6.0919C6.45697 6.1099 6.24797 6.3489 6.26597 6.6239L7.11997 19.4519C7.13697 19.7159 7.35697 19.9189 7.61797 19.9189C7.62897 19.9189 7.64097 19.9179 7.65197 19.9179C7.92697 19.8989 8.13597 19.6609 8.11797 19.3849L7.26397 6.5579C7.24597 6.2819 7.00197 6.0789 6.73197 6.0919Z"
                      fill="red"
                    />
                  </g>
                </svg>
              </button>
              <img :src="appLogoImage" alt="drop" />
            </div>
          </div>

          <div class="portal-color">
            <h3>Portal App Brand Color</h3>
            <p>
              Select a brand color or provide a custom HEX color to customize
              your Portals.
            </p>

            <div class="portal-color-box">
              <ul>
                <li @click="getColorCode('#F6402C')" class="color1"></li>
                <li @click="getColorCode('#EB2460')" class="color2"></li>
                <li @click="getColorCode('#6633B9')" class="color3"></li>
                <li @click="getColorCode('#3D4DB7')" class="color4"></li>
                <li @click="getColorCode('#1492F5')" class="color5"></li>
                <li @click="getColorCode('#1ABBD5')" class="color6"></li>
                <li @click="getColorCode('#46AF4A')" class="color7"></li>
                <li @click="getColorCode('#129687')" class="color8"></li>
                <li @click="getColorCode('#FEC100')" class="color9"></li>
                <li @click="getColorCode('#FD9802')" class="color10"></li>
                <li @click="getColorCode('#9D9D9D')" class="color11"></li>
                <li @click="getColorCode('#333333')" class="color12"></li>
              </ul>

              <div class="picker-color">
                <InputGroup
                  class="input-cus"
                  v-model="colorCode"
                  :input-props="{
                    placeholder: '# FFFFFF',
                  }"
                />
                <span
                  :style="`background: ${colorCode}`"
                  @click="openColorPicker()"
                ></span>
                <ColorPicker
                  alpha-channel="hide"
                  copy="hide"
                  @color-change="updateColor"
                  :visible-formats="['hex']"
                  v-if="colorPicker"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="prtal-part">
          <h3>Email Logo</h3>
          <p>
            Please upload a color transparant PNG logo for use in email
            comunications.
          </p>

          <div class="drop-zone">
            <div class="drop-zone-content" v-if="!emailLogoImage">
              <span class="drop-zone__prompt">Drag & Drop File<br/> or</span>
              <span class="browse-file"
                ><img
                  src="../assets/browse-icon.svg"
                  alt="browse"
                />Browse</span
              >
              <input
                type="file"
                accept="image/png, image/gif, image/jpeg, image/bmp"
                @change="previewEmailLogo"
                ref="emailLogoUpload"
                name="myFile"
                class="drop-zone__input"
              />
            </div>
            <div class="drop-zone-img" v-if="emailLogoImage">
              <button class="drop-delete-btn" @click="removeEmailLogo">
                <svg
                  width="23"
                  height="24"
                  viewBox="0 0 23 24"
                  fill="red"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Group 9">
                    <path
                      id="Fill 1"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18.232 22.046H4.388L3.083 4.038H8.083H14.537H19.537L18.232 22.046ZM9.437 1H13.183L13.848 3.038H8.771L9.437 1ZM22.12 3.038H20.074H14.9L14.021 0.344C13.954 0.139 13.762 0 13.545 0H9.074C8.858 0 8.666 0.139 8.599 0.344L7.72 3.038H2.545H0.5C0.223 3.038 0 3.262 0 3.538C0 3.814 0.223 4.038 0.5 4.038H2.081L3.424 22.582C3.443 22.843 3.661 23.046 3.923 23.046H18.697C18.959 23.046 19.177 22.843 19.195 22.582L20.539 4.038H22.12C22.396 4.038 22.62 3.814 22.62 3.538C22.62 3.262 22.396 3.038 22.12 3.038Z"
                      fill="red"
                    />
                    <path
                      id="Fill 3"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.3194 6.0909C11.0434 6.0909 10.8194 6.3149 10.8194 6.5909V19.4189C10.8194 19.6949 11.0434 19.9189 11.3194 19.9189C11.5954 19.9189 11.8194 19.6949 11.8194 19.4189V6.5909C11.8194 6.3149 11.5954 6.0909 11.3194 6.0909Z"
                      fill="red"
                    />
                    <path
                      id="Fill 5"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M14.9864 19.9176C14.9974 19.9176 15.0084 19.9186 15.0204 19.9186C15.2804 19.9186 15.5014 19.7156 15.5184 19.4516L16.3724 6.6236C16.3904 6.3486 16.1824 6.1106 15.9064 6.0916C15.6394 6.0876 15.3924 6.2826 15.3744 6.5576L14.5204 19.3856C14.5024 19.6606 14.7114 19.8986 14.9864 19.9176Z"
                      fill="red"
                    />
                    <path
                      id="Fill 7"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.73197 6.0919C6.45697 6.1099 6.24797 6.3489 6.26597 6.6239L7.11997 19.4519C7.13697 19.7159 7.35697 19.9189 7.61797 19.9189C7.62897 19.9189 7.64097 19.9179 7.65197 19.9179C7.92697 19.8989 8.13597 19.6609 8.11797 19.3849L7.26397 6.5579C7.24597 6.2819 7.00197 6.0789 6.73197 6.0919Z"
                      fill="red"
                    />
                  </g>
                </svg>
              </button>
              <img :src="emailLogoImage" alt="drop" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import useVuelidate from "@vuelidate/core";
import InputGroup from "@/components/InputGroup.vue";
// import { required, email, helpers, minLength } from "@vuelidate/validators";
import { required, email, helpers } from "@vuelidate/validators";
import message from "../messages";
import createProjectService from "../services/createProject.service";
import { reactive } from "vue";
import InputToggle from "@/components/InputToggle.vue";
import { useToast } from "vue-toastification";
import { ColorPicker } from "vue-accessible-color-picker";
import { useRoute } from "vue-router";

export default {
  name: "CreatePortalModal",
  components: {
    InputGroup,
    ColorPicker,
    InputToggle,
  },
  emits: "closed",

  setup() {
    const getInitialFormData = () => ({
      companyName: "",
      projectTitle: "",
      phoneNumber: "",
      emailAdress: "",
    });
    return {
      route: useRoute(),
      v$: useVuelidate(),
      getInitialFormData,
    };
  },
  mounted() {
    if (this.route.params.id) {
      createProjectService.GetProjectById(this.route.params.id).then((res) => {
        this.dateRangeOptions = res.data.data;
        this.getProjectData(this.dateRangeOptions);
      });
    }
  },
  data() {
    return {
      createProject: reactive(this.getInitialFormData()),
      dateRangeOptions: {},
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
      appLogoImage: null,
      appLogoImageUpload: null,
      emailLogoImageUpload: null,
      emailLogoImage: null,
      colorCode: "",
      colorPicker: false,
      isCustomerReferrals: false,
      isModifiedAppLogo: false,
      isModifiedEmailLogo: false,
    };
  },
  validations() {
    return {
      createProject: {
        companyName: {
          required: helpers.withMessage(message.company_name, required),
        },
        projectTitle: {
          required: helpers.withMessage(message.project_title, required),
        },
        phoneNumber: {
          required: helpers.withMessage(message.phoneNumber_required, required),
          // minLength: helpers.withMessage(message.phone_minLength, minLength(7)),
        },
        emailAdress: {
          required: helpers.withMessage(message.email_required, required),
          email: helpers.withMessage(message.email_valid, email),
        },
      },
    };
  },
  methods: {
    handleClickSave() {
      this.router.push("projectstage");
    },
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
    getPhoneMask(value) {
      let val = value.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      return !val[2] ? val[1] : "(" + val[1] + ") " + val[2] + (val[3] ? "-" + val[3] : "");
    },
    sendWithoutMask(value){
      let val = value.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      return val[0];
    },
    getProjectData(value) {
      this.v$.createProject.companyName.$model = value.companyName;
      this.v$.createProject.projectTitle.$model = value.title;
      this.v$.createProject.phoneNumber.$model = this.getPhoneMask(
        value.contactPhone
      );
      this.v$.createProject.emailAdress.$model = value.contactEmail;
      this.colorCode = value.color ?? "";
      this.appLogoImage =
        value.portalLogoURL != ""
          ?  value.portalLogoURL
          : "";
      this.emailLogoImage =
        value.emailLogoURL != ""
          ?  value.emailLogoURL
          : "";
      this.isCustomerReferrals = value.isCustomerReferrals;
    },
    getBody() {
      const formValue = this.createProject;
      return {
        companyId: 0,
        projectId: this.dateRangeOptions.projectId,
        companyName: formValue.companyName,
        name: "",
        title: formValue.projectTitle,
        contactPhone: formValue.phoneNumber.replace(/\D+/g, ""),
        contactEmail: formValue.emailAdress,
        color: this.colorCode,
        portalAppLogoUpload: this.appLogoImage,
        emailLogoUpload: this.emailLogoImage,
        isCustomerReferrals: this.isCustomerReferrals,
      };
    },
    previewFiles(event) {
      this.appLogoImageUpload = event.target.files[0];
      let file = event.target.files;
      if (
        file &&
        file[0] &&
        (file[0].type == "image/png" ||
          file[0].type == "image/gif" ||
          file[0].type == "image/jpeg" ||
          file[0].type == "image/bmp" ||
          file[0].type == "image/jpg" ||
          file[0].type == "image/svg+xml")
      ) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.appLogoImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.isModifiedAppLogo = true;
      } else {
        this.$refs.appLogoUpload.value = null;
        this.appLogoImageUpload = null;
        useToast().error("Only Image formats allowed.", {
          timeout: 3000,
        });
      }
    },
    previewEmailLogo(event) {
      this.emailLogoImageUpload = event.target.files[0];
      let file = event.target.files[0];
      if (
        file.type == "image/png" ||
        file.type == "image/gif" ||
        file.type == "image/jpeg" ||
        file.type == "image/bmp" ||
        file.type == "image/jpg"
      ) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.emailLogoImage = e.target.result;
        };
        reader.readAsDataURL(file);
        this.isModifiedEmailLogo = true;
      } else {
        this.$refs.emailLogoUpload.value = null;
        this.emailLogoImageUpload = null;
        useToast().error(
          "Only Image formats allowed except SVG file format.",
          {
            timeout: 3000,
          }
        );
      }
    },
    getColorCode(value) {
      this.colorCode = value;
    },
    validateColorCode(value) {
      let color = /^#([0-9a-f]{3}){1,2}$/i;
      if (!color.test(value)) {
        useToast().error("Invalid color code", { timeout: 3000 });
        return true;
      } else return false;
    },
    openColorPicker() {
      this.colorPicker = !this.colorPicker;
    },
    updateColor(eventData) {
      this.colorCode = eventData.cssColor;
    },
    removeAppLogo() {
      this.appLogoImage = null;
      this.isModifiedAppLogo = true;
    },
    removeEmailLogo() {
      this.emailLogoImage = null;
      this.isModifiedEmailLogo = true;
    },
    submitSave() {
      this.v$.$touch();
      if (this.v$.$invalid) {
        this.submitStatus = "ERROR";
      } 
      else if(this.colorCode && this.validateColorCode(this.colorCode)) {
        return;
      }
      else {
          const formValue = this.createProject;
          let formData = new FormData();
          formData.append("companyId", 0);
          formData.append("projectId", this.dateRangeOptions.projectId ?? '');
          formData.append("companyName", formValue.companyName);
          formData.append("name", "");
          formData.append("title", formValue.projectTitle);
          formData.append(
            "contactPhone",
            this.sendWithoutMask(formValue.phoneNumber)
          );
          formData.append("title", formValue.projectTitle);
          formData.append("contactEmail", formValue.emailAdress);
          formData.append("color", this.colorCode ?? null);
          formData.append("isLogoUpdate", this.isModifiedAppLogo);
          formData.append("isEmailLogoUpdate", this.isModifiedEmailLogo);
          formData.append("portalAppLogoUpload", this.appLogoImageUpload);
          formData.append("emailLogoUpload", this.emailLogoImageUpload);
          formData.append("isCustomerReferrals", this.isCustomerReferrals);
          createProjectService.createProject(formData).then((res) => {
            if (this.route.params.id) {
              useToast().success("Project updated successfully", {
                timeout: 3000,
              });
            } else {
              useToast().success("Project created successfully", {
                timeout: 3000,
              });
            }
            this.v$.$reset();
            Object.assign(this.createProject, this.getInitialFormData());
            this.$router.push(`/projectstage/${res}`);
          });
      }
    },
  },
};

/* Drop Zone */

/**
 * Updates the thumbnail on a drop zone element.
 *
 * @param {HTMLElement} dropZoneElement
 * @param {File} file
 */
function updateThumbnail(dropZoneElement, file) {
  let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

  // First time - remove the prompt
  if (dropZoneElement.querySelector(".drop-zone__prompt")) {
    dropZoneElement.querySelector(".drop-zone__prompt").remove();
  }

  // First time - there is no thumbnail element, so lets create it
  if (!thumbnailElement) {
    thumbnailElement = document.createElement("div");
    thumbnailElement.classList.add("drop-zone__thumb");
    dropZoneElement.appendChild(thumbnailElement);
  }

  thumbnailElement.dataset.label = file.name;

  // Show thumbnail for image files
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
    };
  } else {
    thumbnailElement.style.backgroundImage = null;
  }
}
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Roboto:ital,wght@0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700&family=Source+Sans+3:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Source+Sans+Pro:ital,wght@0,300;0,400;0,600;0,700;0,900;1,300;1,400;1,600;1,700&display=swap");
.title {
  color: #113a6b;
  font-style: normal;
  font-weight: 700;
  font-size: 34px;
  line-height: 22px;
  margin: 20px 0 50px;
  display: flex;
  flex-direction: column;
}
.create-btn-main {
  width: 100%;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  margin-top: -50px;
}
.create-btn {
  background: #44ea9f;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 40px;
  color: #113a6b;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;
  width: auto;
  min-width: 205px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  transition: all 400ms ease;
  cursor: pointer;
}
.save-btn .create-btn {
  justify-content: center;
}
.create-btn:hover {
  background: #113a6b;
  color: #44ea9f;
  transition: all 400ms ease;
}

.back-btn {
  margin-top: -45px;
  margin-bottom: 20px;
  display: inline-block;
  width: 28px;
  height: 25px;
}

.project-custo-two {
  display: flex;
  gap: 8%;
  padding-bottom: 50px;
}
.project-custo-two .project-cust-one .portal-new-form{
  padding: 0;
}
.sub-title {
  color: #333333;
  font-style: normal;
  font-weight: 700;
  font-size: 21px;
  line-height: 22px;
  margin: 10px 0 50px;
}

.portal-new-form .form-items input[type="text"]{
  border: 1px solid #e5e5e5;
}
.portal-new-form .form-items input[type="text"]:focus{
  border-color: #30E694 !important;
}

.project-cust-one {
  width: 40%;
}

.project-cust-two {
  width: 60%;
}

.prtal-two-part {
  display: flex;
  gap: 10%;
}
.prtal-two-part .prtal-part {
  width: 50%;
  display: flex;
  flex-direction: column;
}

.prtal-two-part h3 {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #333333;
}
.prtal-two-part p {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #888888;
  margin: 5px 0;
  min-height: 32px;
}

.portal-new-form form label {
  color: #333333;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  text-align: left;
  margin-bottom: 10px;
  display: inline-block;
}
.portal-new-form form label span{
  margin-left: 3px;
}
.form-items-main {
  flex-direction: column;
  padding: 0;
}

.form-items-main .form-items {
  width: 100%;
  padding: 0;
}
.form-items-main .form-items .InputGroup {
  width: 100%;
}

.form-items-main .form-items {
  margin-bottom: 20px;
}

.portal-color {
  margin-top: 50px;
}
.portal-color-box {
  max-width: 230px;
  margin-top: 20px;
}
.portal-color-box ul {
  display: flex;
  gap: 4%;
  padding: 0;
  flex-wrap: wrap;
}
.portal-color-box ul li {
  width: 30px;
  height: 30px;
  background: #f6402c;
  border-radius: 26px;
  overflow: hidden;
  margin: 5px 0;
  cursor: pointer;
}
.portal-color-box ul li.color1 {
  background: #f6402c;
}
.portal-color-box ul li.color2 {
  background: #eb2460;
}
.portal-color-box ul li.color3 {
  background: #6633b9;
}
.portal-color-box ul li.color4 {
  background: #3d4db7;
}
.portal-color-box ul li.color5 {
  background: #1492f5;
}
.portal-color-box ul li.color6 {
  background: #1abbd5;
}
.portal-color-box ul li.color7 {
  background: #46af4a;
}
.portal-color-box ul li.color8 {
  background: #129687;
}
.portal-color-box ul li.color9 {
  background: #fec100;
}
.portal-color-box ul li.color10 {
  background: #fd9802;
}
.portal-color-box ul li.color11 {
  background: #9d9d9d;
}
.portal-color-box ul li.color12 {
  background: #333333;
}

.picker-color {
  position: relative;
  margin-top: 10px;
}

.picker-color span {
  width: 35px;
  height: 35px;
  background: #ffffff;
  border: 2px solid #e8e8e8;
  border-radius: 26px;
  position: absolute;
  right: 6px;
  top: 6px;
  cursor: pointer;
}

.drop-zone {
  width: 100%;
  height: 180px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: "Quicksand", sans-serif;
  font-weight: 500;
  font-size: 20px;
  cursor: pointer;
  color: #cccccc;
  background: #ffffff;
  border: 2px dashed #a5a5a5;
  border-radius: 6px;
  position: relative;
  flex-direction: column;
  margin-top: 10px;
}

/* .drop-zone-img{
  display: none;
} */
.drop-zone-img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.drop-zone-img {
  height: 100%;
  width: 100%;
}

.drop-zone__prompt {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #333333;
}

.browse-file {
  border: 2px solid #e8e8e8;
  border-radius: 26px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  color: #333333;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 115px;
  height: 38px;
  margin-top: 5px;
}

.browse-file img {
  margin-right: 10px;
}

.drop-zone--over {
  border-style: solid;
}

.drop-zone__input {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
}

.drop-zone__thumb {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  background-color: #cccccc;
  background-size: cover;
  position: relative;
}

.drop-zone__thumb::after {
  content: attr(data-label);
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 5px 0;
  color: #ffffff;
  background: rgba(0, 0, 0, 0.75);
  font-size: 14px;
  text-align: center;
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

.__empty {
  padding: 12px 20px;
  color: var(--color-mute);
}

.drop-delete-btn {
  background: #113a6b;
  padding: 2px;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 5px;
  right: 5px;
  transition: all 400ms ease;
}

.drop-delete-btn svg {
  width: 15px;
}

.drop-delete-btn svg g {
  fill: #fff;
  stroke: #fff;
}

.drop-delete-btn:hover {
  background: #44ea9f;
  transition: all 400ms ease;
}

.drop-delete-btn:hover svg g {
  fill: #113a6b;
  stroke: #113a6b;
}

.error-msg {
  margin: 5px 0 5px 11px;
  text-align: left;
  color: red;
  font-size: 14px;
  font-weight: 400;
}

::v-deep .vacp-copy-button {
  display: none;
}
</style>