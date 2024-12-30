<template>
    <div>
      <input type="text" v-model="search" placeholder="Buscar..." />
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginatedData" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>
              <button @click="openModal(item)">Ver Detalles</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!--
      <pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-changed="onPageChanged"
      />
      -->
  
      <modal :isOpen="!!selectedItem" @close="selectedItem = null">
        <h2>Detalles de {{ selectedItem.name }}</h2>
        <p>ID: {{ selectedItem.id }}</p>
        <p>Más detalles sobre {{ selectedItem.name }}...</p>
        <p>Observaciones: {{ selectedItem.observaciones }}</p>

         <!-- Campo de entrada para la nueva descripción -->
      <label for="monto">Monto del fio:</label>
      <input type="text" v-model="monto" id="monto" @blur="formatCurrency" @focus="removeCurrencyFormat"/>

       <!-- Campo de entrada para la nueva descripción -->
       <label for="observaciones">Observaciones:</label>
      <input type="text" v-model="observaciones" id="observaciones" />

        <button @click="selectedItem = null">Cerrar</button>
        <button @click="saveItem">Guardar Fio</button>
      </modal>
    </div>
  </template>
  
  <script>
 // import Pagination from './Pagination.vue'; // Componente de paginación
  import Modal from './Modal.vue'; // Componente modal
  import axios from 'axios'; // Importa la librería de llamadas a API
  
  export default {
    components: {  Modal },
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
    },
    computed: {
      filteredData() {
        return this.items.filter(item => 
          item.observaciones.toLowerCase().includes(this.search.toLowerCase())
        );
      },
      totalPages() {
        return Math.ceil(this.filteredData.length / this.itemsPerPage);
      },
      paginatedData() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        return this.filteredData.slice(start, start + this.itemsPerPage);
      },
    },
    methods: {
      openModal(item) {
        console.log(item);
        this.selectedItem = item;
        this.monto = '';
        this.observaciones = '';
        this.montofiao = 0.0;
        console.log(this.selectedItem);
      },
        formatCurrency() {
         // Convertir monto a número y formatear como moneda
    if (this.monto) {
        // Eliminar caracteres no numéricos y convertir a número
        let numberValue = parseFloat(this.monto.replace(/[^0-9.-]+/g, ""));
        
        if (!isNaN(numberValue)) {
           
            // Formatear el número como moneda y almacenar como string para mostrar
            this.monto =  numberValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            this.montofiao = numberValue;
            console.log("Número convertido:", this.montofiao);
        }
        }
     },
        removeCurrencyFormat() {
        // Elimina el formato para permitir la entrada de nuevos valores
        this.monto = this.monto.replace(/[^0-9.-]+/g,"");
        },
      onPageChanged(page) {
        this.currentPage = page;
      },
      async fetchData() {
        try {
            const response = await axios.get('http://localhost:8085/cuenta/id/'+JSON.parse(localStorage.getItem('ie'))); // Reemplaza con la URL de tu API
            console.log("Datos recibidos:", response.data); // Agrega un log para depurar
            if (Array.isArray(response.data)) {
            this.items = response.data; // Asigna los datos a items solo si es un arreglo
            } else {
            console.error("Los datos recibidos no son un arreglo");
            this.items = []; // Si no es un arreglo, asegura que items sea un arreglo vacío
            }
        } catch (error) {
            console.error("Error al obtener los datos:", error);
            this.items = []; // También puedes establecer items a un arreglo vacío en caso de error
        }
        },
        async saveItem() {
        if (!this.selectedItem) return;

        try {
          const response = await axios.post('http://localhost:8085/fiao', {
            cuenta: this.selectedItem.id,
            valorFio: this.montofiao,
            usuarioGestor: JSON.parse(localStorage.getItem('iug')),
            observaciones: this.observaciones,
          });

          

          console.log("Elemento guardado:", response.data);
          this.selectedItem = null;
        } catch (error) {
          console.error("Error al guardar el elemento:", error);
        }
      },
    },
    created() {
      this.fetchData();
    },
  };
  </script>
  
  <style>
  /* Añade tus estilos aquí */
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  /* Modal styles */
  </style>