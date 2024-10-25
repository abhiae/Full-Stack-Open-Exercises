const Persons = ({ filteredPersons, deleteContact }) => {
  return (
    <div>
      {filteredPersons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={deleteContact} value={person.id}>
            delete
          </button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
