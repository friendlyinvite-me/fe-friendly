import React from 'react';
import './PodpalApp.css';
import { Outlet } from "react-router-dom";
import { styled } from '../styles';


export interface PokemonSnippet {
  name: string;
}

export interface Pokemon {
  id: string;
  name: string;
  sprites: {
    [key: string]: string;
  };
  types: {
    type: {
      name: string;
    }
  }[]
}



export const PodpalApp:React.FC = () => {
  return (
    <Pokedex>
      <Outlet />
    </Pokedex>
  );
};



const Pokedex = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$5',
  margin: 'auto',
  maxWidth: '1000px',
  padding: '40px',
});
