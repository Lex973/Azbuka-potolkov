import type { CeilingTypeDetail } from '@/types/ceiling-type'

export const ceilingTypeCards = [
  {
    number: '01',
    title: 'Теневой потолок',
    description:
      'Чёткий тёмный контур отделяет потолок от стен и подчёркивает геометрию помещения.',
    image: '/images/ceiling-types/shadow-v3.webp',
    imageAlt: 'Гостиная с теневым потолком и чётким тёмным зазором по периметру',
    href: '/ceiling-types/shadow',
  },
  {
    number: '02',
    title: 'Бесщелевой потолок',
    description:
      'Полотно подходит к стене без декоративной вставки — линия примыкания остаётся почти незаметной.',
    image: '/images/ceiling-types/gapless-upward-v2.webp',
    imageAlt: 'Гостиная с бесщелевым потолком и незаметным примыканием к стенам',
    href: '/ceiling-types/gapless',
  },
  {
    number: '03',
    title: 'Парящий потолок',
    description:
      'Скрытая подсветка по периметру визуально отделяет плоскость и добавляет мягкий вечерний свет.',
    image: '/images/ceiling-types/floating-upward-v2.webp',
    imageAlt: 'Гостиная вечером с парящим потолком и тёплой подсветкой по периметру',
    href: '/ceiling-types/floating',
  },
  {
    number: '04',
    title: 'Световой потолок',
    description:
      'Весь потолок или его часть работает как большой ровный источник света без видимых приборов.',
    image: '/images/ceiling-types/luminous-upward-v2.webp',
    imageAlt: 'Гостиная с большой равномерно светящейся плоскостью потолка',
    href: '/ceiling-types/luminous',
  },
  {
    number: '05',
    title: 'Стандартный потолок',
    description:
      'Аккуратное базовое решение с тонкой вставкой по периметру — практично и спокойно.',
    image: '/images/ceiling-types/standard-v5.webp',
    imageAlt: 'Гостиная со стандартным натяжным потолком, белой вставкой и точечными светильниками',
    href: '/ceiling-types/standard',
  },
] as const

/** Фото из галереи вида потолка: подпись под превью совпадает с alt. */
function galleryPhoto(slug: string, name: string, alt: string) {
  return { src: `/images/ceiling-types/${slug}-gallery/${name}.webp`, alt, caption: alt }
}

