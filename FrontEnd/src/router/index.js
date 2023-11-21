import {createWebHistory, createRouter} from "vue-router";
import Home from '../views/Home.vue';
import Admin from '../views/admin/HomeAdmin.vue';
import Login from '../views/register.vue';
import List_User from '../views/admin/List_User.vue' ;
import Cart from '../views/Cart.vue';
import List_trademark from '../views/admin/ListTrademark.vue';
import List_Category from '../views/admin/List_Category.vue';
import Demo from '../views/admin/HomeDemo.vue'
import Renevue from '../views/admin/Revenue.vue'
// import Stored from
// import Edit from 

const routes = [
    {
        path: '/admin/revenue', 
        component: Renevue
    },
    {
        path: '/admin/List_Category',
        component: List_Category
    },
    {
        path: '/admin/listTrademark',
        component: List_trademark
    },
    {
        path:"/admin/list_user",
        name: "List_User",
        component: List_User,
    },
    {
        path:"/home",
        name: "home",
        component: Home,
    },
    {
        path: "/cart",
        component: Cart
    },
    {
        path:"/admin",
        name: "admin",
        component: Admin,
    },

    {
        path:"/Demo",
        name:"demo",
        component: Demo,
    },

    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/:pathMatch(.*)*',
        //path:'/',
        redirect: '/home'
    },

    // {
    //     path: "/admin/picture/:id/edit",
    //     name: "Edit",
    //     component: Edit,
    // }
    
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});



router.beforeEach((to, from, next) => {
    // Kiểm tra nếu đang chuyển đến trang "/home" và đã ở trên trang "/home" rồi
    if (to.path === "/home" && from.path === "/home") {
        // Thực hiện reset trang bằng cách nạp lại trang web
        window.location.reload();
    } else {
        // Chuyển đến route tiếp theo
        next();
    }
});



export default router;

