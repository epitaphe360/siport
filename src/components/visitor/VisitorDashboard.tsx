import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Building2,
  Star,
  Bell,
  Download,
  MessageCircle,
  Eye,
  Filter,
  Search,
  Navigation,
  Smartphone,
  Wifi,
  Coffee,
  Car,
  Utensils,
  Info,
  Settings,
  Badge as BadgeIcon,
  QrCode,
  Timer,
  TrendingUp,
  Heart,
  CheckCircle,
  AlertCircle,
  Plus,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useVisitorStore } from '../../store/visitorStore';
import { motion } from 'framer-motion';

export const VisitorDashboard: React.FC = () => {
  const {
    visitorProfile,
    agenda,
    favoriteExhibitors,
    registeredSessions,
    connections,
    messages,
    notifications,
    salonInfo,
    isLoading,
    fetchVisitorData,
    addToFavorites,
    removeFromFavorites,
    registerForSession,
    sendMeetingRequest
  } = useVisitorStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'agenda' | 'exhibitors' | 'networking' | 'practical'>('overview');
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    fetchVisitorData();
  }, [fetchVisitorData]);

  const getPassBenefits = (passType: string) => {
    const benefits = {
      'free': [
        'Accès zone d\'exposition',
        'Conférences publiques',
        'Documentation générale',
        'Application mobile',
        'Networking events'
      ],
      'basic': [
        'Accès aux expositions',
        'Conférences principales',
        'Documentation du salon',
        'Pause café networking',
        '2 RDV B2B garantis'
      ],
      'premium': [
        'Tous les avantages Basic',
        'Ateliers spécialisés',
        'Déjeuners networking',
        '5 RDV B2B garantis',
        'Accès salon VIP'
      ],
      'vip': [
        'Tous les avantages Premium',
        'Soirée de gala',
        'Conférences exclusives',
        'Service conciergerie',
        'Transferts aéroport inclus'
      ]
    };
    return benefits[passType as keyof typeof benefits] || [];
  };

  const getPassColor = (passType: string) => {
    const colors = {
      'free': 'bg-gray-100 text-gray-800',
      'basic': 'bg-blue-100 text-blue-800',
      'premium': 'bg-purple-100 text-purple-800',
      'vip': 'bg-yellow-100 text-yellow-800'
    };
    return colors[passType as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPassLabel = (passType: string) => {
    const labels = {
      'free': 'Pass Gratuit',
      'basic': 'Pass Basic',
      'premium': 'Pass Premium',
      'vip': 'Pass VIP'
    };
    return labels[passType as keyof typeof labels] || passType;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getTimeUntilSalon = () => {
    const salonDate = new Date('2026-02-05T09:30:00');
    const now = new Date();
    const diff = salonDate.getTime() - now.getTime();
    
    if (diff <= 0) return 'Le salon a commencé !';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `${days} jours et ${hours} heures`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec Notifications */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Bouton de retour */}
          <div className="mb-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour au Tableau de Bord Principal
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Tableau de Bord Visiteur
              </h1>
              <p className="text-gray-600">
                Bienvenue {visitorProfile?.firstName}, optimisez votre expérience SIPORTS 2026
              </p>
            </motion.div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative"
              >
                <Bell className="h-6 w-6" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.slice(0, 5).map((notification) => (
                      <div key={notification.id} className={`p-4 border-b border-gray-100 ${!notification.read ? 'bg-blue-50' : ''}`}>
                        <p className="text-sm text-gray-900">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(notification.timestamp)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-6">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', label: 'Vue d\'ensemble', icon: Eye },
                { id: 'agenda', label: 'Mon Agenda', icon: Calendar },
                { id: 'exhibitors', label: 'Exposants', icon: Building2 },
                { id: 'networking', label: 'Réseautage', icon: Users },
                { id: 'practical', label: 'Infos Pratiques', icon: Info }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Vue d'ensemble */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Informations Salon & Compte à Rebours */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-blue-600 p-3 rounded-lg">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">SIPORTS 2026</h2>
                      <p className="text-gray-600">Salon International des Ports</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">5-7 Février 2026</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">9h30 - 18h00</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">Mohammed VI Exhibition Center - El Jadida, Maroc</span>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <Timer className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {getTimeUntilSalon()}
                        </div>
                        <div className="text-sm text-gray-600">avant l'ouverture</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Statut du Pass */}
              <Card>
                <div className="p-6">
                  <div className="text-center mb-4">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-lg mb-4">
                      <BadgeIcon className="h-8 w-8 text-white mx-auto" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Mon Pass</h3>
                    <Badge className={getPassColor(visitorProfile?.passType || 'free')} size="sm">
                      {getPassLabel(visitorProfile?.passType || 'free')}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    {getPassBenefits(visitorProfile?.passType || 'free').slice(0, 3).map((benefit, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full mt-4" 
                    size="sm"
                    onClick={() => {
                      const qrData = {
                        name: `${visitorProfile?.firstName} ${visitorProfile?.lastName}`,
                        company: visitorProfile?.company,
                        email: visitorProfile?.email,
                        passType: visitorProfile?.passType,
                        id: visitorProfile?.id
                      };
                      
                      alert(`📱 BADGE NUMÉRIQUE GÉNÉRÉ\n\n👤 ${qrData.name}\n🏢 ${qrData.company}\n🎫 Pass ${qrData.passType?.toUpperCase()}\n\n📲 QR Code prêt pour l'entrée !`);
                    }}
                  >
                    <QrCode className="h-4 w-4 mr-2" />
                    Badge Numérique
                  </Button>
                </div>
              </Card>
            </div>

            {/* Statistiques Rapides */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="text-center p-6">
                <div className="bg-blue-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {agenda.appointments.length}
                </div>
                <div className="text-sm text-gray-600">RDV Programmés</div>
              </Card>

              <Card className="text-center p-6">
                <div className="bg-green-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
                  <Building2 className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {favoriteExhibitors.length}
                </div>
                <div className="text-sm text-gray-600">Exposants Favoris</div>
              </Card>

              <Card className="text-center p-6">
                <div className="bg-purple-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {connections.length}
                </div>
                <div className="text-sm text-gray-600">Connexions</div>
              </Card>

              <Card className="text-center p-6">
                <div className="bg-orange-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
                  <MessageCircle className="h-6 w-6 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {messages.filter(m => !m.read).length}
                </div>
                <div className="text-sm text-gray-600">Messages Non Lus</div>
              </Card>
            </div>

            {/* Prochains Rendez-vous */}
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    Prochains Rendez-vous
                  </h3>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Nouveau RDV
                  </Button>
                  <Link to="/networking">
                    <Button variant="outline" size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      Réseautage IA
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {agenda.appointments.slice(0, 3).map((appointment) => (
                    <div key={appointment.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{appointment.title}</h4>
                        <p className="text-sm text-gray-600">{appointment.company}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                          <span>{formatDate(appointment.date)}</span>
                          <span>{appointment.location}</span>
                        </div>
                      </div>
                      
                      <Badge variant={appointment.status === 'confirmed' ? 'success' : 'warning'} size="sm">
                        {appointment.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Exposants Recommandés */}
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    Exposants Recommandés pour Vous
                  </h3>
                  <Button variant="outline" size="sm">
                    Voir Tous
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {favoriteExhibitors.slice(0, 3).map((exhibitor) => (
                    <div key={exhibitor.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <img
                          src={exhibitor.logo}
                          alt={exhibitor.name}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900">{exhibitor.name}</h4>
                          <p className="text-sm text-gray-600">{exhibitor.sector}</p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {exhibitor.description}
                      </p>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Contacter
                        </Button>
                        <Button variant="outline" size="sm">
                          <Heart className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Mon Agenda */}
        {activeTab === 'agenda' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Agenda Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Planning de la Semaine
                  </h3>
                  
                  <div className="space-y-4">
                    {['2026-02-05', '2026-02-06', '2026-02-07'].map((date) => {
                      const dayAppointments = agenda.appointments.filter(
                        app => app.date.toDateString() === new Date(date).toDateString()
                      );
                      
                      return (
                        <div key={date} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-gray-900">
                              {new Date(date).toLocaleDateString('fr-FR', { 
                                weekday: 'long', 
                                day: 'numeric', 
                                month: 'long' 
                              })}
                            </h4>
                            <Badge variant="info" size="sm">
                              {dayAppointments.length} événements
                            </Badge>
                          </div>
                          
                          <div className="space-y-2">
                            {dayAppointments.slice(0, 3).map((appointment) => (
                              <div key={appointment.id} className="flex items-center space-x-3 text-sm">
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                <span className="text-gray-600">{appointment.time}</span>
                                <span className="text-gray-900">{appointment.title}</span>
                                <span className="text-gray-500">- {appointment.location}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>

              {/* RDV B2B Garantis */}
              <Card>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4">
                    RDV B2B Garantis
                  </h3>
                  
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {agenda.guaranteedMeetings.used}/{agenda.guaranteedMeetings.total}
                    </div>
                    <div className="text-sm text-gray-600">Utilisés</div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ 
                        width: `${(agenda.guaranteedMeetings.used / agenda.guaranteedMeetings.total) * 100}%` 
                      }}
                    />
                  </div>
                  
                  <Button className="w-full" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Programmer un RDV
                  </Button>
                </div>
              </Card>
            </div>

            {/* Sessions Inscrites */}
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Mes Sessions Inscrites
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {registeredSessions.map((session) => (
                    <div key={session.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{session.title}</h4>
                        <Badge variant="success" size="sm">Inscrit</Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{session.description}</p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{formatDate(session.date)}</span>
                        <span>{session.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Exposants */}
        {activeTab === 'exhibitors' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Filtres par Pavillon */}
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Explorer par Pavillon
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { id: 'institutional', name: 'Institutionnel', count: 85, color: 'bg-purple-100 text-purple-600' },
                    { id: 'industry', name: 'Industrie Portuaire', count: 120, color: 'bg-blue-100 text-blue-600' },
                    { id: 'operations', name: 'Performance & Exploitation', count: 65, color: 'bg-green-100 text-green-600' },
                    { id: 'academic', name: 'Académique & Formation', count: 45, color: 'bg-orange-100 text-orange-600' }
                  ].map((pavilion) => (
                    <div key={pavilion.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer transition-colors">
                      <div className={`p-3 rounded-lg mb-3 ${pavilion.color}`}>
                        <Building2 className="h-6 w-6" />
                      </div>
                      <h4 className="font-medium text-gray-900 mb-1">{pavilion.name}</h4>
                      <p className="text-sm text-gray-600">{pavilion.count} exposants</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Mes Exposants Favoris */}
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    Mes Exposants Favoris ({favoriteExhibitors.length})
                  </h3>
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4 mr-2" />
                    Rechercher
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteExhibitors.map((exhibitor) => (
                    <div key={exhibitor.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <img
                            src={exhibitor.logo}
                            alt={exhibitor.name}
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">{exhibitor.name}</h4>
                            <p className="text-sm text-gray-600">{exhibitor.sector}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromFavorites(exhibitor.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Heart className="h-4 w-4 fill-current" />
                        </button>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {exhibitor.description}
                      </p>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          RDV
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Réseautage */}
        {activeTab === 'networking' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Connexions Récentes */}
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Mes Connexions ({connections.length})
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {connections.map((connection) => (
                    <div key={connection.id} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                      <img
                        src={connection.avatar}
                        alt={connection.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{connection.name}</h4>
                        <p className="text-sm text-gray-600">{connection.company}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Messages Récents */}
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Messages Récents
                </h3>
                
                <div className="space-y-4">
                  {messages.slice(0, 5).map((message) => (
                    <div key={message.id} className={`flex items-start space-x-3 p-4 rounded-lg ${!message.read ? 'bg-blue-50' : 'bg-gray-50'}`}>
                      <img
                        src={message.senderAvatar}
                        alt={message.senderName}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900">{message.senderName}</h4>
                          <span className="text-xs text-gray-500">
                            {formatDate(message.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{message.preview}</p>
                      </div>
                      {!message.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Informations Pratiques */}
        {activeTab === 'practical' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Plan Interactif */}
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Plan Interactif du Salon
                </h3>
                
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <Navigation className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="font-medium text-gray-900 mb-2">
                    Plan Interactif
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Naviguez dans le Mohammed VI Exhibition Center
                  </p>
                  <Button>
                    onClick={() => {
                      const badgeData = {
                        name: `${visitorProfile?.firstName} ${visitorProfile?.lastName}`,
                        company: visitorProfile?.company,
                        email: visitorProfile?.email,
                        passType: visitorProfile?.passType,
                        id: visitorProfile?.id,
                        qrCode: 'QR_CODE_DATA_HERE'
                      };
                      
                      // Génération QR Code
                      const qrContent = `BEGIN:VCARD\nVERSION:3.0\nFN:${badgeData.name}\nORG:${badgeData.company}\nEMAIL:${badgeData.email}\nNOTE:Pass ${badgeData.passType} - SIPORTS 2026\nEND:VCARD`;
                      
                      alert(`📱 BADGE NUMÉRIQUE GÉNÉRÉ\n\n👤 ${badgeData.name}\n🏢 ${badgeData.company}\n📧 ${badgeData.email}\n🎫 Pass ${badgeData.passType?.toUpperCase()}\n\n📲 QR Code prêt pour l'entrée !\n🚪 Accès direct au salon\n📱 Sauvegardé dans votre téléphone`);
                    }}
                    <MapPin className="h-4 w-4 mr-2" />
                    Ouvrir le Plan
                  </Button>
                </div>
              </div>
            </Card>

            {/* Services Pratiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center p-6">
                <div className="bg-blue-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
                  <Car className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Transport</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Navettes, parking, transferts aéroport
                </p>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Infos
                </Button>
              </Card>

              <Card className="text-center p-6">
                <div className="bg-green-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
                  <Building2 className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Hébergement</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Hôtels partenaires, réservations
                </p>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Réserver
                </Button>
              </Card>

              <Card className="text-center p-6">
                <div className="bg-orange-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
                  <Utensils className="h-6 w-6 text-orange-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Restauration</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Restaurants, cafés, espaces déjeuner
                </p>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Voir
                </Button>
              </Card>

              <Card className="text-center p-6">
                <div className="bg-purple-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
                  <Smartphone className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">App Mobile</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Application officielle SIPORTS
                </p>
                <Button variant="outline" size="sm">
                  <Download className="h-3 w-3 mr-1" />
                  Télécharger
                </Button>
              </Card>
            </div>

            {/* FAQ */}
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Questions Fréquentes
                </h3>
                
                <div className="space-y-4">
                  {[
                    {
                      question: 'Comment accéder au salon ?',
                      answer: 'Présentez votre badge numérique ou imprimé à l\'entrée du Mohammed VI Exhibition Center.'
                    },
                    {
                      question: 'Puis-je modifier mes rendez-vous ?',
                      answer: 'Oui, vous pouvez modifier ou annuler vos rendez-vous jusqu\'à 2h avant l\'heure prévue.'
                    },
                    {
                      question: 'Comment télécharger les catalogues ?',
                      answer: 'Rendez-vous sur le profil de l\'exposant et cliquez sur "Télécharger le catalogue".'
                    }
                  ].map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-sm text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};