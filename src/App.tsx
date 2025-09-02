import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ExhibitorsPage } from './pages/ExhibitorsPage';
import { NetworkingPage } from './pages/NetworkingPage';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { ProfilePage } from './components/profile/ProfilePage';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { EventsPage } from './components/events/EventsPage';
import { ChatInterface } from './components/chat/ChatInterface';
import { AppointmentCalendar } from './components/appointments/AppointmentCalendar';
import { MiniSiteBuilder } from './components/minisite/MiniSiteBuilder';
import { MiniSitePreview } from './components/minisite/MiniSitePreview';
import { ExhibitorDetailPage } from './components/exhibitor/ExhibitorDetailPage';
import { PartnersPage } from './pages/PartnersPage';
import { PartnerDetailPage } from './pages/PartnerDetailPage';
import { PavillonsPage } from './components/pavilions/PavillonsPage';
import { MetricsPage } from './components/metrics/MetricsPage';
import { DetailedProfilePage } from './components/profile/DetailedProfilePage';
import { VisitorDashboard } from './components/visitor/VisitorDashboard';
import { VisitorProfileSettings } from './components/visitor/VisitorProfileSettings';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { ExhibitorDashboard } from './components/dashboard/ExhibitorDashboard';
import { PartnerDashboard } from './components/dashboard/PartnerDashboard';
import { ExhibitorValidation } from './components/admin/ExhibitorValidation';
import { ModerationPanel } from './components/admin/ModerationPanel';
import { MiniSiteEditor } from './components/minisite/MiniSiteEditor';
import { NewsPage } from './pages/NewsPage';
import { ExhibitorCreationSimulator } from './components/admin/ExhibitorCreationSimulator';
import { UserManagementPage } from './pages/UserManagementPage';
import { ChatBot } from './components/chatbot/ChatBot';
import { ChatBotToggle } from './components/chatbot/ChatBotToggle';

function App() {
  const [isChatBotOpen, setIsChatBotOpen] = React.useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/exhibitors" element={<ExhibitorsPage />} />
            <Route path="/exhibitors/:id" element={<ExhibitorDetailPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/partners/:id" element={<PartnerDetailPage />} />
            <Route path="/pavilions" element={<PavillonsPage />} />
            <Route path="/metrics" element={<MetricsPage />} />
            <Route path="/networking" element={<NetworkingPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/detailed" element={<DetailedProfilePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/exhibitor/profile" element={<ProfilePage />} />
            <Route path="/exhibitor/dashboard" element={<ExhibitorDashboard />} />
            <Route path="/visitor/dashboard" element={<VisitorDashboard />} />
            <Route path="/visitor/settings" element={<VisitorProfileSettings />} />
            <Route path="/messages" element={<ChatInterface />} />
            <Route path="/chat" element={<ChatInterface />} />
            <Route path="/appointments" element={<AppointmentCalendar />} />
            <Route path="/calendar" element={<AppointmentCalendar />} />
            <Route path="/minisite" element={<MiniSiteBuilder />} />
            <Route path="/minisite/editor" element={<MiniSiteEditor />} />
            <Route path="/admin/create-exhibitor" element={<ExhibitorCreationSimulator />} />
            <Route path="/minisite/:exhibitorId" element={<MiniSitePreview />} />
            <Route path="/admin/validation" element={<ExhibitorValidation />} />
            <Route path="/admin/moderation" element={<ModerationPanel />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagementPage />} />
          </Routes>
        </main>
        <Footer />
        
        {/* ChatBot */}
        <ChatBot 
          isOpen={isChatBotOpen} 
          onToggle={() => setIsChatBotOpen(!isChatBotOpen)} 
        />
        
        {/* ChatBot Toggle Button */}
        {!isChatBotOpen && (
          <ChatBotToggle 
            onClick={() => setIsChatBotOpen(true)}
            hasUnreadMessages={false}
          />
        )}
      </div>
    </Router>
  );
}

export default App;