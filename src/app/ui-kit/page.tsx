import type { Metadata } from 'next'
import Image from 'next/image'

import { MotionShowcase } from '@/components/motion/MotionShowcase/MotionShowcase'
import { Button, ButtonLink } from '@/components/ui/Button/Button'
import { Container } from '@/components/ui/Container/Container'
import { TextAreaField, TextField } from '@/components/ui/FormField/FormField'
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon, PlusIcon } from '@/components/ui/Icons/Icons'
import { ModalDemo } from '@/components/ui/Modal/ModalDemo'
import { ProjectCard } from '@/components/ui/ProjectCard/ProjectCard'
import { SliderControlsDemo } from '@/components/ui/SliderControls/SliderControlsDemo'

import styles from './UiKitPage.module.css'

export const metadata: Metadata = {
  title: 'UI Kit',
  description: 'Визуальная дизайн-система сайта «Азбука Потолков».',
  robots: { index: false, follow: false },
}

const kitNavigation = [
  ['01', 'Основа', '#foundation'],
  ['02', 'Типографика', '#typography'],
  ['03', 'Действия', '#actions'],
  ['04', 'Формы', '#forms'],
  ['05', 'Поверхности', '#surfaces'],
  ['06', 'Сетка', '#layout'],
  ['07', 'Навигация', '#navigation'],
  ['08', 'Движение', '#motion'],
] as const

const colorGroups = [
  {
    title: 'Brand',
    colors: [
      { name: 'Deep green', value: '#22231C', className: styles.swatchBrand },
      { name: 'Raised green', value: '#2B2D24', className: styles.swatchBrandRaised },
      { name: 'Architectural gold', value: '#9D824E', className: styles.swatchAccent },
    ],
  },
  {
    title: 'Surfaces',
    colors: [
      { name: 'Paper', value: '#FBFAF7', className: styles.swatchPaper },
      { name: 'Canvas', value: '#F2F0EA', className: styles.swatchCanvas },
      { name: 'Warm surface', value: '#E8E5DC', className: styles.swatchSurface },
    ],
  },
  {
    title: 'Functional',
    colors: [
      { name: 'Muted text', value: '#73746D', className: styles.swatchMuted },
      { name: 'Error', value: '#9D4C42', className: styles.swatchError },
      { name: 'Success', value: '#5D6B53', className: styles.swatchSuccess },
    ],
  },
] as const

const typeScale = [
  {
    level: 'Display',
    meta: '136 / 0.96 / 400',
    text: 'Точность над головой',
    className: styles.typeDisplay,
  },
  {
    level: 'H1',
    meta: '104 / 0.96 / 400',
    text: 'Проект начинается выше',
    className: styles.typeH1,
  },
  { level: 'H2', meta: '80 / 1.08 / 400', text: 'Спокойная сдача', className: styles.typeH2 },
  { level: 'H3', meta: '56 / 1.08 / 400', text: 'Погружаемся в задачу', className: styles.typeH3 },
  { level: 'H4', meta: '36 / 1.08 / 400', text: 'Частные проекты', className: styles.typeH4 },
  { level: 'H5', meta: '26 / 1.20 / 500', text: 'Техническая карта', className: styles.typeH5 },
  { level: 'H6', meta: '16 / 1.35 / 600', text: 'Авторский надзор', className: styles.typeH6 },
] as const

const spacingScale = [
  { token: '01', value: '4 px', className: styles.spacing1 },
  { token: '02', value: '8 px', className: styles.spacing2 },
  { token: '03', value: '12 px', className: styles.spacing3 },
  { token: '04', value: '16 px', className: styles.spacing4 },
  { token: '06', value: '24 px', className: styles.spacing6 },
  { token: '08', value: '32 px', className: styles.spacing8 },
  { token: '12', value: '48 px', className: styles.spacing12 },
  { token: '16', value: '64 px', className: styles.spacing16 },
  { token: '24', value: '96 px', className: styles.spacing24 },
] as const

