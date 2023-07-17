import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.css" rel="stylesheet" />
            </Head>
            <body className="bg-[#feffea]">
                <Main />
                <NextScript />
                <Script src="https://cdn.jsdelivr.net/npm/sweetalert2@11" />
                <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js" />
            </body>
        </Html>
    );
}
