import React from 'react'
import { AUTO_LANGUAGE, LANGUAGE_SUPPORTED } from '../constants'
import { type FromLanguage, SectionType, type Language } from '../types.d'

type Props =
  | {
      type: SectionType.From
      value: FromLanguage
      onChange: (language: FromLanguage) => void
    }
  | {
      type: SectionType.To
      value: Language
      onChange: (language: Language) => void
    }

export const LanguageOptions: React.FC<Props> = ({ onChange, value, type }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as Language)
  }

  return (
    <form>
      <select
        onChange={handleChange}
        value={value}
        aria-label='selecciona un idioma para traducir'
        id='countries'
        className='bg-gray-50 font-medium tracking-wider text-gray-900 rounded-lg  block w-full p-2.5 dark:bg-slate-800 shadow-lg dark:placeholder-gray-400 dark:text-white outline-none appearance-none '
      >
        {type === SectionType.From && (
          <option className='rounded-lg' value={AUTO_LANGUAGE}>
            Detectar Idioma{' '}
          </option>
        )}
        {Object.entries(LANGUAGE_SUPPORTED).map(([key, valor]) => (
          <option key={key} value={key}>
            {valor}
          </option>
        ))}
      </select>
    </form>
  )
}
