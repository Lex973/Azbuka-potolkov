'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react'

import { ContactDialogButton } from '@/components/forms/ContactDialog/ContactDialogButton'
import { InstagramIcon, JournalIcon, TelegramIcon } from '@/components/ui/Icons/Icons'
import { siteConfig } from '@/config/site'
import {
  navigationGroups,
  primaryNavigation,
  socialLinks,
  type NavigationItem,
} from '@/content/navigation'
import { lockBodyScroll } from '@/lib/scroll-lock'

import styles from './Header.module.css'

const sectionIds = navigationGroups.flatMap((group) =>
  group.items.map((item) => item.href.slice(1)),
)

/** Секция, верх которой последним пересёк линию на 40% высоты окна. */
function useActiveSection() {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    let frame = 0

    function update() {
      frame = 0
      const line = window.innerHeight * 0.4
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      let current: { id: string; top: number } | null = null

      for (const id of sectionIds) {
        const top = document.getElementById(id)?.getBoundingClientRect().top
        if (top === undefined || top > line) continue
        if (!current || top > current.top) current = { id, top }
      }

      setActiveId(atBottom ? 'contacts' : (current?.id ?? null))
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return activeId
}

function isActive(item: NavigationItem, activeId: string | null) {
  if (!activeId) return false
  return (item.sections ?? [item.href.slice(1)]).includes(activeId)
}

function SocialLinks({ className }: { className: string }) {
  return (
    <div className={className} aria-label="Социальные сети">
      {socialLinks.map((item) => (
        <a
          key={item.label}
          href={item.href}
          aria-label={item.ariaLabel}
          data-tooltip={
            item.label === 'Instagram' ? 'Instagram' : item.label === 'TG' ? 'Telegram' : 'Журнал'
          }
        >
          {item.label === 'Instagram' ? (
            <InstagramIcon />
          ) : item.label === 'TG' ? (
            <TelegramIcon />
          ) : (
            <JournalIcon className={styles.journalIcon} />
          )}
        </a>
      ))}
    </div>
  )
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sectionsOpen, setSectionsOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const sectionsButtonRef = useRef<HTMLButtonElement>(null)
  const activeId = useActiveSection()

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      if (document.getElementById('desktop-sections')?.contains(document.activeElement)) {
        sectionsButtonRef.current?.focus()
      }
      setMenuOpen(false)
      setSectionsOpen(false)
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  useEffect(() => {
    if (!sectionsOpen) return

    function handlePointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) setSectionsOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [sectionsOpen])

  useEffect(() => {
    if (!menuOpen) return
    return lockBodyScroll()
  }, [menuOpen])

  function closeNavigation() {
    setMenuOpen(false)
    setSectionsOpen(false)
  }

  function navigate(event: MouseEvent<HTMLAnchorElement>, href: string) {
    const target = document.getElementById(href.slice(1))
    const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey

    closeNavigation()
    if (!target || modified || event.button !== 0) return

    event.preventDefault()

    // Прокрутка после снятия блокировки меню: при `overflow: hidden` Safari игнорирует переход.
    requestAnimationFrame(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
      if (location.hash !== href) history.pushState(null, '', href)
    })
  }

  function renderLink(item: NavigationItem, style?: CSSProperties) {
    return (
      <a
        key={item.href}
        href={item.href}
        aria-current={isActive(item, activeId) ? 'location' : undefined}
        style={style}
        onClick={(event) => navigate(event, item.href)}
      >
        {item.label}
      </a>
    )
  }

  // Сквозной индекс для поочерёдного появления пунктов мобильного меню.
  let mobileIndex = 0

  return (
    <header className={styles.header} ref={headerRef}>
      <div className={styles.inner}>
        <Link
          className={styles.logo}
          href="/#home"
          aria-label="Азбука Потолков — на главную"
          onClick={(event) => navigate(event, '#home')}
        >
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
            <a
              key={item.href}
              href={item.href}
              data-compact={item.compact}
              aria-current={isActive(item, activeId) ? 'location' : undefined}
              onClick={(event) => navigate(event, item.href)}
            >
              {item.label}
            </a>
          ))}
          <button
            ref={sectionsButtonRef}
            className={styles.sectionsButton}
            type="button"
            aria-expanded={sectionsOpen}
            aria-controls="desktop-sections"
            onClick={() => setSectionsOpen((current) => !current)}
          >
            Все разделы
            <span aria-hidden="true" />
          </button>
        </nav>

        <div className={styles.actions}>
          <SocialLinks className={styles.socials} />
          <ContactDialogButton className={styles.cta} size="small" tone="inverse" />
          <button
            ref={menuButtonRef}
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

      <div
        className={styles.sectionsPanel}
        id="desktop-sections"
        data-open={sectionsOpen}
        inert={!sectionsOpen}
      >
        <nav className={styles.sectionsGrid} aria-label="Все разделы">
          {navigationGroups.map((group, groupIndex) => (
            <div key={group.title} className={styles.group}>
              <p>
                <span>{String(groupIndex + 1).padStart(2, '0')}</span>
                {group.title}
              </p>
              {group.items.map((item) => renderLink(item))}
            </div>
          ))}
        </nav>
        <div className={styles.sectionsFooter}>
          <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>
          <span>{siteConfig.hours}</span>
          <SocialLinks className={styles.panelSocials} />
        </div>
      </div>

      <div
        className={styles.mobilePanel}
        id="mobile-navigation"
        data-open={menuOpen}
        inert={!menuOpen}
      >
        <nav className={styles.mobileNav} aria-label="Мобильная навигация">
          {navigationGroups.map((group) => (
            <div key={group.title} className={styles.mobileGroup}>
              <p style={{ '--index': mobileIndex++ } as CSSProperties}>{group.title}</p>
              {group.items.map((item) =>
                renderLink(item, { '--index': mobileIndex++ } as CSSProperties),
              )}
            </div>
          ))}
        </nav>
        <div className={styles.mobileFooter} style={{ '--index': mobileIndex } as CSSProperties}>
          <a className={styles.mobilePhone} href={siteConfig.phone.href}>
            {siteConfig.phone.display}
          </a>
          <ContactDialogButton
            className={styles.mobileCta}
            size="large"
            tone="inverse"
            onOpen={() => {
              closeNavigation()
              menuButtonRef.current?.focus({ preventScroll: true })
            }}
          />
          <SocialLinks className={styles.mobileSocials} />
        </div>
      </div>
    </header>
  )
}
