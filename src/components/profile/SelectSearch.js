import "./SelectSearchStyles.css";
import SelectSearch from "react-select-search";
import { useRef } from "react";

export default function SearchSelect({ options, onChange, value, name }) {
  const searchInput = useRef();

  const handleChange = (...args) => {
    // searchInput.current.querySelector("input").value = "";
    console.log("ARGS:", args);
    onChange(args[0]);
    console.log("CHANGE:");
  };

  const handleFilter = (items) => {
    return (searchValue) => {
      if (searchValue.length === 0) {
        return options;
      }
      const newItems = items.filter((item) => {
        return item.name.toLowerCase().includes(searchValue.toLowerCase());
      });
      return newItems;
    };
  };

  console.log(options);

  return (
    <div className="App">
      <SelectSearch
        ref={searchInput}
        options={options}
        filterOptions={handleFilter}
        value={value}
        name={name}
        placeholder={`Choose a ${name}`}
        search
        onChange={handleChange}
      />
    </div>
  );
}
