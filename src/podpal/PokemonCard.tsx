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
            <Thumbnail src={Object.values(pokemon.sprites).find(a => a != null && typeof a === 'string')} />
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
  gap: '$2',
  justifyContent: 'space-between',
});

export const Badge = styled('div', {
  padding: '2px 12px 4px',
  borderRadius: '20px',
  textTransform: 'capitalize',
  border: '1px solid #969696',
  backgroundColor: 'transparent',
  color: 'gray',
  cursor: 'pointer',

  variants: {
    type: {
      grass: {
        borderColor: '#20be73',
        color: '#20be73',
      },
      fire: {
        borderColor: '#f25959',
        color: '#f25959',
      },
      water: {
        borderColor: '#4389f6',
        color: '#4389f6',
      },
      bug: {
        borderColor: '#20be73',
        color: '#20be73',
      },
      normal: {
        borderColor: '#969696',
        color: '#969696',
      },
      all: {
        borderColor: '#969696',
        color: '#969696',
      },
    },
    sentiment: {
      "filled": {},
      "oultine": {},
    },
  },

  compoundVariants: [
    {
      type: 'all',
      sentiment: 'filled',
      css: {
        backgroundColor: '#969696',
        color: 'white',
      },
    },
    {
      type: 'grass',
      sentiment: 'filled',
      css: {
        backgroundColor: '#20be73',
        color: 'white',
      },
    },
    {
      type: 'fire',
      sentiment: 'filled',
      css: {
        backgroundColor: '#f25959',
        color: 'white',
      },
    },
    {
      type: 'water',
      sentiment: 'filled',
      css: {
        backgroundColor: '#4389f6',
        color: 'white',
      },
    },
    {
      type: 'bug',
      sentiment: 'filled',
      css: {
        backgroundColor: '#20be73',
        color: 'white',
      },
    },
    {
      type: 'normal',
      sentiment: 'filled',
      css: {
        backgroundColor: '#969696',
        color: 'white',
      },
    },
  ],
});