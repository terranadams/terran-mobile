export interface Pokemon {
  id: number;
  name: string;
  defaultSprite: string;
  shinySprite: string;
  types: string[];
  description: string;
}

export interface Pokemon {
  id: number;
  name: string;
  defaultSprite: string;
  shinySprite: string;
  types: string[];
  description: string;
}

export interface PokemonApiResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    front_shiny: string;
  };
  types: { type: { name: string } }[];
}

export interface PokemonSpeciesApiResponse {
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
}

