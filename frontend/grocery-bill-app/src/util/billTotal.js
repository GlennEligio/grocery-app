const billTotal = (bill, isDiscounted) => {
  var total = 0;
  var totalDiscounted = 0;

  bill.itemList.forEach((item) => {
    total += item.price * item.amount;
    if (item.discounted) {
      totalDiscounted +=
        item.price * (1 - item.discountPercentage) * item.amount;
    } else {
      totalDiscounted += item.price * item.amount;
    }
  });

  if (isDiscounted) {
    return totalDiscounted;
  } else {
    return total;
  }
};

export default billTotal;
