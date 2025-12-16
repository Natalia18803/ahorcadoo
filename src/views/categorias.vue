<template>
    <div class="categorias-page">
        <div class="header-section">
            <q-btn
                flat
                square
                color="white"
                size="lg"
                label="VOLVER"
                @click="$router.go(-1)"
                class="back-btn"
            />
            <h1 class="title">¡Elije tu categoria!</h1>
        </div>

        <div class="carousel-container">
            <q-carousel
                v-model="slide"
                transition-prev="."
                transition-next="slide-left"
                animated
                control-color="yellow"
                navigation
                arrows
                height="500px"
                class="categories-carousel"
                swipeable
                infinite
            >
                <template v-slot:navigation-icon="{ active, onClick }">
                    <q-btn
                        v-if="active"
                        size="lg"
                        color="yellow"
                        flat
                        round
                        dense
                        @click="onClick"
                        class="nav-btn active-nav"
                    >
                    
                    </q-btn>
                    <q-btn
                        v-else
                        size="md"
                        
                        color="white"
                        flat
                        round
                        dense
                        @click="onClick"
                        class="nav-btn"
                    />
                </template>

                <q-carousel-slide name="Animales" class="category-slide">
                    <div class="slide-content" @click="irANivel">
                        <div class="image-container">
                            <img
                                src="https://www.shutterstock.com/image-vector/cute-pixel-art-8bit-animals-260nw-2205649371.jpg"
                                alt="Animales"
                                class="category-image"
                            >
                           
                        </div>
                        <div class="category-label">
                            <q-icon name="Animales" size="md" class="category-icon" />
                        </div>
                        <div class="click-hint">¡Haz clic para jugar!</div>
                    </div>
                </q-carousel-slide>

                <q-carousel-slide name="Frutas" class="category-slide">
                    <div class="slide-content" @click="irANivel">
                        <div class="image-container">
                            <img
                                src="https://static.vecteezy.com/system/resources/thumbnails/024/274/734/small/pixel-fruit-icon-set-for-games-or-mobile-apps-colorful-pixel-art-old-style-8-bit-icons-collection-vector.jpg"
                                alt="Frutas"
                                class="category-image"
                            >
                           
                        </div>
                        <div class="category-label">
                            <q-icon name="Frutas" size="md" class="category-icon" />
                        </div>
                    </div>
                </q-carousel-slide>

                <q-carousel-slide name="Paises" class="category-slide">
                    <div class="slide-content" @click="irANivel">
                        <div class="image-container">
                            <img
                                src="https://www.shutterstock.com/image-vector/pixel-country-flags-retro-flag-260nw-2485113497.jpg"
                                alt="Países"
                                class="category-image"
                            >
                       
                        </div>
                        <div class="category-label">
                            <q-icon name="Paises" size="md" class="category-icon" />
                        </div>
                        <div class="click-hint">¡Haz clic para jugar!</div>
                    </div>
                </q-carousel-slide>

                <q-carousel-slide name="Deportes" class="category-slide">
                    <div class="slide-content" @click="irANivel">
                        <div class="image-container">
                            <img
                                src="https://www.shutterstock.com/image-vector/balls-different-sports-pixel-art-260nw-2438545609.jpg"
                                alt="Deportes"
                                class="category-image"
                            >
                         
                        </div>
                        <div class="category-label">
                            <q-icon name="Deportes" size="md" class="category-icon" />
                        </div>
                        <div class="click-hint">¡Haz clic para jugar!</div>
                    </div>
                </q-carousel-slide>

                <q-carousel-slide name="peliculas" class="category-slide">
                    <div class="slide-content" @click="irANivel">
                        <div class="image-container">
                            <img
                                src="https://www.shutterstock.com/image-vector/vector-set-pixel-cinema-isolated-260nw-2110184660.jpg"
                                alt="Películas"
                                class="category-image"
                            >
                  
                        </div>
                        <div class="category-label">
                            <q-icon name="Peliculas" size="md" class="category-icon" />
                        </div>
                        <div class="click-hint">¡Haz clic para jugar!</div>
                    </div>
                </q-carousel-slide>

                <q-carousel-slide name="Ciencia" class="category-slide">
                    <div class="slide-content" @click="irANivel">
                        <div class="image-container">
                            <img
                                src="https://www.shutterstock.com/image-vector/science-laboratory-pixel-art-set-260nw-2138306659.jpg"
                                alt="Ciencia"
                                class="category-image"
                            >
  
                        </div>
                        <div class="category-label">
                            <q-icon name="Ciencia" size="md" class="category-icon" />
                        </div>
                    </div>
                </q-carousel-slide>
            </q-carousel>
        </div>
    </div>
</template>

<script>
export default {
    name: "Categorias",
    data() {
        return {
            slide: "Animales"
        };
    },
    methods: {
        irANivel() {
            // Obtener la categoría actual del slide
            const categoriaSeleccionada = this.slide.toLowerCase();
            this.$router.push({
                path: '/nivel',
                query: { categoria: categoriaSeleccionada }
            });
        }
    }
};
</script>


