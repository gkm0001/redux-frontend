// DomainFilter.js
import React from 'react';

function DomainFilter({ domains, selectedDomain, onChange }) {
  return (
    <div>
      <h3>Domain</h3>
      <select value={selectedDomain} onChange={(e) => onChange(e.target.value)}>
        <option value="">All</option>
        {domains.map((domain) => (
          <option key={domain} value={domain}>{domain}</option>
        ))}
      </select>
    </div>
  );
}

export default DomainFilter;
