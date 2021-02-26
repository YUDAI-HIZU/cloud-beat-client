require('dotenv').config()

let baseUrl = 'http://localhost:3000'
if (process.env.NODE_ENV === 'production') {
  baseUrl = 'https://cloud-beat-pro.web.app'
}

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Cloud Beat',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/reset.css',
    '~/assets/css/common.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/auth',
    '~/plugins/push',
    '~/plugins/repository.ts'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api',
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'cookie-universal-nuxt',
    '@nuxtjs/dotenv',
    '@nuxtjs/apollo'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  generate: {
    // choose to suit your project
    interval: 2000,
  },

  env: {
    BASE_URL: baseUrl,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_SEND_ID: process.env.FIREBASE_SEND_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    FIREBASE_VAPID_KEY: process.env.FIREBASE_VAPID_KEY
  },
  apollo: {
    clientConfigs: {
      default: '~/apollo/client-configs/default.ts',
    }
  },
  vuetify: {
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#2db1bb',
          secondary: '#2db1bb',
          accent: '#17a9da',
          grayLine: '#d8e1e7',
          grayBackground: '#b3bec6',
          background: '#000',
          gray: '#b3bec6',
          important: '#f1418c',
          red: '#ff0000'
        }
      }
    }
  },
}
