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
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-foreground mb-3">
          Escolha sua Plataforma
        </h2>
        <p className="text-muted-foreground text-lg">
          Selecione o marketplace onde você vende para começar o cálculo
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          return (
            <Card
              key={platform.id}
              onClick={() => onSelect(platform.id)}
              className="p-6 cursor-pointer transition-all hover:shadow-medium hover:scale-[1.02] active:scale-[0.98] border-2 hover:border-primary group"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div
                  className={`h-16 w-16 rounded-2xl bg-${platform.color}/10 flex items-center justify-center group-hover:bg-${platform.color}/20 transition-colors`}
                >
                  <Icon className={`h-8 w-8 text-${platform.color}`} />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {platform.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {platform.description}
                  </p>
                </div>

                <ul className="w-full space-y-2 text-sm text-muted-foreground">
                  {platform.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="w-full mt-4 py-2.5 px-4 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
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
