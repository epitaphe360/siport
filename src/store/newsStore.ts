import { create } from 'zustand';

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  category: string;
  tags: string[];
  featured: boolean;
  image?: string;
  readTime: number;
  source: 'siports' | 'external';
  sourceUrl?: string;
  views: number;
}

interface NewsState {
  articles: NewsArticle[];
  featuredArticles: NewsArticle[];
  categories: string[];
  isLoading: boolean;
  selectedCategory: string;
  searchTerm: string;
  
  // Actions
  fetchNews: () => Promise<void>;
  fetchFromOfficialSite: () => Promise<void>;
  getArticleById: (id: string) => NewsArticle | null;
  setCategory: (category: string) => void;
  setSearchTerm: (term: string) => void;
  getFilteredArticles: () => NewsArticle[];
  getArticleById: (id: string) => NewsArticle | null;
}

// Mock data basé sur le style du site officiel SIPORTS
const mockNewsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'SIPORTS 2026 : El Jadida se prépare à accueillir le plus grand salon portuaire d\'Afrique',
    excerpt: 'La ville d\'El Jadida se mobilise pour accueillir SIPORTS 2026, événement majeur qui réunira plus de 6000 professionnels du secteur portuaire.',
    content: `El Jadida, perle de la côte atlantique marocaine, se prépare à devenir le centre névralgique du secteur portuaire africain et international. Du 5 au 7 février 2026, la ville accueillera SIPORTS 2026, le Salon International des Ports, qui s'annonce comme l'événement de référence pour l'écosystème portuaire mondial.

Cette édition exceptionnelle rassemblera plus de 6000 professionnels venus des quatre coins du monde pour découvrir les dernières innovations, échanger sur les défis du secteur et nouer des partenariats stratégiques. El Jadida, avec son patrimoine maritime riche et ses infrastructures modernes, offre le cadre idéal pour cet événement d'envergure internationale.`,
    author: 'Équipe SIPORTS',
    publishedAt: new Date('2024-01-20T10:00:00'),
    category: 'Événement',
    tags: ['SIPORTS 2026', 'El Jadida', 'Salon portuaire', 'Afrique'],
    featured: true,
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: 5,
    source: 'siports',
    sourceUrl: 'https://siportevent.com/actualite-portuaire/',
    views: 2847
  },
  {
    id: '2',
    title: 'Innovation portuaire : Les technologies qui transforment les ports africains',
    excerpt: 'Découvrez les dernières innovations technologiques qui révolutionnent les opérations portuaires en Afrique et leur impact sur l\'efficacité.',
    content: `L'Afrique connaît une révolution technologique dans ses infrastructures portuaires. Des ports intelligents aux systèmes automatisés, les technologies émergentes transforment radicalement les opérations portuaires sur le continent.

Les investissements massifs dans l'intelligence artificielle, l'IoT et la blockchain révolutionnent la gestion des flux de marchandises, optimisent les temps d'attente et améliorent la sécurité des opérations portuaires.`,
    author: 'Dr. Ahmed El Mansouri',
    publishedAt: new Date('2024-01-18T14:30:00'),
    category: 'Innovation',
    tags: ['Innovation', 'Technologie', 'Ports intelligents', 'Afrique'],
    featured: true,
    image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: 7,
    source: 'siports',
    sourceUrl: 'https://siportevent.com/actualite-portuaire/',
    views: 1923
  },
  {
    id: '3',
    title: 'Partenariat stratégique : Le Maroc renforce sa position de hub logistique',
    excerpt: 'Nouveaux accords de coopération entre le Maroc et ses partenaires internationaux pour développer les infrastructures portuaires.',
    content: 'Le Royaume du Maroc consolide sa position stratégique en tant que hub logistique entre l\'Europe, l\'Afrique et les Amériques. Les récents partenariats signés témoignent de l\'ambition du pays de devenir une référence mondiale...',
    author: 'Sarah Johnson',
    publishedAt: new Date('2024-01-15T09:15:00'),
    category: 'Partenariat',
    tags: ['Maroc', 'Partenariat', 'Hub logistique', 'Coopération'],
    featured: false,
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: 4,
    source: 'siports',
    sourceUrl: 'https://siportevent.com/actualite-portuaire/',
    views: 1456
  },
  {
    id: '4',
    title: 'Développement durable : Les ports verts, enjeu majeur de demain',
    excerpt: 'Focus sur les initiatives de développement durable dans les ports mondiaux et les solutions innovantes pour réduire l\'empreinte carbone.',
    content: 'La transition écologique des ports devient une priorité mondiale. Les autorités portuaires investissent massivement dans des technologies vertes pour réduire leur impact environnemental...',
    author: 'Dr. Maria Santos',
    publishedAt: new Date('2024-01-12T16:45:00'),
    category: 'Durabilité',
    tags: ['Développement durable', 'Ports verts', 'Environnement', 'Innovation'],
    featured: false,
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: 6,
    source: 'siports',
    sourceUrl: 'https://siportevent.com/actualite-portuaire/',
    views: 1789
  },
  {
    id: '5',
    title: 'Formation maritime : Nouveaux programmes pour les métiers portuaires',
    excerpt: 'Lancement de programmes de formation innovants pour répondre aux besoins croissants en compétences du secteur portuaire.',
    content: 'Face à l\'évolution rapide des technologies portuaires, de nouveaux programmes de formation voient le jour pour préparer les professionnels aux métiers de demain...',
    author: 'Prof. Hassan Benali',
    publishedAt: new Date('2024-01-10T11:20:00'),
    category: 'Formation',
    tags: ['Formation', 'Métiers portuaires', 'Compétences', 'Éducation'],
    featured: false,
    image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: 5,
    source: 'siports',
    sourceUrl: 'https://siportevent.com/actualite-portuaire/',
    views: 1234
  },
  {
    id: '6',
    title: 'Connectivité maritime : Nouveaux corridors commerciaux en développement',
    excerpt: 'Analyse des nouveaux corridors maritimes en développement et leur impact sur le commerce international.',
    content: 'Le développement de nouveaux corridors maritimes redessine la carte du commerce international. Ces nouvelles routes offrent des opportunités inédites...',
    author: 'Capitaine Mohamed Alami',
    publishedAt: new Date('2024-01-08T13:00:00'),
    category: 'Commerce',
    tags: ['Corridors maritimes', 'Commerce international', 'Connectivité', 'Routes commerciales'],
    featured: false,
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: 8,
    source: 'siports',
    sourceUrl: 'https://siportevent.com/actualite-portuaire/',
    views: 987
  }
];

