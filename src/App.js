import React, { useState, useEffect } from 'react'
import DefaultDisplay from './DefaultDisplay'
import UserSearch from './UserSearch'
import './App.css'
import { 
  PageHeader, 
  PageTitle, 
  HeaderTitleWrapper, 
  Loader,
  ImageGrid, 
  Image,
  ImageModalBackground,
  ImageModal
} from './style'

function App() {
  const [width, setWidth] = useState(window.innerWidth) // For dynamic resizing of columns
  const [searchTerm, setSearchTerm] = useState('') // Track user input
  const [displaySearchBox, setDisplaySearchBox] = useState(false) // Should we display search box?
  const [areImagesLoading, setImageLoadingStatus] = useState(false) // Track if images are loading. Display loading circle?
  const [errorMessage, setErrorMessage] = useState('') // Was there an error with request? No images for search term?
  const [images, setImages] = useState(null) // Array of image objects from API
  const [heightRange, setHeightRange] = useState(null) // Heights of images to determine span
  const [searchHasCompleted, setSearchCompletedStatus] = useState(false) // Is the search complete? User can clear prev search and search again.
  const [selectedImage, setSelectedImage] = useState(null) // Selected image will be displayed in actual size

  // Get key from env. Wanted to add a page for user to add/use default, but ran out of time.
  const pixabayKey = process.env.REACT_APP_PIXABAY_KEY || null

  // This useEffect manages page resizing and resizes grid accordingly
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }
    // Add an event listener for resizing of the page
    window.addEventListener('resize', handleResize)
    // Remove the listener on unmount
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // This useEffect sets the bounds for image height
  useEffect(() => {
    if (!images || !images.length) return null
    // I want to find the range of heights and size accordingly
    let ranges = []
    images.forEach((image) => {
      const { imageHeight } = image
      if (!ranges.length) {
        ranges = [imageHeight, imageHeight]
      } else {
        if(imageHeight < ranges[0]) ranges[0] = imageHeight
        if(imageHeight > ranges[1]) ranges[1] = imageHeight
      }
    })
    ranges[2] = Math.floor((ranges[1] - ranges[0]) / 3)
    setHeightRange(ranges)
    setTimeout(() => setImageLoadingStatus(false), 2500)
  }, [images])

  // Update the users search term
  const updateSearchTerm = (userInput) => {
    setSearchTerm(userInput)
  }

  // In the event of an error, display a message for the user
  const handleError = (errorMessage) => {
    setSearchCompletedStatus(false)
    setImages(null)
    updateSearchTerm('')
    setImageLoadingStatus(false)
    setErrorMessage(errorMessage)
  } 

  const triggerUserSearch = async () => {
    // When a search is triggered, set loading to true. Erase prev error msg
    setImageLoadingStatus(true)
    setErrorMessage(null)

    const url = `https://pixabay.com/api/?key=${pixabayKey}&q=${encodeURIComponent(searchTerm)}&image_type=photo`
    const fetchRes = await fetch(url)
    // Check the status of our fetch. Was there an error?
    if (fetchRes.status !== 200) {
      handleError('There was an error with your request. Check your Pixabay Key.')
    } else {
      const res = await fetchRes.json()
      // If not, were ant hits returned?
      if (!res.hits || !res.hits.length) {
        handleError('No images returned. Please try again.')
      } else {
        setImages(res.hits)
      }
    }
  }

  // This is a hacky way of dealing with various heights
  const calculateGridRowEnd = (imageHeight) => {
    if (!heightRange || !heightRange.length) return null
    const secondTier = heightRange[0] + heightRange[2]
    const thirdTier = secondTier + heightRange[2]

    if (imageHeight < secondTier) {
      return 14
    } else if(imageHeight < thirdTier) {
      return 16
    } else {
      return 20
    }
  }

  return (
    <div className="App">
      {/* Page Header section. Basic information about the app */}
      <PageHeader images={images}>
        <PageTitle>Image Finder</PageTitle>
        <HeaderTitleWrapper>
          <div style={{ fontSize: '24px' }}>By Kevin Brimmerman</div>
        </HeaderTitleWrapper>
      </PageHeader>

      {/* If we don't have any images, display our default homepage */}
      {(!images || !images.length) &&
        <DefaultDisplay displaySearchBox={displaySearchBox} setDisplaySearchBox={setDisplaySearchBox} />
      }

      {/* API resp for 20 results is quick enough that a loader is not really necessary.
          However, it was part of the requirements, so I added a timeout once the fetch is
          triggered just to display what this would look like.
       */}
      {areImagesLoading && <Loader />}

      {/* User Search component will transition in after Begin is clicked.
          Once a search is performed it will move to the header bar where the user
          can then clear their previous search, or simply search again, while still 
          having access to their previous search results.
      */}
      <UserSearch 
        displaySearchBox={displaySearchBox} 
        setDisplaySearchBox={setDisplaySearchBox}
        searchTerm={searchTerm}
        updateSearchTerm={updateSearchTerm}
        triggerUserSearch={triggerUserSearch}
        setImages={setImages}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        searchHasCompleted={searchHasCompleted}
        setSearchCompletedStatus={setSearchCompletedStatus}
      />

      {/* The image grid. Only displayed if hits are returned and loading is complete. */}
      {images && !!images.length && !areImagesLoading && 
        <ImageGrid width={width}>
          {images.map((imageObj) => (
            <Image 
              key={imageObj.id} 
              height={calculateGridRowEnd(imageObj.imageHeight)} 
              onClick={() => setSelectedImage(imageObj)}
            >
              <img
                alt={imageObj.tags}
                style={{ width: '100%', height: '100%' }} 
                src={imageObj.webformatURL} 
              />
            </Image>
          ))}
        </ImageGrid>
      }

      {/* An opaque background that covers other images if one is selected by the user. */}
      {selectedImage && <ImageModalBackground onClick={() => setSelectedImage(null)} />}

      {/* If an image is selected, display it full screen for the user to observe. Include tags and user for context. */}
      {selectedImage && 
        <ImageModal>
          <img
            alt={selectedImage.tags}
            style={{ width: '100%', height: '100%' }} 
            src={selectedImage.webformatURL} 
          />
          <div style={{ color: 'white' }}>{`Image By: ${selectedImage.user}`}</div>
          <div style={{ color: 'white' }}>{`Tags: ${selectedImage.tags}`}</div>
        </ImageModal>
      }
    </div> 
  );
}

export default App
