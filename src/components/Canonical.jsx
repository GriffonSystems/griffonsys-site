import { Helmet } from "react-helmet"
import { useLocation } from "react-router-dom"

export default function Canonical() {
  const { pathname } = useLocation()

  const cleanPath =
    pathname !== "/" && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname

  const canonical = `https://griffonsys.com${cleanPath}`

  return (
    <Helmet>
      <link key="canonical" rel="canonical" href={canonical} />
      <meta key="og:url" property="og:url" content={canonical} />
      <meta key="twitter:url" name="twitter:url" content={canonical} />
    </Helmet>
  )
}
