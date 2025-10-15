import { Card } from "@/components/ui/card";
import { Lightbulb, Target } from "lucide-react";
import type { CalculationResult } from "@/lib/calculator";

interface PriceSuggestionsProps {
  results: CalculationResult;
}

const PriceSuggestions = ({ results }: PriceSuggestionsProps) => {
  return (
    <Card className="p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-warning/10 flex items-center justify-center">
          <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-warning" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground text-sm sm:text-base">Sugestões de Preço</h3>
          <p className="text-xs text-muted-foreground hidden sm:block">Margens ideais</p>
        </div>
      </div>

      <div className="space-y-2 sm:space-y-3">
        {/* Break-even */}
        <div className="p-3 sm:p-4 rounded-lg bg-muted/50 border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
              <span className="text-xs sm:text-sm font-medium text-foreground">Equilíbrio</span>
            </div>
            <span className="text-base sm:text-lg font-bold text-foreground">
              R$ {results.suggestions.breakEven.toFixed(2)}
            </span>
          </div>
        </div>

        {/* 10% margin */}
        <div className="p-3 sm:p-4 rounded-lg bg-warning/5 border border-warning/20">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-foreground">10%</span>
            <span className="text-base sm:text-lg font-bold text-warning">
              R$ {results.suggestions.margin10.toFixed(2)}
            </span>
          </div>
        </div>

        {/* 20% margin */}
        <div className="p-3 sm:p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-foreground">20%</span>
            <span className="text-base sm:text-lg font-bold text-primary">
              R$ {results.suggestions.margin20.toFixed(2)}
            </span>
          </div>
        </div>

        {/* 30% margin */}
        <div className="p-3 sm:p-4 rounded-lg bg-success/5 border border-success/20">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-foreground">30%</span>
            <span className="text-base sm:text-lg font-bold text-success">
              R$ {results.suggestions.margin30.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PriceSuggestions;
