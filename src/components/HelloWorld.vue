<template>
  <div id="app" class="app-container">
    <div v-if="user">
      <h1 class="title">Bienvenido, {{ user.uid }}</h1>
      <button @click="logout" class="button">Cerrar sesión</button>
    </div>
    <div v-else>
      <h1 class="title">{{ showLogin ? 'Iniciar Sesión' : 'Registrarse' }}</h1>
      
      
      <form v-if="showLogin" @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Correo electrónico" required class="form-input">
        <input v-model="password" type="password" placeholder="Contraseña" required class="form-input">
        <button type="submit" class="button">Iniciar sesión</button>
        <p v-if="error">{{ error }} <Alerta/> </p>

      </form>
      
      <form v-else @submit.prevent="register">
        <input v-model="regEmail" type="email" placeholder="Correo electrónico" required class="form-input">
        <input v-model="regPassword" type="password" placeholder="Contraseña" required class="form-input">
        <button type="submit" class="button">Registrarse</button>
        <p v-if="regError">{{ regError }}</p>
      </form>

      <br>
      <button @click="showLogin = true" v-if="!showLogin">¿Ya tienes una cuenta? Iniciar Sesión</button>
      <button @click="showLogin = false" v-if="showLogin">¿No tienes una cuenta? Registrarse</button>
    </div>

    <div v-if="user">
      <ManageFios/>
      <ApiData :uid="user.uid" :email="user.email"/>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import ApiData from '../components/UsuarioData.vue';
import ManageFios from './ManageFios.vue';
import Alerta from '../components/Alerta.vue';



export default {
  components: {
    ApiData,
    ManageFios,
    Alerta,
  },
  setup() {
    const user = ref(null);
    const email = ref('');
    const password = ref('');
    const regEmail = ref('');
    const regPassword = ref('');
    const error = ref('');
    const regError = ref('');
    const showLogin =true // Propiedad para controlar la vista



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
      login, register, logout, showLogin,
    };
  },
};
</script>

<style>
/* Agrega estilos para mejorar la interfaz */
body {
  background-color: #f0f4f8;
  margin: 0;
  font-family: Arial, sans-serif;
}

.app-container {
  width: 90%;max-width: 400px; /* Ancho máximo en pantallas grandes */
  margin: 0 auto; /* Centra el formulario horizontalmente */
  padding: 20px; /* Espaciado interno */
}

.title {
  color: #007BFF;
  margin-bottom: 10px;
}

.button {
  background-color: #28A745;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 4px;
}

.button:hover {
  background-color: #218838; /* Un poco más oscuro para efecto hover */
}

.form-input {
  display: block;
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>