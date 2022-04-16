<template>
<div>
    <router-link v-if="accessToken" :to="{ name:'home'}">Home</router-link>
    <router-link :to="{ name:'list'}">List</router-link>
    <router-link v-if="!accessToken" :to="{ name:'user.login'}">login</router-link>
    <router-link v-if="!accessToken" :to="{ name:'user.registration'}">Registration</router-link>
    <router-link :to="{ name:'fruits'}">Fruits</router-link>
    <a v-if="accessToken" href="#" @click.prevent="logout">Logout</a>
    <router-view></router-view>
</div>
</template>

<script>
import API from "../api";
export default {
    name: "IndexComponent",
    data() {
        return {
            accessToken: null
        }
    },
    methods: {
        getAccessToken() {
            this.accessToken = localStorage.getItem('access_token')
        },
        logout() {
            API.post('/api/auth/logout').then(result => {
                localStorage.removeItem('access_token')
                this.$router.push({name: 'user.login'})
            }).catch(error => {
                console.log('ERROR:', error)
            })
        }
    },
    mounted() {
        this.getAccessToken()
    },
    updated() {
        this.getAccessToken()
    }
}
</script>

<style scoped>

</style>
