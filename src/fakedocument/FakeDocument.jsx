import React from 'react'
import PageCover from './PageCover'
import Page1 from './Page1'
import Page2 from './Page2'
import Page3 from './Page3'
import Page4 from './Page4'
import Page5 from './Page5'
import Page6 from './Page6'

const PageCoverI = React.forwardRef(({ render }, ref) => {
  return (
    <div className='bg-white' ref={ref}>
      <PageCover render={render} />
    </div>
  )
})
const Page1I = React.forwardRef(({ render }, ref) => {
  return (
    <div className='bg-white' ref={ref}>
      <Page1 render={render} />
    </div>
  )
})
const Page2I = React.forwardRef(({ render }, ref) => {
  return (
    <div className='bg-white' ref={ref}>
      <Page2 render={render} />
    </div>
  )
})
const Page3I = React.forwardRef(({ render }, ref) => {
  return (
    <div className='bg-white' ref={ref}>
      <Page3 render={render} />
    </div>
  )
})
const Page4I = React.forwardRef(({ render }, ref) => {
  return (
    <div className='bg-white' ref={ref}>
      <Page4 render={render} />
    </div>
  )
})
const Page5I = React.forwardRef(({ render }, ref) => {
  return (
    <div className='bg-white' ref={ref}>
      <Page5 render={render} />
    </div>
  )
})
const Page6I = React.forwardRef(({ render }, ref) => {
  return (
    <div className='bg-white' ref={ref}>
      <Page6 render={render} />
    </div>
  )
})

// const PageCover

export { PageCoverI, Page1I, Page2I, Page3I, Page4I, Page5I, Page6I }
