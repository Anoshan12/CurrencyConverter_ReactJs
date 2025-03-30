import { Currency } from "@/types/currency";

// Base URL for currency flags
const flagBaseUrl = "https://flagcdn.com/w80/";

// Map of country codes to currency codes
const countryCurrencyMap: { [key: string]: string } = {
  'USD': 'us',
  'EUR': 'eu',
  'GBP': 'gb',
  'JPY': 'jp',
  'CAD': 'ca',
  'AUD': 'au',
  'CHF': 'ch',
  'CNY': 'cn',
  'INR': 'in',
  'BRL': 'br'
};

// List of supported currencies with their codes, names, and flag URLs
export const currencies: Currency[] = [
  {
    code: 'USD',
    name: 'United States Dollar',
    flag: `${flagBaseUrl}${countryCurrencyMap['USD']}.png`
  },
  {
    code: 'EUR',
    name: 'Euro',
    flag: `${flagBaseUrl}${countryCurrencyMap['EUR']}.png`
  },
  {
    code: 'GBP',
    name: 'British Pound',
    flag: `${flagBaseUrl}${countryCurrencyMap['GBP']}.png`
  },
  {
    code: 'JPY',
    name: 'Japanese Yen',
    flag: `${flagBaseUrl}${countryCurrencyMap['JPY']}.png`
  },
  {
    code: 'CAD',
    name: 'Canadian Dollar',
    flag: `${flagBaseUrl}${countryCurrencyMap['CAD']}.png`
  },
  {
    code: 'AUD',
    name: 'Australian Dollar',
    flag: `${flagBaseUrl}${countryCurrencyMap['AUD']}.png`
  },
  {
    code: 'CHF',
    name: 'Swiss Franc',
    flag: `${flagBaseUrl}${countryCurrencyMap['CHF']}.png`
  },
  {
    code: 'CNY',
    name: 'Chinese Yuan',
    flag: `${flagBaseUrl}${countryCurrencyMap['CNY']}.png`
  },
  {
    code: 'INR',
    name: 'Indian Rupee',
    flag: `${flagBaseUrl}${countryCurrencyMap['INR']}.png`
  },
  {
    code: 'BRL',
    name: 'Brazilian Real',
    flag: `${flagBaseUrl}${countryCurrencyMap['BRL']}.png`
  }
];
