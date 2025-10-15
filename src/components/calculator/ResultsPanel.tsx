import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Percent, AlertTriangle } from "lucide-react";
import type { CalculationResult } from "@/lib/calculator";

interface ResultsPanelProps {
  results: CalculationResult;
}

const ResultsPanel = ({ results }: ResultsPanelProps) => {
  const isProfit = results.netProfit > 0;
  const profitColor = isProfit ? "success" : "destructive";

  return (
    <div className="space-y-4">
      {/* Main Result Card */}
      <Card className={`p-6 border-2 ${isProfit ? 'border-success/20 bg-success/5' : 'border-destructive/20 bg-destructive/5'}`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Resultado Final</p>
            <div className="flex items-baseline gap-2">
              <h2 className={`text-4xl font-bold text-${profitColor}`}>
                R$ {results.netProfit.toFixed(2)}
              </h2>
              {isProfit ? (
                <TrendingUp className="h-6 w-6 text-success" />
              ) : (
                <TrendingDown className="h-6 w-6 text-destructive" />
              )}
            </div>
          </div>
          <div className={`h-16 w-16 rounded-2xl bg-${profitColor}/10 flex items-center justify-center`}>
            <DollarSign className={`h-8 w-8 text-${profitColor}`} />
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-lg bg-background/50">
          <Percent className={`h-5 w-5 text-${profitColor}`} />
          <span className="text-sm text-muted-foreground">Margem de Lucro:</span>
          <span className={`text-lg font-bold text-${profitColor}`}>
            {results.profitMargin.toFixed(2)}%
          </span>
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
      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-4">Detalhamento de Custos</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b">
            <span className="text-sm text-muted-foreground">Receita Bruta</span>
            <span className="font-semibold text-foreground">R$ {results.breakdown.revenue.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Custo do Produto</span>
            <span className="font-medium text-destructive">- R$ {results.breakdown.productCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Taxa da Plataforma</span>
            <span className="font-medium text-destructive">- R$ {results.breakdown.platformFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Custos de Envio</span>
            <span className="font-medium text-destructive">- R$ {results.breakdown.shippingCost.toFixed(2)}</span>
          </div>
          {results.breakdown.packagingCost > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Embalagem/Logística</span>
              <span className="font-medium text-destructive">- R$ {results.breakdown.packagingCost.toFixed(2)}</span>
            </div>
          )}
          {results.breakdown.adsCost > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Investimento em Ads</span>
              <span className="font-medium text-destructive">- R$ {results.breakdown.adsCost.toFixed(2)}</span>
            </div>
          )}
          {results.breakdown.taxAmount > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Impostos</span>
              <span className="font-medium text-destructive">- R$ {results.breakdown.taxAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between items-center pt-3 border-t">
            <span className="text-sm font-semibold text-foreground">Custo Total</span>
            <span className="font-bold text-destructive">R$ {results.breakdown.totalCosts.toFixed(2)}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResultsPanel;
