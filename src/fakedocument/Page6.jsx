import { useEffect, useState } from 'react'
import { LeftRight, RightLeft } from '../components/Transitions'
import Loading from '../components/Loading'

const Page6 = ({ render }) => {
  const [loaded, setLoaded] = useState(true)
  const [images, setImages] = useState([
    { url: 'src/assets/pages/7/1.jpg', loaded: false },
    { url: 'src/assets/pages/7/2.png', loaded: false }
  ])

  useEffect(() => {
    const allLoaded = images.every((image) => image.loaded)
    setLoaded(allLoaded)
  }, [images])

  function handleImageLoad (index) {
    const updatedImages = [...images]
    updatedImages[index].loaded = true
    setImages(updatedImages)
  }

  return (
    <div className='relative h-full w-full overflow-hidden'>
      {loaded ? null : <Loading />}
      <LeftRight render={render & loaded}>
        <img src={images[0].url} onLoad={() => handleImageLoad(0)} alt='' />
      </LeftRight>
      <RightLeft render={render & loaded}>
        <img src={images[1].url} onLoad={() => handleImageLoad(1)} alt='' />
      </RightLeft>
    </div>
  )
}

export default Page6
