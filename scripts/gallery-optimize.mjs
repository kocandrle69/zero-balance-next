#!/usr/bin/env node
/**
 * GALLERY OPTIMIZER — Zero Balance Society, fotoreportáž Indie 2026
 * ---------------------------------------------------------------------------
 * Vezme originály roztříděné do složek podle fotografa, u každé fotky vytvoří
 *   • náhled (thumb) — delší strana 800 px, WebP, do mřížky
 *   • plnou verzi (full) — delší strana 2000 px, WebP, do lightboxu
 * a vygeneruje hotový datový soubor `india2026.ts` se sekcemi podle složek.
 *
 * ŽÁDNÉ PŘEJMENOVÁVÁNÍ. Fotograf = název podsložky. Pořadí v sekci = abecední
 * podle názvu souboru (chceš-li konkrétní řazení, pojmenuj originály 01_, 02_…).
 *
 * ── POUŽITÍ ───────────────────────────────────────────────────────────────
 *   Struktura originálů (ty už ji máš přesně takhle):
 *     public/images/_originaly-indie/andrea/*.jpg
 *     public/images/_originaly-indie/jan/*.jpg
 *
 *   1) jednorázově:  npm i -D sharp
 *   2) z kořene repa:
 *        node scripts/gallery-optimize.mjs public/images/_originaly-indie
 *
 *   (cesta je argument — když ji vynecháš, zkusí se výchozí
 *    public/images/_originaly-indie)
 *
 *   Výstup:
 *     public/images/india-2026/andrea/{thumb,full}/*.webp
 *     public/images/india-2026/jan/{thumb,full}/*.webp
 *     src/app/journal/gallery/india2026.ts   ← hotová data, nic needituješ ručně
 *
 * ── DALŠÍ FOTOGRAF ────────────────────────────────────────────────────────
 *   Přidej podsložku (např. franta/) + řádek do PHOTOGRAPHERS a spusť znovu.
 * ---------------------------------------------------------------------------
 */

import sharp from 'sharp'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// ── Nastavení ────────────────────────────────────────────────────────────────
const THUMB_LONG_EDGE = 800
const FULL_LONG_EDGE  = 2000
const THUMB_QUALITY   = 72
const FULL_QUALITY    = 82
const VALID_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff'])
const DEFAULT_INPUT = 'public/images/_originaly-indie'

/**
 * Pořadí a hezké jméno sekcí. Klíč = název podsložky (malými písmeny).
 * Fotograf, který tu není, se přidá na konec, jméno = název složky s velkým
 * prvním písmenem. Přidání fotografa = jeden řádek sem.
 */
const PHOTOGRAPHERS = {
  andrea: { order: 1, name: 'Andrea' },
  jan:    { order: 2, name: 'Jan' },
}

// ── Cesty ────────────────────────────────────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..')
const PUBLIC_DIR = path.join(REPO_ROOT, 'public', 'images', 'india-2026')
const DATA_FILE = path.join(REPO_ROOT, 'src', 'app', 'journal', 'gallery', 'india2026.ts')
const WEB_BASE = '/images/india-2026'

// ── Pomocné ──────────────────────────────────────────────────────────────────
const pad = (n) => String(n).padStart(3, '0')

async function listImages(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  return entries
    .filter((e) => e.isFile() && VALID_EXT.has(path.extname(e.name).toLowerCase()))
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b, 'cs'))
}

async function listPhotographerDirs(root) {
  const entries = await fs.readdir(root, { withFileTypes: true })
  const dirs = entries.filter((e) => e.isDirectory()).map((e) => e.name)
  return dirs.sort((a, b) => {
    const oa = PHOTOGRAPHERS[a.toLowerCase()]?.order ?? 999
    const ob = PHOTOGRAPHERS[b.toLowerCase()]?.order ?? 999
    return oa - ob || a.localeCompare(b, 'cs')
  })
}

function prettyName(dir) {
  const key = dir.toLowerCase()
  return PHOTOGRAPHERS[key]?.name ?? dir.charAt(0).toUpperCase() + dir.slice(1)
}

