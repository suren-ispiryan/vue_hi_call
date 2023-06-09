// Import components
import LoginUser from './components/Login';
import RegisterUser from './components/Register';
// Import router
import { createRouter, createWebHistory } from 'vue-router';

// Router
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: LoginUser
        },
        {
            path: '/register',
            component: RegisterUser
        }
    ]
})

export default router;