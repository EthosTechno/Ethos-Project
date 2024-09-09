<template>
  <div class="PortalsTableRow" :class="{ isHeaderRow, isSortDescending }">
    <div
      class="__cell __cell-customer"
      :class="{ isActive: isHeaderActive('CustomerName') }"
    >
      <button class="drag-btn handle">
        <img src="../assets/drag-icon.svg" alt="drop" />
      </button>
      {{ portal.stageName }} 
      <h5 class="number">{{ portal.displayOrder }}</h5>
      <div v-if="isHeaderRow" key="header-customer">Stage Name</div>
    </div>

    <div
      class="__cell __cell-email"
      :class="{ isActive: isHeaderActive('Email') }"
    >
      <span :class="isActive ? 'tooltip' : ''" @mouseenter="hoverTooltipAdd(portal.description)" @mouseleave="hoverTooltipRemove(portal.description)" v-tooltip="portal.description">{{ portal.description }}</span>
      <div v-if="isHeaderRow" key="header-email">Description</div>
    </div>

    <div class="__cell __cell-link">
      <div
        class="setting-btn setting-block"
        @click="handleSettingClick(portal.projectStageId)"
        v-if="!isHeaderRow"
        key="link"
        name="setting"
        :id="`${portal.projectStageId}`"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Group 5 Copy">
            <path
              id="Fill 1"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.6963 15.3474C9.68428 15.3474 8.04828 13.7114 8.04828 11.6994C8.04828 9.6884 9.68428 8.0524 11.6963 8.0524C13.7083 8.0524 15.3443 9.6884 15.3443 11.6994C15.3443 13.7114 13.7083 15.3474 11.6963 15.3474ZM11.6963 7.0524C9.13328 7.0524 7.04828 9.1374 7.04828 11.6994C7.04828 14.2624 9.13328 16.3474 11.6963 16.3474C14.2593 16.3474 16.3443 14.2624 16.3443 11.6994C16.3443 9.1374 14.2593 7.0524 11.6963 7.0524Z"
              fill="#888888"
            />
            <path
              id="Fill 3"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M22.337 12.8015L19.689 13.1485C19.483 13.1755 19.316 13.3255 19.267 13.5265C19.078 14.3145 18.766 15.0655 18.343 15.7575C18.234 15.9345 18.247 16.1595 18.373 16.3235L20.002 18.4435C19.537 19.0145 19.015 19.5365 18.444 20.0015L16.325 18.3725C16.162 18.2465 15.936 18.2355 15.759 18.3435C15.066 18.7685 14.315 19.0795 13.527 19.2695C13.326 19.3185 13.175 19.4855 13.149 19.6905L12.802 22.3405C12.057 22.4185 11.344 22.4195 10.599 22.3405L10.252 19.6935C10.226 19.4875 10.075 19.3205 9.874 19.2715C9.086 19.0825 8.333 18.7715 7.637 18.3455C7.463 18.2385 7.236 18.2495 7.072 18.3755L4.953 20.0045C4.387 19.5435 3.858 19.0135 3.396 18.4475L5.024 16.3295C5.15 16.1645 5.162 15.9395 5.054 15.7625C4.627 15.0685 4.315 14.3165 4.125 13.5265C4.077 13.3245 3.909 13.1745 3.704 13.1475L1.056 12.8005C0.981 12.0685 0.981 11.3305 1.056 10.5985L3.704 10.2525C3.909 10.2255 4.077 10.0745 4.125 9.8735C4.315 9.0835 4.627 8.3305 5.054 7.6365C5.162 7.4595 5.15 7.2345 5.024 7.0705L3.396 4.9515C3.858 4.3865 4.387 3.8565 4.953 3.3955L7.072 5.0245C7.236 5.1515 7.461 5.1625 7.638 5.0545C8.332 4.6295 9.084 4.3175 9.874 4.1275C10.075 4.0795 10.226 3.9115 10.252 3.7065L10.599 1.0585C11.343 0.979501 12.056 0.981501 12.802 1.0595L13.149 3.7085C13.175 3.9135 13.326 4.0815 13.527 4.1305C14.315 4.3195 15.066 4.6315 15.759 5.0565C15.936 5.1655 16.162 5.1535 16.325 5.0265L18.444 3.3985C19.015 3.8625 19.537 4.3845 20.002 4.9565L18.373 7.0755C18.247 7.2395 18.234 7.4655 18.343 7.6415C18.766 8.3345 19.078 9.0845 19.267 9.8725C19.316 10.0735 19.483 10.2245 19.689 10.2515L22.337 10.5975C22.415 11.3425 22.415 12.0575 22.337 12.8015ZM23.281 10.0845C23.25 9.8615 23.074 9.6865 22.851 9.6565L20.152 9.3035C19.966 8.6465 19.704 8.0145 19.371 7.4185L21.031 5.2585C21.168 5.0795 21.17 4.8315 21.034 4.6515C20.38 3.7875 19.611 3.0195 18.749 2.3665C18.569 2.2305 18.321 2.2325 18.143 2.3685L15.983 4.0285C15.385 3.6945 14.753 3.4315 14.096 3.2455L13.743 0.545501C13.713 0.321501 13.539 0.145501 13.316 0.114501C12.211 -0.0374988 11.191 -0.0384988 10.086 0.113501C9.862 0.144501 9.688 0.321501 9.658 0.544501L9.305 3.2425C8.646 3.4295 8.013 3.6915 7.415 4.0265L5.254 2.3655C5.076 2.2285 4.828 2.2265 4.648 2.3625C3.798 3.0065 3.008 3.7955 2.364 4.6465C2.228 4.8265 2.229 5.0745 2.366 5.2535L4.026 7.4125C3.69 8.0115 3.427 8.6455 3.241 9.3045L0.541 9.6575C0.318 9.6875 0.142 9.8625 0.111 10.0855C-0.037 11.1565 -0.037 12.2435 0.111 13.3145C0.142 13.5375 0.318 13.7125 0.541 13.7415L3.241 14.0955C3.427 14.7545 3.69 15.3885 4.026 15.9875L2.366 18.1465C2.229 18.3255 2.228 18.5735 2.364 18.7535C3.007 19.6035 3.797 20.3935 4.649 21.0365C4.828 21.1725 5.076 21.1705 5.254 21.0335L7.415 19.3735C8.014 19.7085 8.647 19.9705 9.305 20.1565L9.658 22.8555C9.688 23.0785 9.862 23.2545 10.086 23.2855C10.637 23.3615 11.164 23.3985 11.697 23.3985C12.233 23.3985 12.762 23.3615 13.316 23.2845C13.539 23.2535 13.713 23.0775 13.743 22.8545L14.096 20.1535C14.753 19.9685 15.385 19.7055 15.983 19.3705L18.143 21.0305C18.32 21.1675 18.568 21.1685 18.749 21.0325C19.611 20.3805 20.38 19.6115 21.034 18.7475C21.17 18.5685 21.168 18.3205 21.031 18.1415L19.371 15.9805C19.704 15.3845 19.966 14.7525 20.152 14.0955L22.851 13.7425C23.074 13.7135 23.25 13.5385 23.281 13.3155C23.434 12.2145 23.434 11.1875 23.281 10.0845Z"
              fill="#888888"
            />
          </g>
        </svg>
      </div>

      <div
        class="action-link setting-non"
        v-if="!isHeaderRow"
        key="link"
        :id="`${portal.projectStageId}id`"
        name="setting"
      >
        <button
          class="action-btn"
          type="button"
          @click="openEditModal(portal.projectStageId)"
        >
          <span class="edit_icon"></span>
        </button>
        <vue-final-modal
          v-model="editProjectModal"
          name="create_portal"
          classes="modal-container"
          :click-to-close="false"
          content-class="modal-content"
        >
          <div class="portal-modal">
            <EditStageModal
              :projectStageId="portal.projectStageId"
              :projectId="projectId"
              @close="closeEditModal"
              @closeNo="closeEditNoModal"
              :editProjectModal="editProjectModal"
              :editProjectStageData="editProjectStageData"
            />
          </div>
        </vue-final-modal>
        <button
          class="action-btn"
          type="button"
          @click="duplicateStageRecored(portal.projectStageId)"
        >
          <span class="duplicate_icon"></span>

        </button>
        <button class="action-btn" type="button" @click="openDeleteModal">
          <span class="delete_icon"></span>
        </button>
        <vue-final-modal
          classes="modal-container"
          content-class="modal-content"
          name="delete-modal"
          v-model="deleteModalValue"
          :click-to-close="false"
        >
          <DeleteModal
            @close="closeModal"
            @closeNo="closeNoModal"
            :projectId="portal.projectStageId"
            :projectName="'projectStageList'"
          >
          </DeleteModal>
        </vue-final-modal>
      </div>

      <div v-else key="header-link"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from 'vue-toastification';
