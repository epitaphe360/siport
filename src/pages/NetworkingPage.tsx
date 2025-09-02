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
  Clock
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useNetworkingStore } from '../store/networkingStore';
import { useAuthStore } from '../store/authStore';
import { motion } from 'framer-motion';

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
  const [activeTab, setActiveTab] = useState<'recommendations' | 'search' | 'connections' | 'insights'>('recommendations');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [aiInsights, setAiInsights] = useState<any>(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchProfiles();
      generateRecommendations(user.id);
      loadAIInsights();
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
  };

  const handleConnect = async (userId: string) => {
    await sendConnectionRequest(userId, 'Je souhaiterais me connecter avec vous sur SIPORTS 2026.');
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
            <Button size="lg">
              <User className="h-4 w-4 mr-2" />
              Se Connecter
            </Button>
            <Button variant="outline" size="lg">
              Créer un Compte
            </Button>
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
                <Button onClick={() => user && generateRecommendations(user.id)}>
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
                          <div className="flex space-x-2">
                            {isConnected ? (
                              <Button size="sm" variant="outline" className="flex-1" disabled>
                                <Handshake className="h-3 w-3 mr-1" />
                                Connecté
                              </Button>
                            ) : isPending ? (
                              <Button size="sm" variant="outline" className="flex-1" disabled>
                                <Clock className="h-3 w-3 mr-1" />
                                En attente
                              </Button>
                            ) : (
                              <Button 
                                size="sm" 
                                className="flex-1"
                                onClick={() => handleConnect(profile.id)}
                              >
                                <Handshake className="h-3 w-3 mr-1" />
                                Se connecter
                              </Button>
                            )}
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                if (isFavorite) {
                                  removeFromFavorites(profile.id);
                                } else {
                                  addToFavorites(profile.id);
                                }
                              }}
                            >
                              <Heart className={`h-3 w-3 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
                            </Button>
                            
                            <Button variant="outline" size="sm">
                              <MessageCircle className="h-3 w-3" />
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
              </div>
            </Card>

            {/* Résultats de Recherche */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((profile, index) => {
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
                            <User className="h-5 w-5 text-gray-600" />
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
                          <Button size="sm" className="flex-1">
                            <Handshake className="h-3 w-3 mr-1" />
                            Connecter
                          </Button>
                          <Button variant="outline" size="sm">
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
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Mes Connexions ({connections.length})
                </h3>
                
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
                                <User className="h-5 w-5 text-gray-600" />
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
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
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
                        <Badge key={index} variant="info" size="sm">
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
                      Meilleur Moment
                    </h3>
                    <p className="text-gray-700">
                      {aiInsights.bestTimeToConnect}
                    </p>
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
                <Button onClick={loadAIInsights}>
                  <Zap className="h-4 w-4 mr-2" />
                  Générer les Insights
                </Button>
              </Card>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};