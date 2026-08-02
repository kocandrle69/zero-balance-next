'use client'

import { useRef, useState } from 'react'
import styles from './MediaSection.module.css'
import { useScrollRevealAll } from '../hooks/useScrollReveal'
import { useLang } from '../contexts/LangContext'

// ─── Kategorie ────────────────────────────────────────────────────────────────
export type VideoCategory =
  | 'sadhana' | 'wisdom' | 'ashram' | 'place'
  | 'deeksha' | 'gurudev' | 'aarti' | 'journeys' | 'meditation' | 'rituals'

export const CATEGORIES: { id: VideoCategory; labelCS: string; labelEN: string; labelHI: string }[] = [
  { id: 'sadhana',    labelCS: 'Sadhana',           labelEN: 'Sadhana',              labelHI: 'साधना' },
  { id: 'wisdom',     labelCS: 'Moudrost Indie',     labelEN: 'Wisdom of India',      labelHI: 'भारत की बुद्धि' },
  { id: 'ashram',     labelCS: 'Život v ášrámu',     labelEN: 'Ashram life',          labelHI: 'आश्रम जीवन' },
  { id: 'place',      labelCS: 'Okolí ášrámu',       labelEN: 'Around the ashram',    labelHI: 'आश्रम के आसपास' },
  { id: 'deeksha',    labelCS: 'Deeksha',            labelEN: 'Deeksha',              labelHI: 'दीक्षा' },
  { id: 'gurudev',    labelCS: 'Gurudev',            labelEN: 'Gurudev',              labelHI: 'गुरुदेव' },
  { id: 'aarti',      labelCS: 'Aarti',              labelEN: 'Aarti',                labelHI: 'आरती' },
  { id: 'journeys',   labelCS: 'Cesty do Indie',     labelEN: 'Journeys to India',    labelHI: 'भारत यात्राएं' },
  { id: 'meditation', labelCS: 'Meditace',           labelEN: 'Meditation',           labelHI: 'ध्यान' },
  { id: 'rituals',    labelCS: 'Rituály & havany',   labelEN: 'Rituals & havans',     labelHI: 'अनुष्ठान व हवन' },
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
  // 1. FEATURED — Sadhana s českým překladem
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
  },
  {
    id: 'kg6-YHE50uQ',
    titleCS: 'Kdo skutečně jste a kam odejdete poté, co opustíte své tělo?',
    titleEN: 'Who are you really, and where do you go after you leave your body?',
    descCS:  'V této duchovní promluvě Sensei Rajeev otevírá jednu z nejhlubších otázek lidského života: Je tělo naším skutečným domovem, nebo pouze dočasným místem na cestě vědomí? Video vybízí k obrácení pozornosti dovnitř a k hledání odpovědi prostřednictvím sebepoznání, meditace a přímé zkušenosti. Jazyk titulků lze změnit v nastavení videa — Titulky → zvolte svůj jazyk.',
    descEN:  'In this spiritual discourse Sensei Rajeev opens one of the deepest questions of human life: is the body our true home, or only a temporary place on the journey of consciousness? The video invites you to turn your attention inward and to seek the answer through self-knowledge, meditation and direct experience. The subtitle language can be changed in the video settings — Subtitles → choose your language.',
    date:    '2026',
    dateEN:  '2026',
    category: 'wisdom' as const,
    list:    WISDOM_PLAYLIST,
    tag:     'MOUDROST',
    tagEN:   'WISDOM',
    titleHI: 'आप वास्तव में कौन हैं और शरीर छोड़ने के बाद कहाँ जाते हैं?',
    descHI:  'इस आध्यात्मिक प्रवचन में सेंसेई राजीव मानव जीवन के गहनतम प्रश्नों में से एक को उठाते हैं: क्या शरीर हमारा वास्तविक घर है, या चेतना की यात्रा में केवल एक अस्थायी पड़ाव? यह वीडियो भीतर की ओर ध्यान मोड़ने और आत्मज्ञान, ध्यान तथा प्रत्यक्ष अनुभव के माध्यम से उत्तर खोजने का निमंत्रण देता है। उपशीर्षक की भाषा वीडियो सेटिंग्स में बदली जा सकती है — Subtitles → अपनी भाषा चुनें।',
    tagHI:   'बुद्धि',
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
  },

]
export default function MediaSection() {
  const ref = useRef<HTMLElement>(null)
  useScrollRevealAll(ref)
  const [playing, setPlaying] = useState(false)
  const { lang } = useLang()
  const cs = lang === 'cs'
  const hi = lang === 'hi'

  const featured = VIDEOS[0]
  const preview  = VIDEOS.slice(1, 3)

  return (
    <section className={styles.media} id="media" ref={ref}>
      {/* Header */}
      <div className={`${styles.mediaHeader} r`}>
        <div className={styles.sectionLabel}>{hi ? 'मीडिया' : cs ? 'Média' : 'Media'}</div>
        <h2 className={styles.sectionTitle}>
          {hi ? 'हमारी' : cs ? 'Z naší' : 'From our'}<br />
          <span className={styles.acc}>{hi ? 'भारत यात्रा से' : cs ? 'cesty do Indie' : 'journey to India'}</span>
        </h2>
        <p className={styles.headerDesc}>
          {hi
            ? 'आश्रम, समारोहों और तीर्थयात्राओं की रिकॉर्डिंग — हमारे अभ्यास के हृदय के प्रामाणिक क्षण।'
            : cs
            ? 'Záznamy z ášrámu, obřadů a poutí — autentické okamžiky ze srdce naší praxe.'
            : 'Recordings from the ashram, ceremonies and pilgrimages — authentic moments from the heart of our practice.'}
        </p>
      </div>

      {/* Featured video */}
      <div className={`${styles.featuredWrap} r`} style={{ transitionDelay: '0.1s' }}>
        <div className={styles.featuredPlayer}>
          {!playing ? (
            <div className={styles.thumbnail} onClick={() => setPlaying(true)}>
              <img
                src={`https://img.youtube.com/vi/${featured.id}/hqdefault.jpg`}
                alt={hi ? featured.titleHI : cs ? featured.titleCS : featured.titleEN}
                className={styles.thumbImg}
              />
              <div className={styles.thumbOverlay} />
              <button className={styles.playBtn} aria-label={hi ? 'वीडियो चलाएं' : cs ? 'Přehrát video' : 'Play video'}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <div className={styles.featuredTag}>{hi ? featured.tagHI : cs ? featured.tag : featured.tagEN}</div>
            </div>
          ) : (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${featured.id}?autoplay=1&rel=0`}
              title={hi ? featured.titleHI : cs ? featured.titleCS : featured.titleEN}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.iframe}
            />
          )}
        </div>

        <div className={styles.featuredMeta}>
          <span className={styles.featuredDate}>{hi ? featured.date : cs ? featured.date : featured.dateEN}</span>
          <h3 className={styles.featuredTitle}>{hi ? featured.titleHI : cs ? featured.titleCS : featured.titleEN}</h3>
          <p className={styles.featuredDesc}>{hi ? featured.descHI : cs ? featured.descCS : featured.descEN}</p>
          <a
            href={watchUrl(featured)}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.watchLink}
          >
            {hi ? 'YouTube पर देखें' : cs ? 'Sledovat na YouTube' : 'Watch on YouTube'}
          </a>
        </div>
      </div>

      {/* Preview cards */}
      <div className={styles.previewGrid}>
        {preview.map((v, i) => (
          <VideoCard key={v.id} video={v} delay={`${(i + 1) * 0.1}s`} cs={cs} hi={hi} />
        ))}
      </div>

      {/* CTA to /media */}
      <div className={`${styles.mediaCta} r`} style={{ transitionDelay: '0.3s' }}>
        <a href="/media" className={styles.ctaBtn}>
          {hi ? 'सभी वीडियो' : cs ? 'Všechna videa' : 'All videos'}
        </a>
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
function VideoCard({ video, delay, cs, hi }: { video: typeof VIDEOS[0]; delay: string; cs: boolean; hi: boolean }) {
  const [playing, setPlaying] = useState(false)
  const videoUrl = watchUrl(video)

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
              alt={hi ? video.titleHI : cs ? video.titleCS : video.titleEN}
              className={styles.thumbImg}
            />
            <div className={styles.thumbOverlay} />
            <button className={styles.cardPlayBtn} aria-label={hi ? 'चलाएं' : cs ? 'Přehrát' : 'Play'}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <span className={styles.cardTag}>{hi ? video.tagHI : cs ? video.tag : video.tagEN}</span>
          </div>
        ) : (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={hi ? video.titleHI : cs ? video.titleCS : video.titleEN}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.iframe}
          />
        )}
      </div>
      <div className={styles.cardMeta}>
        <span className={styles.cardDate}>{hi ? video.date : cs ? video.date : video.dateEN}</span>
        <div className={styles.cardTitle}>{hi ? video.titleHI : cs ? video.titleCS : video.titleEN}</div>
      </div>
    </a>
  )
}