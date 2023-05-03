import pdfFile from '../assets/PDF.pdf'

const PdfViewerUi = ({ handlePage, nextPage, prevPage, numPages, currentPage, handleZoom, zoom, orientation }) => {
  const handlePrint = () => {
    const popup = window.open(pdfFile, 'print', 'height=400,width=600,screenX=500,screenY=50')
    popup.print()
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href
      })
    } else {
      // API not available
    }
  }

  return (
    <>
      <div className='fixed z-10 top-0 w-full bg-gradient-to-b from-[#00000087] flex justify-end h-16'>
        <div className='btn-group flex gap-10 md:gap-6 justify-end mr-14'>
          <button onClick={handlePrint} className='btn bg-transparent shadow-none border-0 hover:bg-transparent text-white uppercase font-bold text-sm opacity-70 hover:opacity-100 transition-opacity hidden md:block'>Imprimir</button>
          <button className='btn bg-transparent shadow-none border-0 hover:bg-transparent text-white uppercase font-bold text-sm opacity-70 hover:opacity-100 transition-opacity'>
            <a href={pdfFile} download='PDF.pdf'>Descargar</a>
          </button>
          <button onClick={handleShare} className='btn bg-transparent shadow-none border-0 hover:bg-transparent text-white uppercase font-bold text-sm opacity-70 hover:opacity-100 transition-opacity hidden md:block'>Compartir</button>
        </div>
      </div>
      <div className='fixed flex z-10 left-0'>
        <button onClick={prevPage} disabled={currentPage <= 0}>
          <svg height={50} width={50} viewBox='-4 -4 30 52' className='rotate-180'><path d='M1.15 42.05a2.62 2.62 0 0 1 0-3.45L16.17 22 1.15 5.4a2.62 2.62 0 0 1 0-3.45 2.06 2.06 0 0 1 3.12 0l16.58 18.32c.87.96.87 2.5 0 3.45L4.27 42.05c-.43.48-1 .72-1.56.72a2.1 2.1 0 0 1-1.56-.72Z' fill='white' /></svg>
        </button>
      </div>
      <div className='fixed flex z-10 right-0'>
        <button onClick={nextPage} disabled={orientation === 'landscape' ? currentPage >= numPages - 2 : currentPage >= numPages - 1}>
          <svg height={50} width={50} viewBox='-4 -4 30 52'><path d='M1.15 42.05a2.62 2.62 0 0 1 0-3.45L16.17 22 1.15 5.4a2.62 2.62 0 0 1 0-3.45 2.06 2.06 0 0 1 3.12 0l16.58 18.32c.87.96.87 2.5 0 3.45L4.27 42.05c-.43.48-1 .72-1.56.72a2.1 2.1 0 0 1-1.56-.72Z' fill='white' /></svg>
        </button>
      </div>
      <div className='fixed bottom-0 w-full bg-gradient-to-t from-[#00000087] flex h-16 z-10 justify-center'>
        <div className='controls-pages flex items-center max-sm:w-6/12 w-7/12  justify-evenly mr-5'>
          <p className='text-white font-bold max-sm:w-4/12 w-1/12 text-center'>
            {
              orientation === 'landscape' & currentPage !== 0
                ? `${currentPage + 1} - ${currentPage + 2} / ${numPages}`
                : `${currentPage + 1} / ${numPages}`
            }
          </p>
          <input onChange={handlePage} value={currentPage} type='range' step={orientation === 'landscape' ? '2' : '1'} min='0' max={numPages - 1} className='w-11/12' />
        </div>
        <div className='controls-zoom flex items-center gap-2 max-sm:w-6/12 max-sm:justify-end w-2/12 text-white font-bold text-2xl'>
          <span className='w-1/12'>-</span>
          <input onChange={handleZoom} value={zoom} min='1' max='4' step='0.1' type='range' className='w-10/12' />
          <span className='w-1/12'>+</span>
        </div>
      </div>
    </>
  )
}

export default PdfViewerUi
