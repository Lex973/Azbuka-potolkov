# Инструкции для работы с проектом

Перед любыми изменениями обязательно полностью прочитать:

1. `PROJECT_CONTEXT.md` — бизнес-контекст, позиционирование, аудитория и визуальное направление.
2. `DEVELOPMENT_RULES.md` — утверждённый технологический стек, структура и правила разработки.

`DEVELOPMENT_RULES.md` является основным источником технических решений для проекта. Следовать ему во всех задачах, если пользователь явно не изменил конкретное правило более новым указанием.

Не превращать предварительные сведения из `PROJECT_CONTEXT.md` в утверждённое техническое задание. Конкретная структура страниц, секции, тексты, анимации и поведение определяются последующими задачами пользователя.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
