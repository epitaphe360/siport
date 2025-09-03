import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Anchor, 
  Menu, 
  X, 
  User, 
  Calendar, 
  MessageCircle, 
  Bell,
  Search,
  Globe
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../store/authStore';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isInfoMenuOpen, setIsInfoMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Exposants', href: '/exhibitors' },
    { name: 'Partenaires', href: '/partners' },
    { name: 'Réseautage', href: '/networking' },
  ];

  const infoMenuItems = [
    { name: 'Pavillons', href: '/pavilions', description: 'Espaces thématiques' },
    { name: 'Événements', href: '/events', description: 'Conférences & ateliers' },
    { name: 'Actualités', href: '/news', description: 'Nouvelles du secteur' }
  ];
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-siports-primary p-2 rounded-xl">
              <Anchor className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-siports-primary font-heading">SIPORTS</span>
              <span className="text-sm text-siports-accent block leading-none font-medium">2026</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-siports-gray-700 hover:text-siports-primary px-4 py-2 text-sm font-medium transition-colors relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-siports-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </Link>
            ))}
            
            {/* Info Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsInfoMenuOpen(!isInfoMenuOpen)}
                className="text-siports-gray-700 hover:text-siports-primary px-4 py-2 text-sm font-medium transition-colors flex items-center space-x-1 relative group"
              >
                <span>Informations</span>
                <svg className={`w-4 h-4 transition-transform ${isInfoMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-siports-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </button>

              {isInfoMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-siports-lg border border-siports-gray-200 py-3 z-50">
                  {infoMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsInfoMenuOpen(false)}
                      className="block px-6 py-3 text-sm text-siports-gray-700 hover:bg-siports-gray-50 hover:text-siports-primary transition-colors border-l-4 border-transparent hover:border-siports-primary"
                    >
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-xs text-siports-gray-500 mt-1">{item.description}</div>
                    </Link>
                  ))}
                  
                  {/* Mobile Info Menu */}
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Informations
                    </div>
                    {infoMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div>{item.name}</div>
                        <div className="text-xs text-gray-500">{item.description}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Métriques uniquement pour les admins */}
            {user?.type === 'admin' && (
              <Link
                to="/metrics"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Métriques
              </Link>
            )}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button 
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => {
                  const currentLang = localStorage.getItem('siports-language') || 'fr';
                  const newLang = currentLang === 'fr' ? 'en' : currentLang === 'en' ? 'ar' : 'fr';
                  
                  const languages = {
                    fr: { name: 'Français', flag: '🇫🇷', code: 'fr-FR' },
                    en: { name: 'English', flag: '🇬🇧', code: 'en-US' },
                    ar: { name: 'العربية', flag: '🇲🇦', code: 'ar-MA' }
                  };
                  
                  localStorage.setItem('siports-language', newLang);
                  localStorage.setItem('siports-language-changed', new Date().toISOString());
                  
                  const selectedLang = languages[newLang as keyof typeof languages];
                  
                  alert(`🌐 LANGUE MODIFIÉE\n\n${selectedLang.flag} Nouvelle langue: ${selectedLang.name}\n🔤 Code: ${selectedLang.code}\n📅 Changement: ${new Date().toLocaleTimeString('fr-FR')}\n\n🔄 Rechargement de l'interface...\n⚙️ Préférences sauvegardées\n\n✅ Interface mise à jour !`);
                  
                  setTimeout(() => {
                    window.location.reload();
                  }, 1500);
                }}
                title="Changer de langue"
              >
              <Globe className="h-5 w-5" />
              </button>
            </div>

            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </button>

                {/* Messages */}
                <Link 
                  to="/messages" 
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                    2
                  </span>
                </Link>

                {/* Calendar */}
                <Link 
                  to="/appointments" 
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Calendar className="h-5 w-5" />
                </Link>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="hidden md:block text-sm font-medium text-gray-700">
                      {user?.profile.firstName}
                    </span>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                      {/* Menu Admin */}
                      {user?.type === 'admin' && (
                        <>
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            Mon Profil Admin
                          </Link>
                          <Link
                            to="/dashboard"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            Tableau de Bord Admin
                          </Link>
                          <Link
                            to="/metrics"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            Métriques & Performance
                          </Link>
                          <hr className="my-1" />
                          <div className="px-4 py-2 text-xs text-red-600 font-medium">
                            Zone Administrateur
                          </div>
                        </>
                      )}

                      {/* Menu Exposant */}
                      {user?.type === 'exhibitor' && (
                        <>
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            Mon Profil
                          </Link>
                          <Link
                            to="/dashboard"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            Tableau de Bord Exposant
                          </Link>
                          <Link
                            to="/minisite/editor"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            Éditeur de Mini-Site
                          </Link>
                          <Link
                            to="/calendar"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            Mes Créneaux RDV
                          </Link>
                          <Link
                            to="/chat"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            Messages & Contact
                          </Link>
                        </>
                      )}

                      {/* Menu Partenaire */}
                      {user?.type === 'partner' && (
                        <>
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            Mon Profil
                          </Link>
                          <Link
                            to="/dashboard"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            Tableau de Bord Partenaire
                          </Link>
                          <Link
                            to="/networking"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            Networking VIP
                          </Link>
                        </>
                      )}

                      {/* Menu Visiteur */}
                      {user?.type === 'visitor' && (
                        <>
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            Mon Profil
                          </Link>
                          <Link
                            to="/visitor/dashboard"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            Tableau de Bord Visiteur
                          </Link>
                          <Link
                            to="/visitor/settings"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            Paramètres Visiteur
                          </Link>
                          <Link
                            to="/appointments"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            Mes Rendez-vous
                          </Link>
                        </>
                      )}

                      <hr className="my-1" />
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Déconnexion
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="outline" size="sm" className="border-siports-primary text-siports-primary hover:bg-siports-primary hover:text-white">
                    Connexion
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-siports-primary hover:bg-siports-dark text-white">
                    Inscription
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-gray-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
          </div>
        )}
      </div>
    </header>
  );
};