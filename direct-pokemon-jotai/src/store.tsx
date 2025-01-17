import { atom } from 'jotai';
import { atomWithQuery } from 'jotai-tanstack-query';

interface Pokemon {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

export const searchAtom = atom('');

const allPokemon = atomWithQuery<Pokemon[]>(() => ({
  queryKey: ['pokemon'],
  queryFn: () => fetch('/pokemon.json').then((res) => res.json()),
}));

export const pokemonAtom = atom((get) => {
  const search = get(searchAtom).toLowerCase();
  const { data } = get(allPokemon);
  return data?.filter((p) => p.name.toLowerCase().includes(search));
});

export const sortedPokemonAtom = atom((get) => {
  const pokemon = get(pokemonAtom);
  return pokemon?.slice(0, 10).sort((a, b) => a.name.localeCompare(b.name));
});
