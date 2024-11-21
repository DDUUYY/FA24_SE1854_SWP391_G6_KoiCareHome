import React, { useState, useEffect, useRef } from 'react';
import './BreedSelect.css';

const BreedSelect = ({ value, onChange }) => {
  const [breeds, setBreeds] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [nameSearch, setNameSearch] = useState('');
  const [originSearch, setOriginSearch] = useState('');
  const [selectedBreed, setSelectedBreed] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchBreeds();
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchBreeds = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/breed');
      if (!response.ok) throw new Error('Failed to fetch breeds');
      const data = await response.json();
      setBreeds(data);
    } catch (error) {
      console.error('Error fetching breeds:', error);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const filteredBreeds = breeds.filter(breed => 
    breed.breedName.toLowerCase().includes(nameSearch.toLowerCase()) &&
    breed.origin.toLowerCase().includes(originSearch.toLowerCase())
  );

  const handleBreedSelect = (breed) => {
    setSelectedBreed(breed);
    onChange(breed.breedName);
    setIsOpen(false);
  };

  return (
    <div className="breed-select" ref={dropdownRef}>
      <div 
        className="breed-select-input" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <input
          type="text"
          value={selectedBreed ? selectedBreed.breedName : value}
          placeholder="Select Breed"
          readOnly
        />
      </div>
      
      {isOpen && (
        <div className="breed-select-dropdown">
          <div className="breed-search-filters">
            <input
              type="text"
              placeholder="Search by name..."
              value={nameSearch}
              onChange={(e) => setNameSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
            <input
              type="text"
              placeholder="Search by origin..."
              value={originSearch}
              onChange={(e) => setOriginSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          <div className="breed-options">
            {filteredBreeds.length === 0 ? (
              <div className="no-results">No breeds found</div>
            ) : (
              filteredBreeds.map(breed => (
                <div
                  key={breed.id}
                  className="breed-option"
                  onClick={() => handleBreedSelect(breed)}
                >
                  <div className="breed-option-name">{breed.breedName}</div>
                  <div className="breed-option-origin">{breed.origin}</div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BreedSelect;