export const ceilingTypes: readonly CeilingTypeDetail[] = [
  {
    slug: 'shadow',
    title: 'Теневой потолок',
    metaDescription:
      'Теневой натяжной потолок: принцип решения, фотографии и особенности монтажа в Новосибирске.',
    heroImage: {
      src: '/images/projects/private-skyline.webp',
      alt: 'Светлая гостиная с теневым потолком и встроенными линиями света',
      caption: 'Теневой потолок в частном интерьере',
    },
    lead: 'Ровная тёмная линия по периметру отделяет потолок от стен и делает геометрию интерьера выразительнее.',
    intro: {
      eyebrow: 'Что это такое',
      title: 'Потолок, который не касается стен',
      paragraphs: [
        'Теневой потолок — это натяжная система со специальным профилем. Между полотном и стеной остаётся аккуратный тёмный зазор, поэтому потолок визуально выглядит отдельной плоскостью.',
        'Такое примыкание не требует декоративной вставки. Оно подчёркивает линии помещения и спокойно сочетается со встроенным светом, треками и нишами под шторы.',
      ],
      note: 'Лучше всего решение читается там, где важны чистая геометрия и точность каждой линии.',
    },
    gallery: {
      eyebrow: 'В интерьере',
      title: 'Тень работает как тонкая рамка',
      description:
        'Фотографии с наших объектов: теневое примыкание в гостиных, коридорах и санузлах — рядом со световыми линиями, треками и крупным планом узлов.',
      images: [
        galleryPhoto('shadow', 'kitchen-living-room', 'Кухня-гостиная с теневым потолком'),
        galleryPhoto('shadow', 'living-room-track', 'Гостиная с треком в потолке'),
        galleryPhoto('shadow', 'hallway-light-frame', 'Коридор со световой рамкой'),
        galleryPhoto('shadow', 'hallway-doors-light-frame', 'Световая рамка над дверями'),
        galleryPhoto('shadow', 'light-line-over-sofa', 'Световая линия над диваном'),
        galleryPhoto('shadow', 'broken-light-line', 'Световая линия с изломом'),
        galleryPhoto('shadow', 'light-line-relief-wall', 'Световая линия у рельефной стены'),
        galleryPhoto('shadow', 'light-line-wall-junction', 'Теневой зазор у рельефной стены'),
        galleryPhoto('shadow', 'light-line-by-window', 'Световая линия у окна'),
        galleryPhoto('shadow', 'track-by-window', 'Трек и теневой профиль'),
        galleryPhoto('shadow', 'dark-wall-shadow-gap', 'Теневой зазор у тёмной стены'),
        galleryPhoto('shadow', 'hallway-slats-pendants', 'Прихожая с рейками и подвесами'),
        galleryPhoto('shadow', 'pendants-wood-slats', 'Подвесы у деревянных реек'),
        galleryPhoto('shadow', 'bathroom-spotlights', 'Санузел с точечными светильниками'),
        galleryPhoto('shadow', 'bathroom-shadow-corner', 'Теневой угол в санузле'),
        galleryPhoto('shadow', 'bathroom-mirror', 'Теневой профиль в санузле'),
        galleryPhoto('shadow', 'shadow-corner-dark', 'Угол теневого профиля'),
        galleryPhoto('shadow', 'shadow-corner-closeup', 'Теневой угол крупным планом'),
        galleryPhoto('shadow', 'profile-before-canvas', 'Профиль до натяжения полотна'),
      ],
    },
    installation: {
      eyebrow: 'От проекта до сдачи',
      title: 'Монтаж теневого потолка',
      paragraphs: [
        'Результат начинается не с натяжения полотна, а с проверки проекта. Мы заранее согласуем уровень потолка, примыкания, свет, ниши и пересечения со смежными работами.',
        'Перед монтажом защищаем готовую отделку, собираем систему по технической карте и проверяем линию примыкания по всему периметру. Так интерьер сохраняет задуманную геометрию, а день сдачи проходит спокойно.',
      ],
      ctaLabel: 'Заказать потолок',
    },
  },
  {
    slug: 'gapless',
    title: 'Бесщелевой потолок',
    metaDescription:
      'Бесщелевой натяжной потолок без декоративной вставки: принцип решения, фотографии и монтаж в Новосибирске.',
    heroImage: {
      src: '/images/ceiling-types/gapless-gallery/bathroom-tile-corners.webp',
      alt: 'Бесщелевое примыкание к плитке',
      caption: 'Бесщелевой потолок в санузле',
    },
    lead: 'Полотно подходит вплотную к стене — без вставки и зазора. Потолок и стены сходятся в одну чистую линию.',
    intro: {
      eyebrow: 'Что это такое',
      title: 'Линия, которой почти не видно',
      paragraphs: [
        'Бесщелевой потолок — натяжная система, в которой полотно заправляется в профиль вплотную к стене. Декоративная вставка не нужна, а стык выглядит как обычное примыкание потолка к стене.',
        'Решение одинаково аккуратно смотрится рядом с обоями, плиткой, декоративной штукатуркой и стеновыми панелями.',
      ],
      note: 'Хороший выбор, когда потолок не должен спорить с отделкой стен.',
    },
    gallery: {
      eyebrow: 'В интерьере',
      title: 'Стык, который не отвлекает',
      description:
        'Фотографии с наших объектов: примыкание к обоям, плитке и декоративной отделке, у окон и в нишах со скрытой подсветкой.',
      images: [
        galleryPhoto('gapless', 'bathroom-tile-corners', 'Примыкание к плитке в санузле'),
        galleryPhoto('gapless', 'tile-junction-closeup', 'Стык с плиткой крупно'),
        galleryPhoto('gapless', 'track-under-clerestory', 'Трек у верхних окон'),
        galleryPhoto('gapless', 'room-surface-spotlights', 'Комната с накладными светильниками'),
        galleryPhoto('gapless', 'niche-by-door', 'Короб у дверного проёма'),
        galleryPhoto('gapless', 'textured-wallpaper-corner', 'Угол с фактурными обоями'),
        galleryPhoto('gapless', 'textured-wallpaper-junction', 'Стык с фактурными обоями'),
        galleryPhoto('gapless', 'sketch-wallpaper-junction', 'Примыкание к графичным обоям'),
        galleryPhoto('gapless', 'floral-wallpaper-junction', 'Примыкание к ярким обоям'),
        galleryPhoto('gapless', 'decorative-finish-corner', 'Угол с декоративной отделкой'),
        galleryPhoto('gapless', 'light-line-moldings', 'Световая линия и молдинги'),
        galleryPhoto('gapless', 'window-cove-light', 'Подсветка в нише у окна'),
        galleryPhoto('gapless', 'window-cove-light-closeup', 'Ниша с подсветкой крупно'),
      ],
    },
    installation: {
      eyebrow: 'От проекта до сдачи',
      title: 'Монтаж бесщелевого потолка',
      paragraphs: [
        'Без вставки стык виден таким, какой он есть, поэтому точность закладываем заранее: согласуем уровень потолка, проверяем геометрию стен и порядок отделочных работ.',
        'Перед монтажом защищаем готовую отделку, крепим профиль по технической карте и заправляем полотно по всему периметру. Ровная линия примыкания — главный критерий сдачи.',
      ],
      ctaLabel: 'Заказать потолок',
    },
  },
  {
    slug: 'floating',
    title: 'Парящий потолок',
    metaDescription:
      'Парящий натяжной потолок со скрытой подсветкой по периметру: принцип решения, фотографии и монтаж в Новосибирске.',
    heroImage: {
      src: '/images/ceiling-types/floating-gallery/cove-light-track.webp',
      alt: 'Парящий контур с подсветкой',
      caption: 'Парящий потолок со скрытой подсветкой',
    },
    lead: 'Скрытая лента по периметру отрывает полотно от стен: потолок будто висит в воздухе, а комнату наполняет мягкий свет.',
    intro: {
      eyebrow: 'Что это такое',
      title: 'Свет вместо границы',
      paragraphs: [
        'Парящий потолок — натяжная система со специальным профилем, в который встроена светодиодная лента. Свет выходит из узкого зазора между полотном и стеной, а сам источник не виден.',
        'Подсветка может работать как основной вечерний сценарий или дополнять треки, световые линии и точечные светильники.',
      ],
      note: 'Особенно хорошо смотрится в спальнях, гостиных и санузлах, где нужен спокойный рассеянный свет.',
    },
    gallery: {
      eyebrow: 'В интерьере',
      title: 'Плоскость, которая светится по краю',
      description:
        'Наши визуализации и фотографии с объектов: подсветка по периметру в комнатах и санузлах, вместе с треками и световыми линиями, крупные планы и этапы монтажа.',
      images: [
        galleryPhoto('floating', 'bedroom-stone-wall-render', 'Визуализация спальни с подсветкой'),
        galleryPhoto('floating', 'bedroom-window-render', 'Визуализация спальни у окна'),
        galleryPhoto('floating', 'tv-wall-render', 'Визуализация ТВ-зоны с подсветкой'),
        galleryPhoto('floating', 'bathroom-glow', 'Ванная с парящим потолком'),
        galleryPhoto('floating', 'room-light-lines', 'Комната со световыми линиями'),
        galleryPhoto('floating', 'room-light-lines-angle', 'Световые линии и подсветка контура'),
        galleryPhoto('floating', 'starry-ceiling-glow', 'Звёздное небо с подсветкой'),
        galleryPhoto('floating', 'cove-light-track', 'Подсветка и трек в потолке'),
        galleryPhoto('floating', 'cove-light-shadow-line', 'Подсветка и теневая линия'),
        galleryPhoto('floating', 'light-line-beside-cove', 'Световая линия рядом с подсветкой'),
        galleryPhoto('floating', 'cool-line-warm-cove', 'Холодная линия и тёплый контур'),
        galleryPhoto('floating', 'glow-by-glass-partition', 'Подсветка у стеклянной перегородки'),
        galleryPhoto('floating', 'glow-along-wall', 'Подсветка вдоль стены'),
        galleryPhoto('floating', 'glow-relief-tile', 'Подсветка у рельефной плитки'),
        galleryPhoto('floating', 'glow-dark-room', 'Контур в тёмной комнате'),
        galleryPhoto('floating', 'shower-turquoise-glow', 'Бирюзовая подсветка в душевой'),
        galleryPhoto('floating', 'corner-glow', 'Угол с подсветкой'),
        galleryPhoto('floating', 'light-gap-closeup', 'Световой зазор крупно'),
        galleryPhoto('floating', 'light-corner-closeup', 'Угол подсветки крупно'),
        galleryPhoto('floating', 'glow-wall-closeup', 'Подсветка у стены крупно'),
        galleryPhoto('floating', 'room-before-finish', 'Комната до чистовой отделки'),
        galleryPhoto('floating', 'room-floor-protected', 'Комната с укрытым полом'),
        galleryPhoto('floating', 'floating-panel-installation', 'Парящая плоскость при монтаже'),
        galleryPhoto('floating', 'frame-installation', 'Монтаж парящего короба'),
      ],
    },
    installation: {
      eyebrow: 'От проекта до сдачи',
      title: 'Монтаж парящего потолка',
      paragraphs: [
        'Ровное свечение зависит от подготовки: заранее закладываем питание и блоки, выбираем ленту и цветовую температуру, согласуем сценарии света с дизайнером и электриком.',
        'Перед монтажом защищаем готовую отделку, ставим профиль по технической карте и проверяем подсветку по всему периметру — без пересветов, провалов и видимых точек.',
      ],
      ctaLabel: 'Заказать потолок',
    },
  },
  {
    slug: 'standard',
    title: 'Стандартный потолок',
    metaDescription:
      'Стандартный натяжной потолок с тонкой вставкой по периметру: принцип решения, фотографии и монтаж в Новосибирске.',
    heroImage: {
      src: '/images/ceiling-types/standard-gallery/track-corner.webp',
      alt: 'Стандартный потолок с треком',
      caption: 'Стандартный потолок с трековым светом',
    },
    lead: 'Проверенное базовое решение: тонкая вставка по периметру закрывает примыкание, а потолок остаётся ровным и спокойным.',
    intro: {
      eyebrow: 'Что это такое',
      title: 'Просто и аккуратно',
      paragraphs: [
        'Стандартный потолок — натяжная система с декоративной вставкой, которая закрывает технологический зазор между полотном и стеной. Вставка тонкая и подбирается в цвет потолка.',
        'В такой потолок так же встраиваются треки, светильники, вентиляция и карнизы — базовое решение не ограничивает проект.',
      ],
      note: 'Разумный выбор, когда нужен надёжный ровный потолок без сложных узлов.',
    },
    gallery: {
      eyebrow: 'В интерьере',
      title: 'Ровная плоскость без лишнего',
      description:
        'Фотографии с наших объектов: стандартный потолок с треками, карнизом и вентиляцией, примыкания к обоям, штукатурке и плитке.',
      images: [
        galleryPhoto('standard', 'track-living-room', 'Комната с трековым светом'),
        galleryPhoto('standard', 'track-over-wardrobe', 'Трек над шкафом'),
        galleryPhoto('standard', 'track-corner', 'Угол трековой системы'),
        galleryPhoto('standard', 'curtain-rail-by-window', 'Потолочный карниз у окна'),
        galleryPhoto('standard', 'curtain-niche-insert', 'Ниша под шторы со вставкой'),
        galleryPhoto('standard', 'white-insert-corner', 'Угол с белой вставкой'),
        galleryPhoto('standard', 'plaster-wall-corner', 'Угол с декоративной штукатуркой'),
        galleryPhoto('standard', 'vent-floral-wallpaper', 'Вентиляция у цветочных обоев'),
        galleryPhoto('standard', 'tile-wall-junction', 'Примыкание к плитке'),
        galleryPhoto('standard', 'tile-corner', 'Угол у плиточной стены'),
        galleryPhoto('standard', 'installer-at-work', 'Монтажник за работой'),
      ],
    },
    installation: {
      eyebrow: 'От проекта до сдачи',
      title: 'Монтаж стандартного потолка',
      paragraphs: [
        'Даже в базовом решении результат зависит от подготовки: заранее согласуем уровень потолка, места светильников, вентиляции и карнизов.',
        'Перед монтажом защищаем готовую отделку, собираем систему по технической карте и проверяем примыкание по всему периметру, чтобы день сдачи прошёл спокойно.',
      ],
      ctaLabel: 'Заказать потолок',
    },
  },
  {
    slug: 'luminous',
    title: 'Световой потолок',
    metaDescription:
      'Световой натяжной потолок из полупрозрачного полотна с подсветкой: принцип решения, фотографии и монтаж в Новосибирске.',
    heroImage: {
      src: '/images/ceiling-types/luminous-gallery/bathroom-round-light.webp',
      alt: 'Санузел с круглым световым потолком',
      caption: 'Световой круг в санузле',
      position: 'center 6%',
    },
    lead: 'Полотно само становится источником света: ровное мягкое свечение без видимых ламп и бликов.',
    intro: {
      eyebrow: 'Что это такое',
      title: 'Свет на всю плоскость',
      paragraphs: [
        'Световой потолок — полупрозрачное натяжное полотно, над которым равномерно разложены светодиодные ленты. Свет проходит сквозь полотно и рассеивается, поэтому плоскость светится ровно, без точек и пятен.',
        'Светиться может весь потолок или его часть: круг над ванной, панель в кабинете, полоса вдоль стены. На полотно можно нанести рисунок — он проявится при включённом свете.',
      ],
      note: 'Уместен там, где нужно много мягкого света: в санузлах, гардеробных, кабинетах и комнатах без окон.',
    },
    gallery: {
      eyebrow: 'В интерьере',
      title: 'Свет без видимых источников',
      description:
        'Фотографии с наших объектов: световые круги и панели в санузлах, кабинете и спальне, потолок с печатью и светодиоды до натяжения полотна.',
      images: [
        galleryPhoto('luminous', 'bathroom-round-light', 'Санузел с круглым световым потолком'),
        galleryPhoto('luminous', 'toilet-round-light', 'Круглый свет в санузле'),
        galleryPhoto('luminous', 'shower-round-light-on', 'Световой круг над душем'),
        galleryPhoto('luminous', 'shower-round-light-off', 'Световой круг без подсветки'),
        galleryPhoto('luminous', 'printed-rose-ceiling', 'Световой потолок с печатью'),
        galleryPhoto('luminous', 'office-light-panel', 'Световой потолок в кабинете'),
        galleryPhoto('luminous', 'room-light-panel', 'Световая панель в комнате'),
        galleryPhoto('luminous', 'bathroom-light-panel', 'Световая плоскость в санузле'),
        galleryPhoto('luminous', 'light-panel-angle', 'Световая плоскость под углом'),
        galleryPhoto('luminous', 'round-light-led-grid', 'Светодиоды под световым кругом'),
        galleryPhoto('luminous', 'office-led-strips', 'Ленты до натяжения полотна'),
      ],
    },
    installation: {
      eyebrow: 'От проекта до сдачи',
      title: 'Монтаж светового потолка',
      paragraphs: [
        'Ровное свечение закладывается в проекте: рассчитываем шаг лент и расстояние до полотна, подбираем цветовую температуру и место для блоков питания с доступом для обслуживания.',
        'Перед монтажом защищаем готовую отделку, раскладываем ленты по технической карте и проверяем свечение до натяжения полотна — чтобы после сдачи не было пятен и полос.',
      ],
      ctaLabel: 'Заказать потолок',
    },
  },
] as const

export function getCeilingTypeBySlug(slug: string) {
  return ceilingTypes.find((ceilingType) => ceilingType.slug === slug)
}
