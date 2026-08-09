// Os 3 grandes produtos da nossa suíte de identidade digital
export type ProductType = "email-signature" | "digital-badge" | "digital-business-card";

// As 3 variações de design possíveis para cada produto
export type EmailTemplateType = "classic" | "modern" | "minimalist";
export type BadgeTemplateType = "tech" | "corporate" | "creative";
export type BusinessCardTemplateType = "mobile-app" | "horizontal-banner" | "sleek-dark";

export type TemplateType = EmailTemplateType | BadgeTemplateType | BusinessCardTemplateType;

export interface SignatureData {
  // Controle de Navegação e Seleção
  productType: ProductType;
  template: TemplateType;

  // Campos Básicos Universais
  fullName: string;
  position: string;
  site: string;
  phone: string;
  email: string;
  photo: string;
  withPhoto: boolean;
  copied: boolean;

  // Redes Sociais Dinâmicas
  linkedinUrl: string;
  githubUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  whatsappNumber: string;
  twitterUrl: string;
  youtubeUrl: string;

  // Campos Específicos para Crachás Digitais (Badge)
  badgeId: string;
  badgeExpiration: string;
  department: string;

  // Campos Específicos para Cartões Digitais (Business Card - Tags/Especialidades)
  specialties: string[]; // Ex: ["PREDIAL", "INDUSTRIAL", "RESIDENCIAL", "MANUTENÇÃO"]
}