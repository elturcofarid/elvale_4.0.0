<template>
    <div>
      <h2>Formulario de Captura de Datos</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label for="nit">NIT:</label>
          <input type="text" id="nit" v-model="form.nit" required />
        </div>
        <div>
          <label for="razonSocial">Razón Social:</label>
          <input type="text" id="razonSocial" v-model="form.razonSocial" required />
        </div>
        <div>
          <label for="direccion">Dirección:</label>
          <input type="text" id="direccion" v-model="form.direccion" required />
        </div>
  
        <h3>Información del Usuario Admin</h3>
        <div>
          <label for="tipoIdentificacion">Tipo de Identificación:</label>
          <select v-model="form.usuarioAdmin.tipoIdentificacion" required>
            <option value="" disabled>Seleccionar</option>
            <option value="CE">Cédula de Extranjería (CE)</option>
            <option value="CC">Cédula de Ciudadanía (CC)</option>
            <option value="TI">Tarjeta de Identidad (TI)</option>
            <!-- Agrega más opciones según sea necesario -->
          </select>
        </div>
        <div>
          <label for="identificacion">Identificación:</label>
          <input type="text" id="identificacion" v-model="form.usuarioAdmin.identificacion" required />
        </div>
        <div>
          <label for="nombres">Nombres:</label>
          <input type="text" id="nombres" v-model="form.usuarioAdmin.nombres" required />
        </div>
        <div>
          <label for="apellidos">Apellidos:</label>
          <input type="text" id="apellidos" v-model="form.usuarioAdmin.apellidos" required />
        </div>
        <div>
          <label for="direccionAdmin">Dirección:</label>
          <input type="text" id="direccionAdmin" v-model="form.usuarioAdmin.direccion" required />
        </div>
        <div>
          <label for="celular">Celular:</label>
          <input type="text" id="celular" v-model="form.usuarioAdmin.celular" required />
        </div>
        <button type="submit">Enviar</button>
      </form>
      <div v-if="submitted">
        <h3>Datos Capturados:</h3>
        <pre>{{ form }}</pre>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import axios from 'axios';
  
  export default {
    props: {
      uid: {   // Definir la prop "message"
          type: String, // Tipo de dato esperado
          required: true // Esta prop es obligatoria
        },
        email:{
            type: String,
            required: true
        }
  },
    setup(props) {
      const form = ref({
        nit: '',
        razonSocial: '',
        direccion: '',
        usuarioAdmin: {
          tipoIdentificacion: '',
          identificacion: '',
          nombres: '',
          apellidos: '',
          direccion: '',
          celular: '',
          uid: props.uid,
          email: props.email
        }
      });
  
      const submitted = ref(false);
  
      const submitForm = async () => {
      try {
        const response = await axios.post('http://localhost:8085/establecimiento', form.value, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('Respuesta del servidor:', response.data);
        submitted.value = true; // Cambiar estado de enviado al servidor
      } catch (error) {
        console.error('Error al enviar los datos:', error);
      }
    };

    return {
      form,
      submitted,
      submitForm
    };
  },
};
  </script>
  
  <style>
  /* Estilos opcionales */
  form {
    display: flex;
    flex-direction: column;
  }
  label {
    margin-bottom: 5px;
  }
  input, select {
    margin-bottom: 15px;
  }
  </style>