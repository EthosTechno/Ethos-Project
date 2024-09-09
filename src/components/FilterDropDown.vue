<template>
  <VDropdown class="FilterDropDown" placement="top-end" :auto-size="autoSize" :distance="4"
    @apply-show="handleOpenDropdown" @apply-hide="handleCloseDropdown">
    <template v-slot:default="{ show }">
      <div ref="labelRef" tabindex="0" @keydown.prevent.space.enter="show()" @focus="handleFocusLabel"
        @blur="handleBlurLabel">
        <slot name="label">
          <div class="DefaultLabel">
            <img src="../assets/filter-icon.svg" alt="FilterIcon" />Filters ({{
              filterLength
            }})
          </div>
        </slot>
      </div>
    </template>

    <template v-slot:popper>
      <div class="detail-section main">
        <div class="filter">
          <div class="filter-title">
            <h3>Filter</h3>
          </div>

          <div class="filter-detail">
            <div class="f-detail" v-for="(item, index) in form" :key="item">
              <h4>{{ index == 0 ? "Where" : "AND" }}</h4>
              <div class="dropdown create-date-dropdown">
                <InputSelect v-model="item.field" :options="filteDropDownValue.dateRangeOptions"
                  @update:model-value="changeDropDownValue(item.field, index)" auto-size="min" placement="bottom" />
              </div>

              <div class="dropdown is-drop">
                <InputSelect v-model="item.isEqual" :options="filteDropDownValue.secondDropDown" auto-size="min"
                  placement="bottom" />
              </div>

              <div class="dropdown date-drop" :class="item.date" v-if="item.field === 0 || item.field === 1">
                <daterangepicker v-model="item.date" range @update:model-value="changeEvenet" :max-date="currentDate"
                  :enableTimePicker="false" input-class="my-picker-class" />
              </div>

              <div class="dropdown date-drop" v-else-if="item.field == 2">
                <!-- <InputSelect
                v-model="item.value"
                @update:model-value="changeEvenet()"
                :options="filteDropDownValue.statusDropDownName"
                :status="true"
                auto-size="min"
                placement="bottom"
              /> -->
                <InputSelectMulti v-model="item.StatusValues" @update:modelValue="changeEvenet" :prvSelected="item.StatusValues"
                  :options="filteDropDownValue.statusDropDownName" :status="true" auto-size="min" placement="bottom" />
              </div>

              <div class="dropdown date-drop" v-else-if="item.field == 3">
                <!-- <div class="update">
                  <Multiselect v-model="item.StageValue" @clear="deselectTage(value, select$)"
                    @update:model-value="changeEvenet()" :options="uploadCustomerSent" :searchable="true">
                    
                  </Multiselect>
                  
                </div> -->
                <InputSelectMulti v-model="item.StageValue" @update:modelValue="changeEvenet"  :prvSelected="item.StageValue"
                  :options="uploadCustomerSent" :status="false" auto-size="min" placement="bottom" />
              </div>
              <div class="close-button2" v-if="index > 0">
                <button class="close-btn" @click="remove(index)">
                  <i class="fa fa-trash"></i>
                </button>
              </div>

            </div>

            <div class="f-button">
              <div class="add-filter-button">
                <button class="add-btn" @click="addClick()" :disabled="addMoreLine">
                  Add Filter <span><i class="fa fa-plus"></i></span>
                </button>
              </div>
              <div class="apply-button">
                <button class="apply-btn" :class="{ isActive: status }" :disabled="status" v-close-popper
                  @click="applyFilter" @apply-hide="handleCloseDropdown">
                  Apply</button><span class=""></span>
                <button class="clear-btn" @click="resetForm()">Clear</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </VDropdown>
</template>


<script setup>
import { ref, reactive } from "vue";
import InputSelectMulti from "@/components/InputSelectMulti.vue";
import InputSelect from "@/components/InputSelect.vue";
// import Multiselect from "../components/Multiselect.vue";
import daterangepicker from "@vuepic/vue-datepicker";
import filteDropDownValue from "../dummy/filter-dropdown-value";
import portalService from "../services/portal.service";
import useEmitter from '@/composables/useEmitter'


const emit = defineEmits(["applyFilter"]);
const status = ref(true);
const filterLength = ref(0);
const labelRef = ref(null);
const isLabelFocused = ref(false);
const currentDate = ref(new Date());
const addMoreLine = ref(false);
const oldformValue = ref([]);
const emitter = useEmitter()

