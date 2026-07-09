import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import styles from '../../components/subpage.module.css'

export const metadata = {
  title: 'Coming Soon · Zero Balance Society',
}

export default function ComingSoonPage() {
  return (
    <>
      <Navbar translucent />
      <main className={styles.page}>

        <div className={styles.hero}>
          <div className={`${styles.heroBg} ${styles.heroBgFigureRight}`} style={{ backgroundImage: 'url(/images/aboutus4.jpg)', transform: 'none' }} />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <p className={styles.heroLabel}>Zero Balance Society</p>
            <h1 className={styles.heroTitle}>
              Something<br /><em>is coming.</em>
            </h1>
          </div>
        </div>

        <article className={styles.article}>
          <section className={styles.section} style={{ textAlign: 'center', padding: '56px 0 100px' }}>
            <div style={{ width: 48, height: 1, background: 'var(--gold)', opacity: 0.5, margin: '0 auto 26px' }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(19px, 2.2vw, 25px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.8, color: 'var(--gold)', maxWidth: '480px', margin: '0 auto' }}>
              Thank you for your patience — we&apos;ll be here from 26 July 2026.
            </p>
          </section>
        </article>

      </main>
      <Footer />
    </>
  )
}
