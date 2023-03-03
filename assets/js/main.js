const pokemonsList = document.getElementById("pokemonsList");
const pokemonContent = document.getElementById("content");
let pokemonAbout;

function convertPokemonsTypes(pokemons) {
	return pokemons.types
		.map((type) => `<li class="type">${type.type.name}</li>`)
		.join("");
}

function convertPokemonsToLi(pokemons) {
	return `
<li class="pokemon ${pokemons.types[0].type.name}">
					<span class="number">${pokemons.id}</span>
					<span class="name">${pokemons.name}</span>

					<div class="detail">
						<ol class="types">
							${convertPokemonsTypes(pokemons)}
							
						</ol>

						<img
							src="${pokemons.sprites.other.dream_world.front_default}"
							alt="${pokemons.name}"
						/>
					</div>
				</li>
`;
}

function ConvertPokemonToTableRow(pokemon, atributes) {
	let tableHtml = [];
	const pokemonAtributes = [
		pokemon.height,
		pokemon.weight,
		pokemon.abilities.map((ability) => ability.ability.name).join(", "),
	];
	const atributesLabel = atributes.map(
		(atb) => `<td  class='cardList-item'>${atb}</td>`
	);
	const pokemonTable = pokemonAtributes.map(
		(atb) => `<td class='cardList-item'>${atb}</td>`
	);

	for (let index = 0; index < atributesLabel.length; index++) {
		tableHtml += `<tr>${atributesLabel[index]}${pokemonTable[index]}</tr>`;
	}

	return tableHtml;
}

function pokemonAboutCard(pokemon) {
	const tableAtributes = ["Height", "Weight", "Abilities"];
	pokemonAbout = `<section class = 'card-content ${
		pokemon.types[0].type.name
	}'>
	<h1>${pokemon.name}</h1>
	
	<span class ='card-number ' >${pokemon.id}</span>
	<ol class = 'card-types'>${convertPokemonsTypes(pokemon)}</ol>
	<img class = 'card-img' src="${
		pokemon.sprites.other.dream_world.front_default
	}" alt="${pokemon.name}">
	<table class = 'card-list'>
	<th>Sobre</th> 
	${ConvertPokemonToTableRow(pokemon, tableAtributes)}
	</table>
	</section>`;

	document.getElementsByTagName("body")[0].innerHTML = pokemonAbout;
}

pokeApi
	.connect()
	.then((pokemons = []) => {
		const newHtml = pokemons.map(convertPokemonsToLi).join("");

		pokemonsList.innerHTML += newHtml;

		return pokemons;
	})
	.then((pokemonsAbout) => {
		for (let pokeElement of document.getElementsByClassName("pokemon")) {
			pokeElement.addEventListener("click", () => {
				const pokemonId = pokeElement.firstElementChild.textContent;
				pokemonContent.remove();
				pokemonAboutCard(pokemonsAbout[pokemonId - 1]);
			});
		}
	});
