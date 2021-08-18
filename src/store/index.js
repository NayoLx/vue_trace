import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

//定义初始变量
const state = {
    activeNav: '',
    lang: '',
    exchangeSkin: 'night',
    user: {
        name: '',
        password: '',
        token: '',
        server: '',
    },
    isKeep: false,
}

//通过getters获取变量
const getters = {
    getUser(state) {
        return state.user
    },
    getIsKeep(state) {
        return state.isKeep
    }
}

//通过mutations改变初始变量值
//改变变量值: this.$store.commit('', val);
const mutations = {
    setUser(state, user) {
        state.user = user
    },
    loginOut(state) {
        state.user = {
            name: '',
            password: '',
            token: '',
            server: '',
        };
    },
    navigate(state, nav) {
        state.activeNav = nav;
    },
}

//通过actions触发mutattions里的方法
const actions = {
    login(context, payload) {
        console.log(payload);
        context.commit('setUser', payload);
    },
    loginOut(context) {
        context.commit('loginOut');
    }

}

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});

export default store;