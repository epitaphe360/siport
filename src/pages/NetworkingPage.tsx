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
  Settings,
  Handshake,
  Mail,
  Phone,
  Linkedin
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

interface NetworkingProfile {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  company: string;
  position: string;
  country: string;
  sector: string;
  avatar: string;
  type: 'exhibitor' | 'partner' | 'visitor';
  bio: string;
  interests: string[];
  objectives: string[];
  email: string;
  phone: string;
  linkedin?: string;
  matchScore: number;
  isOnline: boolean;
  lastSeen: Date;
  mutualConnections: number;
  isConnected: boolean;
  connectionRequested: boolean;
  isFavorite: boolean;
}

// Données de démonstration enrichies et réalistes
const demoProfiles: NetworkingProfile[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    firstName: 'Sarah',
    lastName: 'Johnson',
    company: 'Global Port Solutions',
    position: 'CEO & Founder',
    country: 'Pays-Bas',
    sector: 'Technologies Portuaires',
    avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200',
    type: 'exhibitor',
    bio: 'Experte en transformation digitale portuaire avec 15+ années d\'expérience. Spécialisée dans l\'optimisation des opérations portuaires et l\'implémentation de solutions IoT.',
    interests: ['Digital Transformation', 'IoT Solutions', 'Port Operations', 'Sustainability'],
    objectives: ['Trouver des partenaires technologiques', 'Expansion en Afrique', 'Présenter nos innovations'],
    email: 'sarah.johnson@globalports.com',
    phone: '+31 20 123 4567',
    linkedin: 'https://linkedin.com/in/sarahjohnson',
    matchScore: 95,
    isOnline: true,
    lastSeen: new Date(Date.now() - 300000), // 5 min ago
    mutualConnections: 3,
    isConnected: false,
    connectionRequested: false,
    isFavorite: false
  },
  {
    id: '2',
    name: 'Ahmed El Mansouri',
    firstName: 'Ahmed',
    lastName: 'El Mansouri',
    company: 'Autorité Portuaire de Casablanca',
    position: 'Directeur Technique',
    country: 'Maroc',
    sector: 'Autorité Portuaire',
    avatar: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=200',
    type: 'partner',
    bio: 'Directeur technique avec 20+ ans d\'expérience dans le développement d\'infrastructures portuaires. Expert en modernisation et durabilité des ports.',
    interests: ['Infrastructure Development', 'Sustainability', 'Port Modernization', 'Government Relations'],
    objectives: ['Partenariats d\'infrastructure', 'Adoption de technologies', 'Coopération internationale'],
    email: 'ahmed.mansouri@casaport.ma',
    phone: '+212 522 123 456',
    linkedin: 'https://linkedin.com/in/ahmedelmansouri',
    matchScore: 88,
    isOnline: true,
    lastSeen: new Date(Date.now() - 600000), // 10 min ago
    mutualConnections: 2,
    isConnected: true,
    connectionRequested: false,
    isFavorite: true
  },
  {
    id: '3',
    name: 'Dr. Maria Santos',
    firstName: 'Maria',
    lastName: 'Santos',
    company: 'Maritime University of Barcelona',
    position: 'Research Director',
    country: 'Espagne',
    sector: 'Recherche & Formation',
    avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=200',
    type: 'visitor',
    bio: 'Directrice de recherche spécialisée en innovation maritime et développement durable. 12 ans d\'expérience en recherche appliquée et partenariats industriels.',
    interests: ['Maritime Research', 'Innovation', 'Sustainability', 'Academic Partnerships'],
    objectives: ['Collaboration recherche', 'Partenariats industriels', 'Opportunités de financement'],
    email: 'maria.santos@maritimeuni.es',
    phone: '+34 93 123 4567',
    linkedin: 'https://linkedin.com/in/mariasantos',
    matchScore: 82,
    isOnline: false,
    lastSeen: new Date(Date.now() - 3600000), // 1 hour ago
    mutualConnections: 1,
    isConnected: false,
    connectionRequested: true,
    isFavorite: false
  },
  {
    id: '4',
    name: 'Jean-Pierre Dubois',
    firstName: 'Jean-Pierre',
    lastName: 'Dubois',
    company: 'Ocean Tech Solutions',
    position: 'Directeur Innovation',
    country: 'France',
    sector: 'Technologies Maritimes',
    avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200',
    type: 'exhibitor',
    bio: 'Spécialiste en solutions IoT pour l\'optimisation des opérations portuaires et la surveillance maritime en temps réel.',
    interests: ['IoT Maritime', 'Surveillance Portuaire', 'Automatisation', 'Big Data'],
    objectives: ['Démonstrations technologiques', 'Partenariats commerciaux', 'Expansion internationale'],
    email: 'jp.dubois@oceantech.fr',
    phone: '+33 1 23 45 67 89',
    linkedin: 'https://linkedin.com/in/jpdubois',
    matchScore: 79,
    isOnline: true,
    lastSeen: new Date(Date.now() - 180000), // 3 min ago
    mutualConnections: 0,
    isConnected: false,
    connectionRequested: false,
    isFavorite: false
  },
  {
    id: '5',
    name: 'Captain Mohamed Alami',
    firstName: 'Mohamed',
    lastName: 'Alami',
    company: 'Tanger Med Port Authority',
    position: 'Operations Manager',
    country: 'Maroc',
    sector: 'Opérations Portuaires',
    avatar: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=200',
    type: 'partner',
    bio: 'Gestionnaire d\'opérations portuaires avec expertise en logistique internationale et optimisation des flux de conteneurs.',
    interests: ['Port Operations', 'Logistics', 'Container Management', 'Efficiency'],
    objectives: ['Optimisation opérationnelle', 'Nouvelles technologies', 'Benchmarking'],
    email: 'm.alami@tangermed.ma',
    phone: '+212 539 123 456',
    matchScore: 76,
    isOnline: false,
    lastSeen: new Date(Date.now() - 7200000), // 2 hours ago
    mutualConnections: 1,
    isConnected: false,
    connectionRequested: false,
    isFavorite: true
  },
  {
    id: '6',
    name: 'Lisa Chen',
    firstName: 'Lisa',
    lastName: 'Chen',
    company: 'Singapore Port Technologies',
    position: 'Head of Digital Innovation',
    country: 'Singapour',
    sector: 'Innovation Digitale',
    avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=200',
    type: 'exhibitor',
    bio: 'Leader en innovation digitale portuaire, spécialisée dans l\'IA et l\'automatisation des ports intelligents.',
    interests: ['AI & Machine Learning', 'Smart Ports', 'Automation', 'Digital Twin'],
    objectives: ['Showcase IA solutions', 'Asian market expansion', 'Technology partnerships'],
    email: 'lisa.chen@sgporttech.com',
    phone: '+65 6123 4567',
    linkedin: 'https://linkedin.com/in/lisachen',
    matchScore: 91,
    isOnline: true,
    lastSeen: new Date(Date.now() - 120000), // 2 min ago
    mutualConnections: 2,
    isConnected: false,
    connectionRequested: false,
    isFavorite: false
  }
];

