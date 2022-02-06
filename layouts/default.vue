<template>
<v-app dark>

    <v-app-bar fixed  app>

        <v-toolbar-title>FOLLOWME ALPHA</v-toolbar-title>
        <v-spacer />
        <v-btn @click="$router.push(`/`)" text class="ml-2" color="success">Home</v-btn>
        <v-btn @click="$router.push(`/courses`)" text class="ml-2" color="success">Courses</v-btn>
        <v-btn @click="$router.push(`/mycourse`)" text class="ml-2" color="success">My Courses</v-btn>
        <v-btn @click="$router.push(`/profile`)" text class="ml-2" color="success">Profile</v-btn>
        <v-btn @click="logout()" text class="ml-2" color="success">logout</v-btn>
    </v-app-bar>
    <v-main>
        <v-container v-if="response">
            <Nuxt /> 
        </v-container>
    </v-main>

    <v-footer   app>
        <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
</v-app>
</template>

<script>
import {
    Auth
} from '@/vuexes/auth'
import {
    Core
} from '@/vuexes/core'
export default {
    name: 'DefaultLayout',
    data() {
        return {
            response:false
         }
    },
    async created() {
       await Auth.checkToken();
        await Auth.setUser(); 
        await this.checkUser();
        this.response = true
    },
    methods: {
        async logout() {
            await Auth.logout();
            await location.reload();
        },
        async checkUser() {
            let user = await Auth.getUser();
            if (!user.pk) {
                await this.$router.replace(`/authen/login`)
            } else {
               // await Core.getChoices();
            }
        }
    }
}
</script>