import DeleteModal from "@/components/DeleteModal.vue";
import projectStageService from "../services/projectStage.service";
import AddStagModal from "./AddStagModal.vue";
import EditStageModal from "./EditStageModal.vue";

const props = defineProps({
  portal: {
    type: Object,
    default: Object,
  },
  isHeaderRow: {
    type: Boolean,
    default: false,
  },
  projectId: {
    type: Number,
    required: true,
  },
  portals: {
    type: Object,
    default: Object  
  }
});
const isSettingActive = ref(false);
const editProjectModal = ref(false);
const clickOut = ref(false);
const editProjectStageData = ref({});
const emit = defineEmits(["updateData"]);
const deleteModalValue = ref(false);
const activateGear = ref(0)
const isActive = ref(false)

const getStatusColor = (status) => {
  const STATUS_COLOR_MAP = [
    { status: "Active", color: "#30E694" },
    { status: "Completed", color: "#4EB6FE" },
    { status: "Stage", color: " #113a6b" },
  ];

  const mappedStatus = STATUS_COLOR_MAP.find((map) => map.status === status);
  return mappedStatus ? mappedStatus.color : STATUS_COLOR_MAP[0].color;
};
const hoverTooltipAdd = (value) => {
  if(value.length > 55) {
    isActive.value = true
  }
}

