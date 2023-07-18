import {createStore} from 'vuex'


export default createStore({
    state: {
        modals: [],
    },
    getters: {
        modals: (state) => state.modals,
    },
    mutations: {
        SET_MODAL: (state, response) => {
            state.modals.push(response);
        },
        DELETE_MODAL: (state, response) => {
            state.modals.splice(response, 1);
        },
    },
    actions: {
        modalAdd: ({commit}, modalData) => {
            commit("SET_MODAL", modalData);
        },
        modalClose: ({commit, state}, modalKey = state.modals.length - 1) => {
            commit("DELETE_MODAL", modalKey);
        },
    }
})
