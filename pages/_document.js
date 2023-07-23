//_document.js
 
import { Html, Head, Main, NextScript } from "next/document";
 
const Document = () => {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <div id="portal-root"></div> 
      </body>
    </Html>
  );
};
 
export default Document;