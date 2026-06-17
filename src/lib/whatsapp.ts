// Substitua WHATSAPP_NUMBER_PLACEHOLDER pelo número real (apenas dígitos, com DDI/DDD).
export const WHATSAPP_NUMBER = "WHATSAPP_NUMBER_PLACEHOLDER";

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
