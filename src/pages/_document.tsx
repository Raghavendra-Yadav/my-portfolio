import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Meta Tags */}
        <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
        <meta httpEquiv="content-script-type" content="text/javascript" />
        <meta httpEquiv="content-style-type" content="text/css" />
        <meta httpEquiv="content-language" content="nl" />

        <meta name="author" content="Golla Raghavendra Yadav" />
        <meta
          name="description"
          content="I'm Raghavendra Yadav, a fullstack developer / creative programmer with good knowledge of front-end technics."
        />
        <meta
          name="keywords"
          content="Golla Raghavendra Yadav, Interactive Resume, programmer, Web developer, Startup, Interactive CV, Resume, CV, HRMatches, Algorithms, PHP, MySQL, OOP"
        />
        <meta name="robots" content="index, follow" />
        <meta name="revisit-after" content="14 days" />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@600;700&family=Roboto:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />

        {/* Favicon */}
        <link rel="shortcut icon" href="/images/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/images/favicon/site.webmanifest" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
        <Script
          src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.5/dist/umd/popper.min.js"
          integrity="sha384-Xe+8cL9oJa6tN/veChSP7q+mnSPaj5Bcu9mPX5F5xIGE0DVittaqT5lorf0EI7Vk"
          crossOrigin="anonymous"
          strategy="afterInteractive" // Loads the script after the page is interactive
        ></Script>

        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.min.js"
          integrity="sha384-ODmDIVzN+pFdexxHEHFBQH3/9/vQ9uori45z4JjnFsRydbmQbmL5t1tQ0culUzyK"
          crossOrigin="anonymous"
          strategy="afterInteractive" // Loads the script after the page is interactive
        ></Script>

        <Script
          src="https://kit.fontawesome.com/94324c9cbf.js"
          crossOrigin="anonymous"
          strategy="afterInteractive" // Loads the script after the page is interactive
        ></Script>
      </body>
    </Html>
  );
}
