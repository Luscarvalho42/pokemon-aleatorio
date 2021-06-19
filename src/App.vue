<template>
  <div class="container mx-auto">
    <img :alt="{sprite}" :src=sprite />
    <h3>{{ nomePokemon }}</h3>
  </div>
</template>

<script>
import Pokemon from './services/pokemons'

export default {
  data() {
    return {
      sprite: '',
      nomePokemon: ''
    }
  },
  name: 'App',
  mounted() {
    Pokemon.listar('https://pokeapi.co/api/v2/pokedex/2/')
      .then(({ request }) => {
        let listaPokemon = (JSON.parse(request.response).pokemon_entries)
        let numPokemonEscolhido = Math.floor(Math.random() * listaPokemon.length)
        let pokemonEscolhido = listaPokemon[numPokemonEscolhido]
        this.nomePokemon = pokemonEscolhido.pokemon_species.name

        let posPokedex = pokemonEscolhido.entry_number
        Pokemon.getPokemon('https://pokeapi.co/api/v2/pokemon/' + posPokedex)
          .then(({ request }) => {
            this.sprite = JSON.parse(request.response).sprites.front_default
          })
      })
    
    
  },
  components: {
  },
  
}
</script>

<style>
</style>
