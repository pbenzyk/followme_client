<template>
<div>
    <pre>{{course}}</pre>
    <v-btn @click="$router.push(`/video`)" color="success">video</v-btn>
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
            course:{}
        }   
    },
    async created() {

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
        async loadCourse(){
            this.course = await Core.getHttp(`/api/v1/course/course/${this.$route.query.id}/`)
        }
    }
};
</script>
