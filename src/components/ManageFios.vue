<!-- src/views/ManageUsers.vue -->
<template>
    <div>
      <h2>Gestionar Fios</h2>
      <!-- Contenido para gestionar usuarios -->

       <DataGrid :establecimiento="establecimiento"/>
 '
    </div>
  </template>
  
  <script>


import DataGrid from '../components/CuentaGrid.vue';

  export default {
    name: 'ManageUsers',
    components: {
    DataGrid // Registrar el componente
  }
  };
  </script>
  
  <style>
  /* Estilos opcionales */
  </style>