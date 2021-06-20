<template>
  <div v-if="carregou" id="card" class="m-auto p-3 rounded-lg shadow" :class="'bg-'+cor+'-100'">
    <img :alt="nome" :src="img" class="w-3/6 m-auto"/>
    <h1 class="capitalize text-center text-4xl font-bold">
      {{ nome }}
    </h1>

    <div>
      <div v-for="tipo in tipos" :key="tipo">
        <h3>{{tipo}}</h3>
      </div>
    </div>

    <div>
      <div><p>HP<br>{{status.hp}}</p></div>
      <div><p>VELOCIDADE<br>{{status.velocidade}}</p></div>
      <div><p>ATAQUE<br>{{status.ataque}}</p></div>
      <div><p>DEFESA<br>{{status.defesa}}</p></div>
      <h3>Especial</h3>
      <div><p>ATAQUE<br>{{status.especial.ataque}}</p></div>
      <div><p>DEFESA<br>{{status.especial.defesa}}</p></div>
    </div>

    <div
      v-on:click="gerarPokemon"
      class="bg-yellow-300 p-2 rounded-md text-gray-500 shadow cursor-pointer hover:bg-yellow-200 duration-300">
      <h2 class="font-bold text-center">GERAR OUTRO POKÉMON</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardPokemon',
  props: {
    listaPokemons: Array
  },
  data() {
    return {
      carregou: false,
      cor: String,
      nome: String,
      img: String,
      status: Object,
      tipos: Array
    }
  },
  methods: {
    gerarPokemon() {
      this.carregou = false
      let numEscolhido = Math.floor(Math.random() * this.listaPokemons.length)
      let pokemonEscolhido = this.listaPokemons[numEscolhido]
      let posPokedex = pokemonEscolhido.entry_number

      this.nome = pokemonEscolhido.pokemon_species.name

      fetch('https://pokeapi.co/api/v2/pokemon/' + posPokedex)
        .then(response => {
          return response.json()
        })
        .then(({sprites, stats, types}) => {
          this.img = sprites.front_default
          this.status = {
            hp: stats[0].base_stat,
            ataque: stats[1].base_stat,
            defesa: stats[2].base_stat,
            velocidade: stats[5].base_stat,
            especial: {
              ataque: stats[3].base_stat,
              defesa: stats[4].base_stat
            },
          }
          this.tipos = types.map((tipo) => {
            return tipo.type.name
          })
          this.carregou = true
        })
      
      fetch('https://pokeapi.co/api/v2/pokemon-species/' + posPokedex)
        .then(response => {
          return response.json()
        })
        .then(({color}) => {
          let cor = color.name
          if(cor == 'black' || cor == 'white') cor = 'gray'
          if(cor == 'brown') cor = 'yellow'

          this.cor = cor
        })
    }
  },
  mounted() {
    this.gerarPokemon()
  },
}

</script>

<style scoped>
  #card {
    width: 300px;
  }
</style>
