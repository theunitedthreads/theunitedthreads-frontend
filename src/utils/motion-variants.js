export const fadeUpVariants = {
  initial: {
    y: 50,
    opacity: 0,
  },

  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 0.2,
    },
  },
};

export const fadeDownVariants = {
  initial: {
    y: 0,
    opacity: 1,
  },
  animate: {
    y: 50,
    opacity: 0,

    transition: {
      type: "spring",
      stiffness: 185,
      damping: 40,
      mass: 0.2,
    },
  },
};
