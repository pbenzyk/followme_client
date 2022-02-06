import colors from 'vuetify/es5/util/colors'

export default {
    ssr: false,
    generate: {
        fallback: true
    },
    target: "static",

    router: {
        mode: 'history',
        base: "/followme_client/"
    },
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s - followme_client',
        title: 'followme_client',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css' },
            { rel: 'stylesheet', href: 'https://emoji-css.afeld.me/emoji.css' },
            { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' },
        ],
        script: [
            { src: 'https://cdn.tailwindcss.com' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        'material-icons/iconfont/material-icons.css'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // Simple usage
        'quasar-nuxt'
    ],

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                }
            }
        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {}
}