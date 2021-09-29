import type { App } from 'vue';
import  VueCron  from './components'

const install = function (app) {
  if(VueCron.install){    
    app.use(VueCron)
  }
  return app;
};
export default {
  install,
  VueCron
}
