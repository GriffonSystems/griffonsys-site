import { Helmet } from "react-helmet"
import { useLocation } from "react-router-dom"

export default function Canonical() {
  const { pathname } = useLocation()

  // Normalize URL: no trailing slash except root
  const cleanPath =
    pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname

  const canonical = `https://griffonsys.com${cleanPath}`

  return (
    <Helmet>
      <link rel="canonical" href={canonical} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:url" content={canonical} />
    </Helmet>
  )
}
