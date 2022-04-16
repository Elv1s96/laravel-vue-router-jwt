<template>
    <div>
        <b-table striped hover :items="items"></b-table>
    </div>
</template>

<script>
import API from "../../api";
export default {
    name: "FruitComponent",
    data() {
        return {
            items: null,
            api: null
        }
    },
    methods: {
        getFruits() {
            API.get('/api/auth/fruits', {
                /*headers: {
                    'authorization': `Bearer ${localStorage.getItem('access_token') || null}`
                }*/
            }).then(result => {
                this.items = result.data
            }).catch(error => {
                console.log('ERROR: ', error.message)
            })
        },

    },
    mounted() {
        this.getFruits()
    }
}
</script>

<style scoped>

</style>
