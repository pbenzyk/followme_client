<template>
<div>
    <Bg-Course></Bg-Course>
    <div class="relative pt-10">
        <h3 class="mb-4 text-3xl font-bold ">{{course.name}}</h3>
        <div class="relative px-8 lg:pr-0 lg:pl-12 2xl:pl-24 mb-14 lg:mb-40 bg-blue-600 rounded-xl overflow-hidden shadow-xl">
            <div class="w-full lg:w-2/3 pt-12 lg:py-12">
                <h3 class="mb-4 text-xl font-bold text-white">รายละเอียด</h3>
                <p class="text-base text-gray-300">{{course.detail}} </p>
                <span class="text-sm text-white">ผู้สอน {{course.user_full}} </span><br>
                <span class="text-sm text-white"> {{dateConvert(course.created_at)}}</span>
            </div>
            <img class="lg:absolute top-0 right-0 bottom-0 h-full w-full lg:w-1/3 object-cover" :src="$url+course.image" alt="">
        </div>

        <div>
            <v-toolbar color="transparent" flat>
                <h2 class="text-2xl font-bold">การฝึก</h2>
                <v-spacer></v-spacer>
            </v-toolbar>
            <div>
                <div class="flex w-full mt-2">
                    <div class="w-1/3  p-1">
                        <div class="shadow-xl rounded bg-blue-600   flex flex-col items-center justify-center p-4 " @click="dialogViewTeacher = true">
                            <span class="mdi mdi-video-check text-6xl text-white " aria-role="presentation" aria-label="REVOLVING HEARTS"></span>
                            <span class="text-white font-semibold text-base mt-2">วีดีโอผู้สอน </span>
                        </div>
                    </div>
                    <div class="w-1/3  p-1">
                        <div class="shadow-xl rounded bg-purple-700   flex flex-col items-center justify-center p-4 " @click="$router.push(`/video`)">
                            <span class="mdi mdi-message-video text-6xl text-white " aria-role="presentation" aria-label="REVOLVING HEARTS"></span>
                            <span class="text-white  font-semibold text-base mt-2">ทดลองฝึก </span>
                        </div>
                    </div>

                </div>

            </div>
        </div>

        <div class="mt-6">
            <div class="w-full">
                <v-toolbar color="transparent" flat>
                    <h2 class="text-2xl font-bold">รายการผลการฝึก</h2>
                    <v-spacer></v-spacer>
                    <v-btn color="success" @click="dialogUpload = true">
                        <v-icon>mdi-video-plus</v-icon> ส่งผลการฝึก
                    </v-btn>
                </v-toolbar>
                <v-list>
                    <v-list-item v-for="list,index in lists" :key="index">
                        <v-list-item-avatar>
                            <v-icon dark></v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title><span class="text-base font-bold">{{list.name}}</span></v-list-item-title>
                            <v-list-item-subtitle><span class="text-sm">{{dateConvert(list.created_at)}}</span></v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                            <div class="flex">
                                <v-btn @click="getResult(list)" class="mr-2" small color="info" outlined>
                                    <v-icon>mdi-eye</v-icon> ดูผล
                                </v-btn>
                                <v-btn @click="deleteResult(list.id)" small color="error" outlined>
                                    <v-icon>mdi-delete</v-icon> ลบ
                                </v-btn>
                            </div>

                        </v-list-item-action>
                    </v-list-item>
                </v-list>
            </div>
        </div>

        <v-dialog v-model="dialogUpload" v-if="dialogUpload" scrollable persistent :overlay="false" max-width="500px" transition="dialog-transition">
            <v-card>
                <v-card-title primary-title>
                    อัพโหลดวีดีโอ <v-spacer></v-spacer>
                    <v-btn @click="(dialogUpload = false)&& this.$refs.form_result.reset()" fab text small color="error">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <form ref="form_result" @submit.prevent="saveResult()">
                        <v-text-field dense outlined label="name" v-model="form.name"></v-text-field> <br>
                        <input ref="video_result" accept="video/*" type="file" /><br><br>
                        <v-btn type="submit" color="success">บันทึก</v-btn>
                    </form>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogResultView" v-if="dialogResultView" scrollable persistent :overlay="false" max-width="500px" transition="dialog-transition">
            <v-card>
                <v-card-title primary-title>
                    ดูผล <v-spacer></v-spacer>
                    <v-btn @click="(dialogResultView = false)&& this.$refs.form_result.reset()" fab text small color="error">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <video autoplay controls :src="$url+result.video"></video>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogViewTeacher" v-if="dialogViewTeacher" scrollable persistent :overlay="false" max-width="500px" transition="dialog-transition">
            <v-card>
                <v-card-title primary-title>
                    วีดีโอผู้สอน <v-spacer></v-spacer>
                    <v-btn @click="(dialogViewTeacher = false)&& this.$refs.form_result.reset()" fab text small color="error">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <video autoplay controls :src="$url+course.video"></video>
                </v-card-text>
            </v-card>
        </v-dialog>

    </div>

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
            course: {},
            lists: [],
            form: {},
            dialogUpload: false,
            dialogResultView: false,
            dialogViewTeacher: false,
            result: {}
        }
    },

    computed: {
        user() {
            return Auth.user
        }
    },
    async created() {
        await this.loadCourse();
        await this.loadResult();
    },
    methods: {
        async loadCourse() {
            this.course = await Core.getHttp(`/api/v1/course/course/${this.$route.query.id}/`)
        },
        async loadResult() {
            this.lists = await Core.getHttp(`/api/v1/course/coursestudentvideo/?user=${this.user.pk}&course${this.$route.query.id}/`)
        },
        async saveResult() {
            let video = this.$refs.video_result.files[0]
            let formData = new FormData()
            formData.append('name', this.form.name);
            formData.append('video', video);
            formData.append('course', this.$route.query.id);
            formData.append('user', this.user.pk);
            console.log(formData);
            let update = await Core.postFileHttpAlert(`/api/v1/course/coursestudentvideo/`, formData)
            this.$refs.form_result.reset()
            this.dialogUpload = false
            this.form = {}
            await this.loadResult()
        },
        async deleteResult(id) {
            let deletes = await Core.deleteHttpAlert(`/api/v1/course/coursestudentvideo/${id}/`)
            await this.loadResult();
        },
        async getResult(result) {
            this.result = result
            this.dialogResultView = true
        },
        dateConvert(data) {
            return Core.convertDate(data)
        }
    }
};
</script>
