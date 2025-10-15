import { ShoppingBag, Package, ShoppingCart } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Platform } from "@/pages/Index";

interface PlatformSelectorProps {
  onSelect: (platform: Platform) => void;
}

const platforms = [
  {
    id: "shopee" as Platform,
    name: "Shopee",
    icon: ShoppingBag,
    color: "shopee",
    description: "Comissão 12% • Frete Grátis Disponível",
    features: ["Taxa fixa de 12%", "Programa frete grátis", "Shopee Ads"],
  },
  {
    id: "mercadolivre" as Platform,
    name: "Mercado Livre",
    icon: ShoppingCart,
    color: "mercadolivre",
    description: "Comissão 13-17% • Mercado Envios",
    features: ["Taxa variável 13-17%", "Mercado Envios", "Anúncio Premium/Clássico"],
  },
  {
    id: "amazon" as Platform,
    name: "Amazon FBM",
    icon: Package,
    color: "amazon",
    description: "Comissão 15% • Envio Próprio",
    features: ["Taxa média 15%", "Fulfillment próprio", "Custo de envio variável"],
  },
];

const PlatformSelector = ({ onSelect }: PlatformSelectorProps) => {
  const platformColors: Record<string, string> = {
    shopee: 'hsl(var(--shopee))',
    mercadolivre: 'hsl(var(--mercadolivre))',
    amazon: 'hsl(var(--amazon))',
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 sm:mb-3">
          Escolha sua Plataforma
        </h2>
        <p className="text-muted-foreground text-sm sm:text-lg">
          Selecione o marketplace onde você vende
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          return (
            <Card
              key={platform.id}
              onClick={() => onSelect(platform.id)}
              className="p-5 sm:p-6 cursor-pointer transition-all hover:shadow-medium hover:scale-[1.02] active:scale-[0.98] border-2 group"
              style={{
                borderColor: platformColors[platform.color],
              }}
            >
              <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                <div
                  className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: `${platformColors[platform.color]}15`,
                  }}
                >
                  <Icon className="h-7 w-7 sm:h-8 sm:w-8" style={{ color: platformColors[platform.color] }} />
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">
                    {platform.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {platform.description}
                  </p>
                </div>

                <button 
                  className="w-full mt-2 sm:mt-4 py-2 sm:py-2.5 px-4 rounded-lg font-medium transition-all text-white text-sm sm:text-base"
                  style={{
                    backgroundColor: platformColors[platform.color],
                  }}
                >
                  Selecionar
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PlatformSelector;
