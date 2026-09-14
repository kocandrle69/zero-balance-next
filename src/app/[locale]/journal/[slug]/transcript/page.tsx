import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import TranscriptPage from '../../posts/TranscriptPage'
import { getPost, getMeta, toPostLang } from '../../posts'
import { routing, type AppLocale } from '../../../../../i18n/routing'
import { hreflangAlternates } from '../../../../../i18n/seo'

/** Vydání, ke kterým existuje i surový nezpracovaný přepis. */
const TRANSCRIPT_SLUGS = ['order-we-forgot', 'cesta-proti-proudu']

export function generateStaticParams() {
  return routing.locales.flatMap(locale => TRANSCRIPT_SLUGS.map(slug => ({ locale, slug })))
}

export async function generateMetadata({ params }: PageProps<'/[locale]/journal/[slug]/transcript'>): Promise<Metadata> {
  const { slug, locale } = await params
  const post = getPost(slug)
  if (!post || !TRANSCRIPT_SLUGS.includes(slug)) return {}

  const { title } = getMeta(post, toPostLang(locale))
  return {
    title: `Raw transcript · ${title} · Zero Balance Society`,
    alternates: hreflangAlternates(`/journal/${slug}/transcript`, locale as AppLocale),
    robots: { index: false, follow: true },
  }
}

export default async function JournalTranscriptPage({ params }: PageProps<'/[locale]/journal/[slug]/transcript'>) {
  const { slug } = await params
  if (!TRANSCRIPT_SLUGS.includes(slug) || !getPost(slug)) notFound()

  return <TranscriptPage slug={slug} />
}
