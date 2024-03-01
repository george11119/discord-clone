import { useEffect, useRef } from "react"

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
