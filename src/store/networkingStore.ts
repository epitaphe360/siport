import { create } from 'zustand';
import { User, NetworkingRecommendation } from '../types';

interface NetworkingProfile extends User {
  matchingCriteria: {
    sectors: string[];
    productTypes: string[];
    companySize: string[];
    geographicRegions: string[];
    collaborationObjectives: string[];
    thematicInterests: string[];
  };
  aiScore: {
    profileCompleteness: number;
    engagementLevel: number;
    matchingPotential: number;
  };
  behaviorData: {
    profileViews: number;
    messagesExchanged: number;
    appointmentsScheduled: number;
    connectionsAccepted: number;
    lastActivity: Date;
  };
}

interface MatchingResult {
  user: NetworkingProfile;
  score: number;
  reasons: string[];
  category: string;
  mutualConnections: number;
  compatibilityFactors: {
    sectorAlignment: number;
    objectiveAlignment: number;
    geographicRelevance: number;
    experienceLevel: number;
    collaborationPotential: number;
  };
}

interface NetworkingState {
  profiles: NetworkingProfile[];
  recommendations: MatchingResult[];
  searchResults: NetworkingProfile[];
  favorites: string[];
  connections: string[];
  pendingRequests: string[];
  sentRequests: string[];
  isLoading: boolean;
  searchFilters: {
    sectors: string[];
    regions: string[];
    companySize: string[];
    objectives: string[];
    keywords: string;
  };
  
  // Actions
  fetchProfiles: () => Promise<void>;
  generateRecommendations: (userId: string) => Promise<void>;
  searchProfiles: (criteria: any) => Promise<void>;
  sendConnectionRequest: (userId: string, message?: string) => Promise<void>;
  acceptConnectionRequest: (requestId: string) => Promise<void>;
  rejectConnectionRequest: (requestId: string) => Promise<void>;
  addToFavorites: (userId: string) => void;
  removeFromFavorites: (userId: string) => void;
  updateMatchingCriteria: (criteria: any) => Promise<void>;
  getAIInsights: (userId: string) => Promise<any>;
}

