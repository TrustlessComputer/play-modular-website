import {ApplicationEnvironment} from "@/constant/types";
import {APP_ENV} from "@/constant/constant";


export const isProduction = (): boolean => {
  return APP_ENV === ApplicationEnvironment.PRODUCTION;
};

export const isDevelopment = (): boolean => {
  return APP_ENV === ApplicationEnvironment.DEVELOP;
};

export const isBrowser = (): boolean => {
  return typeof window !== 'undefined';
};
