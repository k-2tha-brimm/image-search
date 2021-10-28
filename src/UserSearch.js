import React from 'react'
import { DefaultBody, SearchBarWrapper, ErrorMessage, SearchBar, DefaultButton } from './style'

const UserSearch = ({ 
  displaySearchBox, 
  setDisplaySearchBox, 
  searchTerm, 
  updateSearchTerm, 
  triggerUserSearch, 
  setImages, 
  errorMessage, 
  setErrorMessage,
  searchHasCompleted,
  setSearchCompletedStatus
}) => {
    const executeSearch = () => {
      setSearchCompletedStatus(true)
      triggerUserSearch()
    }

    const clearSearch = () => {
      setSearchCompletedStatus(false)
      updateSearchTerm('')
      setImages(null)
      setErrorMessage(null)
    }

  return (
    <div 
      style={{ 
        transition: displaySearchBox ? 'all .5s ease-out' : 'all .5s ease-in .5s', 
        opacity: displaySearchBox ? '1' : '0',
        background: '#EEF1F6',
      }}
    >
      <DefaultBody style={{ left: displaySearchBox ? 'calc(50% - 230px)' : '-600px', top: searchHasCompleted ? '10px' : '', background: searchHasCompleted ? '#EEF1F6' : '' }}>
        <SearchBarWrapper>
          {searchHasCompleted 
            ? <DefaultButton style={{ fontSize: '16px', background: 'transparent', color: 'gray' }} onClick={clearSearch}>
            Clear
            </DefaultButton>
            : <DefaultButton style={{ fontSize: '16px', background: 'transparent', color: 'gray' }} onClick={() => setDisplaySearchBox(false)}>
            Back
            </DefaultButton>
          }
          <SearchBar
            placeholder='Search...'
            onChange={(e) => updateSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <DefaultButton style={{ fontSize: '20px' }} onClick={executeSearch}>Go!</DefaultButton>
        </SearchBarWrapper>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </DefaultBody>
    </div>
  )
}

export default UserSearch