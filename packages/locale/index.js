import { ref, reactive } from 'vue';
import { deepAssign } from '../utils/deepAssign';
import defaultMessages from './lang/zh-CN';
const lang = ref('zh-CN');
const messages = reactive({
    'zh-CN': defaultMessages,
});
export const Locale = {
    messages() {
        return messages[lang.value];
    },
    use(newLang, newMessages) {
        lang.value = newLang;
        this.add({ [newLang]: newMessages });
    },
    add(newMessages = {}) {
        deepAssign(messages, newMessages);
    },
};
export default Locale;
//# sourceMappingURL=index.js.map