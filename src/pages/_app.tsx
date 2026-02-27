// filepath: /Users/raghavendrayadav/Developer/my-portfolio/src/pages/_app.tsx
import '../styles/globals.css';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
