import type { PostLang } from '../posts'

export interface PhotographerInfo {
  photo?: string
  /** object-position fotky v kruhovém výřezu, pokud výchozí střed nesedí */
  photoPos?: string
  /** Partial — chybějící jazyk u konkrétního fotografa spadne na en (viz India2026Gallery.tsx). */
  bio?: Partial<Record<PostLang, string>>
}

/**
 * Ručně psané medailonky fotografů — na rozdíl od `india2026.ts` se
 * NEgeneruje skriptem, klidně uprav. Klíč musí přesně odpovídat
 * `photographer` v `india2026.ts` (viz `INDIA_2026`).
 *
 * Fotograf bez záznamu tady (nebo bez `photo`/`bio`) dostane ve
 * `India2026Gallery.tsx` jednoduchý fallback — jen kicker + jméno,
 * beze změny oproti dřívějšku. Nic se tedy nerozbije, dokud medailonek
 * nedoplníme — třeba pro Jana zatím chybí.
 */
export const PHOTOGRAPHERS: Record<string, PhotographerInfo> = {
  Andrea: {
    photo: '/images/india-2026/andrea/andrea.jpg',
    bio: {
      cs: 'Nejkrásnější fotografie vznikají ve chvíli, kdy člověk přestane vnímat objektiv. Právě to Andrea svým laskavým a otevřeným přístupem dokáže. Její fotografie zachycují nejen tváře, ale i emoce, vztahy a jedinečnou atmosféru každého okamžiku.',
      en: 'The most beautiful photographs are born the moment a person stops noticing the camera. That is exactly what Andrea, with her kind and open manner, achieves. Her photographs capture not only faces, but the emotions, relationships and unique atmosphere of every moment.',
      hi: 'सबसे सुंदर तस्वीरें उस क्षण जन्म लेती हैं जब व्यक्ति कैमरे को भूल जाता है। आंद्रेया अपने सहज और खुले स्वभाव से ठीक यही कर पाती हैं। उनकी तस्वीरें केवल चेहरों को ही नहीं, बल्कि हर क्षण की भावनाओं, रिश्तों और अनूठे वातावरण को भी क़ैद करती हैं।',
      fr: 'Les plus belles photographies naissent au moment où une personne cesse de remarquer l’appareil photo. C’est exactement ce qu’Andrea, avec sa manière douce et ouverte, parvient à créer. Ses photographies ne capturent pas seulement des visages, mais aussi les émotions, les relations et l’atmosphère unique de chaque instant.',
      es: 'Las fotografías más bellas nacen en el momento en que una persona deja de notar la cámara. Eso es precisamente lo que Andrea consigue con su manera amable y abierta de estar. Sus fotografías no captan solo rostros, sino también las emociones, las relaciones y la atmósfera única de cada momento.',
      de: 'Die schönsten Fotografien entstehen in dem Moment, in dem ein Mensch die Kamera nicht mehr wahrnimmt. Genau das gelingt Andrea mit ihrer herzlichen und offenen Art. Ihre Fotografien halten nicht nur Gesichter fest, sondern auch die Emotionen, Beziehungen und die einzigartige Atmosphäre jedes Augenblicks.',
    },
  },
  Jan: {
    photo: '/images/india-2026/jan/jan.jpg',
    photoPos: 'center 22%',
    // bio zatím chybí — doplní se, jakmile ji Jan pošle; komponenta ukáže
    // mezitím jen fotku pod jménem, beze mezery navíc, viz India2026Gallery.tsx
  },
}
