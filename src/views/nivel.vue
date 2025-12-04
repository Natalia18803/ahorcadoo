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
    data() {
        return {
            categoria: '' // Aquí guardamos la categoría que viene de categorias.vue
        }
    },
    mounted() {
        // Al cargar la página, obtener la categoría
        this.categoria = this.$route.query.categoria || 'animales';
    },
    methods: {
        seleccionarNivel(nivel) {
            // Enviar AMBOS: categoría y nivel al juego
            this.$router.push({ 
                path: '/juego', 
                query: { 
                    categoria: this.categoria, 
                    nivel: nivel 
                } 
            });
        }
    }
}
</script>

