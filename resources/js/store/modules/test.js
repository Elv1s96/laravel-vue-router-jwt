const state = {
    someData: 'biba'
}

const getters = {
    // someData: state => {
    //     return state.someData
    // }
    someData: () =>  state.someData

}
const actions = {
    showText({state,commit, dispatch},  text) {
        commit('setSomeData',text)
        console.log(text)
    }
}

const mutations = {
    setSomeData(state, someData) {
        state.someData = someData
    }
}

export default {
    state,mutations,getters,actions
}
