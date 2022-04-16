<template>
    <b-container>
        <h1 v-if="error">{{error}}</h1>
        <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
            description="We'll never share your email with anyone else."
        >
            <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                placeholder="Enter email"
                required
            ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
            <b-form-input
                id="input-2"
                v-model="form.name"
                placeholder="Enter name"
                required
            ></b-form-input>
        </b-form-group>
        <label>Password</label>
        <b-form-input type="password" id="password" name="password" aria-describedby="password-help-block" v-model="form.password"></b-form-input>
        <label>Password confirmation</label>
        <b-form-input type="password" id="password_confirmation" name="password_confirmation" aria-describedby="password-help-block" v-model="form.password_confirmation"></b-form-input>
        <b-button variant="primary" @click.prevent="registration">Registration</b-button>
    </b-container>
</template>

<script>
export default {
    name: "Registration",
    data() {
        return {
            error: null,
            form:{
                name: null,
                email: null,
                password: null,
                password_confirmation: null
            }
        }
    },
    methods: {
            registration() {
                axios.post('/api/users/',{
                    name: this.form.name,
                    email: this.form.email,
                    password: this.form.password,
                    password_confirmation: this.form.password_confirmation
                }).then(result => {
                    const accessToken = result.data.access_token || null;
                    if(accessToken) {
                        localStorage.setItem('access_token',accessToken)
                        this.$router.push({name: 'home'})
                    }
                }).catch(error => {
                    this.error = error.response.data.error
                    console.log('ERROR',error.message)
                })
            }
    },
    mounted() {
        localStorage.getItem('access_token')
    }
}
</script>

<style scoped>

</style>
