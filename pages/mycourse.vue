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
                    <img v-if="course.image" class="w-full h-full object-cover clip-path-right-top"  :src="course.image" alt="">
                    <img v-else class="w-full h-full object-cover clip-path-right-top" src="https://images.unsplash.com/photo-1581279219053-6c0ef420e10b?ixlib=rb-1.2.1&amp;ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80" alt="">
                </div>
                <div class="w-full lg:w-3/5 p-8 lg:px-16">
                    <h2 class="mb-2 text-2xl font-semibold font-heading text-blue-800">{{course.name}}</h2>
                    <span class="text-xs text-blue-400 font-semibold">{{dateConvert(course.created_at)}}</span>
                    <p class="my-2 text-base leading-loose text-gray-500">{{course.detail}}</p>
                    <v-btn small outlined color="success">Go to Course</v-btn>
                    <v-btn @click="openUpdate(course)" small outlined color="warning">แก้ไขบทเรียน</v-btn>
                    <v-btn @click="deleteCourse(course.id)" small outlined color="error">ลบบทเรียน</v-btn>
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
                    <input ref="image_course" accept="image/*" type="file" />
                    <v-text-field dense outlined label="name" v-model="form.name"></v-text-field>
                    <v-textarea rows="3" dense outlined label="detail" v-model="form.detail"></v-textarea>
                    <input ref="video_course" accept="video/*" type="file" />

                    <br><br>
                    <v-btn type="submit" block color="success">Create New Course</v-btn>
                </form>
            </v-card-text>
        </v-card>
    </v-dialog>

        <v-dialog v-model="dialogUpdate" scrollable persistent :overlay="false" max-width="500px" transition="dialog-transition">
        <v-card>
            <v-card-title primary-title>
                Create Course <v-spacer></v-spacer>
                <v-btn @click="dialog=false" icon color="red">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <div>
                     <input @input="updateImage()" ref="image_course_update" accept="image/*" type="file" />
                        <input @input="updateVideo()" ref="video_course_update" accept="video/*" type="file" />
                </div>
                <form ref="form_course_update" @submit.prevent="updateCourse()"> 
                    <v-text-field dense outlined label="name" v-model="form.name"></v-text-field>
                    <v-textarea rows="3" dense outlined label="detail" v-model="form.detail"></v-textarea> 
                    <br><br>
                    <v-btn type="submit" block color="success">Update New Course</v-btn>
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
            dialogUpdate:false,
            form: {},
            courses: [], 
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
            let image = this.$refs.image_course.files[0]
            let formData = new FormData()
            formData.append('name', this.form.name);
            formData.append('detail', this.form.name);
            formData.append('video', video);
            formData.append('image', image);
            formData.append('user', this.user.pk);
            console.log(formData);
            let update = await Core.postFileHttpAlert(`/api/v1/course/course/`, formData)
            this.$refs.form_course.reset()
            this.dialog = false
            this.form = {}
            await this.loadCourse()
        },
        async deleteCourse(id){
            let deletes = await Core.deleteHttpAlert(`/api/v1/course/course/${id}/`)
            await this.loadCourse();
        },
        async openUpdate(form){
            this.form = form
            delete this.form.image
            delete this.form.video
            this.dialogUpdate = true;
        },
        async updateCourse(){ 
            let update = await Core.putHttpAlert(`/api/v1/course/course/${this.form.id}/`, this.form)
            this.$refs.form_course_update.reset()
            await this.loadCourse()
             this.dialogUpdate = false
        },
        async updateImage(){
            let image = this.$refs.image_course_update.files[0]
            let formData = new FormData() 
            formData.append('image', image); 
            let update = await Core.putFileHttpAlert(`/api/v1/course/course/${this.form.id}/`, formData)
            this.$refs.form_course_update.reset()
             await this.loadCourse()
             this.dialogUpdate = false
        },
        async updateVideo(){
             let video = this.$refs.video_course_update.files[0]
            let formData = new FormData() 
            formData.append('video', video); 
            let update = await Core.putFileHttpAlert(`/api/v1/course/course/${this.form.id}/`, formData)
            this.$refs.form_course_update.reset()
             await this.loadCourse()
             this.dialogUpdate = false
        },
        dateConvert(data){
            return Core.convertDate(data)
        }
    }
}
</script>

<style>

</style>
