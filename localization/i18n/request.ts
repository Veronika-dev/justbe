import {getRequestConfig} from 'next-intl/server';
import {cookies, headers} from 'next/headers';

export default getRequestConfig(async ({requestLocale}) => {
  const store = await cookies();
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '/';

  let locale = await requestLocale;

  if (!locale || locale === 'default') {
    const pathLocale = pathname.split('/')[1];
    if (pathLocale === 'en' || pathLocale === 'ru') {
      locale = pathLocale;
    } else {
      locale = store.get('locale')?.value || 'ru';
    }
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
