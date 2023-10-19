import "@/globals.css";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";

import Providers from "../../context/Providers";
import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";

export const metadata = {
  title: "MAKit",
  description: "Ferramentas para uso da Melo Ataide",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="bg-gray-800 h-screen flex flex-col">
        <Providers>
          <Navbar />
          <div className="flex-grow">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
