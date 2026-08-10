import React from 'react'
import ProdcutCard from './components/ProdcutCard'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className='h-screen p-4 flex flex-col gap-4' >
      <Navbar/>
      <ProdcutCard/>
    </div>
  )
}

export default App
