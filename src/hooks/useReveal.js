import { useInView } from 'react-intersection-observer'

export function useReveal(options = {}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.18,
    ...options,
  })

  return { ref, inView }
}
