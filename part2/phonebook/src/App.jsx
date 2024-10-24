import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);

  const hook = () => {
    axios.get("http://localhost:3001/persons").then((response) => {
      const tempPersons = response.data;
      setPersons(tempPersons);
      setFilteredPersons(tempPersons);
    });
  };
  useEffect(hook, []);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [filterName, setFilterName] = useState("");
  const addContact = (event) => {
    event.preventDefault();
    const contactObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    if (persons.some((person) => person.name === newName))
      alert(`${newName} is already added to phonebook`);
    else {
      const updatedPersonsList = persons.concat(contactObject);
      setPersons(updatedPersonsList);
      setFilteredPersons(updatedPersonsList);
      setNewName("");
      setNewNumber("");
    }
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const filterPerson = (event) => {
    event.preventDefault();
    const filteredPersonsTemp = persons.filter((person) =>
      person.name.toLowerCase().includes(filterName.toLowerCase())
    );
    setFilteredPersons(filteredPersonsTemp);
  };
  const handleFilter = (event) => {
    setFilterName(event.target.value);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterPerson={filterPerson}
        filterName={filterName}
        handleFilter={handleFilter}
      />
      <h2>add a new</h2>
      <PersonForm
        addContact={addContact}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
