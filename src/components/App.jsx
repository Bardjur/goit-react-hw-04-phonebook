import React from "react";
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactForm from "./ContactForm";
import Filter from "./Filter";
import ContactList from "./ContactList";
import css from './App.module.css';

class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem("contacts"));
    if (contacts) this.setState({ contacts });
  }

  componentDidUpdate(_, prevState){
    const { contacts } = this.state
    if (prevState.contacts !== contacts) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }

  isIncludeContact = str => {
    str = str.toLowerCase();
    const findRow = this.state.contacts.find(item => item.name.toLowerCase() === str)

    return findRow ? true : false;
  }

  addContact = ({ name, number }) => {
    if (this.isIncludeContact(name.value)) {
      toast.error(`${name.value} is already in contacts`,{theme: "colored"});
      return
    }
    
    const id = nanoid(10);

    this.setState(({contacts}) => {
      return { contacts : [{ id, name: name.value, number: number.value }, ...contacts] };
    })
  }

  delContact = (id) => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(item => item.id !== id)
      return {contacts: newContacts}
    })
  }

  filterChange = value => this.setState({ filter: value });

  render() {
    const { contacts, filter } = this.state;
    const normalizeFilter = filter.toLowerCase();
    const filteredData = contacts.filter(({ name }) => name.toLowerCase().includes(normalizeFilter));

    return (
      <div className={css.wrapper}>
        <h1>Phonebook</h1>
        <ContactForm
          onSubmit={this.addContact}
        />

        {contacts.length
          ? ( <>
            <h2>Contacts</h2>
            <Filter onChange={this.filterChange} />
            <ContactList
              contacts={filteredData}
              onClick={this.delContact} />
          </> )
          : <h2>No contacts</h2>}
        
        <ToastContainer autoClose={3000}/>
      </div>
      
    );
  }
};

export default App