// const formValue = ref([]);

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
    required: true,
  },
  placement: {
    type: String,
    default: "bottom-start",
  },
  autoSize: {
    type: [Boolean, String],
    default: false,
    validator: (val) =>
      typeof val === "boolean" || ["min", "max"].includes(val),
  },
});
let uploadCustomerSent = ref([]);
const formInitialize = {
  field: 0,
  isEqual: true,
  StatusValues: null,
  date: null,
  isApplyFilter: false,
  StageValue: [],
};
emitter.on("noapiError", () => {      
  portalService.getStageData().then((res) => {
    uploadCustomerSent.value = res.data.data;
  });
})

let form = reactive([formInitialize]);
const resetForm = () => {
  form.length = 0;
  form.push({
    field: 0,
    isEqual: true,
    StatusValues: [],
    date: null,
    isApplyFilter: false,
    StageValue: [],
  });
  emit("applyFilter", []);
  addMoreLine.value = false;
  filterLength.value = 0;
  status.value = true;
};

const changeEvenet = () => {
  for (let i = 1; i <= form.length; i++) {
    if (form[i - 1].field == 0 || form[i - 1].field == 1) {
      if (form[i - 1].date !== null) {
        if (form[i - 1].date[0] != null && form[i - 1].date[1] != null) {
          status.value = false;
        } else {
          status.value = true;
          break;
        }
      } else if (form[i - 1].date == null) {
        status.value = true;
        break;
      }
    } else if (form[i - 1].field == 2) {
      if (form[i - 1].StatusValues.length > 0) {
        if (form[i - 1].StatusValues.length > 0) status.value = false;
      } else if (form[i - 1].StatusValues.length == 0) {
        status.value = true;
        break;
      }
    } else if (form[i - 1].field == 3) {
      if (form[i - 1].StageValue.length > 0) {
        status.value = false;
      } else if (form[i - 1].StageValue.length == 0) {
        status.value = true;
        break;
      }
    } else {
      status.value = true;
      break;
    }
  }
};

const changeDropDownValue = (value, index) => {
  status.value = true;
  if (form[index].field == 0 || form[index].field == 1) {
    form[index].date = null;
    form[index].isEqual = true 
  } else if (form[index].field == 2) {
    form[index].StatusValues = [];
    form[index].isEqual = true
  }
  else if(form[index].field == 3) {
    form[index].StageValue = [];
    form[index].isEqual = true
  }
};

const addClick = () => {
  if (form.length < 6) {
    if (form.length == 5) addMoreLine.value = true;
    form.push({
      field: 0,
      isEqual: true,
      StatusValues: null,
      date: null,
      isApplyFilter: false,
      StageValue: [],
    });
    status.value = true;
  }
};
const remove = (index) => {
  form.splice(index, 1);
  if (form.length < 6) addMoreLine.value = false;
  for (let i = 1; i <= form.length; i++) {
    if (form[i - 1].field == 0 || form[i - 1].field == 1) {
      if (form[i - 1].date !== null) {
        if (form[i - 1].date[0] != null && form[i - 1].date[1] != null) {
          status.value = false;
        } else {
          status.value = true;
          break;
        }
      } else if (form[i - 1].date == null) {
        status.value = true;
        break;
      }
    } else status.value = false;
  }
};

// eslint-disable-next-line no-unused-vars
const handleInput = (option) => {
  emit("update:modelValue", option);
};

const optionsRef = ref([]);
const handleOpenDropdown = () => { };

// eslint-disable-next-line no-unused-vars
const focusOption = (optionIndex) => {
  optionsRef.value[optionIndex].focus();
};

const handleCloseDropdown = () => { };

const handleFocusLabel = () => {
  isLabelFocused.value = true;
};

const handleBlurLabel = () => {
  isLabelFocused.value = false;
};

const applyFilter = () => {
  form.reduce((acc, item) => {
    item.isApplyFilter = true;
  }, []);
  oldformValue.value = form;
  emit("applyFilter", oldformValue.value);
  filterLength.value = form.length;
  handleCloseDropdown();
};
const show = () => {
};
</script>


