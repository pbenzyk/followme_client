<template>
<div>

    <section class="py-24">
        <div class="container px-4 mx-auto">
            <div class="w-full   mb-16">
                <v-toolbar flat color="transparent">
                    <h2 class="my-5 text-4xl font-bold font-heading text-blue-800">My Courses</h2>
                    <v-spacer></v-spacer>
                    <v-btn @click="dialog=true" color="success">Create Course</v-btn>
                </v-toolbar>
                <p class="text-lg text-gray-500">All Courses in my database</p>
            </div>
            <div class="flex flex-wrap items-center mb-6 bg-blue-50" v-for="(course,index) in courses" :key="index">
                <div class="w-full lg:w-2/5 h-80">
                    <img class="w-full h-full object-cover clip-path-right-top" src="https://images.unsplash.com/photo-1581279219053-6c0ef420e10b?ixlib=rb-1.2.1&amp;ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80" alt="">
                </div>
                <div class="w-full lg:w-3/5 p-8 lg:px-16">
                    <h2 class="mb-2 text-2xl font-semibold font-heading text-blue-800">{{course.name}}</h2>
                    <span class="text-xs text-blue-400 font-semibold">{{course.created_at}}</span>
                    <p class="my-2 text-base leading-loose text-gray-500">{{course.detail}}</p>
                    <v-btn small outlined color="success">Go to Course</v-btn>
                </div>
            </div>
        </div>
    </section>

    <v-dialog v-model="dialog" scrollable persistent :overlay="false" max-width="500px" transition="dialog-transition">
        <v-card>
            <v-card-title primary-title>
                Create Course <v-spacer></v-spacer>
                <v-btn @click="dialog=false" icon color="red">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <form ref="form_course" @submit.prevent="createCourse()">
                    <v-text-field dense outlined label="name" v-model="form.name"></v-text-field>
                    <v-textarea rows="3" dense outlined label="detail" v-model="form.detail"></v-textarea>
                    <input ref="video_course" accept="video/*" type="file" />

                    <br><br>
                    <v-btn type="submit" block color="success">Create New Course</v-btn>
                </form>
            </v-card-text>
        </v-card>
    </v-dialog>

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
    data() {
        return {
            dialog: false,
            form: {},
            courses: []
        }
    },
    computed: {
        user() {
            return Auth.user
        }
    },
    async created() {
        await this.loadCourse();
    },
    methods: {
        async loadCourse() {
            this.courses = await Core.getHttp(`/api/v1/course/course/?user=${this.user.pk}`)
        },
        async createCourse() {
            let video = this.$refs.video_course.files[0]
            let formData = new FormData()
            formData.append('name', this.form.name);
            formData.append('detail', this.form.name);
            formData.append('video', video);
            formData.append('user', this.user.pk);
            console.log(formData);
            let update = await Core.postFileHttpAlert(`/api/v1/course/course/`, formData)
            this.$refs.form_course.reset()
            this.dialog = false
            await this.loadCourse()
        }
    }
}
</script>

<style>

</style>
