<template>
    <h1>¡Elije tu categoria!</h1>
    <div class="q-pa-md game-container">

        <q-carousel v-model="slide" transition-prev="scale" transition-next="scale" animated
            control-color="white" navigation arrows height="300px"
            class="text-white shadow-1 rounded-borders">
            <template v-slot:navigation-icon="{ active, btnProps, onClick }">
                <q-btn v-if="active" size="lg" color="yellow" flat round dense @click="onClick" />
                <q-btn v-else size="sm" :icon="btnProps.icon" color="white" flat round dense @click="onClick" />
            </template>

            <q-carousel-slide name="Animales" class="column no-wrap flex-center">
                <img src="https://www.shutterstock.com/image-vector/cute-pixel-art-8bit-animals-260nw-2205649371.jpg" @click="irANivel" style="cursor: pointer;">

                <div class="q-mt-md text-center">
                    {{ Animales }}
                </div>
            </q-carousel-slide>


            <q-carousel-slide name="Frutas" class="column no-wrap flex-center">
                <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/024/274/734/small/pixel-fruit-icon-set-for-games-or-mobile-apps-colorful-pixel-art-old-style-8-bit-icons-collection-vector.jpg" @click="irANivel" style="cursor: pointer;">

                <div class="q-mt-md text-center">
                    {{ Frutas }}
                </div>
            </q-carousel-slide>


            <q-carousel-slide name="Paises" class="column no-wrap flex-center">
                <img
                    src="https://www.shutterstock.com/image-vector/pixel-country-flags-retro-flag-260nw-2485113497.jpg">
                <div class="q-mt-md text-center" @click="irANivel" style="cursor: pointer;">
                    {{ Paises }}
                </div>
            </q-carousel-slide>


            <q-carousel-slide name="Deportes" class="column no-wrap flex-center">
                <img
                    src="https://www.shutterstock.com/image-vector/balls-different-sports-pixel-art-260nw-2438545609.jpg">
                <div class="q-mt-md text-center" @click="irANivel" style="cursor: pointer;">
                    {{ Deportes }}
                </div>
            </q-carousel-slide>

            <q-carousel-slide name="peliculas" class="column no-wrap flex-center">
                <img src="https://www.shutterstock.com/image-vector/vector-set-pixel-cinema-isolated-260nw-2110184660.jpg" @click="irANivel" style="cursor: pointer;">
                <div class="q-mt-md text-center">
                    {{ Peliculas }}
                </div>
            </q-carousel-slide>

            <q-carousel-slide name="Ciencia" class="column no-wrap flex-center">
                <img src="https://www.shutterstock.com/image-vector/science-laboratory-pixel-art-set-260nw-2138306659.jpg" @click="irANivel" style="cursor: pointer;">
                <div class="q-mt-md text-center" @click="irANivel" style="cursor: pointer;">
                    {{ Ciencia }}
                </div>
            </q-carousel-slide>
        </q-carousel>

    
    </div>

</template>

<script>
export default {
    name: "Categorias",
    data() {
        return {
            slide: "style",
            Animales: "ANIMALES",
            Frutas: "FRUTAS",
            Paises: "PAISES",
            Deportes: "DEPORTES",
            Peliculas: "PELÍCULAS",
            Ciencia: "CIENCIA"
        };
    },
    methods: {
        irANivel() {
            this.$router.push('/nivel');
        }
    }
};
</script>


<style scoped>
.q-carousel {
  padding: 0;
}

.q-carousel-slide {
  position: relative;
  padding: 0;
  height: 100%;
}

.q-carousel-slide img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
}

.q-carousel-slide .q-mt-md {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
  z-index: 1;
}
</style>
