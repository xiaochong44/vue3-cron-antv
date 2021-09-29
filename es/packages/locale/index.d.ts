import { LangMessage } from './lang';
export declare const Locale: {
    messages(): LangMessage;
    use(newLang: string, newMessages?: Partial<LangMessage>): void;
    add(newMessages?: Partial<LangMessage>): void;
};
export default Locale;
