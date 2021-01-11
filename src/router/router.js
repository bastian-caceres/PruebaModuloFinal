import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase';
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/tablaJuguetes',
    name: 'TablaJuguetes',
    component: () => import(/* webpackChunkName: "tablaJuguetes" */ '../views/TablaJuguetes.vue'),
    meta: {
      requiresAuth: true // el meta se utiliza para las rutas que se quieran resguardar (Navigation Guards)
    }
  },
  {
    path: '/editarJuguete/:id',
    name: 'EditarJuguete',
    props: true,
    component: () => import(/* webpackChunkName: "editarJuguete" */ '../views/EditarJuguete.vue')
  },
  {
    path: '*',
    redirect: ['/']
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// guarda de navegación 
router.beforeEach((to,from,next)=>{
  let usuario = firebase.auth().currentUser; // traemos la información del usuario conextado en el momento, si no hay usuario, será null.
  let login = to.matched.some(result => result.meta.requiresAuth); //buscamos cual ruta tiene activo un meta

  if (!usuario && login) {
    next({name: 'Home'}); // si la ruta tiene activo el meta y no hay usuario conectado en el sistema, no se deje ingresar a la ruta y se envia a login.
  } else if(usuario && !login) {
    next();
  } else {
    next();
  }
});

export default router
