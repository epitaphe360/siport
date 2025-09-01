import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MessageCircle, 
  Calendar, 
  Brain, 
  Search,
  Filter,
  Star,
  MapPin,
  Building2,
  Target,
  Zap,
  Globe,
  Heart,
  UserPlus,
  TrendingUp,
  Award,
  Eye,
  Clock,
  CheckCircle,
  X,
  Send,
  Settings
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useNetworkingStore } from '../store/networkingStore';
import { motion, AnimatePresence } from 'framer-motion';

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
    acceptConnectionRequest,
    rejectConnectionRequest,
    addToFavorites,
    removeFromFavorites,
    getAIInsights
  } = useNetworkingStore();

  const [activeTab, setActiveTab] = useState<'recommendations' | 'search' | 'connections' | 'requests'>('recommendations');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [connectionMessage, setConnectionMessage] = useState('');
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const [aiInsights, setAiInsights] = useState<any>(null);

  useEffect(() => {
    fetchProfiles();
    generateRecommendations('user1'); // Current user ID
  }, [fetchProfiles, generateRecommendations]);

  useEffect(() => {
    // Load AI insights
    getAIInsights('user1').then(setAiInsights);
  }, [getAIInsights]);

  const handleSendConnectionRequest = async (userId: string) => {
    await sendConnectionRequest(userId, connectionMessage);
    setShowConnectionModal(false);
    setSelectedProfile(null);
    setConnectionMessage('');
  };

  const sectors = ['Port Operations', 'Technology', 'Logistics', 'Infrastructure', 'Research', 'Government'];
  const regions = ['Europe', 'Africa', 'Middle East', 'Asia', 'Americas'];
  const companySizes = ['1-50', '50-200', '200-1000', '1000+'];
  const objectives = ['Technology Transfer', 'Market Expansion', 'Research Partnership', 'Investment'];

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getProfileTypeIcon = (type: string) => {
    switch (type) {
      case 'exhibitor': return Building2;
      case 'partner': return Award;
      case 'visitor': return Users;
      default: return Users;
    }
  };

  const getProfileTypeLabel = (type: string) => {
    switch (type) {
      case 'exhibitor': return 'Exposant';
      case 'partner': return 'Partenaire';
      case 'visitor': return 'Visiteur';
      default: return type;
    }
  };

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
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                Réseautage Intelligent IA
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Découvrez les professionnels les plus pertinents grâce à notre moteur de matching 
              basé sur l'intelligence artificielle et les algorithmes d'apprentissage automatique
            </p>
          </motion.div>

          {/* AI Insights Banner */}
          {aiInsights && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4 mb-6"
            >
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Brain className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-purple-900 mb-2">
                    Recommandations IA Personnalisées
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-purple-700 font-medium mb-1">Optimisation du profil :</p>
                      <p className="text-purple-600">{aiInsights.profileOptimization[0]}</p>
                    </div>
                    <div>
                      <p className="text-purple-700 font-medium mb-1">Conseil réseautage :</p>
                      <p className="text-purple-600">{aiInsights.networkingTips[0]}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { id: 'recommendations', label: 'Recommandations IA', icon: Brain, count: recommendations.length },
              { id: 'search', label: 'Recherche Avancée', icon: Search, count: searchResults.length },
              { id: 'connections', label: 'Mes Connexions', icon: Users, count: connections.length },
              { id: 'requests', label: 'Demandes', icon: UserPlus, count: pendingRequests.length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <Badge variant="info" size="sm">
                    {tab.count}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Recommendations Tab */}
        {activeTab === 'recommendations' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="text-center p-6">
                <div className="bg-blue-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{recommendations.length}</div>
                <div className="text-sm text-gray-600">Recommandations IA</div>
              </Card>
              
              <Card className="text-center p-6">
                <div className="bg-green-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">8</div>
                <div className="text-sm text-gray-600">Conversations Actives</div>
              </Card>
              
              <Card className="text-center p-6">
                <div className="bg-purple-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">5</div>
                <div className="text-sm text-gray-600">RDV Programmés</div>
              </Card>
              
              <Card className="text-center p-6">
                <div className="bg-orange-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{connections.length}</div>
                <div className="text-sm text-gray-600">Connexions</div>
              </Card>
            </div>

            {/* AI Recommendations */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Recommandations Personnalisées par IA
                </h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => generateRecommendations('user1')}
                  disabled={isLoading}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Actualiser
                </Button>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-white rounded-lg p-6 h-80">
                        <div className="h-4 bg-gray-200 rounded mb-4"></div>
                        <div className="h-20 bg-gray-200 rounded mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {recommendations.map((match, index) => {
                    const ProfileIcon = getProfileTypeIcon(match.user.type);
                    const isFavorite = favorites.includes(match.user.id);
                    const isConnected = connections.includes(match.user.id);
                    const requestSent = sentRequests.includes(match.user.id);
                    
                    return (
                      <motion.div
                        key={match.user.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card hover className="relative h-full">
                          {/* Compatibility Score */}
                          <div className="absolute top-4 right-4">
                            <div className={`px-3 py-1 rounded-full text-sm font-bold ${getCompatibilityColor(match.score)}`}>
                              {match.score}% match
                            </div>
                          </div>

                          {/* Favorite Button */}
                          <button
                            onClick={() => isFavorite ? removeFromFavorites(match.user.id) : addToFavorites(match.user.id)}
                            className="absolute top-4 left-4 p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
                          >
                            <Heart className={`h-4 w-4 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                          </button>

                          <div className="p-6 pt-12">
                            {/* Profile Header */}
                            <div className="flex items-start space-x-4 mb-4">
                              <img
                                src={match.user.profile.avatar}
                                alt={match.user.name}
                                className="h-16 w-16 rounded-full object-cover border-2 border-gray-200"
                              />
                              <div className="flex-1">
                                <h3 className="font-bold text-gray-900 text-lg mb-1">
                                  {match.user.profile.firstName} {match.user.profile.lastName}
                                </h3>
                                <p className="text-sm text-gray-600 mb-1">{match.user.profile.position}</p>
                                <div className="flex items-center space-x-2 mb-2">
                                  <Building2 className="h-4 w-4 text-gray-400" />
                                  <span className="text-sm text-gray-600">{match.user.profile.company}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <MapPin className="h-4 w-4 text-gray-400" />
                                  <span className="text-sm text-gray-600">{match.user.profile.country}</span>
                                </div>
                              </div>
                            </div>

                            {/* Profile Type */}
                            <div className="flex items-center space-x-2 mb-4">
                              <ProfileIcon className="h-4 w-4 text-blue-600" />
                              <Badge variant="info" size="sm">
                                {getProfileTypeLabel(match.user.type)}
                              </Badge>
                            </div>

                            {/* Bio */}
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                              {match.user.profile.bio}
                            </p>

                            {/* Compatibility Factors */}
                            <div className="mb-4">
                              <h4 className="text-sm font-medium text-gray-900 mb-2">
                                Facteurs de compatibilité :
                              </h4>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Secteur:</span>
                                  <span className="font-medium">{match.compatibilityFactors.sectorAlignment}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Objectifs:</span>
                                  <span className="font-medium">{match.compatibilityFactors.objectiveAlignment}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Géographie:</span>
                                  <span className="font-medium">{match.compatibilityFactors.geographicRelevance}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Collaboration:</span>
                                  <span className="font-medium">{match.compatibilityFactors.collaborationPotential}%</span>
                                </div>
                              </div>
                            </div>

                            {/* Match Reasons */}
                            <div className="mb-4">
                              <h4 className="text-sm font-medium text-gray-900 mb-2">
                                Raisons du match IA :
                              </h4>
                              <div className="flex flex-wrap gap-1">
                                {match.reasons.map((reason, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-700"
                                  >
                                    {reason}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Interests & Expertise */}
                            <div className="mb-6">
                              <h4 className="text-sm font-medium text-gray-900 mb-2">
                                Expertises :
                              </h4>
                              <div className="flex flex-wrap gap-1">
                                {match.user.profile.expertise?.slice(0, 3).map((exp, idx) => (
                                  <Badge key={idx} variant="default" size="sm">
                                    {exp}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Mutual Connections */}
                            {match.mutualConnections > 0 && (
                              <div className="mb-4 text-sm text-gray-600 flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                {match.mutualConnections} connexion{match.mutualConnections > 1 ? 's' : ''} mutuelle{match.mutualConnections > 1 ? 's' : ''}
                              </div>
                            )}

                            {/* Actions */}
                            <div className="flex space-x-2">
                              {isConnected ? (
                                <Button size="sm" variant="outline" className="flex-1" disabled>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Connecté
                                </Button>
                              ) : requestSent ? (
                                <Button size="sm" variant="outline" className="flex-1" disabled>
                                  <Clock className="h-4 w-4 mr-2" />
                                  Demande envoyée
                                </Button>
                              ) : (
                                <Button 
                                  size="sm" 
                                  className="flex-1"
                                  onClick={() => {
                                    setSelectedProfile(match.user.id);
                                    setShowConnectionModal(true);
                                  }}
                                >
                                  <UserPlus className="h-4 w-4 mr-2" />
                                  Se connecter
                                </Button>
                              )}
                              
                              <Button variant="outline" size="sm">
                                <MessageCircle className="h-4 w-4 mr-2" />
                                Message
                              </Button>
                              
                              <Button variant="outline" size="sm">
                                <Calendar className="h-4 w-4 mr-2" />
                                RDV
                              </Button>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Search Tab */}
        {activeTab === 'search' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Advanced Search Filters */}
            <Card className="mb-8">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Recherche Avancée avec IA Sémantique
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filtres Avancés
                  </Button>
                </div>

                {/* Search Bar */}
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Recherche sémantique IA : 'ports durables', 'automation maritime', 'partenaires technologiques'..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    onChange={(e) => searchProfiles({ keywords: e.target.value })}
                  />
                </div>

                {/* Advanced Filters */}
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid grid-cols-1 md:grid-cols-4 gap-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Secteurs
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="">Tous les secteurs</option>
                          {sectors.map(sector => (
                            <option key={sector} value={sector}>{sector}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Régions
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="">Toutes les régions</option>
                          {regions.map(region => (
                            <option key={region} value={region}>{region}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Taille d'entreprise
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="">Toutes tailles</option>
                          {companySizes.map(size => (
                            <option key={size} value={size}>{size} employés</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Objectifs
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="">Tous objectifs</option>
                          {objectives.map(obj => (
                            <option key={obj} value={obj}>{obj}</option>
                          ))}
                        </select>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>

            {/* Search Results */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {searchResults.length === 0 && !isLoading ? (
                <div className="col-span-full text-center py-12">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Aucun résultat trouvé
                  </h3>
                  <p className="text-gray-600">
                    Essayez de modifier vos critères de recherche
                  </p>
                </div>
              ) : (
                searchResults.map((profile, index) => (
                  <motion.div
                    key={profile.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card hover>
                      <div className="p-6">
                        <div className="flex items-start space-x-4 mb-4">
                          <img
                            src={profile.profile.avatar}
                            alt={profile.name}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">
                              {profile.profile.firstName} {profile.profile.lastName}
                            </h3>
                            <p className="text-sm text-gray-600">{profile.profile.position}</p>
                            <p className="text-sm text-gray-500">{profile.profile.company}</p>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {profile.profile.bio}
                        </p>
                        
                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Connecter
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* Connections Tab */}
        {activeTab === 'connections' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Mes Connexions ({connections.length})
            </h3>
            <p className="text-gray-600 mb-6">
              Gérez vos connexions professionnelles
            </p>
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Découvrir de nouveaux contacts
            </Button>
          </motion.div>
        )}

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pending Requests */}
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Demandes Reçues ({pendingRequests.length})
                  </h3>
                  
                  {pendingRequests.length === 0 ? (
                    <div className="text-center py-8">
                      <UserPlus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 text-sm">Aucune demande en attente</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pendingRequests.map(requestId => {
                        const profile = profiles.find(p => p.id === requestId);
                        if (!profile) return null;
                        
                        return (
                          <div key={requestId} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <img
                                src={profile.profile.avatar}
                                alt={profile.name}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                              <div>
                                <p className="font-medium text-gray-900">
                                  {profile.profile.firstName} {profile.profile.lastName}
                                </p>
                                <p className="text-sm text-gray-600">{profile.profile.company}</p>
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button 
                                size="sm"
                                onClick={() => acceptConnectionRequest(requestId)}
                              >
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Accepter
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => rejectConnectionRequest(requestId)}
                              >
                                <X className="h-3 w-3 mr-1" />
                                Refuser
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </Card>

              {/* Sent Requests */}
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Demandes Envoyées ({sentRequests.length})
                  </h3>
                  
                  {sentRequests.length === 0 ? (
                    <div className="text-center py-8">
                      <Send className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 text-sm">Aucune demande envoyée</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {sentRequests.map(requestId => {
                        const profile = profiles.find(p => p.id === requestId);
                        if (!profile) return null;
                        
                        return (
                          <div key={requestId} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <img
                                src={profile.profile.avatar}
                                alt={profile.name}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                              <div>
                                <p className="font-medium text-gray-900">
                                  {profile.profile.firstName} {profile.profile.lastName}
                                </p>
                                <p className="text-sm text-gray-600">{profile.profile.company}</p>
                              </div>
                            </div>
                            
                            <Badge variant="warning" size="sm">
                              <Clock className="h-3 w-3 mr-1" />
                              En attente
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </motion.div>
        )}
      </div>

      {/* Connection Request Modal */}
      <AnimatePresence>
        {showConnectionModal && selectedProfile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Demande de Connexion
              </h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message personnalisé (recommandé par l'IA)
                </label>
                <textarea
                  value={connectionMessage}
                  onChange={(e) => setConnectionMessage(e.target.value)}
                  placeholder="Bonjour, j'ai remarqué que nous partageons des intérêts communs dans le domaine de... J'aimerais échanger avec vous sur..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
                <p className="text-xs text-gray-500 mt-1">
                  💡 L'IA suggère de personnaliser votre message pour augmenter vos chances d'acceptation
                </p>
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowConnectionModal(false);
                    setSelectedProfile(null);
                    setConnectionMessage('');
                  }}
                >
                  Annuler
                </Button>
                <Button onClick={() => handleSendConnectionRequest(selectedProfile)}>
                  <Send className="h-4 w-4 mr-2" />
                  Envoyer
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};