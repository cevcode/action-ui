import { Variants } from 'framer-motion'

export const animationLeftToCenter = {
  hidden: { x: -100, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: i * 0.15,
      type: 'Inertia'
    }
  }),
  exit: {
    x: 100,
    opacity: 0,
    transition: {
      when: 'afterChildren',
      duration: 0.6,
      type: 'Inertia'
    }
  }
}

export const animationTopToBottom = {
  hidden: { y: -50, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.15,
      type: 'Inertia'
    }
  }),
  exit: {
    y: 50,
    opacity: 0,
    transition: {
      when: 'afterChildren',
      duration: 0.3,
      type: 'Inertia'
    }
  }
}

export const cardOpenAnimation = {
  hidden: { height: 0 },
  visible: {
    height: 'auto',
    transition: {
      duration: 0.6,
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}

export const fadeInAnimation = (delay?: number) => {
  return {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        delay: delay ? delay : 0.15
      }
    }
  }
}

export const topToBottomAnimation = (delay?: number) => {
  return {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay ? delay : 0.15
      }
    }
  }
}

export const bottomToTopAnimation = (delay?: number) => {
  return {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay ? delay : 0.15
      }
    }
  }
}

export const animationDownToTop = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.5,
      type: 'Inertia'
    }
  })
}

export const animationRightToLeftFadeIn = (delay?: number) => {
  return {
    hidden: { x: 50, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: delay ? delay : 0.15,
        type: 'Inertia'
      }
    })
  }
}

export const animationLeftToRightFadeIn = (delay?: number) => {
  return {
    hidden: { x: -50, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: delay ? delay : 0.15,
        type: 'Inertia'
      }
    })
  }
}

export const textLoaderAnimation = (delay?: number) => {
  return {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        delay: delay ? delay : 0.15
      }
    }
  }
}

export const getCardVariants = (delay?: number): Variants => {
  return {
    hidden: {
      opacity: 0,
      y: -50,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        delay: delay ? delay : 0.15,
        bounce: 0.4,
        duration: 0.8
      }
    },
    deleting: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  }
}
