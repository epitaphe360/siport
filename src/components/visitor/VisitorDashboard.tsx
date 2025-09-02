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
    const UserIcon = getUserTypeIcon(profile.type);
  };

  const getUserTypeIcon = (type: string) => {
    return User;
  };
};