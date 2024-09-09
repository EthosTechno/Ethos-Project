<template>
  <div class="PortalsTableRow" :class="{ isHeaderRow, isSortDescending }">
    <div
      class="__cell __cell-neme isSortable"
      :class="{ isActive: isHeaderActive('Name') }"
    >
      <span :class="isActive ? 'tooltip' : ''" @mouseenter="hoverTooltipAdd(portal.projetName)" @mouseleave="hoverTooltipRemove(portal.projetName)" v-tooltip="portal.projetName">{{ portal.projetName }}</span>
      <div
        v-if="isHeaderRow"
        key="header-customer"
        @click="handleHeaderClick('Name')"
      >
        Name
      </div>
    </div>

    <div
      class="__cell __cell-id"
      :class="{ isActive: isHeaderActive('PortalID') }"
    >
      <span v-tooltip="portal.projectId" class="copy_icon" v-if="!isHeaderRow"
        >{{ portal.projectId }} <img src="../assets/copy-Icon.svg" id="btncopy" @click="copyProjectId(portal.projectId
        
        )" alt="copy"
      /></span>
      <div v-if="isHeaderRow" key="header-email">Project ID</div>
    </div>

    <div
      class="__cell __cell-Stages isSortable"
      :class="{ isActive: isHeaderActive('Stages')}">
      <span>{{portal.stages}}</span>
      <div
        v-if="isHeaderRow"
        key="header-phone"
        @click="handleHeaderClick('Stages')"
      >
        Stages
      </div>
    </div>

    <div
      class="__cell __cell-date isSortable"
      :class="{ isActive: isHeaderActive('CreatedOn') }"
    >
      {{ portal.createdOnStr }}

      <div
        v-if="isHeaderRow"
        key="header-open-date"
        @click="handleHeaderClick('CreatedOn')"
      >
        Date Created
      </div>
    </div>
    <div
      class="__cell __cell-status isSortable"
      :class="{ isActive: isHeaderActive('Status') }"
    >
      <div
        class="__status"
        :style="getStatusStyle(portal.isActive ? 'Active' : 'Inactive')"
        v-if="!isHeaderRow"
        @click="handleStatusChange"
      >
        {{ portal.isActive ? "Active" : "Inactive" }}
      </div>
      <div
        v-if="isHeaderRow"
        @click="handleHeaderClick('Status')"
        key="header-status"
      >
        Status
      </div>
    </div>
    <div class="__cell __cell-link">
      <div
        class="setting-btn"
        :class="isSettingActive ? 'setting-non' : 'setting-block'"
        @click="handleSettingClick(portal.projectId)"
        v-if="!isHeaderRow"
        key="link"
        name="setting"
        :id="`${portal.projectId}`"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="Group 5 Copy">
          <path id="Fill 1" fill-rule="evenodd" clip-rule="evenodd" d="M11.6963 15.3474C9.68428 15.3474 8.04828 13.7114 8.04828 11.6994C8.04828 9.6884 9.68428 8.0524 11.6963 8.0524C13.7083 8.0524 15.3443 9.6884 15.3443 11.6994C15.3443 13.7114 13.7083 15.3474 11.6963 15.3474ZM11.6963 7.0524C9.13328 7.0524 7.04828 9.1374 7.04828 11.6994C7.04828 14.2624 9.13328 16.3474 11.6963 16.3474C14.2593 16.3474 16.3443 14.2624 16.3443 11.6994C16.3443 9.1374 14.2593 7.0524 11.6963 7.0524Z" fill="#888888"/>
          <path id="Fill 3" fill-rule="evenodd" clip-rule="evenodd" d="M22.337 12.8015L19.689 13.1485C19.483 13.1755 19.316 13.3255 19.267 13.5265C19.078 14.3145 18.766 15.0655 18.343 15.7575C18.234 15.9345 18.247 16.1595 18.373 16.3235L20.002 18.4435C19.537 19.0145 19.015 19.5365 18.444 20.0015L16.325 18.3725C16.162 18.2465 15.936 18.2355 15.759 18.3435C15.066 18.7685 14.315 19.0795 13.527 19.2695C13.326 19.3185 13.175 19.4855 13.149 19.6905L12.802 22.3405C12.057 22.4185 11.344 22.4195 10.599 22.3405L10.252 19.6935C10.226 19.4875 10.075 19.3205 9.874 19.2715C9.086 19.0825 8.333 18.7715 7.637 18.3455C7.463 18.2385 7.236 18.2495 7.072 18.3755L4.953 20.0045C4.387 19.5435 3.858 19.0135 3.396 18.4475L5.024 16.3295C5.15 16.1645 5.162 15.9395 5.054 15.7625C4.627 15.0685 4.315 14.3165 4.125 13.5265C4.077 13.3245 3.909 13.1745 3.704 13.1475L1.056 12.8005C0.981 12.0685 0.981 11.3305 1.056 10.5985L3.704 10.2525C3.909 10.2255 4.077 10.0745 4.125 9.8735C4.315 9.0835 4.627 8.3305 5.054 7.6365C5.162 7.4595 5.15 7.2345 5.024 7.0705L3.396 4.9515C3.858 4.3865 4.387 3.8565 4.953 3.3955L7.072 5.0245C7.236 5.1515 7.461 5.1625 7.638 5.0545C8.332 4.6295 9.084 4.3175 9.874 4.1275C10.075 4.0795 10.226 3.9115 10.252 3.7065L10.599 1.0585C11.343 0.979501 12.056 0.981501 12.802 1.0595L13.149 3.7085C13.175 3.9135 13.326 4.0815 13.527 4.1305C14.315 4.3195 15.066 4.6315 15.759 5.0565C15.936 5.1655 16.162 5.1535 16.325 5.0265L18.444 3.3985C19.015 3.8625 19.537 4.3845 20.002 4.9565L18.373 7.0755C18.247 7.2395 18.234 7.4655 18.343 7.6415C18.766 8.3345 19.078 9.0845 19.267 9.8725C19.316 10.0735 19.483 10.2245 19.689 10.2515L22.337 10.5975C22.415 11.3425 22.415 12.0575 22.337 12.8015ZM23.281 10.0845C23.25 9.8615 23.074 9.6865 22.851 9.6565L20.152 9.3035C19.966 8.6465 19.704 8.0145 19.371 7.4185L21.031 5.2585C21.168 5.0795 21.17 4.8315 21.034 4.6515C20.38 3.7875 19.611 3.0195 18.749 2.3665C18.569 2.2305 18.321 2.2325 18.143 2.3685L15.983 4.0285C15.385 3.6945 14.753 3.4315 14.096 3.2455L13.743 0.545501C13.713 0.321501 13.539 0.145501 13.316 0.114501C12.211 -0.0374988 11.191 -0.0384988 10.086 0.113501C9.862 0.144501 9.688 0.321501 9.658 0.544501L9.305 3.2425C8.646 3.4295 8.013 3.6915 7.415 4.0265L5.254 2.3655C5.076 2.2285 4.828 2.2265 4.648 2.3625C3.798 3.0065 3.008 3.7955 2.364 4.6465C2.228 4.8265 2.229 5.0745 2.366 5.2535L4.026 7.4125C3.69 8.0115 3.427 8.6455 3.241 9.3045L0.541 9.6575C0.318 9.6875 0.142 9.8625 0.111 10.0855C-0.037 11.1565 -0.037 12.2435 0.111 13.3145C0.142 13.5375 0.318 13.7125 0.541 13.7415L3.241 14.0955C3.427 14.7545 3.69 15.3885 4.026 15.9875L2.366 18.1465C2.229 18.3255 2.228 18.5735 2.364 18.7535C3.007 19.6035 3.797 20.3935 4.649 21.0365C4.828 21.1725 5.076 21.1705 5.254 21.0335L7.415 19.3735C8.014 19.7085 8.647 19.9705 9.305 20.1565L9.658 22.8555C9.688 23.0785 9.862 23.2545 10.086 23.2855C10.637 23.3615 11.164 23.3985 11.697 23.3985C12.233 23.3985 12.762 23.3615 13.316 23.2845C13.539 23.2535 13.713 23.0775 13.743 22.8545L14.096 20.1535C14.753 19.9685 15.385 19.7055 15.983 19.3705L18.143 21.0305C18.32 21.1675 18.568 21.1685 18.749 21.0325C19.611 20.3805 20.38 19.6115 21.034 18.7475C21.17 18.5685 21.168 18.3205 21.031 18.1415L19.371 15.9805C19.704 15.3845 19.966 14.7525 20.152 14.0955L22.851 13.7425C23.074 13.7135 23.25 13.5385 23.281 13.3155C23.434 12.2145 23.434 11.1875 23.281 10.0845Z" fill="#888888"/>
          </g>
        </svg>
      </div>

      <div
        class="action-link"
        :class="isSettingActive ? 'setting-block' : 'setting-non'"
        v-if="!isHeaderRow"
        key="link"
        name="setting"
        :id="`${portal.projectId}id`"
      >
        <router-link
          :to="{ path: `/editProjectCustomization/${portal.projectId}` }"
          ><button class="action-btn">
            <span class="edit_icon"></span>
          </button
        ></router-link>
        <button class="action-btn"   @click="handleDuplicateRecord(portal.projectId)">
          <span class="duplicate_icon"></span>
        </button>
        <button class="action-btn" @click="openDeleteModal">
          <span class="delete_icon"></span>
        </button>
        <vue-final-modal
          name="delete-modal"
          v-model="deleteModalValue"
         
          :click-to-close="false"
        >
          <DeleteModal
            @close="closeModal"
            @closeNo="closeNoModal"
            :projectId="portal.projectId"
            :projectName="'projectList'"
          ></DeleteModal>
        </vue-final-modal>
      </div>

      <div v-else key="header-link"></div>
    </div>
  </div>
  <vue-final-modal
    name="status-modal"
    v-model="statusModalValue"
    :click-to-close="false"
  >
    <StatusModal
      @close="closeStatusModal"
      @closeNo="closeStatusNoModal"
      :projectId="portal.projectId"
      :statusChange="portal.isActive"
    ></StatusModal>
  </vue-final-modal>
