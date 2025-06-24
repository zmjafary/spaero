import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import Login from '../views/Login.vue';
import Logout from '../views/Logout.vue';
import Register from '@/views/Register.vue';
import ForgottenPassword from '@/views/ForgottenPassword.vue';
import CheckEmail from '@/views/CheckEmail.vue';
import CreateNewPassword from '@/views/CreateNewPassword.vue';
import ThankYou from '@/views/ThankYou.vue';
import Verification from '@/views/Verification.vue';
import UserAccounts from '@/views/UserAccounts.vue';
import authGuard from '@/authGuard';
import { menuController } from '@ionic/vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/logout',
    component: Logout
  },
  {
    path: '/verification',
    component: Verification,
    beforeEnter: authGuard
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/forgot-password',
    component: ForgottenPassword
  },
  {
    path: '/check-email',
    component: CheckEmail,
  },
  {
    path: '/new-password',
    component: CreateNewPassword
  },
  {
    path: '/thank-you',
    component: ThankYou
  },
  {
    path: '/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: 'home',
        component: () => import('@/views/Home.vue'),
        beforeEnter: authGuard
      },
      {
        path: 'purchase',
        component: () => import('@/views/Purchase.vue'),
        beforeEnter: authGuard
      },
      {
        path: 'purchase/rfqs',
        component: () => import('@/views/PurchaseRFQs.vue'),
        beforeEnter: authGuard
      },
      {
        path: 'purchase/rfqs/:id',
        component: () => import('@/views/PurchaseRFQ.vue'),
        beforeEnter: authGuard
      },
      {
        path: 'purchase/create',
        component: () => import('@/views/PurchaseCreate.vue'),
        beforeEnter: authGuard
      },
      {
        path: 'user-accounts',
        component: () => import('@/views/UserAccounts.vue'),
        beforeEnter: authGuard
      },
      {
        path: 'user-accounts/create',
        component: () => import('@/views/UserAccountsCreate.vue'),
        beforeEnter: authGuard
      },
      {
        path: 'finances',
        component: () => import('@/views/Finances.vue'),
        beforeEnter: authGuard
      },
      {
        path: 'account-details',
        component: () => import('@/views/AccountDetails.vue'),
        beforeEnter: authGuard
      },
      {
        path: 'basket',
        component: () => import('@/views/Basket.vue'),
        beforeEnter: authGuard,
      },
      {
        path: 'basket/confirm/:type',
        component: () => import('@/views/ConfirmOrder.vue'),
        beforeEnter: authGuard,        
      },
      {
        path: 'support-tickets',
        component: () => import('@/views/Support.vue'),
        beforeEnter: authGuard
      },
      {
        path: 'account-details',
        component: () => import('@/views/AccountDetails.vue')
      },
      {
        path: 'order/details/:id', 
        component: () => import('@/views/OrderDetails.vue')
      },
      {
        path: 'account-details/change-password',
        component: () => import('@/views/ChangePassword.vue')
      },
      {
        path: 'repair',
        component: () => import('@/views/Repair.vue')
      },
      {
        path: 'repair/create',
        component: () => import('@/views/RepairCreate.vue')
      },
      {
        path: 'repair/rfqs',
        component: () => import('@/views/RepairRFQs.vue'),
        beforeEnter: authGuard
      },
      {
        path: 'repair/rfqs/:id',
        component: () => import('@/views/RepairRFQ.vue'),
        beforeEnter: authGuard
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  try {
    menuController.close();
    next();
  } catch (error) {
  
  }
});
   

export default router
