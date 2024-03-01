import { useEffect, useRef } from "react"

/**
 * detects whether user has clicked outside of the element that is connected to the ref
 * if user clicks outside, run the callback function passed in
 */
const useOutsideClick = (callback: () => any) => {
  const ref = useRef<any>(null)

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
