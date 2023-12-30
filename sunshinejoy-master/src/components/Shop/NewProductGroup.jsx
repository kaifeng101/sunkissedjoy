import React from 'react';
import NewProductCard from './NewProductCard';

const NewProductGroup = ({ products, setCurrentProduct, selectedQuantity, selectedBudget, selectedLeadTime, selectedProductTitle }) => {
  if (selectedProductTitle) {
    products=products?.filter(product=>product?.title == selectedProductTitle);
  }

  const filterProducts = () => {
    return products.filter((product) => {
      // Add your specific conditions for filtering based on selected values
      if (selectedQuantity === '0-50') {
        const budgetCondition =
          selectedBudget === 'Default' || product.price.perPiece < parseFloat(selectedBudget.replace('Below $', ''));
  
        let leadTimeCondition = true;
  
        switch (selectedLeadTime) {
          case '2 work days':
            leadTimeCondition = product.leadTime.perPiece >= 1 && product.leadTime.perPiece <= 2;
            break;
          case '5 work days':
            leadTimeCondition = product.leadTime.perPiece >= 3 && product.leadTime.perPiece <= 5;
            break;
          case '10 work days':
            leadTimeCondition = product.leadTime.perPiece >= 6 && product.leadTime.perPiece <= 10;
            break;
          case '15 work days':
            leadTimeCondition = product.leadTime.perPiece >= 11 && product.leadTime.perPiece <= 15;
            break;
          case '20 work days':
            leadTimeCondition = product.leadTime.perPiece >= 16 && product.leadTime.perPiece <= 20;
            break;
          default:
            leadTimeCondition = true; // Default condition if no specific lead time is selected
            break;
        }
  
        return budgetCondition && leadTimeCondition;
      } else if (selectedQuantity === '51-100') {
        const budgetCondition =
          selectedBudget === 'Default' || product.price.per100Pieces < parseFloat(selectedBudget.replace('Below $', ''));
  
        let leadTimeCondition = true;
  
        switch (selectedLeadTime) {
          case '2 work days':
            leadTimeCondition = product.leadTime.per100Pieces >= 1 && product.leadTime.per100Pieces <= 2;
            break;
          case '5 work days':
            leadTimeCondition = product.leadTime.per100Pieces >= 3 && product.leadTime.per100Pieces <= 5;
            break;
          case '10 work days':
            leadTimeCondition = product.leadTime.per100Pieces >= 6 && product.leadTime.per100Pieces <= 10;
            break;
          case '15 work days':
            leadTimeCondition = product.leadTime.per100Pieces >= 11 && product.leadTime.per100Pieces <= 15;
            break;
          case '20 work days':
            leadTimeCondition = product.leadTime.per100Pieces >= 16 && product.leadTime.per100Pieces <= 20;
            break;
          default:
            leadTimeCondition = true; // Default condition if no specific lead time is selected
            break;
        }
  
        return budgetCondition && leadTimeCondition;
      } else if (selectedQuantity === '101-500') {
        const budgetCondition =
          selectedBudget === 'Default' || product.price.per500Pieces < parseFloat(selectedBudget.replace('Below $', ''));
  
        let leadTimeCondition = true;
  
        switch (selectedLeadTime) {
          case '2 work days':
            leadTimeCondition = product.leadTime.per500Pieces >= 1 && product.leadTime.per500Pieces <= 2;
            break;
          case '5 work days':
            leadTimeCondition = product.leadTime.per500Pieces >= 3 && product.leadTime.per500Pieces <= 5;
            break;
          case '10 work days':
            leadTimeCondition = product.leadTime.per500Pieces >= 6 && product.leadTime.per500Pieces <= 10;
            break;
          case '15 work days':
            leadTimeCondition = product.leadTime.per500Pieces >= 11 && product.leadTime.per500Pieces <= 15;
            break;
          case '20 work days':
            leadTimeCondition = product.leadTime.per500Pieces >= 16 && product.leadTime.per500Pieces <= 20;
            break;
          default:
            leadTimeCondition = true; // Default condition if no specific lead time is selected
            break;
        }
  
        return budgetCondition && leadTimeCondition;
      } else if (selectedQuantity === '>500') {
        const budgetCondition =
          selectedBudget === 'Default' || product.price.perAbove500Pieces < parseFloat(selectedBudget.replace('Below $', ''));
  
        let leadTimeCondition = true;
  
        switch (selectedLeadTime) {
          case '2 work days':
            leadTimeCondition = product.leadTime.perAbove500Pieces >= 1 && product.leadTime.perAbove500Pieces <= 2;
            break;
          case '5 work days':
            leadTimeCondition = product.leadTime.perAbove500Pieces >= 3 && product.leadTime.perAbove500Pieces <= 5;
            break;
          case '10 work days':
            leadTimeCondition = product.leadTime.perAbove500Pieces >= 6 && product.leadTime.perAbove500Pieces <= 10;
            break;
          case '15 work days':
            leadTimeCondition = product.leadTime.perAbove500Pieces >= 11 && product.leadTime.perAbove500Pieces <= 15;
            break;
          case '20 work days':
            leadTimeCondition = product.leadTime.perAbove500Pieces >= 16 && product.leadTime.perAbove500Pieces <= 20;
            break;
          default:
            leadTimeCondition = true; // Default condition if no specific lead time is selected
            break;
        }
  
        return budgetCondition && leadTimeCondition;
      }

      // Example: Checking if product's budget, quantity, and lead time match selected values
      const quantityMatch = selectedQuantity == '0-50' || product.quantity === selectedQuantity;
      const budgetMatch = selectedBudget === 'Default' || product.budget === selectedBudget;
      const leadTimeMatch = selectedLeadTime === 'Default' || product.leadTime === selectedLeadTime;

      return budgetMatch && quantityMatch && leadTimeMatch;
    });
  };

  const filteredProducts = filterProducts();

  return (
    <div className='grid mx-10 grid-cols-6 max-xl:gap-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 max-xs:grid-cols-1 max-lg:gap-6 max-lg:gap-y-10 max-sm:gap-12 gap-10 gap-y-16'>
      {filteredProducts.length === 0 ? (
        <div className='text-center'>Coming soon</div>
      ) : (
        filteredProducts.map((product, index) => (
          <NewProductCard
            handleClick={() => setCurrentProduct(product)}
            key={index}
            data={product}
            selectedQuantity={selectedQuantity}
            selectedBudget={selectedBudget}
            selectedLeadTime={selectedLeadTime}
          />
        ))
      )}
    </div>
  );
};

export default NewProductGroup;
