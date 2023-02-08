import React, { useMemo, useState } from 'react';
import { Navigate, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import useAsyncEffect from 'use-async-effect';
import { styled } from '../styles';
import { fetchPokemon } from './api/pokemon';
import { Pokemon } from './PodpalApp';
import { Badge, FlexWrapper } from './PokemonCard';

export const PokemonInfo: React.FC = () => {
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null);
  const { pokemonName } = useLoaderData() as { pokemonName: string};
  const navigate = useNavigate();

  useAsyncEffect(async () => {
    if (pokemonName) {
      const pokemonInfo = await fetchPokemon(pokemonName);
      setCurrentPokemon(pokemonInfo.data as Pokemon);
    }
  }, [pokemonName]);

  if (currentPokemon == null) {
    return <div>
      loading...
    </div>;
  }

  return (
    <PokemonInfoImpl pokemon={currentPokemon} onBack={() => {
      navigate('/pokemons');
    }} />
  );
  
};

interface Props {
  onBack: () => void;
  pokemon: Pokemon;
}

export const PokemonInfoImpl: React.FC<Props> = ({pokemon, onBack}: Props) => {
  const photos = useMemo(() => {
    return Object.values(pokemon.sprites).filter(photo => typeof photo === 'string');
  }, []);

  console.log(photos);
  
  
  return (
    <Wrapper>
      <Button onClick={() => onBack()}>{'< Back'}</Button>
      <FlexWrapper>
        <Header>{pokemon.name}</Header>
        <Badge type={pokemon.types[0].type.name as any}>{pokemon.types[0].type.name}</Badge>
      </FlexWrapper>
      <ImageContainer>
        { photos.map(photo => (
          <Image key={photo} src={photo} />
        ))}
      </ImageContainer>
      <Desc>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Desc>
    </Wrapper>
  );
};

const Wrapper = styled('div', {
  display: 'flex',
  gap: '$5',
  flexDirection: 'column',
});

const Image = styled('img', {
  width: '100%',
  maxWidth: '200px',
  height: '200px',
  objectFit: 'contain',
  objectPosition: 'top left',
});
const ImageContainer = styled('div', {
  overflow: 'scroll',
  display: 'flex',
});

const Header = styled('h1', {
  textTransform: 'capitalize',
});
export const Button = styled('button', {
  width: '120px',
  height: '40px',
  borderRadius: '4px',
  backgroundColor: 'transparent',
  border: '2px solid whitesmoke',
  transition: '0.2s ease',
  cursor: 'pointer',

  '&:hover': {
    borderColor: 'black',
  },
});

const Desc = styled('div', {
  lineHeight: '30px',
});