export const NetworkingPage: React.FC = () => {
  const [profiles, setProfiles] = useState<NetworkingProfile[]>(demoProfiles);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<NetworkingProfile | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [sortBy, setSortBy] = useState<'match' | 'online' | 'recent'>('match');

  // Statistiques du réseautage
  const networkingStats = {
    totalProfiles: profiles.length,
    onlineNow: profiles.filter(p => p.isOnline).length,
    myConnections: profiles.filter(p => p.isConnected).length,
    pendingRequests: profiles.filter(p => p.connectionRequested).length,
    favorites: profiles.filter(p => p.isFavorite).length,
    averageMatch: Math.round(profiles.reduce((sum, p) => sum + p.matchScore, 0) / profiles.length)
  };

  // Filtrage et tri des profils
  const filteredProfiles = profiles
    .filter(profile => {
      const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           profile.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           profile.bio.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSector = !selectedSector || profile.sector === selectedSector;
      const matchesCountry = !selectedCountry || profile.country === selectedCountry;
      const matchesType = !selectedType || profile.type === selectedType;
      
      return matchesSearch && matchesSector && matchesCountry && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'match':
          return b.matchScore - a.matchScore;
        case 'online':
          if (a.isOnline && !b.isOnline) return -1;
          if (!a.isOnline && b.isOnline) return 1;
          return b.matchScore - a.matchScore;
        case 'recent':
          return b.lastSeen.getTime() - a.lastSeen.getTime();
        default:
          return b.matchScore - a.matchScore;
      }
    });

  const sectors = [...new Set(profiles.map(p => p.sector))];
  const countries = [...new Set(profiles.map(p => p.country))];

  const handleConnect = (profileId: string) => {
    setProfiles(prev => prev.map(p => 
      p.id === profileId ? { ...p, connectionRequested: true } : p
    ));
    
    const profile = profiles.find(p => p.id === profileId);
    alert(`🤝 DEMANDE DE CONNEXION ENVOYÉE\n\n👤 Vers: ${profile?.name}\n🏢 ${profile?.company}\n📧 Notification envoyée\n\n⏱️ Réponse attendue sous 48h`);
  };

  const handleFavorite = (profileId: string) => {
    setProfiles(prev => prev.map(p => 
      p.id === profileId ? { ...p, isFavorite: !p.isFavorite } : p
    ));
  };

  const handleSendMessage = () => {
    if (!selectedProfile || !contactMessage.trim()) return;
    
    alert(`📧 MESSAGE ENVOYÉ\n\n👤 À: ${selectedProfile.name}\n🏢 ${selectedProfile.company}\n💬 Message: "${contactMessage}"\n\n✅ Votre message a été envoyé avec succès !`);
    
    setShowContactModal(false);
    setSelectedProfile(null);
    setContactMessage('');
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

  const getProfileTypeColor = (type: string) => {
    switch (type) {
      case 'exhibitor': return 'bg-blue-100 text-blue-800';
      case 'partner': return 'bg-purple-100 text-purple-800';
      case 'visitor': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  const formatLastSeen = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    
    if (diffMins < 5) return 'À l\'instant';
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    return 'Hors ligne';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec explication claire */}
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
                Réseautage Intelligent SIPORTS
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
              Connectez-vous avec les professionnels les plus pertinents grâce à notre système de matching intelligent. 
              Plus votre score de compatibilité est élevé, plus vous avez de chances de créer des partenariats fructueux.
            </p>
            
            {/* Explication du système */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-4xl mx-auto">
              <h3 className="font-semibold text-blue-900 mb-2">Comment ça marche ?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4" />
                  <span>L'IA analyse vos objectifs et secteurs d'intérêt</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4" />
                  <span>Calcule un score de compatibilité (0-100%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Handshake className="h-4 w-4" />
                  <span>Vous recommande les meilleurs contacts</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Statistiques du réseautage */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {networkingStats.totalProfiles}
              </div>
              <div className="text-xs text-gray-600">Profils Disponibles</div>
            </Card>
            
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-green-600 mb-1 flex items-center justify-center">
                {networkingStats.onlineNow}
                <div className="w-2 h-2 bg-green-500 rounded-full ml-1 animate-pulse" />
              </div>
              <div className="text-xs text-gray-600">En Ligne Maintenant</div>
            </Card>
            
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {networkingStats.myConnections}
              </div>
              <div className="text-xs text-gray-600">Mes Connexions</div>
            </Card>
            
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {networkingStats.pendingRequests}
              </div>
              <div className="text-xs text-gray-600">Demandes Envoyées</div>
            </Card>
            
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-red-600 mb-1">
                {networkingStats.favorites}
              </div>
              <div className="text-xs text-gray-600">Favoris</div>
            </Card>
            
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-indigo-600 mb-1">
                {networkingStats.averageMatch}%
              </div>
              <div className="text-xs text-gray-600">Match Moyen</div>
            </Card>
          </div>

          {/* Filtres et recherche */}
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par nom, entreprise ou expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="match">Meilleur match</option>
                <option value="online">En ligne d'abord</option>
                <option value="recent">Activité récente</option>
              </select>
              
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtres
              </Button>
            </div>
          </div>

          {/* Filtres avancés */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 p-4 bg-gray-50 rounded-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secteur
                  </label>
                  <select
                    value={selectedSector}
                    onChange={(e) => setSelectedSector(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Tous les secteurs</option>
                    {sectors.map(sector => (
                      <option key={sector} value={sector}>{sector}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pays
                  </label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Tous les pays</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de profil
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Tous les types</option>
                    <option value="exhibitor">Exposants</option>
                    <option value="partner">Partenaires</option>
                    <option value="visitor">Visiteurs</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Résultats */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              Professionnels Recommandés ({filteredProfiles.length})
            </h2>
            
            {(searchTerm || selectedSector || selectedCountry || selectedType) && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSector('');
                  setSelectedCountry('');
                  setSelectedType('');
                }}
              >
                Réinitialiser les filtres
              </Button>
            )}
          </div>
          
          <p className="text-gray-600 text-sm mt-1">
            Triés par {sortBy === 'match' ? 'score de compatibilité' : sortBy === 'online' ? 'statut en ligne' : 'activité récente'}
          </p>
        </div>

        {/* Grille des profils */}
        {filteredProfiles.length === 0 ? (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun profil trouvé
            </h3>
            <p className="text-gray-600 mb-4">
              Essayez de modifier vos critères de recherche
            </p>
            <Button onClick={() => {
              setSearchTerm('');
              setSelectedSector('');
              setSelectedCountry('');
              setSelectedType('');
            }}>
              Voir tous les profils
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile, index) => {
              const ProfileIcon = getProfileTypeIcon(profile.type);
              
              return (
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card hover className="relative h-full">
                    {/* Score de compatibilité */}
                    <div className="absolute top-4 right-4">
                      <div className={`px-3 py-1 rounded-full text-sm font-bold ${getMatchScoreColor(profile.matchScore)}`}>
                        {profile.matchScore}% match
                      </div>
                    </div>

                    {/* Bouton favori */}
                    <button
                      onClick={() => handleFavorite(profile.id)}
                      className="absolute top-4 left-4 p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Heart className={`h-4 w-4 ${profile.isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                    </button>

                    {/* Statut en ligne */}
                    {profile.isOnline && (
                      <div className="absolute top-16 left-4 flex items-center space-x-1 bg-green-100 px-2 py-1 rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs text-green-800 font-medium">En ligne</span>
                      </div>
                    )}

                    <div className="p-6 pt-12">
                      {/* En-tête du profil */}
                      <div className="flex items-start space-x-4 mb-4">
                        <img
                          src={profile.avatar}
                          alt={profile.name}
                          className="h-16 w-16 rounded-full object-cover border-2 border-gray-200"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-lg mb-1">
                            {profile.firstName} {profile.lastName}
                          </h3>
                          <p className="text-sm text-gray-600 mb-1">{profile.position}</p>
                          <div className="flex items-center space-x-2 mb-2">
                            <Building2 className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{profile.company}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{profile.country}</span>
                          </div>
                        </div>
                      </div>

                      {/* Type de profil */}
                      <div className="flex items-center space-x-2 mb-4">
                        <ProfileIcon className="h-4 w-4 text-blue-600" />
                        <Badge className={getProfileTypeColor(profile.type)} size="sm">
                          {getProfileTypeLabel(profile.type)}
                        </Badge>
                        <Badge variant="default" size="sm">
                          {profile.sector}
                        </Badge>
                      </div>

                      {/* Bio */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {profile.bio}
                      </p>

                      {/* Intérêts communs */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          Expertises :
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {profile.interests.slice(0, 3).map((interest, idx) => (
                            <Badge key={idx} variant="info" size="sm">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Connexions mutuelles */}
                      {profile.mutualConnections > 0 && (
                        <div className="mb-4 text-sm text-gray-600 flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {profile.mutualConnections} connexion{profile.mutualConnections > 1 ? 's' : ''} mutuelle{profile.mutualConnections > 1 ? 's' : ''}
                        </div>
                      )}

                      {/* Dernière activité */}
                      <div className="mb-4 text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {profile.isOnline ? 'En ligne maintenant' : formatLastSeen(profile.lastSeen)}
                      </div>

                      {/* Actions */}
                      <div className="space-y-2">
                        {profile.isConnected ? (
                          <Button size="sm" variant="outline" className="w-full" disabled>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Déjà connecté
                          </Button>
                        ) : profile.connectionRequested ? (
                          <Button size="sm" variant="outline" className="w-full" disabled>
                            <Clock className="h-4 w-4 mr-2" />
                            Demande envoyée
                          </Button>
                        ) : (
                          <Button 
                            size="sm" 
                            className="w-full"
                            onClick={() => handleConnect(profile.id)}
                          >
                            <UserPlus className="h-4 w-4 mr-2" />
                            Se connecter
                          </Button>
                        )}
                        
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => {
                              setSelectedProfile(profile);
                              setShowContactModal(true);
                            }}
                          >
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => {
                              alert(`📅 DEMANDE DE RENDEZ-VOUS\n\n👤 Avec: ${profile.name}\n🏢 ${profile.company}\n📍 ${profile.country}\n\n⏰ Créneaux disponibles proposés !`);
                            }}
                          >
                            <Calendar className="h-4 w-4 mr-1" />
                            RDV
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              alert(`👁️ PROFIL DÉTAILLÉ\n\n👤 ${profile.name}\n🏢 ${profile.company}\n📧 ${profile.email}\n📞 ${profile.phone}\n🌐 ${profile.linkedin || 'Non renseigné'}\n\n📋 Profil complet affiché !`);
                            }}
                            title="Voir le profil complet"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Conseils IA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Brain className="h-5 w-5 mr-2 text-purple-600" />
                Conseils IA pour Optimiser votre Réseautage
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-900 mb-2">
                    💡 Optimisation du Profil
                  </h4>
                  <p className="text-sm text-purple-700">
                    Complétez votre bio avec plus de mots-clés sectoriels pour améliorer vos scores de compatibilité
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-900 mb-2">
                    🎯 Stratégie de Contact
                  </h4>
                  <p className="text-sm text-purple-700">
                    Les profils avec un score &gt;85% ont 3x plus de chances de répondre positivement
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Modal de contact */}
      <AnimatePresence>
        {showContactModal && selectedProfile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Envoyer un message à {selectedProfile.firstName}
              </h3>
              
              <div className="mb-4">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={selectedProfile.avatar}
                    alt={selectedProfile.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{selectedProfile.name}</p>
                    <p className="text-sm text-gray-600">{selectedProfile.company}</p>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getProfileTypeColor(selectedProfile.type)}`}>
                      <ProfileIcon className="h-3 w-3 mr-1" />
                      {getProfileTypeLabel(selectedProfile.type)}
                    </div>
                  </div>
                </div>
                
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Votre message
                </label>
                <textarea
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder={`Bonjour ${selectedProfile.firstName},\n\nJ'ai remarqué que nous partageons des intérêts communs dans le domaine de ${selectedProfile.sector}. J'aimerais échanger avec vous sur...`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={5}
                />
                <p className="text-xs text-gray-500 mt-1">
                  💡 Conseil IA: Personnalisez votre message en mentionnant vos intérêts communs
                </p>
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowContactModal(false);
                    setSelectedProfile(null);
                    setContactMessage('');
                  }}
                >
                  Annuler
                </Button>
                <Button 
                  onClick={handleSendMessage}
                  disabled={!contactMessage.trim()}
                >
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