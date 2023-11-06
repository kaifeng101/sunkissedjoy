import SGIcon from "country-flag-icons/react/3x2/SG";
import USIcon from "country-flag-icons/react/3x2/US";
import MalIcon from "country-flag-icons/react/3x2/MY";
import AUIcon from "country-flag-icons/react/3x2/AU";
import Britain from "country-flag-icons/react/3x2/GB";

const CONVERTER = {
  USD: 0.75,
  MYR: 3.26,
  AUD: 1.09,
  GBP: 0.62,
  SGD: 1,
};

export const CURRENCY_OPTIONS = {
  SGD: "SGD",
  USD: "USD",
  MYR: "MYR",
  AUD: "AUD",
  GBP: "GBP",
};

export const CURRENCY_DATA = [
  { icon: SGIcon, value: "SGD", title: "Singapore dollar" },
  { icon: USIcon, value: "USD", title: "US Dollar" },
  { icon: MalIcon, value: "MYR", title: "Malaysian Dollar" },
  { icon: AUIcon, value: "AUD", title: "Australian Dollar" },
  { icon: Britain, value: "GBP", title: "Birtish Pound" },
];

export const convertCurrency =  (amount, currency) => {
  if (CONVERTER[currency]) {
    console.log(`Converting for currency ${currency}`)
    return ((+amount) * CONVERTER[currency]).toFixed(2);
  }
  return amount;
};


export const handlePriceStateUpdate = async (prices, setPrices,currency) => {

  let updatedPrices = {};
  for (const [key, value] of Object.entries(prices)) {
    if (updatedPrices[key]) {
    updatedPrices[key] = await convertCurrency(prices[key], currency);
    }
  }
  setPrices(updatedPrices);
};
