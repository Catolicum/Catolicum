import { useEffect } from "react";
import CookieBanner from "../components/CookieBanner";

export default function App({ Component, pageProps }) {
  useEffect(function() {
    var consent = localStorage.getItem("cookie_consent");
    if (consent === "accepted") {
      var script = document.createElement("script");
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8107872231396052";
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <CookieBanner />
    </>
  );
}