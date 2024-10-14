import { Routes, Route } from 'react-router-dom'; // No necesitas otro BrowserRouter aquí
import ResetPassword from './components/ResetPassword'; // Importa tu componente

function App() {
  return (
    <Routes>
      <Route path="/auth/reset-password" element={<ResetPassword />} />
      {/* Otras rutas aquí si es necesario */}
    </Routes>
  );
}

export default App;
