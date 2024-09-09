<template>
  <div class="create-btn-main">
    <button class="create-btn"   @click="handleClickReturnProject"> 
      Return to Projects
    </button>
  </div>

  <div class="StagesView">
    <div class="title">
        <a href="#" class="back-btn" @click="handleClickBack"><img src="../assets/back-Icon.svg" alt="create"/></a> 
        <h1>Portal Project Stages <span v-tooltip="projectName"> {{ projectName }} </span></h1>
    </div>
  </div>

  <div class="table-custom">
    <h3>Manage Stages</h3>
    <PortalsTable :portals="STAGE_DATA" :projectId="projectId" @updtaeDataParent="updateData" />
  </div>




</template>


<script setup>
  import {ref,onMounted} from 'vue'
  import PortalsTable from "@/components/project-stage-table.vue";
  import AddStagModal from '../components/AddStagModal.vue';
  import projectStageService from "../services/projectStage.service"
  import InputToggle from "@/components/InputToggle.vue";
  import { useRouter, useRoute } from "vue-router";



  const router = useRouter();
  const route = useRoute() 
  const isShowingClosedPortals = ref(true)
  const addStagModalValue = ref(false);
  const projectName = ref('');
  const STAGE_DATA = ref([]);
  const projectId = route.params.id
  
  const updateData = () => {
    projectStageService.getProjectStage(projectId).then((res) => {  
      const item = res.data.data
      STAGE_DATA.value = item.projectStages;
    })
  }

 onMounted(() => {
    projectStageService.getProjectStage(projectId).then((res) => {  
      projectName.value = res.data.data.projectName;
      STAGE_DATA.value = res.data.data.projectStages;
    })
  })

  const handleClick = () => {
    router.push("projectCustomization");
  };

  const openAddModal = () => {
    addStagModalValue.value = true;
  }

  const closeModal = () => {
    addStagModalValue.value = false;
    projectStageService.getProjectStage(props.projectId).then((res) => {  
      const item = res.data.data
      STAGE_DATA.value = item.projectStages;
    })
  } 

 const  handleClickBack = () => {
  router.push(`/editProjectCustomization/${projectId}`);
 }

 const handleClickReturnProject = () => {
  router.push(`/stages`)
 }
</script>


<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700;1,900&display=swap');
.title{
  margin: 20px 0 50px;
  display: flex;
  flex-direction: column;
}


.title span{
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 0;
  color: #888888;
  margin-left: 20px;
  margin-top: 5px;
  display: inline-block;
  width: 180px;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
  line-height: 25px;
}

.title h1{
  color: #113A6B;
  font-style: normal;
  font-weight: 700;
  font-size: 34px;
  line-height: 22px;
  display: flex;
  align-items: center;
}

.back-btn{
  margin-top: -45px;
  margin-bottom: 20px;
  display: inline-block;
  width: 28px;
  height: 25px;
}
.table-custom h3{
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 700;
  font-size: 21px;
  line-height: 22px;
  color: #333333;
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

.toggle-btn-main {
  display: flex;
  justify-content: flex-end;
  padding: 20px 0 30px;
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

.__empty {
  padding: 12px 20px;
  color: var(--color-mute);
}


</style>