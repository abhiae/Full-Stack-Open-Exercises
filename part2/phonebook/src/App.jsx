import { useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
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
