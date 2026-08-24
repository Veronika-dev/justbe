"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    ym?: (id: number, method: string, ...params: unknown[]) => void;
  }
}

export default function YandexMetrika() {
  const id = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!id || !window.ym) return;

    const query = searchParams.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    window.ym(id, "hit", url);
  }, [id, pathname, searchParams]);

  if (!id) return null;

  return (
    <Script id="yandex-metrika" strategy="afterInteractive">
      {`
        (function(m,e,t,r,i,k,a){
          m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
        })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${id}', 'ym');


        ym(${id}, "init", {
          defer: true,
          ssr:true,
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          ecommerce: "dataLayer",
          referrer: document.referrer,
          url: location.href, 
        });
      `}
    </Script>
  );
}
