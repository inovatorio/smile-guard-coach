// Número único das duas unidades (apenas dígitos, com DDI/DDD).
export const WHATSAPP_NUMBER = "5511914028667";

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
