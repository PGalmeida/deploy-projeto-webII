import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import "./App.css";

import Home from "./components/Home";

import ConsultasList from "./pages/Consultas/ConsultasList";
import NovaConsulta from "./pages/Consultas/NovaConsulta";
import MedicosList from "./pages/Medicos/MedicosList";
import NovoMedico from "./pages/Medicos/NovoMedico";
import AgendamentosList from "./pages/Agendamentos/AgendamentosList";
import NovoAgendamento from "./pages/Agendamentos/NovoAgendamento";
import DetalhesAgendamento from "./pages/Agendamentos/DetalhesAgendamento";
import EditarAgendamento from "./pages/Agendamentos/EditarAgendamento";
import Clinics from './pages/Clinicas/Clinics';
import ClinicsForm from './pages/Clinicas/ClinicForm';
import Chatbot from './pages/Chatbot/Chatbot';
import Perfil from './pages/Perfil/Perfil';

import Login from "./components/Login";
import Register from "./components/Register";

function AppLayout() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Consultas redirecionam para Agendamentos */}
        <Route path="/consultas" element={<ConsultasList />} />
        <Route path="/consultas/nova" element={<NovaConsulta />} />

        {/* Agendamentos (principal) */}
        <Route path="/agendamentos" element={<AgendamentosList />} />
        <Route path="/agendamentos/novo" element={<NovoAgendamento />} />
        <Route path="/agendamentos/:id/editar" element={<EditarAgendamento />} />
        <Route path="/agendamentos/:id" element={<DetalhesAgendamento />} />

        {/* Veterinários */}
        <Route path="/medicos" element={<MedicosList />} />
        <Route path="/medicos/novo" element={<NovoMedico />} />

        {/* Clínicas */}
        <Route path="/clinicas" element={<Clinics />} />
        <Route path="/clinicas/nova" element={<ClinicsForm />} />
        <Route path="/clinicas/editar/:id" element={<ClinicsForm />} />

        {/* IA */}
        <Route path="/medvet-ia" element={<Chatbot />} />

        {/* Perfil */}
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
