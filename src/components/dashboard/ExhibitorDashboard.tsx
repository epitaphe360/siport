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
                      Gérer mes Créneaux RDV (8 actifs)
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
                      const productData = {
                        total: 12,
                        active: 10,
                        views: 2156,
                        downloads: 89,
                        categories: ['Software: 5', 'Hardware: 4', 'Services: 3'],
                        topProduct: 'SmartPort Management System',
                        lastUpdate: 'Il y a 3 jours'
                      };
                      
                      alert(`📦 GESTION PRODUITS\n\n📊 ${productData.total} produits (${productData.active} actifs)\n👁️ ${productData.views.toLocaleString()} vues catalogue\n📥 ${productData.downloads} téléchargements\n\n🏷️ Répartition:\n${productData.categories.join('\n')}\n\n🏆 Produit vedette: ${productData.topProduct}\n🔄 Dernière MAJ: ${productData.lastUpdate}\n\n🎯 Optimisez votre catalogue !`);
                    }}
                  >
                    <Package className="h-4 w-4 mr-3" />
                    Gérer mes Produits
                  </Button>
                  
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => {
                      const analyticsData = {
                        views: 2156,
                        downloads: 89,
                        leads: 47,
                        conversion: '4.2%',
                        engagement: '3m 45s',
                        topPages: ['Produits: 45%', 'À propos: 28%', 'Contact: 27%'],
                        topCountries: ['France: 32%', 'Maroc: 28%', 'Espagne: 18%'],
                        weeklyGrowth: '+18%',
                        satisfaction: '4.8/5'
                      };
                      
                      alert(`📊 ANALYTICS EXPOSANT\n\n📈 Performance:\n👁️ ${analyticsData.views.toLocaleString()} vues mini-site\n📥 ${analyticsData.downloads} téléchargements\n🎯 ${analyticsData.leads} leads générés\n📊 Conversion: ${analyticsData.conversion}\n⏱️ Engagement: ${analyticsData.engagement}\n⭐ Satisfaction: ${analyticsData.satisfaction}\n\n📄 Pages populaires:\n${analyticsData.topPages.join('\n')}\n\n🌍 Top pays:\n${analyticsData.topCountries.join('\n')}\n\n📈 Croissance: ${analyticsData.weeklyGrowth} cette semaine\n\n📋 Rapport détaillé disponible !`);
                    }}
                  >
                    <BarChart3 className="h-4 w-4 mr-3" />
                    Analytics & Rapports
                  </Button>
                  
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => {
                      const settingsData = {
                        notifications: {
                          email: true,
                          push: true,
                          inApp: true,
                          frequency: 'Temps réel'
                        },
                        language: 'Français',
                        timezone: 'Europe/Paris',
                        privacy: 'Public',
                        autoSave: true,
                        theme: 'Clair'
                      };
                      
                      alert(`⚙️ PARAMÈTRES EXPOSANT\n\n🔔 Notifications:\n• Email: ${settingsData.notifications.email ? 'Activées' : 'Désactivées'}\n• Push: ${settingsData.notifications.push ? 'Activées' : 'Désactivées'}\n• In-App: ${settingsData.notifications.inApp ? 'Activées' : 'Désactivées'}\n• Fréquence: ${settingsData.notifications.frequency}\n\n🌐 Langue: ${settingsData.language}\n⏰ Fuseau: ${settingsData.timezone}\n🔒 Confidentialité: ${settingsData.privacy}\n💾 Sauvegarde auto: ${settingsData.autoSave ? 'Activée' : 'Désactivée'}\n🎨 Thème: ${settingsData.theme}\n\n⚙️ Personnalisez vos préférences !`);
                    }}
                  >
                    <Link to="/profile" className="w-full">
                      <Button className="w-full justify-start" variant="outline">
                        <Settings className="h-4 w-4 mr-3" />
                        Paramètres & Préférences
                      </Button>
                    </Link>
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
                      const qrData = {
                        company: user?.profile.company || 'Votre Entreprise',
                        stand: 'A-12',
                        contact: `${user?.profile.firstName} ${user?.profile.lastName}`,
                        email: user?.email,
                        phone: user?.profile.phone,
                        website: user?.profile.website,
                        qrCode: `SIPORTS2026-EXHIBITOR-${user?.id}-${Date.now()}`,
                        validUntil: '7 Février 2026 18:00'
                      };
                      
                      // Génération du QR Code (simulation)
                      const canvas = document.createElement('canvas');
                      canvas.width = 200;
                      canvas.height = 200;
                      const ctx = canvas.getContext('2d');
                      if (ctx) {
                        ctx.fillStyle = '#000';
                        ctx.fillRect(0, 0, 200, 200);
                        ctx.fillStyle = '#fff';
                        ctx.fillRect(10, 10, 180, 180);
                      }
                      
                      alert(`📱 QR CODE STAND GÉNÉRÉ\n\n🏢 ${qrData.company}\n📍 Stand: ${qrData.stand}\n👤 Contact: ${qrData.contact}\n📧 ${qrData.email}\n📞 ${qrData.phone}\n🌐 ${qrData.website}\n\n🔐 Code: ${qrData.qrCode}\n⏰ Valide jusqu'au: ${qrData.validUntil}\n\n✅ QR Code prêt à imprimer et afficher sur votre stand !`);
                    }}
                  >
                    <Eye className="h-4 w-4 mr-3" />
                    QR Code Stand
                  </Button>
                  
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => {
                      const campaignData = {
                        contacts: 1911,
                        openRate: '24%',
                        leads: 47,
                        templates: ['Présentation produits', 'Invitation salon', 'Suivi post-salon'],
                        segments: ['Prospects chauds: 156', 'Clients existants: 89', 'Nouveaux contacts: 1911'],
                        bestTime: '14h-16h (mardi-jeudi)',
                        deliveryRate: '98.5%'
                      };
                      
                      alert(`📧 CAMPAGNE EMAIL MARKETING\n\n👥 ${campaignData.contacts.toLocaleString()} contacts dans votre base\n📊 Taux d'ouverture: ${campaignData.openRate}\n🎯 Leads générés: ${campaignData.leads}\n📈 Taux de livraison: ${campaignData.deliveryRate}\n\n📝 Templates disponibles:\n${campaignData.templates.map(t => `• ${t}`).join('\n')}\n\n👥 Segments:\n${campaignData.segments.join('\n')}\n\n⏰ Meilleur moment: ${campaignData.bestTime}\n\n🚀 Campagne prête à envoyer !`);
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
                        lastUpdate: 'Il y a 3 jours',
                        format: 'PDF interactif',
                        languages: ['Français', 'Anglais', 'Arabe'],
                        size: '4.2 MB',
                        version: '2.1'
                      };
                      
                      // Génération et téléchargement du catalogue
                      const link = document.createElement('a');
                      link.href = 'data:application/pdf;base64,JVBERi0xLjQKJdPr6eEK';
                      link.download = `catalogue-numerique-v${catalogData.version}.pdf`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      
                      alert(`📋 CATALOGUE NUMÉRIQUE GÉNÉRÉ\n\n📦 ${catalogData.products} produits\n📄 ${catalogData.pages} pages\n📥 ${catalogData.downloads} téléchargements\n🔄 Mis à jour: ${catalogData.lastUpdate}\n\n📱 Format: ${catalogData.format}\n🌐 Langues: ${catalogData.languages.join(', ')}\n💾 Taille: ${catalogData.size}\n📋 Version: ${catalogData.version}\n\n⬇️ Téléchargement démarré !`);
                    }}
                  >
                    <Download className="h-4 w-4 mr-3" />
                    Générer Catalogue PDF
                  </Button>
                  
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => {
                      const leadsData = {
                        total: 47,
                        qualified: 35,
                        hot: 12,
                        warm: 23,
                        cold: 12,
                        conversion: '4.2%',
                        growth: '+25%',
                        sources: ['Mini-site: 45%', 'Networking: 30%', 'Conférences: 25%'],
                        topSectors: ['Port Operations: 40%', 'Technology: 35%', 'Logistics: 25%'],
                        avgValue: '125,000€',
                        pipeline: '5.8M€'
                      };
                      
                      alert(`🎯 LEADS & PROSPECTS\n\n👥 ${leadsData.total} leads qualifiés\n🔥 ${leadsData.hot} opportunités chaudes\n🌡️ ${leadsData.warm} prospects tièdes\n❄️ ${leadsData.cold} contacts froids\n\n📊 Taux conversion: ${leadsData.conversion}\n📈 Croissance: ${leadsData.growth} ce mois\n💰 Valeur moyenne: ${leadsData.avgValue}\n💼 Pipeline total: ${leadsData.pipeline}\n\n📍 Sources:\n${leadsData.sources.join('\n')}\n\n🏭 Secteurs:\n${leadsData.topSectors.join('\n')}\n\n🚀 Pipeline commercial très actif !`);
                    }}
                  >
                    <Target className="h-4 w-4 mr-3" />
                    Leads & Prospects
                  </Button>
                  
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => {
                      const contestData = {
                        name: 'SIPORTS Innovation Awards 2026',
                        prize: '50,000€',
                        categories: ['Port Technology', 'Sustainability', 'Digital Innovation', 'Safety & Security'],
                        deadline: '15 janvier 2026',
                        progress: '80%',
                        requirements: ['Dossier technique', 'Vidéo démo', 'Business plan', 'Références clients'],
                        jury: '15 experts internationaux',
                        benefits: ['Prix en espèces', 'Visibilité médiatique', 'Partenariats', 'Certification']
                      };
                      
                      alert(`🏆 CONCOURS INNOVATION SIPORTS\n\n🎯 ${contestData.name}\n🏅 Prix: ${contestData.prize} + avantages\n📅 Date limite: ${contestData.deadline}\n📋 Dossier: ${contestData.progress} complété\n\n🏷️ Catégories:\n${contestData.categories.map(cat => `• ${cat}`).join('\n')}\n\n📄 Requis:\n${contestData.requirements.map(req => `• ${req}`).join('\n')}\n\n👨‍⚖️ Jury: ${contestData.jury}\n🎁 Avantages:\n${contestData.benefits.map(ben => `• ${ben}`).join('\n')}\n\n🚀 Finalisez votre candidature !`);
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
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    const analyticsData = {
                      views: '2,156',
                      downloads: '89',
                      leads: '47',
                      conversion: '4.2%',
                      engagement: '3m 45s',
                      satisfaction: '4.8/5',
                      topPages: ['Produits: 45%', 'À propos: 28%', 'Contact: 27%'],
                      topCountries: ['France: 32%', 'Maroc: 28%', 'Espagne: 18%']
                    };
                    
                    alert(`📊 RAPPORT DÉTAILLÉ\n\n📈 Performance:\n👁️ Vues: ${analyticsData.views}\n📥 Téléchargements: ${analyticsData.downloads}\n🎯 Leads: ${analyticsData.leads}\n📊 Conversion: ${analyticsData.conversion}\n⏱️ Engagement: ${analyticsData.engagement}\n⭐ Satisfaction: ${analyticsData.satisfaction}\n\n📄 Pages populaires:\n${analyticsData.topPages.join('\n')}\n\n🌍 Top pays:\n${analyticsData.topCountries.join('\n')}`);
                  }}
                >
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