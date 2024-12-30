<template>
    <div>
      <h1>Buscador de Documentos</h1>
      
      <div>
        <label for="documentType">Tipo de Documento:</label>

     
        <select v-model="selectedDocumentType" >
          <option value="">Seleccione un tipo</option>
         <option value="" disabled>Seleccionar</option>
            <option value="CE">Cédula de Extranjería (CE)</option>
            <option value="CC">Cédula de Ciudadanía (CC)</option>
            <option value="TI">Tarjeta de Identidad (TI)</option>
        </select>

        <label for="documentId">ID del Documento:</label>
        <input type="text" v-model="documentId" placeholder="Ingrese ID" />
        <button @click="fetchDocuments">Buscar</button>
      </div>
       
  
      <div v-if="loading">Cargando...</div> <!-- Indicador de carga -->

      <div v-if="error">{{ error }}</div>

            Id: {{ data.id }}
            <br>
            Nombres: {{ data.nombres }}  
            <br> 
            Apellidos: {{ data.apellidos }}
            <br>
            Email: {{ data.email }}
            <br>
            Telefono: {{ data.telefono }}
        
        
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        documentTypes: [], // Para almacenar los tipos de documentos
        selectedDocumentType: '', // Tipo de documento seleccionado
        documentId: '', // ID del documento buscado
        data: [], // Resultados de la búsqueda
        loading: false, // Indicador de carga
        error: '', // Error de la búsqueda
      };
    },
    methods: {     
      async fetchDocuments() {
        try {
            this.loading = true;
          const response = await axios.get('http://localhost:8085/cliente/td/' + this.selectedDocumentType + '/' + this.documentId);

          this.data = response.data;
          this.loading = false;

          localStorage.setItem('ic', JSON.stringify(this.data.id));


          console.log(this.data);
        } catch (error) {
            this.error = "Error al obtener los documentos: " + error.message;
            this.loading = false;
        }
      },
    },
    created() {
     // this.fetchDocumentTypes(); // Obtiene los tipos de documentos al crear el componente
    },
  };
  </script>
  
  <style scoped>
  /* Estilos opcionales para tu componente */
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
  </style>