import type { Project } from '@/types/project'

export const privateProjects: Project[] = [
  {
    slug: 'skyline-apartment',
    category: 'Частный интерьер',
    objectType: 'КП Малые Поляны',
    title: 'Квартира над городом',
    area: '135 м²',
    year: '2024',
    duration: '20 дней',
    description:
      'Единая спокойная плоскость объединила гостиную и кухню. Треки, ниши и встроенный свет согласовали ещё на чертежах.',
    image: '/images/projects/skyline-apartment/main.webp',
    imageAlt: 'Кухня-гостиная с островом, линейными светильниками и трековым светом в потолке',
    details: [
      {
        image: '/images/projects/skyline-apartment/detail-1.webp',
        alt: 'Входная зона с деревянными панелями, скамьёй и линейным светом в потолке',
      },
      {
        image: '/images/projects/skyline-apartment/detail-2.webp',
        alt: 'Гардеробная со встроенной подсветкой полок и точечным светильником',
      },
      {
        image: '/images/projects/skyline-apartment/detail-3.webp',
        alt: 'Трековая линия и подвесной светильник над обеденным столом',
      },
    ],
    gallery: [
      {
        src: '/images/projects/skyline-apartment/gallery-01.webp',
        alt: 'Душевая зона с тёмной каменной плиткой и скрытой подсветкой ниши',
      },
      {
        src: '/images/projects/skyline-apartment/gallery-02.webp',
        alt: 'Декоративное рельефное панно с подсветкой рядом со шторами',
      },
      {
        src: '/images/projects/skyline-apartment/gallery-03.webp',
        alt: 'Прихожая с рельефным панно и скрытой линией света у стены',
      },
      {
        src: '/images/projects/skyline-apartment/gallery-04.webp',
        alt: 'Коридор с межкомнатными дверями и встроенными точечными светильниками',
      },
      {
        src: '/images/projects/skyline-apartment/gallery-05.webp',
        alt: 'Рельефное панно с контурной подсветкой по потолку и стене',
      },
      {
        src: '/images/projects/skyline-apartment/gallery-06.webp',
        alt: 'Кухня-гостиная с островом, обеденным столом и подвесным светильником',
      },
      {
        src: '/images/projects/skyline-apartment/gallery-07.webp',
        alt: 'Кухонный остров с вытяжкой и трековым освещением над обеденной зоной',
      },
      {
        src: '/images/projects/skyline-apartment/gallery-08.webp',
        alt: 'Обеденная зона с крупным подвесом и трековой линией в потолке',
      },
      {
        src: '/images/projects/skyline-apartment/gallery-09.webp',
        alt: 'Обеденный стол с креслами терракотового цвета в дневном свете',
      },
      {
        src: '/images/projects/skyline-apartment/gallery-10.webp',
        alt: 'Рабочая зона кухни с мойкой, встроенной техникой и подсветкой фартука',
      },
      {
        src: '/images/projects/skyline-apartment/gallery-11.webp',
        alt: 'Кухня с мраморным фартуком, встроенной вытяжкой и трековым светом',
      },
      {
        src: '/images/projects/skyline-apartment/gallery-12.webp',
        alt: 'Открытые полки и тёмные фасады кухни с линейным освещением',
      },
      {
        src: '/images/projects/skyline-apartment/gallery-13.webp',
        alt: 'Холл с трековыми светильниками и нишей с открытыми полками',
      },
      {
        src: '/images/projects/skyline-apartment/gallery-14.webp',
        alt: 'Коридор с высокими шкафами и проходом в кухню',
      },
    ],
    features: ['Теневой профиль', 'Встроенный трек', 'Ниша под шторы'],
  },
  {
    slug: 'shadow-contour-apartment',
    objectType: 'ЖК Европейский',
    title: 'Теневой контур',
    area: '52 м²',
    year: '2025',
    duration: '6 дней монтажа',
    description:
      'Теневой профиль по всему периметру: потолок отделён от стен ровной линией, без плинтуса и без багета. Вентиляцию и электрику развели до монтажа, поэтому плоскость осталась чистой.',
    image: '/images/projects/shadow-contour-apartment/main.webp',
    imageAlt: 'Гостиная с ТВ-зоной, деревянными панелями и ровной плоскостью потолка',
    details: [
      {
        image: '/images/projects/shadow-contour-apartment/bedroom-visualization.webp',
        alt: 'Визуализация спальни с деревянными панелями и встроенным трековым светом',
      },
      {
        image: '/images/projects/shadow-contour-apartment/tv-wall-visualization.webp',
        alt: 'Визуализация ТВ-зоны с подвесной тумбой, зеркалом и встроенным светом',
      },
      {
        image: '/images/projects/shadow-contour-apartment/kitchen-living-visualization.webp',
        alt: 'Визуализация кухни-гостиной с зелёным диваном, трековым и точечным светом',
      },
    ],
    gallery: [
      {
        src: '/images/projects/shadow-contour-apartment/hallway-visualization.webp',
        alt: 'Визуализация прихожей с деревянными панелями, зеркалом и скрытой подсветкой',
      },
      {
        src: '/images/projects/shadow-contour-apartment/shadow-profile-junction.webp',
        alt: 'Теневое примыкание потолка к стене у оконного проёма крупным планом',
      },
      {
        src: '/images/projects/shadow-contour-apartment/shadow-profile-corner.webp',
        alt: 'Угол потолка с теневым профилем крупным планом',
      },
      {
        src: '/images/projects/shadow-contour-apartment/detail-3.webp',
        alt: 'Примыкание потолка к каменной поверхности через теневой зазор',
      },
      {
        src: '/images/projects/shadow-contour-apartment/gallery-03.webp',
        alt: 'Визуализация гостиной с диваном, стеллажом и встроенной подсветкой',
      },
      {
        src: '/images/projects/shadow-contour-apartment/gallery-14.webp',
        alt: 'Готовый потолок со скрытой подсветкой вдоль стены',
      },
      {
        src: '/images/projects/shadow-contour-apartment/gallery-01.webp',
        alt: 'Готовое теневое примыкание потолка к стене',
      },
      {
        src: '/images/projects/shadow-contour-apartment/gallery-02.webp',
        alt: 'Круглый диффузор приточной вентиляции в плоскости потолка',
      },
      {
        src: '/images/projects/shadow-contour-apartment/gallery-06.webp',
        alt: 'Помещение подготовлено к монтажу: защитная плёнка и инструмент',
      },
      {
        src: '/images/projects/shadow-contour-apartment/gallery-05.webp',
        alt: 'Проверка линии потолка лазерным уровнем',
      },
      {
        src: '/images/projects/shadow-contour-apartment/gallery-09.webp',
        alt: 'Электрика и вентиляция в межпотолочном пространстве',
      },
      {
        src: '/images/projects/shadow-contour-apartment/gallery-07.webp',
        alt: 'Вывод вентиляции и разведённые трассы над потолком',
      },
      {
        src: '/images/projects/shadow-contour-apartment/gallery-08.webp',
        alt: 'Инженерные трассы над смонтированным потолочным коробом',
      },
      {
        src: '/images/projects/shadow-contour-apartment/gallery-11.webp',
        alt: 'Смонтированный каркас потолка с выводом вентиляции',
      },
      {
        src: '/images/projects/shadow-contour-apartment/gallery-13.webp',
        alt: 'Монтаж потолочного короба у оконного проёма',
      },
      {
        src: '/images/projects/shadow-contour-apartment/gallery-12.webp',
        alt: 'Ниша под встроенный шкаф в процессе монтажа потолка',
      },
      {
        src: '/images/projects/shadow-contour-apartment/gallery-04.webp',
        alt: 'Угловой узел теневого профиля до натяжения полотна',
      },
      {
        src: '/images/projects/shadow-contour-apartment/gallery-10.webp',
        alt: 'Угол потолочного короба с чёрным теневым профилем',
      },
      {
        src: '/images/projects/shadow-contour-apartment/apartment-floor-plan.webp',
        alt: 'План квартиры с расстановкой мебели и размерами помещений',
      },
      {
        src: '/images/projects/shadow-contour-apartment/apartment-layout-3d.webp',
        alt: 'Объёмная планировка квартиры с расстановкой мебели',
      },
      {
        src: '/images/projects/shadow-contour-apartment/ceiling-plan.webp',
        alt: 'План потолков с нишами под шторы, профилями подсветки и вентиляцией',
      },
    ],
    features: ['Теневой профиль', 'Скрытая инженерия', 'Лазерная разметка'],
  },
  {
    slug: 'cornice-light-apartment',
    category: 'Частный интерьер',
    objectType: 'ЖК Сакура',
    title: 'Свет в карнизе',
    area: '95 м²',
    year: '2025',
    duration: '10 дней монтажа',
    description:
      'Классические карнизы и скруглённые переходы держат геометрию комнат, а подсветка убрана в нишу: свет читается, источник не виден.',
    image: '/images/projects/cornice-light-apartment/bedroom-main.webp',
    imageAlt: 'Спальня с молдингами, встроенным треком и подвесными светильниками у кровати',
    details: [
      {
        image: '/images/projects/cornice-light-apartment/detail-1.webp',
        alt: 'Стык потолочных плоскостей с ровным теневым швом',
      },
      {
        image: '/images/projects/cornice-light-apartment/detail-2.webp',
        alt: 'Скруглённый угол потолка с профилем и молдингом',
      },
      {
        image: '/images/projects/cornice-light-apartment/detail-3.webp',
        alt: 'Ниша со скрытой тёплой подсветкой в потолке',
      },
    ],
    gallery: [
      {
        src: '/images/projects/cornice-light-apartment/mirrored-hallway-ceiling.webp',
        alt: 'Прихожая с зеркальным шкафом и круглым потолочным светильником',
      },
      {
        src: '/images/projects/cornice-light-apartment/hallway-recessed-lights.webp',
        alt: 'Коридор с парными точечными светильниками и скруглёнными стенами',
      },
      {
        src: '/images/projects/cornice-light-apartment/kitchen-passage-lighting.webp',
        alt: 'Проход к гостиной с точечными светильниками и подсветкой у окна',
      },
      {
        src: '/images/projects/cornice-light-apartment/kitchen-living-gold-track.webp',
        alt: 'Кухня-гостиная с золотым потолочным треком и хрустальным подвесом',
      },
      {
        src: '/images/projects/cornice-light-apartment/living-room-curved-track.webp',
        alt: 'Гостиная с синим диваном и изогнутым золотым треком на потолке',
      },
      {
        src: '/images/projects/cornice-light-apartment/childrens-room-lighting.webp',
        alt: 'Детская комната с рисунком космонавта и подсветкой вдоль стены',
      },
      {
        src: '/images/projects/cornice-light-apartment/room-ceiling-cove.webp',
        alt: 'Комната с рабочим столом, диваном и скрытой подсветкой потолка',
      },
      {
        src: '/images/projects/cornice-light-apartment/bedroom-track-light.webp',
        alt: 'Спальня с тонким встроенным треком над кроватью и молдингами на стене',
      },
      {
        src: '/images/projects/cornice-light-apartment/dining-room-chandelier.webp',
        alt: 'Обеденная зона с хрустальной люстрой и потолочным треком',
      },
      {
        src: '/images/projects/cornice-light-apartment/gallery-01.webp',
        alt: 'Потолок со встроенными светильниками над линией шкафов',
      },
      {
        src: '/images/projects/cornice-light-apartment/gallery-02.webp',
        alt: 'Коридор со скруглёнными переходами потолка и встроенным светом',
      },
      {
        src: '/images/projects/cornice-light-apartment/gallery-03.webp',
        alt: 'Проход с тёмной дверью и точечными светильниками в потолке',
      },
      {
        src: '/images/projects/cornice-light-apartment/gallery-04.webp',
        alt: 'Стык потолочных панелей с ровным теневым швом крупным планом',
      },
      {
        src: '/images/projects/cornice-light-apartment/gallery-05.webp',
        alt: 'Каскадная люстра на фоне ровной плоскости потолка',
      },
      {
        src: '/images/projects/cornice-light-apartment/gallery-06.webp',
        alt: 'Потолок у окна со скруглённым примыканием к стене',
      },
      {
        src: '/images/projects/cornice-light-apartment/gallery-07.webp',
        alt: 'Профиль карниза крупным планом',
      },
      {
        src: '/images/projects/cornice-light-apartment/gallery-08.webp',
        alt: 'Комната с трековым светом и видом на кухонную зону',
      },
      {
        src: '/images/projects/cornice-light-apartment/gallery-09.webp',
        alt: 'Угол ниши с тёплой скрытой подсветкой',
      },
      {
        src: '/images/projects/cornice-light-apartment/gallery-10.webp',
        alt: 'Кухня-гостиная со встроенным светом и скрытым кондиционером',
      },
      {
        src: '/images/projects/cornice-light-apartment/gallery-11.webp',
        alt: 'Ниша со скрытой подсветкой вдоль оконного проёма',
      },
      {
        src: '/images/projects/cornice-light-apartment/gallery-12.webp',
        alt: 'Монтаж: скруглённый угол натяжного полотна',
      },
      {
        src: '/images/projects/cornice-light-apartment/gallery-13.webp',
        alt: 'Монтаж: профиль и электрика в межпотолочном пространстве',
      },
      {
        src: '/images/projects/cornice-light-apartment/gallery-14.webp',
        alt: 'Монтаж: угловой профиль до натяжения полотна',
      },
      {
        src: '/images/projects/cornice-light-apartment/gallery-15.webp',
        alt: 'Этапы монтажа потолка: профиль, электрика и готовый угол',
      },
    ],
    features: ['Карнизный контур', 'Скрытая подсветка', 'Скруглённые примыкания'],
  },
]

