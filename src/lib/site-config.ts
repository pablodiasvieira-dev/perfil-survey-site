const trimTrailingSlash = (value: string) => value.replace(/\/$/, "")

export const siteUrl = trimTrailingSlash(
  import.meta.env.VITE_SITE_URL || "https://perfilsurvey.com.br",
)

export const appUrl = trimTrailingSlash(
  import.meta.env.VITE_APP_URL || "https://app.perfilsurvey.com.br",
)

export const loginUrl = `${appUrl}/login?utm_source=site&utm_medium=cta&utm_campaign=landing`

export const getRegisterUrl = (plano: string, ciclo: "monthly" | "annual") => {
  const params = new URLSearchParams({
    plano,
    ciclo,
    utm_source: "site",
    utm_medium: "pricing",
    utm_campaign: "planos",
  })
  return `${appUrl}/register?${params.toString()}`
}

export const contactUrl = import.meta.env.VITE_CONTACT_URL?.trim() || ""
