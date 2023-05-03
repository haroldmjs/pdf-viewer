import { useEffect, useState } from 'react'
import { LeftRight, RightLeft, DownUp } from '../components/Transitions'
import Loading from '../components/Loading'

const PageCover = ({ render }) => {
  const [loaded, setLoaded] = useState(true)
  const [images, setImages] = useState([
    { url: 'src/assets/pages/1/1.jpg', loaded: false },
    { url: 'src/assets/pages/1/2.png', loaded: false },
    { url: 'src/assets/pages/1/3.png', loaded: false },
    { url: 'src/assets/pages/1/4.png', loaded: false }
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
      <img src={images[0].url} onLoad={() => handleImageLoad(0)} className='absolute top-0 left-0'  alt='' />
      <DownUp render={render & loaded}>
        <img src={images[1].url} onLoad={() => handleImageLoad(1)}  alt='' />
      </DownUp>
      <RightLeft render={render & loaded}>
        <img src={images[2].url} onLoad={() => handleImageLoad(2)}  alt='' />
      </RightLeft>
      <LeftRight render={render & loaded}>
        <img src={images[3].url} onLoad={() => handleImageLoad(3)}  alt='' />
      </LeftRight>
    </div>
  )
}

export default PageCover
