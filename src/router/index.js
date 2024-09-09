import { createRouter, createWebHistory } from 'vue-router'

// @TODO move guards into own file
const ensureSettingRoute = ({ params }) => {
  const SETTING_ROUTES = [
    'company-info',
    'branding',
    'billing',
  ]

  if (!params.activeSetting || !SETTING_ROUTES.includes(params.activeSetting)) {
    return {
      name: 'settings',
      params: {
        activeSetting: SETTING_ROUTES[0],
      },
    }
  }
}

// @TODO move routes into own file
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/sign-in',
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('@/views/SignInView.vue')
    },
    {
      path: '/overview',
      name: 'overview',
      component: () => import('@/views/OverviewView.vue')
    },
    {
      path: '/portals',
      name: 'portals',
      component: () => import('@/views/PortalsView.vue')
    },
    {
      path: '/stages',
      name: 'stages',
      component: () => import('@/views/StagesView.vue')
    },
    {
      path: '/settings/:activeSetting?',
      name: 'settings',
      component: () => import('@/views/SettingsView/index.vue'),
      beforeEnter: [ensureSettingRoute],
    },
    {
      path: '/projectCustomization',
      name: 'projectCustomization',   
      component: () => import('@/views/ProjectCustomization.vue') 
    },
    {
      path: '/editProjectCustomization/:id',
      name: 'editProjectCustomization',   
      component: () => import('@/views/ProjectCustomization.vue') 
    },
    {
      path: '/projectstage/:id',
      name: 'projectstage',   
      component: () => import('@/views/ProjectStage.vue') 
    },
    {
      path: '/explore-referrals',
      name: 'explore-referrals',
      component: () => import('@/views/ExploreReferralsView.vue')
    },
    {
      path: '/setup-profile/:id',
      name: 'setup-profile',
      component: () => import('@/views/SetupUserProfile.vue')
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/views/ForgotPassword.vue')
    },
    {
      path: '/reset-password/:token',
      name: 'reset-password',
      component: () => import('@/views/ResetPassword.vue')
    },
    
  ]
});



export default router
