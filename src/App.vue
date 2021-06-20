<template>
  <div class="h-screen flex-row bg-gray-50">
    <h1 class="text-center ">GERADOR DE POKÉMON ALEATÓRIO</h1>
    <CardPokemon :listaPokemons="listaPokemons" v-if="carregou" />
  </div>
</template>

<script>
import CardPokemon from './components/CardPokemon.vue'

export default {
  data() {
    return {
      listaPokemons: [],
      bgColor: '',
      carregou: false
    }
  },
  name: 'App',
  mounted() {
    fetch('https://pokeapi.co/api/v2/pokedex/1/')
      .then(response => {
        return response.json()
      })
      .then(({pokemon_entries}) => {
        this.listaPokemons = pokemon_entries
        this.carregou = true
      })
  },
  components: {
    CardPokemon
  },
  
}
</script>