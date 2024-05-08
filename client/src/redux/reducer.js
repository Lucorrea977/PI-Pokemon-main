const initialState = {
  pokemons: [],
  allPokemons: [],
  detail: [],
  types: [],
  filters: {},
 
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
  
    case 'GET_POKEMONS':
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };
      case 'FILTER_BY_TYPE':
        const allPokemons = state.allPokemons;
        console.log(state.pokemons);
        const typeFiltered =
          action.payload === "" ? allPokemons : allPokemons.filter((e) => e.types.includes(action.payload));
          const pokemonsName =  allPokemons.filter(pokemon => {
            return pokemon.types.some(type => type.name === action.payload);
          });
          const combinedPokemon = [...typeFiltered , ...pokemonsName]
          console.log("Pokémon filtrados por tipo:", combinedPokemon); 
        return {
          ...state,
          pokemons: combinedPokemon,
          filters: {
            ...state.filters,
            type: action.payload,
          },
        };
      case 'FILTER_CREATED':
        let createdFilter;
        if (action.payload === 'Creados') {
          createdFilter = state.allPokemons.filter((e) => e.createdAt);
        } else if (action.payload === 'Existentes') {
          createdFilter = state.allPokemons.filter((e) => !e.created);
        } else {
          createdFilter = state.allPokemons;
        }
        return {
          ...state,
          pokemons: action.payload === 'Todos' ? state.allPokemons : createdFilter,
          filters: {
            ...state.filters,
            created: action.payload,
          },
        };
    case 'FILTER_BY_ATTACK':
      let attackFilter = [...state.allPokemons];
      attackFilter = attackFilter.sort((a, b) => {
        if (a.attack < b.attack) {
          return action.payload === 'Mayor fuerza' ? 1 : -1;
        }
        if (a.attack > b.attack) {
          return action.payload === 'Mayor fuerza' ? -1 : 1;
        }
        return 0;
      });
      return {
        ...state,
        pokemons: action.payload === 'Fuerza' ? state.allPokemons : attackFilter,
        filters: {
          ...state.filters,
          attack: action.payload,
        },
      };
    case 'SORT':
      let orderedPokemons = [...state.pokemons];
      orderedPokemons = orderedPokemons.sort((a, b) => {
        if (a.name < b.name) {
          return action.payload === 'ASCENDENTE' ? -1 : 1;
        }
        if (a.name > b.name) {
          return action.payload === 'ASCENDENTE' ? 1 : -1;
        }
        return 0;
      });
      return {
        ...state,
        pokemons: action.payload === 'Ordenar A-Z' ? state.allPokemons : orderedPokemons,
        filters: {
          ...state.filters,
          sort: action.payload,
        },
      };
    case 'SEARCH_NAME':
      return {
        ...state,
        pokemons: action.payload,
      };
    case 'GET_DETAILS':
      return {
        ...state,
        detail: action.payload,
      };
    case 'GET_TYPE':
      return {
        ...state,
        types: action.payload,
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;