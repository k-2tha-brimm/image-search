import React from 'react'
import { DefaultBody, DefaultButton, Title } from './style'

const DefaultDisplay = ({ displaySearchBox, setDisplaySearchBox }) => {
  return (
    <div 
      style={{ 
        transition: displaySearchBox ? 'all .5s ease-in .5s' : 'all .5s ease-out', 
        opacity: displaySearchBox ? '0' : '1',
      }}
    >
      <DefaultBody style={{ left: displaySearchBox ? '-400px' : '' }}>
        <Title>Explore Pixabay</Title>
        <DefaultButton onClick={() => setDisplaySearchBox(!displaySearchBox)}>Begin Your Search</DefaultButton>
      </DefaultBody>
    </div>
  )
}

export default DefaultDisplay