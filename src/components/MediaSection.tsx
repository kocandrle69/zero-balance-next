'use client'

import { useRef, useState } from 'react'
import styles from './MediaSection.module.css'
import { useScrollRevealAll } from '../hooks/useScrollReveal'
import { useLang } from '../contexts/LangContext'
import { Link } from '../i18n/navigation'
import type { Lang } from '../lib/translations'

/**
 * Featured video (homepage) existuje jako tři samostatná nahrání na YouTube —
 * jedno na jazyk, ne jedno video s YouTube vícejazyčným audiem (YouTube to
 * u běžného nahrání neumožňuje bez multi-track audio nastavení, které tu
 * zatím neřešíme). Chybějící jazyk (fr/es/de) padá na EN, stejný vzor jako
 * FORM_EMBEDS na registrační stránce.
 */
export const FEATURED_VIDEO_IDS: Partial<Record<Lang, string>> = {
  cs: 'gqx6myXfg4E',
  en: '1-dBIZMvcXs',
  hi: 'iDhVyNM5hj4',
}

// ─── Kategorie ────────────────────────────────────────────────────────────────
export type VideoCategory =
  | 'sadhana' | 'wisdom' | 'ashram' | 'place'
  | 'deeksha' | 'gurudev' | 'aarti' | 'journeys' | 'meditation' | 'rituals'

export const CATEGORIES: { id: VideoCategory; labelCS: string; labelEN: string; labelHI: string; labelFR: string; labelES: string; labelDE: string }[] = [
  { id: 'sadhana',    labelCS: 'Sadhana',           labelEN: 'Sadhana',              labelHI: 'साधना',              labelFR: 'Sadhana',                labelES: 'Sadhana',                  labelDE: 'Sadhana' },
  { id: 'wisdom',     labelCS: 'Moudrost Indie',     labelEN: 'Wisdom of India',      labelHI: 'भारत की बुद्धि',      labelFR: 'Sagesse de l’Inde',       labelES: 'Sabiduría de la India',    labelDE: 'Weisheit Indiens' },
  { id: 'ashram',     labelCS: 'Život v ášrámu',     labelEN: 'Ashram life',          labelHI: 'आश्रम जीवन',          labelFR: 'Vie à l’ashram',          labelES: 'Vida en el ashram',        labelDE: 'Leben im ashram' },
  { id: 'place',      labelCS: 'Okolí ášrámu',       labelEN: 'Around the ashram',    labelHI: 'आश्रम के आसपास',      labelFR: 'Autour de l’ashram',      labelES: 'Alrededores del ashram',   labelDE: 'Rund um den ashram' },
  { id: 'deeksha',    labelCS: 'Deeksha',            labelEN: 'Deeksha',              labelHI: 'दीक्षा',              labelFR: 'Deeksha',                labelES: 'Deeksha',                  labelDE: 'Deeksha' },
  { id: 'gurudev',    labelCS: 'Gurudev',            labelEN: 'Gurudev',              labelHI: 'गुरुदेव',             labelFR: 'Gurudev',                labelES: 'Gurudev',                  labelDE: 'Gurudev' },
  { id: 'aarti',      labelCS: 'Aarti',              labelEN: 'Aarti',                labelHI: 'आरती',               labelFR: 'Aarti',                  labelES: 'Aarti',                    labelDE: 'Aarti' },
  { id: 'journeys',   labelCS: 'Cesty do Indie',     labelEN: 'Journeys to India',    labelHI: 'भारत यात्राएं',       labelFR: 'Voyages en Inde',         labelES: 'Viajes a la India',        labelDE: 'Reisen nach Indien' },
  { id: 'meditation', labelCS: 'Meditace',           labelEN: 'Meditation',           labelHI: 'ध्यान',              labelFR: 'Méditation',              labelES: 'Meditación',               labelDE: 'Meditation' },
  { id: 'rituals',    labelCS: 'Rituály & havany',   labelEN: 'Rituals & havans',     labelHI: 'अनुष्ठान व हवन',      labelFR: 'Rituels & havans',        labelES: 'Rituales y havans',        labelDE: 'Rituale & havans' },
]

/** Playlist série Moudrost Indie na kanálu @Zero-BalanceSociety.
    Videa v něm jsou původní, playlist je jen seskupuje. */
const WISDOM_PLAYLIST = 'PLbqoMKGt31J8'

/**
 * Odkaz „Sledovat na YouTube". U dílů série se připojí playlist, aby divák
 * mohl plynule pokračovat dál; vložený přehrávač na webu ho nedostává, ať
 * v něm nepřekáží fronta dalších dílů.
 */
export function watchUrl(video: { id: string; list?: string; channelUrl?: string }) {
  if (video.channelUrl) return video.channelUrl
  return `https://www.youtube.com/watch?v=${video.id}` + (video.list ? `&list=${video.list}` : '')
}

