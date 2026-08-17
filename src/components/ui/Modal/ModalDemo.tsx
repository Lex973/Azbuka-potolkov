'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/Button/Button'
import { TextAreaField, TextField } from '@/components/ui/FormField/FormField'
import { Modal } from '@/components/ui/Modal/Modal'

import styles from './ModalDemo.module.css'

export function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button showArrow size="large" onClick={() => setIsOpen(true)}>
        Открыть форму
      </Button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        eyebrow="Обсудить проект"
        title="Начнём с вашего проекта"
      >
        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault()
            setIsOpen(false)
          }}
        >
          <TextField id="modal-name" label="Имя" placeholder="Как к вам обращаться" />
          <TextField
            id="modal-phone"
            label="Телефон"
            type="tel"
            autoComplete="tel"
            placeholder="+7 999 000-00-00"
          />
          <TextAreaField
            id="modal-message"
            label="О проекте"
            placeholder="Коротко расскажите о задаче"
          />
          <Button showArrow size="large" type="submit">
            Отправить заявку
          </Button>
          <p className={styles.note}>Демонстрация формы. Отправка данных пока не подключена.</p>
        </form>
      </Modal>
    </>
  )
}
