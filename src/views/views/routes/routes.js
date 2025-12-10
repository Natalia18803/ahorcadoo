
import comenzarJuego from "../views/comenzarJuego.vue"
import categorias from "../views/categorias.vue"
import nivel from "../views/nivel.vue"
import juego from "../views/juego.vue"
import {createRouter, createWebHashHistory} from "vue-router"

const routes=[
  {path:"/", component:comenzarJuego},
  {path:"/categorias", component:categorias},
  {path:"/nivel", component:nivel},
  {path:"/juego", component:juego}
]

export const router = createRouter({
  history:createWebHashHistory(),
  routes
})