<template>
    <div class="game-container">
        <div class=" contenedorComenzarJuego">
 <h1>¡Juega el Ahorcado!</h1>
        <img src=" m https://us.123rf.com/450wm/saphatthachat/saphatthachat1906/saphatthachat190600030/124968203-vector-pixel-art-rope-isolated-cartoon.jpg" alt="Ahorcado" class="game-image">
        <q-input v-model="username" label="Nombre de usuario" outlined />
        <q-btn color="primary" label="Iniciar Juego" @click="startGame" :disable="!username.trim()"/>
        </div>

    </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  data() {
    return {
      username: ''
    }
  },
  setup() {
    const router = useRouter()
    return { router }
  },
  methods: {
    startGame() {
      localStorage.setItem('username', this.username.trim())
      this.router.push('/categorias')
    }
  }
}
</script>

<style>

.contenedorComenzarJuego {
    text-align: center;

}

</style>

