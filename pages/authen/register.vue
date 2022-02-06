<template>
<div class="h-screen">
    <div class="h-full flex">
        <div class="flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center">
            <div>
                <h1 class="text-white font-bold text-4xl font-sans">Follow Me</h1>
                <p class="text-white mt-1">ระบบการฝึกเคลื่อนไหวร่างกายแบบออนไลน์ by NECTEC</p>
                <button type="submit" class="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Alpha v.01a</button>
            </div>
        </div>
        <div class="flex w-1/2 justify-center items-center bg-white">
            <form class="bg-white">
                <h1 class="text-gray-800 font-bold text-2xl mb-1">Sign Up</h1>
                <p class="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>

                <form @submit.prevent="register()">

                    <v-text-field required dense outlined label="username" v-model="form.username"></v-text-field>
                    <v-text-field required dense outlined label="password" v-model="form.password"></v-text-field>
                    <v-text-field required dense outlined label="password_confirm" v-model="form.password_confirm"></v-text-field>
                    <v-text-field required dense outlined label="first_name" v-model="form.first_name"></v-text-field>
                    <v-text-field  required dense outlined label="last_name" v-model="form.last_name"></v-text-field>
                    <v-text-field required dense outlined label="email" v-model="form.email"></v-text-field>
                    <v-text-field dense outlined label="phone_number" v-model="form.phone_number"></v-text-field>
                    <v-text-field dense outlined label="address" v-model="form.address"></v-text-field>

                    <v-btn block type="submit" color="success">เข้าสู่ระบบ</v-btn>
                </form>
                <span class="text-sm ml-2 hover:text-blue-500 cursor-pointer">Forgot Password ?</span>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import {Auth} from '@/vuexes/auth'
export default {
    layout: "root",
    data: () => {
        return ({
            form: {}
        })
    },
    async created(){

    },
    methods:{
        async register(){
            let user = await Auth.register(this.form);
            if(user.id){
                alert('Register Success')
                await this.$router.push(`/auth/login`)
            }
        }
    }
}
</script>

<style>

</style>
