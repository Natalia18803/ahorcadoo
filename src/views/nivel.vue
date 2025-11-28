<template>
    <div>
        <h1>Elije tu nivel</h1>
        <q-btn color="primary" label="Fácil" @click="seleccionarNivel('facil')" />
        <q-btn color="secondary" label="Medio" @click="seleccionarNivel('medio')" />
        <q-btn color="accent" label="Difícil" @click="seleccionarNivel('dificil')" />
    </div>
</template>

<script>
 export default {
    name: "Nivel",
    methods: {
        seleccionarNivel(nivel) {
            this.$router.push({ path: '/juego', query: { nivel: nivel } });
        }
    }
 }
</script>

