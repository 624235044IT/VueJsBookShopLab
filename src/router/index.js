import Vue from 'vue'
import VueRouter from 'vue-router'
import Books from '../components/Books.vue'
import BookAddNew from '../components/BookAddNew.vue'
import BookEdit from '../components/BookEdit.vue'
import Student from '../components/Student.vue'
import StudentAddNew from '../components/StudentAddNew.vue'
import StudentEdit from '../components/StudentEdit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Books
  },
  {
    path: '/books',
    name: 'Books',
    component: Books
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: BookAddNew
  },  
  {
    path: '/editbook/:bookid',
    name: 'EditBook',
    component: BookEdit
  },  
  {
    path: '/student',
    name: 'Student',
    component: Student
  },
  {
    path: '/addstudent',
    name: 'StudentAddNew',
    component: StudentAddNew
  }, 
  {
    path: '/editstudent/:studentId',
    name: 'EditStudent',
    component: StudentEdit
  },  
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router