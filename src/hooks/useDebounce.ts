import { useState, useEffect } from 'react'

// Como no sabemos que valor vamos a recibir, necesitamos que el usuario nos diga que valor vendra, por ende hacemos esto:
/*
  T => Type
  El usuario nos lo va a decir gracias al generico "<>", el usuarios nos lo va a decir a traves del generico, en otras palabras, lo va a recibir por parametros, ejemplo:

  useDebounce<string>('Hello', 500)
  useDebounce<number>(1234, 500)
*/

export function useDebounce<T>(value: T, delay = 500) {
  const [debounceValue, setDebounceValue] = useState(value)

  // realizamos un timer que ponga el delay cuando el usuario va a escribir
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    // importante! hay que limpiar el timeout
    return () => {
      clearTimeout(timer)
    }
  }, [delay, value])

  return debounceValue
}

// esto seria el comportamiento del debounce, su linea del tiempo.

/* 
0ms     -> usuario escribe (h)
            -> useEffect ... Linea 17 (timer)
150ms   -> usuario escribe (he)
            -> clear useEffect ... Linea 22 (clear timeout)
            -> useEffect ... Linea 17 (timer)
250ms   -> usuario escribe (hel)
            -> clear useEffect ... Linea 22 (clear timeout)
            -> useEffect ... Linea 17 (timer)
350ms   -> usuario escribe (hell)
            -> clear useEffect ... Linea 22 (clear timeout)
            -> useEffect ... Linea 17 (timer)
550ms   -> usuario escribe (hell0)
            -> clear useEffect ... Linea 22 (clear timeout)
            -> useEffect ... Linea 17 (timer)
650mx   -> setDebounceValue -> Linea 18 (se establece el valor)
*/
