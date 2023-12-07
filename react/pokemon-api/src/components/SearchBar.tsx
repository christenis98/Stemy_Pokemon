import React, { ChangeEvent } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    onSearch(query);
  };

  return (
    <div className="input-group flex-nowrap mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search Pokemon"
        aria-label="Search Pokemon"
        aria-describedby="addon-wrapping"
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
