import React, {useState, useEffect} from "react";
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactForm from "./ContactForm";
import Filter from "./Filter";
import ContactList from "./ContactList";
import css from './App.module.css';

export default function App() {
  const contactsLS = JSON.parse(localStorage.getItem("contacts")) || [];
  const [contacts, setContacts] = useState(contactsLS);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (contactsLS !== contacts) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
      console.log('update');
    }
  }, [contacts]);

  const isIncludeContact = str => {
    str = str.toLowerCase();
    const findRow = contacts.find(item => item.name.toLowerCase() === str)

    return findRow ? true : false;
  }

  const addContact = ({ name, number }) => {
    if (isIncludeContact(name.value)) {
      toast.error(`${name.value} is already in contacts`,{theme: "colored"});
      return
    }
    
    const id = nanoid(10);
    setContacts([{ id, name: name.value, number: number.value }, ...contacts])
  }

  const delContact = (id) => {
    const newContacts = contacts.filter(item => item.id !== id);
    setContacts(newContacts);
  }

  const filterChange = value => setFilter(value);

  const normalizeFilter = filter.toLowerCase();
  const filteredData = contacts.filter(({ name }) => name.toLowerCase().includes(normalizeFilter));

  return (
    <div className={css.wrapper}>
      <h1>Phonebook</h1>
      <ContactForm
        onSubmit={addContact}
      />

      {contacts.length
        ? ( <>
          <h2>Contacts</h2>
          <Filter onChange={filterChange} />
          <ContactList
            contacts={filteredData}
            onClick={delContact} />
        </> )
        : <h2>No contacts</h2>}
      
      <ToastContainer autoClose={3000}/>
    </div>
    
  );
};