export const commercialProjects: Project[] = [
  {
    slug: 'conference-hall',
    category: 'Коммерческий объект',
    objectType: 'Конференц зал',
    title: 'Конференц-зал',
    area: '170 м²',
    year: '2024',
    duration: '30 дней монтажа',
    description:
      'Ровную плоскость потолка дополнили линейным светом, встроенной вентиляцией и центральной зоной «звёздное небо».',
    image: '/images/projects/conference-hall/starry-ceiling-main.webp',
    imageAlt: 'Конференц-зал с рядами кресел и потолочной зоной «звёздное небо»',
    pageImage: '/images/projects/conference-hall/concept-conference-overview.webp',
    pageImageAlt: 'Визуализация конференц-зала с овальным столом и потолком «звёздное небо»',
    details: [
      {
        image: '/images/projects/conference-hall/conference-room-overview.webp',
        alt: 'Конференц-зал с рядами кресел, встроенными светильниками и вентиляцией',
      },
      {
        image: '/images/projects/conference-hall/starry-ceiling-reverse.webp',
        alt: 'Вид на потолок «звёздное небо» и линейную подсветку конференц-зала',
      },
      {
        image: '/images/projects/conference-hall/illuminated-awards-wall.webp',
        alt: 'Стена с наградами и тёплой подсветкой полок',
      },
    ],
    gallery: [
      {
        src: '/images/projects/conference-hall/concept-conference-overview.webp',
        alt: 'Визуализация конференц-зала с овальным столом и потолком «звёздное небо»',
      },
      {
        src: '/images/projects/conference-hall/concept-conference-side-view.webp',
        alt: 'Визуализация конференц-зала с рядами кресел и линейным светом',
      },
      {
        src: '/images/projects/conference-hall/concept-audience-view.webp',
        alt: 'Визуализация вида из переговорной зоны на ряды кресел',
      },
      {
        src: '/images/projects/conference-hall/concept-stage-wall.webp',
        alt: 'Визуализация стены зала с подсвеченными полками',
      },
      {
        src: '/images/projects/conference-hall/finished-starry-ceiling.webp',
        alt: 'Готовый потолок конференц-зала со звёздным небом и контурной подсветкой',
      },
      {
        src: '/images/projects/conference-hall/finished-linear-ceiling.webp',
        alt: 'Световые линии на готовом потолке конференц-зала',
      },
      {
        src: '/images/projects/conference-hall/linear-lighting-installation.webp',
        alt: 'Монтаж линейного освещения над конференц-залом',
      },
      {
        src: '/images/projects/conference-hall/led-line-profile.webp',
        alt: 'Узел световой линии и потолочного профиля',
      },
      {
        src: '/images/projects/conference-hall/ceiling-wall-lighting-junction.webp',
        alt: 'Стык потолочной конструкции и подсветки стены',
      },
      {
        src: '/images/projects/conference-hall/wall-light-line-detail.webp',
        alt: 'Вертикальная световая линия на деревянной стене',
      },
      {
        src: '/images/projects/conference-hall/starry-ceiling-installation-front.webp',
        alt: 'Монтаж полотна звёздного потолка в конференц-зале',
      },
      {
        src: '/images/projects/conference-hall/ceiling-frame-ventilation.webp',
        alt: 'Каркас потолка и встроенная вентиляция во время монтажа',
      },
      {
        src: '/images/projects/conference-hall/fiber-optic-strands.webp',
        alt: 'Нити оптоволокна для потолка «звёздное небо»',
      },
      {
        src: '/images/projects/conference-hall/ceiling-frame-workers.webp',
        alt: 'Монтаж каркаса потолка и световых линий',
      },
      {
        src: '/images/projects/conference-hall/ceiling-lighting-plan.webp',
        alt: 'План потолка конференц-зала с линиями освещения',
      },
      {
        src: '/images/projects/conference-hall/conference-furniture-plan.webp',
        alt: 'План расстановки мебели в конференц-зале',
      },
      {
        src: '/images/projects/conference-hall/hall-before-installation.webp',
        alt: 'Конференц-зал до монтажа потолка',
      },
      {
        src: '/images/projects/conference-hall/linear-lighting-before-ceiling.webp',
        alt: 'Световые линии и открытый каркас до установки потолка',
      },
      {
        src: '/images/projects/conference-hall/led-lines-before-ceiling.webp',
        alt: 'Световые линии на открытой потолочной конструкции',
      },
      {
        src: '/images/projects/conference-hall/ventilation-unit-detail.webp',
        alt: 'Вентиляционный блок внутри потолочной конструкции',
      },
      {
        src: '/images/projects/conference-hall/ceiling-frame-before-cladding.webp',
        alt: 'Каркас потолка с проводкой во время монтажа',
      },
      {
        src: '/images/projects/conference-hall/wide-ceiling-installation.webp',
        alt: 'Общий вид монтажа световых линий и потолочного каркаса',
      },
      {
        src: '/images/projects/conference-hall/partial-black-ceiling-installation.webp',
        alt: 'Монтаж чёрного полотна звёздного потолка',
      },
      {
        src: '/images/projects/conference-hall/starry-ceiling-installation-angle.webp',
        alt: 'Звёздный потолок в процессе монтажа с другого ракурса',
      },
    ],
    features: ['Встроенный свет и вентиляция', 'Потолок «звёздное небо»', 'Подсветка экспозиции'],
  },
  {
    slug: 'executive-offices',
    category: 'Коммерческий объект',
    objectType: 'Кабинеты руководителей с комнатами отдыха',
    title: 'Кабинеты руководителей с комнатами отдыха',
    area: '202 м²',
    year: '2024',
    duration: '28 дней монтажа',
    description:
      'В кабинетах руководителей световые линии, встроенные светильники и мягкая подсветка подчёркивают геометрию потолка.',
    image: '/images/projects/executive-offices/executive-office-main.webp',
    imageAlt: 'Кабинет руководителя с переговорным столом и геометричным освещением потолка',
    details: [
      {
        image: '/images/projects/executive-offices/classic-executive-office.webp',
        alt: 'Классический кабинет руководителя со встроенными потолочными светильниками',
      },
      {
        image: '/images/projects/executive-offices/office-library.webp',
        alt: 'Кабинет с подсвеченными книжными шкафами и точечными светильниками',
      },
      {
        image: '/images/projects/executive-offices/executive-office-meeting-area.webp',
        alt: 'Рабочая и переговорная зоны кабинета с линейной подсветкой потолка',
      },
    ],
    features: ['Линейный свет', 'Встроенные светильники', 'Контурная подсветка'],
  },
]

export const projects: readonly Project[] = [...privateProjects, ...commercialProjects]

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug)
}
