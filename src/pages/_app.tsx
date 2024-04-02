import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "../styles/GlobalStyle";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}