// ── Zpracování jedné fotky ───────────────────────────────────────────────────
async function processOne(srcPath, outThumbDir, outFullDir, index) {
  const base = pad(index) // 001, 002 … krátké, bez diakritiky
  const pipeline = sharp(srcPath).rotate() // autorotace dle EXIF

  const thumbInfo = await pipeline
    .clone()
    .resize({ width: THUMB_LONG_EDGE, height: THUMB_LONG_EDGE, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: THUMB_QUALITY })
    .toFile(path.join(outThumbDir, `${base}.webp`))

  await pipeline
    .clone()
    .resize({ width: FULL_LONG_EDGE, height: FULL_LONG_EDGE, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: FULL_QUALITY })
    .toFile(path.join(outFullDir, `${base}.webp`))

  return { base, w: thumbInfo.width, h: thumbInfo.height }
}

// ── Generování india2026.ts ──────────────────────────────────────────────────
function renderDataFile(sections) {
  const head = `/**
 * GALERIE — Fotoreportáž Indie 2026
 * AUTOMATICKY VYGENEROVÁNO skriptem scripts/gallery-optimize.mjs — NEUPRAVUJ RUČNĚ.
 * Chceš-li změnit fotky, uprav originály a skript spusť znovu.
 */

export interface GalleryPhoto {
  /** náhled do mřížky */
  thumb: string
  /** plná verze do lightboxu */
  full: string
  /** rozměry náhledu — proti layout shiftu */
  w: number
  h: number
}

export interface GallerySection {
  /** jméno fotografa — nadpis sekce */
  photographer: string
  photos: GalleryPhoto[]
}

export const INDIA_2026: GallerySection[] = [
`
  const body = sections
    .map((s) => {
      const photos = s.photos
        .map((p) => `      { thumb: '${p.thumb}', full: '${p.full}', w: ${p.w}, h: ${p.h} },`)
        .join('\n')
      return `  {
    photographer: ${JSON.stringify(s.photographer)},
    photos: [
${photos}
    ],
  },`
    })
    .join('\n')

  return `${head}${body}\n]\n`
}

// ── Hlavní běh ───────────────────────────────────────────────────────────────
async function main() {
  const arg = process.argv[2] ?? DEFAULT_INPUT
  const root = path.isAbsolute(arg) ? arg : path.resolve(REPO_ROOT, arg)

  try {
    await fs.access(root)
  } catch {
    console.error(`\n❌  Složka neexistuje: ${root}`)
    console.error(`    Čekám strukturu: <složka>/andrea/*.jpg  a  <složka>/jan/*.jpg`)
    console.error(`    Např.:  node scripts/gallery-optimize.mjs public/images/_originaly-indie\n`)
    process.exit(1)
  }

  const dirs = await listPhotographerDirs(root)
  if (dirs.length === 0) {
    console.error(`\n❌  V ${root} nejsou žádné podsložky fotografů (čekám např. andrea/, jan/).\n`)
    process.exit(1)
  }

  console.log(`\n📷  Vstup: ${root}`)
  console.log(`    Sekce: ${dirs.map(prettyName).join(', ')}\n`)

  const sections = []
  let grandTotal = 0

  for (const dir of dirs) {
    const srcDir = path.join(root, dir)
    const files = await listImages(srcDir)
    if (files.length === 0) {
      console.log(`   ⏭  ${prettyName(dir)}: žádné obrázky, přeskakuji`)
      continue
    }

    const outThumbDir = path.join(PUBLIC_DIR, dir, 'thumb')
    const outFullDir = path.join(PUBLIC_DIR, dir, 'full')
    await fs.mkdir(outThumbDir, { recursive: true })
    await fs.mkdir(outFullDir, { recursive: true })

    const photos = []
    for (let i = 0; i < files.length; i++) {
      process.stdout.write(`   ${prettyName(dir)}: ${i + 1}/${files.length}\r`)
      const r = await processOne(path.join(srcDir, files[i]), outThumbDir, outFullDir, i + 1)
      photos.push({
        thumb: `${WEB_BASE}/${dir}/thumb/${r.base}.webp`,
        full: `${WEB_BASE}/${dir}/full/${r.base}.webp`,
        w: r.w,
        h: r.h,
      })
    }
    console.log(`   ✅  ${prettyName(dir)}: ${photos.length} fotek                `)
    grandTotal += photos.length
    sections.push({ photographer: prettyName(dir), photos })
  }

  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
  await fs.writeFile(DATA_FILE, renderDataFile(sections), 'utf8')

  console.log(`\n✨  Hotovo — ${grandTotal} fotek ve ${sections.length} sekcích.`)
  console.log(`    Obrázky:  public/images/india-2026/`)
  console.log(`    Data:     src/app/journal/gallery/india2026.ts\n`)
}

main().catch((err) => {
  console.error('\n❌  Chyba:', err)
  process.exit(1)
})
