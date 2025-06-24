import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { createPinia } from 'pinia'; 
import authService from './services/authService';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
// import '@ionic/vue/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

// Initialize auth header from stored token (if exists)
// This ensures the auth header is set before any API calls
(async () => {
  try {
    const token = await authService.getToken();
    if (token) {
      await authService.setAuthHeader(token);
    }
  } catch (error) {
    console.error('Error initializing auth header:', error);
  }
})();

const pinia = createPinia();

const app = createApp(App)
  .use(IonicVue, {
    mode: 'ios',
  })
  .use(pinia)
  .use(router);

router.isReady().then(() => {
  app.mount('#app');
});
