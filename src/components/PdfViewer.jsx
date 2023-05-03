import { useState, useEffect, useRef } from 'react'
import PdfViewerUi from './PdfViewerUi'
// Page Flip Effect
import HTMLFlipBook from 'react-pageflip'
// Drag to scroll
import Draggable from 'react-draggable'
// Fake document pages
import { PageCoverI, Page1I, Page2I, Page3I, Page4I, Page5I, Page6I } from '../fakedocument/FakeDocument.jsx'

const PdfViewer = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [pageOnRender, setPageOnRender] = useState(0)
  const [orientation, setOrientation] = useState(null)
  const [zoom, setZoom] = useState(1)
  const [numPages, setnumPages] = useState(0)
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  const [height, setheight] = useState(isMobile ? window.innerHeight - 180 : window.innerHeight - 90) // Less height in phone
  const [widthPdfRk, setwidthPdfRk] = useState(height * 0.7816015883520847) // Get width with aspect ratio
  const flipBook = useRef(null)

  const stylesZoom = {
    width: '100%',
    height: '100%',
    transform: `scale(${zoom})`,
    transformStyle: 'preserve-3d',
    transition: 'transform 0.5s',
    position: 'absolute',
    top: '0'
  }
  const draggableProps = {
    defaultPosition: { x: 0, y: -height / 2 },
    position: zoom === 1 ? { x: 0, y: -height / 2 } : null,
    onDrag: zoom === 1 ? () => false : undefined
  }
  const LsRender = [0, 1, 1, 3, 3, 5, 5]

  const handlePage = (e) => {
    const pageToChange = parseInt(e.target.value)
    if (orientation === 'landscape' & pageToChange !== 0) {
      setCurrentPage(pageToChange - 1)
    } else {
      setCurrentPage(pageToChange)
    }
    setZoom(1)
  }

  const nextPage = () => {
    setZoom(1)
    if (orientation === 'landscape' & currentPage % 2 !== 0) {
      setCurrentPage(currentPage + 2)
    } else {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (orientation === 'landscape' & currentPage !== 1) {
      setCurrentPage(currentPage - 2)
    } else {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleFlip = () => {
    const getCurrentPage = flipBook?.current?.pageFlip()?.getCurrentPageIndex()
    setCurrentPage(getCurrentPage)
    setPageOnRender(getCurrentPage)
  }

  const handleZoom = (e) => {
    setZoom(parseInt(e.target.value))
  }

  const handleInit = () => {
    setnumPages(flipBook?.current?.pageFlip()?.getPageCount())
  }

  const handleDoubleClick = (e) => {
    if (zoom === 1) {
      setZoom(2)
    } else {
      setZoom(1)
    }
  }

  let tiempoUltimoToque = 0
  const handleDoubleTouch = (e) => {
    const tiempoActual = new Date().getTime()
    if (tiempoActual - tiempoUltimoToque < 300) {
      if (zoom === 1) {
        setZoom(2)
      } else {
        setZoom(1)
      }
    }
    tiempoUltimoToque = tiempoActual
  }

  useEffect(() => {
    setTimeout(() => {
      setOrientation(flipBook?.current?.pageFlip()?.getOrientation())
    }, 50)
  }, [])

  // Change height and width with window resize
  useEffect(() => {
    const handleResize = () => {
      setheight(height)
      setwidthPdfRk(height * 0.7816015883520847)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Change page with currentPage state
  useEffect(() => {
    setTimeout(() => {
      flipBook?.current?.pageFlip()?.flip(currentPage, 'top')
    }, 50)
  }, [currentPage])

  return (
    <>
      <PdfViewerUi handlePage={handlePage} nextPage={nextPage} prevPage={prevPage} numPages={numPages} currentPage={currentPage} handleZoom={handleZoom} zoom={zoom} orientation={orientation} />
      <Draggable {...draggableProps}>
        <div className='draggable' onDoubleClick={handleDoubleClick} onTouchStart={handleDoubleTouch}>
          <HTMLFlipBook
            ref={flipBook} width={widthPdfRk} height={height} maxShadowOpacity={1} useMouseEvents={false}
            style={stylesZoom} onInit={handleInit} onFlip={handleFlip} showCover swipeDistance={30}
          >
            {Array.from([PageCoverI, Page1I, Page2I, Page3I, Page4I, Page5I, Page6I], (El, index) => (
              <El render={orientation === 'landscape' ? pageOnRender === LsRender[index] : pageOnRender === index} key={index} />
            ))}
          </HTMLFlipBook>
        </div>
      </Draggable>
    </>
  )
}

export default PdfViewer
