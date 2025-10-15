import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Calculator } from "lucide-react";
import type { Platform } from "@/pages/Index";

interface CalculatorFormProps {
  platform: Platform;
  onCalculate: (data: FormData) => void;
}

export interface FormData {
  salePrice: number;
  productCost: number;
  shippingCost: number;
  platformFee: number;
  packagingCost: number;
  freeShipping: boolean;
  discount: number;
  adsCost: number;
  taxRate: number;
}

const platformDefaults = {
  shopee: { fee: 12, name: "Shopee" },
  mercadolivre: { fee: 15, name: "Mercado Livre" },
  amazon: { fee: 15, name: "Amazon" },
};

const CalculatorForm = ({ platform, onCalculate }: CalculatorFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    salePrice: 0,
    productCost: 0,
    shippingCost: 0,
    platformFee: platformDefaults[platform].fee,
    packagingCost: 0,
    freeShipping: false,
    discount: 0,
    adsCost: 0,
    taxRate: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(formData);
  };

  const updateField = (field: keyof FormData, value: number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    // Auto-calculate on form change after initial values are set
    if (formData.salePrice > 0 && formData.productCost > 0) {
      onCalculate(formData);
    }
  }, [formData]);

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b">
          <div className={`h-10 w-10 rounded-lg bg-${platform}/10 flex items-center justify-center`}>
            <Calculator className={`h-5 w-5 text-${platform}`} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{platformDefaults[platform].name}</h3>
            <p className="text-xs text-muted-foreground">Preencha os campos abaixo</p>
          </div>
        </div>

        {/* Preço de Venda */}
        <div className="space-y-2">
          <Label htmlFor="salePrice">Preço de Venda (R$) *</Label>
          <Input
            id="salePrice"
            type="number"
            step="0.01"
            min="0"
            placeholder="Ex: 79.90"
            value={formData.salePrice || ""}
            onChange={(e) => updateField("salePrice", parseFloat(e.target.value) || 0)}
            required
          />
        </div>

        {/* Custo do Produto */}
        <div className="space-y-2">
          <Label htmlFor="productCost">Custo do Produto (R$) *</Label>
          <Input
            id="productCost"
            type="number"
            step="0.01"
            min="0"
            placeholder="Ex: 35.00"
            value={formData.productCost || ""}
            onChange={(e) => updateField("productCost", parseFloat(e.target.value) || 0)}
            required
          />
        </div>

        {/* Custo de Envio */}
        <div className="space-y-2">
          <Label htmlFor="shippingCost">Custo de Envio (R$)</Label>
          <Input
            id="shippingCost"
            type="number"
            step="0.01"
            min="0"
            placeholder="Ex: 12.00"
            value={formData.shippingCost || ""}
            onChange={(e) => updateField("shippingCost", parseFloat(e.target.value) || 0)}
            disabled={formData.freeShipping}
          />
        </div>

        {/* Frete Grátis */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
          <div className="space-y-0.5">
            <Label htmlFor="freeShipping" className="text-base">Frete Grátis</Label>
            <p className="text-xs text-muted-foreground">Você paga o frete pelo cliente?</p>
          </div>
          <Switch
            id="freeShipping"
            checked={formData.freeShipping}
            onCheckedChange={(checked) => updateField("freeShipping", checked)}
          />
        </div>

        {/* Taxa da Plataforma */}
        <div className="space-y-2">
          <Label htmlFor="platformFee">Taxa da Plataforma (%)</Label>
          <Input
            id="platformFee"
            type="number"
            step="0.1"
            min="0"
            max="100"
            value={formData.platformFee}
            onChange={(e) => updateField("platformFee", parseFloat(e.target.value) || 0)}
          />
        </div>

        {/* Custo de Embalagem */}
        <div className="space-y-2">
          <Label htmlFor="packagingCost">Embalagem/Logística (R$)</Label>
          <Input
            id="packagingCost"
            type="number"
            step="0.01"
            min="0"
            placeholder="Ex: 5.00"
            value={formData.packagingCost || ""}
            onChange={(e) => updateField("packagingCost", parseFloat(e.target.value) || 0)}
          />
        </div>

        {/* Desconto */}
        <div className="space-y-2">
          <Label htmlFor="discount">Desconto/Cupom (R$)</Label>
          <Input
            id="discount"
            type="number"
            step="0.01"
            min="0"
            placeholder="Ex: 10.00"
            value={formData.discount || ""}
            onChange={(e) => updateField("discount", parseFloat(e.target.value) || 0)}
          />
        </div>

        {/* Investimento em Ads */}
        <div className="space-y-2">
          <Label htmlFor="adsCost">Investimento em Ads (R$)</Label>
          <Input
            id="adsCost"
            type="number"
            step="0.01"
            min="0"
            placeholder="Ex: 5.00"
            value={formData.adsCost || ""}
            onChange={(e) => updateField("adsCost", parseFloat(e.target.value) || 0)}
          />
        </div>

        {/* Taxa de Imposto */}
        <div className="space-y-2">
          <Label htmlFor="taxRate">Imposto Adicional (%)</Label>
          <Input
            id="taxRate"
            type="number"
            step="0.1"
            min="0"
            max="100"
            placeholder="Ex: 8 (Simples Nacional)"
            value={formData.taxRate || ""}
            onChange={(e) => updateField("taxRate", parseFloat(e.target.value) || 0)}
          />
        </div>

        <Button type="submit" className="w-full" size="lg">
          <Calculator className="mr-2 h-5 w-5" />
          Calcular Lucro
        </Button>
      </form>
    </Card>
  );
};

export default CalculatorForm;
