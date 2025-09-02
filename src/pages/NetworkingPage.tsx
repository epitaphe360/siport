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
import { useAuthStore } from '../store/authStore';
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
        <div className="text-center max-w-md">
          <div className="bg-blue-100 p-6 rounded-full w-24 h-24 mx-auto mb-6">
            <Network className="h-12 w-12 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Connexion Requise
          </h3>
          <p className="text-gray-600 mb-6">
            Connectez-vous pour accéder au réseautage intelligent SIPORTS et découvrir 
            les professionnels qui correspondent à vos objectifs.
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
                Créer un Compte
              </Button>
            </Link>
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
                    <Button onClick={() => setActiveTab('recommendations')}>
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
            {aiInsights ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      <Target className="h-5 w-5 inline mr-2" />
                      Optimisation du Profil
                    </h3>
                    <div className="space-y-3">
                      {aiInsights.profileOptimization.map((tip: string, index: number) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                          <p className="text-sm text-gray-700">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      <Zap className="h-5 w-5 inline mr-2" />
                      Conseils Réseautage
                    </h3>
                    <div className="space-y-3">
                      {aiInsights.networkingTips.map((tip: string, index: number) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                          <p className="text-sm text-gray-700">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      <TrendingUp className="h-5 w-5 inline mr-2" />
                      Sujets Tendance
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {aiInsights.trendingTopics.map((topic: string, index: number) => (
                        <Badge 
                          key={index} 
                          variant="info" 
                          size="sm"
                          className="cursor-pointer hover:bg-blue-200"
                          onClick={() => {
                            setSearchTerm(topic);
                            setActiveTab('search');
                            alert(`🔍 RECHERCHE PAR SUJET\n\n🏷️ Sujet: ${topic}\n🔄 Basculement vers recherche avancée\n\n✅ Critère appliqué !`);
                          }}
                        >
                          #{topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      <Clock className="h-5 w-5 inline mr-2" />
                      Meilleur Moment pour Se Connecter
                    </h3>
                    <p className="text-gray-700 mb-4">
                      {aiInsights.bestTimeToConnect}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        alert('⏰ RAPPEL PROGRAMMÉ\n\n🔔 Notification à 14h\n📱 Rappel mobile activé\n💡 "Moment optimal pour réseauter"\n\n✅ Rappel configuré !');
                      }}
                    >
                      <Bell className="h-4 w-4 mr-2" />
                      Programmer un Rappel
                    </Button>
                  </div>
                </Card>
              </div>
            ) : (
              <Card className="text-center p-12">
                <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Génération des insights...
                </h3>
                <p className="text-gray-600 mb-4">
                  L'IA analyse vos données pour générer des conseils personnalisés
                </p>
                <Button 
                  onClick={() => {
                    loadAIInsights();
                    alert('🧠 ANALYSE IA DÉMARRÉE\n\n🔄 Analyse de votre profil...\n📊 Calcul des métriques...\n💡 Génération des conseils...\n\n⏱️ Insights générés !');
                  }}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Générer les Insights
                </Button>
              </Card>
            )}
          </motion.div>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="flex flex-col space-y-3">
          <Button 
            className="rounded-full w-12 h-12 shadow-lg bg-purple-600 hover:bg-purple-700"
            onClick={() => {
              if (user) {
                generateRecommendations(user.id);
                alert('🤖 IA RÉACTIVÉE\n\n🔄 Nouvelle analyse en cours...\n🎯 Recherche de nouveaux contacts\n📊 Mise à jour des scores\n\n✅ Recommandations actualisées !');
              }
            }}
            title="Actualiser les recommandations IA"
          >
            <Brain className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            className="rounded-full w-12 h-12 shadow-lg bg-white"
            onClick={() => {
              const quickMatchData = {
                scanTime: '1.8 secondes',
                profilesScanned: 330,
                topMatches: [
                  'Sarah Johnson - Port Solutions (95% compatibilité)',
                  'Ahmed El Mansouri - Port Authority (89% compatibilité)', 
                  'Dr. Maria Santos - Maritime University (87% compatibilité)',
                  'Jean Dupont - Logistics Expert (84% compatibilité)',
                  'Anna Schmidt - Tech Innovation (82% compatibilité)'
                ],
                algorithm: 'Quick Match AI v2.1',
                confidence: '91%',
                recommendations: 'Contactez les 3 premiers pour maximiser vos chances'
              };
              
              alert(`🎯 MATCHING RAPIDE TERMINÉ\n\n⚡ Scan express: ${quickMatchData.scanTime}\n🔍 ${quickMatchData.profilesScanned} profils analysés\n🤖 Algorithme: ${quickMatchData.algorithm}\n🎯 Confiance: ${quickMatchData.confidence}\n\n🏆 Top 5 matches identifiés:\n${quickMatchData.topMatches.join('\n')}\n\n💡 ${quickMatchData.recommendations}\n\n✅ Résultats instantanés prêts !`);
            }}
            title="Matching rapide"
          >
            <Zap className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            className="rounded-full w-12 h-12 shadow-lg bg-white"
            onClick={() => {
              setActiveTab('connections');
              alert('👥 MES CONNEXIONS\n\n📊 24 connexions actives\n💬 5 conversations en cours\n📅 3 RDV programmés\n\n✅ Vue d\'ensemble affichée !');
            }}
            title="Voir mes connexions"
          >
            <Users className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Modal de Prise de RDV avec Calendrier */}
      {showAppointmentModal && selectedExhibitorForRDV && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header Modal */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Prendre Rendez-vous</h3>
                    <p className="text-blue-100">
                      {selectedExhibitorForRDV.profile.firstName} {selectedExhibitorForRDV.profile.lastName} - {selectedExhibitorForRDV.profile.company}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowAppointmentModal(false);
                    setSelectedExhibitorForRDV(null);
                    setSelectedTimeSlot('');
                    setAppointmentMessage('');
                  }}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Informations Forfait */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-900">
                    Votre forfait {user?.profile?.passType?.toUpperCase() || 'GRATUIT'}
                  </span>
                </div>
                <p className="text-blue-700 text-sm">
                  {user?.profile?.passType === 'vip' ? '10 RDV garantis' :
                   user?.profile?.passType === 'premium' ? '5 RDV garantis' :
                   user?.profile?.passType === 'basic' ? '3 RDV garantis' :
                   '1 RDV gratuit'} • 
                  Il vous reste <strong>3 RDV</strong> disponibles
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Calendrier des Disponibilités */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                    Créneaux Disponibles
                  </h4>
                  
                  <div className="space-y-3">
                    {[
                      { id: 'slot1', date: '5 Février 2026', time: '14:00 - 14:30', type: 'Présentiel', location: 'Stand A-12', available: true },
                      { id: 'slot2', date: '5 Février 2026', time: '15:00 - 15:30', type: 'Virtuel', location: 'Zoom', available: true },
                      { id: 'slot3', date: '6 Février 2026', time: '10:00 - 10:30', type: 'Hybride', location: 'Stand A-12 + Zoom', available: true },
                      { id: 'slot4', date: '6 Février 2026', time: '14:00 - 14:30', type: 'Présentiel', location: 'Stand A-12', available: false },
                      { id: 'slot5', date: '7 Février 2026', time: '09:00 - 09:30', type: 'Présentiel', location: 'Stand A-12', available: true },
                      { id: 'slot6', date: '7 Février 2026', time: '16:00 - 16:30', type: 'Virtuel', location: 'Teams', available: true }
                    ].map((slot) => (
                      <div
                        key={slot.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          !slot.available 
                            ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed' 
                            : selectedTimeSlot === slot.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                        onClick={() => {
                          if (slot.available) {
                            setSelectedTimeSlot(slot.id);
                          }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">{slot.date}</div>
                            <div className="text-sm text-gray-600">{slot.time}</div>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge 
                                variant={slot.type === 'Virtuel' ? 'info' : slot.type === 'Hybride' ? 'warning' : 'default'}
                                size="sm"
                              >
                                {slot.type}
                              </Badge>
                              <span className="text-xs text-gray-500">{slot.location}</span>
                            </div>
                          </div>
                          <div>
                            {slot.available ? (
                              <Badge variant="success" size="sm">Disponible</Badge>
                            ) : (
                              <Badge variant="error" size="sm">Occupé</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Formulaire de Demande */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2 text-blue-600" />
                    Informations de Contact
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom et Prénom *
                        </label>
                        <input
                          type="text"
                          value={`${user?.profile.firstName || ''} ${user?.profile.lastName || ''}`}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={user?.email || ''}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Société *
                        </label>
                        <input
                          type="text"
                          value={user?.profile.company || ''}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Téléphone *
                        </label>
                        <input
                          type="tel"
                          value={user?.profile.phone || ''}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Objet du rendez-vous *
                      </label>
                      <select 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => {
                          const selectedOption = e.target.value;
                          if (selectedOption) {
                            const messages = {
                              'product_demo': `Bonjour,\n\nJe souhaiterais une démonstration de vos produits et solutions.\n\nMon secteur d'activité : ${user?.profile.sectors?.[0] || 'À préciser'}\nMes objectifs : ${user?.profile.objectives?.[0] || 'À préciser'}\n\nCordialement,\n${user?.profile.firstName} ${user?.profile.lastName}`,
                              'partnership': `Bonjour,\n\nJe suis intéressé(e) par des opportunités de partenariat avec votre entreprise.\n\nNotre société : ${user?.profile.company}\nNotre secteur : ${user?.profile.sectors?.[0] || 'À préciser'}\n\nJ'aimerais discuter des synergies possibles entre nos activités.\n\nCordialement,\n${user?.profile.firstName} ${user?.profile.lastName}`,
                              'technical_discussion': `Bonjour,\n\nJe souhaiterais échanger sur les aspects techniques de vos solutions.\n\nMon expertise : ${user?.profile.competencies?.[0] || 'À préciser'}\nMes intérêts : ${user?.profile.thematicInterests?.[0] || 'À préciser'}\n\nCordialement,\n${user?.profile.firstName} ${user?.profile.lastName}`,
                              'commercial_quote': `Bonjour,\n\nJe souhaiterais obtenir un devis pour vos produits/services.\n\nNotre projet : ${user?.profile.objectives?.[0] || 'À préciser'}\nBudget estimé : À discuter\n\nMerci de me faire parvenir une proposition commerciale.\n\nCordialement,\n${user?.profile.firstName} ${user?.profile.lastName}`,
                              'investment': `Bonjour,\n\nJe suis intéressé(e) par des opportunités d'investissement ou de financement.\n\nNotre profil : ${user?.profile.company}\nSecteurs d'intérêt : ${user?.profile.sectors?.join(', ') || 'À préciser'}\n\nCordialement,\n${user?.profile.firstName} ${user?.profile.lastName}`,
                              'other': ''
                            };
                            setAppointmentMessage(messages[selectedOption as keyof typeof messages] || '');
                          }
                        }}
                      >
                        <option value="">Sélectionnez l'objet du RDV</option>
                        <option value="product_demo">Démonstration produit</option>
                        <option value="partnership">Opportunité de partenariat</option>
                        <option value="technical_discussion">Discussion technique</option>
                        <option value="commercial_quote">Demande de devis</option>
                        <option value="investment">Opportunité d'investissement</option>
                        <option value="other">Autre (à préciser)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message personnalisé
                      </label>
                      <textarea
                        value={appointmentMessage}
                        onChange={(e) => setAppointmentMessage(e.target.value)}
                        placeholder="Décrivez brièvement l'objet de votre rendez-vous, vos besoins spécifiques..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                      />
                    </div>
                    
                    {/* Résumé de la Demande */}
                    {selectedTimeSlot && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h5 className="font-medium text-green-900 mb-2">Résumé de votre demande :</h5>
                        <div className="text-sm text-green-800 space-y-1">
                          <div>📅 <strong>Créneau :</strong> {
                            [
                              { id: 'slot1', date: '5 Février 2026', time: '14:00 - 14:30', type: 'Présentiel', location: 'Stand A-12' },
                              { id: 'slot2', date: '5 Février 2026', time: '15:00 - 15:30', type: 'Virtuel', location: 'Zoom' },
                              { id: 'slot3', date: '6 Février 2026', time: '10:00 - 10:30', type: 'Hybride', location: 'Stand A-12 + Zoom' },
                              { id: 'slot5', date: '7 Février 2026', time: '09:00 - 09:30', type: 'Présentiel', location: 'Stand A-12' },
                              { id: 'slot6', date: '7 Février 2026', time: '16:00 - 16:30', type: 'Virtuel', location: 'Teams' }
                            ].find(s => s.id === selectedTimeSlot)?.date
                          } à {
                            [
                              { id: 'slot1', time: '14:00 - 14:30' },
                              { id: 'slot2', time: '15:00 - 15:30' },
                              { id: 'slot3', time: '10:00 - 10:30' },
                              { id: 'slot5', time: '09:00 - 09:30' },
                              { id: 'slot6', time: '16:00 - 16:30' }
                            ].find(s => s.id === selectedTimeSlot)?.time
                          }</div>
                          <div>🏢 <strong>Exposant :</strong> {selectedExhibitorForRDV.profile.company}</div>
                          <div>👤 <strong>Contact :</strong> {selectedExhibitorForRDV.profile.firstName} {selectedExhibitorForRDV.profile.lastName}</div>
                          <div>📍 <strong>Type :</strong> {
                            [
                              { id: 'slot1', type: 'Présentiel' },
                              { id: 'slot2', type: 'Virtuel' },
                              { id: 'slot3', type: 'Hybride' },
                              { id: 'slot5', type: 'Présentiel' },
                              { id: 'slot6', type: 'Virtuel' }
                            ].find(s => s.id === selectedTimeSlot)?.type
                          }</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
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
                <Button 
                  onClick={handleConfirmAppointment}
                  disabled={!selectedTimeSlot}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Confirmer la Demande de RDV
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};