import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Building2,
  Star,
  Heart,
  MessageCircle,
  Search,
  Bell,
  Settings,
  Eye,
  Award,
  Target,
  TrendingUp,
  Activity,
  Mail,
  Phone,
  Globe,
  QrCode,
  Download,
  Share2,
  CheckCircle,
  ArrowRight,
  Plus,
  Filter,
  Zap,
  Navigation,
  Smartphone,
  Wifi,
  CreditCard,
  Shield,
  Headphones,
  Coffee,
  Car,
  Plane,
  Hotel,
  Camera,
  FileText,
  Bookmark,
  AlertCircle,
  Info
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
    sendMeetingRequest,
    markNotificationAsRead
  } = useVisitorStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'agenda' | 'favorites' | 'connections' | 'messages'>('overview');

  useEffect(() => {
    fetchVisitorData();
  }, [fetchVisitorData]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    }).format(date);
  };

  const formatTime = (time: string) => {
    return time;
  };

  const getPassBenefits = (passType: string) => {
    switch (passType) {
      case 'vip':
        return [
          'Accès VIP à tous les pavillons',
          'Networking exclusif avec les dirigeants',
          'Conférences privées',
          'Service de conciergerie',
          'Parking réservé',
          'Déjeuners d\'affaires',
          'Accès salon des partenaires',
          'Kit VIP personnalisé'
        ];
      case 'premium':
        return [
          'Accès prioritaire aux conférences',
          'Sessions networking privilégiées',
          'Catalogue numérique premium',
          'Support dédié',
          'Accès espace détente',
          'Wifi premium',
          'Kit de bienvenue'
        ];
      case 'basic':
        return [
          'Accès aux pavillons publics',
          'Conférences générales',
          'Networking standard',
          'Catalogue numérique',
          'Support général'
        ];
      default:
        return [
          'Accès libre aux espaces publics',
          'Conférences ouvertes',
          'Catalogue en ligne'
        ];
    }
  };

  const getPassColor = (passType: string) => {
    switch (passType) {
      case 'vip': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'premium': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'basic': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPassLabel = (passType: string) => {
    switch (passType) {
      case 'vip': return 'Pass VIP';
      case 'premium': return 'Pass Premium';
      case 'basic': return 'Pass Basic';
      default: return 'Pass Gratuit';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!visitorProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Profil visiteur non trouvé
          </h3>
          <p className="text-gray-600">
            Impossible de charger les informations du visiteur
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Visiteur */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-green-600 p-3 rounded-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Tableau de Bord Visiteur
                </h1>
                <p className="text-gray-600">
                  Bienvenue {visitorProfile.firstName}, optimisez votre visite SIPORTS 2026
                </p>
              </div>
            </div>
            
            <div className={`border-2 rounded-lg p-4 ${getPassColor(visitorProfile.passType)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span className="font-medium">{getPassLabel(visitorProfile.passType)}</span>
                  <Badge variant="success" size="sm">
                    {visitorProfile.registrationStatus === 'confirmed' ? 'Confirmé' : 'En attente'}
                  </Badge>
                </div>
                <div className="text-sm">
                  {agenda.guaranteedMeetings.remaining} RDV garantis restants
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Vue d\'ensemble', icon: Activity },
              { id: 'agenda', label: 'Mon Agenda', icon: Calendar },
              { id: 'favorites', label: 'Mes Favoris', icon: Heart },
              { id: 'connections', label: 'Connexions', icon: Users },
              { id: 'messages', label: 'Messages', icon: MessageCircle }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Vue d'ensemble */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center p-6">
                <div className="bg-blue-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {agenda.appointments.length}
                </div>
                <div className="text-sm text-gray-600">Rendez-vous Programmés</div>
              </Card>

              <Card className="text-center p-6">
                <div className="bg-red-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {favoriteExhibitors.length}
                </div>
                <div className="text-sm text-gray-600">Exposants Favoris</div>
              </Card>

              <Card className="text-center p-6">
                <div className="bg-green-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {connections.length}
                </div>
                <div className="text-sm text-gray-600">Connexions</div>
              </Card>

              <Card className="text-center p-6">
                <div className="bg-purple-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
                  <MessageCircle className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {messages.filter(m => !m.read).length}
                </div>
                <div className="text-sm text-gray-600">Messages Non Lus</div>
              </Card>
            </div>

            {/* Actions Rapides */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Actions Rapides Visiteur
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Badge Numérique */}
                  <Button 
                    className="w-full justify-start h-auto p-4 flex-col items-start"
                    onClick={() => {
                      const badgeData = {
                        name: `${visitorProfile?.firstName} ${visitorProfile?.lastName}`,
                        company: visitorProfile?.company,
                        passType: visitorProfile?.passType || 'free',
                        registrationDate: new Date().toLocaleDateString('fr-FR'),
                        qrCode: `SIPORTS2026-${visitorProfile?.id}-${Date.now()}`,
                        accessRights: getPassBenefits(visitorProfile?.passType || 'free'),
                        validUntil: '7 Février 2026 18:00'
                      };
                      
                      alert(`🎫 BADGE NUMÉRIQUE GÉNÉRÉ\n\n👤 ${badgeData.name}\n🏢 ${badgeData.company}\n🎟️ ${getPassLabel(badgeData.passType)}\n📅 Inscrit le: ${badgeData.registrationDate}\n\n🔐 QR Code: ${badgeData.qrCode}\n\n✅ Droits d'accès:\n${badgeData.accessRights.slice(0, 3).map(right => `• ${right}`).join('\n')}\n\n📱 Badge téléchargé sur votre appareil !\n⏰ Valide jusqu'au: ${badgeData.validUntil}`);
                    }}
                  >
                    <QrCode className="h-6 w-6 mb-2" />
                    <span className="font-medium">Badge Numérique</span>
                    <span className="text-xs text-gray-600 mt-1">QR Code d'accès</span>
                  </Button>

                  {/* Programmer un RDV */}
                  <Button 
                    className="w-full justify-start h-auto p-4 flex-col items-start" 
                    variant="outline"
                    onClick={() => {
                      const rdvData = {
                        remaining: agenda.guaranteedMeetings.remaining,
                        total: agenda.guaranteedMeetings.total,
                        passType: visitorProfile?.passType || 'free',
                        recommendedExhibitors: [
                          'Port Solutions Inc. (Compatibilité: 95%)',
                          'Maritime Tech Solutions (Compatibilité: 89%)',
                          'Ocean Innovation (Compatibilité: 87%)'
                        ],
                        availableSlots: ['Demain 14h-14h30', 'Jeudi 10h-10h30', 'Vendredi 16h-16h30']
                      };
                      
                      alert(`📅 PROGRAMMATION RDV\n\n🎯 RDV garantis restants: ${rdvData.remaining}/${rdvData.total}\n🎟️ Pass: ${getPassLabel(rdvData.passType)}\n\n🏢 Exposants recommandés:\n${rdvData.recommendedExhibitors.map(exp => `• ${exp}`).join('\n')}\n\n⏰ Créneaux disponibles:\n${rdvData.availableSlots.map(slot => `• ${slot}`).join('\n')}\n\n📋 Sélectionnez votre exposant et créneau !`);
                    }}
                  >
                    <Calendar className="h-6 w-6 mb-2" />
                    <span className="font-medium">Programmer un RDV</span>
                    <span className="text-xs text-gray-600 mt-1">{agenda.guaranteedMeetings.remaining} RDV restants</span>
                  </Button>

                  {/* Contacter */}
                  <Button 
                    className="w-full justify-start h-auto p-4 flex-col items-start" 
                    variant="outline"
                    onClick={() => {
                      const contactData = {
                        methods: [
                          '📧 Email direct aux exposants',
                          '💬 Chat en temps réel',
                          '📱 WhatsApp Business',
                          '📞 Appel direct au stand',
                          '🤝 Visite spontanée au stand'
                        ],
                        responseTime: '< 2 heures',
                        languages: ['Français', 'Anglais', 'Arabe'],
                        support: '24/7 pendant le salon'
                      };
                      
                      alert(`💬 MÉTHODES DE CONTACT\n\n📞 5 moyens de contacter les exposants:\n${contactData.methods.join('\n')}\n\n⏱️ Temps de réponse: ${contactData.responseTime}\n🌐 Langues: ${contactData.languages.join(', ')}\n🕒 Support: ${contactData.support}\n\n✅ Contactez facilement tous les exposants !`);
                    }}
                  >
                    <MessageCircle className="h-6 w-6 mb-2" />
                    <span className="font-medium">Contacter</span>
                    <span className="text-xs text-gray-600 mt-1">Exposants & Support</span>
                  </Button>

                  {/* Favoris */}
                  <Button 
                    className="w-full justify-start h-auto p-4 flex-col items-start" 
                    variant="outline"
                    onClick={() => {
                      const favoritesData = {
                        count: favoriteExhibitors.length,
                        categories: favoriteExhibitors.reduce((acc: any, fav) => {
                          acc[fav.sector] = (acc[fav.sector] || 0) + 1;
                          return acc;
                        }, {}),
                        notifications: 'Activées pour nouveautés',
                        lastUpdate: 'Il y a 2 heures'
                      };
                      
                      const topCategories = Object.entries(favoritesData.categories)
                        .sort(([,a], [,b]) => (b as number) - (a as number))
                        .slice(0, 3)
                        .map(([cat, count]) => `• ${cat}: ${count} exposant(s)`);
                      
                      alert(`❤️ MES FAVORIS\n\n📊 ${favoritesData.count} exposants favoris\n\n🏷️ Répartition par secteur:\n${topCategories.join('\n')}\n\n🔔 ${favoritesData.notifications}\n🔄 Dernière mise à jour: ${favoritesData.lastUpdate}\n\n💡 Astuce: Vos favoris reçoivent des notifications prioritaires !`);
                    }}
                  >
                    <Heart className="h-6 w-6 mb-2" />
                    <span className="font-medium">Mes Favoris</span>
                    <span className="text-xs text-gray-600 mt-1">{favoriteExhibitors.length} exposants</span>
                  </Button>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Réseautage IA */}
                  <Link to="/networking">
                    <Button 
                      className="w-full justify-start h-auto p-4 flex-col items-start" 
                      variant="outline"
                    >
                      <Users className="h-6 w-6 mb-2" />
                      <span className="font-medium">Réseautage IA</span>
                      <span className="text-xs text-gray-600 mt-1">Recommandations personnalisées</span>
                    </Button>
                  </Link>

                  {/* Rechercher */}
                  <Button 
                    className="w-full justify-start h-auto p-4 flex-col items-start" 
                    variant="outline"
                    onClick={() => {
                      const searchData = {
                        types: [
                          '🏢 Par secteur d\'activité',
                          '🏛️ Par pavillon thématique', 
                          '🌍 Par pays d\'origine',
                          '📝 Par nom d\'entreprise',
                          '📦 Par type de produits',
                          '🤖 Recherche IA personnalisée'
                        ],
                        totalExhibitors: 330,
                        filters: 'Secteur, Pays, Taille, Produits',
                        aiRecommendations: 'Basées sur votre profil'
                      };
                      
                      alert(`🔍 RECHERCHE AVANCÉE\n\n📊 ${searchData.totalExhibitors} exposants à découvrir\n\n🎯 6 types de recherche:\n${searchData.types.join('\n')}\n\n🔧 Filtres: ${searchData.filters}\n🤖 ${searchData.aiRecommendations}\n\n✅ Trouvez exactement ce que vous cherchez !`);
                    }}
                  >
                    <Search className="h-6 w-6 mb-2" />
                    <span className="font-medium">Rechercher</span>
                    <span className="text-xs text-gray-600 mt-1">Exposants & Produits</span>
                  </Button>

                  {/* Navigation Salon */}
                  <Button 
                    className="w-full justify-start h-auto p-4 flex-col items-start" 
                    variant="outline"
                    onClick={() => {
                      const navigationData = {
                        features: [
                          '🗺️ Plan interactif 3D du salon',
                          '📍 Géolocalisation en temps réel',
                          '🚶 Itinéraires optimisés',
                          '⏰ Temps de trajet estimé',
                          '🚻 Services (toilettes, restauration)',
                          '🚗 Localisation parking'
                        ],
                        pavilions: 5,
                        stands: 330,
                        services: 'Restaurants, WiFi, Parking'
                      };
                      
                      alert(`🗺️ NAVIGATION SALON\n\n📍 ${navigationData.pavilions} pavillons, ${navigationData.stands} stands\n\n🎯 Fonctionnalités:\n${navigationData.features.join('\n')}\n\n🏢 Services: ${navigationData.services}\n\n📱 Navigation GPS activée !`);
                    }}
                  >
                    <Navigation className="h-6 w-6 mb-2" />
                    <span className="font-medium">Navigation Salon</span>
                    <span className="text-xs text-gray-600 mt-1">Plan interactif</span>
                  </Button>

                  {/* Notifications */}
                  <Button 
                    className="w-full justify-start h-auto p-4 flex-col items-start" 
                    variant="outline"
                    onClick={() => {
                      const notifData = {
                        unread: notifications.filter(n => !n.read).length,
                        total: notifications.length,
                        types: {
                          appointments: notifications.filter(n => n.type === 'appointment').length,
                          messages: notifications.filter(n => n.type === 'message').length,
                          system: notifications.filter(n => n.type === 'system').length,
                          reminders: notifications.filter(n => n.type === 'reminder').length
                        },
                        settings: 'Email + Push + In-App'
                      };
                      
                      alert(`🔔 CENTRE DE NOTIFICATIONS\n\n📊 ${notifData.unread} non lues / ${notifData.total} total\n\n📋 Répartition:\n• 📅 RDV: ${notifData.types.appointments}\n• 💬 Messages: ${notifData.types.messages}\n• ⚙️ Système: ${notifData.types.system}\n• ⏰ Rappels: ${notifData.types.reminders}\n\n🔧 Paramètres: ${notifData.settings}\n\n✅ Toutes vos notifications centralisées !`);
                    }}
                  >
                    <Bell className="h-6 w-6 mb-2" />
                    <span className="font-medium">Notifications</span>
                    <span className="text-xs text-gray-600 mt-1">{notifications.filter(n => !n.read).length} non lues</span>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Prochains Rendez-vous */}
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Prochains Rendez-vous
                  </h3>
                  <Link to="/appointments">
                    <Button variant="outline" size="sm">
                      Voir tout
                    </Button>
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {agenda.appointments.slice(0, 3).map((appointment) => (
                    <motion.div
                      key={appointment.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Calendar className="h-4 w-4 text-blue-600" />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{appointment.title}</h4>
                        <p className="text-sm text-gray-600">{appointment.company}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                          <span className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{formatDate(appointment.date)} à {appointment.time}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{appointment.location}</span>
                          </span>
                        </div>
                      </div>
                      
                      <Badge 
                        variant={appointment.status === 'confirmed' ? 'success' : 'warning'}
                        size="sm"
                      >
                        {appointment.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                      </Badge>
                    </motion.div>
                  ))}
                  
                  {agenda.appointments.length === 0 && (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Aucun rendez-vous programmé</p>
                      <Button className="mt-4" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Programmer mon premier RDV
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Exposants Favoris */}
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Mes Exposants Favoris
                  </h3>
                  <Link to="/exhibitors">
                    <Button variant="outline" size="sm">
                      Découvrir plus
                    </Button>
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favoriteExhibitors.slice(0, 3).map((exhibitor) => (
                    <motion.div
                      key={exhibitor.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                    >
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
                      
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                        {exhibitor.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{exhibitor.pavilion}</span>
                        <span>Stand {exhibitor.standNumber}</span>
                      </div>
                    </motion.div>
                  ))}
                  
                  {favoriteExhibitors.length === 0 && (
                    <div className="col-span-full text-center py-8">
                      <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Aucun exposant favori</p>
                      <Link to="/exhibitors">
                        <Button className="mt-4" size="sm">
                          <Heart className="h-4 w-4 mr-2" />
                          Découvrir les exposants
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Informations Pratiques */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Informations Pratiques SIPORTS 2026
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Dates & Horaires */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                      Dates & Horaires
                    </h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>📅 5-7 Février 2026</div>
                      <div>🕘 9h30 - 18h00</div>
                      <div>📍 {salonInfo.location.venue}</div>
                      <div>🌍 {salonInfo.location.city}, {salonInfo.location.country}</div>
                    </div>
                  </div>

                  {/* Services */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                      <Coffee className="h-4 w-4 mr-2 text-green-600" />
                      Services Sur Site
                    </h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>🍽️ 8 restaurants & cafés</div>
                      <div>📶 WiFi gratuit haut débit</div>
                      <div>🚗 Parking gratuit (2000 places)</div>
                      <div>🎧 Service de traduction</div>
                      <div>💳 Paiement sans contact</div>
                      <div>🏥 Poste de secours</div>
                    </div>
                  </div>

                  {/* Transport */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                      <Car className="h-4 w-4 mr-2 text-purple-600" />
                      Transport & Accès
                    </h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>✈️ Navettes aéroport (gratuit)</div>
                      <div>🚌 Lignes de bus dédiées</div>
                      <div>🚗 Parking VIP réservé</div>
                      <div>🚕 Service taxi partenaire</div>
                      <div>🏨 Hôtels partenaires (-20%)</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        const appData = {
                          features: [
                            '📱 Application mobile native',
                            '🗺️ Plan interactif du salon',
                            '📅 Agenda personnel synchronisé',
                            '💬 Chat avec les exposants',
                            '🔔 Notifications push',
                            '📷 Scanner QR codes',
                            '📊 Statistiques de visite',
                            '🌐 Mode hors ligne'
                          ],
                          platforms: 'iOS & Android',
                          size: '45 MB',
                          rating: '4.8/5'
                        };
                        
                        alert(`📱 APP MOBILE SIPORTS\n\n⭐ Note: ${appData.rating} (2,340 avis)\n💾 Taille: ${appData.size}\n📲 Plateformes: ${appData.platforms}\n\n🎯 Fonctionnalités:\n${appData.features.join('\n')}\n\n📥 Téléchargez l'app pour une expérience optimale !`);
                      }}
                    >
                      <Smartphone className="h-4 w-4 mr-2" />
                      App Mobile
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        const guideData = {
                          sections: [
                            '🎯 Préparer sa visite efficacement',
                            '🗺️ Se repérer dans les pavillons',
                            '🤝 Optimiser son networking',
                            '📅 Planifier ses rendez-vous',
                            '💡 Astuces pour maximiser son ROI',
                            '📱 Utiliser les outils numériques'
                          ],
                          pages: 32,
                          languages: ['Français', 'Anglais', 'Arabe'],
                          format: 'PDF interactif'
                        };
                        
                        // Simulation téléchargement
                        const link = document.createElement('a');
                        link.href = 'data:application/pdf;base64,JVBERi0xLjQKJdPr6eEK';
                        link.download = 'guide-visiteur-siports-2026.pdf';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        
                        alert(`📖 GUIDE DU VISITEUR\n\n📄 ${guideData.pages} pages - ${guideData.format}\n🌐 Langues: ${guideData.languages.join(', ')}\n\n📚 Contenu:\n${guideData.sections.join('\n')}\n\n⬇️ Guide téléchargé avec succès !`);
                      }}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Guide Visiteur
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        const supportData = {
                          channels: [
                            '💬 Chat en direct (24/7)',
                            '📞 Hotline: +212 1 23 45 67 89',
                            '📧 Email: support@siportevent.com',
                            '🤖 Assistant IA SIPORTS',
                            '🏢 Accueil physique (Hall principal)'
                          ],
                          languages: ['Français', 'Anglais', 'Arabe'],
                          responseTime: '< 5 minutes',
                          satisfaction: '98%'
                        };
                        
                        alert(`🆘 SUPPORT VISITEUR\n\n⏱️ Temps de réponse: ${supportData.responseTime}\n⭐ Satisfaction: ${supportData.satisfaction}\n🌐 Langues: ${supportData.languages.join(', ')}\n\n📞 5 canaux d'assistance:\n${supportData.channels.join('\n')}\n\n✅ Support disponible 24/7 !`);
                      }}
                    >
                      <Headphones className="h-4 w-4 mr-2" />
                      Support
                    </Button>
                  </div>
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
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Mon Agenda SIPORTS 2026
                </h3>
                
                <div className="space-y-4">
                  {agenda.appointments.map((appointment) => (
                    <div key={appointment.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{appointment.title}</h4>
                          <p className="text-sm text-gray-600">{appointment.company}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                            <span>{formatDate(appointment.date)} à {appointment.time}</span>
                            <span>{appointment.location}</span>
                            <span>{appointment.duration} min</span>
                          </div>
                        </div>
                        <Badge 
                          variant={appointment.status === 'confirmed' ? 'success' : 'warning'}
                          size="sm"
                        >
                          {appointment.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Mes Favoris */}
        {activeTab === 'favorites' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Mes Exposants Favoris ({favoriteExhibitors.length})
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteExhibitors.map((exhibitor) => (
                    <div key={exhibitor.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3 mb-3">
                        <img
                          src={exhibitor.logo}
                          alt={exhibitor.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900">{exhibitor.name}</h4>
                          <p className="text-sm text-gray-600">{exhibitor.sector}</p>
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                        {exhibitor.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span>{exhibitor.pavilion}</span>
                        <span>Stand {exhibitor.standNumber}</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Contact
                        </Button>
                        <Button variant="outline" size="sm">
                          <Heart className="h-3 w-3 text-red-500 fill-current" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Connexions */}
        {activeTab === 'connections' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Mes Connexions ({connections.length})
                </h3>
                
                <div className="space-y-4">
                  {connections.map((connection) => (
                    <div key={connection.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <img
                        src={connection.avatar}
                        alt={connection.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{connection.name}</h4>
                        <p className="text-sm text-gray-600">{connection.position}</p>
                        <p className="text-sm text-gray-500">{connection.company}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={connection.type === 'exhibitor' ? 'info' : connection.type === 'partner' ? 'warning' : 'success'}
                          size="sm"
                        >
                          {connection.type === 'exhibitor' ? 'Exposant' : 
                           connection.type === 'partner' ? 'Partenaire' : 'Visiteur'}
                        </Badge>
                        
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Message
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Messages */}
        {activeTab === 'messages' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Messages Récents
                </h3>
                
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <img
                        src={message.senderAvatar}
                        alt={message.senderName}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900">{message.senderName}</h4>
                          <span className="text-xs text-gray-500">
                            {formatDate(message.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{message.preview}</p>
                        {!message.read && (
                          <Badge variant="info" size="sm" className="mt-2">
                            Non lu
                          </Badge>
                        )}
                      </div>
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