export const useNewsStore = create<NewsState>((set, get) => ({
  articles: [],
  featuredArticles: [],
  categories: [],
  isLoading: false,
  selectedCategory: '',
  searchTerm: '',

  fetchNews: async () => {
    set({ isLoading: true });
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const featuredArticles = mockNewsArticles.filter(article => article.featured);
      const categories = [...new Set(mockNewsArticles.map(article => article.category))];
      
      set({ 
        articles: mockNewsArticles,
        featuredArticles,
        categories,
        isLoading: false 
      });
    } catch (error) {
      set({ isLoading: false });
    }
  },

  fetchFromOfficialSite: async () => {
    set({ isLoading: true });
    try {
      // Simulation de récupération depuis le site officiel
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // En production, ici on ferait un appel à l'API du site officiel
      // const response = await fetch('https://siportevent.com/api/actualites');
      // const officialNews = await response.json();
      
      // Pour la simulation, on utilise les données mock
      const featuredArticles = mockNewsArticles.filter(article => article.featured);
      const categories = [...new Set(mockNewsArticles.map(article => article.category))];
      
      set({ 
        articles: mockNewsArticles,
        featuredArticles,
        categories,
        isLoading: false 
      });
    } catch (error) {
      set({ isLoading: false });
    }
  },

  setCategory: (category) => {
    set({ selectedCategory: category });
  },

  setSearchTerm: (term) => {
    set({ searchTerm: term });
  },

  getFilteredArticles: () => {
    const { articles, selectedCategory, searchTerm } = get();
    
    return articles.filter(article => {
      const matchesCategory = !selectedCategory || article.category === selectedCategory;
      const matchesSearch = !searchTerm || 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  },

  getArticleById: (id: string) => {
    const { articles } = get();
    return articles.find(article => article.id === id) || null;
  }
}));