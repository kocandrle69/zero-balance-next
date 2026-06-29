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
          <div className={styles.heroBg} style={{ backgroundImage: 'url(/images/aboutus4.jpg)', transform: 'none' }} />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <p className={styles.heroLabel}>Zero Balance Society</p>
            <h1 className={styles.heroTitle}>
              Something<br /><em>is coming.</em>
            </h1>
          </div>
        </div>

        <article className={styles.article}>
          <section className={styles.section} style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(18px, 2vw, 24px)', fontWeight: 300, lineHeight: 1.7, color: 'var(--ink2)', maxWidth: '480px', margin: '0 auto' }}>
              We are preparing something meaningful.<br />
              This page will open soon.
            </p>
          </section>
        </article>

      </main>
      <Footer />
    </>
  )
}
