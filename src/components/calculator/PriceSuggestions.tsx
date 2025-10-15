import { Card } from "@/components/ui/card";
import { Lightbulb, Target } from "lucide-react";
import type { CalculationResult } from "@/lib/calculator";

interface PriceSuggestionsProps {
  results: CalculationResult;
}

const PriceSuggestions = ({ results }: PriceSuggestionsProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
          <Lightbulb className="h-5 w-5 text-warning" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Sugestões de Preço</h3>
          <p className="text-xs text-muted-foreground">Para atingir diferentes margens de lucro</p>
        </div>
      </div>

      <div className="space-y-3">
        {/* Break-even */}
        <div className="p-4 rounded-lg bg-muted/50 border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Ponto de Equilíbrio</span>
            </div>
            <span className="text-lg font-bold text-foreground">
              R$ {results.suggestions.breakEven.toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Preço mínimo para não ter prejuízo (0% de lucro)
          </p>
        </div>

        {/* 10% margin */}
        <div className="p-4 rounded-lg bg-warning/5 border border-warning/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Margem de 10%</span>
            <span className="text-lg font-bold text-warning">
              R$ {results.suggestions.margin10.toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Lucro estimado: R$ {(results.suggestions.margin10 * 0.1).toFixed(2)}
          </p>
        </div>

        {/* 20% margin */}
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Margem de 20%</span>
            <span className="text-lg font-bold text-primary">
              R$ {results.suggestions.margin20.toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Lucro estimado: R$ {(results.suggestions.margin20 * 0.2).toFixed(2)}
          </p>
        </div>

        {/* 30% margin */}
        <div className="p-4 rounded-lg bg-success/5 border border-success/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Margem de 30%</span>
            <span className="text-lg font-bold text-success">
              R$ {results.suggestions.margin30.toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Lucro estimado: R$ {(results.suggestions.margin30 * 0.3).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
        <p className="text-xs text-muted-foreground">
          💡 <span className="font-medium text-foreground">Dica:</span> Margens entre 20-30% são consideradas saudáveis para e-commerce. 
          Considere seus custos fixos e concorrência ao definir o preço final.
        </p>
      </div>
    </Card>
  );
};

export default PriceSuggestions;
