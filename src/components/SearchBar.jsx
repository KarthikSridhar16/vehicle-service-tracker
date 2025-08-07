import React from 'react';

function SearchBar({ query, setQuery, onSearch }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search services"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
}

export default SearchBar;