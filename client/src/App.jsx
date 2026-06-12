import MainLayout from "./layouts/MainLayout";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" />

      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </>
  );
}

export default App;