import axios from 'axios';

const baseUrl = 'https://pokeapi.co/api/v2';

export const fetchAllPokemons = async (url = `${baseUrl}/pokemon`) => {
  const response = await axios.get(url);
  return response;
};
export const fetchPokemon = async (name: string) => {
  const response = await axios.get(`${baseUrl}/pokemon/${name}`);
  return response;
};