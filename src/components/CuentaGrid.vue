<template>
    <div>
      <input type="text" v-model="search" placeholder="Buscar..."  class="search-input"  />
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Observaciones</th>
            <th>Monto Aprobado</th>            
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginatedData" :key="item.id">
            <td>{{ item.tipo }}</td>
            <td>{{ item.observaciones }}</td>
            <td>{{ item.montoAprobado }}</td>
            <td>
              <button @click="openModal(item)" class="button text-white button-primary">Registrar Fio</button>
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
        <h2>Detalles de la cuenta {{ selectedItem.tipo }}</h2>
        <p>Observaciones: {{ selectedItem.observaciones }}</p>

         <!-- Campo de entrada para la nueva descripción -->
      <label for="monto">Monto del fio:</label>
      <input type="text" v-model="monto" id="monto" @blur="formatCurrency" @focus="removeCurrencyFormat" class="modal-input"/>
<br>
       <!-- Campo de entrada para la nueva descripción -->
       <label for="observaciones">Observaciones:</label>
      <input type="text" v-model="observaciones" id="observaciones"  class="modal-input"/>

      <br>
        <button @click="selectedItem = null" class="button text-white button-primary">Cerrar</button>
        <button @click="saveItem" class="button text-white button-primary">Guardar Fio</button>
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
          item.observaciones.toLowerCase().includes(this.search.toLowerCase()) || item.tipo.toLowerCase().includes(this.search.toLowerCase())
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

  body {
    background-color: #f0f4f8;
    margin: 0;
    font-family: Arial, sans-serif;
    padding: 20px;
}

.search-input {
    padding: 10px;
    border: 1px solid #007BFF;
    width: 70%;
    border-radius: 4px;
    margin-bottom: 20px;
}

table {
    width: 80%;
    margin-top: 20px;
    border-collapse: collapse;
}

th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

h2 {
    color: #007BFF;
}

.button {
    background-color: #28A745;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
}

.modal-input {
    padding: 10px;
    border: 1px solid #007BFF;
    border-radius: 4px;
    width: 30%;
    margin-bottom: 10px;
}

.button-primary {
    background-color: #007BFF;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
}
  
  /* Modal styles */
  </style>