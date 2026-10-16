type JsonLdProps = {
  data: object
}

/** Структурированные данные schema.org. `<` экранируется, чтобы текст не закрыл тег script. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\u003c') }}
    />
  )
}
