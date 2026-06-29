/**
 * CENTRAL IMAGE CONFIG — src/lib/images.ts
 * Všechny obrázky jsou z public/images/ — žádné kopírování není potřeba.
 */
const IMG = {
  // Hero — velká ceremonie, dramatický záběr
  heroBg:    '/images/anand-darbar-e-2.jpg',

  // About — Gurudev portrét + dav v hale
  aboutMain: '/images/Gurudev.jpeg',
  aboutAux:  '/images/A002C0066_250323_004Z.00_03_44_29.Still013-scaled.jpg',


    // Activities
  act1:      '/images/main-sadhna.jpg',                  // Meditation — Gurudev sedí
  act2:      '/images/anand-darbar-e-2.jpg',      // Cultural Events — ceremonie
  act3:      '/images/Gate-1024x576.png',         // India Journeys — brána chrámu
  act4:      '/images/Sensei_3.jpg',           // Study & Discussion — dav v meditaci
  act5:      '/images/WEB1.jpg',                  // Gatherings — shromáždění

  // India
  indiaBg:   '/images/Gate-1024x576.png',         // full-screen bg — brána
  indiaGal1: '/images/A002C0066_250323_004Z.00_03_44_29.Still013-scaled.jpg',
  indiaGal2: '/images/YOG-DAND-2.jpg',

  // Join — Gurudev se zdviženýma rukama
  joinBg:    '/images/YOG-DAND-2.jpg',

  // Purpose pillars — 5 karet
  purposePreserve: '/images/purpose-preserve.jpg',
  purposeLineage:  '/images/purpose-lineage.jpg',
  purposeCreate:   '/images/purpose-create.jpg',
  purposeServe:    '/images/purpose-serve.jpg',
  purposeAbout:    '/images/purpose-about.jpg',
} as const

export default IMG
