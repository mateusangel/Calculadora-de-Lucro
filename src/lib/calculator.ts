import type { FormData } from "@/components/calculator/CalculatorForm";
import type { Platform } from "@/pages/Index";

export interface CalculationResult {
  netProfit: number;
  profitMargin: number;
  totalUnits: number;
  projectedProfit: number;
  breakdown: {
    revenue: number;
    productCost: number;
    platformFee: number;
    shippingCost: number;
    packagingCost: number;
    adsCost: number;
    taxAmount: number;
    totalCosts: number;
  };
  suggestions: {
    breakEven: number;
    margin10: number;
    margin20: number;
    margin30: number;
  };
}

export const calculateProfit = (data: FormData, platform: Platform): CalculationResult => {
  // Revenue calculation
  const revenue = data.salePrice - data.discount;

  // Cost calculations
  const productCost = data.productCost;
  const platformFee = (data.salePrice * data.platformFee) / 100;
  const shippingCost = data.shippingCost;
  const packagingCost = data.packagingCost;
  const adsCost = data.adsCost;
  
  // Tax calculation (applied to revenue)
  const taxAmount = (revenue * data.taxRate) / 100;

  // Total costs
  const totalCosts = productCost + platformFee + shippingCost + packagingCost + adsCost + taxAmount;

  // Net profit per unit
  const netProfit = revenue - totalCosts;

  // Profit margin
  const profitMargin = revenue > 0 ? (netProfit / revenue) * 100 : 0;

  // Projection calculations
  const totalUnits = (data.unitsPerDay || 1) * (data.days || 1);
  const projectedProfit = netProfit * totalUnits;

  // Price suggestions
  const fixedCosts = productCost + shippingCost + packagingCost + adsCost;
  const variableCostRate = (data.platformFee + data.taxRate) / 100;

  // Break-even: fixedCosts / (1 - variableCostRate)
  const breakEven = fixedCosts / (1 - variableCostRate);

  // For margin X%: fixedCosts / (1 - variableCostRate - X%)
  const margin10 = fixedCosts / (1 - variableCostRate - 0.10);
  const margin20 = fixedCosts / (1 - variableCostRate - 0.20);
  const margin30 = fixedCosts / (1 - variableCostRate - 0.30);

  return {
    netProfit,
    profitMargin,
    totalUnits,
    projectedProfit,
    breakdown: {
      revenue,
      productCost,
      platformFee,
      shippingCost,
      packagingCost,
      adsCost,
      taxAmount,
      totalCosts,
    },
    suggestions: {
      breakEven,
      margin10,
      margin20,
      margin30,
    },
  };
};
