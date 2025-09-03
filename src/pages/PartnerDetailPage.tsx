import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft,
  ExternalLink,
  MapPin,
  Users,
  Calendar,
  MessageCircle,
  Download,
  Share2,
  Star,
  Award,
  Clock,
  Phone,
  Mail,
  Globe,
  Building2,
  Eye,
  Heart,
  Crown,
  Handshake,
  TrendingUp,
  Target,
  BarChart3,
  Zap,
  Shield,
  CheckCircle,
  DollarSign,
  Briefcase,
  Network
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { motion } from 'framer-motion';

interface Partner {
  id: string;
  name: string;
  type: 'platinum' | 'gold' | 'silver' | 'bronze' | 'institutional';
  category: string;
  description: string;
  logo: string;
  website?: string;
  country: string;
  sector: string;
  verified: boolean;
  featured: boolean;
  sponsorshipLevel: string;
  contributions: string[];
  establishedYear: number;
  employees: string;
  partnershipDetails: {
    startDate: string;
    duration: string;
    investmentAmount: string;
    roi: string;
    objectives: string[];
    benefits: string[];
    kpis: {
      visibility: number;
      leads: number;
      networking: number;
      satisfaction: number;
    };
  };
  projects: Array<{
    id: string;
    title: string;
    description: string;
    status: 'completed' | 'ongoing' | 'planned';
    impact: string;
    image: string;
  }>;
  testimonials: Array<{
    name: string;
    position: string;
    company: string;
    comment: string;
    avatar: string;
    rating: number;
  }>;
  mediaKit: {
    logos: string[];
    photos: string[];
    videos: string[];
    pressReleases: string[];
  };
}

