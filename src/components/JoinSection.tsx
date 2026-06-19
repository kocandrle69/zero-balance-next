'use client'

import { useRef } from 'react'
import styles from './JoinSection.module.css'
import { useLang } from '../contexts/LangContext'
import { useScrollRevealAll } from '../hooks/useScrollReveal'
import IMG from '../lib/images'

const CONTACT_MAILTO =
  'mailto:jan@zero-balance.org?cc=frantisek@zero-balance.org,jiri@zero-balance.org&subject=Zero%20Balance%20Society'

// "Stát se členem" — zatím mailto s předmětem Členství
// TODO: nahradit za /join nebo Google Form, jakmile bude hotov
const MEMBERSHIP_MAILTO =
  'mailto:jan@zero-balance.org?cc=frantisek@zero-balance.org,jiri@zero-balance.org&subject=Z%C3%A1jem%20o%20%C4%8Dlenstv%C3%AD%20%E2%80%93%20Zero%20Balance%20Society'

export default function JoinSection() {
  const { t, tHTML } = useLang()
  const ref = useRef<HTMLElement>(null)
  useScrollRevealAll(ref)

  return (
    <section className={styles.join} id="join" ref={ref}>
      {/* Background via inline style — no hardcoded URL in CSS */}
      <div
        className={styles.joinBg}
        style={{ backgroundImage: `url('${IMG.joinBg}')` }}
      />

      <div className={styles.joinInner}>
        <div className={`${styles.joinLeft} r`}>
          <div className={styles.sectionLabel}>{t('join_label')}</div>
          <h2 dangerouslySetInnerHTML={tHTML('join_title')} />
        </div>

        <div className={`${styles.joinRight} r`} style={{ transitionDelay: '0.15s' }}>
          <p>{t('join_desc')}</p>
          <div className={styles.joinBtns}>
            <p className={styles.joinAshramCta}>
              {t('join_ashram_cta')}
            </p>
            <a href={CONTACT_MAILTO} className={styles.btnOutline}>{t('join_btn3')}</a>
          </div>
        </div>
      </div>

      <div className={styles.joinNumber}>ZB</div>
    </section>
  )
}