import fs from 'node:fs/promises'
import path from 'node:path'
import { notFound } from 'next/navigation'
import JournalPost from './JournalPost'
import { POSTS, getPost, type PostLang } from '../posts'
import { parseMarkdown, type Block } from '../markdown'

export function generateStaticParams() {
  return POSTS.map(p => ({ slug: p.slug }))
}

/**
 * Text článku z `content/<slug>.<lang>.md`. Čte se při buildu; klientská
 * komponenta pak dostane hotové bloky. Články bez .md souborů (starší, psané
 * přímo v TSX) vrátí null a vykreslí se svou vlastní komponentou.
 */
async function readBody(slug: string, langs: readonly PostLang[]) {
  const dir = path.join(process.cwd(), 'src/app/journal/content')
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

export async function generateMetadata({ params }: PageProps<'/journal/[slug]'>) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}

  const { title, perex } = post.meta.en
  return {
    title: `${title} · Zero Balance Society`,
    description: perex.replace(/\s+/g, ' ').trim(),
    openGraph: { images: [post.cover] },
  }
}

export default async function JournalPostPage({ params }: PageProps<'/journal/[slug]'>) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return <JournalPost slug={slug} body={await readBody(slug, post.langs)} />
}