</template>


<script setup>
import { reactive, ref, onMounted } from "vue";
import DeleteModal from "@/components/DeleteModal.vue";
import createProjectService from "../services/createProject.service";
import StatusModal from "@/components/StatusModal.vue"
import { useToast } from "vue-toastification";

const deleteModalValue = ref(false);
const statusModalValue = ref(false)
const isSettingActive = ref (false);
const clickOut = ref(false);
const isActive = ref(false)

const emit = defineEmits(["sort", "updateData"]);

const props = defineProps({
  portal: {
    type: Object,
    default: Object,
  },
  isHeaderRow: {
    type: Boolean,
    default: false,
  },
  activeSortKey: {
    type: String,
    default: "",
  },
  isSortDescending: {
    type: Boolean,
    default: false,
  },
  portals: {
    type: Object,
    default: Object
  }
});

const openDeleteModal = () => {
  deleteModalValue.value = true;
};


const closeModal = () => {
  isSettingActive.value = false;
  deleteModalValue.value = false;
  emit("updateData");
};

const hoverTooltipAdd = (value) => {
  if(value.length > 50) {
    isActive.value = true
  }
}

const hoverTooltipRemove = (value) => {
  if(value.length > 50) {
    isActive.value = false
  }
} 

const closeNoModal = () => {
  isSettingActive.value = false;
  deleteModalValue.value = false;
}

