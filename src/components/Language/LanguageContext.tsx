import { LangType } from "@/types/models";
import React, { createContext, useEffect, useState } from "react";

export const LANG: LangType = {
    eng: {
        is_eng: true,
    },
    ind: {
        is_eng: false,
    },
};

export const LanguageContext = createContext({
    lang: LANG.eng,
    changeLang: (lang_fe: keyof typeof LANG) => { },

});

export const LanguageProvider = ({ children }: any) => {
    const [lang, setLang] = useState(LANG.eng);
    useEffect(() => {
        const storedTheme = localStorage.getItem("lang");
        if (storedTheme && storedTheme == "ind") {
            setLang(LANG.ind);
        }
    }, []);

    const changeLang = (langKey: keyof typeof LANG) => {
        const newLang = LANG[langKey];
        localStorage.setItem("lang", langKey);
        setLang(newLang);
    };

    return (
        <LanguageContext.Provider value={{ lang, changeLang }}>
            {children}
        </LanguageContext.Provider>
    );
};