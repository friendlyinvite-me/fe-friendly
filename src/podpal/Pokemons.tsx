import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAsyncEffect from 'use-async-effect';
import { styled } from '../styles';
import { fetchAllPokemons, fetchPokemon } from './api/pokemon';
import { Pokemon, PokemonSnippet } from './PodpalApp';
import { Button } from './Pokemon';
import { PokemonCard } from './PokemonCard';

export const Pokemons: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonSnippet[]>([]);
  const [cursors, setCursors] = useState<string[]>([]);
  const navigate = useNavigate();

  useAsyncEffect(async () => {
    const { data: { results, next }} = await fetchAllPokemons();
    setPokemons(results);
    setCursors([next]);
  }, []);

  const onLoadMore = async () => {
    if (cursors.length > 0) {
      const { data: { results, next }} = await fetchAllPokemons(cursors[cursors.length - 1]);
      setPokemons([...pokemons, ...results]);
      setCursors([...cursors, next]);
    }
  };

  const onSetPokemon = async (pokemon: PokemonSnippet) => {
    navigate(`/pokemon/${pokemon.name}`);
  };

  return (
    <PokemonsImpl list={pokemons} setCurrentPokemon={onSetPokemon} onLoadMore={onLoadMore}/>
  );
};

interface Props {
  list: any[];
  setCurrentPokemon: (pokemon: PokemonSnippet) => void;
  onLoadMore: () => Promise<void>;
}

export const PokemonsImpl: React.FC<Props> = ({list, setCurrentPokemon, onLoadMore}: Props) => {
  return (
    <div>
      <div>
        <h1>Pokedex</h1>
      </div>
      <ListWrapper>
        {
          list.map((p: any) => (
            <PokemonCard onClick={setCurrentPokemon} key={p.name} pokemonSnippet={p} />
          ))
        }
      </ListWrapper>
      <br />
      <Button onClick={() => onLoadMore()}>Load More</Button>
    </div>
  );
};

const ListWrapper = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$3',

  '@md': {
    gridTemplateColumns: '1fr 1fr',
  },

  '@lg': {
    gridTemplateColumns: '1fr 1fr 1fr',
  },

});

