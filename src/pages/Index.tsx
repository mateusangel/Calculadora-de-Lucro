import { useState } from "react";
import { Calculator, TrendingUp, AlertCircle } from "lucide-react";
import PlatformSelector from "@/components/calculator/PlatformSelector";
import CalculatorForm from "@/components/calculator/CalculatorForm";
import ResultsPanel from "@/components/calculator/ResultsPanel";
import PriceSuggestions from "@/components/calculator/PriceSuggestions";
import { calculateProfit, type CalculationResult } from "@/lib/calculator";

export type Platform = "shopee" | "mercadolivre" | "amazon";

const Index = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [results, setResults] = useState<CalculationResult | null>(null);

  const handleCalculate = (data: any) => {
    const result = calculateProfit(data, selectedPlatform!);
    setResults(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-soft">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Calculadora de Lucro</h1>
              <p className="text-sm text-muted-foreground">Marketplaces: Shopee, Mercado Livre e Amazon</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Info Banner */}
        <div className="mb-8 rounded-xl bg-primary/5 border border-primary/20 p-4 flex items-start gap-3">
          <TrendingUp className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-foreground mb-1">Calcule seu lucro real em segundos</h3>
            <p className="text-sm text-muted-foreground">
              Descubra quanto você realmente lucra considerando todas as taxas, custos e impostos de cada plataforma.
            </p>
          </div>
        </div>

        {/* Platform Selection */}
        {!selectedPlatform && (
          <PlatformSelector onSelect={setSelectedPlatform} />
        )}

        {/* Calculator Interface */}
        {selectedPlatform && (
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-semibold text-foreground">Dados do Produto</h2>
                <button
                  onClick={() => {
                    setSelectedPlatform(null);
                    setResults(null);
                  }}
                  className="text-xs sm:text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Trocar
                </button>
              </div>
              
              <CalculatorForm
                platform={selectedPlatform}
                onCalculate={handleCalculate}
              />
            </div>

            <div className="space-y-4 sm:space-y-6">
              {results ? (
                <>
                  <ResultsPanel results={results} />
                  <PriceSuggestions results={results} />
                </>
              ) : (
                <div className="rounded-xl bg-card border p-6 sm:p-8 flex flex-col items-center justify-center text-center h-full min-h-[300px] sm:min-h-[400px]">
                  <AlertCircle className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                    Preencha os dados
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-sm">
                    Complete o formulário com as informações do produto
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t bg-card/30">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          Calculadora de Lucro para Empreendedores Digitais • 2025
        </div>
      </footer>
    </div>
  );
};

export default Index;
