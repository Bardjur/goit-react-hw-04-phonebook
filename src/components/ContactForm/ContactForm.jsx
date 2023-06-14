import React, {useState} from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css'

export default function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = e => setName(e.target.value);
  const handleNumberChange = e => setNumber(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    const { name, number } = e.target.elements;

    onSubmit({ name, number });
    setName('');
    setNumber('');
  }
  
  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <label className={css['input-wrap']}>
        <p>Name</p>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleNameChange}
        />
      </label>

      <label className={css['input-wrap']}>
        <p>Number</p>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleNumberChange}
        />
      </label>

      <button type="submit">Add contact</button>
    </form>
  )
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
