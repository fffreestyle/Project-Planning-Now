import { useState, useEffect, useRef } from "react"
import moment from 'moment'

interface Params {
  initialValue?: number
}
const useTimer = (params: Params) => {
  const { initialValue } = params
  const [now, setNow] = useState<Date>()
  const [startTime, setStartTime] = useState<Date>()
  const [count, setCount] = useState(10000)
  const [initialCount, setInitialCount] = useState<number | undefined>(initialValue)
  const timerRef = useRef<number>()
  const time = count - moment(now).diff(moment(startTime), 'milliseconds')

  useEffect(() => {
    if (window && timerRef.current && time < 10) {
      window.clearInterval(timerRef.current)
      timerRef.current = undefined
    } 
  }, [time])

  useEffect(() => {
    if (initialCount && !timerRef.current) {
      setCount(initialCount)
    }
  }, [initialCount])

  const clearTimer = () => {
    setNow(undefined)
    setStartTime(undefined)
    if (window && timerRef.current) {
      window.clearInterval(timerRef.current)
      timerRef.current = undefined
    }
  }

  const startTimer = () => {
    if (window) {
      setStartTime(new Date())
      timerRef.current = window.setInterval(() => setNow(new Date()), 10)
    }
  }


  const pauseTimer = () => {
    clearTimer()
    setCount(time)
  }

  const resetTimer = () => {
    clearTimer()
    setCount(initialCount ?? 10000)
  }

  const setTimer = (seconds: number) => {
    setInitialCount(seconds * 1000)
  }

  return {
    startTimer,
    pauseTimer,
    resetTimer,
    setTimer,
    time
  }
}

export default useTimer