import VueCron from './cron/index.vue';
VueCron.install = function (app) {
    app.component(VueCron.name, VueCron);
    return app;
};
export default VueCron;
//# sourceMappingURL=index.js.map