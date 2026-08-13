import fs from 'node:fs/promises'
import path from 'node:path'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import JournalPost from './JournalPost'
import { POSTS, getPost, toPostLang, type PostLang } from '../posts'
import { parseMarkdown, type Block } from '../markdown'
import { routing, type AppLocale } from '../../../../i18n/routing'
import { hreflangAlternates } from '../../../../i18n/seo'

export function generateStaticParams() {
  // Křížový součin locale × slug — každý článek existuje pod každým
  // jazykovým prefixem (chybějící překlad těla řeší fallback v JournalPost,
  // ne 404; viz bodyLang() v posts.ts).
  return routing.locales.flatMap(locale => POSTS.map(p => ({ locale, slug: p.slug })))
}

/**
 * Text článku z `content/<slug>.<lang>.md`. Čte se při buildu; klientská
 * komponenta pak dostane hotové bloky. Články bez .md souborů (starší, psané
 * přímo v TSX) vrátí null a vykreslí se svou vlastní komponentou.
 */
async function readBody(slug: string, langs: readonly PostLang[]) {
  const dir = path.join(process.cwd(), 'src/app/[locale]/journal/content')
  const entries = await Promise.all(langs.map(async lang => {
    try {
      return [lang, parseMarkdown(await fs.readFile(path.join(dir, `${slug}.${lang}.md`), 'utf8'))] as const
    } catch {
      return null
    }
  }))

  const found = entries.filter(e => e !== null)
  return found.length ? Object.fromEntries(found) as Record<PostLang, Block[]> : null
}

export async function generateMetadata({ params }: PageProps<'/[locale]/journal/[slug]'>): Promise<Metadata> {
  const { slug, locale } = await params
  const post = getPost(slug)
  if (!post) return {}

  // Meta (rubrika/titulek/perex) existuje jen pro cs/en/hi — fr/es/de
  // dostanou anglickou verzi, dokud journal nemá vlastní překlad.
  const { title, perex } = post.meta[toPostLang(locale)]
  return {
    title: `${title} · Zero Balance Society`,
    description: perex.replace(/\s+/g, ' ').trim(),
    alternates: hreflangAlternates(`/journal/${slug}`, locale as AppLocale),
    openGraph: { images: [post.cover] },
  }
}

export default async function JournalPostPage({ params }: PageProps<'/[locale]/journal/[slug]'>) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return <JournalPost slug={slug} body={await readBody(slug, post.langs)} />
}
