// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    build: {
        extractCSS: false,
        transpile: ["vuetify"],
    },
    css: [
        "@/assets/scss/style.scss",
        '@/assets/css/main.css',
    ],
    vite: {
        define: {
            "process.env.DEBUG": false,
        },
    },
    modules: [
        '@pinia/nuxt',
    ],
    buildModules: [
        '@nuxtjs/google-fonts'
    ],
})