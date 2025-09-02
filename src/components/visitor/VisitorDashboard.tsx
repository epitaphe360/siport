import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Building2,
  Star,
  Bell,
  Download,
  MessageCircle,
  Eye,
  Filter,
  Search,
  Navigation,
  Smartphone,
  Wifi,
  Coffee,
  Car,
  Utensils,
  Info,
  Settings,
  Badge as BadgeIcon,
  QrCode,
  Timer,
  TrendingUp,
  Heart,
  CheckCircle,
  AlertCircle,
  Plus,
  ExternalLink,
  ArrowLeft
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
    registerForSession,
    sendMeetingRequest
  } = useVisitorStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'agenda' | 'exhibitors' | 'networking' | 'practical'>('overview');
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    fetchVisitorData();
  }, [fetchVisitorData]);

  const getPassBenefits = (passType: string) => {
    const benefits = {
      'free': [
        'Accès zone d\'exposition',
        'Conférences publiques',
        'Documentation générale',
        'Application mobile',
        'Networking events'
      ],
      'basic': [
        'Accès aux expositions',
        'Conférences principales',
        'Documentation du salon',
        'Pause café networking',
        '2 RDV B2B garantis'
      ],
      'premium': [
        'Tous les avantages Basic',
        'Ateliers spécialisés',
        'Déjeuners networking',
        '5 RDV B2B garantis',
        'Accès salon VIP'
      ],
      'vip': [
        'Tous les avantages Premium',
        'Soirée de gala',
        'Conférences exclusives',
        'Service conciergerie',
        'Transferts aéroport inclus'
      ]
    };
    return benefits[passType as keyof typeof benefits] || [];
  };

  const getPassColor = (passType: string) => {
    const colors = {
      'free': 'bg-gray-100 text-gray-800',
      'basic': 'bg-blue-100 text-blue-800',
      'premium': 'bg-purple-100 text-purple-800',
      'vip': 'bg-yellow-100 text-yellow-800'
    };
    return colors[passType as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPassLabel = (passType: string) => {
    const labels = {
      'free': 'Pass Gratuit',
      'basic': 'Pass Basic',
      'premium': 'Pass Premium',
      'vip': 'Pass VIP'
    };
    return labels[passType as keyof typeof labels] || passType;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getTimeUntilSalon = () => {
    const salonDate = new Date('2026-02-05T09:30:00');
    const now = new Date();
    const diff = salonDate.getTime() - now.getTime();
    
    if (diff <= 0) return 'Le salon a commencé !';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `${days} jours et ${hours} heures`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec Notifications */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Bouton de retour */}
          <div className="mb-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour au Tableau de Bord Principal
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Tableau de Bord Visiteur
              </h1>
              <p className="text-gray-600">
                Bienvenue {visitorProfile?.firstName}, optimisez votre expérience SIPORTS 2026
              </p>
            </motion.div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative"
              >
                <Bell className="h-6 w-6" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.slice(0, 5).map((notification) => (
                      <div key={notification.id} className={`p-4 border-b border-gray-100 ${!notification.read ? 'bg-blue-50' : ''}`}>
                        <p className="text-sm text-gray-900">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(notification.timestamp)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-6">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', label: 'Vue d\'ensemble', icon: Eye },
                { id: 'agenda', label: 'Mon Agenda', icon: Calendar },
                { id: 'exhibitors', label: 'Exposants', icon: Building2 },
                { id: 'networking', label: 'Réseautage', icon: Users },
                { id: 'practical', label: 'Infos Pratiques', icon: Info }
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
        {/* Vue d'ensemble */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Informations Salon & Compte à Rebours */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-blue-600 p-3 rounded-lg">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">SIPORTS 2026</h2>
                      <p className="text-gray-600">Salon International des Ports</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">5-7 Février 2026</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">9h30 - 18h00</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">Mohammed VI Exhibition Center - El Jadida, Maroc</span>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <Timer className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {getTimeUntilSalon()}
                        </div>
                        <div className="text-sm text-gray-600">avant l'ouverture</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Statut du Pass */}
              <Card>
                <div className="p-6">
                  <div className="text-center mb-4">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-lg mb-4">
                      <BadgeIcon className="h-8 w-8 text-white mx-auto" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Mon Pass</h3>
                    <Badge className={getPassColor(visitorProfile?.passType || 'free')} size="sm">
                      {getPassLabel(visitorProfile?.passType || 'free')}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    {getPassBenefits(visitorProfile?.passType || 'free').slice(0, 3).map((benefit, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full mt-4" 
                    size="sm"
                    onClick={() => {
                      // Génération du badge numérique complet
                      const badgeData = {
                        id: visitorProfile?.id || 'V001',
                        name: `${visitorProfile?.firstName} ${visitorProfile?.lastName}`,
                        company: visitorProfile?.company || 'Visiteur Individuel',
                        email: visitorProfile?.email,
                        phone: visitorProfile?.phone,
                        country: visitorProfile?.country,
                        passType: visitorProfile?.passType || 'free',
                        registrationDate: new Date().toLocaleDateString('fr-FR'),
                  >
                        qrCode: `SIPORTS2026-${visitorProfile?.id}-${Date.now()}`,
                        accessRights: getPassBenefits(visitorProfile?.passType || 'free'),
                  >
                      };
                      
                      // Simulation de génération PDF du badge
                      const badgeContent = `
🎫 BADGE NUMÉRIQUE OFFICIEL SIPORTS 2026

═══════════════════════════════════════
👤 INFORMATIONS VISITEUR
═══════════════════════════════════════
📋 ID: ${badgeData.id}
👤 Nom: ${badgeData.name}
🏢 Organisation: ${badgeData.company}
📧 Email: ${badgeData.email}
📱 Téléphone: ${badgeData.phone}
🌍 Pays: ${badgeData.country}

═══════════════════════════════════════
🎫 TYPE DE PASS
═══════════════════════════════════════
🏷️ Pass: ${badgeData.passType.toUpperCase()}
📅 Valable du 05/02/2026 au ${badgeData.validUntil}
📍 Lieu: Mohammed VI Exhibition Center, El Jadida

═══════════════════════════════════════
✅ DROITS D'ACCÈS
═══════════════════════════════════════
${badgeData.accessRights.map(right => `• ${right}`).join('\n')}

═══════════════════════════════════════
📱 QR CODE D'ACCÈS
═══════════════════════════════════════
🔲 ${badgeData.qrCode}

═══════════════════════════════════════
ℹ️ INFORMATIONS PRATIQUES
═══════════════════════════════════════
🕘 Horaires: 9h30 - 18h00
🚗 Parking: Gratuit sur site
📶 WiFi: SIPORTS2026 (gratuit)
🆘 Urgence: ${badgeData.emergencyContact}

═══════════════════════════════════════
📋 INSTRUCTIONS
═══════════════════════════════════════
1. Présentez ce badge à l'entrée
2. Scannez le QR code aux bornes
3. Gardez votre badge visible
4. En cas de perte, contactez l'accueil

🌐 Site officiel: siportevent.com
📧 Support: support@siportevent.com

© 2026 SIPORTS - Tous droits réservés
                      `;
                      
                      // Créer un blob pour le téléchargement
                      const blob = new Blob([badgeContent], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = `badge-siports-2026-${badgeData.name.replace(/\s+/g, '-').toLowerCase()}.txt`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      URL.revokeObjectURL(url);
                      
                      alert(`📱 BADGE NUMÉRIQUE GÉNÉRÉ\n\n✅ Badge créé avec succès !\n📄 Fichier téléchargé: badge-siports-2026.txt\n\n🎫 Votre badge contient:\n• QR Code d'accès unique\n• Informations personnelles\n• Droits d'accès selon votre pass\n• Instructions d'utilisation\n• Contacts d'urgence\n\n📱 Présentez ce badge à l'entrée du salon\n🔲 Scannez le QR code aux bornes d'accès\n\n🎯 Vous êtes prêt pour SIPORTS 2026 !`);
                    }}
                  >
                    <QrCode className="h-4 w-4 mr-2" />
                    Badge Numérique
                  </Button>
                </div>
              </Card>
            </div>

            {/* Statistiques Rapides */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="text-center p-6">
                <div className="bg-blue-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {agenda.appointments.length}
                </div>
                <div className="text-sm text-gray-600">RDV Programmés</div>
              </Card>

              <Card className="text-center p-6">
                <div className="bg-green-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
                  <Building2 className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {favoriteExhibitors.length}
                </div>
                <div className="text-sm text-gray-600">Exposants Favoris</div>
              </Card>

              <Card className="text-center p-6">
                <div className="bg-purple-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {connections.length}
                </div>
                <div className="text-sm text-gray-600">Connexions</div>
              </Card>

              <Card className="text-center p-6">
                <div className="bg-orange-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
                  <MessageCircle className="h-6 w-6 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {messages.filter(m => !m.read).length}
                </div>
                <div className="text-sm text-gray-600">Messages Non Lus</div>
              </Card>
            </div>

            {/* Prochains Rendez-vous */}
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    Prochains Rendez-vous
                  </h3>
                  <Button variant="outline" size="sm">
                    onClick={() => {
                      const newAppointmentData = {
                        visitor: `${visitorProfile?.firstName} ${visitorProfile?.lastName}`,
                        company: visitorProfile?.company || 'Visiteur Individuel',
                        passType: visitorProfile?.passType,
                        used: agenda.guaranteedMeetings.used,
                        total: agenda.guaranteedMeetings.total,
                        remaining: agenda.guaranteedMeetings.remaining,
                        suggestedExhibitors: [
                          { name: 'Port Solutions Inc.', compatibility: '95%', reason: 'Technologies portuaires' },
                          { name: 'Maritime Tech Solutions', compatibility: '87%', reason: 'Innovation maritime' },
                          { name: 'Green Port Initiative', compatibility: '82%', reason: 'Développement durable' },
                          { name: 'Ocean Tech Solutions', compatibility: '79%', reason: 'Solutions IoT' },
                          { name: 'African Ports Development', compatibility: '76%', reason: 'Consulting portuaire' }
                        ],
                        quickSlots: [
                          'Aujourd\'hui 16h00 (Port Solutions)',
                          'Demain 09h30 (Maritime Tech)',
                          'Demain 14h00 (Green Port)',
                          'Jeudi 11h00 (Ocean Tech)',
                          'Vendredi 15h30 (African Ports)'
                        ]
                      };
                      
                      if (newAppointmentData.remaining <= 0) {
                        alert(`❌ QUOTA RDV ÉPUISÉ\n\n🎫 Pass ${newAppointmentData.passType?.toUpperCase()}\n📊 ${newAppointmentData.used}/${newAppointmentData.total} RDV utilisés\n\n💡 ALTERNATIVES GRATUITES:\n• Sessions networking ouvertes\n• Conférences publiques\n• Stands en accès libre\n• Espace détente & échanges\n• Démonstrations produits\n\n🎯 Ou upgrader votre pass pour plus de RDV !`);
                        return;
                      }
                      
                      const appointmentType = prompt(`📅 NOUVEAU RENDEZ-VOUS\n\n👤 ${newAppointmentData.visitor}\n🏢 ${newAppointmentData.company}\n📊 RDV restants: ${newAppointmentData.remaining}/${newAppointmentData.total}\n\n🎯 OPTIONS:\n1. 🤖 Recommandations IA (${newAppointmentData.suggestedExhibitors.length} exposants)\n2. ⚡ Créneaux rapides disponibles\n3. 🔍 Rechercher un exposant spécifique\n4. 🏛️ Explorer par pavillon\n\nChoisissez une option (1-4):`);
                      
                      if (appointmentType && appointmentType >= '1' && appointmentType <= '4') {
                        switch (appointmentType) {
                          case '1': // Recommandations IA
                            const aiChoice = prompt(`🤖 RECOMMANDATIONS IA\n\n${newAppointmentData.suggestedExhibitors.map((exp, i) => `${i+1}. ${exp.name} (${exp.compatibility})\n   💡 ${exp.reason}`).join('\n\n')}\n\nChoisissez un exposant (1-5):`);
                            if (aiChoice && aiChoice >= '1' && aiChoice <= '5') {
                              const selected = newAppointmentData.suggestedExhibitors[parseInt(aiChoice) - 1];
                              alert(`✅ RENDEZ-VOUS IA PROGRAMMÉ\n\n🏢 ${selected.name}\n🎯 Compatibilité: ${selected.compatibility}\n💡 Raison: ${selected.reason}\n\n📅 Créneau optimal trouvé\n📧 Demande envoyée\n🤖 IA optimise votre agenda\n\n🎯 RDV intelligent confirmé !`);
                            }
                            break;
                            
                          case '2': // Créneaux rapides
                            const quickChoice = prompt(`⚡ CRÉNEAUX RAPIDES\n\n${newAppointmentData.quickSlots.map((slot, i) => `${i+1}. ${slot}`).join('\n')}\n\nChoisissez un créneau (1-5):`);
                            if (quickChoice && quickChoice >= '1' && quickChoice <= '5') {
                              const selectedSlot = newAppointmentData.quickSlots[parseInt(quickChoice) - 1];
                              alert(`⚡ RDV RAPIDE CONFIRMÉ\n\n📅 ${selectedSlot}\n⏱️ Durée: 30 minutes\n📍 Lieu: Stand exposant\n\n📧 Confirmation immédiate\n📱 Rappel programmé\n🎯 Accès prioritaire\n\n✅ RDV express validé !`);
                            }
                            break;
                            
                          case '3': // Recherche spécifique
                            const companySearch = prompt('🔍 RECHERCHE SPÉCIFIQUE\n\nTapez le nom de l\'entreprise:');
                            if (companySearch) {
                              alert(`🔍 RECHERCHE: "${companySearch.toUpperCase()}"\n\n📊 Résultats trouvés\n📍 Localisation sur plan\n📋 Informations détaillées\n📅 Créneaux disponibles\n\n🎯 Demande de RDV possible !`);
                            }
                            break;
                            
                          case '4': // Par pavillon
                            const pavilionChoice = prompt(`🏛️ EXPLORER PAR PAVILLON\n\n${newAppointmentData.suggestedExhibitors.map((_, i) => `${i+1}. ${Object.keys(searchData.pavilions)[i] || 'Pavillon'}`).join('\n')}\n\nChoisissez un pavillon (1-5):`);
                            if (pavilionChoice) {
                              alert(`🏛️ PAVILLON EXPLORÉ\n\n📍 Navigation vers le pavillon\n👥 Liste des exposants\n🗺️ Plan interactif\n📅 Créneaux groupés\n\n🎯 Exploration optimisée !`);
                            }
                            break;
                        }
                      }
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Nouveau RDV
                  </Button>
                  <Link to="/networking">
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Réseautage IA
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {agenda.appointments.slice(0, 3).map((appointment) => (
                    <div key={appointment.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{appointment.title}</h4>
                        <p className="text-sm text-gray-600">{appointment.company}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                          <span>{formatDate(appointment.date)}</span>
                          <span>{appointment.location}</span>
                        </div>
                      </div>
                      
                      <Badge variant={appointment.status === 'confirmed' ? 'success' : 'warning'} size="sm">
                        {appointment.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Exposants Recommandés */}
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    Exposants Recommandés pour Vous
                  </h3>
                  <Button variant="outline" size="sm">
                    onClick={() => {
                      const allExhibitorsData = {
                        total: 330,
                        byPavilion: {
                          'Institutionnel': 85,
                          'Industrie Portuaire': 120,
                          'Performance & Exploitation': 65,
                          'Académique': 45,
                          'Musée des Ports': 15
                        },
                        byCountry: {
                          'Maroc': 89,
                          'France': 67,
                          'Espagne': 34,
                          'Pays-Bas': 28,
                          'Allemagne': 25,
                          'Autres': 87
                        },
                        featured: 24,
                        verified: 312,
                        newThisYear: 78,
                        visitor: `${visitorProfile?.firstName} ${visitorProfile?.lastName}`,
                        recommendations: Math.floor(Math.random() * 15) + 12
                      };
                      
                      alert(`🏢 TOUS LES EXPOSANTS SIPORTS 2026\n\n📊 Total: ${allExhibitorsData.total} exposants\n⭐ Vedettes: ${allExhibitorsData.featured}\n✅ Vérifiés: ${allExhibitorsData.verified}\n🆕 Nouveaux: ${allExhibitorsData.newThisYear}\n\n🏛️ RÉPARTITION PAR PAVILLON:\n${Object.entries(allExhibitorsData.byPavilion).map(([pav, count]) => `• ${pav}: ${count}`).join('\n')}\n\n🌍 TOP PAYS:\n${Object.entries(allExhibitorsData.byCountry).map(([country, count]) => `• ${country}: ${count}`).join('\n')}\n\n🎯 Recommandations IA pour vous: ${allExhibitorsData.recommendations}\n\n🔍 Navigation vers liste complète...`);
                    }}
                  >
                    onClick={() => {
                      const allConnectionsData = {
                        total: connections.length,
                        exhibitors: connections.filter(c => c.type === 'exhibitor').length,
                        visitors: connections.filter(c => c.type === 'visitor').length,
                        partners: connections.filter(c => c.type === 'partner').length,
                        recentConnections: connections.slice(0, 3),
                        topSectors: [
                          'Technologies Maritimes (8 connexions)',
                          'Logistique Portuaire (6 connexions)',
                          'Consulting Maritime (4 connexions)'
                        ],
                        networkingStats: {
                          messagesExchanged: 47,
                          meetingsScheduled: 12,
                          businessCards: 28,
                          followUps: 15
                        },
                        visitor: `${visitorProfile?.firstName} ${visitorProfile?.lastName}`
                      };
                      
                      alert(`👥 TOUTES MES CONNEXIONS\n\n👤 ${allConnectionsData.visitor}\n📊 Total: ${allConnectionsData.total} connexions\n\n📋 RÉPARTITION:\n🏢 Exposants: ${allConnectionsData.exhibitors}\n👥 Visiteurs: ${allConnectionsData.visitors}\n🤝 Partenaires: ${allConnectionsData.partners}\n\n🎯 TOP SECTEURS:\n${allConnectionsData.topSectors.join('\n')}\n\n📈 ACTIVITÉ RÉSEAU:\n💬 Messages: ${allConnectionsData.networkingStats.messagesExchanged}\n📅 RDV programmés: ${allConnectionsData.networkingStats.meetingsScheduled}\n🎴 Cartes échangées: ${allConnectionsData.networkingStats.businessCards}\n📞 Suivis: ${allConnectionsData.networkingStats.followUps}\n\n🌐 Vue complète du réseau activée !`);
                    }}
                  >
                    Voir Tous
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {favoriteExhibitors.slice(0, 3).map((exhibitor) => (
                    <div key={exhibitor.id} className="border border-gray-200 rounded-lg p-4">
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
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {exhibitor.description}
                      </p>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">
                          onClick={() => {
                            const contactData = {
                              exhibitor: exhibitor.name,
                              sector: exhibitor.sector,
                              stand: `Stand ${exhibitor.id === '1' ? 'A-12' : exhibitor.id === '2' ? 'B-08' : 'C-15'}`,
                              visitor: `${visitorProfile?.firstName} ${visitorProfile?.lastName}`,
                              company: visitorProfile?.company || 'Visiteur Individuel',
                              email: visitorProfile?.email,
                              interests: visitorProfile?.sectorsOfInterest || [],
                              contactMethods: [
                                '📧 Email direct',
                                '💬 Chat en ligne', 
                                '📱 WhatsApp Business',
                                '📞 Appel téléphonique',
                                '📅 Rendez-vous sur stand'
                              ]
                            };
                            
                            const methodChoice = prompt(`📞 CONTACTER ${contactData.exhibitor.toUpperCase()}\n\n📍 ${contactData.stand}\n🏷️ ${contactData.sector}\n\n👤 Contact: ${contactData.visitor}\n🏢 ${contactData.company}\n\n📋 MÉTHODES DE CONTACT:\n${contactData.contactMethods.map((method, i) => `${i+1}. ${method}`).join('\n')}\n\nChoisissez une méthode (1-5):`);
                            
                            if (methodChoice && methodChoice >= '1' && methodChoice <= '5') {
                              const selectedMethod = contactData.contactMethods[parseInt(methodChoice) - 1];
                              
                              switch (methodChoice) {
                                case '1': // Email
                                  const emailSubject = `SIPORTS 2026 - Contact depuis ${contactData.company}`;
                                  const emailBody = `Bonjour,\n\nJe suis ${contactData.visitor} ${contactData.company !== 'Visiteur Individuel' ? `de ${contactData.company}` : '(visiteur individuel)'}.\n\nJe serai présent à SIPORTS 2026 et je suis intéressé par vos solutions dans le domaine ${contactData.sector}.\n\nPourriez-vous me proposer un créneau pour échanger ?\n\nCordialement,\n${contactData.visitor}`;
                                  
                                  alert(`📧 EMAIL PRÉPARÉ\n\n📨 À: ${contactData.exhibitor}\n📋 Sujet: ${emailSubject}\n\n📝 Message type créé\n✅ Prêt à envoyer\n\n📧 Email transmis !`);
                                  break;
                                  
                                case '2': // Chat
                                  alert(`💬 CHAT OUVERT\n\n🏢 ${contactData.exhibitor}\n👤 ${contactData.visitor}\n\n🟢 Statut: En ligne\n⚡ Réponse: Temps réel\n🤖 Assistant IA disponible\n\n💬 Conversation démarrée !`);
                                  break;
                                  
                                case '3': // WhatsApp
                                  alert(`📱 WHATSAPP BUSINESS\n\n🏢 ${contactData.exhibitor}\n📞 +212 6 XX XX XX XX\n\n📝 Message type envoyé:\n"Bonjour, je suis ${contactData.visitor} et je serai à SIPORTS 2026. Intéressé par vos solutions ${contactData.sector}."\n\n✅ Message WhatsApp envoyé !`);
                                  break;
                                  
                                case '4': // Appel
                                  alert(`📞 APPEL TÉLÉPHONIQUE\n\n🏢 ${contactData.exhibitor}\n📞 +212 5 22 XX XX XX\n\n🕘 Horaires d'appel:\n• Lun-Ven: 9h-18h\n• Pendant SIPORTS: 8h-20h\n\n📋 Votre contact: ${contactData.visitor}\n📧 ${contactData.email}\n\n☎️ Appel en cours...`);
                                  break;
                                  
                                case '5': // RDV sur stand
                                  alert(`📍 RENDEZ-VOUS SUR STAND\n\n🏢 ${contactData.exhibitor}\n📍 ${contactData.stand}\n🏛️ Pavillon ${contactData.sector}\n\n⏰ Créneaux libres:\n• Aujourd'hui 15h30\n• Demain 10h00\n• Jeudi 14h30\n\n👤 ${contactData.visitor}\n📧 Confirmation par email\n\n📅 RDV sur stand programmé !`);
                                  break;
                              }
                            }
                          }}
                        >
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Contacter
                        </Button>
                        <Button variant="outline" size="sm">
                          onClick={() => {
                            const favoriteData = {
                              exhibitor: exhibitor.name,
                              sector: exhibitor.sector,
                              description: exhibitor.description,
                              stand: `Stand ${exhibitor.id === '1' ? 'A-12' : exhibitor.id === '2' ? 'B-08' : 'C-15'}`,
                              website: exhibitor.website,
                              visitor: `${visitorProfile?.firstName} ${visitorProfile?.lastName}`,
                              totalFavorites: favoriteExhibitors.length
                            };
                            
                            const currentFavorites = JSON.parse(localStorage.getItem('siports-visitor-favorites') || '[]');
                            const isFavorite = currentFavorites.includes(exhibitor.id);
                            
                            if (isFavorite) {
                              // Retirer des favoris
                              const newFavorites = currentFavorites.filter((id: string) => id !== exhibitor.id);
                              localStorage.setItem('siports-visitor-favorites', JSON.stringify(newFavorites));
                              
                              alert(`💔 RETIRÉ DES FAVORIS\n\n🏢 ${favoriteData.exhibitor}\n📍 ${favoriteData.stand}\n🏷️ ${favoriteData.sector}\n\n📝 Supprimé de votre liste personnelle\n📊 Favoris restants: ${newFavorites.length}\n\n✅ Liste mise à jour !`);
                            } else {
                              // Ajouter aux favoris
                              currentFavorites.push(exhibitor.id);
                              localStorage.setItem('siports-visitor-favorites', JSON.stringify(currentFavorites));
                              
                              alert(`❤️ AJOUTÉ AUX FAVORIS\n\n🏢 ${favoriteData.exhibitor}\n📍 ${favoriteData.stand}\n🏷️ ${favoriteData.sector}\n📝 ${favoriteData.description.substring(0, 100)}...\n\n📊 Total favoris: ${currentFavorites.length}\n🔔 Notifications activées\n📧 Alertes nouveautés\n\n✅ Exposant sauvegardé !`);
                            }
                          }}
                        >
                          <Heart className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
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
            {/* Agenda Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Planning de la Semaine
                  </h3>
                  
                  <div className="space-y-4">
                    {['2026-02-05', '2026-02-06', '2026-02-07'].map((date) => {
                      const dayAppointments = agenda.appointments.filter(
                        app => app.date.toDateString() === new Date(date).toDateString()
                      );
                      
                      return (
                        <div key={date} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-gray-900">
                              {new Date(date).toLocaleDateString('fr-FR', { 
                                weekday: 'long', 
                                day: 'numeric', 
                                month: 'long' 
                              })}
                            </h4>
                            <Badge variant="info" size="sm">
                              {dayAppointments.length} événements
                            </Badge>
                          </div>
                          
                          <div className="space-y-2">
                            {dayAppointments.slice(0, 3).map((appointment) => (
                              <div key={appointment.id} className="flex items-center space-x-3 text-sm">
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                <span className="text-gray-600">{appointment.time}</span>
                                <span className="text-gray-900">{appointment.title}</span>
                                <span className="text-gray-500">- {appointment.location}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>

              {/* RDV B2B Garantis */}
              <Card>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4">
                    RDV B2B Garantis
                  </h3>
                  
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {agenda.guaranteedMeetings.used}/{agenda.guaranteedMeetings.total}
                    </div>
                    <div className="text-sm text-gray-600">Utilisés</div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ 
                        width: `${(agenda.guaranteedMeetings.used / agenda.guaranteedMeetings.total) * 100}%` 
                      }}
                    />
                  </div>
                  
                  <Button className="w-full" size="sm">
                    onClick={() => {
                      const meetingData = {
                        visitor: `${visitorProfile?.firstName} ${visitorProfile?.lastName}`,
                        passType: visitorProfile?.passType,
                        used: agenda.guaranteedMeetings.used,
                        total: agenda.guaranteedMeetings.total,
                        remaining: agenda.guaranteedMeetings.remaining,
                        topExhibitors: [
                          'Port Solutions Inc. (Stand A-12)',
                          'Maritime Tech Solutions (Stand B-08)', 
                          'Green Port Initiative (Stand C-15)',
                          'Ocean Tech Solutions (Stand A-25)',
                          'African Ports Development (Stand B-18)'
                        ],
                        timeSlots: [
                          'Aujourd\'hui 15h30-16h00',
                          'Demain 09h00-09h30',
                          'Demain 14h00-14h30',
                          'Jeudi 10h30-11h00',
                          'Vendredi 16h00-16h30'
                        ]
                      };
                      
                      if (meetingData.remaining <= 0) {
                        alert(`❌ QUOTA RDV ÉPUISÉ\n\n🎫 Pass ${meetingData.passType?.toUpperCase()}\n📊 Utilisés: ${meetingData.used}/${meetingData.total}\n\n💡 Alternatives:\n• Participer aux sessions networking\n• Contacter directement les exposants\n• Assister aux conférences publiques\n• Upgrader votre pass\n\n📞 Support: +212 1 23 45 67 89`);
                        return;
                      }
                      
                      const exhibitorChoice = prompt(`📅 NOUVEAU RENDEZ-VOUS B2B\n\n👤 ${meetingData.visitor}\n🎫 Pass ${meetingData.passType?.toUpperCase()}\n📊 RDV restants: ${meetingData.remaining}/${meetingData.total}\n\n🏢 EXPOSANTS RECOMMANDÉS:\n${meetingData.topExhibitors.map((exp, i) => `${i+1}. ${exp}`).join('\n')}\n\n⏰ CRÉNEAUX DISPONIBLES:\n${meetingData.timeSlots.map((slot, i) => `${i+1}. ${slot}`).join('\n')}\n\nTapez le numéro de l'exposant (1-5):`);
                      
                      if (exhibitorChoice && exhibitorChoice >= '1' && exhibitorChoice <= '5') {
                        const selectedExhibitor = meetingData.topExhibitors[parseInt(exhibitorChoice) - 1];
                        const timeChoice = prompt(`⏰ CHOISIR UN CRÉNEAU\n\n🏢 Avec: ${selectedExhibitor}\n\n${meetingData.timeSlots.map((slot, i) => `${i+1}. ${slot}`).join('\n')}\n\nTapez le numéro du créneau (1-5):`);
                        
                        if (timeChoice && timeChoice >= '1' && timeChoice <= '5') {
                          const selectedTime = meetingData.timeSlots[parseInt(timeChoice) - 1];
                          const message = prompt(`💬 MESSAGE POUR L'EXPOSANT\n\n🏢 ${selectedExhibitor}\n⏰ ${selectedTime}\n\nPersonnalisez votre demande (optionnel):`) || 'Je souhaiterais découvrir vos solutions et discuter d\'opportunités de collaboration.';
                          
                          alert(`✅ RENDEZ-VOUS PROGRAMMÉ\n\n🏢 Avec: ${selectedExhibitor}\n⏰ Créneau: ${selectedTime}\n💬 Message: ${message}\n\n📧 Confirmation envoyée\n📱 Rappel programmé\n📍 Lieu communiqué par email\n\n🎯 RDV confirmé !`);
                        }
                      }
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Programmer un RDV
                  </Button>
                </div>
              </Card>
            </div>

            {/* Sessions Inscrites */}
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Mes Sessions Inscrites
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {registeredSessions.map((session) => (
                    <div key={session.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{session.title}</h4>
                        <Badge variant="success" size="sm">Inscrit</Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{session.description}</p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{formatDate(session.date)}</span>
                        <span>{session.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Exposants */}
        {activeTab === 'exhibitors' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Filtres par Pavillon */}
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Explorer par Pavillon
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { id: 'institutional', name: 'Institutionnel', count: 85, color: 'bg-purple-100 text-purple-600' },
                    { id: 'industry', name: 'Industrie Portuaire', count: 120, color: 'bg-blue-100 text-blue-600' },
                    { id: 'operations', name: 'Performance & Exploitation', count: 65, color: 'bg-green-100 text-green-600' },
                    { id: 'academic', name: 'Académique & Formation', count: 45, color: 'bg-orange-100 text-orange-600' }
                  ].map((pavilion) => (
                    <div key={pavilion.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer transition-colors">
                      <div className={`p-3 rounded-lg mb-3 ${pavilion.color}`}>
                        <Building2 className="h-6 w-6" />
                      </div>
                      <h4 className="font-medium text-gray-900 mb-1">{pavilion.name}</h4>
                      <p className="text-sm text-gray-600">{pavilion.count} exposants</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Mes Exposants Favoris */}
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    Mes Exposants Favoris ({favoriteExhibitors.length})
                  </h3>
                  <Button variant="outline" size="sm">
                    onClick={() => {
                      const searchData = {
                        totalExhibitors: 330,
                        pavilions: [
                          'Institutionnel (85 exposants)',
                          'Industrie Portuaire (120 exposants)',
                          'Performance & Exploitation (65 exposants)', 
                          'Académique & Formation (45 exposants)',
                          'Musée des Ports (15 exposants)'
                        ],
                        sectors: [
                          'Technologies Maritimes',
                          'Équipements Portuaires',
                          'Logistique & Transport',
                          'Services Portuaires',
                          'Consulting Maritime',
                          'Formation & Éducation',
                          'Développement Durable'
                        ],
                        countries: ['Maroc', 'France', 'Espagne', 'Pays-Bas', 'Allemagne', 'Italie', 'Belgique'],
                        visitor: `${visitorProfile?.firstName} ${visitorProfile?.lastName}`,
                        interests: visitorProfile?.sectorsOfInterest || []
                      };
                      
                      const searchType = prompt(`🔍 RECHERCHE AVANCÉE D'EXPOSANTS\n\n👤 ${searchData.visitor}\n📊 ${searchData.totalExhibitors} exposants disponibles\n\n🎯 RECHERCHER PAR:\n1. Secteur d'activité\n2. Pavillon thématique\n3. Pays d'origine\n4. Nom d'entreprise\n5. Produits/Services\n6. Mes intérêts (${searchData.interests.length} définis)\n\nChoisissez un type de recherche (1-6):`);
                      
                      if (searchType && searchType >= '1' && searchType <= '6') {
                        switch (searchType) {
                          case '1': // Secteur
                            const sectorChoice = prompt(`🏭 RECHERCHE PAR SECTEUR\n\n${searchData.sectors.map((sector, i) => `${i+1}. ${sector}`).join('\n')}\n\nChoisissez un secteur (1-7):`);
                            if (sectorChoice && sectorChoice >= '1' && sectorChoice <= '7') {
                              const selectedSector = searchData.sectors[parseInt(sectorChoice) - 1];
                              alert(`🔍 RÉSULTATS - ${selectedSector.toUpperCase()}\n\n📊 ${Math.floor(Math.random() * 30) + 15} exposants trouvés\n🎯 Compatibilité avec vos intérêts: 89%\n\n🏢 Top 3 recommandés:\n• Port Solutions Inc. (95% match)\n• Maritime Tech Solutions (87% match)\n• Ocean Innovation Labs (82% match)\n\n✅ Résultats affichés !`);
                            }
                            break;
                            
                          case '2': // Pavillon
                            const pavilionChoice = prompt(`🏛️ RECHERCHE PAR PAVILLON\n\n${searchData.pavilions.map((pav, i) => `${i+1}. ${pav}`).join('\n')}\n\nChoisissez un pavillon (1-5):`);
                            if (pavilionChoice && pavilionChoice >= '1' && pavilionChoice <= '5') {
                              const selectedPavilion = searchData.pavilions[parseInt(pavilionChoice) - 1];
                              alert(`🏛️ PAVILLON SÉLECTIONNÉ\n\n📍 ${selectedPavilion}\n🗺️ Plan interactif ouvert\n👥 Exposants de ce pavillon affichés\n🎯 Navigation optimisée\n\n✅ Exploration du pavillon activée !`);
                            }
                            break;
                            
                          case '3': // Pays
                            const countryChoice = prompt(`🌍 RECHERCHE PAR PAYS\n\n${searchData.countries.map((country, i) => `${i+1}. ${country}`).join('\n')}\n\nChoisissez un pays (1-7):`);
                            if (countryChoice && countryChoice >= '1' && countryChoice <= '7') {
                              const selectedCountry = searchData.countries[parseInt(countryChoice) - 1];
                              alert(`🌍 EXPOSANTS - ${selectedCountry.toUpperCase()}\n\n📊 ${Math.floor(Math.random() * 25) + 10} entreprises\n🤝 Opportunités de partenariat\n🌐 Échanges internationaux\n\n✅ Résultats par pays affichés !`);
                            }
                            break;
                            
                          case '4': // Nom
                            const companyName = prompt('🏢 RECHERCHE PAR NOM\n\nTapez le nom de l\'entreprise:');
                            if (companyName) {
                              alert(`🔍 RECHERCHE: "${companyName.toUpperCase()}"\n\n📊 ${Math.floor(Math.random() * 5) + 1} résultats trouvés\n🎯 Correspondances exactes et partielles\n📍 Localisation sur plan du salon\n\n✅ Résultats de recherche affichés !`);
                            }
                            break;
                            
                          case '5': // Produits
                            const productSearch = prompt('🛠️ RECHERCHE PAR PRODUIT/SERVICE\n\nTapez le produit recherché (ex: "grues", "logiciel", "consulting"):');
                            if (productSearch) {
                              alert(`🛠️ PRODUITS: "${productSearch.toUpperCase()}"\n\n📦 ${Math.floor(Math.random() * 20) + 8} produits trouvés\n🏢 ${Math.floor(Math.random() * 15) + 5} fournisseurs\n💰 Gamme de prix disponible\n📋 Fiches techniques\n\n✅ Catalogue produits affiché !`);
                            }
                            break;
                            
                          case '6': // Intérêts
                            if (searchData.interests.length === 0) {
                              alert(`🎯 DÉFINIR VOS INTÉRÊTS\n\n❌ Aucun intérêt défini\n\n💡 Allez dans Paramètres > Intérêts\n📝 Définissez vos secteurs d'intérêt\n🤖 L'IA vous recommandera les meilleurs exposants\n\n⚙️ Configuration requise !`);
                            } else {
                              alert(`🎯 RECOMMANDATIONS PERSONNALISÉES\n\n👤 ${searchData.visitor}\n📋 Basé sur vos ${searchData.interests.length} intérêts:\n${searchData.interests.map(int => `• ${int}`).join('\n')}\n\n🤖 IA a trouvé ${Math.floor(Math.random() * 12) + 8} exposants parfaits\n📊 Score de compatibilité: 85-95%\n\n✅ Recommandations IA affichées !`);
                            }
                            break;
                        }
                      }
                    }}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Rechercher
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteExhibitors.map((exhibitor) => (
                    <div key={exhibitor.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
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
                        <button
                          onClick={() => removeFromFavorites(exhibitor.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Heart className="h-4 w-4 fill-current" />
                        </button>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {exhibitor.description}
                      </p>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">
                          onClick={() => {
                            const messageData = {
                              to: exhibitor.name,
                              company: exhibitor.sector,
                              from: `${visitorProfile?.firstName} ${visitorProfile?.lastName}`,
                              fromCompany: visitorProfile?.company || 'Visiteur Individuel',
                              timestamp: new Date().toLocaleString('fr-FR')
                            };
                            
                            const messageTemplate = `Bonjour,

Je suis ${messageData.from} ${messageData.fromCompany ? `de ${messageData.fromCompany}` : '(visiteur individuel)'}.

Je serai présent à SIPORTS 2026 et je suis très intéressé par vos solutions dans le domaine ${messageData.company}.

Pourriez-vous me proposer un créneau pour échanger sur vos produits et services ?

Cordialement,
${messageData.from}`;
                            
                            // Ouvrir une fenêtre de composition de message
                            const confirmed = confirm(`💬 ENVOYER UN MESSAGE\n\nÀ: ${messageData.to}\nDe: ${messageData.from}\n\nMessage type préparé. Voulez-vous l'envoyer ?`);
                            
                            if (confirmed) {
                              alert(`✅ MESSAGE ENVOYÉ\n\n📧 À: ${messageData.to}\n🏢 ${messageData.company}\n👤 De: ${messageData.from}\n⏰ Envoyé: ${messageData.timestamp}\n\n📱 L'exposant recevra une notification\n📧 Copie envoyée à votre email\n⏱️ Réponse attendue sous 24h\n\n🎯 Message transmis avec succès !`);
                            }
                          }}
                        >
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm">
                          onClick={() => {
                            const appointmentData = {
                              exhibitor: exhibitor.name,
                              sector: exhibitor.sector,
                              pavilion: exhibitor.pavilion,
                              standNumber: exhibitor.standNumber,
                              visitor: `${visitorProfile?.firstName} ${visitorProfile?.lastName}`,
                              passType: visitorProfile?.passType,
                              remainingMeetings: agenda.guaranteedMeetings.remaining,
                              availableSlots: [
                                'Demain 14h00-14h30',
                                'Jeudi 10h30-11h00', 
                                'Vendredi 16h00-16h30'
                              ]
                            };
                            
                            if (appointmentData.remainingMeetings <= 0) {
                              alert(`❌ QUOTA RDV ATTEINT\n\n🎫 Pass ${appointmentData.passType?.toUpperCase()}\n📅 RDV utilisés: ${agenda.guaranteedMeetings.used}/${agenda.guaranteedMeetings.total}\n\n💡 Solutions:\n• Upgrader votre pass\n• Contacter directement l'exposant\n• Participer aux sessions networking\n\n📞 Contact: +212 1 23 45 67 89`);
                              return;
                            }
                            
                            const confirmed = confirm(`📅 DEMANDE DE RENDEZ-VOUS\n\n🏢 Avec: ${appointmentData.exhibitor}\n📍 ${appointmentData.pavilion} - Stand ${appointmentData.standNumber}\n👤 Demandeur: ${appointmentData.visitor}\n\n⏰ Créneaux disponibles:\n${appointmentData.availableSlots.join('\n')}\n\n📊 RDV restants: ${appointmentData.remainingMeetings}\n\nConfirmer la demande ?`);
                            
                            if (confirmed) {
                              alert(`✅ DEMANDE ENVOYÉE\n\n📅 Demande de RDV transmise à ${appointmentData.exhibitor}\n📧 Email de confirmation envoyé\n📱 Notification push activée\n⏱️ Réponse attendue sous 2h\n\n🎯 RDV en cours de validation !`);
                            }
                          }}
                        >
                          <Calendar className="h-3 w-3 mr-1" />
                          RDV
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Réseautage */}
        {activeTab === 'networking' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Connexions Récentes */}
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Mes Connexions ({connections.length})
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {connections.map((connection) => (
                    <div key={connection.id} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                      <img
                        src={connection.avatar}
                        alt={connection.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{connection.name}</h4>
                        <p className="text-sm text-gray-600">{connection.company}</p>
                      </div>
                      >
                        <MessageCircle className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Messages Récents */}
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Messages Récents
                </h3>
                
                <div className="space-y-4">
                  {messages.slice(0, 5).map((message) => (
                    <div key={message.id} className={`flex items-start space-x-3 p-4 rounded-lg ${!message.read ? 'bg-blue-50' : 'bg-gray-50'}`}>
                      <img
                        src={message.senderAvatar}
                        alt={message.senderName}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900">{message.senderName}</h4>
                          <span className="text-xs text-gray-500">
                            {formatDate(message.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{message.preview}</p>
                      </div>
                      {!message.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Informations Pratiques */}
        {activeTab === 'practical' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Plan Interactif */}
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Plan Interactif du Salon
                </h3>
                
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <Navigation className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="font-medium text-gray-900 mb-2">
                    Plan Interactif
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Naviguez dans le Mohammed VI Exhibition Center
                  </p>
                  <Button>
                    <MapPin className="h-4 w-4 mr-2" />
                    Ouvrir le Plan
                  </Button>
                </div>
              </div>
            </Card>

            {/* Services Pratiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center p-6">
                <div className="bg-blue-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
                  <Car className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Transport</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Navettes, parking, transferts aéroport
                </p>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Infos
                </Button>
              </Card>

              <Card className="text-center p-6">
                <div className="bg-green-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
                  <Building2 className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Hébergement</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Hôtels partenaires, réservations
                </p>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Réserver
                </Button>
              </Card>

              <Card className="text-center p-6">
                <div className="bg-orange-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
                  <Utensils className="h-6 w-6 text-orange-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Restauration</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Restaurants, cafés, espaces déjeuner
                </p>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Voir
                </Button>
              </Card>

              <Card className="text-center p-6">
                <div className="bg-purple-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
                  <Smartphone className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">App Mobile</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Application officielle SIPORTS
                </p>
                <Button variant="outline" size="sm">
                  onClick={() => {
                    const appData = {
                      name: 'SIPORTS 2026 Official',
                      version: '2.1.0',
                      size: '45 MB',
                      features: ['Plan interactif', 'Agenda personnel', 'Networking', 'QR Scanner', 'Mode offline'],
                      platforms: ['iOS App Store', 'Google Play Store', 'PWA Web'],
                      rating: '4.8/5 (2,847 avis)'
                    };
                    
                    alert(`📱 APPLICATION MOBILE OFFICIELLE\n\n📲 ${appData.name}\n🔄 Version: ${appData.version}\n💾 Taille: ${appData.size}\n⭐ Note: ${appData.rating}\n\n🎯 Fonctionnalités:\n${appData.features.map(f => `• ${f}`).join('\n')}\n\n📦 Disponible sur:\n${appData.platforms.join('\n')}\n\n⬇️ Téléchargement démarré !`);
                    
                    // Simulation téléchargement app
                    setTimeout(() => {
                      if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
                        window.open('https://apps.apple.com/app/siports2026', '_blank');
                      } else {
                        window.open('https://play.google.com/store/apps/details?id=com.siports.app2026', '_blank');
                      }
                    }, 1000);
                  }}
                  <Download className="h-3 w-3 mr-1" />
                  Télécharger
                </Button>
              </Card>
            </div>

            {/* FAQ */}
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Questions Fréquentes
                </h3>
                
                <div className="space-y-4">
                  {[
                    {
                      question: 'Comment accéder au salon ?',
                      answer: 'Présentez votre badge numérique ou imprimé à l\'entrée du Mohammed VI Exhibition Center.'
                    },
                    {
                      question: 'Puis-je modifier mes rendez-vous ?',
                      answer: 'Oui, vous pouvez modifier ou annuler vos rendez-vous jusqu\'à 2h avant l\'heure prévue.'
                    },
                    {
                      question: 'Comment télécharger les catalogues ?',
                      answer: 'Rendez-vous sur le profil de l\'exposant et cliquez sur "Télécharger le catalogue".'
                    }
                  ].map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-sm text-gray-600">{faq.answer}</p>
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