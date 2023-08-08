import { pt } from '@formkit/i18n'
import { generateClasses } from '@formkit/themes'
import { DefaultConfigOptions } from '@formkit/vue'
import tailwindFormkitTheme from './tailwind-formkit-theme'

const config: DefaultConfigOptions = {
  config: {
    classes: generateClasses(tailwindFormkitTheme),
  },
  locales: { pt },
  locale: 'pt',
}

export default config;