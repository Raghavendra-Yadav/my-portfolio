// filepath: /Users/raghavendrayadav/Developer/my-portfolio/src/pages/_app.tsx
import '../styles/globals.css';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
