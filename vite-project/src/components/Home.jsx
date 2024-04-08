import React, { useState } from 'react';
import Header from './Header';
import products from '../products.json';
import DomainFilter from './DomainFilter.jsx';
import GenderFilter from './GenderFilter.jsx';
import AvailabilityFilter from './AvailabilityFilter.jsx';
import { useDispatch } from 'react-redux';
import { add, remove } from '../store/CartSlice.jsx'; // Import remove action

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');

  // Define unique domain, gender, and availability values
  const domains = Array.from(new Set(products.map(product => product.domain)));
  const genders = Array.from(new Set(products.map(product => product.gender)));
  const availabilities = Array.from(new Set(products.map(product => product.available ? 'Available' : 'Not Available')));

  // Filter products based on search query, domain, gender, and availability
  const filteredProducts = products.filter(product =>
    product.first_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedDomain ? product.domain === selectedDomain : true) &&
    (selectedGender ? product.gender === selectedGender : true) &&
    (selectedAvailability ? (product.available ? 'Available' : 'Not Available') === selectedAvailability : true)
  );

  // Pagination logic
  const productsPerPage = 10;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handler functions for filter changes
  const handleDomainChange = (domain) => {
    setSelectedDomain(domain);
    setCurrentPage(1); // Reset pagination
  };

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    setCurrentPage(1); // Reset pagination
  };

  const handleAvailabilityChange = (availability) => {
    setSelectedAvailability(availability);
    setCurrentPage(1); // Reset pagination
  };

  // Handler function for pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const dispatch = useDispatch();
  const addToCart = (product) => {
    dispatch(add(product))
  }

  // Updated function to remove product from cart
  const removeFromCart = (product) => {
    dispatch(remove(product))
  }

  // Calculate start and end pages for pagination
  let startPage, endPage;
  if (totalPages <= 4) {
    startPage = 1;
    endPage = totalPages;
  } else if (currentPage <= 2) {
    startPage = 1;
    endPage = 4;
  } else if (currentPage >= totalPages - 1) {
    startPage = totalPages - 3;
    endPage = totalPages;
  } else {
    startPage = currentPage - 1;
    endPage = currentPage + 2;
  }

  // Generate page buttons
  const pageButtons = [];
  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => paginate(i)}
        className={`mx-1 px-3 py-1 rounded ${
          currentPage === i ? 'bg-gray-300' : 'bg-white text-black'
        }`}
      >
        {i}
      </button>
    );
  }

  return (
    <div>
      <Header onSearch={setSearchQuery} />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <DomainFilter domains={domains} selectedDomain={selectedDomain} onChange={handleDomainChange} />
            <GenderFilter genders={genders} selectedGender={selectedGender} onChange={handleGenderChange} />
            <AvailabilityFilter availabilities={availabilities} selectedAvailability={selectedAvailability} onChange={handleAvailabilityChange} />
          </div>
          <div className="col-span-2">
            <h1 className="text-3xl font-bold mb-4">Product Cards</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md p-4 relative">
                  <img src={product.avatar} alt={product.first_name} className="w-full h-32 object-cover mb-4" />
                  <div>
                    <h2 className="text-lg font-bold">{`${product.first_name} ${product.last_name}`}</h2>
                    <p className="text-gray-600">{product.email}</p>
                    <p className="text-gray-600">{product.domain}</p>
                    <p className="text-gray-600">{product.available ? 'Available' : 'Not Available'}</p>
                  </div>
                  <button
                    className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 ml-4"
                    onClick={() => addToCart(product)}
                  >
                    Add
                  </button>
                  <button
                    className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-20" // Change color to red
                    onClick={() => removeFromCart(product)} // Call removeFromCart function
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => paginate(currentPage - 1)}
                className="mx-1 px-3 py-1 bg-black text-white rounded disabled:opacity-50"
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {pageButtons}
              <button
                onClick={() => paginate(currentPage + 1)}
                className="mx-1 px-3 py-1 bg-black text-white rounded disabled:opacity-50"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
