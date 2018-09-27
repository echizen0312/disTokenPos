import Vue from 'vue'
import Router from 'vue-router'
import Scan from './components/Scan.vue'
import Info from './components/Info.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: '',
            component: Scan
        },
        {
            path: '/Scan',
            name: 'Scan',
            component: Scan
        },
        {
            path: '/Info',
            name: 'Info',
            component: Info
        }
    ]
})
