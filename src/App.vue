<template>
  <div class="h-screen bg-gray-50 flex justify-center items-center">
    <div class="flex-row">
      <h1 id="titulo" class="text-center mb-10 text-4xl font-black text-yellow-400">GERADOR DE<br>POKÉMON<br>ALEATÓRIO</h1>
      <CardPokemon :listaPokemons="listaPokemons" v-if="carregou" />
    </div>
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

<style scoped>
  #titulo {
    text-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
  }
</style>