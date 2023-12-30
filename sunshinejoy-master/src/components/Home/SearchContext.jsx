// Searchbar functionality

import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearchContext = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (term, results) => {
    setSearchTerm(term);
    setSearchResults(results);
  };

  const contextValue = {
    searchTerm,
    searchResults,
    handleSearch,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};
