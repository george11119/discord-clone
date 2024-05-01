import { useEffect, useRef } from "react"

/**
 * detects whether user has clicked outside of the element that is connected to the ref
 * if user clicks outside, run the callback function passed in
 */
const useOutsideClick = (callback: () => any, initialCount: number) => {
  const ref = useRef<any>(null)
  const countRef = useRef<number>(initialCount)

  useEffect(() => {
    const handleRightClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        if (countRef.current === 1) callback() // dont close item on first right click
        countRef.current += 1
      }
    }

    document.addEventListener("contextmenu", handleRightClick)

    return () => {
      document.removeEventListener("contextmenu", handleRightClick)
    }
  }, [ref])

  useEffect(() => {
    const handleClick = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [ref])

  return ref
}

export default useOutsideClick
