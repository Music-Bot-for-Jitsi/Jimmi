import { getLocaleFromNavigator, init, register } from 'svelte-i18n';

register('en', () => import('./lang/en.json'));

export function setupI18n(): void {
  init({
    fallbackLocale: 'en',
    initialLocale: getLocaleFromNavigator(),
  });
}
