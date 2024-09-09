<template>
  <nav
    class="NavigationGlobal">
    <div
      class="Logo"
      @click="handleLinkClick({ to: {
        name: 'overview',
      }})">
    </div>

    <div
      class="__leading">
      <NavigationGlobalLink
        v-for="link in navigationLinks.leading"
        :icon-name="link.iconName"
        :label="link.label"
        :is-active="isLinkActive(link)"
        :key="link.label"
        @click="handleLinkClick(link)"
      />
    </div>

    <div
      class="__trailing">
      <NavigationGlobalLink
        v-for="link in navigationLinks.trailing"
        :icon-name="link.iconName"
        :label="link.label"
        :is-active="isLinkActive(link)"
        :key="link.label"
        @click="handleLinkClick(link)"
      />
    </div>
  </nav>
</template>


<script setup>
import { useRouter, useRoute } from 'vue-router'
import NavigationGlobalLink from '@/components/NavigationGlobalLink.vue';

const router = useRouter()
const route = useRoute()

const navigationLinks = {
  leading: [
    {
      iconName: 'home',
      label: 'Overview',
      to: {
        name: 'overview',
      },
    },
    {
      iconName: 'user-location',
      label: 'Portals',
      to: {
        name: 'portals',
      },
    },
    {
      iconName: 'explore-referrals',
      label: 'explore-referrals',
      to: {
        name: 'explore-referrals'
      }
    },
    {
      iconName: 'stages',
      label: 'Stages',
      to: {
        name: 'stages',
      },
    },
    {
      iconName: 'gear',
      label: 'Settings',
      to: {
        name: 'settings',
      },
    },
  ],

  trailing: [
    {
      iconName: 'leave',
      label: 'Log Out',
      to: {
        name: 'sign-in',
      },
    },
  ],
}

const isLinkActive = (link) => {
  return link.to.name === route.name;
}

const handleLinkClick = (link) => {
  if (isLinkActive(link)) return;

  if (link.to.name == 'sign-in') {
    localStorage.removeItem('user');
  }
  router.push(link.to);
}
</script>


<style scoped>
.NavigationGlobal {
  --trailing-link-count: 1px;
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: var(--navigation-width);
  height: 100%;
  text-align: center;
  border-right: 1px solid var(--color-lighter);
  background-color: var(--color-white);
}

.Logo {
  position: relative;
  width: 100%;
  height: var(--navigation-width);
  background-image: url('@/assets/portal-icon.png');
  background-position: center;
  background-size: 25px auto;
  background-repeat: no-repeat;
  cursor: pointer;
}

.__leading,
.__trailing {
  display: flex;
  flex-direction: column;
  align-items: center;;
}

.__leading {
  height: calc(100% - var(--navigation-width));
  padding-bottom: 80px;
  overflow-y: auto;
  justify-content: center;
}

.__trailing {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-bottom: 8px;
  background-color: var(--color-white);
  box-shadow: -4px -2px 8px rgba(var(--color-white), 1);
}
</style>
