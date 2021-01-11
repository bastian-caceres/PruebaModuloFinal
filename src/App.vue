<template>
  <div id="app">
    <NavBar/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import firebase from 'firebase';

export default {
  name: 'App',
  components: {
    NavBar,
    Footer
  },
  mounted() {
    // este metodo permite supervisar la conexion de los usuarios (si entran o salen de sesión)
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('user',user); // si entra se envia la inforamcion del usuario a la store
      } else {
        console.log("cierre de sesion");
        this.$store.dispatch('user',null); //si sale, se borra la informacion de la store
      }
    });
    this.$store.dispatch('traerJuguetes');
  },
}
</script>

<style>
/* @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap'); */

#app{
  background-image: url('https://4.bp.blogspot.com/-mXoBC-AJWuk/XQsnTHKZ6fI/AAAAAAAAD_o/oG3rFqkaN243ylUngfAH1AtA2xSvqslswCKgBGAs/w2560-h1440-c/toy-story-4-bunny-ducky-buzz-lightyear-uhdpaper.com-4K-23.jpg');
  background-size: cover;
  height: 100%;
}
</style>
