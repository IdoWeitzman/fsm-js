import { CoffeeBean } from "@/app/types";
import coffeeBeansMockData from "./db.json";

export const getCoffeeBeansData = async (): Promise<CoffeeBean[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(coffeeBeansMockData), 500);
  });
