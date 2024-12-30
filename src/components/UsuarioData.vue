<template>

    <div v-if="data.nombres"> 
      <h2>Datos de la API</h2>
      <div v-if="loading">Cargando...</div>
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
    <div v-else>
        <FormEstablecimiento :uid="uid" :email="email"/>
    </div>
    <div>
      <EstablecimientoData v-if="data.establecimiento" :establecimiento="data.establecimiento"/>
      <br>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import EstablecimientoData  from '../components/EstablecimientoData.vue';
  import FormEstablecimiento  from '../components/FormEstablecimiento.vue';
  
  export default {
    props: {
      uid: {   // Definir la prop "message"
      type: String, // Tipo de dato esperado
      required: false // Esta prop es obligatoria
    },
    email:{
        type: String,
        required: false
    }
  },
    components: {
        EstablecimientoData,
        FormEstablecimiento,
  },
    setup(props) {
      const data = ref([]);
      const loading = ref(false);
      const error = ref('');

     
  
      const fetchData = async () => {
        loading.value = true;
        error.value = '';
        try {
            console.log(props.uid);
          const response = await axios.get('http://localhost:8085/usuario/id/'+props.uid); // Reemplaza con la URL de tu API
          data.value = response.data; // Ajusta si la estructura de datos es diferente
          console.log(response.data);

          localStorage.setItem('ie', JSON.stringify(data.value.establecimiento));
          localStorage.setItem('iug', JSON.stringify(data.value.id));

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