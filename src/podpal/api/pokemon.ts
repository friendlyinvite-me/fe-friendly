import axios from 'axios';

const baseUrl = 'https://pokeapi.co/api/v2';

export const fetchAllPokemons = async (url = `${baseUrl}/pokemon?type`) => {
  const response = await axios.get(url);
  return response;
};
export const fetchPokemon = async (name: string) => {
  const response = await axios.get(`${baseUrl}/pokemon/${name}`);
  return response;
};
export const fetchType = async (filter: string, url = `${baseUrl}/type/${filter}`) => {
  const response = await axios.get(url);
  return response;
};