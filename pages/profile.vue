<template>
  <div>
      <form @submit.prevent="editProfile()">
     
            <v-text-field disabled dense outlined label="username"  v-model="form.username"></v-text-field>
            <v-text-field dense outlined label="first_name"  v-model="form.first_name"></v-text-field>
            <v-text-field dense outlined label="last_name"  v-model="form.last_name"></v-text-field>  
            <v-text-field dense outlined label="email"  v-model="form.email"></v-text-field> 
            <v-text-field dense outlined label="phone_number"  v-model="form.phone_number"></v-text-field>
            <v-text-field dense outlined label="address"  v-model="form.address"></v-text-field> 
            <v-btn type="submit" color="success">Save</v-btn>
            
      </form>
  </div>
</template>

<script>
import {
    Auth
} from '@/vuexes/auth'
import {
    Core
} from '@/vuexes/core'
export default {
    data(){
        return {
            form:{}
        }
    },
     computed: {
        user() {
            return Auth.user
        }
    },
    async created(){
        await this.getUser()
    },
    methods:{
        async editProfile(){
            await Core.putHttpAlert(`/api/v1/account/userprofile/${this.user.pk}/`,this.form)
        },
        async getUser(){
            this.form = await Core.getHttp(`/api/v1/account/userprofile/${this.user.pk}/`)
           // delete this.form.image_profile
        }
    }
}
</script>

<style>

</style>