const closeStatusModal = () => {
  statusModalValue.value = false;
  isSettingActive.value = false;
  emit("updateData");
};

const closeStatusNoModal = () => {
  statusModalValue.value = false;
}

onMounted(() =>  {
  var userSelection = document.getElementsByClassName('__status');
    for(let i = 0; i < userSelection.length; i++) {
      userSelection[i].addEventListener("mouseover", function() {
        userSelection[i].innerText = props.portal.isActive ? "Deactivate" : 'Activate';
      })
      userSelection[i].addEventListener("mouseleave", function() {
        userSelection[i].innerText = props.portal.isActive ? 'Active' : 'Inactive';
      })
    }
})

const clickOutSide = () => {
  clickOut.value = true;
};

const getStatusColor = (status) => {
  const STATUS_COLOR_MAP = [
    { status: "Active", color: "#30E694" },
    { status: "Inactive", color: "#F4F4F4" },
  ];
  const mappedStatus = STATUS_COLOR_MAP.find((map) => map.status === status);

  return mappedStatus ? mappedStatus.color : STATUS_COLOR_MAP[0].color;
};

const copyProjectId= (value) => {
  const projectGUID = value;
  var textArea = document.createElement("textarea");
  textArea.value = projectGUID;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("Copy");
  useToast().success('Project ID Copied',{timeout: 3000})
  textArea.remove();
}

