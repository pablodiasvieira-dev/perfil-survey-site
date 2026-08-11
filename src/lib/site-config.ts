const trimTrailingSlash = (value: string) => value.replace(/\/$/, "")

export const siteUrl = trimTrailingSlash(
  import.meta.env.VITE_SITE_URL || "https://perfilsurvey.com.br",
)

export const appUrl = trimTrailingSlash(
  import.meta.env.VITE_APP_URL || "https://app.perfilsurvey.com.br",
)

export const loginUrl = `${appUrl}/login?utm_source=site&utm_medium=cta&utm_campaign=landing`

export const registerUrl = `${appUrl}/register?utm_source=site&utm_medium=pricing&utm_campaign=planos`

export const contactUrl = import.meta.env.VITE_CONTACT_URL?.trim() || ""