// ─── Video data ───────────────────────────────────────────────────────────────
// Pořadí na hlavní stránce: featured = Sadhana, preview[0] = Moudrost Indie, preview[1] = Ášrám
export const VIDEOS = [
  // 1. FEATURED — homepage swaps the actual video by language (viz
  // FEATURED_VIDEO_IDS výše); tenhle `id` je jen fallback/výchozí pro
  // ostatní místa, co VIDEOS[0] čtou beze změny jazyka (např. grid na
  // /media). Text už neříká "s českým dabingem" — dřív to bylo jedno
  // video pro všechny, teď každý jazyk slyší svůj vlastní dabing.
  {
    id: '1-dBIZMvcXs',
    titleCS: 'Dhyan Sadhana',
    titleEN: 'Dhyan Sadhana',
    descCS:  'Sadhana vedená Gurudevem v srpnu 2026.',
    descEN:  'Sadhana led by Gurudev in August 2026.',
    date:    '2026',
    dateEN:  '2026',
    category: 'sadhana' as const,
    categories: ['sadhana', 'meditation'] as VideoCategory[],
    tag:     'SADHANA',
    tagEN:   'SADHANA',
    titleHI: 'ध्यान साधना',
    descHI:  'अगस्त 2026 में गुरुदेव द्वारा संचालित साधना।',
    tagHI:   'साधना',
    titleFR: 'Dhyan Sadhana',
    descFR:  'Sadhana dirigée par Gurudev en août 2026.',
    tagFR:   'SADHANA',
    titleES: 'Dhyan Sadhana',
    descES:  'Sadhana dirigida por Gurudev en agosto de 2026.',
    tagES:   'SADHANA',
    titleDE: 'Dhyan Sadhana',
    descDE:  'Sadhana geleitet von Gurudev im August 2026.',
    tagDE:   'SADHANA',
  },
  // 2. PREVIEW — Moudrost Indie: Úvod (lekce 1)
  {
    id: 'rOTNqc8BbHw',
    titleCS: 'Video lekce se Sensei Rajeev Sinhou',
    titleEN: 'Video Lessons with Sensei Rajeev Sinha',
    descCS:  'První lekce ze série Moudrost Indie. Sensei Rajeev Sinha uvádí do hloubky indické filozofie a spirituální praxe.',
    descEN:  'First lesson from the Wisdom of India series. Sensei Rajeev Sinha introduces the depth of Indian philosophy and spiritual practice.',
    date:    '2024',
    dateEN:  '2024',
    category: 'wisdom' as const,
    list:    WISDOM_PLAYLIST,
    tag:     'MOUDROST',
    tagEN:   'WISDOM',
    titleHI: 'सेंसेई राजीव सिन्हा के साथ वीडियो पाठ',
    descHI:  'भारत की बुद्धि श्रृंखला का पहला पाठ। सेंसेई राजीव सिन्हा भारतीय दर्शन और आध्यात्मिक अभ्यास की गहराई का परिचय देते हैं।',
    tagHI:   'बुद्धि',
    titleFR: 'Cours vidéo avec Sensei Rajeev Sinha',
    descFR:  'Premier cours de la série Wisdom of India. Sensei Rajeev Sinha présente la profondeur de la philosophie indienne et de la pratique spirituelle.',
    tagFR:   'WISDOM',
    titleES: 'Lecciones en vídeo con Sensei Rajeev Sinha',
    descES:  'Primera lección de la serie Wisdom of India. Sensei Rajeev Sinha presenta la profundidad de la filosofía india y de la práctica espiritual.',
    tagES:   'WISDOM',
    titleDE: 'Videolektionen mit Sensei Rajeev Sinha',
    descDE:  'Erste Lektion der Reihe Wisdom of India. Sensei Rajeev Sinha führt in die Tiefe der indischen Philosophie und spirituellen Praxis ein.',
    tagDE:   'WISDOM',
  },
  // 3. PREVIEW — Ášrám
  {
    id: 'ipJoR8PvPDo',
    titleCS: 'Týden v ášrámu Karauli Shankar Mahadev Dham',
    titleEN: 'A Week at Karauli Shankar Mahadev Dham Ashram',
    descCS:  'Pohled do každodenního rytmu ášrámu — ranní sadhana, puja, satsang a tiché chvíle.',
    descEN:  'A glimpse into the daily rhythm of the ashram — morning sadhana, puja, satsang and quiet moments.',
    date:    '2025',
    dateEN:  '2025',
    category: 'ashram' as const,
    tag:     'ÁŠRAM',
    tagEN:   'ASHRAM',
    titleHI: 'काराउली शंकर महादेव धाम आश्रम में एक सप्ताह',
    descHI:  'आश्रम की दैनिक लय की झलक — सुबह की साधना, पूजा, सत्संग और शांत क्षण।',
    tagHI:   'आश्रम',
    titleFR: 'Une semaine à l’ashram Karauli Shankar Mahadev Dham',
    descFR:  'Un aperçu du rythme quotidien de l’ashram — sadhana matinale, puja, satsang et moments de silence.',
    tagFR:   'ASHRAM',
    titleES: 'Una semana en el ashram Karauli Shankar Mahadev Dham',
    descES:  'Una mirada al ritmo cotidiano del ashram — sadhana matutina, puja, satsang y momentos de silencio.',
    tagES:   'ASHRAM',
    titleDE: 'Eine Woche im Karauli Shankar Mahadev Dham Ashram',
    descDE:  'Ein Einblick in den täglichen Rhythmus des ashram — morgendliche Sadhana, puja, satsang und stille Momente.',
    tagDE:   'ASHRAM',
  },
  // ─── Všechna videa (/media) ────────────────────────────────────────────────
  // Sekce: Moudrost Indie
  {
    id: 'OzXzXRVnFvc',
    titleCS: 'Moudrost Indie — Finding a Complete Master',
    titleEN: 'Wisdom of India — Finding a Complete Master',
    descCS:  'Druhá lekce série: co to znamená najít skutečného mistra na duchovní cestě.',
    descEN:  'Second lesson: what it means to find a true master on the spiritual path.',
    date:    '2024',
    dateEN:  '2024',
    category: 'wisdom' as const,
    list:    WISDOM_PLAYLIST,
    tag:     'MOUDROST',
    tagEN:   'WISDOM',
    titleHI: 'भारत की बुद्धि — एक सच्चे गुरु को खोजना',
    descHI:  'दूसरा पाठ: आध्यात्मिक मार्ग पर सच्चे गुरु को खोजने का अर्थ।',
    tagHI:   'बुद्धि',
    titleFR: 'Wisdom of India — Trouver un maître accompli',
    descFR:  'Deuxième cours : ce que signifie trouver un véritable maître sur le chemin spirituel.',
    tagFR:   'WISDOM',
    titleES: 'Wisdom of India — Encontrar un maestro completo',
    descES:  'Segunda lección: qué significa encontrar un verdadero maestro en el camino espiritual.',
    tagES:   'WISDOM',
    titleDE: 'Wisdom of India — Einen vollkommenen Meister finden',
    descDE:  'Zweite Lektion: Was es bedeutet, einen wahren Meister auf dem spirituellen Weg zu finden.',
    tagDE:   'WISDOM',
  },
  {
    id: 'OxrFgXqKYFg',
    titleCS: 'Moudrost Indie — Kontrola nad prvky přírody',
    titleEN: 'Wisdom of India — Control over the Elements of Nature',
    descCS:  'Třetí lekce: jak jogíni a tantrikové pracují s přírodními silami.',
    descEN:  'Third lesson: how yogis and tantrikas work with the forces of nature.',
    date:    '2024',
    dateEN:  '2024',
    category: 'wisdom' as const,
    list:    WISDOM_PLAYLIST,
    tag:     'MOUDROST',
    tagEN:   'WISDOM',
    titleHI: 'भारत की बुद्धि — प्रकृति के तत्वों पर नियंत्रण',
    descHI:  'तीसरा पाठ: कैसे योगी और तांत्रिक प्रकृति की शक्तियों के साथ कार्य करते हैं।',
    tagHI:   'बुद्धि',
    titleFR: 'Wisdom of India — Le contrôle des éléments de la nature',
    descFR:  'Troisième cours : comment les yogis et les tantrikas travaillent avec les forces de la nature.',
    tagFR:   'WISDOM',
    titleES: 'Wisdom of India — El control sobre los elementos de la naturaleza',
    descES:  'Tercera lección: cómo los yoguis y tantrikas trabajan con las fuerzas de la naturaleza.',
    tagES:   'WISDOM',
    titleDE: 'Wisdom of India — Kontrolle über die Elemente der Natur',
    descDE:  'Dritte Lektion: Wie Yogis und Tantrikas mit den Kräften der Natur arbeiten.',
    tagDE:   'WISDOM',
  },
  {
    id: 'L17tfQvwT_I',
    titleCS: 'Moudrost Indie — Lekce 4',
    titleEN: 'Wisdom of India — Lesson 4',
    descCS:  'Čtvrtá část série s Sensei Rajeev Sinha.',
    descEN:  'Fourth part of the series with Sensei Rajeev Sinha.',
    date:    '2024',
    dateEN:  '2024',
    category: 'wisdom' as const,
    list:    WISDOM_PLAYLIST,
    tag:     'MOUDROST',
    tagEN:   'WISDOM',
    titleHI: 'भारत की बुद्धि — पाठ 4',
    descHI:  'सेंसेई राजीव सिन्हा के साथ श्रृंखला का चौथा भाग।',
    tagHI:   'बुद्धि',
    titleFR: 'Wisdom of India — Leçon 4',
    descFR:  'Quatrième partie de la série avec Sensei Rajeev Sinha.',
    tagFR:   'WISDOM',
    titleES: 'Wisdom of India — Lección 4',
    descES:  'Cuarta parte de la serie con Sensei Rajeev Sinha.',
    tagES:   'WISDOM',
    titleDE: 'Wisdom of India — Lektion 4',
    descDE:  'Vierter Teil der Reihe mit Sensei Rajeev Sinha.',
    tagDE:   'WISDOM',
  },
  {
    id: '3zmenJyvr7o',
    titleCS: 'Moudrost Indie — Religion is Coded Human Expression',
    titleEN: 'Wisdom of India — Religion is Coded Human Expression',
    descCS:  'Pátá lekce: náboženství jako zakódovaný lidský výraz vědomí.',
    descEN:  'Fifth lesson: religion as coded human expression of consciousness.',
    date:    '2024',
    dateEN:  '2024',
    category: 'wisdom' as const,
    list:    WISDOM_PLAYLIST,
    tag:     'MOUDROST',
    tagEN:   'WISDOM',
    titleHI: 'भारत की बुद्धि — धर्म एक कूटबद्ध मानव अभिव्यक्ति है',
    descHI:  'पांचवां पाठ: चेतना की कूटबद्ध मानव अभिव्यक्ति के रूप में धर्म।',
    tagHI:   'बुद्धि',
    titleFR: 'Wisdom of India — La religion est une expression humaine codée',
    descFR:  'Cinquième cours : la religion comme expression humaine codée de la conscience.',
    tagFR:   'WISDOM',
    titleES: 'Wisdom of India — La religión es una expresión humana codificada',
    descES:  'Quinta lección: la religión como expresión humana codificada de la conciencia.',
    tagES:   'WISDOM',
    titleDE: 'Wisdom of India — Religion ist codierter menschlicher Ausdruck',
    descDE:  'Fünfte Lektion: Religion als codierter menschlicher Ausdruck des Bewusstseins.',
    tagDE:   'WISDOM',
  },
  {
    id: '_Yt0UzvmfG8',
    titleCS: 'Moudrost Indie — Science is the Law of Nature',
    titleEN: 'Wisdom of India — Science is the Law of Nature',
    descCS:  'Šestá lekce: věda jako zákon přírody v pohledu indické filozofie.',
    descEN:  'Sixth lesson: science as the law of nature from an Indian philosophical perspective.',
    date:    '2024',
    dateEN:  '2024',
    category: 'wisdom' as const,
    list:    WISDOM_PLAYLIST,
    tag:     'MOUDROST',
    tagEN:   'WISDOM',
    titleHI: 'भारत की बुद्धि — विज्ञान प्रकृति का नियम है',
    descHI:  'छठा पाठ: भारतीय दार्शनिक दृष्टिकोण से विज्ञान प्रकृति के नियम के रूप में।',
    tagHI:   'बुद्धि',
    titleFR: 'Wisdom of India — La science est la loi de la nature',
    descFR:  'Sixième cours : la science comme loi de la nature selon une perspective philosophique indienne.',
    tagFR:   'WISDOM',
    titleES: 'Wisdom of India — La ciencia es la ley de la naturaleza',
    descES:  'Sexta lección: la ciencia como ley de la naturaleza desde una perspectiva filosófica india.',
    tagES:   'WISDOM',
    titleDE: 'Wisdom of India — Wissenschaft ist das Gesetz der Natur',
    descDE:  'Sechste Lektion: Wissenschaft als Gesetz der Natur aus indisch-philosophischer Perspektive.',
    tagDE:   'WISDOM',
  },
  {
    id: 'b4RmE7bxkJ4',
    titleCS: 'Moudrost Indie — Jak nejlépe pokročit v sadhně?',
    titleEN: 'Wisdom of India — What are the best ways to progress in sadhna?',
    descCS:  'Sedmá lekce: praktické rady pro pokrok na cestě sadhany.',
    descEN:  'Seventh lesson: practical guidance for progressing on the path of sadhana.',
    date:    '2024',
    dateEN:  '2024',
    category: 'wisdom' as const,
    list:    WISDOM_PLAYLIST,
    tag:     'MOUDROST',
    tagEN:   'WISDOM',
    titleHI: 'भारत की बुद्धि — साधना में प्रगति के सर्वोत्तम तरीके',
    descHI:  'सातवां पाठ: साधना के मार्ग पर आगे बढ़ने के लिए व्यावहारिक मार्गदर्शन।',
    tagHI:   'बुद्धि',
    titleFR: 'Wisdom of India — Comment progresser au mieux dans la sadhana ?',
    descFR:  'Septième cours : des conseils pratiques pour progresser sur le chemin de la sadhana.',
    tagFR:   'WISDOM',
    titleES: 'Wisdom of India — ¿Cuáles son las mejores formas de avanzar en la sadhana?',
    descES:  'Séptima lección: orientación práctica para avanzar en el camino de la sadhana.',
    tagES:   'WISDOM',
    titleDE: 'Wisdom of India — Wie kann man in der Sadhana am besten vorankommen?',
    descDE:  'Siebte Lektion: Praktische Hinweise für den Fortschritt auf dem Weg der Sadhana.',
    tagDE:   'WISDOM',
  },
  {
    id: 'x4bmLRMA1oI',
    titleCS: 'Moudrost Indie — Unlocking the Power of YogaTantra',
    titleEN: 'Wisdom of India — Unlocking the Power of YogaTantra',
    descCS:  'Osmá lekce: síla Jógatantry a jak ji aktivovat v praxi.',
    descEN:  'Eighth lesson: the power of YogaTantra and how to activate it in practice.',
    date:    '2024',
    dateEN:  '2024',
    category: 'wisdom' as const,
    list:    WISDOM_PLAYLIST,
    tag:     'MOUDROST',
    tagEN:   'WISDOM',
    titleHI: 'भारत की बुद्धि — योगतंत्र की शक्ति को उजागर करना',
    descHI:  'आठवां पाठ: योगतंत्र की शक्ति और इसे अभ्यास में कैसे सक्रिय करें।',
    tagHI:   'बुद्धि',
    titleFR: 'Wisdom of India — Libérer le pouvoir du YogaTantra',
    descFR:  'Huitième cours : le pouvoir du YogaTantra et la manière de l’activer dans la pratique.',
    tagFR:   'WISDOM',
    titleES: 'Wisdom of India — Descubrir el poder del YogaTantra',
    descES:  'Octava lección: el poder del YogaTantra y cómo activarlo en la práctica.',
    tagES:   'WISDOM',
    titleDE: 'Wisdom of India — Die Kraft des YogaTantra erschließen',
    descDE:  'Achte Lektion: Die Kraft des YogaTantra und wie sie in der Praxis aktiviert werden kann.',
    tagDE:   'WISDOM',
  },
  {
    id: 'kg6-YHE50uQ',
    titleCS: 'Kdo skutečně jste a kam odejdete poté, co opustíte své tělo?',
    titleEN: 'Who are you really, and where do you go after you leave your body?',
    descCS:  'Je tělo naším skutečným domovem, nebo jen dočasným místem na cestě vědomí? Jazyk titulků lze přepnout v nastavení videa.',
    descEN:  'Is the body our true home, or only a temporary place on the journey of consciousness? The subtitle language can be switched in the video settings.',
    date:    '2026',
    dateEN:  '2026',
    category: 'wisdom' as const,
    list:    WISDOM_PLAYLIST,
    tag:     'MOUDROST',
    tagEN:   'WISDOM',
    titleHI: 'आप वास्तव में कौन हैं और शरीर छोड़ने के बाद कहाँ जाते हैं?',
    descHI:  'क्या शरीर हमारा वास्तविक घर है, या चेतना की यात्रा में केवल एक अस्थायी पड़ाव? उपशीर्षक की भाषा वीडियो सेटिंग्स में बदली जा सकती है।',
    tagHI:   'बुद्धि',
    titleFR: 'Qui êtes-vous vraiment et où allez-vous après avoir quitté votre corps ?',
    descFR:  'Le corps est-il notre véritable demeure ou seulement un lieu temporaire sur le chemin de la conscience ? La langue des sous-titres peut être modifiée dans les réglages de la vidéo.',
    tagFR:   'WISDOM',
    titleES: '¿Quién eres realmente y adónde vas después de dejar tu cuerpo?',
    descES:  '¿Es el cuerpo nuestro verdadero hogar o solo un lugar temporal en el viaje de la conciencia? El idioma de los subtítulos puede cambiarse en los ajustes del vídeo.',
    tagES:   'WISDOM',
    titleDE: 'Wer bist du wirklich und wohin gehst du, nachdem du deinen Körper verlässt?',
    descDE:  'Ist der Körper unser wahres Zuhause oder nur ein vorübergehender Ort auf der Reise des Bewusstseins? Die Untertitelsprache kann in den Videoeinstellungen geändert werden.',
    tagDE:   'WISDOM',
  },
  // Sekce: Sadhana
  {
    id: 'RWklWj6_mcY',
    channelUrl: 'https://www.youtube.com/@PoornaGuru',
    titleCS: 'Dhyan Sadhana — pravidelná praxe v hindštině na @PoornaGuru',
    titleEN: 'Dhyan Sadhana — regular practice in Hindi on @PoornaGuru',
    descCS:  'Týdenní meditační sadhana v hindštině na kanálu Poorna Guru.',
    descEN:  'Weekly meditation sadhana in Hindi on the Poorna Guru channel.',
    date:    '2025',
    dateEN:  '2025',
    category: 'sadhana' as const,
    categories: ['sadhana', 'meditation'] as VideoCategory[],
    tag:     'SADHANA',
    tagEN:   'SADHANA',
    titleHI: 'ध्यान साधना — @PoornaGuru पर हिंदी में नियमित अभ्यास',
    descHI:  'Poorna Guru चैनल पर हिंदी में साप्ताहिक ध्यान साधना।',
    tagHI:   'साधना',
    titleFR: 'Dhyan Sadhana — pratique régulière en hindi sur @PoornaGuru',
    descFR:  'Sadhana de méditation hebdomadaire en hindi sur la chaîne Poorna Guru.',
    tagFR:   'SADHANA',
    titleES: 'Dhyan Sadhana — práctica regular en hindi en @PoornaGuru',
    descES:  'Sadhana de meditación semanal en hindi en el canal Poorna Guru.',
    tagES:   'SADHANA',
    titleDE: 'Dhyan Sadhana — regelmäßige Praxis auf Hindi bei @PoornaGuru',
    descDE:  'Wöchentliche Meditations-Sadhana auf Hindi auf dem Poorna Guru-Kanal.',
    tagDE:   'SADHANA',
  },
  // Sekce: Ášrám
  {
    id: 'nqVjdWMgWbY',
    titleCS: 'Ášrám Karauli Shankar Mahadev Dham — záznamy',
    titleEN: 'Karauli Shankar Mahadev Dham Ashram — recordings',
    descCS:  'Záznamy ze života v ášrámu — rituály, praxe a duchovní atmosféra místa.',
    descEN:  'Recordings from ashram life — rituals, practice and the spiritual atmosphere of the place.',
    date:    '2025',
    dateEN:  '2025',
    category: 'ashram' as const,
    tag:     'ÁŠRAM',
    tagEN:   'ASHRAM',
    titleHI: 'काराउली शंकर महादेव धाम आश्रम — रिकॉर्डिंग',
    descHI:  'आश्रम जीवन की रिकॉर्डिंग — अनुष्ठान, अभ्यास और स्थान का आध्यात्मिक वातावरण।',
    tagHI:   'आश्रम',
    titleFR: 'Karauli Shankar Mahadev Dham Ashram — enregistrements',
    descFR:  'Enregistrements de la vie à l’ashram — rituels, pratique et atmosphère spirituelle du lieu.',
    tagFR:   'ASHRAM',
    titleES: 'Karauli Shankar Mahadev Dham Ashram — grabaciones',
    descES:  'Grabaciones de la vida en el ashram — rituales, práctica y atmósfera espiritual del lugar.',
    tagES:   'ASHRAM',
    titleDE: 'Karauli Shankar Mahadev Dham Ashram — Aufnahmen',
    descDE:  'Aufnahmen aus dem Leben im ashram — Rituale, Praxis und die spirituelle Atmosphäre des Ortes.',
    tagDE:   'ASHRAM',
  },

  {
    id: 'Lgz_pjQ8mok',
    titleCS: 'Udělení Deeksha v ášrámu Karauli Shankar',
    titleEN: 'Deeksha Ceremony at Karauli Shankar Ashram',
    descCS:  'Převedení do vyšší úrovně Tantra Yog — vzácný obřad v přítomnosti Gurudeva.',
    descEN:  'Initiation into a higher level of Tantra Yog — a rare ceremony in the presence of Gurudev.',
    date:    '2025',
    dateEN:  '2025',
    category: 'deeksha' as const,
    tag:     'DEEKSHA',
    tagEN:   'DEEKSHA',
    titleHI: 'काराउली शंकर आश्रम में दीक्षा समारोह',
    descHI:  'तंत्र योग के उच्च स्तर में दीक्षा — गुरुदेव की उपस्थिति में एक दुर्लभ समारोह।',
    tagHI:   'दीक्षा',
    titleFR: 'Cérémonie de Deeksha à l’ashram de Karauli Shankar',
    descFR:  'Initiation à un niveau supérieur du Tantra Yog — une cérémonie rare en présence de Gurudev.',
    tagFR:   'DEEKSHA',
    titleES: 'Ceremonia de Deeksha en el ashram de Karauli Shankar',
    descES:  'Iniciación a un nivel superior del Tantra Yog — una ceremonia poco frecuente en presencia de Gurudev.',
    tagES:   'DEEKSHA',
    titleDE: 'Deeksha-Zeremonie im Karauli Shankar Ashram',
    descDE:  'Einweihung in eine höhere Stufe des Tantra Yog — eine seltene Zeremonie in der Gegenwart von Gurudev.',
    tagDE:   'DEEKSHA',
  },
  // Sekce: Okolí ášrámu
  {
    id: 'DnFdardLSV8',
    titleCS: 'Okolí ášrámu Karauli Shankar Mahadev Dham',
    titleEN: 'Around Karauli Shankar Mahadev Dham Ashram',
    descCS:  'Procházka okolím ášrámu — krajina, chrámy a každodenní život v Karauli.',
    descEN:  'A walk around the ashram — landscape, temples and everyday life in Karauli.',
    date:    '2025',
    dateEN:  '2025',
    category: 'place' as const,
    tag:     'MÍSTO',
    tagEN:   'PLACE',
    titleHI: 'काराउली शंकर महादेव धाम आश्रम के आसपास',
    descHI:  'आश्रम के आसपास की सैर — परिदृश्य, मंदिर और काराउली में दैनिक जीवन।',
    tagHI:   'स्थान',
    titleFR: 'Autour de l’ashram Karauli Shankar Mahadev Dham',
    descFR:  'Promenade autour de l’ashram — paysages, temples et vie quotidienne à Karauli.',
    tagFR:   'PLACE',
    titleES: 'Alrededores del ashram Karauli Shankar Mahadev Dham',
    descES:  'Un paseo por los alrededores del ashram — paisaje, templos y vida cotidiana en Karauli.',
    tagES:   'PLACE',
    titleDE: 'Rund um den Karauli Shankar Mahadev Dham Ashram',
    descDE:  'Ein Spaziergang rund um den ashram — Landschaft, Tempel und Alltag in Karauli.',
    tagDE:   'PLACE',
  },

  // ── Meditace žáků ─────────────────────────────────────────────────────────
  {
    id: '9CI51jXo-q4',
    category: 'meditation' as const,
    titleCS: 'AUM Meditace — noční praxe žáků v ášrámu',
    titleEN: 'AUM Meditation — night practice of disciples at the ashram',
    descCS:  'Závěrečná noční meditace žáků v ášrámu Karauli Shankar — dokončení úrovně ve dvě ráno.',
    descEN:  'Final night meditation of disciples at Karauli Shankar ashram — completing a level at 2 AM.',
    date: '2025', dateEN: '2025', tag: 'MEDITACE', tagEN: 'MEDITATION',
    titleHI: 'AUM ध्यान — आश्रम में शिष्यों का रात्रि अभ्यास',
    descHI:  'काराउली शंकर आश्रम में शिष्यों का अंतिम रात्रि ध्यान — रात 2 बजे एक स्तर का समापन।',
    tagHI:   'ध्यान',
    titleFR: 'Méditation AUM — pratique nocturne des disciples à l’ashram',
    descFR:  'Méditation finale des disciples à l’ashram de Karauli Shankar — achèvement d’un niveau à 2 heures du matin.',
    tagFR:   'MEDITATION',
    titleES: 'Meditación AUM — práctica nocturna de los discípulos en el ashram',
    descES:  'Meditación nocturna final de los discípulos en el ashram de Karauli Shankar — completando un nivel a las 2 de la madrugada.',
    tagES:   'MEDITATION',
    titleDE: 'AUM-Meditation — nächtliche Praxis der Schüler im ashram',
    descDE:  'Letzte nächtliche Meditation der Schüler im Karauli Shankar ashram — Abschluss einer Stufe um 2 Uhr morgens.',
    tagDE:   'MEDITATION',
  },
  {
    id: '882UtPlnSXE',
    category: 'meditation' as const,
    titleCS: 'Zahraniční žáci Gurudeva — duchovní praxe v ášrámu',
    titleEN: 'Gurudev\'s foreign disciples — spiritual practice at the ashram',
    descCS:  'Zahraniční žáci Karauli Sarkar dokončují svou duchovní praxi před slavností Guru Purnima.',
    descEN:  'Foreign disciples of Karauli Sarkar completing their spiritual practice before Guru Purnima.',
    date: '2025', dateEN: '2025', tag: 'MEDITACE', tagEN: 'MEDITATION',
    titleHI: 'गुरुदेव के विदेशी शिष्य — आश्रम में आध्यात्मिक अभ्यास',
    descHI:  'काराउली सरकार के विदेशी शिष्य गुरु पूर्णिमा से पहले अपनी आध्यात्मिक साधना पूरी करते हैं।',
    tagHI:   'ध्यान',
    titleFR: 'Les disciples étrangers de Gurudev — pratique spirituelle à l’ashram',
    descFR:  'Les disciples étrangers de Karauli Sarkar achèvent leur pratique spirituelle avant Guru Purnima.',
    tagFR:   'MEDITATION',
    titleES: 'Los discípulos extranjeros de Gurudev — práctica espiritual en el ashram',
    descES:  'Los discípulos extranjeros de Karauli Sarkar completando su práctica espiritual antes de Guru Purnima.',
    tagES:   'MEDITATION',
    titleDE: 'Gurudevs ausländische Schüler — spirituelle Praxis im ashram',
    descDE:  'Ausländische Schüler von Karauli Sarkar vollenden ihre spirituelle Praxis vor Guru Purnima.',
    tagDE:   'MEDITATION',
  },
  // ── Rituály, havany, aarti ─────────────────────────────────────────────────
  {
    id: '0gDA7jlVYdI',
    category: 'rituals' as const,
    titleCS: 'Rudrabhišek — védský rituál v ášrámu Karauli Shankar',
    titleEN: 'Rudrabhishek — Vedic ritual at Karauli Shankar ashram',
    descCS:  'Tradiční védský rituál Rudrabhišek zasvěcený Pánu Šivovi — mantry, očistné obřady a oddanost.',
    descEN:  'Traditional Vedic Rudrabhishek ritual dedicated to Lord Shiva — mantras, purification rites and devotion.',
    date: '2025', dateEN: '2025', tag: 'RITUÁL', tagEN: 'RITUAL',
    titleHI: 'रुद्राभिषेक — काराउली शंकर आश्रम में वैदिक अनुष्ठान',
    descHI:  'भगवान शिव को समर्पित पारंपरिक वैदिक रुद्राभिषेक अनुष्ठान — मंत्र, शुद्धिकरण और भक्ति।',
    tagHI:   'अनुष्ठान',
    titleFR: 'Rudrabhishek — rituel védique à l’ashram de Karauli Shankar',
    descFR:  'Rituel védique traditionnel de Rudrabhishek dédié au Seigneur Shiva — mantras, rites de purification et dévotion.',
    tagFR:   'RITUAL',
    titleES: 'Rudrabhishek — ritual védico en el ashram de Karauli Shankar',
    descES:  'Ritual védico tradicional de Rudrabhishek dedicado al Señor Shiva — mantras, ritos de purificación y devoción.',
    tagES:   'RITUAL',
    titleDE: 'Rudrabhishek — vedisches Ritual im Karauli Shankar ashram',
    descDE:  'Traditionelles vedisches Rudrabhishek-Ritual zu Ehren von Lord Shiva — Mantras, Reinigungsrituale und Hingabe.',
    tagDE:   'RITUAL',
  },
  {
    id: 'PiR2jW002dU',
    category: 'rituals' as const,
    titleCS: 'Purnima Havan v ášrámu Karauli Sarkar',
    titleEN: 'Purnima Havan at Karauli Sarkar Ashram',
    descCS:  'Posvátný ohňový obřad havan při úplňku — tradiční ceremonie v ášrámu Luv Kush.',
    descEN:  'Sacred fire havan ceremony at the full moon — traditional ritual at Luv Kush ashram.',
    date: '2025', dateEN: '2025', tag: 'HAVAN', tagEN: 'HAVAN',
    titleHI: 'काराउली सरकार आश्रम में पूर्णिमा हवन',
    descHI:  'पूर्णिमा पर पवित्र अग्नि हवन समारोह — लव कुश आश्रम में पारंपरिक अनुष्ठान।',
    tagHI:   'हवन',
    titleFR: 'Purnima Havan à l’ashram de Karauli Sarkar',
    descFR:  'Cérémonie sacrée du havan au feu de la pleine lune — rituel traditionnel à l’ashram Luv Kush.',
    tagFR:   'HAVAN',
    titleES: 'Purnima Havan en el ashram de Karauli Sarkar',
    descES:  'Ceremonia sagrada de havan al fuego durante la luna llena — ritual tradicional en el ashram Luv Kush.',
    tagES:   'HAVAN',
    titleDE: 'Purnima Havan im Karauli Sarkar Ashram',
    descDE:  'Heilige Havan-Zeremonie bei Vollmond — traditionelles Ritual im Luv Kush ashram.',
    tagDE:   'HAVAN',
  },
  {
    id: 'VqBudw3Wbts',
    category: 'rituals' as const,
    titleCS: 'Jednodenní havan v ášrámu Karauli Shankar',
    titleEN: 'One Day Havan at Karauli Shankar Ashram',
    descCS:  'Celodenní havan — posvátný ohňový rituál v srdci ášrámu Karauli Shankar.',
    descEN:  'Full-day havan — sacred fire ritual at the heart of Karauli Shankar ashram.',
    date: '2025', dateEN: '2025', tag: 'HAVAN', tagEN: 'HAVAN',
    titleHI: 'काराउली शंकर आश्रम में एक दिन का हवन',
    descHI:  'पूरे दिन का हवन — काराउली शंकर आश्रम के हृदय में पवित्र अग्नि अनुष्ठान।',
    tagHI:   'हवन',
    titleFR: 'Havan d’une journée à l’ashram de Karauli Shankar',
    descFR:  'Havan d’une journée entière — rituel sacré du feu au cœur de l’ashram de Karauli Shankar.',
    tagFR:   'HAVAN',
    titleES: 'Havan de un día en el ashram de Karauli Shankar',
    descES:  'Havan de todo el día — ritual sagrado del fuego en el corazón del ashram de Karauli Shankar.',
    tagES:   'HAVAN',
    titleDE: 'Ganztägiger Havan im Karauli Shankar Ashram',
    descDE:  'Ganztägiger Havan — heiliges Feuerritual im Herzen des Karauli Shankar ashram.',
    tagDE:   'HAVAN',
  },
  // ── Cesty po Indii ─────────────────────────────────────────────────────────
  {
    id: 'gkmYHOGHdBg',
    category: 'journeys' as const,
    titleCS: 'Matka Ganga v dešti',
    titleEN: 'Mother Ganga in the Rain',
    descCS:  'Meditativní záběry posvátné řeky Gangy v dešti — ticho, voda a duchovní přítomnost.',
    descEN:  'Meditative footage of the sacred Ganges river in the rain — silence, water and spiritual presence.',
    date: '2024', dateEN: '2024', tag: 'CESTA', tagEN: 'JOURNEY',
    titleHI: 'माँ गंगा वर्षा में',
    descHI:  'बारिश में पवित्र गंगा नदी के ध्यानात्मक दृश्य — मौन, जल और आध्यात्मिक उपस्थिति।',
    tagHI:   'यात्रा',
    titleFR: 'Mère Ganga sous la pluie',
    descFR:  'Images méditatives du Gange sacré sous la pluie — silence, eau et présence spirituelle.',
    tagFR:   'JOURNEY',
    titleES: 'Madre Ganga bajo la lluvia',
    descES:  'Imágenes meditativas del sagrado río Ganges bajo la lluvia — silencio, agua y presencia espiritual.',
    tagES:   'JOURNEY',
    titleDE: 'Mutter Ganga im Regen',
    descDE:  'Meditative Aufnahmen des heiligen Ganges im Regen — Stille, Wasser und spirituelle Präsenz.',
    tagDE:   'JOURNEY',
  },
  {
    id: 'EvGYE9Cmmvo',
    category: 'journeys' as const,
    titleCS: 'Úchvatná, ale nevyzpytatelná: Cesta Himalájemi',
    titleEN: 'Breathtaking yet Unpredictable: Journey through the Himalayas',
    descCS:  'Cesta horskými průsmyky Himálaje — krása, nepředvídatelnost a duchovní síla pohoří.',
    descEN:  'A journey through Himalayan mountain passes — beauty, unpredictability and the spiritual power of the mountains.',
    date: '2024', dateEN: '2024', tag: 'CESTA', tagEN: 'JOURNEY',
    titleHI: 'अद्भुत लेकिन अप्रत्याशित: हिमालय की यात्रा',
    descHI:  'हिमालयी पर्वत दर्रों से यात्रा — सुंदरता, अप्रत्याशितता और पर्वतों की आध्यात्मिक शक्ति।',
    tagHI:   'यात्रा',
    titleFR: 'À couper le souffle et pourtant imprévisible : voyage à travers l’Himalaya',
    descFR:  'Un voyage à travers les cols de l’Himalaya — beauté, imprévisibilité et puissance spirituelle des montagnes.',
    tagFR:   'JOURNEY',
    titleES: 'Impresionante pero impredecible: viaje por el Himalaya',
    descES:  'Un viaje por los pasos montañosos del Himalaya — belleza, imprevisibilidad y fuerza espiritual de las montañas.',
    tagES:   'JOURNEY',
    titleDE: 'Atemberaubend und unberechenbar: Reise durch den Himalaya',
    descDE:  'Eine Reise über die Bergpässe des Himalaya — Schönheit, Unberechenbarkeit und die spirituelle Kraft der Berge.',
    tagDE:   'JOURNEY',
  },
  // ── Deeksha ────────────────────────────────────────────────────────────────
  {
    id: 'bkt7sJPkbvs',
    category: 'deeksha' as const,
    titleCS: 'Bhajan večer v ášrámu v Haridwaru',
    titleEN: 'Bhajan Evening at the Haridwar Ashram',
    descCS:  'Duchovní zpěv bhajánů na večerním setkání v ášrámu Karauli Shankar v Haridwaru.',
    descEN:  'Spiritual bhajan singing at an evening gathering at Karauli Shankar ashram in Haridwar.',
    date: '2025', dateEN: '2025', tag: 'DEEKSHA', tagEN: 'DEEKSHA',
    titleHI: 'हरिद्वार आश्रम में भजन संध्या',
    descHI:  'हरिद्वार में काराउली शंकर आश्रम की एक सांध्यकालीन बैठक में आध्यात्मिक भजन गायन।',
    tagHI:   'दीक्षा',
    titleFR: 'Soirée de bhajans à l’ashram de Haridwar',
    descFR:  'Chants spirituels de bhajans lors d’une rencontre du soir à l’ashram de Karauli Shankar à Haridwar.',
    tagFR:   'DEEKSHA',
    titleES: 'Tarde de bhajans en el ashram de Haridwar',
    descES:  'Canto espiritual de bhajans durante un encuentro vespertino en el ashram de Karauli Shankar en Haridwar.',
    tagES:   'DEEKSHA',
    titleDE: 'Bhajan-Abend im Haridwar Ashram',
    descDE:  'Spiritueller Bhajan-Gesang bei einem Abendtreffen im Karauli Shankar ashram in Haridwar.',
    tagDE:   'DEEKSHA',
  },
  // ── Rozmluvy s Gurudevem ───────────────────────────────────────────────────
  {
    id: 'BysyWEE3TeE',
    category: 'gurudev' as const,
    titleCS: 'Gurudev a zahraniční žáci — rozmluva a praxe',
    titleEN: 'Gurudev with foreign disciples — conversation and practice',
    descCS:  'Přímá rozmluva Gurudeva se zahraničními žáky — duchovní otázky, praxe a živé učení.',
    descEN:  'Direct conversation between Gurudev and foreign disciples — spiritual questions, practice and live teachings.',
    date: '2022', dateEN: '2022', tag: 'GURUDEV', tagEN: 'GURUDEV',
    titleHI: 'गुरुदेव और विदेशी शिष्य — वार्तालाप और अभ्यास',
    descHI:  'गुरुदेव और विदेशी शिष्यों के बीच प्रत्यक्ष वार्तालाप — आध्यात्मिक प्रश्न, अभ्यास और जीवंत शिक्षाएं।',
    tagHI:   'गुरुदेव',
    titleFR: 'Gurudev avec ses disciples étrangers — conversation et pratique',
    descFR:  'Conversation directe entre Gurudev et ses disciples étrangers — questions spirituelles, pratique et enseignements en direct.',
    tagFR:   'GURUDEV',
    titleES: 'Gurudev con discípulos extranjeros — conversación y práctica',
    descES:  'Conversación directa entre Gurudev y discípulos extranjeros — preguntas espirituales, práctica y enseñanzas en directo.',
    tagES:   'GURUDEV',
    titleDE: 'Gurudev mit ausländischen Schülern — Gespräch und Praxis',
    descDE:  'Direktes Gespräch zwischen Gurudev und ausländischen Schülern — spirituelle Fragen, Praxis und Lehren aus erster Hand.',
    tagDE:   'GURUDEV',
  },
  {
    id: '2dADmQbSdYY',
    category: 'gurudev' as const,
    titleCS: 'Duchovní rozmluva se zahraničními žáky — Den 2',
    titleEN: 'Spiritual conversation with foreign disciples — Day 2',
    descCS:  'Druhý den rozhovorů Gurudeva se zahraničními žáky — hluboké učení a duchovní výměna.',
    descEN:  'Second day of Gurudev\'s conversations with foreign disciples — deep teachings and spiritual exchange.',
    date: '2022', dateEN: '2022', tag: 'GURUDEV', tagEN: 'GURUDEV',
    titleHI: 'विदेशी शिष्यों के साथ आध्यात्मिक वार्तालाप — दिन 2',
    descHI:  'गुरुदेव और विदेशी शिष्यों के बीच वार्तालाप का दूसरा दिन — गहन शिक्षाएं और आध्यात्मिक आदान-प्रदान।',
    tagHI:   'गुरुदेव',
    titleFR: 'Conversation spirituelle avec les disciples étrangers — Jour 2',
    descFR:  'Deuxième journée des échanges de Gurudev avec ses disciples étrangers — enseignements profonds et échange spirituel.',
    tagFR:   'GURUDEV',
    titleES: 'Conversación espiritual con discípulos extranjeros — Día 2',
    descES:  'Segundo día de conversaciones de Gurudev con discípulos extranjeros — enseñanzas profundas e intercambio espiritual.',
    tagES:   'GURUDEV',
    titleDE: 'Spirituelles Gespräch mit ausländischen Schülern — Tag 2',
    descDE:  'Zweiter Tag der Gespräche von Gurudev mit ausländischen Schülern — tiefgehende Lehren und spiritueller Austausch.',
    tagDE:   'GURUDEV',
  },
  {
    id: 'aHE-DiIeJ1g',
    category: 'gurudev' as const,
    titleCS: 'Duchovní rozmluva se zahraničními žáky — Den 3',
    titleEN: 'Spiritual conversation with foreign disciples — Day 3',
    descCS:  'Třetí den živého učení — Gurudev odpovídá na otázky zahraničních žáků.',
    descEN:  'Third day of live teachings — Gurudev answers questions from foreign disciples.',
    date: '2022', dateEN: '2022', tag: 'GURUDEV', tagEN: 'GURUDEV',
    titleHI: 'विदेशी शिष्यों के साथ आध्यात्मिक वार्तालाप — दिन 3',
    descHI:  'जीवंत शिक्षाओं का तीसरा दिन — गुरुदेव विदेशी शिष्यों के प्रश्नों का उत्तर देते हैं।',
    tagHI:   'गुरुदेव',
    titleFR: 'Conversation spirituelle avec les disciples étrangers — Jour 3',
    descFR:  'Troisième journée d’enseignements en direct — Gurudev répond aux questions de ses disciples étrangers.',
    tagFR:   'GURUDEV',
    titleES: 'Conversación espiritual con discípulos extranjeros — Día 3',
    descES:  'Tercer día de enseñanzas en directo — Gurudev responde a las preguntas de discípulos extranjeros.',
    tagES:   'GURUDEV',
    titleDE: 'Spirituelles Gespräch mit ausländischen Schülern — Tag 3',
    descDE:  'Dritter Tag der Live-Lehren — Gurudev beantwortet Fragen ausländischer Schüler.',
    tagDE:   'GURUDEV',
  },
  {
    id: 'Yd1BhR9PnU8',
    category: 'gurudev' as const,
    titleCS: 'Duchovní rozmluva se zahraničními žáky — závěrečné setkání',
    titleEN: 'Spiritual conversation with foreign disciples — final gathering',
    descCS:  'Závěrečné setkání a rozmluva Gurudeva se zahraničními žáky — završení duchovní cesty.',
    descEN:  'Final gathering and conversation with Gurudev — completion of the spiritual journey.',
    date: '2022', dateEN: '2022', tag: 'GURUDEV', tagEN: 'GURUDEV',
    titleHI: 'विदेशी शिष्यों के साथ आध्यात्मिक वार्तालाप — अंतिम सभा',
    descHI:  'गुरुदेव के साथ अंतिम सभा और वार्तालाप — आध्यात्मिक यात्रा का समापन।',
    tagHI:   'गुरुदेव',
    titleFR: 'Conversation spirituelle avec les disciples étrangers — rencontre finale',
    descFR:  'Rencontre finale et conversation avec Gurudev — achèvement du cheminement spirituel.',
    tagFR:   'GURUDEV',
    titleES: 'Conversación espiritual con discípulos extranjeros — encuentro final',
    descES:  'Encuentro final y conversación con Gurudev — culminación del camino espiritual.',
    tagES:   'GURUDEV',
    titleDE: 'Spirituelles Gespräch mit ausländischen Schülern — abschließendes Treffen',
    descDE:  'Abschließendes Treffen und Gespräch mit Gurudev — Abschluss des spirituellen Weges.',
    tagDE:   'GURUDEV',
  },
  // ── Aarti s Gurudevem ──────────────────────────────────────────────────────
  {
    id: 'gluWxOF7_hE',
    category: 'aarti' as const,
    titleCS: 'Purnima — zvláštní havan a gurudíkša',
    titleEN: 'Purnima — special havan and Gurudeeksha',
    descCS:  'Výjimečný obřad při úplňku Purnima — havan a udělení Gurudíkši v ášrámu Karauli Sarkar.',
    descEN:  'Special full moon Purnima ceremony — havan and Gurudeeksha initiation at Karauli Sarkar ashram.',
    date: '2021', dateEN: '2021', tag: 'AARTI', tagEN: 'AARTI',
    titleHI: 'पूर्णिमा — विशेष हवन और गुरुदीक्षा',
    descHI:  'पूर्णिमा पर विशेष समारोह — काराउली सरकार आश्रम में हवन और गुरुदीक्षा दीक्षा।',
    tagHI:   'आरती',
    titleFR: 'Purnima — havan spécial et Gurudeeksha',
    descFR:  'Cérémonie spéciale de Purnima à la pleine lune — havan et initiation Gurudeeksha à l’ashram de Karauli Sarkar.',
    tagFR:   'AARTI',
    titleES: 'Purnima — havan especial y Gurudeeksha',
    descES:  'Ceremonia especial de Purnima con luna llena — havan e iniciación Gurudeeksha en el ashram de Karauli Sarkar.',
    tagES:   'AARTI',
    titleDE: 'Purnima — besonderer Havan und Gurudeeksha',
    descDE:  'Besondere Purnima-Zeremonie bei Vollmond — Havan und Gurudeeksha-Einweihung im Karauli Sarkar ashram.',
    tagDE:   'AARTI',
  },
  {
    id: 'NIP_DO0cKe8',
    category: 'aarti' as const,
    titleCS: 'Aarti Guru Maty — Karauli Sarkar',
    titleEN: 'Aarti of Guru Mata — Karauli Sarkar',
    descCS:  'Zpívaná aarti Guru Maty v podání Vishala Chaurasii — oddanostní píseň z ášrámu Karauli Sarkar.',
    descEN:  'Sung aarti of Guru Mata by Vishal Chaurasia — devotional song from Karauli Sarkar ashram.',
    date: '2022', dateEN: '2022', tag: 'AARTI', tagEN: 'AARTI',
    titleHI: 'गुरु माता की आरती — काराउली सरकार',
    descHI:  'विशाल चौरासिया द्वारा गाई गुरु माता की आरती — काराउली सरकार आश्रम से भक्तिपूर्ण गीत।',
    tagHI:   'आरती',
    titleFR: 'Aarti de Guru Mata — Karauli Sarkar',
    descFR:  'Aarti chantée de Guru Mata par Vishal Chaurasia — chant dévotionnel de l’ashram de Karauli Sarkar.',
    tagFR:   'AARTI',
    titleES: 'Aarti de Guru Mata — Karauli Sarkar',
    descES:  'Aarti cantada de Guru Mata por Vishal Chaurasia — canto devocional del ashram de Karauli Sarkar.',
    tagES:   'AARTI',
    titleDE: 'Aarti von Guru Mata — Karauli Sarkar',
    descDE:  'Gesungene Aarti von Guru Mata, vorgetragen von Vishal Chaurasia — hingebungsvoller Gesang aus dem Karauli Sarkar ashram.',
    tagDE:   'AARTI',
  },
  {
    id: 'Fi2c7m264Vc',
    category: 'aarti' as const,
    titleCS: 'Krásná aarti Babaji — Karauli Sarkar',
    titleEN: 'Beautiful Aarti of Babaji — Karauli Sarkar',
    descCS:  'Slavnostní aarti Babaji z ášrámu Karauli Sarkar v podání Vishala Chaurasii.',
    descEN:  'Ceremonial aarti of Babaji from Karauli Sarkar ashram, performed by Vishal Chaurasia.',
    date: '2022', dateEN: '2022', tag: 'AARTI', tagEN: 'AARTI',
    titleHI: 'बाबाजी की सुंदर आरती — काराउली सरकार',
    descHI:  'काराउली सरकार आश्रम से बाबाजी की पारंपरिक आरती, विशाल चौरासिया द्वारा प्रस्तुत।',
    tagHI:   'आरती',
    titleFR: 'La belle Aarti de Babaji — Karauli Sarkar',
    descFR:  'Aarti cérémonielle de Babaji à l’ashram de Karauli Sarkar, interprétée par Vishal Chaurasia.',
    tagFR:   'AARTI',
    titleES: 'Hermosa Aarti de Babaji — Karauli Sarkar',
    descES:  'Aarti ceremonial de Babaji en el ashram de Karauli Sarkar, interpretada por Vishal Chaurasia.',
    tagES:   'AARTI',
    titleDE: 'Wunderschöne Aarti von Babaji — Karauli Sarkar',
    descDE:  'Zeremonielle Aarti von Babaji aus dem Karauli Sarkar ashram, dargeboten von Vishal Chaurasia.',
    tagDE:   'AARTI',
  },

  // Původní jednojazyčné nahrání Dhyan Sadhany (český dabing, žádné jazykové
  // přepínání) — nahrazeno na homepage novými verzemi výše, ale zůstává
  // dohledatelné v plné mřížce na /media. Záměrně na konci pole, ne hned za
  // featured záznamem — MediaSection.tsx bere VIDEOS.slice(1,3) jako dva
  // "preview" kartičky vedle featured, a tenhle záznam by je odsunul.
  {
    id: 'hlnSuJFnywA',
    titleCS: 'Dhyan Sadhana — s českým dabingem',
    titleEN: 'Dhyan Sadhana — with Czech dubbing',
    descCS:  'Vedená sadhana s přímým přenosem učení Gurudeva — s českým dabingem pro naši komunitu.',
    descEN:  'Guided sadhana with direct transmission from Gurudev — with Czech dubbing for our community.',
    date:    '2025',
    dateEN:  '2025',
    category: 'sadhana' as const,
    categories: ['sadhana', 'meditation'] as VideoCategory[],
    tag:     'SADHANA',
    tagEN:   'SADHANA',
    titleHI: 'ध्यान साधना — चेक डबिंग के साथ',
    descHI:  'गुरुदेव के प्रत्यक्ष प्रसारण के साथ निर्देशित साधना — हमारी समुदाय के लिए चेक डबिंग के साथ।',
    tagHI:   'साधना',
    titleFR: 'Dhyan Sadhana — avec doublage en tchèque',
    descFR:  'Sadhana guidée avec transmission directe de Gurudev — avec doublage en tchèque pour notre communauté.',
    tagFR:   'SADHANA',
    titleES: 'Dhyan Sadhana — con doblaje en checo',
    descES:  'Sadhana guiada con transmisión directa de Gurudev — con doblaje en checo para nuestra comunidad.',
    tagES:   'SADHANA',
    titleDE: 'Dhyan Sadhana — mit tschechischer Synchronisation',
    descDE:  'Geführte Sadhana mit direkter Übertragung von Gurudev — mit tschechischer Synchronisation für unsere Gemeinschaft.',
    tagDE:   'SADHANA',
  },

]
export default function MediaSection() {
  const ref = useRef<HTMLElement>(null)
  useScrollRevealAll(ref)
  const [playing, setPlaying] = useState(false)
  const { lang } = useLang()
  const cs = lang === 'cs'
  const hi = lang === 'hi'
  const fr = lang === 'fr'
  const es = lang === 'es'
  const de = lang === 'de'

  // Featured video existuje jako tři samostatná nahrání (cs/en/hi) — jen
  // .id se mění podle jazyka, titulek/popis/datum zůstávají ze VIDEOS[0].
  const featured = { ...VIDEOS[0], id: FEATURED_VIDEO_IDS[lang] ?? FEATURED_VIDEO_IDS.en! }
  const preview  = VIDEOS.slice(1, 3)

  const vTitle = (v: typeof VIDEOS[0]) => hi ? v.titleHI : cs ? v.titleCS : fr ? v.titleFR : es ? v.titleES : de ? v.titleDE : v.titleEN
  const vDesc  = (v: typeof VIDEOS[0]) => hi ? v.descHI : cs ? v.descCS : fr ? v.descFR : es ? v.descES : de ? v.descDE : v.descEN
  const vTag   = (v: typeof VIDEOS[0]) => hi ? v.tagHI : cs ? v.tag : fr ? v.tagFR : es ? v.tagES : de ? v.tagDE : v.tagEN
  const vDate  = (v: typeof VIDEOS[0]) => hi || cs ? v.date : v.dateEN

  return (
    <section className={styles.media} id="media" ref={ref}>
      {/* Header */}
      <div className={`${styles.mediaHeader} r`}>
        <div className={styles.sectionLabel}>{hi ? 'मीडिया' : cs ? 'Média' : fr ? 'Médias' : es ? 'Medios' : de ? 'Medien' : 'Media'}</div>
        <h2 className={styles.sectionTitle}>
          {hi ? 'कहानियाँ, ज्ञान और' : cs ? 'Příběhy, moudrost a' : fr ? 'Histoires, sagesse et' : es ? 'Historias, sabiduría y' : de ? 'Geschichten, Weisheit und' : 'Stories, wisdom &'}<br />
          <span className={styles.acc}>{hi ? 'भारत के क्षण' : cs ? 'okamžiky z Indie' : fr ? 'instants venus d’Inde' : es ? 'momentos de la India' : de ? 'Momente aus Indien' : 'moments from India'}</span>
        </h2>
        <p className={styles.headerDesc}>
          {hi
            ? 'वीडियो जो भारत और इसकी परंपराओं के साथ हमारे अनुभव को आपके करीब लाते हैं।'
            : cs
            ? 'Videa, která přibližují naši zkušenost s Indií a jejími tradicemi.'
            : fr
            ? 'Des vidéos qui vous rapprochent de notre expérience de l’Inde et de ses traditions.'
            : es
            ? 'Vídeos que acercan nuestra experiencia de la India y sus tradiciones.'
            : de
            ? 'Videos, die unsere Erfahrung mit Indien und seinen Traditionen näherbringen.'
            : 'Videos that bring you closer to our experience of India and its traditions.'}
        </p>
      </div>

      {/* Featured video */}
      <div className={`${styles.featuredWrap} r`} style={{ transitionDelay: '0.1s' }}>
        <div className={styles.featuredPlayer}>
          {!playing ? (
            <div className={styles.thumbnail} onClick={() => setPlaying(true)}>
              <img
                src={`https://img.youtube.com/vi/${featured.id}/hqdefault.jpg`}
                alt={vTitle(featured)}
                className={styles.thumbImg}
                loading="lazy"
                decoding="async"
              />
              <div className={styles.thumbOverlay} />
              <button className={styles.playBtn} aria-label={hi ? 'वीडियो चलाएं' : cs ? 'Přehrát video' : fr ? 'Lire la vidéo' : es ? 'Reproducir vídeo' : de ? 'Video abspielen' : 'Play video'}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <div className={styles.featuredTag}>{vTag(featured)}</div>
            </div>
          ) : (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${featured.id}?autoplay=1&rel=0`}
              title={vTitle(featured)}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.iframe}
            />
          )}
        </div>

        <div className={styles.featuredMeta}>
          <span className={styles.featuredDate}>{vDate(featured)}</span>
          <h3 className={styles.featuredTitle}>{vTitle(featured)}</h3>
          <p className={styles.featuredDesc}>{vDesc(featured)}</p>
          <a
            href={watchUrl(featured)}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.watchLink}
          >
            {hi ? 'YouTube पर देखें' : cs ? 'Sledovat na YouTube' : fr ? 'Regarder sur YouTube' : es ? 'Ver en YouTube' : de ? 'Auf YouTube ansehen' : 'Watch on YouTube'}
          </a>
        </div>
      </div>

      {/* Preview cards */}
      <div className={styles.previewGrid}>
        {preview.map((v, i) => (
          <VideoCard key={v.id} video={v} delay={`${(i + 1) * 0.1}s`} cs={cs} hi={hi} fr={fr} es={es} de={de} />
        ))}
      </div>

      {/* CTA to /media */}
      <div className={`${styles.mediaCta} r`} style={{ transitionDelay: '0.3s' }}>
        <Link href="/media" className={styles.ctaBtn}>
          {hi ? 'सभी वीडियो' : cs ? 'Všechna videa' : fr ? 'Toutes les vidéos' : es ? 'Todos los vídeos' : de ? 'Alle Videos' : 'All videos'}
        </Link>
        <a
          href="https://www.youtube.com/@Zero-BalanceSociety"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaSecondary}
        >
          YouTube @Zero-BalanceSociety
        </a>
      </div>
    </section>
  )
}

// ─── Reusable card ─────────────────────────────────────────────────────────
function VideoCard({ video, delay, cs, hi, fr, es, de }: { video: typeof VIDEOS[0]; delay: string; cs: boolean; hi: boolean; fr: boolean; es: boolean; de: boolean }) {
  const [playing, setPlaying] = useState(false)
  const videoUrl = watchUrl(video)
  const title = hi ? video.titleHI : cs ? video.titleCS : fr ? video.titleFR : es ? video.titleES : de ? video.titleDE : video.titleEN
  const tag   = hi ? video.tagHI : cs ? video.tag : fr ? video.tagFR : es ? video.tagES : de ? video.tagDE : video.tagEN
  const date  = hi || cs ? video.date : video.dateEN

  return (
    <a
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.videoCard} r`}
      style={{ transitionDelay: delay, textDecoration: 'none', display: 'block' }}
    >
      <div className={styles.cardPlayer}>
        {!playing ? (
          <div className={styles.cardThumb} onClick={(e) => { e.preventDefault(); setPlaying(true) }}>
            <img
              src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
              alt={title}
              className={styles.thumbImg}
              loading="lazy"
              decoding="async"
            />
            <div className={styles.thumbOverlay} />
            <button className={styles.cardPlayBtn} aria-label={hi ? 'चलाएं' : cs ? 'Přehrát' : fr ? 'Lire' : es ? 'Reproducir' : de ? 'Abspielen' : 'Play'}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <span className={styles.cardTag}>{tag}</span>
          </div>
        ) : (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.iframe}
          />
        )}
      </div>
      <div className={styles.cardMeta}>
        <span className={styles.cardDate}>{date}</span>
        <div className={styles.cardTitle}>{title}</div>
      </div>
    </a>
  )
}