<!-- src/views/ManageUsers.vue -->
<template>
    <div>
      <h2>Gestionar Cuentas</h2>
     
       <BuscarCliente/>

       <button @click="openModal()">Crear Cuenta</button>

       <modal :isOpen="!!selectedItem" @close="selectedItem = null">
        <h2>Detalles de {{ selectedItem.names }}</h2>
        <p>ID: {{ selectedItem.id }}</p>
        <p>Más detalles sobre {{ selectedItem.names }}...</p>
        <p>Observaciones: {{ selectedItem.observaciones }}</p>

         <!-- Campo de entrada para la nueva descripción -->
      <label for="monto">Monto a aprobar:</label>
     <!-- <input type="text" v-model="monto" id="monto" @blur="formatCurrency" @focus="removeCurrencyFormat"/>-->
      <input type="text" v-model="monto" id="monto" />

       <!-- Campo de entrada para la nueva descripción -->
       <label for="observaciones">Observaciones:</label>
      <input type="text" v-model="observaciones" id="observaciones" />

        <button @click="selectedItem = null">Cerrar</button>
        <button @click="saveItem">Guardar Fio</button>
      </modal>


    </div>
  </template>
  
  <script>

  import BuscarCliente from '../components/BuscarCliente.vue';
  import Modal from '../components/Modal.vue'; // Componente modal
  import axios from 'axios'; // Importa la librería de llamadas a API

  export default {
    name: 'ManageUsers',
    components: {
    BuscarCliente, // Registrar el componente
    Modal,
  },
  data() {
    return {
      items: [], // Datos que mostrarás
      search: '',
      currentPage: 1,
      itemsPerPage: 5,
      selectedItem: null,
      monto: '',
      observaciones: '',
      montofiao: 0.0,
    };
  },methods: {
      openModal() {
        console.log();
        this.selectedItem = {};
        this.monto = '';
        this.observaciones = '';
        this.montofiao = 0.0;
        console.log(this.selectedItem);
      },
        async saveItem() {
        if (!this.selectedItem) return;

        try {
          const response = await axios.post('http://localhost:8085/cuenta', {
            idEstablecimiento: JSON.parse(localStorage.getItem('ie')), 
            idCliente: JSON.parse(localStorage.getItem('ic')), 
            montoAprobado: this.monto,
            usuarioGestor: JSON.parse(localStorage.getItem('iug')),
            observaciones: this.observaciones,
          });

          

          console.log("Elemento guardado:", response.data);
          this.selectedItem = null;
        } catch (error) {
          console.error("Error al guardar el elemento:", error);
        }
      }
    },
  };
  </script>
  
  <style>
  /* Estilos opcionales */
  </style>