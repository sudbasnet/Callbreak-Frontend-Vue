import Login from './components/main/Login.vue';
import Register from './components/main/Register.vue';
import Home from './components/main/Home.vue';

export const routes = [
    {
        mode: 'history',
        path: '',
        component: Home
    },
    {
        mode: 'history',
        path: '/login',
        component: Login
    },
    {
        mode: 'history',
        path: '/register',
        component: Register
    }
];