const hoverTooltipRemove = (value) => {
  if(value.length > 55) {
    isActive.value = false
  }
}
const handleSettingClick = (value) => {
  for(var i=0; i < props.portals.length;  i++) {
    if(props.portals[i].projectStageId != value) {
      document.getElementById(props.portals[i].projectStageId).classList.remove("setting-non")
      document.getElementById(props.portals[i].projectStageId).classList.add("setting-block")
      document.getElementById(props.portals[i].projectStageId+'id').classList.remove("setting-block")
      document.getElementById(props.portals[i].projectStageId+'id').classList.add("setting-non")
    }
    else{
      document.getElementById(value).classList.remove("setting-block")
      document.getElementById(value).classList.add("setting-non")
      document.getElementById(`${value}`+'id').classList.remove("setting-non")
      document.getElementById(`${value}`+'id').classList.add("setting-block")
    }
  }
  isSettingActive.value = !isSettingActive.value  
};

const getStatusStyle = (status) => {
  return {
    backgroundColor: `${getStatusColor(status)}`,
  };
};

const isHeaderActive = (header) => {
  return header === props.activeSortKey;
};

const duplicateStageRecored  = (value) => {
  projectStageService.duplicateStageRecored(value).then((res) => {
    useToast().success(res.data, {timeout: 3000})
    emit("updateData");   
  })
  .catch((error) => {
  });
  
};

const openDeleteModal = () => {
  deleteModalValue.value = true;
};

const closeModal = () => {
  isSettingActive.value = false;
  deleteModalValue.value = false;
  emit("updateData");
};

const closeNoModal = () => {
  deleteModalValue.value = false;
  isSettingActive.value = false;
}

const openEditModal = (value) => {
  projectStageService.editProjectStageData(value).then((res) => {
    editProjectStageData.value = res.data.data
  });
  editProjectModal.value = true;
};

const closeEditModal = () => {
  editProjectModal.value = false;
  isSettingActive.value = false;
  emit("updateData");
}

const closeEditNoModal = () => {
  editProjectModal.value = false;
  isSettingActive.value = false;
}
</script>

<style scoped>
.PortalsTableRow {
  display: flex;
  padding: 0px;
  align-items: center;
  white-space: nowrap;
  overflow: visible;
}
.PortalsTableRow.__row:hover{
  border: 2px solid #44EA9F !important;
}
.isHeaderRow{
  border-bottom: 0;
}
.__status {
  width: 80px;
  font-size: 11px;
  font-weight: 700;
  line-height: 28px;
  color: var(--color-dark-blue);
  background-color: var(--color-green);
  border-radius: 14px;
}

.setting-btn.setting-block{
  display: flex;
  align-items: center;
  height: 38px;
}
.setting-non {
  display: none;
}
.setting-block {
  display: block;
}
.__cell {
  padding: 6px 20px;
  flex: 1 1 auto;
}

