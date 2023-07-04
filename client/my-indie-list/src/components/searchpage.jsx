import React, { useState } from 'react';
import MyCard from './card';
import SearchBar from './searchbar';
import '../style/searchpage.css';

function SearchPage() {
    const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div>
      <SearchBar />
      <MyCard selectedGame={selectedGame} setSelectedGame={setSelectedGame} />
    </div>
  );
}

export default SearchPage;
