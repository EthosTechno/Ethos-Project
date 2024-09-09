<template>
  <div class="PortalsView">
    <div class="h1 portalsview-main-title">
      <div class="create-portal-prnt"> <h1 class="custom-title">Explore Portals</h1>
      

        <ButtonBase class="create-portal-btn" @cancel="showModal = false" @click="openCreatePortal" >
          <svg xmlns="http://www.w3.org/2000/svg" width="27" height="28" viewBox="0 0 27 28" fill="none">
            <path d="M13.3333 10.3888V14M13.3333 14V17.6111M13.3333 14H16.9444M13.3333 14H9.72222M24.1667 14C24.1667 19.983 19.3164 24.8333 13.3333 24.8333C7.35025 24.8333 2.5 19.983 2.5 14C2.5 8.01687 7.35025 3.16663 13.3333 3.16663C19.3164 3.16663 24.1667 8.01687 24.1667 14Z" stroke="#113A6B" stroke-width="2.225" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
            Create Portal
        </ButtonBase>
        <vue-final-modal v-model="createPortalModal" name="create_portal" :click-to-close="clickOut" @click-outside="clickOutside"  >
          <div class="portal-modal">
            <CreatePortalModal  @close="closeModal"  />
          </div>
        </vue-final-modal>
      </div>
    </div>
    <PortalsTable :portals="PORTALS_DATA" />
  </div>
</template>


<script>
import PortalsTable from '@/components/PortalsTable.vue'
import { $vfm } from 'vue-final-modal'
import CreatePortalModal from '@/views/CreatePortalView.vue'

export default {
  data() {
    return {
      PORTALS_DATA :  [],
      createPortalModal: false,
      clickOut: false
    }
  },
  components: {
    PortalsTable,
    CreatePortalModal
  },
  methods: {
    openCreatePortal()  { 
      this.createPortalModal = true
      $vfm.show('create_portal')
    },
    closeModal() {
      this.createPortalModal = false;
      $vfm.hide('create_portal')
    },
    clickOutside() {
      this.clickOut = false
    }
  },
 }


</script>
<style scoped>
  .portal-modal{
    max-height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    position: fixed;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
  }
  .create-portal-prnt{
   display: flex;
   justify-content: space-between;
  }

  .create-portal-btn{
    display: inline-block;
    padding: 14px 28px;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    background-color: var(--color-green-dark);
    border-radius: 32px;
    box-shadow: 0 3px 15px rgb(0 0 0 / 10%);
    color: var(--color-dark-blue);
    cursor: pointer;
  }
  .create-portal-btn svg{
    vertical-align: middle;
  }
  .create-portal-btn img{
    margin-right: 4px;
    width: 20px;
    height: 20px;
    vertical-align: -4px;
  }
  .create-portal-btn:hover{
    background-color: var(--color-dark-blue);
    color: var(--color-green-dark);
  }
  .create-portal-btn:hover svg path{
    stroke: var(--color-green-dark);
  }
  .portalsview-main-title{
    margin-bottom: 42px;
  }
  .custom-title{
    color: #113a6b;
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
  }

</style>