const handleSettingClick = (value) => {
  for(var i=0; i < props.portals.length;  i++) {
    if(props.portals[i].projectId != value) {
      document.getElementById(props.portals[i].projectId).classList.remove("setting-non")
      document.getElementById(props.portals[i].projectId).classList.add("setting-block")
      document.getElementById(props.portals[i].projectId+'id').classList.remove("setting-block")
      document.getElementById(props.portals[i].projectId+'id').classList.add("setting-non")
    }
    else{
      document.getElementById(value).classList.remove("setting-block")
      document.getElementById(value).classList.add("setting-non")
      document.getElementById(`${value}`+'id').classList.remove("setting-non")
      document.getElementById(`${value}`+'id').classList.add("setting-block")
    }
  }
};
const handleDuplicateRecord = (value) => {
  const params = {
    projectId: value,
  };
  createProjectService.duplicateProject(params).then((res) => {
      useToast().success(res,{timeout: 3000});
      emit("updateData");
    })
    .catch((error) => {
    });
};

const getStatusStyle = (status) => {
  return {
    backgroundColor: `${getStatusColor(status)}`,
  };
};

const portalClick = (value) => {
  window.open(value);
};
const handleHeaderClick = (header) => {
  emit("sort", header);
};

const isHeaderActive = (header) => {
  return header === props.activeSortKey;
};

const handleStatusChange = () => {
  statusModalValue.value = true;
}
</script>


<style scoped>
.PortalsTableRow {
  display: flex;
  padding: 0px;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
}
.isHeaderRow{
  border: 2px solid var(--color-lighter);
  border-bottom: none;
}
.__status {
  width: 80px;
  font-size: 13px;
  font-weight: 700;
  line-height: 28px;
  color: var(--color-dark-blue);
  background-color: var(--color-green);
  border-radius: 14px;
  cursor: pointer;
  margin: 5px 0;
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
  /* font-family: "Roboto", sans-serif; */
}
.__cell + .__cell {
  border-left: 2px solid var(--color-lighter);
}

.__cell-customer {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.isHeaderRow .__cell.__cell-link{
  width: 65px;
}

.__cell.__cell-Stages{
  max-width: 10% !important;
  flex-basis: 10% !important;
  text-align: center;
}

/* .PortalsTableRow.isHeaderRow .__cell.__cell-id{
  max-width: 30%;
}*/

.PortalsTableRow .__cell.__cell-id span{
  max-width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: inline-block;
  position: relative;
  padding-right: 25px;
  vertical-align: middle;
} 

.PortalsTableRow .__cell.__cell-id span img{
  position: absolute;
  top: 13px;
  right: 5px;
  cursor: pointer;
  filter: contrast(0) brightness(1);
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
  cursor: pointer;
}

.__cell-date{
  text-align: center !important;
  width: 130px;
}



/* isHeaderRow */
.isHeaderRow .__cell {
  position: relative;
  color: var(--color-dark);
  font-size: 12px;
  font-weight: 600;
  line-height: 36px;
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
  top: 19px;
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
  background-color: #fff;
  cursor: pointer;
}
.isHeaderRow .__cell.isSortable:hover:after,
.isHeaderRow .__cell.isSortable:focus:after,
.isHeaderRow .__cell.isActive:after {
  display: block;
}

.isHeaderRow .__cell.__cell-status {
  width: 120px;
}
.__cell.__cell-neme {
  width: 20%;
   white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: inline-block;
  position: relative;
  padding-right: 20px;
  font-weight: 600;
}
.PortalsTableRow{
  border-top: 2px solid var(--color-lighter);
}
.__cell.__cell-id {
    width: 30%;
}
.PortalsTableRow:not(.isHeaderRow) .__cell{
  line-height: 38px;
}
.PortalsTableRow:not(.isHeaderRow) .__cell.__cell-id{
  line-height: 37px;
}
.PortalsTableRow:not(.isHeaderRow) .__cell.__cell-link{
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

svg:hover{
  stroke: #80ffbc;
  transition: all 400ms ease;
}

svg:hover g{
  stroke: #80ffbc;
  transition: all 400ms ease;
}

.delete:hover g{
  fill: #ff4e4ef7 ;
  stroke: #ff4e4ef7;
  transition: all 400ms ease;
}


.__cell.__cell-status .__status:hover{
  background-color: #F3504D !important;
  color: #fff;
}
</style>




