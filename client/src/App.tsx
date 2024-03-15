import Routes from "./routes/Routes.tsx"
import AuthContextProvider from "./pages/Auth/AuthContextProvider.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
    </QueryClientProvider>
  )
}

export default App
