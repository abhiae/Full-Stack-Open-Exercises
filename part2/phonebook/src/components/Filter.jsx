const Filter = ({ filterPerson, filterName, handleFilter }) => {
  return (
    <form onChange={filterPerson}>
      filter shown with
      <input value={filterName} onChange={handleFilter} />
    </form>
  );
};
export default Filter;
