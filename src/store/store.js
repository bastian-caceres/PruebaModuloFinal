import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import Swal from 'sweetalert2';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    juguetes: [],
    user: null,
  },
  getters: {
    enviandoUser(state){
      return state.user;
    },
    enviandoJuguetes(state){
      return state.juguetes;
    },
  },
  mutations: {
    mutarUser(state,datoUser){
      state.user = datoUser; 
    },
    mutandoJuguetes(state,datos){
      state.juguetes = datos;
    },
  },
  actions: {
    user({commit},datoUser){
      commit('mutarUser',datoUser);
    },
    // tra los datos de la base instantaneamente
    traerJuguetes({commit}){
      /* usar get cuando no se necesite leer datos en tiempo real, usar onSnapshot cuando se necesite leer siempre los datos para actualizar en tiempo real */
      firebase.firestore().collection('lista_juguetes').orderBy('codigo').onSnapshot((res)=>{
        let datos = [];
        res.forEach(element => {
          datos.push({
            idDoc:  element.id,
            codigo: element.data().codigo,
            nombre: element.data().nombre,
            precio: element.data().precio,
            stock: element.data().stock,
            img: element.data().img
          })
        })
      commit('mutandoJuguetes', datos);
      }, error => console.error(error));
    },
    // agrega un nuevo juguete
    agregandoJuguete(context, datos){
      // se usa el add para agregar un nuevo documento a la base de datos, se debe usar despues de una collection
      firebase.firestore().collection('lista_juguetes').add({
        codigo: datos.codigo,
        nombre: datos.nombre,
        precio: datos.precio,
        stock: datos.stock,
        img: datos.img
      }).then(() => console.log("Agregado...")).catch(error => console.error(error));
    },
    actualizandoJuguetes(context, datos){
      // el update se utiliza para actualizar un documento en especifico, se debe indicar cual es el id del documento. Se puede pasar uno o todos los valores a actualizar, no borrar los valores que no se actualicen.
      firebase.firestore().collection('lista_juguetes').doc(datos.idDoc).update({
        codigo: datos.codigo,
        nombre: datos.nombre,
        stock: datos.stock,
        precio: datos.precio,
        img: datos.img
      })
        .then(()=> console.log("Se actualizo"))
        .catch(error => console.error(error));
    },
    borrandoJuguete(context,id){
      Swal.fire({
        title: '¿Esta seguro que desea eliminar este juguete?',
        text: "Si lo elimina no podra recuperar los datos!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar de todas formas!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado!',
            'El Jueguete fue eliminado correctamente',
            'success',
            // se usa el delete para borrar un documento, se debe utilizar despues de un doc indicando el id o identificacion del documento a borrar
            firebase.firestore().collection('lista_juguetes').doc(id)
            .delete()
            .then(()=>console.log('eliminado'))
            .catch(error => console.error(error))
          )
        }
      })

    },
  }
})
