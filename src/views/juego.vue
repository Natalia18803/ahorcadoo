<template>
  <q-page class="juego-page">
    <div class="game-container">
      <!-- Header -->
      <div class="game-header">
        <div class="user-info">
          <div class="user-avatar">
          </div>
          <div class="user-details">
            <div class="username">{{ username }}</div>
            <div class="user-meta">{{ categoria.toUpperCase() }} - {{ nivel.toUpperCase() }}</div>
          </div>
        </div>
        <div class="stats">
          <div class="stat-item">
           
            <span class="stat-label">Tiempo:</span>
            {{ tiempoFormateado }}
          </div>
          <div class="stat-item">
            
            <span class="stat-label">Vidas:</span>
            {{ vidas }}
          </div>
          <div class="stat-item">
           
            <span class="stat-label">Puntos:</span>
            {{ puntos }}
          </div>
        </div>
      </div>

      <div class="hangman-drawing">
        <svg viewBox="0 0 200 250" class="hangman-svg">
          <line x1="10" y1="230" x2="150" y2="230" stroke="#8B4513" stroke-width="4"/>
          <line x1="50" y1="230" x2="50" y2="20" stroke="#8B4513" stroke-width="4"/>
          <line x1="50" y1="20" x2="130" y2="20" stroke="#8B4513" stroke-width="4"/>
          <line x1="130" y1="20" x2="130" y2="50" stroke="#8B4513" stroke-width="2"/>
          <circle v-if="errores >= 1" cx="130" cy="70" r="20" stroke="#333" stroke-width="3" fill="none"/>
          <line v-if="errores >= 2" x1="130" y1="90" x2="130" y2="150" stroke="#333" stroke-width="3"/>
          <line v-if="errores >= 3" x1="130" y1="110" x2="100" y2="130" stroke="#333" stroke-width="3"/>
          <line v-if="errores >= 4" x1="130" y1="110" x2="160" y2="130" stroke="#333" stroke-width="3"/>
          <line v-if="errores >= 5" x1="130" y1="150" x2="110" y2="190" stroke="#333" stroke-width="3"/>
          <line v-if="errores >= 6" x1="130" y1="150" x2="150" y2="190" stroke="#333" stroke-width="3"/>
        </svg>
      </div>

      <!-- Palabra a adivinar -->
      <div class="word-display">
        <div 
          v-for="(letra, index) in palabraArray" 
          :key="index" 
          class="letter-box"
          :class="{ revealed: letrasAdivinadas.includes(letra) || juegoTerminado }"
        >
          {{ letrasAdivinadas.includes(letra) || juegoTerminado ? letra : '' }}
        </div>
      </div>

      <!-- Pista -->
      <div class="hint-display">
        <q-icon name="lightbulb" />
        {{ pista }}
      </div>

      <!-- Teclado -->
      <div class="keyboard">
        <div 
          v-for="fila in teclado" 
          :key="fila.join()" 
          class="keyboard-row"
        >
          <button
            v-for="letra in fila"
            :key="letra"
            class="key"
            :class="{
              'key-used': letrasUsadas.includes(letra),
              'key-correct': letrasAdivinadas.includes(letra),
              'key-incorrect': letrasUsadas.includes(letra) && !letrasAdivinadas.includes(letra)
            }"
            :disabled="letrasUsadas.includes(letra) || juegoTerminado"
            @click="verificarLetra(letra)"
          >
            {{ letra }}
          </button>
        </div>
      </div>

      <!-- Botón de nueva palabra -->
      <div class="game-actions">
        <q-btn
          v-if="juegoTerminado"
          color="primary"
          size="lg"
          label="Nueva Palabra"
          icon="refresh"
          @click="nuevaPartida"
          class="new-game-btn"
        />
      </div>

      <!-- Modal de victoria/derrota -->
      <q-dialog v-model="mostrarModal">
        <q-card class="result-card">
          <q-card-section class="result-header" :class="gano ? 'win' : 'lose'">
            <q-icon 
              :name="gano ? 'celebration' : 'sentiment_dissatisfied'" 
              size="xl"
            />
            <div class="result-title">{{ gano ? '¡Ganaste!' : '¡Perdiste!' }}</div>
          </q-card-section>
          
          <q-card-section>
            <p class="result-text">
              {{ gano ? '¡Excelente trabajo!' : 'La palabra era:' }}
            </p>
            <p class="result-word">{{ palabraActual }}</p>
          </q-card-section>

          <q-card-actions align="center">
            <q-btn 
              color="primary" 
              label="Nueva Partida" 
              @click="nuevaPartida"
              size="md"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

import { useRoute } from 'vue-router'

// Obtener parámetros de la ruta
const route = useRoute()
const categoria = route.query.categoria || 'animales'
const nivel = route.query.nivel || 'facil'

