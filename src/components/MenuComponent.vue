<!-- src/components/MenuComponent.vue -->
<template>
    <nav>
      <ul>
        <li><router-link to="/manage-users">Gestionar Usuarios</router-link></li>
        <li><router-link to="/manage-accounts">Gestionar Cuentas</router-link></li>
        <li><router-link to="/manage-fios">Gestionar Fios</router-link></li>
        <li @click="logout">Cerrar Sesión</li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    methods: {
      logout() {
        // Implementar la lógica de cierre de sesión
        console.log('Cerrando sesión...');
        // Aquí podrías redirigir a la página de inicio o hacer otra acción
      }
    }
  };
  </script>
  
  <style>
  nav {
    background-color: #f8f9fa;
    padding: 1rem;
    border-bottom: 1px solid #dee2e6;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    display: inline;
    margin-right: 20px;
  }
  </style>