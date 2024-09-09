<template>
  <div class="PortalsTableRow" :class="{ isHeaderRow, isSortDescending }">
    <div class="__cell __cell-customer  isSortable" :class="{ isActive: isHeaderActive('Name') }">
      <span :class="isActive ? 'tooltip' : ''" @mouseenter="hoverTooltipAdd(portal.name)"
        @mouseleave="hoverTooltipRemove(portal.name)" v-tooltip="portal.name">{{ portal.name }}</span>
      <div v-if="isHeaderRow" key="header-customer" @click="handleHeaderClick('Name')">
        Name
      </div>
    </div>

    <div class="__cell __cell-email isSortable" :class="{ isActive: isHeaderActive('Email') }">
      <span :class="isActive ? 'tooltip' : ''" @mouseenter="hoverTooltipAdd(portal.emailAddress)"
        @mouseleave="hoverTooltipRemove(portal.emailAddress)" v-tooltip="portal.emailAddress">{{
          portal.emailAddress
        }}</span>
      <div v-if="isHeaderRow" key="header-email" @click="handleHeaderClick('Email')">
        Email
      </div>
    </div>
    <div class="__cell __cell-link" style="min-width:119px;">
      <div class="action-link setting-non" v-if="!isHeaderRow" key="link" :id="`${portal.projectStageId}id`"
        name="setting">
        <button class="action-btn" type="button" @click="openEditModal(portal.userId)">
          <span class="edit_icon"></span>
          <!-- <img src="../assets/delete.svg" alt="delete" /> -->
        </button>

        <button class="action-btn" type="button" @click="openDeleteUserModal">
          <span class="delete_icon"></span>
          <!-- <img src="../assets/edit.svg" alt="edit" /> -->
        </button>
        <vue-final-modal v-model="editUserModal" name="user-edit" classes="modal-container" :click-to-close="false"
          content-class="modal-content">
          <div class="portal-modal">
            <AddEditUserModal @close="closeEditModal" @closeNo="closeEditNoModal" :editUserModal="editUserModal" :editUserData="editUserData" :userId="portal.userId">
            </AddEditUserModal>
          </div>
        </vue-final-modal>
        <vue-final-modal
          classes="modal-container"
          content-class="modal-content"
          name="user-delete-modal"
          v-model="deleteUserModalValue"
          :click-to-close="false"
        >
          <DeleteModal
            @close="closeModal"
            @closeNo="closeNoModal"
            :projectId="portal.userId"
            :projectName="'userTable'"
          >
          </DeleteModal>
        </vue-final-modal>
      </div>

      <div v-else key="header-link"></div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import InputSelectStage from "@/components/InputSelectStage.vue";
import ProgressBar from '@/components/ProgressBar.vue';
import IconBase from '@/components/IconBase.vue';
import DeleteModal from './DeleteModal.vue';
import AddEditUserModal from '@/components/AddEditUserModal.vue'
import companySettingsService from "../services/companySettings.service";


const emit = defineEmits([
  'sort',
])

const projectStageList = ref(props.portal.projectStages ? props.portal.projectStages : [])
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
    default: '',
  },
  isSortDescending: {
    type: Boolean,
    default: false,
  },
})
const editUserData = ref({});


const isActive = ref(false);
const deleteUserModalValue = ref(false);
const editUserModal = ref(false)

const openDeleteUserModal = () => {
  deleteUserModalValue.value = true;
}

const closeModal = () => {
  deleteUserModalValue.value = false;
  emit("updateData");
};

const closeNoModal = () => {
  deleteUserModalValue.value = false;

}

const openEditModal = (value) => {
  companySettingsService.GetUserById(value).then((res) => {
    editUserData.value = res.data.data
    console.log(editUserData.value);
  });
  editUserModal.value = true;
}

const closeEditModal = () => {
  editUserModal.value = false;
  emit("updateData");
}

const closeEditNoModal = () => {
  editUserModal.value = false;
}


const handleHeaderClick = (header) => {
  emit('sort', header)
}

const isHeaderActive = (header) => {
  return header === props.activeSortKey
}


const hoverTooltipAdd = (value) => {
  if (value.length > 25) {
    isActive.value = true
  }
}

const hoverTooltipRemove = (value) => {
  if (value.length > 25) {
    isActive.value = false
  }
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

.__status {
  width: 80px;
  font-size: 11px;
  font-weight: 700;
  line-height: 28px;
  color: var(--color-dark-blue);
  background-color: var(--color-green);
  border-radius: 14px;
}
.PortalsTableRow:not(.isHeaderRow) .__cell{
  line-height: 36px;
}
.isHeaderRow{
  border: 2px solid var(--color-lighter);
}

.__cell {
  padding: 6px 20px;
  min-height: 50px;
  flex: 1 1 auto;
}
._cell + ._cell {
  border-left: 2px solid var(--color-lighter);
}

.__cell-customer,
.__cell-email {
  flex-basis: 20%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
  
.__cell-link {
  flex: 0 0 auto;
  color: #24292F;
  text-align: center;
   white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.__cell-link {
  cursor: pointer;
}
.__cell-customer {
  font-weight: 600;
}

/* / isHeaderRow / */
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
  /* / display: flex; / */
  align-items: center;
}
.isHeaderRow .__cell:after {
  content: '▲';
  display: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 8px;
  width: 10px;
  height: 10px;
  font-size: 10px;
  line-height: 10px;
}
.isHeaderRow.isSortDescending .__cell:after {
  transform: rotate(180deg) translateY(50%);
}
.isHeaderRow .__cell.isSortable:hover,
.isHeaderRow .__cell.isSortable:focus {
  cursor: pointer;
}
.isHeaderRow .__cell.isSortable:hover:after,
.isHeaderRow .__cell.isSortable:focus:after,
.isHeaderRow .__cell.isActive:after {
  display: block;
}
.action-link .action-btn{
  background: transparent;
}
.action-link .action-btn svg{
  vertical-align: -7px;
}
.action-link .action-btn + .action-btn{
  margin-left: 30px;
} 
.action-link svg:hover g{
  stroke: #80ffbc;
  transition: all 400ms ease;
}
.action-link .delete:hover g{
  fill: #ff4e4ef7;
  stroke: #ff4e4ef7;
  transition: all 400ms ease;
}
.__cell + .__cell{
  border-left: 2px solid var(--color-lighter);
}
</style>



