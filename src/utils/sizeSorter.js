const sizesOrder = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

export const sizeSorter = (sizeArr) => {
  const sizes = [...sizeArr];
  sizes?.sort((a, b) => sizesOrder.indexOf(a) - sizesOrder.indexOf(b));

  return sizes;
};
