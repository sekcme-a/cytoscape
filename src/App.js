import "./app.css"
import React, { useState, useEffect } from "react"
import Data from './api/data.json'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Search from "./pages/Search"
import Result from "./pages/Result"

function App() {

  return (
    <div>
      <BrowserRouter>
      <Link to="/">
        <h1 className="title">Biological Network Visualization</h1>
        <h2 className="subtitle">BRCA proteins</h2>
      </Link>
        <Routes>
          <Route path="/" element={<Search />}></Route>
          <Route path="/result/:selectedProteins" element={<Result />}></Route>
        </Routes>
      </BrowserRouter>
      {/* <form name="sorting" className="sorting__container">
        <h3>SEARCH</h3>
        <p>Search Multiple Proteins By Names : </p>
        <textarea rows="10" cols="50" value={text} onChange={onTextChange}></textarea>
        
      </form>
      <input type="submit" onClick={onSubmitClick} value="Search"></input>
      <NetworkResult sortedProteinsData={sortedProteinsData} /> */}
    </div>
  );
}

export default App;
