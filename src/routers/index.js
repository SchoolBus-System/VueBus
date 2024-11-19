import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/home.vue';
import LoginPage from '../views/Admin/Login.vue';
import CarInfo from '../views/Vehicle/CarList.vue';
import CarAdd from '../views/Vehicle/CarAdd.vue';
import CarEdit from '../views/Vehicle/CarEdit.vue';
import AccountInfo from '../views/Vehicle/Account.vue';
import DriverInfo from '../views/Vehicle/Driver.vue';
import AddressInfo from '../views/Vehicle/Address.vue';
import FinancialList from '../views/Financial/FinancialList.vue';
import FinancialAdd from '../views/Financial/FinancialAdd.vue';
import FinancialEdit from '../views/Financial/FinancialEdit.vue';
import TeacherList from '../views/Jiesong/TeacherList.vue';
import TeacherAdd from '../views/Jiesong/TeacherAdd.vue';
import TeacherEdit from '../views/Jiesong/TeacherEdit.vue';
import BulletinList from '../views/Bulletin/BulletinList.vue';
import BulletinAdd from '../views/Bulletin/BulletinAdd.vue';
import BulletinEdit from '../views/Bulletin/BulletinEdit.vue';
import SmsList from '../views/Bulletin/SmsList.vue';
import GroupList from '../views/Bulletin/GroupList.vue';
import ClockList from '../views/Clock/ClockList.vue';


Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [{
            path: '/login',
            name: 'login',
            component: LoginPage,
            meta: {
                layout: 'empty', // 标记这个路由不需要布局
                isPublic: true
            }
        },
        // 首页
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        /* 基本信息 */
        {
            path: '/car',
            name: 'car-list',
            component: CarInfo
        },
        {
            path: '/car/add',
            name: 'car-add',
            component: CarAdd
        },
        {
            path: '/car/edit',
            name: 'car-edit',
            component: CarEdit
        },
        {
            path: '/driver',
            name: 'driver',
            component: DriverInfo
        }, {
            path: '/address',
            name: 'address',
            component: AddressInfo
        }, {
            path: '/account',
            name: 'account',
            component: AccountInfo
        },
        // 财务管理
        {
            path: '/financial',
            name: 'financial-list',
            component: FinancialList
        },
        {
            path: '/financial/add',
            name: 'financial-add',
            component: FinancialAdd
        },
        {
            path: '/financial/edit',
            name: 'financial-edit',
            component: FinancialEdit
        },
        // 接送员老师管理
        {
            path: '/teacher',
            name: 'teacher-list',
            component: TeacherList
        },
        {
            path: '/teacher/add',
            name: 'teacher-add',
            component: TeacherAdd
        },
        {
            path: '/teacher/edit',
            name: 'teacher-edit',
            component: TeacherEdit
        },
        // 公告管理
        {
            path: '/bulletin',
            name: 'bulletin-list',
            component: BulletinList
        },
        {
            path: '/bulletin/add',
            name: 'bulletin-add',
            component: BulletinAdd
        },
        {
            path: '/bulletin/edit',
            name: 'bulletin-edit',
            component: BulletinEdit
        },
        {
            path: '/bulletin/group',
            name: 'bulletin-group',
            component: GroupList
        },
        {
            path: '/bulletin/message',
            name: 'bulletin-message',
            component: SmsList
        }, {
            path: '/clock',
            name: 'clock-list',
            component: ClockList
        },
    ]
})

export default router