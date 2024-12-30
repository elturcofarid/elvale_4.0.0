<!-- src/views/ManageUsers.vue -->
<template>
    <div>
      <h2>Gestionar Usuarios</h2>
      <!-- Contenido para gestionar usuarios -->

      <FormUsuario/>
    </div>
  </template>
  
  <script>
import FormUsuario from '../components/FormUsuario.vue';

  export default {
    name: 'ManageUsers',
    components: {
    FormUsuario // Registrar el componente
  }
  };
  </script>
  
  <style>
  /* Estilos opcionales */
  </style>