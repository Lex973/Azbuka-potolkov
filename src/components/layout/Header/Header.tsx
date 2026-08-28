'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { ContactDialogButton } from '@/components/forms/ContactDialog/ContactDialogButton'
import { InstagramIcon, JournalIcon, TelegramIcon } from '@/components/ui/Icons/Icons'
import {
  allNavigation,
  primaryNavigation,
  secondaryNavigation,
  socialLinks,
} from '@/content/navigation'

import styles from './Header.module.css'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setMoreOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = menuOpen ? 'hidden' : ''

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  function closeNavigation() {
    setMenuOpen(false)
    setMoreOpen(false)
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.logo} href="/" aria-label="Азбука Потолков — на главную">
          <span>Азбука Потолков</span>
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

        <nav className={styles.desktopNav} aria-label="Основная навигация">
          {primaryNavigation.map((item) => (
            <Link key={item.href} href={`/${item.href}`}>
              {item.label}
            </Link>
          ))}
          <div className={styles.more}>
            <button
              type="button"
              aria-expanded={moreOpen}
              aria-controls="desktop-more-navigation"
              onClick={() => setMoreOpen((current) => !current)}
            >
              Разделы <span aria-hidden="true">+</span>
            </button>
            <div className={styles.morePanel} id="desktop-more-navigation" data-open={moreOpen}>
              {secondaryNavigation.map((item) => (
                <Link key={item.href} href={`/${item.href}`} onClick={closeNavigation}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className={styles.actions}>
          <div className={styles.socials} aria-label="Социальные сети">
            {socialLinks.map((item) => (
              <a key={item.label} href={item.href} aria-label={item.ariaLabel}>
                {item.label === 'Instagram' ? <InstagramIcon /> : item.label === 'TG' ? <TelegramIcon /> : <JournalIcon />}
              </a>
            ))}
          </div>
          <ContactDialogButton className={styles.cta} size="small" tone="inverse" />
          <button
            className={styles.menuButton}
            type="button"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={styles.mobilePanel} id="mobile-navigation" data-open={menuOpen}>
        <nav aria-label="Мобильная навигация">
          {allNavigation.map((item, index) => (
            <Link key={item.href} href={`/${item.href}`} onClick={closeNavigation}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.mobileFooter}>
          <ContactDialogButton size="large" tone="inverse" onOpen={closeNavigation} />
          <div className={styles.mobileSocials}>
            {socialLinks.map((item) => (
              <a key={item.label} href={item.href} aria-label={item.ariaLabel}>
                {item.label === 'Instagram' ? <InstagramIcon /> : item.label === 'TG' ? <TelegramIcon /> : <JournalIcon />}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
