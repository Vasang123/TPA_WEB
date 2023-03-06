import React, { useContext } from "react";
import { LanguageContext, LANG } from "../Language/LanguageContext";
import { LangType } from "@/types/models";
import { ButtonLangBg, MainDivBg, ProductDivBg, SecondarySpanColor } from "../Other/GlobalComponent";
import { ButtonInputBg } from "../Other/GlobalComponent";

export default function Language() {
    const { lang, changeLang } = useContext(LanguageContext);

    const handleSelect = (langKey: keyof typeof LANG) => {
        changeLang(langKey);
        // console.log(lang.is_eng)

    };

    return (
        <div className="country-container">
            <SecondarySpanColor htmlFor="lang-select">Select language:</SecondarySpanColor>
            <ProductDivBg className="lang_drop">
                <ButtonLangBg onClick={() => handleSelect("eng")} disabled={lang.is_eng}>
                    <SecondarySpanColor>
                        English 
                    </SecondarySpanColor>
                </ButtonLangBg>
                <ButtonLangBg onClick={() => handleSelect("ind")} disabled={!lang.is_eng}>
                    <SecondarySpanColor>
                        Indonesian
                    </SecondarySpanColor>
                </ButtonLangBg>

            </ProductDivBg>
        </div>
    );
}