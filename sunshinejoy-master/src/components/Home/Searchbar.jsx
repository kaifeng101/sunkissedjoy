// Searchbar functionality

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchContext } from './SearchContext';

const SearchBar = ({ products }) => {
  const { handleSearch } = useSearchContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);


  const filterProducts = () => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setShowDropdown(true);
  };

  const handleDocumentClick = (event) => {
    if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
      // Clicked outside the search bar, hide the dropdown
      setShowDropdown(false);
    }
  };

  const handleClick = (selectedProduct) => {
    setSearchTerm(selectedProduct.title);
    setShowDropdown(false);

    // Return searchbar data
    handleSearch(selectedProduct.title);
  };

  const search = () => {
    var product = document.getElementById('searchProduct').value;

    // Return searchbar data
    handleSearch(product);
  }

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown' && filteredProducts.length > 0) {
      e.preventDefault();
      const newIndex = (selectedIndex + 1) % filteredProducts.length;
      setSelectedIndex(newIndex);
      setSearchTerm(filteredProducts[newIndex].title);
    } else if (e.key === 'ArrowUp' && filteredProducts.length > 0) {
      e.preventDefault();
      const newIndex = (selectedIndex - 1 + filteredProducts.length) % filteredProducts.length;
      setSelectedIndex(newIndex);
      setSearchTerm(filteredProducts[newIndex].title);
    }
  };

  return (
    <div className="flex flex-1 ml-5 relative" style={{ height: '52px' }}>
      <input
        ref={searchInputRef}
        type="text"
        id="searchProduct"
        className="rounded-none rounded-tl-md bg-gray-50 border border-gray-300 rounded-bl-md text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 pl-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  focus:outline-none"
        placeholder="Search items..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          filterProducts();
        }}
        onKeyDown={handleKeyDown} // Add this line to handle arrow down key
      />

      <span onClick={() => search()} className="inline-flex cursor-pointer items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-tr-md rounded-br-md border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 50 50">
          <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
        </svg>
      </span>

      {showDropdown && filteredProducts.length > 0 && (
        <div className="absolute top-full left-0 z-10 bg-white border border-gray-300 rounded-b-md w-full mt-1">
          {filteredProducts.map((product, index) => (
            <div
                key={index}
                className={`p-2 cursor-pointer hover:bg-gray-100 ${
                index === selectedIndex ? 'bg-gray-300' : ''
                }`}
                onClick={() => handleClick(product)}
            >
              {product.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
