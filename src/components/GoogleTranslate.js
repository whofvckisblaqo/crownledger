"use client";

import { useEffect } from "react";

export default function GoogleTranslate() {
  useEffect(() => {
    // Add Google Translate script
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // Init function
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages:
            "af,sq,am,ar,hy,az,eu,be,bn,bs,bg,ca,ceb,zh-CN,zh-TW,co,hr,cs,da,nl,en,eo,et,fi,fr,fy,gl,ka,de,el,gu,ht,ha,haw,he,hi,hmn,hu,is,ig,id,ga,it,ja,jw,kn,kk,km,ko,ku,ky,lo,la,lv,lt,lb,mk,mg,ms,ml,mt,mi,mr,mn,my,ne,no,ny,or,ps,fa,pl,pt,pa,ro,ru,sm,gd,sr,st,sn,sd,si,sk,sl,so,es,su,sw,sv,tl,tg,ta,tt,te,th,tr,tk,uk,ur,ug,uz,vi,cy,xh,yi,yo,zu",
          layout:
            window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    return () => {
      // Cleanup
      const el = document.getElementById("google_translate_element");
      if (el) el.innerHTML = "";
      delete window.googleTranslateElementInit;
    };
  }, []);

  return (
    <>
      {/* Hidden Google Translate container */}
      <div id="google_translate_element" className="hidden" />

      {/* Custom styled trigger button */}
      <style>{`
        .goog-te-banner-frame { display: none !important; }
        body { top: 0 !important; }
        .goog-te-menu-value span { display: none; }
        .goog-te-gadget { font-size: 0 !important; }
        .goog-te-gadget .goog-te-combo {
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 0;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          z-index: 10;
        }
      `}</style>
    </>
  );
}