const billConverter = (bill) => {
  var itemListWithAmount = [];
  bill.itemList.forEach((item) => {
    // checks if the item is already in list
    var inItemList = false;

    /*
      Checks if the item in bill already exist in the item array
      If it does, increment the item's amount and set inItemList bool to true
      Else, just return the item
    */
    itemListWithAmount = itemListWithAmount.map((itemInList) => {
      if (itemInList.id === item.id) {
        inItemList = true;
        return {
          ...itemInList,
          amount: itemInList.amount + 1,
        };
      }
      return itemInList;
    });

    // If item is not in list, add it in array and set amount prop to one
    if (!inItemList) {
      itemListWithAmount.push({
        ...item,
        amount: 1,
      });
    }
  });

  // return the bill with new itemList prop being the array of item with amount
  return {
    ...bill,
    itemList: itemListWithAmount,
  };
};

export default billConverter;
