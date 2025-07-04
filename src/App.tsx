import { useState } from 'react'
import Music from './components/music/Music'
import Header from './components/header/Header'

function App() {

  return (
    <div className='bg-gray-700 w-full h-screen'>
      <Header />
      <Music />
    </div>
  )
}

export default App
