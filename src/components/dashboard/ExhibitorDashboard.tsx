import React, { useEffect } from 'react';
import { 
  Eye, 
  Users, 
  Calendar, 
  MessageCircle, 
  Download,
  TrendingUp,
  Activity,
  Bell,
  Star,
  Building2,
  Edit,
  BarChart3,
  Globe,
  Package,
  Settings,
  Zap,
  User,
  Mail,
  Target,
  Award,
  Video
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useDashboardStore } from '../../store/dashboardStore';
import { useAuthStore } from '../../store/authStore';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const ExhibitorDashboard: React.FC = () => {
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
      case 'profile_view': return Eye;
      case 'message': return MessageCircle;
      case 'appointment': return Calendar;
      case 'connection': return Users;
      case 'download': return Download;
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
            Impossible de charger le tableau de bord exposant
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Exposant */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Tableau de Bord Exposant
                </h1>
                <p className="text-gray-600">
                  Bienvenue {user?.profile.firstName}, gérez votre présence SIPORTS 2026
                </p>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                <span className="text-blue-800 font-medium">Espace Exposant</span>
                <Badge variant="info" size="sm">
                  {user?.profile.company}
                </Badge>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Cards Exposant */}
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
                    <p className="text-sm font-medium text-gray-600">Vues Mini-Site</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {dashboard.stats.miniSiteViews?.toLocaleString() || '2,156'}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Eye className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+18% cette semaine</span>
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
                    <p className="text-sm font-medium text-gray-600">Téléchargements Catalogue</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {dashboard.stats.catalogDownloads || 89}
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Download className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+25% ce mois</span>
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
                    <p className="text-sm font-medium text-gray-600">Demandes de RDV</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {dashboard.stats.appointments}
                    </p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span className="text-sm text-gray-600">5 en attente</span>
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
                    <p className="text-sm font-medium text-gray-600">Messages Reçus</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {dashboard.stats.messages}
                    </p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <MessageCircle className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <Badge variant="warning" size="sm">3 non lus</Badge>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Actions Rapides Exposant */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Gestion de votre Présence
                </h3>
                
                <div className="space-y-4">
                  <Link to="/minisite/editor" className="block">
                    <Button className="w-full justify-start">
                      <Edit className="h-4 w-4 mr-3" />
                      Modifier mon Mini-Site
                    </Button>
                  </Link>
                  
                  <Link to="/profile" className="block">
                    <Button className="w-full justify-start" variant="outline">
                      <User className="h-4 w-4 mr-3" />
                      Mon Profil Exposant
                    </Button>
                  </Link>
                  
                  <Link to="/calendar" className="block">
                    <Button className="w-full justify-start" variant="outline">
                      <Calendar className="h-4 w-4 mr-3" />
                      Gérer mes Créneaux RDV
                    </Button>
                  </Link>
                  
                  <Link to="/chat" className="block">
                    <Button className="w-full justify-start" variant="outline">
                      <MessageCircle className="h-4 w-4 mr-3" />
                      Messages & Contact
                    </Button>
                  </Link>
                  
                  <Link to="/networking" className="block">
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="h-4 w-4 mr-3" />
                      Réseautage IA & Contacts
                    </Button>
                  </Link>
                  
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => {
                      alert('📦 GESTION PRODUITS\n\n📊 12 produits actifs\n👁️ 2,156 vues catalogue\n📥 89 téléchargements\n\n🎯 Optimisez votre catalogue !');
                    }}
                  >
                    <Package className="h-4 w-4 mr-3" />
                    Gérer mes Produits
                  </Button>
                  
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => {
                      alert('📊 ANALYTICS EXPOSANT\n\n👁️ 2,156 vues mini-site\n📥 89 téléchargements\n🤝 47 leads générés\n📈 +18% cette semaine\n\n📋 Rapport détaillé disponible !');
                    }}
                  >
                    <BarChart3 className="h-4 w-4 mr-3" />
                    Analytics & Rapports
                  </Button>
                  
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => {
                      alert('⚙️ PARAMÈTRES EXPOSANT\n\n🔔 Notifications: Activées\n📧 Email: Quotidien\n📱 Push: Temps réel\n🌐 Langue: Français\n\n⚙️ Personnalisez vos préférences !');
                    }}
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Paramètres & Préférences
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
                  Actions Rapides
                </h3>
                
                <div className="space-y-4">
                  <Button 
                    className="w-full justify-start"
                    onClick={() => {
                      alert('📧 CAMPAGNE EMAIL\n\n👥 2,156 contacts dans votre base\n📊 Taux d\'ouverture: 24%\n📈 Leads générés: 47\n\n📬 Nouvelle campagne prête !');
                    }}
                  >
                    <Mail className="h-4 w-4 mr-3" />
                    Campagne Email Marketing
                  </Button>
                  
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => {
                      const catalogData = {
                        products: 12,
                        pages: 24,
                        downloads: 89,
                        lastUpdate: 'Il y a 3 jours'
                      };
                      alert(`📋 CATALOGUE NUMÉRIQUE\n\n📦 ${catalogData.products} produits\n📄 ${catalogData.pages} pages\n📥 ${catalogData.downloads} téléchargements\n🔄 Mis à jour: ${catalogData.lastUpdate}\n\n📱 Catalogue prêt à partager !`);
                    }}
                  >
                    <Download className="h-4 w-4 mr-3" />
                    Générer Catalogue PDF
                  </Button>
                  
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => {
                      alert('🎯 LEADS & PROSPECTS\n\n👥 47 leads qualifiés\n📊 Taux conversion: 4.2%\n💼 12 opportunités chaudes\n📈 +25% ce mois\n\n🚀 Pipeline commercial actif !');
                    }}
                  >
                    <Target className="h-4 w-4 mr-3" />
                    Leads & Prospects
                  </Button>
                  
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => {
                      alert('🏆 CONCOURS INNOVATION\n\n🎯 Participez au concours SIPORTS\n🏅 Prix: 50,000€ + visibilité\n📅 Date limite: 15 janvier\n📋 Dossier: 80% complété\n\n🚀 Finalisez votre candidature !');
                    }}
                  >
                    <Award className="h-4 w-4 mr-3" />
                    Concours Innovation
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions Floating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Zap className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Actions Rapides Exposant
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button 
                  className="w-full"
                  onClick={() => {
                    alert('📱 QR CODE GÉNÉRÉ\n\n🏢 Port Solutions Inc.\n📍 Stand A-12\n📱 Scan pour contact direct\n\n✅ QR Code prêt à imprimer !');
                  }}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  QR Code Stand
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => {
                    alert('📊 RAPPORT HEBDO\n\n📈 Performance cette semaine:\n👁️ +18% vues mini-site\n📥 +25% téléchargements\n🤝 +12 nouveaux contacts\n\n📧 Rapport envoyé par email !');
                  }}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Rapport Hebdo
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => {
                    alert('🎥 LIVE STREAMING\n\n📹 Démo produit en direct\n👥 Audience: 156 spectateurs\n💬 Chat interactif\n📊 Engagement: 89%\n\n🚀 Stream démarré !');
                  }}
                >
                  <Video className="h-4 w-4 mr-2" />
                  Live Demo
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => {
                    alert('🎁 PROMOTION SPÉCIALE\n\n🏷️ -20% sur tous les produits\n📅 Valable pendant SIPORTS\n🎯 Code: SIPORTS2026\n\n🚀 Promotion activée !');
                  }}
                >
                  <Star className="h-4 w-4 mr-2" />
                  Promo SIPORTS
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Performance de votre Stand */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Performance de votre Stand
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Taux de conversion</span>
                  <span className="font-semibold text-green-600">4.2%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Engagement moyen</span>
                  <span className="font-semibold text-blue-600">3m 45s</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Leads générés</span>
                  <span className="font-semibold text-purple-600">47</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Satisfaction</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-semibold text-gray-900">4.8/5</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <Button variant="outline" size="sm" className="w-full">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Rapport Détaillé
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Activité Récente Exposant */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Activité Récente de votre Stand
                </h3>
                <Button variant="ghost" size="sm">
                  Voir tout
                </Button>
              </div>
              
              <div className="space-y-4">
                {dashboard?.recentActivity.slice(0, 5).map((activity, index) => {
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
                      <div className="p-2 rounded-lg bg-gray-100">
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

        {/* Recommandations IA pour Exposants */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Zap className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Recommandations IA pour Optimiser votre Stand
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-900 mb-2">
                    📈 Optimisation du Profil
                  </h4>
                  <p className="text-sm text-green-700 mb-3">
                    Ajoutez 3 mots-clés supplémentaires pour augmenter votre visibilité de 25%
                  </p>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      alert('🎯 OPTIMISATION PROFIL\n\n📝 Mots-clés suggérés:\n• "Port intelligent"\n• "IoT maritime"\n• "Digitalisation"\n\n✅ Ajoutez-les à votre profil !');
                    }}
                  >
                    Optimiser
                  </Button>
                </div>
                
                <div className="p-4 bg-white rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-900 mb-2">
                    🎯 Contacts Suggérés
                  </h4>
                  <p className="text-sm text-green-700 mb-3">
                    12 nouveaux prospects identifiés dans votre secteur d'activité
                  </p>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      alert('👥 PROSPECTS IDENTIFIÉS\n\n🎯 12 contacts qualifiés:\n• 8 directeurs techniques\n• 3 décideurs achats\n• 1 investisseur\n\n🤝 Contactez-les maintenant !');
                    }}
                  >
                    Voir Prospects
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};