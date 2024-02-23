import { useEffect } from "react";

export default function useEvents(event, handler, passive = false) {
  useEffect(() => {
    window.addEventListener(event, handler, passive); //listen to windows events
    return () => {
      window.removeEventListener(event, handler, passive); //cleanup after listening
    };
  }, [event, handler, passive]);
}
