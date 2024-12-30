<template>
  <div id="app">
    <div v-if="user">
      <h1>Bienvenido, {{ user.uid }}</h1>
      <button @click="logout">Cerrar sesión</button>
    </div>
    <div v-else>
      <h1>Iniciar Sesión</h1>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Correo electrónico" required>
        <input v-model="password" type="password" placeholder="Contraseña" required>
        <button type="submit">Iniciar sesión</button>
        <p v-if="error">{{ error }}</p>
      </form>
      <h2>Registrarse</h2>
      <form @submit.prevent="register">
        <input v-model="regEmail" type="email" placeholder="Correo electrónico" required>
        <input v-model="regPassword" type="password" placeholder="Contraseña" required>
        <button type="submit">Registrarse</button>
        <p v-if="regError">{{ regError }}</p>
      </form>
    </div>

  
   


  </div>

  <div v-if="user">
    <ManageFios/>
    <ApiData :uid="user.uid" :email="user.email"/>
  </div>


</template>

<script>
import { ref } from 'vue';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import ApiData from '../components/UsuarioData.vue';
import ManageFios from './ManageFios.vue';



export default {
  components: {
    ApiData,
    ManageFios,
  },
  setup() {
    const user = ref(null);
    const email = ref('');
    const password = ref('');
    const regEmail = ref('');
    const regPassword = ref('');
    const error = ref('');
    const regError = ref('');



    onAuthStateChanged(auth, (currentUser) => {
      user.value = currentUser;
      console.log(currentUser);
    });


    const login = async () => {
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value);

        error.value = ''; // Limpiar el error
      } catch (err) {
        error.value = 'Error al iniciar sesión: ' + err.message;
      }
    };

    const register = async () => {
      try {
        await createUserWithEmailAndPassword(auth, regEmail.value, regPassword.value);
        regError.value = ''; // Limpiar el error
      } catch (err) {
        regError.value = 'Error al registrarse: ' + err.message;
      }
    };

    const logout = async () => {
      localStorage.removeItem('ie');
      localStorage.removeItem('iug');
      await signOut(auth);
    };

    return {
      user, email, password, regEmail, regPassword, error, regError,
      login, register, logout,
    };
  },
};
</script>

<style>
/* Agrega estilos para mejorar la interfaz */
</style>