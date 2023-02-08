import React, { useMemo, useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import { styled } from '../styles';
import { fetchPokemon } from './api/pokemon';
import { Pokemon, PokemonSnippet } from './PodpalApp';

interface Props {
  pokemonSnippet: PokemonSnippet;
  onClick: (pokemon: PokemonSnippet) => void;
}
export const PokemonCard: React.FC<Props> = (props: Props) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  useAsyncEffect(async () => {
    if (props.pokemonSnippet) {
      const pokemonInfo = await fetchPokemon(props.pokemonSnippet.name);
      setPokemon(pokemonInfo.data as Pokemon);
    }
  }, []);

  return (
    <StyledButton onClick={() => {
      props.onClick(props.pokemonSnippet);
    }}>
      <FlexWrapper>
        <PokemonName>{props.pokemonSnippet.name}</PokemonName>
        { pokemon && 
          <Badge type={pokemon.types[0].type.name as any}>{pokemon.types[0].type.name}</Badge>
        }
      </FlexWrapper>
      {
        pokemon && (
          <div>
            <Thumbnail src={pokemon.sprites.back_default} />
          </div>
        )
      }

    </StyledButton>
  );
};

const StyledButton = styled('div', {
  backgroundColor: 'transparant',
  border: '2px solid rgb(228 228 228)',
  padding: '20px',
  borderRadius: '10px',
  cursor: 'pointer',
  transition: '0.2s ease',

  "&:hover": {
    boxShadow: '0 5px 10px 0 rgba(0,0,0,0.15)',
    
    '& img': {
      transform: "scale(1.2)",
    },
  },
});

export const PokemonName = styled('div', {
  textTransform: 'capitalize',
  fontWeight: 500,
});

const Thumbnail = styled('img', {
  width: '100px',
  height: '100px',
  transition: '0.2s ease',
});

export const FlexWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const Badge = styled('div', {
  padding: '2px 12px 4px',
  borderRadius: '20px',
  color: 'white',
  backgroundColor: 'gray',

  variants: {
    type: {
      grass: {
        backgroundColor: '#20be73',
      },
      fire: {
        backgroundColor: '#f25959',
      },
      water: {
        backgroundColor: '#4389f6',
      },
      bug: {
        backgroundColor: '#20be73',
      },
      normal: {
        backgroundColor: '##969696',
      },
    },
  },
});