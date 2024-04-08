// GenderFilter.js
import React from 'react';

function GenderFilter({ genders, selectedGender, onChange }) {
  return (
    <div>
      <h3>Gender</h3>
      <select value={selectedGender} onChange={(e) => onChange(e.target.value)}>
        <option value="">All</option>
        {genders.map((gender) => (
          <option key={gender} value={gender}>{gender}</option>
        ))}
      </select>
    </div>
  );
}

export default GenderFilter;
