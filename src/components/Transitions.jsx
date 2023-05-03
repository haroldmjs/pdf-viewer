import React, { useEffect } from 'react'
import { useSpring, animated } from '@react-spring/web'

const duration = 500

const Opacity = ({ render, children }) => {
  const [opacity, setOpacity] = useSpring(() => ({
    from: { opacity: 0 },
    config: { duration }
  }))

  useEffect(() => {
    if (render) {
      setOpacity({
        to: { opacity: 1 }
      })
    }

    return () => {
      setOpacity({
        from: { opacity: 0 }
      })
    }
  }, [render])
  return (
    <animated.div style={{ ...opacity }}>
      {React.cloneElement(children, {
        className: children.props.className ? children.props.className + ' absolute bottom-0' : 'absolute bottom-0'
      })}
    </animated.div>
  )
}

const LeftRight = ({ render, children }) => {
  const [positionX, setPositionX] = useSpring(() => ({
    from: { x: '-100%' },
    config: { duration }
  }))

  useEffect(() => {
    if (render) {
      setPositionX({
        to: { x: '0%' }
      })
    }

    return () => {
      setPositionX({
        from: { x: '-100%' }
      })
    }
  }, [render])
  return (
    <animated.div style={{ ...positionX }} className='absolute overflow-hidden h-full w-full'>
      {React.cloneElement(children, {
        className: children.props.className ? children.props.className + ' absolute bottom-0' : 'absolute bottom-0'
      })}
    </animated.div>
  )
}

const RightLeft = ({ render, children }) => {
  const [positionX, setPositionX] = useSpring(() => ({
    from: { x: '100%' },
    config: { duration }
  }))

  useEffect(() => {
    if (render) {
      setPositionX({
        to: { x: '0%' }
      })
    }

    return () => {
      setPositionX({
        from: { x: '100%' }
      })
    }
  }, [render])
  return (
    <animated.div style={{ ...positionX }} className='absolute overflow-hidden h-full w-full'>
      {React.cloneElement(children, {
        className: children.props.className ? children.props.className + ' absolute bottom-0' : 'absolute bottom-0'
      })}
    </animated.div>
  )
}

const DownUp = ({ render, children }) => {
  const [positionX, setPositionX] = useSpring(() => ({
    from: { y: '50%' },
    config: { duration }
  }))

  useEffect(() => {
    if (render) {
      setPositionX({
        to: { y: '0%' }
      })
    }

    return () => {
      setPositionX({
        from: { y: '50%' }
      })
    }
  }, [render])
  return (
    <animated.div style={{ ...positionX }} className='absolute overflow-hidden h-full w-full'>
      {React.cloneElement(children, {
        className: children.props.className ? children.props.className + ' absolute bottom-0' : 'absolute bottom-0'
      })}
    </animated.div>
  )
}

export { Opacity, LeftRight, RightLeft, DownUp }
