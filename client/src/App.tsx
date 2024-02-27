import Routes from "./routes/Routes.tsx"
import AuthContextProvider from "./pages/Auth/AuthContextProvider.tsx"

const App = () => {
  return (
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  )
}

export default App