function SectionHeading({
  index,
  title,
  description,
}: {
  index: string
  title: string
  description: string
}) {
  return (
    <header className={styles.sectionHeading}>
      <p className={styles.sectionIndex}>[{index}]</p>
      <div>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <div className={styles.goldLine} />
      </div>
      <p className={styles.sectionDescription}>{description}</p>
    </header>
  )
}

export default function UiKitPage() {
  return (
    <main>
      <section className={styles.intro}>
        <Container className={styles.introContainer}>
          <div className={styles.introTopline}>
            <div className={styles.brandLockup} aria-label="Азбука Потолков">
              <span>Азбука Потолков</span>
              <small>потолки · свет · климат</small>
            </div>
            <p className={styles.version}>UI system / version 01</p>
          </div>

          <div className={styles.introMain}>
            <p className={styles.introEyebrow}>[ визуальный язык проекта ]</p>
            <h1 className={styles.introTitle}>Детали говорят тихо. Работают точно.</h1>
          </div>

          <div className={styles.introFooter}>
            <p>
              Архитектурная система для крупных интерьерных фотографий, спокойной типографики и
              точных технических акцентов.
            </p>
            <dl className={styles.introMeta}>
              <div>
                <dt>Сетка</dt>
                <dd>12 / 8 / 4</dd>
              </div>
              <div>
                <dt>Контейнер</dt>
                <dd>1440 px</dd>
              </div>
              <div>
                <dt>Ритм</dt>
                <dd>4 px</dd>
              </div>
            </dl>
          </div>
        </Container>
      </section>

      <nav className={styles.kitNav} aria-label="Разделы UI Kit">
        <Container className={styles.kitNavInner}>
          {kitNavigation.map(([index, label, href]) => (
            <a key={href} href={href}>
              <span>{index}</span>
              {label}
            </a>
          ))}
        </Container>
      </nav>

      <section className={styles.section} id="foundation">
        <Container>
          <SectionHeading
            index="01"
            title="Основа"
            description="Тёплые нейтрали дают фотографиям пространство, глубокий зелёный собирает композицию, а золото работает только как точная отметка."
          />

          <div className={styles.colorGroups}>
            {colorGroups.map((group) => (
              <article key={group.title} className={styles.colorGroup}>
                <h3>{group.title}</h3>
                <div className={styles.swatches}>
                  {group.colors.map((color) => (
                    <div key={color.name} className={styles.swatchCard}>
                      <div className={`${styles.swatch} ${color.className}`} />
                      <div className={styles.swatchMeta}>
                        <span>{color.name}</span>
                        <code>{color.value}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className={styles.statePalette}>
            <div>
              <p className={styles.stateName}>Default</p>
              <span className={styles.stateDefault} />
              <code>#9D824E</code>
            </div>
            <div>
              <p className={styles.stateName}>Hover</p>
              <span className={styles.stateHover} />
              <code>#B09765</code>
            </div>
            <div>
              <p className={styles.stateName}>Active</p>
              <span className={styles.stateActive} />
              <code>#80683F</code>
            </div>
            <div>
              <p className={styles.stateName}>Disabled</p>
              <span className={styles.stateDisabled} />
              <code>40% opacity</code>
            </div>
          </div>
        </Container>
      </section>

      <section className={`${styles.section} ${styles.typeSection}`} id="typography">
        <Container>
          <SectionHeading
            index="02"
            title="Типографика"
            description="Одна современная гротескная гарнитура. Характер создают масштаб, тонкое начертание и воздух, а не декоративные приёмы."
          />

          <div className={styles.typeScale}>
            {typeScale.map((item) => (
              <div key={item.level} className={styles.typeRow}>
                <div className={styles.typeMeta}>
                  <span>{item.level}</span>
                  <code>{item.meta}</code>
                </div>
                <p className={item.className}>{item.text}</p>
              </div>
            ))}
          </div>

          <div className={styles.textSamples}>
            <article>
              <p className={styles.sampleLabel}>Lead / 22 / 1.55</p>
              <p className={styles.leadText}>
                Подключаемся к проекту на этапе чертежей и ведём потолочное решение до спокойной
                сдачи.
              </p>
            </article>
            <article>
              <p className={styles.sampleLabel}>Body / 16 / 1.65</p>
              <p className={styles.bodyText}>
                Фиксируем реальный уровень потолка, передаём его смежным подрядчикам и согласовываем
                узлы до начала отделки.
              </p>
            </article>
            <article>
              <p className={styles.sampleLabel}>Secondary / 14 / 1.60</p>
              <p className={styles.secondaryText}>
                Вторичный текст объясняет детали и не конкурирует с изображением или заголовком.
              </p>
            </article>
            <article>
              <p className={styles.sampleLabel}>Label / 11 / 600</p>
              <p className={styles.labelText}>[ 01 / Технический подход ]</p>
            </article>
          </div>
        </Container>
      </section>

      <section className={styles.section} id="actions">
        <Container>
          <SectionHeading
            index="03"
            title="Действия"
            description="Кнопки остаются строгими и собранными. Состояние обозначается цветом и небольшим движением, без тяжёлых теней и декоративного шума."
          />

          <div className={styles.actionBlock}>
            <h3 className={styles.subsectionTitle}>Основные варианты</h3>
            <div className={styles.buttonGrid}>
              <div className={styles.controlSample}>
                <span>Primary</span>
                <Button showArrow size="large">
                  Обсудить задачу
                </Button>
              </div>
              <div className={styles.controlSample}>
                <span>Secondary</span>
                <Button showArrow size="large" variant="secondary">
                  Смотреть проекты
                </Button>
              </div>
              <div className={styles.controlSample}>
                <span>Hover</span>
                <Button showArrow size="large" previewState="hover">
                  Обсудить задачу
                </Button>
              </div>
              <div className={styles.controlSample}>
                <span>Active</span>
                <Button showArrow size="large" previewState="active">
                  Обсудить задачу
                </Button>
              </div>
              <div className={styles.controlSample}>
                <span>Disabled</span>
                <Button showArrow size="large" disabled>
                  Обсудить задачу
                </Button>
              </div>
            </div>
          </div>

          <div className={styles.darkControlPanel}>
            <p className={styles.subsectionLabel}>На тёмном фоне</p>
            <div className={styles.darkButtons}>
              <Button showArrow size="large" tone="inverse">
                Обсудить задачу
              </Button>
              <Button showArrow size="large" tone="inverse" variant="secondary">
                Смотреть проекты
              </Button>
            </div>
          </div>

          <div className={styles.actionBlock}>
            <h3 className={styles.subsectionTitle}>Размеры и ссылки</h3>
            <div className={styles.buttonSizes}>
              <Button size="small">Small</Button>
              <Button size="medium">Medium</Button>
              <Button size="large">Large</Button>
            </div>
            <div className={styles.linkSamples}>
              <a className={styles.inlineLink} href="#forms">
                Текстовая ссылка
              </a>
              <ButtonLink
                className={styles.arrowLink}
                href="#surfaces"
                showArrow
                variant="secondary"
                size="small"
              >
                Ссылка в рамке
              </ButtonLink>
              <a className={styles.editorialLink} href="#layout">
                Подробнее о подходе <ArrowRightIcon />
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className={`${styles.section} ${styles.formSection}`} id="forms">
        <Container>
          <SectionHeading
            index="04"
            title="Формы и модальные окна"
            description="Минимум полей, ясные подписи и спокойная обратная связь. Модальное окно сохраняет контекст и не превращается в рекламный баннер."
          />

          <div className={styles.formLayout}>
            <div className={styles.formGrid}>
              <div className={styles.controlSample}>
                <span>Default</span>
                <TextField id="kit-name" label="Имя" placeholder="Как к вам обращаться" />
              </div>
              <div className={styles.controlSample}>
                <span>Focus</span>
                <TextField
                  id="kit-phone"
                  className={styles.forcedFocus}
                  label="Телефон"
                  placeholder="+7 999 000-00-00"
                />
              </div>
              <div className={styles.controlSample}>
                <span>Error</span>
                <TextField
                  id="kit-error"
                  label="Телефон"
                  defaultValue="999"
                  error="Проверьте номер телефона"
                />
              </div>
              <div className={styles.controlSample}>
                <span>Disabled</span>
                <TextField
                  id="kit-disabled"
                  label="Имя"
                  value="Недоступное поле"
                  disabled
                  readOnly
                />
              </div>
              <div className={`${styles.controlSample} ${styles.textareaSample}`}>
                <span>Textarea</span>
                <TextAreaField
                  id="kit-message"
                  label="О проекте"
                  placeholder="Расскажите коротко о задаче"
                  hint="Необязательное поле"
                />
              </div>
            </div>

            <aside className={styles.modalCallout}>
              <p className={styles.modalNumber}>04 / dialog</p>
              <h3>Форма появляется как спокойное продолжение разговора.</h3>
              <p>
                Закрывается кнопкой, по Escape и клику на фон. Нативный dialog удерживает фокус и
                поддерживает клавиатурную навигацию.
              </p>
              <ModalDemo />
            </aside>
          </div>
        </Container>
      </section>

      <section className={styles.section} id="surfaces">
        <Container>
          <SectionHeading
            index="05"
            title="Поверхности и изображения"
            description="Интерьер остаётся главным визуальным аргументом. Геометрия кадров строгая, обработка естественная, подписи вторичны."
          />

          <div className={styles.imageComposition}>
            <figure className={styles.imageWide}>
              <Image
                src="/images/ui-kit/interior-main.png"
                alt="Современный интерьер с интегрированными световыми линиями в потолке"
                fill
                sizes="(max-width: 768px) 100vw, 68vw"
              />
              <figcaption>01 / Общий план · естественная обработка</figcaption>
            </figure>
            <div className={styles.imageSideColumn}>
              <figure className={styles.imageDetail}>
                <Image
                  src="/images/ui-kit/interior-main.png"
                  alt="Фрагмент потолка со встроенной световой линией"
                  fill
                  sizes="(max-width: 768px) 100vw, 28vw"
                />
                <figcaption>Деталь / световая линия</figcaption>
              </figure>
              <div className={styles.surfaceNote}>
                <span>[ правило ]</span>
                <p>
                  Не затемнять фотографии вне hero и не перекрывать важные потолочные узлы текстом.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.cardExamples}>
            <article className={styles.editorialCard}>
              <span className={styles.cardIndex}>01</span>
              <div>
                <p className={styles.cardLabel}>Технический подход</p>
                <h3>Сначала — чертежи. Затем — спокойный монтаж.</h3>
              </div>
              <PlusIcon />
            </article>
            <article className={`${styles.editorialCard} ${styles.editorialCardDark}`}>
              <span className={styles.cardIndex}>02</span>
              <div>
                <p className={styles.cardLabel}>Авторский надзор</p>
                <h3>Один уровень для всех смежных решений.</h3>
              </div>
              <PlusIcon />
            </article>
          </div>

          <div className={styles.projectCardBlock}>
            <p className={styles.subsectionLabel}>Проектная карточка</p>
            <ProjectCard
              image="/images/ui-kit/interior-main.png"
              alt="Светлый интерьер квартиры с теневыми линиями на потолке"
              index="01"
              category="Частный интерьер · 2026"
              title="Квартира над городом"
              description="Чистая плоскость потолка, встроенный свет и точные примыкания, согласованные с мебелью ещё на этапе чертежей."
            />
          </div>
        </Container>
      </section>

      <section className={`${styles.section} ${styles.layoutSection}`} id="layout">
        <Container>
          <SectionHeading
            index="06"
            title="Сетка и ритм"
            description="Широкий контейнер даёт фотографиям масштаб, а единый модуль отступов удерживает редакторскую точность на всех экранах."
          />

          <div className={styles.gridDemo} aria-label="Демонстрация двенадцатиколоночной сетки">
            {Array.from({ length: 12 }, (_, index) => (
              <span key={index}>{String(index + 1).padStart(2, '0')}</span>
            ))}
          </div>
          <div className={styles.gridMeta}>
            <p>
              <span>Desktop</span>12 колонок · 32 px gap
            </p>
            <p>
              <span>Tablet</span>8 колонок · 24 px gap
            </p>
            <p>
              <span>Mobile</span>4 колонки · 16 px gap
            </p>
            <p>
              <span>Max width</span>1440 px
            </p>
          </div>

          <div className={styles.spacingBlock}>
            <h3 className={styles.subsectionTitle}>Spacing scale</h3>
            <div className={styles.spacingList}>
              {spacingScale.map((space) => (
                <div key={space.token} className={styles.spacingRow}>
                  <code>{space.token}</code>
                  <span className={`${styles.spacingBar} ${space.className}`} />
                  <span>{space.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.shapeRules}>
            <article>
              <span className={styles.radiusSampleSmall} />
              <div>
                <p>Radius small</p>
                <code>2 px</code>
              </div>
            </article>
            <article>
              <span className={styles.radiusSampleMedium} />
              <div>
                <p>Radius medium</p>
                <code>4 px</code>
              </div>
            </article>
            <article className={styles.dividerSample}>
              <span />
              <div>
                <p>Divider</p>
                <code>1 px / gold</code>
              </div>
            </article>
            <article className={styles.containerSample}>
              <span />
              <div>
                <p>Page gutter</p>
                <code>16—56 px</code>
              </div>
            </article>
          </div>
        </Container>
      </section>

      <section className={styles.section} id="navigation">
        <Container>
          <SectionHeading
            index="07"
            title="Навигация и иконки"
            description="Управление остаётся геометричным и легко считывается. Иконки линейные, используют currentColor и не конкурируют с текстом."
          />

          <div className={styles.navigationLayout}>
            <div className={styles.sliderPanel}>
              <p className={styles.subsectionLabel}>Slider controls / interactive</p>
              <SliderControlsDemo />
            </div>
            <div className={styles.iconPanel}>
              <p className={styles.subsectionLabel}>Icon set / 24 px</p>
              <div className={styles.iconGrid}>
                <div>
                  <ArrowLeftIcon />
                  <span>Arrow left</span>
                </div>
                <div>
                  <ArrowRightIcon />
                  <span>Arrow right</span>
                </div>
                <div>
                  <PlusIcon />
                  <span>Expand</span>
                </div>
                <div>
                  <CloseIcon />
                  <span>Close</span>
                </div>
              </div>
              <p className={styles.iconRule}>
                Декоративные иконки скрываются от screen reader. Самостоятельные кнопки получают
                понятный aria-label.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className={`${styles.section} ${styles.motionSection}`} id="motion">
        <Container>
          <SectionHeading
            index="08"
            title="Движение"
            description="Анимация показывает порядок и связь элементов. Основной характер — небольшая дистанция, мягкое замедление и отсутствие резких скачков."
          />
          <MotionShowcase />
          <div className={styles.motionTokens}>
            <div>
              <span>Fast</span>
              <code>180 ms</code>
              <p>Hover и нажатие</p>
            </div>
            <div>
              <span>Base</span>
              <code>320 ms</code>
              <p>Состояния интерфейса</p>
            </div>
            <div>
              <span>Slow</span>
              <code>700 ms</code>
              <p>Reveal и смена контента</p>
            </div>
            <div>
              <span>Easing</span>
              <code>0.22, 1, 0.36, 1</code>
              <p>Спокойное замедление</p>
            </div>
          </div>
        </Container>
      </section>

      <footer className={styles.footer}>
        <Container className={styles.footerInner}>
          <div className={styles.brandLockup}>
            <span>Азбука Потолков</span>
            <small>UI system · 2026</small>
          </div>
          <p>Следующий этап — применение согласованной системы к реальным секциям сайта.</p>
        </Container>
      </footer>
    </main>
  )
}
