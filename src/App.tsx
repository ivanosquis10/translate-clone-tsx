import { useEffect } from 'react'
import { useStore } from './hooks/useStore'
import { useDebounce } from './hooks/useDebounce'
import { translate } from './services/translate'
import { LanguageOptions } from './components/LanguageOptions'
import { TextArea } from './components/TextArea'
import { SectionType } from './types.d'
import { AUTO_LANGUAGE, LANGUAGE_VOICE } from './constants'
import { ArrowIcon, CopyIcon, SpeakerIcon } from './components/Icons'

function App() {
  const {
    fromLanguage,
    intercambiarLanguage,
    setFromLanguage,
    setToLanguage,
    toLanguage,
    setFromText,
    fromText,
    result,
    setResult,
    loading,
  } = useStore()

  const debounceFromText = useDebounce(fromText)

  useEffect(() => {
    if (debounceFromText === '') return

    translate({ fromLanguage, toLanguage, text: debounceFromText })
      .then(result => {
        if (result == null) return
        setResult(result)
      })
      .catch(() => {
        setResult('error')
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceFromText, fromLanguage, toLanguage])

  const handleClipboard = () => {
    navigator.clipboard.writeText(result)
    alert('copiado')
  }

  const handleSpeaker = () => {
    const uterrance = new SpeechSynthesisUtterance(result)
    uterrance.lang = LANGUAGE_VOICE[toLanguage]
    uterrance.rate = 0.85
    speechSynthesis.speak(uterrance)
  }

  return (
    <main className='bg-slate-800 text-white w-full min-h-screen flex flex-col items-center justify-center'>
      <h1 className='text-center text-4xl font-bold uppercase'>
        Ivanosquis Translate
      </h1>
      <section className='w-11/12 lg:w-1/2 flex justify-center gap-5 mt-5'>
        <div className='bg-black/50 p-5 w-full text-center rounded-lg'>
          <LanguageOptions
            type={SectionType.From}
            value={fromLanguage}
            onChange={setFromLanguage}
          />
          <TextArea
            type={SectionType.From}
            value={fromText}
            onChange={setFromText}
          />
        </div>
        <button
          disabled={fromLanguage === AUTO_LANGUAGE}
          onClick={intercambiarLanguage}
          className={`bg-black/40 px-2 font-bold rounded-xl uppercase  duration-300 ease-in-out
            ${
              fromLanguage === AUTO_LANGUAGE
                ? 'opacity-30'
                : ' hover:bg-black/70'
            }
          
          `}
        >
          <ArrowIcon />
        </button>

        <div className='bg-black/50 p-5 w-full text-center rounded-lg relative'>
          <LanguageOptions
            type={SectionType.To}
            value={toLanguage}
            onChange={setToLanguage}
          />
          <TextArea
            loading={loading}
            type={SectionType.To}
            value={result}
            onChange={setResult}
          />
          <div className='flex absolute bottom-6 right-6'>
            <button
              onClick={handleClipboard}
              className=' hover:bg-slate-900/50 rounded-lg p-1 duration-300 ease-in-out'
            >
              <CopyIcon />
            </button>
            <button
              onClick={handleSpeaker}
              className=' hover:bg-slate-900/50 rounded-lg p-1 duration-300 ease-in-out'
            >
              <SpeakerIcon />
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
