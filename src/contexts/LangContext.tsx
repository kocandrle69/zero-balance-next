'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { T, type Lang, type TranslationKey } from '../lib/translations'

interface LangContextType {
  lang: Lang
  t: (key: TranslationKey) => string
  tHTML: (key: TranslationKey) => { __html: string }
  setLang: (lang: Lang) => void
}

const LangContext = createContext<LangContextType>({
  lang: 'en',
  t: (key) => T.en[key],
  tHTML: (key) => ({ __html: T.en[key] }),
  setLang: () => {},
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('zbs_lang') as Lang | null
    if (saved && T[saved]) setLangState(saved)
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    if (typeof window !== 'undefined') {
      localStorage.setItem('zbs_lang', l)
      document.documentElement.lang = l
    }
  }

  const t = (key: TranslationKey): string => T[lang][key] ?? key
  const tHTML = (key: TranslationKey) => ({ __html: T[lang][key] ?? key })

  return (
    <LangContext.Provider value={{ lang, t, tHTML, setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