// Lista de palabras
// Banco de palabras por categoría y nivel
const bancoPalabras = {
  animales: {
    facil: ['GATO', 'PERRO', 'VACA', 'PATO', 'LORO'],
    medio: ['JIRAFA', 'ELEFANTE', 'TIGRE', 'CONEJO'],
    dificil: ['RINOCERONTE', 'MURCIELAGO', 'ORNITORRINCO']
  },
  frutas: {
    facil: ['MANZANA', 'PERA', 'UVA', 'KIWI'],
    medio: ['SANDIA', 'NARANJA', 'PLATANO', 'MANGO'],
    dificil: ['MARACUYA', 'GUANABANA', 'PITAHAYA']
  },
  paises: {
    facil: ['PERU', 'CHILE', 'CUBA', 'ITALIA'],
    medio: ['COLOMBIA', 'ARGENTINA', 'BRASIL', 'ESPAÑA'],
    dificil: ['TAILANDIA', 'AFGANISTAN', 'AZERBAIYAN']
  },
  deportes: {
    facil: ['FUTBOL', 'TENIS', 'GOLF', 'BOXEO'],
    medio: ['BALONCESTO', 'NATACION', 'CICLISMO'],
    dificil: ['HALTEROFILIA', 'ESGRIMA', 'BADMINTON']
  },
  peliculas: {
    facil: ['TITANIC', 'AVATAR', 'FROZEN', 'COCO'],
    medio: ['GLADIADOR', 'INCEPTION', 'INTERESTELAR'],
    dificil: ['RATATOUILLE', 'SHAWSHANK', 'FORRESTGUMP']
  },
  ciencia: {
    facil: ['ATOMO', 'CELULA', 'LUZ', 'SONIDO'],
    medio: ['ELECTRON', 'MOLECULA', 'GRAVEDAD'],
    dificil: ['MITOCONDRIA', 'FOTOSINTESIS', 'ELECTROMAGNETISMO']
  }
}

// Estado del juego
const palabraActual = ref('')
const letrasAdivinadas = ref([])
const letrasUsadas = ref([])
const errores = ref(0)
const vidas = ref(6)
const puntos = ref(0)
const juegoTerminado = ref(false)
const gano = ref(false)
const mostrarModal = ref(false)

// Usuario y tiempo
const username = ref(localStorage.getItem('username') || 'Jugador')
const tiempoInicio = ref(Date.now())
const tiempoActual = ref(0)
const intervaloTiempo = ref(null)

// Pista
const pista = ref('')

// Configuración del teclado en español
const teclado = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
]

// Computed
const palabraArray = computed(() => {
  return palabraActual.value.split('')
})

const tiempoFormateado = computed(() => {
  const segundos = Math.floor(tiempoActual.value / 1000)
  const minutos = Math.floor(segundos / 60)
  const segundosRestantes = segundos % 60
  return `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`
})

// Métodos
const iniciarJuego = () => {
  // Obtener palabras según categoría y nivel
  const palabrasDisponibles = bancoPalabras[categoria][nivel]
  const palabraAleatoria = palabrasDisponibles[Math.floor(Math.random() * palabrasDisponibles.length)]
  palabraActual.value = palabraAleatoria
  letrasAdivinadas.value = []
  letrasUsadas.value = []
  errores.value = 0
  vidas.value = 6
  juegoTerminado.value = false
  gano.value = false
  mostrarModal.value = false

  // Reiniciar tiempo
  tiempoInicio.value = Date.now()
  tiempoActual.value = 0
  if (intervaloTiempo.value) clearInterval(intervaloTiempo.value)
  intervaloTiempo.value = setInterval(() => {
    tiempoActual.value = Date.now() - tiempoInicio.value
  }, 100)

  // Establecer pista según categoría
  const pistas = {
    animales: 'Un animal',
    frutas: 'Una fruta',
    paises: 'Un país',
    deportes: 'Un deporte',
    peliculas: 'Una película',
    ciencia: 'Un concepto científico'
  }
  pista.value = pistas[categoria] || 'Una palabra'
}

// Inicializar el juego al montar el componente
onMounted(() => {
  iniciarJuego()
})

const verificarLetra = (letra) => {
  if (letrasUsadas.value.includes(letra) || juegoTerminado.value) return

  letrasUsadas.value.push(letra)

  if (palabraActual.value.includes(letra)) {
    letrasAdivinadas.value.push(letra)

    // Verificar si ganó
    const todasLasLetras = [...new Set(palabraActual.value.split(''))]
    if (todasLasLetras.every(l => letrasAdivinadas.value.includes(l))) {
      juegoTerminado.value = true
      gano.value = true
      puntos.value += 10
      if (intervaloTiempo.value) clearInterval(intervaloTiempo.value)
      setTimeout(() => {
        mostrarModal.value = true
      }, 500)
    }
  } else {
    errores.value++
    vidas.value--

    // Verificar si perdió
    if (errores.value >= 6) {
      juegoTerminado.value = true
      gano.value = false
      if (intervaloTiempo.value) clearInterval(intervaloTiempo.value)
      setTimeout(() => {
        mostrarModal.value = true
      }, 500)
    }
  }
}

