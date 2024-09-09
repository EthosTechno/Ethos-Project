<template>
  <div class="create-btn-main">
    <router-link to= "/projectCustomization">
      <button class="create-btn">
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.3333 8.38888V12M12.3333 12V15.6111M12.3333 12H15.9444M12.3333 12H8.72222M23.1667 12C23.1667 17.9831 18.3164 22.8333 12.3333 22.8333C6.35025 22.8333 1.5 17.9831 1.5 12C1.5 6.0169 6.35025 1.16666 12.3333 1.16666C18.3164 1.16666 23.1667 6.0169 23.1667 12Z" stroke="#113A6B" stroke-width="2.225" stroke-linecap="round" stroke-linejoin="round"/>
        </svg> Create Project
      </button>
    </router-link>
  </div>

  <div class="StagesView">
    <div class="title">Portal Projects</div>
  </div>

  <div class="table-custom">
    <PortalsTable  :portals="PORTALS_DATA"/>
  </div>


</template>


<script setup>
import {ref} from 'vue'
import PortalsTable from "@/components/project-list-table.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const PORTALS_DATA = ref([])
</script>


<style scoped>
.title {
  color: #113a6b;
  font-style: normal;
  font-weight: 700;
  font-size: 34px;
  line-height: 22px;
  margin: 20px 0 50px;
  display: inline-block;
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
  width: 190px;
  min-width: 190px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
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