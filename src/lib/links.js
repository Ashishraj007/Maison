import { BUSINESS, WHATSAPP_MESSAGES } from "../config/business";

export const hasPhone = Boolean(BUSINESS.phone);
export const hasWhatsApp = Boolean(BUSINESS.whatsapp);

export const telHref = hasPhone ? `tel:${BUSINESS.phone.replace(/[^\d+]/g, "")}` : null;

// With no number configured, wa.me/?text= opens WhatsApp with the message ready and lets the user pick the chat.
export const waHref = (message = WHATSAPP_MESSAGES.general) => {
  const text = encodeURIComponent(message);
  return hasWhatsApp ? `https://wa.me/${BUSINESS.whatsapp.replace(/\D/g, "")}?text=${text}` : `https://wa.me/?text=${text}`;
};

export const serviceMessage = (serviceName) => WHATSAPP_MESSAGES.service.replace("{service}", serviceName);

export const writeReviewHref = BUSINESS.writeReviewUrl || BUSINESS.googleReviewsUrl;
