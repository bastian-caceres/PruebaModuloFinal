<template>
  <b-container class="mt-5 text-center">
    <h1 class="my-5 text-light">Lista de Jueguetes Populares</h1>
    <b-row>
      <b-col cols="12" sm="12" md="6" lg="4" xl="4" v-for="(juguete,index) in enviandoJuguetes" :key="index">
        <div v-if="juguete.stock > 0 && juguete.precio > 0">
          <b-card class="my-4" bg-variant="dark" text-variant="white" :title="juguete.nombre" :img-src="juguete.img" :img-alt="juguete.nombre" img-top tag="article" style="max-width: 21rem;">
            <b-card-text>Precio ${{juguete.precio | formatoMoneda}} CLP</b-card-text>
          </b-card>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    name: 'Home',
    computed:{
      ...mapGetters(['enviandoJuguetes'])
    },
    // sirve para dar formatos a los valores
    filters:{
      formatoMoneda(precio){
        return new Intl.NumberFormat("de", "DE").format(precio)
      }
    }
  }
</script>

<style>
  img{
    height: 300px;
  }
</style>