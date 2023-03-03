const pokeApi = {};

pokeApi.connect = (offset = 0, limit = 151) => {
	const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
	return fetch(url)
		.then((response) => response.json())
		.then((jsonBody) => jsonBody.results)
		.then((detail) =>
			detail.map((pokemonDetails) =>
				fetch(pokemonDetails.url).then((pokemonsDetail) =>
					pokemonsDetail.json()
				)
			)
		)
		.then((detailRequets) => Promise.all(detailRequets))
		.then((pokemons) => pokemons);
};
