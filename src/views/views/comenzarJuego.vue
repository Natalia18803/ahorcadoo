<template>
    <div class="game-container">
        <div class=" contenedorComenzarJuego">
 <h1>¡Juega el Ahorcado!</h1>
        <img src="/public/esta.png" alt="Ahorcado" class="game-image">
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

<style scoped lang="scss">
.game-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #ffe09d 0%, #be8645 100%);
  padding: 20px;
  font-family: 'Press Start 2P', cursive;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contenedorComenzarJuego {
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;

  h1 {
    color: white;
    font-size: 2rem;
    margin-bottom: 30px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    animation: titleGlow 2s ease-in-out infinite alternate;
  }

  .q-input {
    margin: 20px 0;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    font-family: 'Press Start 2P', cursive;
  }

  .q-btn {
    margin-top: 30px;
    font-family: 'Press Start 2P', cursive;
    padding: 15px 30px;
    font-size: 0.9rem;
    border-radius: 0;
    border: 4px solid #000;
    background-color: #ff6b35;
    color: #fff;
    box-shadow: 4px 4px 0px #000;
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
      background-color: #f7931e;
      transform: translate(-2px, -2px);
      box-shadow: 6px 6px 0px #000;
    }

    &:active:not(:disabled) {
      transform: translate(2px, 2px);
      box-shadow: 2px 2px 0px #000;
    }
  }
}

.game-image {
  max-width: 300px;
  height: auto;
  margin: 20px 0;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

@keyframes titleGlow {
  0% {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
  100% {
    text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.5);
  }
}

@media (max-width: 600px) {
  .contenedorComenzarJuego {
    padding: 20px;
    margin: 20px;

    h1 {
      font-size: 1.5rem;
    }
  }

  .game-image {
    max-width: 250px;
  }
}
</style>

