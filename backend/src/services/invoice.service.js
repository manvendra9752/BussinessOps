const calculateInvoice = ({ items, taxPercentage = 0, discount = 0 }) => {
  let subtotal = 0;

  const processedItems = items.map((item) => {
    const lineTotal = Number(item.quantity) * Number(item.unitPrice);

    subtotal += lineTotal;

    return {
      description: item.description,

      quantity: Number(item.quantity),

      unitPrice: Number(item.unitPrice),

      lineTotal,
    };
  });

  const taxAmount = (subtotal * taxPercentage) / 100;

  const totalAmount = subtotal + taxAmount - discount;

  return {
    processedItems,
    subtotal,
    taxAmount,
    totalAmount,
  };
};

module.exports = {
  calculateInvoice,
};
