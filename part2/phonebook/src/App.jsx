import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import phoneBookService from "./services/phoneBook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [filterName, setFilterName] = useState("");

  // to initially load
  useEffect(() => {
    phoneBookService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      setFilteredPersons(initialPersons);
    });
  }, []);

  // to render correctly for filter after filterName changes
  useEffect(() => {
    if (filterName.trim() === "") {
      setFilteredPersons(persons);
    } else {
      const filteredPersonsTemp = persons.filter((person) =>
        person.name.toLowerCase().includes(filterName.toLowerCase())
      );
      setFilteredPersons(filteredPersonsTemp);
    }
  }, [filterName, persons]);

  const addContact = (event) => {
    // console.log(newNumber);
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const existingperson = persons.find(
          (person) => person.name === newName
        );
        const updatedPerson = { ...existingperson, number: newNumber };
        phoneBookService.update(updatedPerson).then((returnedContact) => {
          const updatedPersonsList = persons.map((person) =>
            person.id === updatedPerson.id ? returnedContact : person
          );
          setPersons(updatedPersonsList);
          setFilteredPersons(updatedPersonsList);
          setNewName("");
          setNewNumber("");
        });
      }
    } else {
      const contactObject = {
        name: newName,
        number: newNumber,
        id: `${persons.length + 1}`,
      };
      phoneBookService.create(contactObject).then((returnedContact) => {
        const updatedPersonsList = persons.concat(returnedContact);
        setPersons(updatedPersonsList);
        setFilteredPersons(updatedPersonsList);
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const deleteContact = (event) => {
    const targetId = event.target.value;
    const targetName = persons.find((person) => person.id === targetId).name;
    if (window.confirm(`Delete ${targetName} ?`)) {
      phoneBookService
        .remove(targetId)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== targetId));
        })
        .catch((error) => {
          console.error("there was an error deleting the contact:", error);
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilter = (event) => {
    setFilterName(event.target.value);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm
        addContact={addContact}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        filteredPersons={filteredPersons}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
