import { type WeightItem, weightItems } from "dinkum-data";

export const allWeightItems: WeightItem[] = weightItems().get();

export const WEIGHT_STEP = 0.01;

export const clampWeight = (item: WeightItem, weight: number) =>
  Math.min(Math.max(weight, item.minWeight), item.maxWeight);

/** The price is rounded to a whole dink. */
export const priceFor = (item: WeightItem, weight: number) =>
  Math.round(item.pricePerKg * weight);

/** One step up or down, rounded to hundredths so repeated steps do not drift. */
export const stepWeight = (
  item: WeightItem,
  weight: number,
  direction: 1 | -1,
) =>
  clampWeight(item, Math.round((weight + direction * WEIGHT_STEP) * 100) / 100);

export const formatWeight = (weight: number) => weight.toFixed(2);