const mockPartnerData: Partner = {
  id: '2',
  name: 'Autorité Portuaire de Casablanca',
  type: 'platinum',
  category: 'Partenaire Platine',
  description: 'Premier port du Maroc et partenaire stratégique majeur, leader dans la modernisation portuaire africaine et promoteur du développement durable.',
  logo: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=200',
  website: 'https://www.portcasablanca.ma',
  country: 'Maroc',
  sector: 'Autorité Portuaire',
  verified: true,
  featured: true,
  sponsorshipLevel: 'Platine',
  contributions: ['Financement principal', 'Expertise technique', 'Réseau international'],
  establishedYear: 1907,
  employees: '2500+',
  partnershipDetails: {
    startDate: '2024-01-15',
    duration: '3 ans',
    investmentAmount: '2.5M€',
    roi: '285%',
    objectives: [
      'Promouvoir l\'innovation portuaire africaine',
      'Développer les partenariats internationaux',
      'Moderniser les infrastructures portuaires',
      'Former les talents du secteur'
    ],
    benefits: [
      'Visibilité internationale premium',
      'Accès networking VIP exclusif',
      'Participation aux décisions stratégiques',
      'Branding sur tous les supports',
      'Conférences dédiées',
      'Espace d\'exposition privilégié'
    ],
    kpis: {
      visibility: 95,
      leads: 89,
      networking: 92,
      satisfaction: 98
    }
  },
  projects: [
    {
      id: '1',
      title: 'Modernisation Terminal Conteneurs',
      description: 'Projet de digitalisation complète du terminal conteneurs avec implémentation d\'IA et automatisation des grues.',
      status: 'ongoing',
      impact: 'Augmentation de 40% de la productivité',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      title: 'Hub Logistique Durable',
      description: 'Développement d\'un hub logistique éco-responsable avec énergies renouvelables et technologies vertes.',
      status: 'completed',
      impact: 'Réduction de 60% des émissions CO2',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      title: 'Centre de Formation Maritime',
      description: 'Création d\'un centre de formation de pointe pour les métiers portuaires et maritimes.',
      status: 'planned',
      impact: 'Formation de 500+ professionnels/an',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ],
  testimonials: [
    {
      name: 'Dr. Ahmed El Mansouri',
      position: 'Directeur Général',
      company: 'Autorité Portuaire de Casablanca',
      comment: 'Notre partenariat avec SIPORTS a permis de positionner le Maroc comme leader de l\'innovation portuaire en Afrique.',
      avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5
    },
    {
      name: 'Sarah Johnson',
      position: 'Directrice Innovation',
      company: 'Global Port Solutions',
      comment: 'Un partenaire exceptionnel qui comprend les enjeux de la transformation digitale portuaire.',
      avatar: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5
    }
  ],
  mediaKit: {
    logos: [
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200',
      'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=200'
    ],
    photos: [
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    videos: ['https://example.com/video1', 'https://example.com/video2'],
    pressReleases: ['Communiqué partenariat SIPORTS 2026', 'Annonce modernisation port']
  }
};

export const PartnerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'partnership' | 'media' | 'contact'>('overview');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);

  const partner = mockPartnerData; // En réalité, vous récupéreriez selon l'ID

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'institutional': return Crown;
      case 'platinum': return Award;
      case 'gold': return Star;
      case 'silver': return Building2;
      case 'bronze': return Handshake;
      default: return Building2;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'institutional': return 'from-purple-600 to-purple-800';
      case 'platinum': return 'from-gray-600 to-gray-800';
      case 'gold': return 'from-yellow-500 to-yellow-700';
      case 'silver': return 'from-gray-400 to-gray-600';
      case 'bronze': return 'from-orange-500 to-orange-700';
      default: return 'from-blue-600 to-blue-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'ongoing': return 'warning';
      case 'planned': return 'info';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Terminé';
      case 'ongoing': return 'En cours';
      case 'planned': return 'Planifié';
      default: return status;
    }
  };

  const TypeIcon = getTypeIcon(partner.type);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Sticky */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Bouton de retour */}
            <Link to="/partners">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour aux partenaires
              </Button>
            </Link>
            
            <div className="flex items-center space-x-3">
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-10 w-10 rounded-lg object-cover"
              />
              <div>
                <span className="font-bold text-gray-900">{partner.name}</span>
                <div className="flex items-center space-x-2">
                  <TypeIcon className="h-4 w-4 text-purple-600" />
                  <span className="text-sm text-gray-600">{partner.sponsorshipLevel}</span>
                </div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#accueil" className="text-gray-700 hover:text-purple-600 transition-colors">Accueil</a>
              <a href="#partenariat" className="text-gray-700 hover:text-purple-600 transition-colors">Partenariat</a>
              <a href="#projets" className="text-gray-700 hover:text-purple-600 transition-colors">Projets</a>
              <a href="#impact" className="text-gray-700 hover:text-purple-600 transition-colors">Impact</a>
              <a href="#contact" className="text-gray-700 hover:text-purple-600 transition-colors">Contact</a>
            </div>

            <div className="flex items-center space-x-3">
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact VIP
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section Partenaire */}
      <section id="accueil" className={`relative h-96 bg-gradient-to-r ${getTypeColor(partner.type)}`}>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white max-w-3xl"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-lg">
                <TypeIcon className="h-12 w-12 text-white" />
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-2">
                  {partner.name}
                </h1>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-white text-purple-800" size="sm">
                    {partner.sponsorshipLevel}
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800" size="sm">
                    <Crown className="h-3 w-3 mr-1" />
                    Partenaire Officiel
                  </Badge>
                </div>
              </div>
            </div>
            
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              {partner.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                <Handshake className="h-4 w-4 mr-2" />
                Découvrir le Partenariat
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600">
                <Download className="h-4 w-4 mr-2" />
                Kit Média Partenaire
              </Button>
            </div>
            
            {/* Stats Partenariat */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-white mb-1">
                  {partner.partnershipDetails.roi}
                </div>
                <div className="text-white text-sm opacity-90">ROI Partenariat</div>
              </div>
              <div className="text-center bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-white mb-1">
                  {partner.partnershipDetails.kpis.leads}
                </div>
                <div className="text-white text-sm opacity-90">Leads Générés</div>
              </div>
              <div className="text-center bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-white mb-1">
                  {partner.establishedYear}
                </div>
                <div className="text-white text-sm opacity-90">Fondé en</div>
              </div>
              <div className="text-center bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-white mb-1">
                  {partner.employees}
                </div>
                <div className="text-white text-sm opacity-90">Employés</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Détails du Partenariat */}
      <section id="partenariat" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Détails du Partenariat SIPORTS 2026
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Découvrez l'impact et les bénéfices de notre partenariat stratégique
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Informations Partenariat */}
            <Card>
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Briefcase className="h-6 w-6 text-purple-600 mr-3" />
                  Informations du Partenariat
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Date de début :</span>
                    <span className="font-semibold text-gray-900">
                      {new Date(partner.partnershipDetails.startDate).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Durée :</span>
                    <span className="font-semibold text-gray-900">{partner.partnershipDetails.duration}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Investissement :</span>
                    <span className="font-semibold text-green-600">{partner.partnershipDetails.investmentAmount}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">ROI Actuel :</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-green-600 text-lg">{partner.partnershipDetails.roi}</span>
                      <Badge variant="success" size="sm">Excellent</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* KPIs Performance */}
            <Card>
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <BarChart3 className="h-6 w-6 text-purple-600 mr-3" />
                  Performance KPIs
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Visibilité</span>
                      <span className="text-sm font-semibold text-gray-900">{partner.partnershipDetails.kpis.visibility}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${partner.partnershipDetails.kpis.visibility}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Génération de Leads</span>
                      <span className="text-sm font-semibold text-gray-900">{partner.partnershipDetails.kpis.leads}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${partner.partnershipDetails.kpis.leads}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Networking</span>
                      <span className="text-sm font-semibold text-gray-900">{partner.partnershipDetails.kpis.networking}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${partner.partnershipDetails.kpis.networking}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Satisfaction</span>
                      <span className="text-sm font-semibold text-gray-900">{partner.partnershipDetails.kpis.satisfaction}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${partner.partnershipDetails.kpis.satisfaction}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Objectifs et Bénéfices */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Objectifs */}
            <Card>
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Target className="h-6 w-6 text-purple-600 mr-3" />
                  Objectifs du Partenariat
                </h3>
                
                <div className="space-y-4">
                  {partner.partnershipDetails.objectives.map((objective, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="text-gray-700">{objective}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Bénéfices */}
            <Card>
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Award className="h-6 w-6 text-purple-600 mr-3" />
                  Bénéfices Partenaire
                </h3>
                
                <div className="space-y-4">
                  {partner.partnershipDetails.benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <Star className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Projets et Réalisations */}
      <section id="projets" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Projets & Réalisations
            </h2>
            <p className="text-lg text-gray-600">
              Découvrez les projets innovants soutenus par notre partenariat
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partner.projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge 
                        variant={getStatusColor(project.status) as any}
                        size="sm"
                      >
                        {getStatusLabel(project.status)}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600">Impact positif</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      {project.description}
                    </p>
                    
                    <div className="bg-green-50 p-3 rounded-lg mb-4">
                      <p className="text-sm font-medium text-green-800">
                        📈 Impact : {project.impact}
                      </p>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                        setSelectedProject(project);
                        setShowProjectModal(true);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Voir les détails
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact et Témoignages */}
      <section id="impact" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Impact & Témoignages
            </h2>
            <p className="text-lg text-gray-600">
              L'impact de notre partenariat sur l'écosystème portuaire
            </p>
          </motion.div>

          {/* Métriques d'Impact */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center p-6">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <Eye className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">2.5M</div>
              <div className="text-gray-600">Impressions Médias</div>
            </Card>

            <Card className="text-center p-6">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <Network className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">450</div>
              <div className="text-gray-600">Connexions VIP</div>
            </Card>

            <Card className="text-center p-6">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">12</div>
              <div className="text-gray-600">Événements Sponsorisés</div>
            </Card>

            <Card className="text-center p-6">
              <div className="bg-yellow-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction</div>
            </Card>
          </div>

          {/* Témoignages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partner.testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.position}</p>
                        <p className="text-sm text-gray-500">{testimonial.company}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    
                    <p className="text-gray-700 italic">
                      "{testimonial.comment}"
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Contact Partenaire
            </h2>
            <p className="text-lg text-gray-600">
              Échangez directement avec notre équipe partenariat
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <Card>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Informations de Contact
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-purple-600" />
                    <span className="text-gray-700">Port de Casablanca, Maroc</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-purple-600" />
                    <span className="text-gray-700">+212 522 123 456</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-purple-600" />
                    <span className="text-gray-700">partenariat@portcasablanca.ma</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-purple-600" />
                    <a href={partner.website} className="text-purple-600 hover:text-purple-700">
                      {partner.website}
                    </a>
                  </div>
                </div>

                {/* Contact Partenariat */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">Responsable Partenariat</h4>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="h-10 w-10 bg-purple-600 rounded-full flex items-center justify-center">
                        <Crown className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Marie Dubois</p>
                        <p className="text-sm text-gray-600">Directrice Partenariats</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">marie.dubois@portcasablanca.ma</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">+212 522 123 457</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Contact Form */}
            <Card>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Contactez notre Partenaire
                </h3>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Votre nom"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type de demande
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option value="">Sélectionnez un type</option>
                      <option value="partnership">Nouveau partenariat</option>
                      <option value="collaboration">Collaboration projet</option>
                      <option value="investment">Opportunité d'investissement</option>
                      <option value="information">Demande d'information</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Décrivez votre projet ou demande..."
                    />
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Envoyer la demande
                    </Button>
                    <Button variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Planifier RDV
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Rejoignez notre Écosystème de Partenaires
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Développez votre activité avec le plus grand réseau portuaire international
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                <Handshake className="h-5 w-5 mr-2" />
                Devenir Partenaire
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600">
                <Download className="h-5 w-5 mr-2" />
                Kit Partenariat
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Partner Info */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-10 w-10 rounded-lg"
                />
                <span className="font-bold text-xl">{partner.name}</span>
              </div>
              <p className="text-gray-400 mb-4">
                {partner.description}
              </p>
              <div className="flex items-center space-x-2">
                <Badge className="bg-purple-100 text-purple-800" size="sm">
                  <Crown className="h-3 w-3 mr-1" />
                  {partner.sponsorshipLevel}
                </Badge>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Liens rapides</h4>
              <ul className="space-y-2">
                <li><a href="#partenariat" className="text-gray-400 hover:text-white transition-colors">Partenariat</a></li>
                <li><a href="#projets" className="text-gray-400 hover:text-white transition-colors">Projets</a></li>
                <li><a href="#impact" className="text-gray-400 hover:text-white transition-colors">Impact</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* SIPORTS Info */}
            <div>
              <h4 className="font-semibold text-white mb-4">SIPORTS 2026</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>5-7 Février 2026</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>El Jadida, Maroc</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Crown className="h-4 w-4" />
                  <span>Partenaire {partner.sponsorshipLevel}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 {partner.name}. Tous droits réservés.
            </p>
            <p className="text-sm text-gray-500 mt-4 md:mt-0">
              Partenaire Officiel SIPORTS 2026
            </p>
          </div>
        </div>
      </footer>

      {/* Modal Détails Projet */}
      {showProjectModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header Modal */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">{selectedProject.title}</h3>
                  <p className="text-purple-100 mt-1">Projet Partenaire SIPORTS</p>
                </div>
                <button
                  onClick={() => {
                    setShowProjectModal(false);
                    setSelectedProject(null);
                  }}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="mt-4">
                <Badge 
                  variant={getStatusColor(selectedProject.status) as any}
                  className="bg-white text-purple-800"
                >
                  {getStatusLabel(selectedProject.status)}
                </Badge>
              </div>
            </div>

            {/* Contenu Modal */}
            <div className="p-8">
              {/* Image Projet */}
              <div className="mb-8">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                />
              </div>

              {/* Description Détaillée */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Description du Projet
                </h4>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {selectedProject.description}
                </p>
                
                {/* Impact Détaillé */}
                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                  <h5 className="font-semibold text-green-900 mb-3 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Impact Mesuré
                  </h5>
                  <p className="text-green-800 font-medium text-lg">
                    📈 {selectedProject.impact}
                  </p>
                </div>
              </div>

              {/* Détails Techniques */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-4">
                    Informations Projet
                  </h5>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Statut :</span>
                      <Badge variant={getStatusColor(selectedProject.status) as any} size="sm">
                        {getStatusLabel(selectedProject.status)}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Durée :</span>
                      <span className="font-medium">
                        {selectedProject.status === 'completed' ? '24 mois' : 
                         selectedProject.status === 'ongoing' ? '18 mois (en cours)' : '36 mois (planifié)'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Budget :</span>
                      <span className="font-medium text-green-600">
                        {selectedProject.status === 'completed' ? '15M€' : 
                         selectedProject.status === 'ongoing' ? '25M€' : '45M€'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Équipe :</span>
                      <span className="font-medium">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-4">
                    Technologies Utilisées
                  </h5>
                  <div className="space-y-2">
                    {selectedProject.id === '1' && [
                      'Intelligence Artificielle',
                      'IoT Maritime',
                      'Automatisation des grues',
                      'Analytics temps réel',
                      'Blockchain logistique'
                    ].map((tech, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-sm text-gray-700">{tech}</span>
                      </div>
                    ))}
                    
                    {selectedProject.id === '2' && [
                      'Énergies renouvelables',
                      'Panneaux solaires',
                      'Éoliennes offshore',
                      'Stockage d\'énergie',
                      'Smart Grid portuaire'
                    ].map((tech, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-sm text-gray-700">{tech}</span>
                      </div>
                    ))}
                    
                    {selectedProject.id === '3' && [
                      'Simulateurs avancés',
                      'Réalité virtuelle',
                      'E-learning maritime',
                      'Certification digitale',
                      'Plateforme collaborative'
                    ].map((tech, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                        <span className="text-sm text-gray-700">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
                        {selectedProject.status === 'completed' ? '45 experts' : 
              {/* Chronologie du Projet */}
              <div className="mb-8">
                <h5 className="font-semibold text-gray-900 mb-4">
                  Chronologie du Projet
                </h5>
                <div className="space-y-4">
                  {selectedProject.status === 'completed' && [
                    { phase: 'Phase 1 - Étude', date: 'Jan 2022', status: 'completed' },
                    { phase: 'Phase 2 - Développement', date: 'Jun 2022', status: 'completed' },
                    { phase: 'Phase 3 - Tests', date: 'Jan 2023', status: 'completed' },
                    { phase: 'Phase 4 - Déploiement', date: 'Jun 2023', status: 'completed' },
                    { phase: 'Phase 5 - Optimisation', date: 'Dec 2023', status: 'completed' }
                  ].map((phase, idx) => (
                    <div key={idx} className="flex items-center space-x-4">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{phase.phase}</p>
                        <p className="text-sm text-gray-600">{phase.date}</p>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  ))}
                  
                  {selectedProject.status === 'ongoing' && [
                    { phase: 'Phase 1 - Planification', date: 'Mar 2023', status: 'completed' },
                    { phase: 'Phase 2 - Infrastructure', date: 'Sep 2023', status: 'completed' },
                    { phase: 'Phase 3 - Équipements', date: 'Mar 2024', status: 'ongoing' },
                    { phase: 'Phase 4 - Tests', date: 'Sep 2024', status: 'pending' },
                    { phase: 'Phase 5 - Mise en service', date: 'Mar 2025', status: 'pending' }
                  ].map((phase, idx) => (
                    <div key={idx} className="flex items-center space-x-4">
                      <div className={`w-4 h-4 rounded-full flex-shrink-0 ${
                        phase.status === 'completed' ? 'bg-green-500' :
                        phase.status === 'ongoing' ? 'bg-yellow-500' : 'bg-gray-300'
                      }`}></div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{phase.phase}</p>
                        <p className="text-sm text-gray-600">{phase.date}</p>
                      </div>
                      {phase.status === 'completed' && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {phase.status === 'ongoing' && <Clock className="h-5 w-5 text-yellow-500" />}
                    </div>
                  ))}
                  
                  {selectedProject.status === 'planned' && [
                    { phase: 'Phase 1 - Études préliminaires', date: 'Jun 2024', status: 'pending' },
                    { phase: 'Phase 2 - Financement', date: 'Dec 2024', status: 'pending' },
                    { phase: 'Phase 3 - Construction', date: 'Jun 2025', status: 'pending' },
                    { phase: 'Phase 4 - Formation', date: 'Dec 2025', status: 'pending' },
                    { phase: 'Phase 5 - Inauguration', date: 'Jun 2026', status: 'pending' }
                  ].map((phase, idx) => (
                    <div key={idx} className="flex items-center space-x-4">
                      <div className="w-4 h-4 bg-gray-300 rounded-full flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{phase.phase}</p>
                        <p className="text-sm text-gray-600">{phase.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
                         selectedProject.status === 'ongoing' ? '67 experts' : '85 experts'}
              {/* Partenaires du Projet */}
              <div className="mb-8">
                <h5 className="font-semibold text-gray-900 mb-4">
                  Partenaires du Projet
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: 'Autorité Portuaire Casablanca', role: 'Maître d\'ouvrage', logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100' },
                    { name: 'TechMarine Solutions', role: 'Intégrateur technique', logo: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100' },
                    { name: 'Green Port Initiative', role: 'Consultant durabilité', logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100' }
                  ].map((partner, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="h-8 w-8 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{partner.name}</p>
                          <p className="text-xs text-gray-600">{partner.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
                      </span>
              {/* Métriques Détaillées */}
              <div className="mb-8">
                <h5 className="font-semibold text-gray-900 mb-4">
                  Métriques & KPIs
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {selectedProject.status === 'completed' ? '100%' : 
                       selectedProject.status === 'ongoing' ? '65%' : '15%'}
                    </div>
                    <div className="text-sm text-blue-700">Avancement</div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {selectedProject.status === 'completed' ? '98%' : 
                       selectedProject.status === 'ongoing' ? '92%' : '95%'}
                    </div>
                    <div className="text-sm text-green-700">Satisfaction</div>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      {selectedProject.status === 'completed' ? '285%' : 
                       selectedProject.status === 'ongoing' ? '220%' : '350%'}
                    </div>
                    <div className="text-sm text-purple-700">ROI Prévu</div>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-1">
                      {selectedProject.status === 'completed' ? '2.5M€' : 
                       selectedProject.status === 'ongoing' ? '1.8M€' : '3.2M€'}
                    </div>
                    <div className="text-sm text-orange-700">Valeur Générée</div>
                  </div>
                </div>
              </div>
                    </div>
              {/* Galerie Photos */}
              <div className="mb-8">
                <h5 className="font-semibold text-gray-900 mb-4">
                  Galerie du Projet
                </h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300',
                    'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300',
                    'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300',
                    'https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=300'
                  ].map((image, idx) => (
                    <div key={idx} className="aspect-square overflow-hidden rounded-lg cursor-pointer hover:scale-105 transition-transform">
                      <img
                        src={image}
                        alt={`Projet ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
                  </div>
              {/* Documents & Ressources */}
              <div className="mb-8">
                <h5 className="font-semibold text-gray-900 mb-4">
                  Documents & Ressources
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'Rapport technique complet', type: 'PDF', size: '2.4 MB', icon: FileText },
                    { name: 'Présentation exécutive', type: 'PDF', size: '1.8 MB', icon: FileText },
                    { name: 'Vidéo de démonstration', type: 'MP4', size: '45 MB', icon: Video },
                    { name: 'Étude d\'impact', type: 'PDF', size: '3.1 MB', icon: FileText }
                  ].map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <doc.icon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{doc.name}</p>
                          <p className="text-xs text-gray-600">{doc.type} • {doc.size}</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          alert(`📄 TÉLÉCHARGEMENT\n\n📋 Document: ${doc.name}\n📁 Format: ${doc.type}\n💾 Taille: ${doc.size}\n\n⬇️ Téléchargement démarré !`);
                        }}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Télécharger
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
                </div>
              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                  onClick={() => {
                    const contactData = {
                      project: selectedProject.title,
                      contact: 'Marie Dubois',
                      email: 'marie.dubois@portcasablanca.ma',
                      phone: '+212 522 123 457'
                    };
                    
                    alert(`📞 CONTACT PROJET\n\n🏗️ Projet: ${contactData.project}\n👤 Responsable: ${contactData.contact}\n📧 Email: ${contactData.email}\n📱 Tél: ${contactData.phone}\n\n💬 Messagerie directe ouverte !`);
                  }}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contacter l'Équipe Projet
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => {
                    const shareData = {
                      title: `Projet SIPORTS: ${selectedProject.title}`,
                      text: selectedProject.description,
                      url: window.location.href + '#project-' + selectedProject.id
                    };
                    
                    if (navigator.share) {
                      navigator.share(shareData);
                    } else {
                      navigator.clipboard.writeText(shareData.url);
                      alert('🔗 Lien du projet copié !');
                    }
                  }}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Partager le Projet
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => {
                    const reportData = {
                      project: selectedProject.title,
                      pages: 24,
                      format: 'PDF Haute Qualité',
                      size: '4.2 MB'
                    };
                    
                    // Simulation téléchargement rapport
                    const link = document.createElement('a');
                    link.href = 'data:application/pdf;base64,JVBERi0xLjQKJdPr6eEK';
                    link.download = `rapport-${selectedProject.title.toLowerCase().replace(/\s+/g, '-')}.pdf`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    alert(`📊 RAPPORT DÉTAILLÉ\n\n🏗️ ${reportData.project}\n📄 ${reportData.pages} pages\n📁 ${reportData.format}\n💾 ${reportData.size}\n\n⬇️ Téléchargement démarré !`);
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Rapport Complet
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="flex flex-col space-y-3">
          <Button 
            className="rounded-full w-12 h-12 shadow-lg bg-purple-600 hover:bg-purple-700"
            onClick={() => {
              alert(`💌 CONTACT PARTENAIRE VIP\n\n🏢 ${partner.name}\n👑 Statut: ${partner.sponsorshipLevel}\n📧 Messagerie VIP ouverte\n\n✅ Réponse prioritaire garantie !`);
            }}
            title="Contact VIP direct"
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            className="rounded-full w-12 h-12 shadow-lg bg-white"
            onClick={() => {
              alert(`📅 RENDEZ-VOUS PARTENAIRE\n\n🏢 ${partner.name}\n⏰ Créneaux VIP disponibles\n📍 Espace partenaire dédié\n\n🎯 Planification prioritaire !`);
            }}
            title="Planifier un rendez-vous VIP"
          >
            <Calendar className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            className="rounded-full w-12 h-12 shadow-lg bg-white"
            onClick={() => {
              const mediaKit = {
                logos: partner.mediaKit.logos.length,
                photos: partner.mediaKit.photos.length,
                videos: partner.mediaKit.videos.length,
                pressReleases: partner.mediaKit.pressReleases.length
              };
              
              alert(`📦 KIT MÉDIA PARTENAIRE\n\n🏢 ${partner.name}\n🖼️ ${mediaKit.logos} logos\n📸 ${mediaKit.photos} photos\n🎥 ${mediaKit.videos} vidéos\n📰 ${mediaKit.pressReleases} communiqués\n\n⬇️ Téléchargement démarré !`);
            }}
            title="Télécharger le kit média"
          >
            <Download className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};