// import Login from './components/main/Login.vue';
// import Register from './components/main/Register.vue';
// import Home from './components/main/Home.vue';

// Lazy loading
const Home = resolve => {
    require.ensure(['./components/main/Home.vue'], () => {
        resolve(require('./components/main/Home.vue'));
    });
};

const Login = resolve => {
    require.ensure(['./components/main/Login.vue'], () => {
        resolve(require('./components/main/Login.vue'));
    });
};

const Register = resolve => {
    require.ensure(['./components/main/Register.vue'], () => {
        resolve(require('./components/main/Register.vue'));
    });
};

const AccountSettings = resolve => {
    require.ensure(['./components/main/user/AccountSettings.vue'], () => {
        resolve(require('./components/main/user/AccountSettings.vue'));
    });
};

const Profile = resolve => {
    require.ensure(['./components/main/user/Profile.vue'], () => {
        resolve(require('./components/main/user/Profile.vue'));
    });
};

export const routes = [
    {
        path: '',
        component: Home
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/account-settings',
        component: AccountSettings
    },
    {
        path: '/profile',
        component: Profile
    }
];