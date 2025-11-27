import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

export default function Canonical() {
  const { pathname } = useLocation();

  // Build canonical URL with required trailing slash
  const canonical =
    "https://www.griffonsys.com" +
    (pathname.endsWith("/") ? pathname : pathname + "/");

  return (
    <Helmet>
      <link rel="canonical" href={canonical} />
    </Helmet>
  );
}
