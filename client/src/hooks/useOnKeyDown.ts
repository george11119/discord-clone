import { useEffect } from "react"

const useOnKeyDown = (keycode: number, onEscapeKeyDown: () => void) => {
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.keyCode === keycode) {
        onEscapeKeyDown()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [onEscapeKeyDown])
}

export default useOnKeyDown
