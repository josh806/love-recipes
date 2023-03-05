import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Create, Discover, Import, Recipes, NotFound } from './pages';
import Navbar from './components/Navbar';

function App () {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Discover />}
        />
        <Route
          path="/my-recipes"
          element={<Recipes />}
        />
        <Route
          path="/import-recipe"
          element={<Import />}
        />
        <Route
          path="/create-recipe"
          element={<Create />}
        />
        <Route
          path="/recipes/:url"
          element={<NotFound />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </div>
  );
}

export default App;