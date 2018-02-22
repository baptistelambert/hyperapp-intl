# hyperapp-intl

Internationalize hyperapp web applications.

Inspired by [react-intl](https://github.com/yahoo/react-intl).

## Installation

```
npm install hyperapp-intl
# or with yarn
yarn add hyperapp-intl
```

## Usage

### Using createFormattedMessage (recommended)

By using `createFormattedMessage`, you can directly provide an object with the translations you'll be using with a FormattedMessage component, as well as a default locale.

```js
import { h, app } from 'hyperapp';

import { createFormattedMessage } from 'hyperapp-intl';

// Create an object of translations
// The keys of the object must be the same as the locale names you'll use
const translations = {
  en: {
    HELLO: 'Hello !',
    // You can also format translations
    PHOTOS: `{name} took {numPhotos, plural
      =0 {no photos}
      =1 {one photo}
      other {# photos}
    } on {takenDate, date, long}.`
  },
  fr: {
    HELLO: 'Bonjour !',
    PHOTOS: `{name} {numPhotos, plural,
      =0 {n'a pris aucune photo}
      =1 {a pris une photo}
      other {a pris # photos}
    } le {takenDate, date, long}.`
  }
};

// If you want to control the locale of the app you'll have to use the state of the app
const state = {
  locale: 'en'
};

// You will also have to define an action to control the locale
const actions = {
  setLocale: locale => state => ({ locale })
};

// Create the component you'll use throughout your app
// Set the translations parameters with your translation object and/or a default locale
const FormattedMessage = createFormattedMessage({
  translations,
  defaultLocale: 'en'
});

const view = (state, actions) => (
  <main>
    <div>
      {/* These buttons control the locale in the state */}
      <button onclick={() => actions.setLocale('en')}>EN</button>
      <button onclick={() => actions.setLocale('fr')}>FR</button>
    </div>
    <FormattedMessage
      {/* Provide the translation key from you translations object */}
      id={'HELLO'}
       {/* Provide the locale, it'll use the default locale if you don't provide one */}
      locale={state.locale}
       {/* Render the message, you'll get your message as a string if you don't provide a render prop */}
      render={({ message }) => <div>{message}</div>}
    />
    <FormattedMessage
      id={'PHOTOS'}
      locale={state.locale}
      {/* Pass the values needed when you want to format a message */}
      values={{
        name: 'Baptiste',
        numPhotos: 1000,
        takenDate: Date.now()
      }}
      render={({ message }) => <div>{message}</div>}
    />
  </main>
);

app(state, actions, view, document.getElementById('root'));
```

### Using the FormattedMessage component

If you want, you can also directly use the FormattedMessage component from the package, but you will have to provide it the locale and the translations object as props.

```js
import { h, app } from 'hyperapp';

import { FormattedMessage } from 'hyperapp-intl';

const translations = {
  en: {
    HELLO: 'Hello !',
    PHOTOS: `{name} took {numPhotos, plural,
      =0 {no photos}
      =1 {one photo}
      other {# photos}
    } on {takenDate, date, long}.`
  },
  fr: {
    HELLO: 'Bonjour !',
    PHOTOS: `{name} {numPhotos, plural,
      =0 {n'a pris aucune photo}
      =1 {a pris une photo}
      other {a pris # photos}
    } le {takenDate, date, long}.`
  }
};

const state = {
  locale: 'en'
};

const actions = {
  setLocale: locale => state => ({ locale })
};

const view = (state, actions) => (
  <main>
    <div>
      <button onclick={() => actions.setLocale('en')}>EN</button>
      <button onclick={() => actions.setLocale('fr')}>FR</button>
    </div>
    <FormattedMessage
      id={'HELLO'}
      locale={state.locale}
      {/* Provide the translations object */}
      translations={translations}
      render={({ message }) => <div>{message}</div>}
    />
    <FormattedMessage
      id={'PHOTOS'}
      locale={state.locale}
      values={{
        name: 'Baptiste',
        numPhotos: 1000,
        takenDate: Date.now()
      }}
      translations={translations}
      render={({ message }) => <div>{message}</div>}
    />
  </main>
);

app(state, actions, view, document.getElementById('root'));
```

## Message Formatting

This package uses [intl-messageformat](https://github.com/yahoo/intl-messageformat) under the hood.
If you want to know more about message formatting using this lib, I recommend you to go see their [documentation](https://formatjs.io/guides/message-syntax/).
