import App from './App.svelte';
import { setupI18n } from './i18n.ts';

setupI18n();

const _app = new App({
  target: document.querySelector('#__snel'),
  props: {},
});
