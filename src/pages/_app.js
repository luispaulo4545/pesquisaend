import "../styles/app.scss";

import Head from "next/head";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cabin:wght@400;700&family=Roboto:wght@100;400;900&display=swap"
          rel="stylesheet"
        />
        <title>Pesquisa Hospital da Bahia</title>
      </Head>
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
