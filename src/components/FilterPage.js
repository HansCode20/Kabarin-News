import React, { useState } from 'react';
import Filter from './Filter';
import NewsList from './NewsList';
import Navbar from '../features/Navbar';
import Footer from '../features/Footer';


const FilterPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('terbaru');

  const handleFilterSelect = (path) => {
    setSelectedFilter(path);
  };

  const filters = [
    { id: 1, name: "Newest", path: "terbaru" },
    { id: 2, name: "National", path: "nasional" },
    { id: 3, name: "International", path: "internasional" },
    { id: 4, name: "Economy", path: "ekonomi" },
    { id: 5, name: "Sports", path: "olahraga" },
    { id: 6, name: "Technology", path: "teknologi" },
    { id: 7, name: "Entertainment", path: "hiburan" },
    { id: 9, name: "Lifestyle", path: "gayaHidup" },
  ];

  return (
    <div>
      <Navbar/>
      <Filter text={filters} onFilterSelect={handleFilterSelect} />
      <NewsList path={selectedFilter} />
      <Footer/>
    </div>
  );
};

export default FilterPage;
