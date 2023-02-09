import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAsyncEffect from 'use-async-effect';
import { styled } from '../styles';
import { fetchAllPokemons, fetchPokemon, fetchType } from './api/pokemon';
import { Pokemon, PokemonSnippet } from './PodpalApp';
import { Button } from './Pokemon';
import { Badge, FlexWrapper, PokemonCard } from './PokemonCard';

export const Pokemons: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonSnippet[]>([]);
  const [cursors, setCursors] = useState<string[]>([]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  useAsyncEffect(async () => {
    onFetchAll();
  }, []);

  const onLoadMore = async () => {
    if (cursors.length > 0) {
      const { data: { results, next }} = await fetchAllPokemons(cursors[cursors.length - 1]);
      setPokemons([...pokemons, ...results]);
      setCursors([...cursors, next]);
    }
  };

  const onFetchAll = async () => {
    const { data: { results, next }} = await fetchAllPokemons();
    setPokemons(results);
    setCursors([next]);
    setFilter('all');
  };

  const onFilterType = async (type: string) => {
    setFilter(type);
    const { data: { pokemon }} = await fetchType(type);
    setPokemons(pokemon.map((p: {pokemon: PokemonSnippet}) => p.pokemon));
    setCursors([]);
  };

  const onSetPokemon = async (pokemon: PokemonSnippet) => {
    navigate(`/pokemon/${pokemon.name}`);
  };












  console.log(filter);



  







  return (



    <div>
      <div>
        <h1>Pokedex</h1>
        <FlexWrapper>
          <FlexWrapper>
            <Badge sentiment={filter === 'all' ? 'filled' : "outline"} type="all" onClick={() => onFetchAll()}>All</Badge>
            <Badge sentiment={filter === 'fire' ? 'filled' : "outline"} type={'fire'} onClick={() => onFilterType('fire')}>Fire</Badge>
            <Badge sentiment={filter === 'water' ? 'filled' : "outline"} type={'water'} onClick={() => onFilterType('water')}>Water</Badge>
            <Badge sentiment={filter === 'grass' ? 'filled' : "outline"} type={'grass'} onClick={() => onFilterType('grass')}>Grass</Badge>
            <Badge sentiment={filter === 'bug' ? 'filled' : "outline"} type={'bug'} onClick={() => onFilterType('bug')}>Bug</Badge>
            <Badge sentiment={filter === 'normal' ? 'filled' : "outline"} type={'normal'} onClick={() => onFilterType('normal')}>Normal</Badge>
          </FlexWrapper>
          
        </FlexWrapper>
      </div>
      <br />
      <br />
      <br />
      <ListWrapper>
        {
          pokemons.map((p: any) => (
            <PokemonCard onClick={onSetPokemon} key={p.name} pokemonSnippet={p} />
          ))
        }
      </ListWrapper>
      <br />
      {
        cursors.length > 0 && cursors[cursors.length - 1] != null && <Button onClick={() => onLoadMore()}>Load More</Button>
      }
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

