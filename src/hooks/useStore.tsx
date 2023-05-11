import { useReducer } from 'react'
import {
  type Language,
  type Action,
  type State,
  type FromLanguage,
} from '../types.d'
import { AUTO_LANGUAGE } from '../constants'

// 1.- crear el estado inicial
const initialState: State = {
  fromLanguage: 'auto', // idioma actual
  toLanguage: 'en', // idioma a traducir
  fromText: '', // texto a traducir
  result: '', // resultado de la traduccion
  loading: false,
}

// 2.- creamos un reducer para poder manejar lo que viene a ser los estados, acciones, etc.
function reducer(state: State, action: Action) {
  // type es el nombre para identificar que accion es
  // payload es la informacion que se manda al reducer para actualizar el state
  const { type } = action

  if (type === 'INTERCHANGE_LANGUAGES') {
    // esta se encarga de intercambiar los idiomas

    // validamos que el valor "auto" no funcione al intercambiar
    if (state.fromLanguage === AUTO_LANGUAGE) return state

    const loading = state.fromText !== ''

    return {
      ...state,
      loading,
      result: '',
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
    }
  }

  if (type === 'SET_FROM_LANGUAGE') {
    // cambiar el idioma actual, esta es su labor

    // evitar que se haga la busqueda anterior
    if (state.fromLanguage === action.payload) return state

    const loading = state.fromText !== ''

    return {
      ...state,
      fromLanguage: action.payload,
      result: '',
      loading,
    }
  }

  if (type === 'SET_TO_LANGUAGE') {
    // cambiar el idioma a actualizar, esta es su labor
    // evitar que se haga la busqueda anterior
    if (state.toLanguage === action.payload) return state

    const loading = state.fromText !== ''
    return {
      ...state,
      toLanguage: action.payload,
      result: '',
      loading,
    }
  }

  if (type === 'SET_FROM_TEXT') {
    // cambiar lo que escribe el usuario para traducir, texto a traducir
    const loading = action.payload !== ''
    return {
      ...state,
      loading,
      fromText: action.payload,
      result: '',
    }
  }

  if (type === 'SET_RESULT') {
    // cambiar el resultado de la traduccion
    return {
      ...state,
      loading: false,
      result: action.payload,
    }
  }

  return state
}

export const useStore = () => {
  // 3.- pasarse los valores al hook useReducer
  const [state, dispatch] = useReducer(reducer, initialState)
  const { fromLanguage, toLanguage, fromText, result, loading } = state

  // function encargada de cambiar los lenguajes
  const intercambiarLanguage = () => {
    dispatch({
      type: 'INTERCHANGE_LANGUAGES',
    })
  }

  // funcion encargada de cambiar el lenguaje que se va a escribir, por defecto es auto, para detectarlo automaticamente
  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({
      type: 'SET_FROM_LANGUAGE',
      payload,
    })
  }

  // function encargada de detectar el idioma al cual se va a traducir
  const setToLanguage = (payload: Language) => {
    dispatch({
      type: 'SET_TO_LANGUAGE',
      payload,
    })
  }

  // function encargada de obtener la informacion que escribe el usuario para traducir
  const setFromText = (payload: string) => {
    dispatch({
      type: 'SET_FROM_TEXT',
      payload,
    })
  }

  // function encargada de mostrar los resultados de la traduccion
  const setResult = (payload: string) => {
    dispatch({
      type: 'SET_RESULT',
      payload,
    })
  }

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    intercambiarLanguage,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  }
}
