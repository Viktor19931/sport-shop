import React, { useState } from 'react';
import Button from '../Button';

import FormInputField from '../FormInputField/FormInputField';

import * as styles from './Contact.module.css';

const Contact = (props) => {
  const initialState = {
    name: '',
    phone: '',
    email: '',
    comment: '',
  };

  const [contactForm, setContactForm] = useState(initialState);

  const handleChange = (id, e) => {
    const tempForm = { ...contactForm, [id]: e };
    setContactForm(tempForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setContactForm(initialState);
  };

  return (
    <div className={styles.root}>
      <div className={styles.section}>
        <h4>Надішліть нам повідомлення</h4>
        <p>
          Наша команда обслуговування клієнтів готова відповісти на всі
          запитання з понеділка по п’ятницю з 9:00–20:00.
        </p>
        <p>Ми з нетерпінням чекаємо на вашу думку.</p>
      </div>

      <div className={styles.section}>
        <h4>Телефон</h4>
        <p>+380 (97) 8865161</p>
        <p>З понеділка по п’ятницю з 9:00 до 20:00</p>
      </div>

      <div className={styles.section}>
        <h4>Електронна пошта</h4>
        <p>
          Ви можете надіслати електронного листа нашій команді обслуговування
          клієнтів за адресою elite_sport@gmail.com або через контактну форму
          нижче
        </p>
      </div>

      <div className={styles.contactContainer}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.contactForm}>
            <FormInputField
              id={'name'}
              value={contactForm.name}
              handleChange={(id, e) => handleChange(id, e)}
              type={'text'}
              labelName={"Повне ім'я"}
              required
            />
            <FormInputField
              id={'phone'}
              value={contactForm.phone}
              handleChange={(id, e) => handleChange(id, e)}
              type={'number'}
              labelName={'Номер телефону'}
              required
            />
            <FormInputField
              id={'email'}
              value={contactForm.email}
              handleChange={(id, e) => handleChange(id, e)}
              type={'email'}
              labelName={'Електронна пошта'}
              required
            />
            <div className={styles.commentInput}>
              <FormInputField
                id={'comment'}
                value={contactForm.comment}
                handleChange={(id, e) => handleChange(id, e)}
                type={'textarea'}
                labelName={'Коментарі / Питання'}
                required
              />
            </div>
          </div>
          <Button
            className={styles.customButton}
            level={'primary'}
            type={'buttonSubmit'}
          >
            Надіслати
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
