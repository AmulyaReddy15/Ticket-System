import React from 'react'
import { Link } from 'react-router-dom'

const Notfound = () => {
  return (
    <div className='notfound'>
        <h2>Page not found.Go to Home page</h2>
        <Link to="/"><button>Go to Home page</button></Link>
    </div>
  )
}

export default Notfound