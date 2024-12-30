<template>
    <div>
      <h2>Datos de la API</h2>
      <div v-if="loading">Cargando...</div>
      <div v-if="error">{{ error }}</div>

      <br>
    <di>

      Id: {{ data.uuid }}
      <br>
     razon social: {{ data.razonSocial }}
      <br>
     
    </di>

     



     
    </div>
  </template>
  
  <script>
  import { ref , onMounted} from 'vue';
  import axios from 'axios';
  
  export default {
    props: {
      establecimiento: {   // Definir la prop "message"
      type: String, // Tipo de dato esperado
      required: false // Esta prop es obligatoria
    }
  },
    setup(props) {
      const data = ref([]);
      const loading = ref(false);
      const error = ref('');
  
      const fetchData = async () => {
        loading.value = true;
        error.value = '';
        try {
          console.log(props.establecimiento);
          const response = await axios.get('http://localhost:8085/establecimiento/id/'+props.establecimiento); // Reemplaza con la URL de tu API
          data.value = response.data; // Ajusta si la estructura de datos es diferente
          console.log(response.data);
        } catch (err) {
          error.value = 'Error al cargar los datos: ' + err.message;
        } finally {
          loading.value = false;
        }
      };

      onMounted(fetchData);
  
      return {
        data,
        loading,
        error,
        fetchData
      };
    },
  };
  </script>
  
  <style>
  /* Estilos opcionales para el componente */
  </style>