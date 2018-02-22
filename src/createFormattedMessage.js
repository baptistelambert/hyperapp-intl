import { h } from 'hyperapp';
import { FormattedMessage } from './FormattedMessage';

const createFormattedMessage = ({
  translations: defaultTranslations,
  defaultLocale
}) => ({
  translations = defaultTranslations,
  locale = defaultLocale,
  ...props
}) => h(FormattedMessage, { ...props, translations, locale });

export { createFormattedMessage };
