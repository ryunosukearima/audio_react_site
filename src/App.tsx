import { useState } from 'react'
import Music from './components/music/Music'
import Header from './components/header/Header'

function App() {

  return (
    <div className='bg-slate-500 w-full h-screen'>
      <Header />
      <Music />
    </div>
  )
}

export default App
