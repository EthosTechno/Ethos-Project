<template>
  <div class="PortalsTable">
    <header class="Controls">
     
    </header>
   
    <div class="__rows row-custom">
        <PortalsTableRow class="__header-row" :is-header-row="true"/>
        <VueDraggableNext  :list="portals"  @change="log" handle=".handle">
        <PortalsTableRow class="__row" v-for="portal in portals" :portal="portal" :portals="portals" :key="portal" :projectId="projectId"  @updateData="updateData"/>
        </VueDraggableNext>
    </div>

    <div class="__empty" v-show="!portals.length">
      No results found
    </div>

  </div>

  <div class="create-btn-main">
      <button class="create-btn" @click="openAddModal">
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.3333 8.38888V12M12.3333 12V15.6111M12.3333 12H15.9444M12.3333 12H8.72222M23.1667 12C23.1667 17.9831 18.3164 22.8333 12.3333 22.8333C6.35025 22.8333 1.5 17.9831 1.5 12C1.5 6.0169 6.35025 1.16666 12.3333 1.16666C18.3164 1.16666 23.1667 6.0169 23.1667 12Z" stroke="#113A6B" stroke-width="2.225" stroke-linecap="round" stroke-linejoin="round"/>
        </svg> Add Stage
      </button>
      <vue-final-modal classes="modal-container" content-class="modal-content" name="add-stage-modal" v-model="addStagModalValue" :click-to-close='false'>
          <AddStagModal @close="closeModal" @closeNo="closeNoModal"  :projectId="projectId"></AddStagModal>
      </vue-final-modal>
  </div>

</template>


<script setup>
import { onMounted, ref, computed, onBeforeUnmount, onBeforeMount } from 'vue'
import PortalsTableRow from '@/components/project-stage-row.vue'
import projectStageService from '../services/projectStage.service'
import AddStagModal from '../components/AddStagModal.vue';
import '@vuepic/vue-datepicker/dist/main.css';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import { $vfm } from 'vue-final-modal'
import { VueDraggableNext } from 'vue-draggable-next'
import { useToast } from "vue-toastification";
const addStagModalValue = ref(false);
const emit = defineEmits(["updtaeDataParent"]);
const props = defineProps({
  portals: {
    type: Array,
    required: true,
  },
  projectId: {
    type: String,
    required: true
  },
})

const computedPortals = ref([]) 
computedPortals.value = computed(() => {
  return  props.portals
})

const updateData = () => {
  emit('updtaeDataParent');
}

const log = () => {
  const projectStageIds = []
  for(let i=0; i<props.portals.length; i++) {
    projectStageIds.push(props.portals[i].projectStageId)
  }
  const orderData = {
    "projectId": props.projectId,
    "projectStageIds": projectStageIds
  }
  projectStageService.orderStage(orderData).then((res) => {
    useToast().success(res, {
              timeout: 3000,
            });
   emit('updtaeDataParent');
  }).catch(()=>{
   emit('updtaeDataParent');
  })
}

const openAddModal = () => {
    addStagModalValue.value = true;
    $vfm.show('add-stage-modal')
  }

  const closeModal = () => {
    addStagModalValue.value = false;
    $vfm.hide('add-stage-modal');
    updateData();
  } 

  const closeNoModal =() => {
    addStagModalValue.value = false;
    $vfm.hide('add-stage-modal');
  }
</script>


<style scoped>
.create-portal-btn{
  display: inline-block;
    height: 52px;
    padding: 15px 33px;
    font-size: 17px;
    background-color: var(--color-green);
    border-radius: 32px;
    box-shadow: 0 3px 15px rgb(0 0 0 / 10%);
    color: white;
    cursor: pointer;
}

.create-portal-prnt{
  width: 100%;
  text-align: right;
  margin-bottom: 35px;
}
.Controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.Controls .__search {
  flex: 1 1 280px;
  max-width: 280px;
}

.Toggle .__label {
  padding-right: 8px;
  color: var(--color-mute);
  font-size: 14px;
  font-weight: 600;
  vertical-align: middle;
}

.Toggle .__InputToggle {
  vertical-align: middle;
}


.__header-row {
  margin-top: 24px;
}

.__rows {
  background-color: var(--color-white);
  border-radius: var(--radius);
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.07);
}

.__row+.__row {
  border-top: 2px solid var(--color-lighter);
}


.__empty {
  padding: 12px 20px;
  text-align: center;
  color: var(--color-mute);
}

.__ButtonBase{
  background-color: #cbcbcb;
  padding: 6px 30px;
  border-radius: 20px;
  cursor: pointer;
}
.PortalsTable .InputText{
  height: 37px;
  background: #FFFFFF;
  border: 1px solid #E5E5E5;
  border-radius: 100px;
  padding: 7px 24px;
}

.isHeaderRow {
  margin-top: 2px;
}


.row-custom{
  border: none;
  box-shadow: 0px 20px 25px -5px rgba(16, 24, 40, 0.1), 0px 8px 10px -6px rgba(16, 24, 40, 0.1);
  margin-top: 20px;
}

.create-btn-main {
  width: 100%;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  padding: 12px 0;
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
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  transition: all 400ms ease; 
  cursor: pointer;
}

.create-btn:hover{
  background: #113A6B;
  color: #44EA9F;
  transition: all 400ms ease; 
}

.create-btn svg{
  margin-right: 10px;
}

.create-btn:hover{
  background: #113A6B;
  color: #44EA9F;
  transition: all 400ms ease; 
}

.create-btn:hover svg path{
  fill: #113a6b;
  stroke: #44ea92;
}
</style>
