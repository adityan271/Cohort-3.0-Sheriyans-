import React from 'react'

const Home = () => {
    console.log("Home rendring...")
  return (
    <div>
      <h1>Home here</h1>
    </div>
  )
}

export default React.memo(Home)
