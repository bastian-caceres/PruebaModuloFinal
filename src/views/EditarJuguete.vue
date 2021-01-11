<template>
    <div class="container my-5 text-light">
        <h2>Editando: {{nombre}}</h2>
        <div class="card bg-dark">
            <div class="card-body">
                <form @submit.prevent="actualizarJuguete">
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Codigo</label>
                        <input type="text" class="form-control" id="disabledTextInput" v-model="codigo" disabled>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Nombre del Jueguete</label>
                        <input type="text" class="form-control" id="exampleInputPassword1" v-model="nombre">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Stock</label>
                        <input type="text" class="form-control" id="escuela" v-model="stock">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Precio</label>
                        <input type="text" class="form-control" id="escuela" v-model="precio">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">URL imagen</label>
                        <input type="text" class="form-control" id="imagen" v-model="img">
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary mr-3">Guardar</button>
                        <button type="button" class="btn btn-info" @click="$router.go(-1)">Regresar</button>
                    </div>
                </form>
                </div>
                
            <div class="text-center my-2">
                
            </div>
        </div>    
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Swal from 'sweetalert2';

export default {
    name: 'EditarJuguete',
    props: ['id'],
    data() {
        return {
            codigo: '',
            nombre: '',
            stock: '',
            precio: '',
            img: '',
        }
    },
    computed: {
        ...mapGetters(['enviandoJuguetes'])
    },
    methods: {
        actualizarJuguete(){
            if (this.codigo && this.nombre && this.stock && this.precio && this.img) {
                let datos = {
                    codigo: this.codigo,
                    nombre: this.nombre,
                    stock: this.stock,
                    precio: this.precio,
                    img: this.img,
                    idDoc: this.id
                };
                this.$store.dispatch('actualizandoJuguetes',datos);
                Swal.fire({
                    icon: 'success',
                    title: 'Jueguete Editado Correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(()=>{
                    this.$router.push({name: 'TablaJuguetes'});
                },1000);
            } else {
                console.log("No se puede actualizar el juguete");
            }
        }
    },
    mounted(){
        let datos = this.enviandoJuguetes.find(juguetes => juguetes.idDoc === this.id);
        if (datos !== undefined) {
            this.codigo = datos.codigo;
            this.nombre = datos.nombre;
            this.stock = datos.stock,
            this.precio = datos.precio,
            this.img = datos.img
        } else {
            console.log("No existe el juguete");
            setTimeout(()=>{
                this.$router.push({name: 'TablaJuguetes'});
            },1000);
        }
    }
}
</script>

<style>

</style>