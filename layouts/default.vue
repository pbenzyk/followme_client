<template>
<v-app dark>

    <v-app-bar fixed  app class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">

        <v-toolbar-title><span class="fl text-white text-2xl"><v-icon class="text-2xl text-white">mdi-dance-pole</v-icon> Follow Me</span> 
        <v-btn class="ml-1" x-small elevation="2" >Alpha 1.5</v-btn>
        </v-toolbar-title>
        <v-spacer />
        <v-btn dark @click="$router.push(`/`)" text class="ml-2" >หน้าแรก</v-btn>
        <v-btn dark @click="$router.push(`/courses`)" text class="ml-2" >ห้องเรียน</v-btn>
        <v-btn v-if="user.is_staff" dark @click="$router.push(`/mycourse`)" text class="ml-2" >บทเรียนของฉัน</v-btn>
        <v-btn dark @click="$router.push(`/profile`)" text class="ml-2" >โปรไฟล์</v-btn>
        <v-btn dark @click="logout()" text class="ml-2" >ออกจากระบบ</v-btn>
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
            response:false,
            user:{}
         }
    },
    async created() {
       await Auth.checkToken();
        await Auth.setUser(); 
        await this.checkUser();
        this.user = Auth.user;
        await this.getUser();
        this.response = true
    },
    computed: {
         
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
        },
          async getUser(){
            this.user = await Core.getHttp(`/api/v1/account/userprofile/${this.user.pk}/`)
           // delete this.form.image_profile
        }
    }
}
</script>
