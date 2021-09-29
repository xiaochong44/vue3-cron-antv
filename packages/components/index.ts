import VueCron from './cron/index.vue'
import type { App } from 'vue';

VueCron.install=function (app: App) {
  app.component(VueCron.name, VueCron);
  return app;
};
export default VueCron