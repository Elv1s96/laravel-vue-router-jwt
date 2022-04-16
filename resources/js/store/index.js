import Vue from "vue";
import Vuex from 'vuex'
import Test from './modules/test'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        Test
    }
})
