<template>
<div>
    <div class="h-screen flex">
        <div class="flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center">
            <div>
                <h1 class="text-white font-bold text-4xl font-sans">Follow Me</h1>
                <p class="text-white mt-1">ระบบการฝึกเคลื่อนไหวร่างกายแบบออนไลน์ by NECTEC</p>
                <button type="submit" class="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Alpha v.01a</button>
            </div>
        </div>
        <div class="flex w-1/2 justify-center items-center bg-white">
            <form class="bg-white">
                <h1 class="text-gray-800 font-bold text-2xl mb-1">Sign In</h1>
                <p class="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>

                <form @submit.prevent="login()">
                    <v-text-field required v-model="form.username" outlined name="name" label="Username" id="id"></v-text-field>
                    <v-text-field required v-model="form.password" outlined name="name" label="Password" id="id"></v-text-field>
                    <v-btn block type="submit" color="success">เข้าสู่ระบบ</v-btn>
                </form>
                <span class="text-sm ml-2 hover:text-blue-500 cursor-pointer">Forgot Password ?</span>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import {
    Core
} from '@/vuexes/core'
import {
    Auth
} from '@/vuexes/auth'
export default {
    layout: 'root',
    data: () => ({
        form: {}
    }),
    async created() {
        await this.checkUser();
    },
    methods: {
        async login() {
            await Auth.login(this.form);
            let user = await Auth.getUser();
            console.log(user);
            if (user.pk) {
                //await location.reload();
                await this.$router.replace('/')
                await location.reload();
            }
        },
        async checkUser() {
            let user = await Auth.getUser();
            if (user.pk) {
                await this.$router.replace('/')
            }
        }
    }
}
</script>

<style>

</style>
