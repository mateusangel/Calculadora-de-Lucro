import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Percent, AlertTriangle, Calendar } from "lucide-react";
import type { CalculationResult } from "@/lib/calculator";

interface ResultsPanelProps {
  results: CalculationResult;
}

const ResultsPanel = ({ results }: ResultsPanelProps) => {
  const isProfit = results.netProfit > 0;

  return (
    <div className="space-y-4">
      {/* Main Result Card */}
      <Card className={`p-4 sm:p-6 border-2 ${isProfit ? 'border-success bg-success/5' : 'border-destructive bg-destructive/5'}`}>
        <div className="space-y-4">
          {/* Lucro por Unidade */}
          <div>
            <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">Lucro por Unidade</p>
            <div className="flex items-center gap-2">
              <h2 className={`text-3xl sm:text-4xl font-bold ${isProfit ? 'text-success' : 'text-destructive'}`}>
                R$ {results.netProfit.toFixed(2)}
              </h2>
              {isProfit ? (
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-success" />
              ) : (
                <TrendingDown className="h-5 w-5 sm:h-6 sm:w-6 text-destructive" />
              )}
            </div>
          </div>

          {/* Projeção Total */}
          <div className="p-3 sm:p-4 rounded-lg bg-background border-2 border-primary">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                Projeção ({results.totalUnits} unidades)
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-primary">
              R$ {results.projectedProfit.toFixed(2)}
            </div>
          </div>

          {/* Margem */}
          <div className="flex items-center gap-2 p-3 rounded-lg bg-background/50">
            <Percent className={`h-4 w-4 sm:h-5 sm:w-5 ${isProfit ? 'text-success' : 'text-destructive'}`} />
            <span className="text-xs sm:text-sm text-muted-foreground">Margem:</span>
            <span className={`text-base sm:text-lg font-bold ${isProfit ? 'text-success' : 'text-destructive'}`}>
              {results.profitMargin.toFixed(1)}%
            </span>
          </div>
        </div>

        {!isProfit && (
          <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-destructive mb-1">⚠️ Você está no prejuízo!</p>
              <p className="text-muted-foreground">
                O preço de venda não cobre todos os custos. Ajuste seus valores ou veja as sugestões abaixo.
              </p>
            </div>
          </div>
        )}

        {isProfit && results.profitMargin < 15 && (
          <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-warning/10 border border-warning/20">
            <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-warning mb-1">Margem baixa</p>
              <p className="text-muted-foreground">
                Sua margem de lucro está abaixo de 15%. Considere aumentar o preço ou reduzir custos.
              </p>
            </div>
          </div>
        )}
      </Card>

      {/* Cost Breakdown */}
      <Card className="p-4 sm:p-6">
        <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Detalhamento</h3>
        <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
          <div className="flex justify-between items-center pb-2 sm:pb-3 border-b">
            <span className="text-muted-foreground">Receita</span>
            <span className="font-semibold text-foreground">R$ {results.breakdown.revenue.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Produto</span>
            <span className="font-medium text-destructive">-{results.breakdown.productCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Taxa</span>
            <span className="font-medium text-destructive">-{results.breakdown.platformFee.toFixed(2)}</span>
          </div>
          {results.breakdown.shippingCost > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Envio</span>
              <span className="font-medium text-destructive">-{results.breakdown.shippingCost.toFixed(2)}</span>
            </div>
          )}
          {results.breakdown.packagingCost > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Embalagem</span>
              <span className="font-medium text-destructive">-{results.breakdown.packagingCost.toFixed(2)}</span>
            </div>
          )}
          {results.breakdown.adsCost > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Ads</span>
              <span className="font-medium text-destructive">-{results.breakdown.adsCost.toFixed(2)}</span>
            </div>
          )}
          {results.breakdown.taxAmount > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Impostos</span>
              <span className="font-medium text-destructive">-{results.breakdown.taxAmount.toFixed(2)}</span>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ResultsPanel;
