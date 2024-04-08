// AvailabilityFilter.js
import React from 'react';

function AvailabilityFilter({ availabilities, selectedAvailability, onChange }) {
  return (
    <div>
      <h3>Availability</h3>
      <select value={selectedAvailability} onChange={(e) => onChange(e.target.value)}>
        <option value="">All</option>
        {availabilities.map((availability) => (
          <option key={availability} value={availability}>{availability}</option>
        ))}
      </select>
    </div>
  );
}

export default AvailabilityFilter;
