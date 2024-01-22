const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const buttonShiny = document.querySelector('.btn-shiny');


let searchPokemon = 1;
let isShiny = false;

const fetchPokemon = async (pokemon) => {
    const APIReponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIReponse.status == 200) {
        const data = await APIReponse.json();
        return data;
    }


}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = ''


    const data = await fetchPokemon(pokemon);

    if (data) {
        updateShinyState();
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;

        if(isShiny){
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];
        }
        else{
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        }

        input.value = '';
        searchPokemon = data.id;
    }

    else {

        pokemonName.innerHTML = 'Not Found :/';
        pokemonImage.style.display = 'none';
        pokemonNumber.innerHTML = '';
        input.value = ''
    }
}


const updateShinyState = () => {

    if (isShiny){
        buttonShiny.classList.add('shiny');
    }
    else{
        buttonShiny.classList.remove('shiny');
    }
}

buttonShiny.addEventListener('click', () => {
    isShiny = !isShiny;
    updateShinyState();
    renderPokemon(searchPokemon);
})


form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase())
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});





renderPokemon(searchPokemon);