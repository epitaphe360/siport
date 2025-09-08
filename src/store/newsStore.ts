import { create } from 'zustand';
import { SupabaseService } from '../services/supabaseService';

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
  createNewsArticle: (articleData: Partial<NewsArticle>) => Promise<void>;
  updateNewsArticle: (id: string, updates: Partial<NewsArticle>) => Promise<void>;
  deleteNewsArticle: (id: string) => Promise<void>;
}


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
      // Récupérer les articles depuis Supabase
      const articles = await SupabaseService.getNewsArticles();
      
      const featuredArticles = articles.filter(article => article.featured);
      const categories = [...new Set(articles.map(article => article.category))];
      
      set({ 
        articles,
        featuredArticles,
        categories,
        isLoading: false 
      });
    } catch (error) {
      console.error('Erreur chargement articles:', error);
      set({ isLoading: false });
    }
  },

  fetchFromOfficialSite: async () => {
    set({ isLoading: true });
    try {
      // Récupérer les articles depuis Supabase
      const articles = await SupabaseService.getNewsArticles();
      
      const featuredArticles = articles.filter(article => article.featured);
      const categories = [...new Set(articles.map(article => article.category))];
      
      set({ 
        articles,
        featuredArticles,
        categories,
        isLoading: false 
      });
    } catch (error) {
      console.error('Erreur synchronisation articles:', error);
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
  },

  createNewsArticle: async (articleData: Partial<NewsArticle>) => {
    set({ isLoading: true });
    
    try {
      const newArticle = await SupabaseService.createNewsArticle(articleData);
      
      const { articles } = get();
      const updatedArticles = [newArticle, ...articles];
      const featuredArticles = updatedArticles.filter(article => article.featured);
      const categories = [...new Set(updatedArticles.map(article => article.category))];
      
      set({ 
        articles: updatedArticles,
        featuredArticles,
        categories,
        isLoading: false 
      });
    } catch (error) {
      console.error('Erreur création article:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  updateNewsArticle: async (id: string, updates: Partial<NewsArticle>) => {
    try {
      const updatedArticle = await SupabaseService.updateNewsArticle(id, updates);
      
      const { articles } = get();
      const updatedArticles = articles.map(article => 
        article.id === id ? updatedArticle : article
      );
      const featuredArticles = updatedArticles.filter(article => article.featured);
      
      set({ 
        articles: updatedArticles,
        featuredArticles
      });
    } catch (error) {
      console.error('Erreur mise à jour article:', error);
      throw error;
    }
  },

  deleteNewsArticle: async (id: string) => {
    try {
      await SupabaseService.deleteNewsArticle(id);
      
      const { articles } = get();
      const updatedArticles = articles.filter(article => article.id !== id);
      const featuredArticles = updatedArticles.filter(article => article.featured);
      
      set({ 
        articles: updatedArticles,
        featuredArticles
      });
    } catch (error) {
      console.error('Erreur suppression article:', error);
      throw error;
    }
  }
}));