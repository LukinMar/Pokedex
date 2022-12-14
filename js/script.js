const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImg = document.querySelector('.pokemon_img');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIReponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIReponse.status == 200) {
        const data = await APIReponse.json()
        return data
    }

}

const renderPokemon = async (pokemon) => {
    pokemonNumber.innerHTML = '#'
    pokemonName.innerHTML = 'Loading...';
    const data = await fetchPokemon(pokemon);

    if (data) {
        searchPokemon = data.id
        pokemonImg.style.display = 'block'
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        input.value = '';
    } else {
        pokemonNumber.innerHTML = '#'
        pokemonName.innerHTML = 'Not found'
        pokemonImg.style.display = 'none'
    }

}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
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


renderPokemon(searchPokemon)