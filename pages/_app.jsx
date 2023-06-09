import "../styles/globals.css";
import Layout from "../components/Layout";
import React from "react";
import { useRouter } from "next/router";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";                                       
        
import 'primeicons/primeicons.css';
        


function MyApp({ Component, pageProps }) {
  const router = useRouter();

  if (router.asPath === "/login" ) return <Component {...pageProps} />;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
export default MyApp;
