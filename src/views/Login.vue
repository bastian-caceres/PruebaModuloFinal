<template>
  <div class="my-5 container text-light">
    <h1>Ingreso</h1>
    <form @submit.prevent="loginUser">
      <div class="mb-3">
        <label class="form-label">Correo Electronico</label>
        <input type="email" class="form-control" aria-describedby="emailHelp" v-model="email">
      </div>
      <div class="mb-3">
        <label class="form-label">Contraseña</label>
        <input type="password" class="form-control" v-model="password">
      </div>
      <button type="submit" class="btn btn-primary">Ingresar</button>
      <!-- <a type="button" class="btn btn-primary mx-4" @click="recuperarEmail">Olvide mi Contraseña</a> -->
    </form>
  </div>
</template>

<script>
import firebase from 'firebase';
import Swal from 'sweetalert2';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    loginUser(){
      if (this.email && this.password.length >= 6) {
        // metodo que permite ingresar con usuario(correo electrónico) y contraseña
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push({name: 'TablaJuguetes'}); // enviamos al usuario a la vista de home
        }).catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'El correo ingresado no existe',
            text: 'Por favor ingrese con un correo valido',
          })
          console.error(error.code);
          console.error(error.message);
        });
      } else {
        console.log("no se puede");
      }
    },
    recuperarEmail(){
      // metodo que permite enviar al correo un enlace para reiniciar contraseña (el correo debe ser real)
      firebase.auth().sendPasswordResetEmail(this.email).then(() => {
        console.log("correo enviado.");
      }).catch((error) => {
        console.error(error);
      });

    }
  },
}
</script>
