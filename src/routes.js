// Import components
import LoginUser from './components/Login';
import RegisterUser from './components/Register';
import DashboardUser from './components/Dashboard';
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
        },
        {
            path: '/dashboard',
            component: DashboardUser
        }
    ]
})

export default router;