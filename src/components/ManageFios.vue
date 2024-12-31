<!-- src/views/ManageUsers.vue -->
 
<template>
  <MenuComponent />
    <div>
      <h2>Gestionar Fios</h2>
      <!-- Contenido para gestionar usuarios -->

       <DataGrid :establecimiento="establecimiento"/>
 '
    </div>
  </template>
  
  <script>


import DataGrid from '../components/CuentaGrid.vue';
import MenuComponent from '../components/MenuComponent.vue'

  export default {
    name: 'ManageUsers',
    components: {
    DataGrid ,
    MenuComponent
  }
  };
  </script>
  
  <style>
  /* Estilos opcionales */
  </style>