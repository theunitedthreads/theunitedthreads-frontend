export const getTableTagColor = (status) => {
  switch (status) {
    case "PENDING":
      return "blue";
    case "SHIPPED":
      return "purple";
    case "DELIVERED":
      return "green";
    case "CANCELED":
      return "red";
    default:
      return "bg-red-500";
  }
};
