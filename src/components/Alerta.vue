<template>
    <div class="alert-container" v-if="visible">
        <div class="alert-box">
            <h2 class="alert-title">{{ title }}</h2>
            <p class="alert-message">{{ message }}</p>
            <button class="alert-button" @click="handleClose">Intentar nuevamente</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AlertaError',
    props: {
        title: {
            type: String,
            default: 'Error'
        },
        message: {
            type: String,
            default: 'Se ha producido un error. Por favor, verifica los datos ingresados.'
        },
        visible: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        handleClose() {
            this.$emit('close');
        }
    }
};
</script>

<style scoped>
.alert-container {
    background-color: #f0f4f8; /* Fondo de la página */
    padding: 20px;
    border-radius: 5px;
}

.alert-box {
    border: 1px solid #dc3545; /* Borde rojo para error */
    background-color: #fff3f3; /* Fondo de la alerta */
    padding: 15px;
    border-radius: 5px;
}

.alert-title {
    color: #007BFF; /* Título en azul */
    margin: 0;
}

.alert-message {
    color: #dc3545; /* Mensaje de error en rojo */
}

.alert-button {
    background-color: #28A745; /* Botón en verde */
    color: white; /* Texto del botón en blanco */
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s; /* Efecto de transición */
}

.alert-button:hover {
    background-color: #218838; /* Color más oscuro al pasar el mouse */
}
</style>