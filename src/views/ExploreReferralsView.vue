<template>
    <div class="top-part">
      <div class="StagesView">
        <div class="title">Explore Referrals</div>
      </div>
    </div>
  
   
  
    <div class="table-custom">
      <PortalsTable />
    </div>
  

  </template>
  
  
  <script setup>
  import {onMounted, ref} from 'vue'
  import PortalsTable from "@/components/explorereferrals-table.vue";
  import InputSelect from '@/components/InputSelect.vue'
  import { useRouter } from "vue-router";
  import dashboardService from '../services/dashboard.service'
  import exploreReferralService from '../services/exploreReferrals.service';

  
  const router = useRouter();

  </script>
  
  
  <style scoped>
  .title {
    color: #113a6b;
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    line-height: 22px;
    margin: 20px 0 40px;
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
    width: 205px;
    min-width: 205px;
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

  .top-part{
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  </style>