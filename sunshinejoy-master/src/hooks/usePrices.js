import { usePersistedStore } from "./usePersistedStore";
import { convertCurrency } from "../utils/functions/convertCurrency";
import { CURRENCY_OPTIONS } from "../utils/functions/convertCurrency";
export const usePrices = () => {
  const currency = usePersistedStore((state) => state.currency);
  const p = (price) => {
    let result = convertCurrency(price, currency);
   
    return result;
  };

  const f =  (result)=>{
    switch (currency) {
      case CURRENCY_OPTIONS.SGD:
        result = `$${result} SGD`;
        break;
      case CURRENCY_OPTIONS.USD:
        result = `$${result} USD`;
        break;
      case CURRENCY_OPTIONS.AUD:
        result = `$${result} AUD`;
        break;
      case CURRENCY_OPTIONS.MYR:
        result = `RM ${result}`;
        break;
      case CURRENCY_OPTIONS.GBP:
        result = `£${result}`;
        break;
    }
    return result;
  }

  return {
    p,f
  };
};
