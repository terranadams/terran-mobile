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

export interface RecordResponse {
  result: RecordItemRaw[];
}

export interface RecordItemRaw {
  customId?: string;
  id?: string;
  type?: { text: string; value: string };
  assignedUser?: string;
  status?: { text: string; value: string };
  value?: string;
}

export interface RecordItem {
  customId: string;
  id: string;
  type: string;
  assignedUser: string;
  status: string;
  value: string;
}