<style scoped>
.DefaultLabel {
  --default-label-height: 38px;
  padding: 5px 20px;
  font-weight: 500;
  font-size: 12px;
  line-height: 175%;
  white-space: nowrap;
  text-overflow: ellipsis;
  background-color: transparent;
  border: 1px solid #e5e5e5;
  border-radius: 100px;
  color: #525252;
  /* box-shadow: inset 0 0 0 2px var(--color-light); */
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}

.DefaultLabel:hover {
  background: #f5f5f5;
}

.DefaultLabel .__icon {
  margin-left: 16px;
}

.DefaultLabel img {
  margin-right: 9px;
}

.Dropdown {
  padding: 8px 0;
  font-size: 16px;
  font-weight: 400;
}

.Option {
  padding: 8px 16px;
  cursor: pointer;
}

.Option:focus {
  background-color: var(--color-lighter);
}

.Option.isSelected {
  /* background-color: var(--color-green); */
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}

.main.detail-section {
  /* width: 100%; */
  width: 727px;
  position: relative;
  padding: 20px 32px;
  margin: 0;
}

.main .sidebar {
  width: 75px;
}

/* 
.main.detail-section {
width: 100%;
} */

.main.detail-section .filter {
  /* width: 100%; */
  /* height: 270px; */
  /* position     : absolute; */
  /* left: auto;
right: 60px;
bottom: 0;
top: 170px; */
  /* background: #ffffff;
border: 1px solid #e5e5e5;
box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
border-radius: 6px;
padding: 20px 32px; */
}

.filter .filter-title h3 {
  font-size: 14px;
  font-weight: 700;
  font-family: "Roboto", sans-serif;
  line-height: 24px;
  color: #000;
  /* padding-top: 20px; */
}

.f-detail {
  display: flex;
  justify-content: space-between;
  /* align-items    : center; */
  margin: 10px 0;
  position: relative;
}

.f-detail .close-button2 {
  position: absolute;
  right: -17px;
  top: 10px;
}

.f-detail .close-button2 .close-btn {
  background: transparent;
}

.fa {
  font-family: "Font Awesome 6 Free";
  font-size: 16px;
}

.filter .close-button {
  position: absolute;
  right: 24px;
  top: 20px;
  border: 1px solid #525252;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  padding: 4px 4px;
}

.filter-detail .f-detail h4 {
  width: 50px;
  font-size: 14px;
  font-weight: 400;
  font-family: "Roboto", sans-serif;
  line-height: 24px;
  color: #525252;
  text-transform: uppercase;
  padding: 7px 0;
}

.filter-detail {
  width: 100%;
  margin-top: 10px;
}

/* // */
.dropbtn {
  width: 237px;
  height: auto;
  color: #525252;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  border-radius: 100px;
  padding: 14px 18px;
  font-size: 16px;
  cursor: pointer;
  text-align: left;
}

/* .dropbtn:hover,
.dropbtn:focus {
  background-color: #2980B9;
} */

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  position: absolute;
  display: none;
  width: 204px;
  height: auto;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  padding: 10px;
  margin-top: 10px;
  z-index: 1;
}

.dropdown-content a {
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  position: relative;
  font-size: 14px;
  color: #525252;
  font-weight: 500;
  line-height: 24px;
  border-radius: 5px;
}

.dropdown a:hover {
  background-color: #f5f5f5;
}

.show {
  display: block;
}

/* // */
button.dropbtn span i {
  position: absolute;
  right: 15px;
  top: 17px;
  cursor: pointer;
}

.dropdown-content a span {
  position: absolute;
  right: 10px;
}

.is-drop .dropbtn {
  width: 110px;
  height: auto;
  color: #525252;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  border-radius: 100px;
  padding: 14px 18px;
  font-size: 16px;
  cursor: pointer;
  text-align: left;
}

.filter-detail .f-button {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
}

.f-button .add-filter-button {
  position: relative;
}

button.add-btn {
  font-size: 15px;
  border: none;
  background: transparent;
  padding-left: 20px;
  /* cursor: pointer; */
  color: #525252;
}

button.add-btn span {
  position: absolute;
  left: 0;
  top: 0;
}

button.add-btn span i {
  color: #525252;
}

button.apply-btn {
  color: #fff;
  background-color: #44ea9f;
  border: 1px solid #44ea9f;
  padding: 8px 30px;
  border-radius: 50px;
  margin-right: 10px;
  transition: 0.5s;
}

button.apply-btn[disabled] {
  opacity: 0.5;
}

