import React, { useEffect, useState } from 'react';
import { 
  Users, 
  MessageCircle, 
  Calendar, 
  Brain, 
  Globe, 
  Search,
  Filter,
  Star,
  Building2,
  MapPin,
  Zap,
  Target,
  Heart,
  Eye,
  User,
  Award,
  TrendingUp,
  Network,
  Handshake,
  Mail,
  Phone,
  Linkedin,
  Clock,
  CheckCircle,
  Plus,
  Settings,
  BarChart3
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useNetworkingStore } from '../store/networkingStore';
import useAuthStore from '../store/authStore';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

export const NetworkingPage: React.FC = () => {
  const {
    profiles,
    recommendations,
    searchResults,
    favorites,
    connections,
    pendingRequests,
    sentRequests,
    isLoading,
    searchFilters,
    fetchProfiles,
    generateRecommendations,
    searchProfiles,
    sendConnectionRequest,
    addToFavorites,
    removeFromFavorites,
    getAIInsights
  } = useNetworkingStore();

  const { user, isAuthenticated } = useAuthStore();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'recommendations' | 'search' | 'connections' | 'insights'>('recommendations');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedExhibitorForRDV, setSelectedExhibitorForRDV] = useState<any>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [appointmentMessage, setAppointmentMessage] = useState('');

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchProfiles();
      generateRecommendations(user.id);
      loadAIInsights();
      
      // Vérifier si on vient pour prendre un RDV
      const action = searchParams.get('action');
      if (action === 'book_appointment') {
        setActiveTab('recommendations');
      }
    }
  }, [isAuthenticated, user, fetchProfiles, generateRecommendations]);

  const loadAIInsights = async () => {
    if (user) {
      const insights = await getAIInsights(user.id);
      setAiInsights(insights);
    }
  };

  const handleSearch = async () => {
    const criteria = {
      keywords: searchTerm,
      sectors: searchFilters.sectors,
      regions: searchFilters.regions,
      companySize: searchFilters.companySize,
      objectives: searchFilters.objectives
    };
    await searchProfiles(criteria);
    alert(`🔍 RECHERCHE EFFECTUÉE\n\n📝 Critères: ${searchTerm}\n📊 ${searchResults.length} résultats trouvés\n\n✅ Résultats mis à jour !`);
  };

  const handleConnect = async (userId: string, userName: string) => {
    await sendConnectionRequest(userId, 'Je souhaiterais me connecter avec vous sur SIPORTS 2026.');
    alert(`🤝 DEMANDE DE CONNEXION ENVOYÉE\n\n👤 À: ${userName}\n📧 Message personnalisé envoyé\n⏱️ Réponse attendue sous 24h\n\n✅ Demande en attente !`);
  };

  const handleMessage = (userName: string, userCompany: string) => {
    alert(`💬 MESSAGERIE OUVERTE\n\n👤 Contact: ${userName}\n🏢 Entreprise: ${userCompany}\n📝 Rédigez votre message\n\n✅ Conversation démarrée !`);
  };

  const handleScheduleMeeting = (userName: string, userCompany: string) => {
    alert(`📅 PLANIFICATION RDV\n\n👤 Avec: ${userName}\n🏢 ${userCompany}\n⏰ Créneaux disponibles:\n• Demain 14h-14h30\n• Jeudi 10h-10h30\n• Vendredi 16h-16h30\n\n✅ Choisissez votre créneau !`);
  };

  const handleViewProfile = (userName: string, userCompany: string) => {
    alert(`👤 PROFIL DÉTAILLÉ\n\n📋 ${userName}\n🏢 ${userCompany}\n📊 Score compatibilité: 89%\n🎯 Objectifs communs: 3\n🌍 Même région: Europe\n\n✅ Profil affiché !`);
  };

  const handleBookAppointment = (profile: any) => {
    if (!isAuthenticated) {
      alert('🔐 CONNEXION REQUISE\n\nVeuillez vous connecter pour prendre rendez-vous avec les exposants.\n\n✅ Redirection vers la page de connexion...');
      window.location.href = '/login';
      return;
    }
    
    setSelectedExhibitorForRDV(profile);
    setShowAppointmentModal(true);
  };

  const handleConfirmAppointment = () => {
    if (!selectedTimeSlot || !selectedExhibitorForRDV) {
      alert('❌ Veuillez sélectionner un créneau horaire');
      return;
    }
    
    const appointmentData = {
      exhibitor: `${selectedExhibitorForRDV.profile.firstName} ${selectedExhibitorForRDV.profile.lastName}`,
      company: selectedExhibitorForRDV.profile.company,
      timeSlot: selectedTimeSlot,
      message: appointmentMessage,
      visitor: `${user?.profile.firstName} ${user?.profile.lastName}`,
      visitorCompany: user?.profile.company,
      passType: user?.profile.passType || 'basic',
      confirmationId: `RDV-${Date.now()}`
    };
    
    alert(`✅ DEMANDE DE RDV ENVOYÉE\n\n🏢 Exposant: ${appointmentData.exhibitor}\n🏢 Société: ${appointmentData.company}\n⏰ Créneau demandé: ${appointmentData.timeSlot}\n👤 Demandeur: ${appointmentData.visitor}\n🏢 Société: ${appointmentData.visitorCompany}\n🎟️ Pass: ${appointmentData.passType}\n\n💬 Message:\n${appointmentData.message || 'Aucun message spécifique'}\n\n📧 Demande envoyée à l'exposant\n🔔 Vous recevrez une confirmation sous 24h\n📋 Référence: ${appointmentData.confirmationId}\n\n✅ Demande de rendez-vous transmise !`);
    
    setShowAppointmentModal(false);
    setSelectedExhibitorForRDV(null);
    setSelectedTimeSlot('');
    setAppointmentMessage('');
  };

  const handleFavorite = (userId: string, userName: string, isFavorite: boolean) => {
    if (isFavorite) {
      removeFromFavorites(userId);
      alert(`💔 RETIRÉ DES FAVORIS\n\n👤 ${userName}\n📝 Supprimé de votre liste\n\n✅ Favoris mis à jour !`);
    } else {
      addToFavorites(userId);
      alert(`❤️ AJOUTÉ AUX FAVORIS\n\n👤 ${userName}\n📝 Ajouté à votre liste\n\n✅ Favoris mis à jour !`);
    }
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getCompatibilityLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Bon';
    if (score >= 40) return 'Moyen';
    return 'Faible';
  };

  const getUserTypeIcon = (type: string) => {
    switch (type) {
      case 'exhibitor': return Building2;
      case 'partner': return Award;
      case 'visitor': return Users;
      case 'admin': return Star;
      default: return User;
    }
  };

  const getUserTypeLabel = (type: string) => {
    switch (type) {
      case 'exhibitor': return 'Exposant';
      case 'partner': return 'Partenaire';
      case 'visitor': return 'Visiteur';
      case 'admin': return 'Administrateur';
      default: return type;
    }
  };

  const getUserTypeColor = (type: string) => {
    switch (type) {
      case 'exhibitor': return 'bg-blue-100 text-blue-800';
      case 'partner': return 'bg-purple-100 text-purple-800';
      case 'visitor': return 'bg-green-100 text-green-800';
      case 'admin': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-2xl px-4">
          {/* Description du Réseautage */}
          <div className="mb-8">
            <div className="bg-blue-100 p-6 rounded-full w-24 h-24 mx-auto mb-6">
              <Network className="h-12 w-12 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Réseautage Intelligent SIPORTS
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Notre plateforme de réseautage utilise l'intelligence artificielle pour vous connecter 
              avec les professionnels les plus pertinents selon vos objectifs et votre secteur d'activité.
            </p>
            
            {/* Fonctionnalités Clés */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="bg-purple-100 p-2 rounded-lg w-10 h-10 mx-auto mb-3">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">IA de Matching</h3>
                <p className="text-sm text-gray-600">
                  Recommandations personnalisées basées sur vos objectifs
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="bg-green-100 p-2 rounded-lg w-10 h-10 mx-auto mb-3">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Chat Assisté</h3>
                <p className="text-sm text-gray-600">
                  Messagerie avec chatbot IA pour faciliter les échanges
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="bg-blue-100 p-2 rounded-lg w-10 h-10 mx-auto mb-3">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">RDV Intelligents</h3>
                <p className="text-sm text-gray-600">
                  Planification automatique avec suggestions optimales
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="bg-orange-100 p-2 rounded-lg w-10 h-10 mx-auto mb-3">
                  <Globe className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Réseau Global</h3>
                <p className="text-sm text-gray-600">
                  6000+ professionnels de 40 pays connectés
                </p>
              </div>
            </div>
          </div>
          
          {/* Connexion Requise */}
          <div className="bg-blue-100 p-6 rounded-full w-24 h-24 mx-auto mb-6">
            <Network className="h-12 w-12 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Connexion Requise
          </h3>
          <p className="text-gray-600 mb-6">
            Connectez-vous maintenant pour accéder à toutes ces fonctionnalités 
            et commencer à développer votre réseau professionnel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg">
                <User className="h-4 w-4 mr-2" />
                Se Connecter
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" size="lg">
                <Plus className="h-4 w-4 mr-2" />
                Créer un Compte
              </Button>
            </Link>
          </div>
          
          {/* Statistiques Réseautage */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">6,000+</div>
                <div className="text-sm text-gray-600">Professionnels</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">40</div>
                <div className="text-sm text-gray-600">Pays</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">95%</div>
                <div className="text-sm text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Réseautage Intelligent SIPORTS
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Connectez-vous avec les professionnels les plus pertinents grâce à notre 
              intelligence artificielle de matching
            </p>
          </motion.div>

          {/* Navigation Tabs */}
          <div className="flex justify-center">
            <nav className="flex space-x-8">
              {[
                { id: 'recommendations', label: 'Recommandations IA', icon: Brain },
                { id: 'search', label: 'Recherche Avancée', icon: Search },
                { id: 'connections', label: 'Mes Connexions', icon: Users },
                { id: 'insights', label: 'Insights IA', icon: TrendingUp }
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
        {/* Recommandations IA */}
        {activeTab === 'recommendations' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* AI Banner */}
            <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
              <div className="p-8 text-center">
                <div className="bg-white bg-opacity-20 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-4">
                  Intelligence Artificielle de Matching
                </h2>
                <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                  Notre IA analyse vos objectifs, secteur d'activité et préférences pour vous 
                  recommander les contacts les plus pertinents pour votre réussite à SIPORTS 2026.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                    <div className="text-2xl font-bold mb-1">{recommendations.length}</div>
                    <div className="text-purple-100 text-sm">Recommandations</div>
                  </div>
                  <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                    <div className="text-2xl font-bold mb-1">92%</div>
                    <div className="text-purple-100 text-sm">Précision IA</div>
                  </div>
                  <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                    <div className="text-2xl font-bold mb-1">{connections.length}</div>
                    <div className="text-purple-100 text-sm">Connexions</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Recommandations */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-white rounded-lg p-6 h-80">
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="h-20 bg-gray-200 rounded mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : recommendations.length === 0 ? (
              <Card className="text-center p-12">
                <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Génération des recommandations...
                </h3>
                <p className="text-gray-600 mb-4">
                  Notre IA analyse votre profil pour trouver les meilleurs contacts
                </p>
                <Button 
                  onClick={() => {
                    if (user) {
                      generateRecommendations(user.id);
                      alert('🤖 IA ACTIVÉE\n\n🔄 Analyse de votre profil en cours...\n🎯 Recherche de contacts compatibles\n📊 Calcul des scores de matching\n\n⏱️ Recommandations générées !');
                    }
                  }}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Générer les Recommandations
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((recommendation, index) => {
                  const profile = recommendation.user;
                  const UserIcon = getUserTypeIcon(profile.type);
                  const isFavorite = favorites.includes(profile.id);
                  const isConnected = connections.includes(profile.id);
                  const isPending = sentRequests.includes(profile.id);
                  
                  return (
                    <motion.div
                      key={profile.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card hover className="h-full">
                        <div className="p-6">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                                {profile.profile.avatar ? (
                                  <img
                                    src={profile.profile.avatar}
                                    alt={profile.name}
                                    className="h-12 w-12 rounded-full object-cover"
                                  />
                                ) : (
                                  <User className="h-6 w-6 text-gray-600" />
                                )}
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">
                                  {profile.profile.firstName} {profile.profile.lastName}
                                </h3>
                                <p className="text-sm text-gray-600">{profile.profile.position}</p>
                                <p className="text-sm text-gray-500">{profile.profile.company}</p>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-end space-y-2">
                              <div className={`text-right ${getCompatibilityColor(recommendation.score)}`}>
                                <div className="text-2xl font-bold">{recommendation.score}%</div>
                                <div className="text-xs">Compatibilité</div>
                              </div>
                              <Badge 
                                className={getUserTypeColor(profile.type)}
                                size="sm"
                              >
                                <UserIcon className="h-3 w-3 mr-1" />
                                {getUserTypeLabel(profile.type)}
                              </Badge>
                            </div>
                          </div>

                          {/* Bio */}
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {profile.profile.bio}
                          </p>

                          {/* Raisons du Match */}
                          <div className="mb-4">
                            <h4 className="font-medium text-gray-900 mb-2 text-sm">
                              Pourquoi ce contact :
                            </h4>
                            <div className="space-y-1">
                              {recommendation.reasons.slice(0, 3).map((reason, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                  <span className="text-xs text-gray-600">{reason}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Informations */}
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{profile.profile.country}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Building2 className="h-3 w-3" />
                              <span>{profile.profile.companySize}</span>
                            </div>
                            {recommendation.mutualConnections > 0 && (
                              <div className="flex items-center space-x-1">
                                <Users className="h-3 w-3" />
                                <span>{recommendation.mutualConnections} connexions communes</span>
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            {isConnected ? (
                              <Button size="sm" variant="outline" disabled>
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Connecté
                              </Button>
                            ) : isPending ? (
                              <Button size="sm" variant="outline" disabled>
                                <Clock className="h-3 w-3 mr-1" />
                                En attente
                              </Button>
                            ) : (
                              <Button 
                                size="sm"
                                onClick={() => handleConnect(profile.id, `${profile.profile.firstName} ${profile.profile.lastName}`)}
                              >
                                <Handshake className="h-3 w-3 mr-1" />
                                Connecter
                              </Button>
                            )}
                              
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleBookAppointment(profile)}
                            >
                              <Calendar className="h-3 w-3 mr-1" />
                              RDV
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleMessage(`${profile.profile.firstName} ${profile.profile.lastName}`, profile.profile.company || '')}
                            >
                              <MessageCircle className="h-3 w-3 mr-1" />
                              Message
                            </Button>
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleScheduleMeeting(`${profile.profile.firstName} ${profile.profile.lastName}`, profile.profile.company || '')}
                            >
                              <Calendar className="h-3 w-3 mr-1" />
                              RDV
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleFavorite(profile.id, `${profile.profile.firstName} ${profile.profile.lastName}`, isFavorite)}
                            >
                              <Heart className={`h-3 w-3 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewProfile(`${profile.profile.firstName} ${profile.profile.lastName}`, profile.profile.company || '')}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}

        {/* Recherche Avancée */}
        {activeTab === 'search' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Filtres de Recherche */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recherche Avancée de Contacts
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mots-clés
                    </label>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Technologies, secteurs..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Secteur
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Tous les secteurs</option>
                      <option value="port-operations">Opérations Portuaires</option>
                      <option value="technology">Technologie</option>
                      <option value="logistics">Logistique</option>
                      <option value="consulting">Consulting</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Région
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Toutes les régions</option>
                      <option value="europe">Europe</option>
                      <option value="africa">Afrique</option>
                      <option value="asia">Asie</option>
                      <option value="americas">Amériques</option>
                    </select>
                  </div>
                  
                  <div className="flex items-end">
                    <Button onClick={handleSearch} className="w-full">
                      <Search className="h-4 w-4 mr-2" />
                      Rechercher
                    </Button>
                  </div>
                </div>

                <Button 
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="mb-4"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filtres Avancés
                </Button>

                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="border-t border-gray-200 pt-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Taille d'entreprise
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="">Toutes tailles</option>
                          <option value="startup">Startup (1-50)</option>
                          <option value="sme">PME (50-250)</option>
                          <option value="large">Grande (250+)</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Objectifs
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="">Tous objectifs</option>
                          <option value="partnership">Partenariats</option>
                          <option value="technology">Transfert technologique</option>
                          <option value="investment">Investissement</option>
                        </select>
                      </div>
                      
                      <div className="flex items-end">
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => {
                            setSearchTerm('');
                            setShowFilters(false);
                            alert('🔄 FILTRES RÉINITIALISÉS\n\n✅ Tous les critères effacés\n🔍 Recherche remise à zéro\n\n📋 Prêt pour une nouvelle recherche !');
                          }}
                        >
                          Réinitialiser
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </Card>

            {/* Résultats de Recherche */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(searchResults.length > 0 ? searchResults : profiles.slice(0, 6)).map((profile, index) => {
                const UserIcon = getUserTypeIcon(profile.type);
                const isFavorite = favorites.includes(profile.id);
                const isConnected = connections.includes(profile.id);
                
                return (
                  <motion.div
                    key={profile.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card hover>
                      <div className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                            {profile.profile.avatar ? (
                              <img
                                src={profile.profile.avatar}
                                alt={profile.name}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <User className="h-5 w-5 text-gray-600" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {profile.profile.firstName} {profile.profile.lastName}
                            </h3>
                            <p className="text-sm text-gray-600">{profile.profile.company}</p>
                          </div>
                        </div>
                        
                        <Badge className={getUserTypeColor(profile.type)} size="sm" className="mb-3">
                          <UserIcon className="h-3 w-3 mr-1" />
                          {getUserTypeLabel(profile.type)}
                        </Badge>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {profile.profile.bio}
                        </p>
                        
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleConnect(profile.id, `${profile.profile.firstName} ${profile.profile.lastName}`)}
                          >
                            <Handshake className="h-3 w-3 mr-1" />
                            Connecter
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleFavorite(profile.id, `${profile.profile.firstName} ${profile.profile.lastName}`, isFavorite)}
                          >
                            <Heart className={`h-3 w-3 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Mes Connexions */}
        {activeTab === 'connections' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Mes Connexions ({connections.length})
                  </h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      alert('📊 STATISTIQUES CONNEXIONS\n\n👥 Total: 24 connexions\n🏢 Exposants: 12\n🤝 Partenaires: 8\n👤 Visiteurs: 4\n\n📈 +15% ce mois !');
                    }}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Statistiques
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {profiles.filter(p => connections.includes(p.id)).map((profile, index) => {
                    const UserIcon = getUserTypeIcon(profile.type);
                    
                    return (
                      <motion.div
                        key={profile.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card hover>
                          <div className="p-6">
                            <div className="flex items-center space-x-3 mb-4">
                              <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                                {profile.profile.avatar ? (
                                  <img
                                    src={profile.profile.avatar}
                                    alt={profile.name}
                                    className="h-10 w-10 rounded-full object-cover"
                                  />
                                ) : (
                                  <User className="h-5 w-5 text-gray-600" />
                                )}
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">
                                  {profile.profile.firstName} {profile.profile.lastName}
                                </h3>
                                <p className="text-sm text-gray-600">{profile.profile.company}</p>
                              </div>
                            </div>
                            
                            <Badge className={getUserTypeColor(profile.type)} size="sm" className="mb-3">
                              <UserIcon className="h-3 w-3 mr-1" />
                              {getUserTypeLabel(profile.type)}
                            </Badge>
                            
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                className="flex-1"
                                onClick={() => handleMessage(`${profile.profile.firstName} ${profile.profile.lastName}`, profile.profile.company || '')}
                              >
                                <MessageCircle className="h-3 w-3 mr-1" />
                                Message
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleScheduleMeeting(`${profile.profile.firstName} ${profile.profile.lastName}`, profile.profile.company || '')}
                              >
                                <Calendar className="h-3 w-3 mr-1" />
                                RDV
                              </Button>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>

                {connections.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Aucune connexion pour le moment
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Commencez par explorer les recommandations IA
                    </p>
                    <Button 
                      onClick={() => setActiveTab('recommendations')}
                    >
                      <Brain className="h-4 w-4 mr-2" />
                      Voir les Recommandations
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Insights IA */}
        {activeTab === 'insights' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Insights Intelligence Artificielle
                </h3>
                
                {aiInsights ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        <h4 className="font-medium text-blue-900">Tendances Réseau</h4>
                      </div>
                      <p className="text-blue-700 text-sm">
                        Votre réseau s'est élargi de 23% ce mois-ci avec une forte croissance 
                        dans le secteur technologique.
                      </p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Target className="h-5 w-5 text-green-600" />
                        <h4 className="font-medium text-green-900">Opportunités</h4>
                      </div>
                      <p className="text-green-700 text-sm">
                        5 nouvelles opportunités de partenariat détectées dans votre secteur 
                        d'activité cette semaine.
                      </p>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Brain className="h-5 w-5 text-purple-600" />
                        <h4 className="font-medium text-purple-900">Recommandations</h4>
                      </div>
                      <p className="text-purple-700 text-sm">
                        L'IA suggère de vous connecter avec 3 nouveaux profils hautement 
                        compatibles avec vos objectifs.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Génération des insights...
                    </h3>
                    <p className="text-gray-600 mb-4">
                      L'IA analyse vos données pour générer des insights personnalisés
                    </p>
                    <Button onClick={loadAIInsights}>
                      <Zap className="h-4 w-4 mr-2" />
                      Générer les Insights
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Modal de Prise de RDV */}
      {showAppointmentModal && selectedExhibitorForRDV && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Demande de Rendez-vous
            </h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Exposant:</strong> {selectedExhibitorForRDV.profile.firstName} {selectedExhibitorForRDV.profile.lastName}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Société:</strong> {selectedExhibitorForRDV.profile.company}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Créneau souhaité
              </label>
              <select 
                value={selectedTimeSlot}
                onChange={(e) => setSelectedTimeSlot(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionnez un créneau</option>
                <option value="Mardi 10h-10h30">Mardi 10h-10h30</option>
                <option value="Mardi 14h-14h30">Mardi 14h-14h30</option>
                <option value="Mercredi 9h-9h30">Mercredi 9h-9h30</option>
                <option value="Mercredi 15h-15h30">Mercredi 15h-15h30</option>
                <option value="Jeudi 11h-11h30">Jeudi 11h-11h30</option>
                <option value="Jeudi 16h-16h30">Jeudi 16h-16h30</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message (optionnel)
              </label>
              <textarea
                value={appointmentMessage}
                onChange={(e) => setAppointmentMessage(e.target.value)}
                placeholder="Précisez l'objet de votre demande de rendez-vous..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>

            <div className="flex space-x-3">
              <Button 
                onClick={handleConfirmAppointment}
                className="flex-1"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Envoyer la Demande
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  setShowAppointmentModal(false);
                  setSelectedExhibitorForRDV(null);
                  setSelectedTimeSlot('');
                  setAppointmentMessage('');
                }}
              >
                Annuler
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          size="lg"
          className="rounded-full shadow-lg"
          onClick={() => {
            alert('👥 MES CONNEXIONS\n\n📊 24 connexions actives\n💬 5 conversations en cours\n📅 3 RDV programmés\n\n✅ Vue d\'ensemble affichée !');
          }}
          title="Voir mes connexions"
        >
          <Users className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};