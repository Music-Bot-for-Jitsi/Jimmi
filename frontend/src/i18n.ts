import { config } from './config';
import type { JimmiApi } from './models/JimmiApi';
import { register, init, getLocaleFromNavigator, addMessages } from 'svelte-i18n';
import type { IJimmiTranslationObject } from 'models/JimmiPlugin';

function unflatten(keys: string[], obj: IJimmiTranslationObject): IJimmiTranslationObject {
  if (keys.length === 0) {
    return obj;
  }
  let newObj = {};
  newObj[keys.pop()!] = obj;
  return unflatten(keys, newObj);
}

config.plugins
  .forEach((pluginClass) => {
    const plugin = new pluginClass({} as JimmiApi);
    if (plugin.translations) {
      Object.keys(plugin.translations).forEach((lang) => {
        const obj = unflatten(plugin.meta.id.split('.'), plugin.translations[lang]);
        addMessages(lang, { plugins: obj });
      });
    }
  });

register('en', () => import('./lang/en.json'));

export function setupI18n(): void {
  init({
    fallbackLocale: 'en',
    initialLocale: getLocaleFromNavigator(),
  });
}
