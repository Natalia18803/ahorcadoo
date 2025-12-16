<template>
    <q-page class="nivel-page">
        <div class="level-container">
            <div class="level-header">
                <q-btn
                    flat
                    square
                    color="white"
                    size="lg"
                    label="VOLVER"
                    @click="$router.go(-1)"
                    class="back-btn"
                />
                <h1 class="level-title">¡Elije tu nivel!</h1>
                <div class="category-display">{{ categoria.toUpperCase() }}</div>
            </div>

            <div class="level-buttons">
                <button class="level-btn facil" @click="seleccionarNivel('facil')">
                    FÁCIL
                </button>
                <button class="level-btn medio" @click="seleccionarNivel('medio')">
                    MEDIO
                </button>
                <button class="level-btn dificil" @click="seleccionarNivel('dificil')">
                    DIFÍCIL
                </button>
            </div>
        </div>
    </q-page>
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
        },
        volverACategorias() {
            this.$router.push('/categorias');
        }
    }
}
</script>

<style scoped lang="scss">
.nivel-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #ffe09d 0%, #be8645 100%);
  padding: 20px;
  font-family: 'Press Start 2P', cursive;
}

.level-container {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.level-header {
  text-align: center;
  margin-bottom: 20px;

  .level-title {
    color: white;
    font-size: 1.5rem;
    margin-bottom: 15px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  .category-info {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.1);
    padding: 8px 16px;
    border-radius: 20px;
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.2);

    span {
      color: white;
      font-size: 0.6rem;
      font-weight: bold;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    }
  }
}

.level-buttons {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 400px;
}

.level-btn {
  width: 100%;
  padding: 20px;
  background: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  color: white;
  font-size: 0.8rem;
  font-family: 'Press Start 2P', cursive;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  text-align: center;

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    background: rgba(255, 255, 255, 0.25);
  }

  &:active {
    transform: translateY(-1px) scale(1.01);
  }

  &.facil {
    background: linear-gradient(135deg, rgba(76, 175, 80, 0.8), rgba(139, 195, 74, 0.8));
    border-color: rgba(76, 175, 80, 0.6);
  }

  &.medio {
    background: linear-gradient(135deg, rgba(255, 193, 7, 0.8), rgba(255, 152, 0, 0.8));
    border-color: rgba(255, 193, 7, 0.6);
  }

  &.dificil {
    background: linear-gradient(135deg, rgba(244, 67, 54, 0.8), rgba(229, 57, 53, 0.8));
    border-color: rgba(244, 67, 54, 0.6);
  }
}

.back-section {
  margin-top: 20px;

  .back-btn {
    font-family: 'Press Start 2P', cursive;
    font-size: 0.6rem;
    padding: 10px 20px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.2);

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }
  }
}

@media (max-width: 600px) {
  .level-buttons {
    gap: 15px;
  }

  .level-button {
    padding: 15px;
    gap: 12px;

    .level-content .level-name {
      font-size: 0.8rem;
    }

    .level-content .level-desc {
      font-size: 0.4rem;
    }
  }
}
</style>

