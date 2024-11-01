// import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { Sources } from './components/Sources'
import { Sidebar } from './components/Sidebar';

function App() {
  

  return (
    <>
        <Sidebar />
        <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sources" element={<Sources />} />
        </Routes>
        </div>
    </>
  )
}

export default App