const nuevaPartida = () => {
  iniciarJuego()
}

</script>

<style scoped lang="scss">
.juego-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #ffe09d 0%, #be8645 100%);
  padding: 20px;
  font-family: 'Press Start 2P', cursive;
}

.game-container {
  max-width: 800px;
  margin: 0 auto;
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);

  .user-info {
    display: flex;
    align-items: center;
    gap: 15px;

    .user-avatar {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .user-details {
      .username {
        color: white;
        font-size: 0.8rem;
        font-weight: bold;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        margin-bottom: 5px;
      }

      .user-meta {
        color: rgba(255, 255, 255, 0.8);
        font-size: 0.6rem;
        font-weight: normal;
      }
    }
  }

  .stats {
    display: flex;
    gap: 20px;

    .stat-item {
      background: rgba(255, 255, 255, 0.15);
      padding: 8px 12px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 6px;
      color: white;
      font-size: 0.6rem;
      backdrop-filter: blur(5px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      }

      .stat-label {
        font-weight: bold;
        opacity: 0.9;
      }
    }
  }
}

.hangman-drawing {
  background: white;
  border-radius: 20px;
  padding: 20px;
  margin: 0 auto 30px;
  max-width: 300px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  
  .hangman-svg {
    width: 100%;
    height: auto;
  }
}

.word-display {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 40px;
  flex-wrap: wrap;
  padding: 0 20px;

  .letter-box {
    width: 50px;
    height: 60px;
    background: white;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: bold;
    color: #667eea;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    border: 3px solid transparent;
    transition: all 0.3s ease;

    &.revealed {
      border-color: #4caf50;
      animation: reveal 0.5s ease;
    }
  }
}

.hint-display {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  margin-bottom: 8px;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  color: #667eea;
  font-size: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

@keyframes reveal {
  0% {
    transform: rotateY(90deg);
  }
  100% {
    transform: rotateY(0);
  }
}

.keyboard {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
  
  .keyboard-row {
    display: flex;
    justify-content: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  
  .key {
    width: 45px;
    height: 50px;
    background: white;
    border: none;
    border-radius: 10px;
    font-family: 'Press Start 2P', cursive;
    font-size: 0.9rem;
    font-weight: bold;
    color: #667eea;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    
    &:hover:not(:disabled) {
      transform: translateY(-3px);
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
      background: #f0f0f0;
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }
    
    &.key-used {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    &.key-correct {
      background: #4caf50;
      color: white;
      animation: correct 0.5s ease;
    }
    
    &.key-incorrect {
      background: #f44336;
      color: white;
      animation: incorrect 0.5s ease;
    }
    
    &:disabled {
      cursor: not-allowed;
    }
  }
}

@keyframes correct {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

@keyframes incorrect {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-10px);
  }
  75% {
    transform: translateX(10px);
  }
}

.game-actions {
  text-align: center;
  
  .new-game-btn {
    font-family: 'Press Start 2P', cursive;
    padding: 15px 30px;
    font-size: 0.9rem;
  }
}

.result-card {
  min-width: 300px;
  
  .result-header {
    text-align: center;
    padding: 30px;
    color: white;
    
    &.win {
      background: linear-gradient(135deg, #4caf50, #81c784);
    }
    
    &.lose {
      background: linear-gradient(135deg, #f44336, #e57373);
    }
    
    .result-title {
      font-size: 1.5rem;
      margin-top: 15px;
      font-family: 'Press Start 2P', cursive;
    }
  }
  
  .result-text {
    text-align: center;
    font-size: 1rem;
    margin-bottom: 10px;
  }
  
  .result-word {
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    color: #667eea;
    font-family: 'Press Start 2P', cursive;
  }
}

@media (max-width: 600px) {
  .game-header {
    flex-direction: column;
    gap: 20px;
    text-align: center;

    .user-info {
      .user-details .username {
        font-size: 0.7rem;
      }

      .user-details .user-meta {
        font-size: 0.5rem;
      }
    }

    .stats {
      justify-content: center;
      flex-wrap: wrap;
      gap: 15px;

      .stat-item {
        padding: 6px 10px;
        font-size: 0.5rem;
      }
    }
  }

  .word-display .letter-box {
    width: 40px;
    height: 50px;
    font-size: 1.2rem;
  }

  .keyboard .key {
    width: 35px;
    height: 40px;
    font-size: 0.7rem;
  }
}
</style>