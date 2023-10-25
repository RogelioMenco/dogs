import { GET_BREEDS, GET_TEMPERAMENT, ORDER_ZA, ORDER_AZ, WEIGHT_ASC, WEIGHT_DESC, SEARCH_BREED, FILTER_BY_TEMP, FILTER_BY_ORIGIN, GET_DETAIL, CLEAR_DETAIL, ADD_BREED } from "../actions";

var initialState = {
    breeds: [],
    breedsToFilter: [],
    temperaments: [],
    breedDetail: {}
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
      case GET_BREEDS:
          return {
              ...state,
              breeds: action.payload,
              breedsToFilter: action.payload
            //    arr: [...state.arr, action.newItem]
          };
      case GET_TEMPERAMENT:
          return {
              ...state,
              temperaments: action.payload
          };
      case ORDER_ZA:
          return {
              ...state,
              breedsToFilter: state.breedsToFilter.sort((a, b) => b.name.localeCompare(a.name))
          };
      case ORDER_AZ:
          return {
              ...state,
              breedsToFilter: state.breedsToFilter.sort((a, b) => a.name.localeCompare(b.name))
          };
      case WEIGHT_ASC:
          return {
              ...state,
              breedsToFilter: state.breedsToFilter.sort((a, b) => {
                  var x, y
                if(a.weight.split(' - ').length === 2) {
                    x = ((parseInt(a.weight.split(' - ')[0]) + parseInt(a.weight.split(' - ')[1])) / 2).toString()
                } else {  x = parseInt(a.weight.split(' - ')[0]).toString() }
                if(b.weight.split(' - ').length === 2){
                    y = ((parseInt(b.weight.split(' - ')[0]) + parseInt(b.weight.split(' - ')[1])) / 2).toString()
                } else {  y = parseInt(b.weight.split(' - ')[0]).toString() }
                return x - y
              })
          };
      case WEIGHT_DESC:
          return {
              ...state,
              breedsToFilter: state.breedsToFilter.sort((a, b) => {
                  var x, y
                if(a.weight.split(' - ').length === 2) {
                    x = ((parseInt(a.weight.split(' - ')[0]) + parseInt(a.weight.split(' - ')[1])) / 2).toString()
                } else {  x = parseInt(a.weight.split(' - ')[0]).toString() }
                if(b.weight.split(' - ').length === 2){
                    y = ((parseInt(b.weight.split(' - ')[0]) + parseInt(b.weight.split(' - ')[1])) / 2).toString()
                } else {  y = parseInt(b.weight.split(' - ')[0]).toString() }
                return y - x
              })
          };
      case SEARCH_BREED:
          if (action.payload === 'ALL') {
              return {
                  ...state,
                  breedsToFilter: state.breeds
              }
          } else {
              let searchedBreed = []
              if (state.breedsToFilter[0] !== false) {
                  searchedBreed = state.breedsToFilter.filter((breed) => breed.name.includes(action.payload))
              }
              if (searchedBreed.length === 0) {
                  return {
                      ...state,
                      breedsToFilter: [false]
                  }
              }
              else {
                  return {
                      ...state,
                      breedsToFilter: searchedBreed
                  }
              }
          };
      case FILTER_BY_TEMP:
          return {
              ...state,
              breedsToFilter: action.payload === 'ALL'? state.breeds : state.breeds.filter((breed) => (breed.temperament? breed.temperament.includes(action.payload):null))
          };
      case FILTER_BY_ORIGIN:
          if (action.payload === 'ALL') {
              return {
                  ...state,
                  breedsToFilter: state.breeds
              }
          }
          else {
              let breedsByOrigin = []
              breedsByOrigin = state.breeds.filter((breed) => breed.origin === action.payload)
              if (!breedsByOrigin.length) {
                  return {
                      ...state,
                      breedsToFilter: ['db empty']
                  }
              }
              else {
                  return {
                      ...state,
                      breedsToFilter: breedsByOrigin
                  }
              }
          };
      case GET_DETAIL:
          return {
              ...state,
              breedDetail: action.payload
          };
      case CLEAR_DETAIL:
          return {
              ...state,
              breedDetail: {}
          };
      case ADD_BREED:
          return {
              ...state,
          };
      default:
        return { ...state };
    };
};