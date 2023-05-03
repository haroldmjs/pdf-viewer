import { useEffect, useState } from 'react'
import { LeftRight, Opacity } from '../components/Transitions'
import Loading from '../components/Loading'

const Page2 = ({ render }) => {
  const [loaded, setLoaded] = useState(true)
  const [images, setImages] = useState([
    { url: 'src/assets/pages/3/1.png', loaded: false },
    { url: 'src/assets/pages/3/2.png', loaded: false }
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
      <Opacity render={render & loaded}>
        <img src={images[0].url} onLoad={() => handleImageLoad(0)}  alt='' />
      </Opacity>
      <LeftRight render={render & loaded}>
        <img src={images[1].url} onLoad={() => handleImageLoad(1)}  alt='' />
      </LeftRight>
    </div>
  )
}

export default Page2
