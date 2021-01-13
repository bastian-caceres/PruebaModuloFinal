<template>
  <div class="container my-5">
        <h2 class="text-light text-center">Administrando Juguetes</h2>
        <div class="my-4 text-center">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#agregarjuguete"><font-awesome-icon icon="plus"/> Agregar Juguete</button>
        </div>
        <div class="row d-flex justify-content-center" v-if="enviandoJuguetes.length > 0">
          <table class="table table-responsive-xl table-bordered table-dark">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Codigo</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Imagen</th>
                    <th colspan="2" class="text-center">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in enviandoJuguetes" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{item.codigo}}</td>
                    <td>{{item.nombre}}</td>
                    <td>{{item.precio}}</td>
                    <td>{{item.stock}}</td>
                    <td>{{item.img}}</td>
                    <td class="text-center"><button type="button" class="btn btn-warning" @click="editandoJuguete(item.idDoc)"><font-awesome-icon icon="edit"/></button></td>
                    <td class="text-center"><button type="button" class="btn btn-danger" @click="eliminando(item.idDoc)"><font-awesome-icon icon="trash-alt"/></button></td>
                </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
            <b-alert show>No existen Juguetes</b-alert>
        </div>
         
        <!-- Modal agregar -->
        <div class="modal fade" id="agregarjuguete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
              <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Agregando Juguete</h5>
              </div>
              <div class="modal-body">
                  <form>
                      <div class="mb-3">
                          <label class="form-label">Codigo (min. 5 caracteres)</label>
                          <input type="text" class="form-control" id="exampleInputEmail1" v-model="codigo" required>
                      </div>
                      <div class="mb-3">
                          <label class="form-label">Nombre del Juguete (min. 4 caracteres)</label>
                          <input type="text" class="form-control" id="exampleInputPassword1" v-model="nombre">
                      </div>
                      <div class="mb-3">
                          <label class="form-label">Stock</label>
                          <input type="number" class="form-control" id="escuela" v-model="stock">
                      </div>
                      <div class="mb-3">
                          <label class="form-label">Precio</label>
                          <input type="number" class="form-control" id="escuela" v-model="precio">
                      </div>
                      <div class="mb-3">
                          <label class="form-label">URL imagen</label>
                          <input type="text" class="form-control" id="imagen" v-model="img">
                      </div>
                  </form>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-primary" data-dismiss="modal" @click.prevent="agregandoJuguete">Agregar</button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
              </div>
              </div>
          </div>
        </div>


    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Swal from 'sweetalert2';

export default {
    name: 'TablaJuguetes',
    data() {
        return {
        codigo: '',
        nombre: '',
        stock: '',
        precio: '',
        img: ''
        }
    },
    computed:{
        ...mapGetters(['enviandoJuguetes'])
    },
    methods: {
        agregandoJuguete(){
            if (this.codigo.length >= 5 && this.nombre.length >= 4 && this.stock >= 0 && this.precio >= 0 && this.img ) {
                let datos = {
                    codigo: this.codigo,
                    nombre: this.nombre,
                    stock: this.stock,
                    precio: this.precio ,
                    img: this.img
                };
                this.$store.dispatch('agregandoJuguete',datos);
                Swal.fire({
                    icon: 'success',
                    title: 'Jueguete Agregado Correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.codigo =''
                this.nombre =''
                this.stock =''
                this.precio =''
                this.img =''
                this.$router.push({name: 'TablaJuguetes'});
            } else {
                console.log("No se puede agregar el juguete");
                Swal.fire({
                    icon: 'error',
                    title: 'No se puede agregar el juguete',
                    text: "por favor complete todos los campos! (no se permiten numeros negativos)",
                    showConfirmButton: false,
                    timer: 4000
                })
                this.codigo =''
                this.nombre =''
                this.stock =''
                this.precio =''
                this.img =''
            }
        },
        eliminando(id){
            this.$store.dispatch('borrandoJuguete',id);
        },
        editandoJuguete(idDoc){
            this.$router.push({name: 'EditarJuguete', params: {id: idDoc}});
        }
    }  
}
</script>

<style>
</style>