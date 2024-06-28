import { Inter } from "next/font/google";
import { ChakraProvider, ReactQueryProvider } from "./providers";
import FavoriteProvider from "./context/favoriteContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Star Wars Characters",
  description: "A list of Star Wars characters",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <FavoriteProvider>
            <ChakraProvider>
              <ToastContainer />
              {children}
            </ChakraProvider>
          </FavoriteProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
