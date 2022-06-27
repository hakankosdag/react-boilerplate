import enTranslationMessages from "./languages/en.json";
import trTranslationMessages from "./languages/tr.json";
import { defineMessages } from "react-intl";

export const messages = defineMessages({
  en: {
    id: "shared.app.langEn",
    defaultMessage: "English"
  },
  tr: {
    id: "shared.app.langTr",
    defaultMessage: "Türkçe"
  }
});

export const appLocales = ["en", "tr"];

export const translationMessages = {
  en: enTranslationMessages,
  tr: trTranslationMessages
};
