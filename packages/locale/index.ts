import { ref, reactive } from 'vue';
import { deepAssign } from '../utils/deepAssign';
import defaultMessages from './lang/zh-CN';

type Messages = Record<string, LangMessage>;
import { LangMessage } from './lang'

const lang = ref('zh-CN');
const messages = reactive<Messages>({
  'zh-CN': defaultMessages,
});

export const Locale = {
  messages(): LangMessage {
    return messages[lang.value];
  },

  use(newLang: string, newMessages?: Partial<LangMessage>) {
    lang.value = newLang;
    this.add({ [newLang]: newMessages });
  },

  add(newMessages:Partial<LangMessage> = {}) {
    deepAssign(messages, newMessages);
  },
};

export default Locale;