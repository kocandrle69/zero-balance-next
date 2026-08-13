'use client'

import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { T, type Lang, type TranslationKey } from '../lib/translations'

interface LangContextType {
  lang: Lang
  t: (key: TranslationKey) => string
  tHTML: (key: TranslationKey) => { __html: string }
}

const LangContext = createContext<LangContextType>({
  lang: 'en',
  t: (key) => T.en[key],
  tHTML: (key) => ({ __html: T.en[key] }),
})

/**
 * `lang` je teď odvozený z URL (segment `[locale]` v app routeru), ne z
 * localStorage — server layout ho čte z adresy a pošle sem jako
 * `initialLang`. To zajišťuje next-intl proxy (src/proxy.ts): detekuje
 * jazyk, přesměruje na prefixovanou adresu a zapamatuje si volbu do
 * cookie sám, takže tu vlastní localStorage logiku už nepotřebujeme.
 *
 * Přepnutí jazyka (Navbar) = navigace na jinou URL přes next-intl's
 * `useRouter`, ne volání settera tady — díky tomu zůstává obsah stránky
 * vždy v souladu s tím, co je v adrese, i pro prvotní server-rendered HTML.
 */
export function LangProvider({ children, initialLang }: { children: ReactNode; initialLang: Lang }) {
  useEffect(() => {
    document.documentElement.lang = initialLang
  }, [initialLang])

  const t = (key: TranslationKey): string => T[initialLang][key] ?? key
  const tHTML = (key: TranslationKey) => ({ __html: T[initialLang][key] ?? key })

  return (
    <LangContext.Provider value={{ lang: initialLang, t, tHTML }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