.__cell + .__cell {
  border-left: 2px solid var(--color-lighter);
}

.__cell-customer,
.__cell-email {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.__cell-email{
  flex-basis: 40%;
}
.__cell-customer{
  flex-basis: 20%;
}

.__cell-phone {
  flex-basis: 13% !important;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  min-width: 2px;
  min-height: 19px;
}

.__cell-phone,
.__cell-date,
.__cell-status,
.__cell-progress,
.__cell-link {
  flex: 0 0 auto;
  color: var(--color-mute);
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.isHeaderRow .__cell.__cell-link {
  width: 58px;
}

/* .__cell-link {
  cursor: pointer;
} */

.__cell-customer {
  font-weight: 600;
}

.__cell-date {
  flex-basis: 105px;
  text-align: left;
}

.__cell-progress {
  display: flex;
  align-items: center;
  flex-basis: 175px;
}

.isHeaderRow .__cell-progress {
  display: block;
  text-align: left;
}

/* isHeaderRow */
.isHeaderRow .__cell {
  position: relative;
  color: var(--color-dark);
  font-size: 12px;
  font-weight: 600;
  line-height: 38px;
  text-transform: uppercase;
  border-left: none !important;
  border-radius: 12px;
  min-height: 50px;
}

.isHeaderRow .__cell.__cell-phone {
  /* flex: 0 0 20%; */
  text-align: left;
}

.isHeaderRow .__cell:after {
  content: "▲";
  display: none;
  position: absolute;
  top: 7px;
  right: 8px;
  width: 10px;
  height: 10px;
  font-size: 10px;
  line-height: 10px;
}

.isHeaderRow.isSortDescending .__cell:after {
  transform: rotate(180deg);
}

.isHeaderRow .__cell.isSortable:hover,
.isHeaderRow .__cell.isSortable:focus {
  background-color: var(--color-lighter);
  cursor: pointer;
}

.isHeaderRow .__cell.isSortable:hover:after,
.isHeaderRow .__cell.isSortable:focus:after,
.isHeaderRow .__cell.isActive:after {
  display: block;
}
.PortalsTableRow:not(.isHeaderRow) .__cell{
  line-height: 38px;
}

.PortalsTableRow.__row .__cell-status .__status {
  padding: 0 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.action-link .action-btn {
  display: inline-block;
  margin-left: 10px;
  background: transparent;
  cursor: pointer;
}
</style>
<style scoped>
.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}

.modal__title {
  font-size: 1.5rem;
  font-weight: 700;
}
</style>

<style scoped>
.dark-mode div .modal-content {
  border-color: #2d3748;
  background-color: #1a202c;
}
</style>
<style scoped>
.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

.modal-content {
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}

.modal__title {
  font-size: 1.5rem;
  font-weight: 700;
}

.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>

<style scoped>
/* .dark-mode div::v-deep .modal-content {
  border-color: #2d3748;
  background-color: #1a202c;
} */

.PortalsTableRow {
  border-top: 2px solid var(--color-lighter);
  position: relative;
}
.PortalsTableRow:not(.isHeaderRow) .__cell.__cell-link{
  line-height: 38px;
}

/* .PortalsTableRow:hover {
  border: 2px solid #44ea9f;
  border-top: 2px solid #44ea9f !important;
} */

/* .PortalsTableRow.isHeaderRow:hover {
  border: 2px solid transparent;
  border-top: 2px solid transparent !important;
  cursor: default !important;
} */

.PortalsTableRow.isHeaderRow:hover .drag-btn {
  display: none;
}

.PortalsTableRow .drag-btn {
  background: transparent;
  position: absolute;
  left: 8px;
  top: 14px;
  cursor: pointer;
  display: none;
}

.PortalsTableRow .drag-btn:focus {
  background: transparent;
}

.PortalsTableRow:hover .drag-btn {
  display: block;
}

.isSortable div {
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  text-transform: uppercase;
  color: #333333;
}

h5.number {
  position: absolute;
  left: -20px;
  top: 12px;
  font-family: "Source Sans Pro";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #aaaaaa;
}

svg:hover {
  stroke: #80ffbc;
  transition: all 400ms ease;
}

svg:hover g {
  stroke: #80ffbc;
  transition: all 400ms ease;
}

.delete:hover g {
  fill: #ff4e4ef7;
  stroke: #ff4e4ef7;
  transition: all 400ms ease;
}
</style>
