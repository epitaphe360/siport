import React, { useEffect } from 'react';
import { 
  Award, 
  Users, 
  Calendar, 
  MessageCircle, 
  TrendingUp,
  Activity,
  Bell,
  Star,
  Handshake,
  Globe,
  Target,
  BarChart3,
  Crown,
  Zap
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useDashboardStore } from '../../store/dashboardStore';
import { useAuthStore } from '../../store/authStore';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Edit } from 'lucide-react';

export const PartnerDashboard: React.FC = () => {
  const { dashboard, isLoading, fetchDashboard } = useDashboardStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'profile_view': return Users;
      case 'message': return MessageCircle;
      case 'appointment': return Calendar;
      case 'connection': return Handshake;
      case 'download': return Award;
      default: return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'profile_view': return 'text-blue-600';
      case 'message': return 'text-green-600';
      case 'appointment': return 'text-purple-600';
      case 'connection': return 'text-orange-600';
      case 'download': return 'text-indigo-600';
      default: return 'text-gray-600';
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

  if (!dashboard) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Erreur de chargement
          </h3>
          <p className="text-gray-600">
            Impossible de charger le tableau de bord partenaire
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Partenaire */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-purple-600 p-3 rounded-lg">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Tableau de Bord Partenaire
                </h1>
                <p className="text-gray-600">
                  Bienvenue {user?.profile.firstName}, suivez votre impact SIPORTS 2026
                </p>
              </div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Crown className="h-5 w-5 text-purple-600" />
                <span className="text-purple-800 font-medium">Espace Partenaire</span>
                <Badge className="bg-purple-100 text-purple-800" size="sm">
                  Partenaire Officiel
                </Badge>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Cards Partenaire */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Visibilité Partenaire</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {dashboard.stats.profileViews?.toLocaleString() || '3,247'}
                    </p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Crown className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+22% cette semaine</span>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Connexions Établies</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {dashboard.stats.connections}
                    </p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Handshake className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+15% ce mois</span>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Événements Sponsorisés</p>
                    <p className="text-3xl font-bold text-gray-900">8</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span className="text-sm text-gray-600">2 cette semaine</span>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">ROI Partenariat</p>
                    <p className="text-3xl font-bold text-gray-900">285%</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <Badge variant="success" size="sm">Excellent</Badge>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Actions Rapides Partenaire */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Gestion de votre Partenariat
                </h3>
                
                <div className="space-y-4">
                  <Link to="/partners/2" className="block">
                    <Button className="w-full justify-start">
                    <Globe className="h-4 w-4 mr-3" />
                      Modifier mon Profil Partenaire
                    </Button>
                  </Link>
                  
                  <Button className="w-full justify-start" variant="outline">
                    <Edit className="h-4 w-4 mr-3" />
                    Modifier mon Contenu
                  </Button>
                  
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="h-4 w-4 mr-3" />
                    Événements Sponsorisés
                  </Button>
                  
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="h-4 w-4 mr-3" />
                    Networking Privilégié
                  </Button>
                  
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="h-4 w-4 mr-3" />
                    ROI & Analytics
                  </Button>
                  
                  <Button className="w-full justify-start" variant="outline">
                    <Target className="h-4 w-4 mr-3" />
                    Leads & Prospects
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Impact de votre Partenariat
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Mentions dans les médias</span>
                    <span className="font-semibold text-purple-600">12</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Portée sociale</span>
                    <span className="font-semibold text-blue-600">45,000</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Leads qualifiés</span>
                    <span className="font-semibold text-green-600">89</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Satisfaction partenariat</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-semibold text-gray-900">4.9/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Activité Récente Partenaire */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Activité de votre Partenariat
                </h3>
                <Button variant="ghost" size="sm">
                  Voir tout
                </Button>
              </div>
              
              <div className="space-y-4">
                {[
                  {
                    id: '1',
                    type: 'sponsorship',
                    description: 'Votre logo affiché sur la page d\'accueil - 2,500 vues',
                    timestamp: new Date(Date.now() - 3600000)
                  },
                  {
                    id: '2',
                    type: 'networking',
                    description: 'Session networking VIP - 45 participants connectés',
                    timestamp: new Date(Date.now() - 7200000)
                  },
                  {
                    id: '3',
                    type: 'media',
                    description: 'Mention dans le communiqué de presse officiel',
                    timestamp: new Date(Date.now() - 10800000)
                  }
                ].map((activity, index) => {
                  const ActivityIcon = getActivityIcon(activity.type);
                  const iconColor = getActivityColor(activity.type);
                  
                  return (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="p-2 rounded-lg bg-purple-100">
                        <ActivityIcon className={`h-4 w-4 ${iconColor}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">
                          {activity.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(activity.timestamp)}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Recommandations IA pour Partenaires */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Zap className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Recommandations IA pour Maximiser votre Partenariat
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-900 mb-2">
                    🎯 Opportunités de Networking
                  </h4>
                  <p className="text-sm text-purple-700">
                    15 prospects VIP identifiés pour des partenariats stratégiques
                  </p>
                </div>
                
                <div className="p-4 bg-white rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-900 mb-2">
                    📈 Optimisation ROI
                  </h4>
                  <p className="text-sm text-purple-700">
                    Sponsoriser 2 conférences supplémentaires pourrait augmenter votre ROI de 35%
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};