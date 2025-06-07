import fr from '@/messages/fr.json';
import en from '@/messages/en.json';

const messagesMap = {
  fr,
  en,
} as const;

export type SupportedLocale = keyof typeof messagesMap;

export function getLocaleFromRequest(req: Request): SupportedLocale {
  const cookieHeader = req.headers.get('cookie') ?? '';
  const match = cookieHeader.match(/NEXT_LOCALE=(\w+)/);
  const locale = match?.[1];

  if (locale && Object.hasOwn(messagesMap, locale)) {
    return locale as SupportedLocale;
  }

  return 'fr';
}

export function getT(locale: SupportedLocale, namespace?: string) {
  const messages = messagesMap[locale] as Record<string, unknown>;

  return (key: string): string => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    const segments = fullKey.split('.');

    let current: unknown = messages;
    for (const segment of segments) {
      if (typeof current === 'object' && current !== null && segment in current) {
        current = (current as Record<string, unknown>)[segment];
      } else {
        return fullKey;
      }
    }

    return typeof current === 'string' ? current : fullKey;
  };
}
