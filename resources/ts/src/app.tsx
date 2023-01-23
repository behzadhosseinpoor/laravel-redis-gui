import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ContextsProvider from "./contexts/provide";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import ToastContainer from "./components/public/toast";
import Container from "./container";
import classNames from "classnames";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ContextsProvider>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: "dark",
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif",
            fontSizes: {
              xs: 12,
              sm: 14,
              md: 16,
              lg: 18,
              xl: 20,
            },
            spacing: {
              xs: 8,
              sm: 12,
              md: 16,
              lg: 24,
              xl: 32,
            },
            breakpoints: {
              xs: 640,
              sm: 768,
              md: 1024,
              lg: 1280,
              xl: 1536,
            },
            primaryColor: "red",
          }}
        >
          <ModalsProvider modalProps={{}}>
            <section>
              <ToastContainer
                rtl={true}
                position="bottom-right"
                autoClose={4000}
                theme="colored"
                hideProgressBar
                newestOnTop
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />

              <Container />

              <div
                className={classNames(
                  "hidden",
                  "pl-36 pl-12",
                  "text-gray-500 text-red-500 text-blue-500 text-grape-500",
                  "bg-grape-700 bg-blue-500 bg-green-500 bg-orange-500 bg-pink-500 bg-gray-700 bg-lime-500",
                  "text-sm text-md text-lg text-xl text-2xl text-3xl text-4xl text-5xl text-6xl text-7xl text-8xl text-9xl"
                )}
              />
            </section>
          </ModalsProvider>
        </MantineProvider>
      </ContextsProvider>
    </QueryClientProvider>
  );
};

export default App;

