import Link from 'next/link'

import { ArrowRightIcon } from '@/components/ui/Icons/Icons'
import { Container } from '@/components/ui/Container/Container'
import { siteConfig } from '@/config/site'

import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer} id="contacts">
      <Container>
        <div className={styles.topline}>
          <Link className={styles.logo} href="/" aria-label="Азбука Потолков — на главную">
            <span>{siteConfig.name}</span>
            <small>
              <span>Потолки</span>
              <span aria-hidden="true">·</span>
              <span>Свет</span>
              <span aria-hidden="true">·</span>
              <span>Климат</span>
              <span aria-hidden="true">·</span>
              <span>Тихие стены</span>
            </small>
          </Link>
          <p className={styles.footerText}>Наш продукт — счастливый день переезда, где учтены все технические и визуальные задачи.</p>
        </div>

        <div className={styles.contacts}>
          <div className={styles.primaryContact}>
            <p>Позвоните нам</p>
            <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>
          </div>

          <div className={styles.contactGroup}>
            <p>Студия</p>
            <address>{siteConfig.address}</address>
          </div>

          <div className={styles.contactGroup}>
            <p>Режим работы</p>
            <span>{siteConfig.hours}</span>
            <small>{siteConfig.hoursNote}</small>
          </div>

          <div className={styles.contactGroup}>
            <p>Написать</p>
            <div className={styles.socials}>
              {siteConfig.socialLinks.map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                  <ArrowRightIcon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <Link href="#home">Наверх ↑</Link>
        </div>
      </Container>
    </footer>
  )
}
