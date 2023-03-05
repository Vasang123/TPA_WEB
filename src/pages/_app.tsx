import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '../components/Theme/ThemeContext';
import { LanguageProvider } from '@/components/Language/LanguageContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Component {...pageProps} />
      </LanguageProvider>
    </ThemeProvider>
  );

}
