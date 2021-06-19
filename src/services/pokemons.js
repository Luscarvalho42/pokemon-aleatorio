import { http } from './config.js'

export default {
    listar: () => {
        return http.get('https://pokeapi.co/api/v2/pokedex/1/')
    },
    getPokemon(url) {
        return http.get(url)
    }
}