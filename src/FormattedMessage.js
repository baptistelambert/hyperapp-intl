import IntlMessageFormat from 'intl-messageformat';

const FormattedMessage = ({
  render,
  id,
  locale,
  translations,
  values,
  defaultMessage
}) => {
  const messageId =
    locale in translations && id in translations[locale]
      ? translations[locale][id]
      : defaultMessage ? defaultMessage : id;

  const message = new IntlMessageFormat(messageId, locale).format(values);

  return render ? render({ message }) : message;
};

export { FormattedMessage };
