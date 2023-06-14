import React, {useState} from 'react';
import PropTypes from 'prop-types';
import css from "./Filter.module.css";

export default function Filter({ onChange }) {
  const [filter, setFilter] = useState('');

  const handleChange = e => {
    setFilter(e.target.value);
    onChange(e.target.value);
   }

  return (
    <label className={css['input-wrap']}>
      <p>Find contacts by name</p>
      <input
        type="text"
        name="filter"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="find contacts by name"
        required
        value={filter}
        onChange={handleChange}
      />
    </label>
  )
}

Filter.propTypes = {
    onChange: PropTypes.func.isRequired,
}
