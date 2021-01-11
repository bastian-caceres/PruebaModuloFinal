<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="/">OTTO-KLAUS</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav v-if="!enviandoUser" class="ml-auto">     
                    <b-nav-item :to="{name: 'Home'}">Inicio</b-nav-item>  
                    <b-nav-item :to="{name: 'Login'}">Ingresar</b-nav-item>                                     
                </b-navbar-nav>
                <b-navbar-nav v-else class="ml-auto">
                    <b-nav-item :to="{name: 'Home'}">Inicio</b-nav-item>  
                    <b-nav-item :to="{name: 'TablaJuguetes'}">Tabla Juguetes</b-nav-item>  
                    <b-nav-item  @click="cerrarSesion">Cerrar Sesion</b-nav-item>
                </b-navbar-nav>

            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from 'firebase';
import Swal from 'sweetalert2';

export default {
    name: 'NavBar',
    computed: {
        ...mapGetters(['enviandoUser']),
    },
    methods: {
        cerrarSesion(){
            firebase.auth().signOut().then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Sesion cerrada Correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.$router.replace({name: 'Home'});
            }).catch((error) => {
                console.error(error);
            });
        }
    }
}
</script>

<style>

</style>