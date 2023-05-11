import { SectionType } from '../types.d'

interface Props {
  loading?: boolean
  type: SectionType
  onChange: (value: string) => void
  value: string
}

const getPlaceHolder = ({
  type,
  loading,
}: {
  type: SectionType
  loading?: boolean
}) => {
  if (type === SectionType.From) return 'Introduce el texto'
  if (loading === true) return 'Cargando...'
  return 'Tradución'
}

export const TextArea: React.FC<Props> = ({
  loading,
  onChange,
  value,
  type,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  return (
    <form>
      <textarea
        id='message'
        rows={5}
        autoFocus={type === SectionType.From ? true : false}
        className={`resize-none mt-2 block p-2.5 w-full text-sm rounded-lg ${
          type === SectionType.From
            ? 'bg-slate-800/70 border-transparent'
            : 'bg-slate-800/90'
        } border-gray-600 placeholder-gray-400 text-white `}
        placeholder={getPlaceHolder({ loading, type })}
        value={value}
        onChange={handleChange}
        disabled={type === SectionType.To}
      />
    </form>
  )
}
