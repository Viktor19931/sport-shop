import React, { useContext, useState } from 'react';
import Button from '../Button';

import FormInputField from '../FormInputField/FormInputField';

import * as styles from './Contact.module.css';
import { LocalizationContext } from '../../context/localizationContext';

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

  const { t } = useContext(LocalizationContext);

  return (
    <div className={styles.root}>
      <div className={styles.section}>
        <h4>{t('CONTACT_US_PAGE.sendMessageTitle')}</h4>
        <p
          dangerouslySetInnerHTML={{ __html: t('CONTACT_US_PAGE.description') }}
        />
      </div>

      <div className={styles.section}>
        <h4>{t('CONTACT_US_PAGE.phoneTitle')}</h4>
        <p
          dangerouslySetInnerHTML={{
            __html: t('CONTACT_US_PAGE.contactDetails'),
          }}
        />
      </div>

      <div className={styles.section}>
        <h4>{t('CONTACT_US_PAGE.emailTitle')}</h4>

        <p
          dangerouslySetInnerHTML={{
            __html: t('CONTACT_US_PAGE.emailContact'),
          }}
        />
      </div>

      <div className={styles.contactContainer}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.contactForm}>
            <FormInputField
              id={'name'}
              value={contactForm.name}
              handleChange={(id, e) => handleChange(id, e)}
              type={'text'}
              labelName={'CONTACT_US_PAGE.form.name'}
              required
            />
            <FormInputField
              id={'phone'}
              value={contactForm.phone}
              handleChange={(id, e) => handleChange(id, e)}
              type={'number'}
              labelName={'CONTACT_US_PAGE.form.phone'}
              required
            />
            <FormInputField
              id={'email'}
              value={contactForm.email}
              handleChange={(id, e) => handleChange(id, e)}
              type={'email'}
              labelName={'CONTACT_US_PAGE.form.email'}
              required
            />
            <div className={styles.commentInput}>
              <FormInputField
                id={'comment'}
                value={contactForm.comment}
                handleChange={(id, e) => handleChange(id, e)}
                type={'textarea'}
                labelName={'CONTACT_US_PAGE.form.message'}
                required
              />
            </div>
          </div>
          <Button
            className={styles.customButton}
            level={'primary'}
            type={'buttonSubmit'}
          >
            {t('CONTACT_US_PAGE.form.submit')}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