// Mock data for networking profiles
const mockProfiles: NetworkingProfile[] = [
  {
    id: '1',
    email: 'sarah.johnson@globalports.com',
    name: 'Sarah Johnson',
    type: 'exhibitor',
    profile: {
      firstName: 'Sarah',
      lastName: 'Johnson',
      avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200',
      company: 'Global Port Solutions',
      position: 'CEO & Founder',
      country: 'Netherlands',
      phone: '+31 20 123 4567',
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      website: 'https://globalportsolutions.com',
      bio: 'Experte en transformation digitale portuaire avec 15+ années d\'expérience. Spécialisée dans l\'optimisation des opérations portuaires et l\'implémentation de solutions IoT.',
      interests: ['Digital Transformation', 'Port Operations', 'IoT Solutions', 'Sustainability'],
      objectives: ['Find technology partners', 'Expand to African markets', 'Showcase innovations'],
      companyDescription: 'Leader mondial des solutions de gestion portuaire intelligente, spécialisé dans la transformation digitale des infrastructures maritimes.',
      sectors: ['Port Management', 'Digital Solutions', 'Maritime Technology'],
      products: ['SmartPort Platform', 'IoT Sensors', 'Analytics Dashboard'],
      videos: ['https://example.com/demo-video'],
      images: ['https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'],
      participationObjectives: ['Technology partnerships', 'Market expansion', 'Innovation showcase'],
      thematicInterests: ['Digital Transformation', 'Sustainability', 'Automation'],
      companySize: '100-500',
      geographicLocation: 'Europe',
      collaborationTypes: ['Technology Transfer', 'Joint Ventures', 'Distribution'],
      expertise: ['Port Digitalization', 'IoT Implementation', 'Data Analytics']
    },
    matchingCriteria: {
      sectors: ['Port Operations', 'Technology', 'Logistics'],
      productTypes: ['Software', 'IoT', 'Analytics'],
      companySize: ['50-200', '200-1000'],
      geographicRegions: ['Europe', 'Africa', 'Middle East'],
      collaborationObjectives: ['Technology Transfer', 'Market Expansion'],
      thematicInterests: ['Digital Transformation', 'Sustainability']
    },
    aiScore: {
      profileCompleteness: 95,
      engagementLevel: 88,
      matchingPotential: 92
    },
    behaviorData: {
      profileViews: 1247,
      messagesExchanged: 89,
      appointmentsScheduled: 23,
      connectionsAccepted: 45,
      lastActivity: new Date(Date.now() - 3600000)
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date()
  },
  {
    id: '2',
    email: 'ahmed.mansouri@casaport.ma',
    name: 'Ahmed El Mansouri',
    type: 'partner',
    profile: {
      firstName: 'Ahmed',
      lastName: 'El Mansouri',
      avatar: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=200',
      company: 'Autorité Portuaire de Casablanca',
      position: 'Directeur Technique',
      country: 'Morocco',
      phone: '+212 522 123 456',
      linkedin: 'https://linkedin.com/in/ahmedelmansouri',
      website: 'https://portcasablanca.ma',
      bio: 'Directeur technique avec 20+ ans d\'expérience dans le développement d\'infrastructures portuaires. Expert en modernisation et durabilité des ports.',
      interests: ['Infrastructure Development', 'Sustainability', 'Port Modernization', 'Government Relations'],
      objectives: ['Infrastructure partnerships', 'Technology adoption', 'International cooperation'],
      companyDescription: 'Premier port du Maroc et hub stratégique pour l\'Afrique de l\'Ouest, leader en modernisation portuaire et développement durable.',
      sectors: ['Port Authority', 'Infrastructure', 'Government'],
      products: ['Port Services', 'Infrastructure Development', 'Consulting'],
      videos: [],
      images: ['https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg'],
      participationObjectives: ['International cooperation', 'Technology adoption', 'Best practices sharing'],
      thematicInterests: ['Infrastructure', 'Sustainability', 'Modernization'],
      companySize: '1000+',
      geographicLocation: 'Africa',
      collaborationTypes: ['Public-Private Partnership', 'Technology Transfer', 'Consulting'],
      expertise: ['Port Infrastructure', 'Project Management', 'Regulatory Affairs']
    },
    matchingCriteria: {
      sectors: ['Infrastructure', 'Technology', 'Consulting'],
      productTypes: ['Infrastructure', 'Technology Solutions', 'Services'],
      companySize: ['200-1000', '1000+'],
      geographicRegions: ['Africa', 'Europe', 'Middle East'],
      collaborationObjectives: ['Infrastructure Development', 'Technology Transfer'],
      thematicInterests: ['Infrastructure', 'Sustainability']
    },
    aiScore: {
      profileCompleteness: 88,
      engagementLevel: 92,
      matchingPotential: 85
    },
    behaviorData: {
      profileViews: 892,
      messagesExchanged: 67,
      appointmentsScheduled: 18,
      connectionsAccepted: 32,
      lastActivity: new Date(Date.now() - 7200000)
    },
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date()
  },
  {
    id: '3',
    email: 'maria.santos@maritimeuni.es',
    name: 'Dr. Maria Santos',
    type: 'visitor',
    profile: {
      firstName: 'Maria',
      lastName: 'Santos',
      avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=200',
      company: 'Maritime University of Barcelona',
      position: 'Research Director',
      country: 'Spain',
      phone: '+34 93 123 4567',
      linkedin: 'https://linkedin.com/in/mariasantos',
      website: 'https://maritimeuni.es',
      bio: 'Directrice de recherche spécialisée en innovation maritime et développement durable. 12 ans d\'expérience en recherche appliquée et partenariats industriels.',
      interests: ['Maritime Research', 'Innovation', 'Sustainability', 'Academic Partnerships'],
      objectives: ['Research collaboration', 'Industry partnerships', 'Funding opportunities'],
      companyDescription: 'Université maritime de référence en Europe, spécialisée dans la recherche appliquée et l\'innovation pour le secteur portuaire.',
      sectors: ['Education', 'Research', 'Innovation'],
      products: ['Research Programs', 'Training Courses', 'Consulting'],
      videos: [],
      images: ['https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg'],
      visitObjectives: ['Research partnerships', 'Technology scouting', 'Student opportunities'],
      competencies: ['Maritime Research', 'Innovation Management', 'Academic Partnerships'],
      participationObjectives: ['Research collaboration', 'Industry partnerships', 'Knowledge transfer'],
      thematicInterests: ['Innovation', 'Sustainability', 'Education'],
      companySize: '200-500',
      geographicLocation: 'Europe',
      collaborationTypes: ['Research Partnership', 'Knowledge Transfer', 'Training'],
      expertise: ['Maritime Innovation', 'Sustainability Research', 'Technology Transfer']
    },
    matchingCriteria: {
      sectors: ['Research', 'Innovation', 'Technology'],
      productTypes: ['Research', 'Training', 'Consulting'],
      companySize: ['50-200', '200-1000'],
      geographicRegions: ['Europe', 'Global'],
      collaborationObjectives: ['Research Partnership', 'Knowledge Transfer'],
      thematicInterests: ['Innovation', 'Sustainability', 'Education']
    },
    aiScore: {
      profileCompleteness: 82,
      engagementLevel: 76,
      matchingPotential: 89
    },
    behaviorData: {
      profileViews: 456,
      messagesExchanged: 34,
      appointmentsScheduled: 12,
      connectionsAccepted: 28,
      lastActivity: new Date(Date.now() - 14400000)
    },
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date()
  }
];

export const useNetworkingStore = create<NetworkingState>((set, get) => ({
  profiles: [],
  recommendations: [],
  searchResults: [],
  favorites: [],
  connections: [],
  pendingRequests: [],
  sentRequests: [],
  isLoading: false,
  searchFilters: {
    sectors: [],
    regions: [],
    companySize: [],
    objectives: [],
    keywords: ''
  },

  fetchProfiles: async () => {
    set({ isLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ profiles: mockProfiles, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  },

  generateRecommendations: async (userId: string) => {
    set({ isLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate AI matching algorithm
      const currentUser = mockProfiles.find(p => p.id === userId);
      if (!currentUser) return;

      const recommendations: MatchingResult[] = mockProfiles
        .filter(p => p.id !== userId)
        .map(profile => {
          // AI Matching Algorithm Simulation
          const sectorAlignment = calculateSectorAlignment(currentUser, profile);
          const objectiveAlignment = calculateObjectiveAlignment(currentUser, profile);
          const geographicRelevance = calculateGeographicRelevance(currentUser, profile);
          const experienceLevel = calculateExperienceLevel(profile);
          const collaborationPotential = calculateCollaborationPotential(currentUser, profile);

          const overallScore = Math.round(
            (sectorAlignment * 0.3 + 
             objectiveAlignment * 0.25 + 
             geographicRelevance * 0.2 + 
             experienceLevel * 0.1 + 
             collaborationPotential * 0.15) * 100
          );

          const reasons = generateMatchingReasons(currentUser, profile, {
            sectorAlignment,
            objectiveAlignment,
            geographicRelevance,
            collaborationPotential
          });

          return {
            user: profile,
            score: overallScore,
            reasons,
            category: profile.type,
            mutualConnections: Math.floor(Math.random() * 5),
            compatibilityFactors: {
              sectorAlignment: Math.round(sectorAlignment * 100),
              objectiveAlignment: Math.round(objectiveAlignment * 100),
              geographicRelevance: Math.round(geographicRelevance * 100),
              experienceLevel: Math.round(experienceLevel * 100),
              collaborationPotential: Math.round(collaborationPotential * 100)
            }
          };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);

      set({ recommendations, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  },

  searchProfiles: async (criteria) => {
    set({ isLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const { profiles } = get();
      const filtered = profiles.filter(profile => {
        const matchesSector = !criteria.sectors?.length || 
          criteria.sectors.some((s: string) => profile.profile.sectors.includes(s));
        const matchesRegion = !criteria.regions?.length || 
          criteria.regions.includes(profile.profile.geographicLocation);
        const matchesSize = !criteria.companySize?.length || 
          criteria.companySize.includes(profile.profile.companySize);
        const matchesKeywords = !criteria.keywords || 
          profile.profile.bio?.toLowerCase().includes(criteria.keywords.toLowerCase()) ||
          profile.profile.companyDescription?.toLowerCase().includes(criteria.keywords.toLowerCase());

        return matchesSector && matchesRegion && matchesSize && matchesKeywords;
      });

      set({ searchResults: filtered, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  },

  sendConnectionRequest: async (userId, message) => {
    const { sentRequests } = get();
    set({ sentRequests: [...sentRequests, userId] });
  },

  acceptConnectionRequest: async (requestId) => {
    const { connections, pendingRequests } = get();
    set({ 
      connections: [...connections, requestId],
      pendingRequests: pendingRequests.filter(id => id !== requestId)
    });
  },

  rejectConnectionRequest: async (requestId) => {
    const { pendingRequests } = get();
    set({ pendingRequests: pendingRequests.filter(id => id !== requestId) });
  },

  addToFavorites: (userId) => {
    const { favorites } = get();
    if (!favorites.includes(userId)) {
      set({ favorites: [...favorites, userId] });
    }
  },

  removeFromFavorites: (userId) => {
    const { favorites } = get();
    set({ favorites: favorites.filter(id => id !== userId) });
  },

  updateMatchingCriteria: async (criteria) => {
    // Update user's matching criteria and regenerate recommendations
    await get().generateRecommendations('user1');
  },

  getAIInsights: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      profileOptimization: [
        'Ajoutez plus de mots-clés dans votre bio pour améliorer votre visibilité',
        'Complétez votre section produits/services pour attirer plus de partenaires'
      ],
      networkingTips: [
        'Les profils avec des objectifs similaires aux vôtres ont 3x plus de chances de répondre',
        'Personnalisez vos messages de connexion pour augmenter le taux d\'acceptation'
      ],
      trendingTopics: ['Digital Transformation', 'Green Ports', 'Automation'],
      bestTimeToConnect: '14h-16h (heure locale)'
    };
  }
}));

// AI Matching Algorithm Helper Functions
function calculateSectorAlignment(user1: NetworkingProfile, user2: NetworkingProfile): number {
  const sectors1 = user1.profile.sectors || [];
  const sectors2 = user2.profile.sectors || [];
  const intersection = sectors1.filter(s => sectors2.includes(s));
  return intersection.length / Math.max(sectors1.length, sectors2.length, 1);
}

function calculateObjectiveAlignment(user1: NetworkingProfile, user2: NetworkingProfile): number {
  const objectives1 = user1.profile.participationObjectives || [];
  const objectives2 = user2.profile.participationObjectives || [];
  const intersection = objectives1.filter(o => objectives2.includes(o));
  return intersection.length / Math.max(objectives1.length, objectives2.length, 1);
}

function calculateGeographicRelevance(user1: NetworkingProfile, user2: NetworkingProfile): number {
  const region1 = user1.profile.geographicLocation;
  const region2 = user2.profile.geographicLocation;
  
  if (region1 === region2) return 1.0;
  if ((region1 === 'Europe' && region2 === 'Africa') || 
      (region1 === 'Africa' && region2 === 'Europe')) return 0.8;
  return 0.6;
}

function calculateExperienceLevel(profile: NetworkingProfile): number {
  const yearsInBusiness = new Date().getFullYear() - new Date(profile.createdAt).getFullYear();
  return Math.min(yearsInBusiness / 10, 1.0);
}

function calculateCollaborationPotential(user1: NetworkingProfile, user2: NetworkingProfile): number {
  const types1 = user1.profile.collaborationTypes || [];
  const types2 = user2.profile.collaborationTypes || [];
  const intersection = types1.filter(t => types2.includes(t));
  return intersection.length / Math.max(types1.length, types2.length, 1);
}

function generateMatchingReasons(
  user1: NetworkingProfile, 
  user2: NetworkingProfile, 
  factors: any
): string[] {
  const reasons: string[] = [];
  
  if (factors.sectorAlignment > 0.7) {
    reasons.push('Secteurs d\'activité complémentaires');
  }
  
  if (factors.objectiveAlignment > 0.6) {
    reasons.push('Objectifs de collaboration alignés');
  }
  
  if (factors.geographicRelevance > 0.8) {
    reasons.push('Proximité géographique stratégique');
  }
  
  if (factors.collaborationPotential > 0.5) {
    reasons.push('Types de partenariat compatibles');
  }

  const commonInterests = user1.profile.thematicInterests?.filter(
    interest => user2.profile.thematicInterests?.includes(interest)
  ) || [];
  
  if (commonInterests.length > 0) {
    reasons.push(`Intérêts communs: ${commonInterests.slice(0, 2).join(', ')}`);
  }

  return reasons.slice(0, 4);
}