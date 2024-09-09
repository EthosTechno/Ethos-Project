<template>
  <!-- Public Views -->
  <template
    v-if="route.name && route.name === 'sign-in'">
    <RouterView/>
  </template>

  
  <template
    v-if="route.name && route.name === 'setup-profile'">
    <RouterView/>
    
  </template>

  <template
    v-if="route.name && route.name === 'reset-password'">
    <RouterView/>
    
  </template>

  <template
    v-if="route.name && route.name === 'forgot-password'">
    <RouterView/>
    
  </template>

  <!-- Auth Views -->
  <template
    v-if="route.name && route.name !== 'sign-in' && route.name !== 'setup-profile' && route.name !== 'reset-password'  && route.name !== 'forgot-password' && authHeader() ">
    <NavigationGlobal/>

    <main
      class="__view">
      <div
        class="container">
        <RouterView/>
      </div>
    </main>
  </template>
</template>


<script setup>
import { computed,ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import NavigationGlobal from '@/components/NavigationGlobal.vue'
import authHeader from './services/auth-header';

var inactivityTime = function () {
    var time;
    window.onload = resetTimer;
    
    document.onmousemove  = resetTimer;
    document.onkeydown = resetTimer;
    document.onmousemove = resetTimer;
    document.onmousedown = resetTimer;
    document.ontouchstart = resetTimer;
    document.onclick = resetTimer;
    document.addEventListener('scroll', resetTimer, true);

    function logout() {
      if(authHeader()){
        localStorage.removeItem('user');
         localStorage.setItem('sessionTimeout', true);
      }
    }

    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(logout, 2000* 60 * 60)
    }
};

window.onload = function() {
  inactivityTime();
}

window.onchange= function() {
  inactivityTime();
}


const PUBLIC_VIEWS = ['sign-in']

const route = useRoute()

const isPublicView = ref(true)

isPublicView.value = computed(() => PUBLIC_VIEWS.includes(route.name))
</script>


<style scoped>
.__view {
  padding-top: var(--navigation-width);
  padding-right: 5%;
  padding-left: calc(var(--navigation-width) + 5%);
}


.container {
    max-width: 100%;
}


</style>