button.apply-btn:hover {
  color: #fff;
  border: 1px solid #44ea9f;
  background-color: #44ea9f;
}

.isactive {
  background-color: #b6f5d9;
  cursor: default;
}

button.clear-btn {
  color: #525252;
  background-color: #fff;
  border: 1px solid #525252;
  padding: 8px 30px;
  border-radius: 50px;
  transition: 0.5s;
  cursor: pointer;
}


button.clear-btn:hover {
  color: #fff;
  background-color: #525252;
}

.date-drop .dropdown-content a {
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  position: relative;
  font-size: 14px;
  color: #525252;
  font-weight: 500;
  line-height: 24px;
  padding-left: 27px;
}

span.canceled-color,
span.completed-color,
span.active-color {
  position: relative;
}

.close-button2 i.fa.fa-close {
  color: #ff0000;
  font-size: 14px;
  line-height: 24px;
  padding: 2px 10px;
  border: 1px solid #ddd;
  border-radius: 50%;
  margin-left: 10px;
}

span.active-color::before {
  content: "";
  position: absolute;
  width: 12px;
  height: 12px;
  background: #70e29b;
  border-radius: 50%;
  z-index: 2;
  left: -160px;
  top: 6px;
}

span.completed-color::before {
  content: "";
  position: absolute;
  width: 12px;
  height: 12px;
  background: #69b6f8;
  border-radius: 50%;
  z-index: 2;
  left: -160px;
  top: 6px;
}

span.canceled-color::before {
  content: "";
  position: absolute;
  width: 12px;
  height: 12px;
  background: #f3504d;
  border-radius: 50%;
  z-index: 2;
  left: -160px;
  top: 6px;
}

.dp__main {
  border-radius: 29px;
}

.filter-detail .f-detail .create-date-dropdown {
  width: 157px;
}

.filter-detail .f-detail .is-drop {
  width: 110px;
}

.filter-detail .f-detail .date-drop {
  width: 312px;
}

.filter-detail .f-detail .date-drop .update {
  display: block;
  padding: 0;
  margin: 0;
}

.filter-detail .f-detail .date-drop .multiselect {
  background: transparent;
  border: none;
}

.filter-detail .DefaultLabel {
  color: #525252;
}
</style>
<style>
.date-drop .dp__input {
  height: 37px;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 100px;
  box-shadow: none;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #525252;
  padding-left: 45px;
}

.date-drop .dp__input_icons {
  padding-left: 20px;
}

.date-drop .update {
  display: grid;
  width: 100%;
  margin: 0 0 30px 0px;
  padding: 0 10px;
}

.date-drop .update input {
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

.date-drop .multiselect {
  box-shadow: none;
  background: transparent;
  border: none;
  padding: 0;
}

.date-drop .multiselect .multiselect-wrapper {
  min-height: auto;
  flex-wrap: wrap;
}

.date-drop .multiselect .multiselect-tags {
  padding-left: 0;
  align-items: flex-start;
  margin: 0;
  width: 100%;
}

.date-drop .multiselect .multiselect-caret {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #000;
}

.date-drop .multiselect .multiselect-clear {
  position: absolute;
  top: 10px;
  right: 45px;
  padding: 0;
}

.date-drop .multiselect .multiselect-clear .multiselect-clear-icon {
  background-color: #ff0000;
}

.date-drop .multiselect .multiselect-tags-search {
  margin: 0;
  height: 37px;
  background: transparent;
  border: none;
  border-radius: 0;
  box-shadow: none;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #525252;
  padding: 0;
  max-width: calc(100% - 35px);
}

.date-drop .multiselect .multiselect-tag {
  background: #69b6f8;
  padding: 5px 14px;
  border-radius: 100px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  order: 2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  padding-right: 30px;
  position: relative;
}

.date-drop .multiselect .multiselect-tags-search-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 0 3px;
  height: 37px;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 100px;
  box-shadow: none;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #525252;
  padding: 6px 12px;
}

.date-drop .multiselect .multiselect-tag-remove {
  padding-right: 0;
  margin-right: 0;
  position: absolute;
  right: 8px;
  top: 7px;
  background: transparent;
  padding: 0;
}

.f-detail .close-button2 .close-btn .fa {
  color: #df3131;
  font-size: 12px;
}

.v-popper__inner {
  overflow-y: inherit;
}

.col {
  flex: 0 0 50%;
  max-width: 50%;
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>

