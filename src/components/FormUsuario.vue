<template>
    <div class="app-container">
      <h2>Formulario de Captura de Datos</h2>
      <form @submit.prevent="submitForm">        
  
        <h3>Información del Usuario Admin</h3>

        <div>
          <label for="rol">Rol del Usuario:</label>
          <select v-model="form.rol" required>
            <option value="" disabled>Seleccionar</option>
            <option value="ADMIN">Administrador</option>
            <option value="ENC">Encargado</option>
            <option value="GES">Gestor</option>
            <!-- Agrega más opciones según sea necesario -->
          </select>
        </div>

        <div>
          <label for="tipoIdentificacion">Tipo de Identificación:</label>
          <select v-model="form.tipoIdentificacion" required>
            <option value="" disabled>Seleccionar</option>
            <option value="CE">Cédula de Extranjería (CE)</option>
            <option value="CC">Cédula de Ciudadanía (CC)</option>
            <option value="TI">Tarjeta de Identidad (TI)</option>
            <!-- Agrega más opciones según sea necesario -->
          </select>
        </div>
        <div>
          <label for="identificacion">Identificación:</label>
          <input type="text" id="identificacion" v-model="form.identificacion" required />
        </div>
        <div>
          <label for="nombres">Nombres:</label>
          <input type="text" id="nombres" v-model="form.nombres" required />
        </div>
        <div>
          <label for="apellidos">Apellidos:</label>
          <input type="text" id="apellidos" v-model="form.apellidos" required />
        </div>
        <div>
          <label for="direccionAdmin">Dirección:</label>
          <input type="text" id="direccionAdmin" v-model="form.direccion" required />
        </div>
        <div>
          <label for="celular">Celular:</label>
          <input type="text" id="celular" v-model="form.celular" required />
        </div>
        <div>
          <label for="uid">uid:</label>
          <input type="text" id="uid" v-model="form.uid"  />
        </div>

        <div>
          <label for="email">email:</label>
          <input type="text" id="uid" v-model="form.email"  />
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
  import { auth, createUserWithEmailAndPassword } from '../firebase';
  
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
    setup() {
      const form = ref({
          tipoIdentificacion: '',
          identificacion: '',
          nombres: '',
          apellidos: '',
          direccion: '',
          celular: '',
          uid: '',
          email: '',
          establecimiento: JSON.parse(localStorage.getItem('ie')),
          rol: '',
      });
  
      const submitted = ref(false);

  
      const submitForm = async () => {

        register();
      try {
        const response = await axios.post('http://localhost:8085/usuario', form.value, {
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


    const register = async () => {
        console.log('Si intenta crear');
      try {
        await createUserWithEmailAndPassword(auth, form.value.email, '123456');
        //regError.value = ''; // Limpiar el error
      } catch (err) {
          console.log( err.message);
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

  

  body {
    background-color: #f0f4f8;
    margin: 0;
    font-family: Arial, sans-serif;
    padding: 20px;
}

h2, h3 {
    color: #007BFF;
}

form {
    margin-top: 20px;
}

.app-container {
  width: 90%;max-width: 400px; /* Ancho máximo en pantallas grandes */
  margin: 0 auto; /* Centra el formulario horizontalmente */
  padding: 20px; /* Espaciado interno */
}

form div {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

select, input[type="text"] {
    padding: 5px;
    border: 1px solid #007BFF;
    width: calc(100% - 12px); /* Ajusta el ancho para el padding */
    border-radius: 4px;
}

button {
    background-color: #28A745;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #218838; /* Oscurece el botón al pasar el ratón */
}


  </style>