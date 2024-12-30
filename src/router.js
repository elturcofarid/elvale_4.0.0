import { createRouter, createWebHistory } from 'vue-router';
import Home from '../src/components/HelloWorld.vue'; // Crea una vista para la página de inicio
import ManageUsers from '../src/components/ManageUsers.vue'; // Vista para gestionar usuarios
import ManageAccounts from '../src/components/ManageAccounts.vue'; // Vista para gestionar cuentas
import ManageFios from '../src/components/ManageFios.vue'; // Vista para gestionar Fios

const routes = [
  { path: '/', component: Home },
  { path: '/manage-users', component: ManageUsers },
  { path: '/manage-accounts', component: ManageAccounts },
  { path: '/manage-fios', component: ManageFios },
  // Agregar más rutas según sea necesario
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; // Aseg