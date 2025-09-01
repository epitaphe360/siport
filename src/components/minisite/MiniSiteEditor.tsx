import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Save,
  Eye,
  Smartphone,
  Monitor,
  Tablet,
  Plus,
  Trash2,
  Move,
  Settings,
  Palette,
  Type,
  Image,
  Layout,
  FileText,
  Mail,
  Zap,
  BarChart3,
  Globe,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader,
  Download,
  Upload,
  Copy,
  Undo,
  Redo
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { motion, AnimatePresence } from 'framer-motion';

interface Section {
  id: string;
  type: 'hero' | 'about' | 'products' | 'gallery' | 'contact' | 'news';
  title: string;
  content: any;
  visible: boolean;
  order: number;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  lastModified: Date;
}

export const MiniSiteEditor: React.FC = () => {
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'design' | 'content' | 'seo' | 'analytics'>('content');
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date>(new Date());
  
  const [sections, setSections] = useState<Section[]>([
    {
      id: '1',
      type: 'hero',
      title: 'Section Hero',
      content: {
        title: 'Port Solutions Inc.',
        subtitle: 'Leading provider of integrated port management solutions',
        backgroundImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200',
        ctaText: 'Découvrir nos solutions',
        ctaLink: '#products',
        overlay: 0.4,
        textAlign: 'left'
      },
      visible: true,
      order: 0,
      status: 'approved',
      lastModified: new Date()
    },
    {
      id: '2',
      type: 'about',
      title: 'À propos',
      content: {
        title: 'Notre expertise',
        description: 'Avec plus de 20 ans d\'expérience dans le secteur portuaire, nous accompagnons les ports du monde entier dans leur transformation digitale.',
        layout: 'two-columns',
        features: [
          'Solutions innovantes',
          'Expertise reconnue',
          'Support 24/7',
          'Présence internationale'
        ],
        stats: [
          { number: '20+', label: 'Années d\'expérience' },
          { number: '150+', label: 'Ports équipés' },
          { number: '40+', label: 'Pays' },
          { number: '500+', label: 'Clients satisfaits' }
        ],
        certifications: ['ISO 9001', 'ISO 14001', 'OHSAS 18001']
      },
      visible: true,
      order: 1,
      status: 'approved',
      lastModified: new Date()
    }
  ]);

  const [siteSettings, setSiteSettings] = useState({
    primaryColor: '#1e40af',
    secondaryColor: '#3b82f6',
    accentColor: '#60a5fa',
    fontFamily: 'Inter',
    logoUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200',
    favicon: '',
    customCSS: '',
    animations: true,
    darkMode: false
  });

  const [seoSettings, setSeoSettings] = useState({
    title: 'Port Solutions Inc. - SIPORTS 2026',
    description: 'Leading provider of integrated port management solutions',
    keywords: 'port management, maritime technology, logistics',
    ogImage: '',
    structuredData: true,
    sitemap: true
  });

  const [analytics, setAnalytics] = useState({
    views: 2156,
    uniqueVisitors: 1847,
    avgTimeOnSite: '3m 45s',
    bounceRate: '24%',
    conversionRate: '4.2%',
    topPages: [
      { page: 'Accueil', views: 1200, percentage: 55 },
      { page: 'Produits', views: 650, percentage: 30 },
      { page: 'Contact', views: 306, percentage: 15 }
    ],
    trafficSources: [
      { source: 'SIPORTS Directory', percentage: 45 },
      { source: 'Direct', percentage: 30 },
      { source: 'Search Engines', percentage: 15 },
      { source: 'Social Media', percentage: 10 }
    ]
  });

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      setIsAutoSaving(true);
      setTimeout(() => {
        setIsAutoSaving(false);
        setLastSaved(new Date());
      }, 1000);
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, []);

  const colorPalettes = [
    { name: 'Ocean Blue', primary: '#1e40af', secondary: '#3b82f6', accent: '#60a5fa' },
    { name: 'Maritime Green', primary: '#059669', secondary: '#10b981', accent: '#34d399' },
    { name: 'Port Orange', primary: '#ea580c', secondary: '#f97316', accent: '#fb923c' },
    { name: 'Industrial Gray', primary: '#374151', secondary: '#6b7280', accent: '#9ca3af' },
    { name: 'Royal Purple', primary: '#7c3aed', secondary: '#8b5cf6', accent: '#a78bfa' },
    { name: 'Sunset Red', primary: '#dc2626', secondary: '#ef4444', accent: '#f87171' }
  ];

  const fontOptions = [
    'Inter',
    'Roboto',
    'Open Sans',
    'Lato',
    'Montserrat',
    'Poppins',
    'Source Sans Pro'
  ];

  const sectionTypes = [
    { 
      type: 'hero', 
      title: 'Section Hero', 
      icon: Layout, 
      description: 'Bannière d\'accueil avec titre et CTA',
      templates: ['Classic', 'Modern', 'Minimal', 'Video Background']
    },
    { 
      type: 'about', 
      title: 'À propos', 
      icon: FileText, 
      description: 'Présentation de votre entreprise',
      templates: ['Two Columns', 'Stats Focus', 'Timeline', 'Team Showcase']
    },
    { 
      type: 'products', 
      title: 'Produits', 
      icon: Image, 
      description: 'Catalogue de vos produits et services',
      templates: ['Grid View', 'List View', 'Carousel', 'Masonry']
    },
    { 
      type: 'gallery', 
      title: 'Galerie', 
      icon: Image, 
      description: 'Photos et vidéos de votre entreprise',
      templates: ['Grid', 'Masonry', 'Slider', 'Lightbox']
    },
    { 
      type: 'news', 
      title: 'Actualités', 
      icon: FileText, 
      description: 'Dernières nouvelles et annonces',
      templates: ['Blog Style', 'Card Grid', 'Timeline', 'Featured']
    },
    { 
      type: 'contact', 
      title: 'Contact', 
      icon: Mail, 
      description: 'Informations de contact et formulaire',
      templates: ['Form + Info', 'Map Focus', 'Team Contact', 'Simple']
    }
  ];

  const addSection = (type: Section['type'], template?: string) => {
    const newSection: Section = {
      id: Date.now().toString(),
      type,
      title: sectionTypes.find(s => s.type === type)?.title || 'Nouvelle section',
      content: getDefaultContent(type, template),
      visible: true,
      order: sections.length,
      status: 'draft',
      lastModified: new Date()
    };
    setSections([...sections, newSection]);
  };

  const getDefaultContent = (type: Section['type'], template?: string) => {
    switch (type) {
      case 'hero':
        return {
          title: 'Votre titre',
          subtitle: 'Votre sous-titre',
          backgroundImage: '',
          ctaText: 'En savoir plus',
          ctaLink: '#',
          overlay: 0.4,
          textAlign: 'center',
          template: template || 'Classic'
        };
      case 'about':
        return {
          title: 'À propos de nous',
          description: 'Décrivez votre entreprise ici...',
          layout: template || 'two-columns',
          features: [],
          stats: [],
          certifications: []
        };
      case 'products':
        return {
          title: 'Nos produits',
          layout: template || 'grid',
          products: []
        };
      case 'gallery':
        return {
          title: 'Galerie',
          layout: template || 'grid',
          images: []
        };
      case 'news':
        return {
          title: 'Actualités',
          layout: template || 'blog',
          articles: []
        };
      case 'contact':
        return {
          title: 'Contactez-nous',
          layout: template || 'form-info',
          address: '',
          phone: '',
          email: '',
          showForm: true,
          showMap: false
        };
      default:
        return {};
    }
  };

  const removeSection = (id: string) => {
    setSections(sections.filter(s => s.id !== id));
  };

  const toggleSectionVisibility = (id: string) => {
    setSections(sections.map(s => 
      s.id === id ? { ...s, visible: !s.visible } : s
    ));
  };

  const updateSectionContent = (id: string, content: any) => {
    setSections(sections.map(s => 
      s.id === id ? { ...s, content, lastModified: new Date(), status: 'draft' } : s
    ));
  };

  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile': return 'w-80';
      case 'tablet': return 'w-96';
      case 'desktop': return 'w-full';
      default: return 'w-full';
    }
  };

  const generateAIContent = async (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return;

    // Simulation de génération IA
    setTimeout(() => {
      let aiContent = {};
      
      switch (section.type) {
        case 'hero':
          aiContent = {
            title: 'Solutions Portuaires Innovantes',
            subtitle: 'Transformez vos opérations portuaires avec nos technologies de pointe',
            ctaText: 'Découvrir nos innovations'
          };
          break;
        case 'about':
          aiContent = {
            title: 'Excellence & Innovation Portuaire',
            description: 'Leader mondial des solutions de gestion portuaire, nous accompagnons plus de 500 ports dans leur transformation digitale. Notre expertise reconnue et nos innovations technologiques font de nous le partenaire de choix pour optimiser vos opérations portuaires.',
            features: [
              'Technologies de pointe',
              'Expertise internationale',
              'Support technique 24/7',
              'Formation continue',
              'ROI garanti',
              'Conformité internationale'
            ]
          };
          break;
        case 'products':
          aiContent = {
            title: 'Nos Solutions Technologiques',
            products: [
              {
                name: 'SmartPort AI Platform',
                description: 'Plateforme IA complète pour l\'optimisation des opérations portuaires',
                category: 'Intelligence Artificielle',
                price: 'Sur devis'
              }
            ]
          };
          break;
      }
      
      updateSectionContent(sectionId, { ...section.content, ...aiContent });
      alert('✅ CONTENU IA GÉNÉRÉ\n\n🎯 Contenu optimisé pour votre secteur\n📈 SEO amélioré automatiquement\n🌍 Adapté au public international\n✨ Prêt pour validation\n\n💡 Vous pouvez encore personnaliser !');
    }, 1500);
  };

  const handleSave = async () => {
    setIsAutoSaving(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLastSaved(new Date());
      alert('✅ MINI-SITE SAUVEGARDÉ\n\n📝 Toutes les modifications enregistrées\n🔄 Synchronisation automatique activée\n📊 Analytics mis à jour\n\n🎯 Votre mini-site est prêt !');
    } catch (error) {
      alert('❌ Erreur lors de la sauvegarde');
    } finally {
      setIsAutoSaving(false);
    }
  };

  const handlePreview = () => {
    window.open('/minisite/1', '_blank');
  };

  const submitForValidation = async () => {
    const pendingSections = sections.filter(s => s.status === 'draft').length;
    
    if (pendingSections === 0) {
      alert('✅ AUCUNE MODIFICATION EN ATTENTE\n\n📝 Toutes vos sections sont déjà validées\n🎯 Votre mini-site est publié\n\n💡 Modifiez du contenu pour soumettre de nouvelles validations');
      return;
    }
    
    // Marquer toutes les sections draft comme pending
    setSections(sections.map(s => 
      s.status === 'draft' ? { ...s, status: 'pending' } : s
    ));
    
    alert(`📋 SOUMISSION POUR VALIDATION\n\n✅ ${pendingSections} section(s) soumise(s)\n⏱️ Délai de validation: 24-48h\n📧 Notification par email\n🔄 Statut visible en temps réel\n\n👨‍💼 Équipe de modération notifiée !`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au Tableau de Bord Exposant
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Éditeur de Mini-Site Avancé
            </h1>
            <p className="text-gray-600">
              Créez une vitrine digitale professionnelle pour SIPORTS 2026
            </p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-2">
                {isAutoSaving ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin text-blue-600" />
                    <span className="text-sm text-blue-600">Sauvegarde...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">
                      Dernière sauvegarde: {lastSaved.toLocaleTimeString('fr-FR')}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Preview Mode Selector */}
            <div className="flex items-center space-x-2 bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setPreviewMode('desktop')}
                className={`p-2 rounded ${previewMode === 'desktop' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                title="Aperçu Desktop"
              >
                <Monitor className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPreviewMode('tablet')}
                className={`p-2 rounded ${previewMode === 'tablet' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                title="Aperçu Tablette"
              >
                <Tablet className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPreviewMode('mobile')}
                className={`p-2 rounded ${previewMode === 'mobile' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                title="Aperçu Mobile"
              >
                <Smartphone className="h-4 w-4" />
              </button>
            </div>

            <Button variant="outline" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-2" />
              Prévisualiser
            </Button>
            
            <Button onClick={handleSave} disabled={isAutoSaving}>
              <Save className="h-4 w-4 mr-2" />
              Sauvegarder
            </Button>

            <Button 
              onClick={submitForValidation}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Soumettre pour Validation
            </Button>
          </div>
        </div>

        {/* Main Editor Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Tools & Settings */}
          <div className="lg:col-span-1 space-y-6">
            {/* Navigation Tabs */}
            <Card>
              <div className="p-4">
                <nav className="space-y-2">
                  {[
                    { id: 'content', label: 'Contenu', icon: FileText },
                    { id: 'design', label: 'Design', icon: Palette },
                    { id: 'seo', label: 'SEO', icon: Globe },
                    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <tab.icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </Card>

            {/* Content Tab */}
            {activeTab === 'content' && (
              <>
                {/* Add Sections */}
                <Card>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter une section
                    </h3>
                    
                    <div className="space-y-2">
                      {sectionTypes.map((sectionType) => (
                        <div key={sectionType.type} className="group">
                          <button
                            onClick={() => addSection(sectionType.type)}
                            className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <sectionType.icon className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {sectionType.title}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {sectionType.description}
                                </p>
                              </div>
                            </div>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Sections List */}
                <Card>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Sections ({sections.length})
                    </h3>
                    
                    <div className="space-y-2">
                      {sections.map((section) => (
                        <div
                          key={section.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            activeSection === section.id 
                              ? 'border-blue-300 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setActiveSection(section.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Move className="h-4 w-4 text-gray-400 cursor-move" />
                              <span className="text-sm font-medium text-gray-900">
                                {section.title}
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleSectionVisibility(section.id);
                                }}
                                className={`p-1 rounded ${
                                  section.visible ? 'text-green-600' : 'text-gray-400'
                                }`}
                                title={section.visible ? 'Masquer' : 'Afficher'}
                              >
                                <Eye className="h-3 w-3" />
                              </button>
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  generateAIContent(section.id);
                                }}
                                className="p-1 rounded text-purple-600 hover:bg-purple-50"
                                title="Générer contenu IA"
                              >
                                <Zap className="h-3 w-3" />
                              </button>
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeSection(section.id);
                                }}
                                className="p-1 rounded text-red-600 hover:bg-red-50"
                                title="Supprimer"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="mt-2 flex items-center space-x-2">
                            <Badge variant="info" size="sm">
                              {section.type}
                            </Badge>
                            <Badge 
                              variant={
                                section.status === 'approved' ? 'success' :
                                section.status === 'pending' ? 'warning' :
                                section.status === 'rejected' ? 'error' : 'default'
                              } 
                              size="sm"
                            >
                              {section.status === 'approved' ? 'Validé' :
                               section.status === 'pending' ? 'En attente' :
                               section.status === 'rejected' ? 'Rejeté' : 'Brouillon'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </>
            )}

            {/* Design Tab */}
            {activeTab === 'design' && (
              <>
                {/* Color Palettes */}
                <Card>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Palettes de Couleurs
                    </h3>
                    
                    <div className="space-y-3">
                      {colorPalettes.map((palette) => (
                        <button
                          key={palette.name}
                          onClick={() => setSiteSettings({
                            ...siteSettings,
                            primaryColor: palette.primary,
                            secondaryColor: palette.secondary,
                            accentColor: palette.accent
                          })}
                          className="w-full p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex space-x-1">
                              <div 
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: palette.primary }}
                              />
                              <div 
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: palette.secondary }}
                              />
                              <div 
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: palette.accent }}
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {palette.name}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Typography */}
                <Card>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Typographie
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Police principale
                        </label>
                        <select
                          value={siteSettings.fontFamily}
                          onChange={(e) => setSiteSettings({...siteSettings, fontFamily: e.target.value})}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {fontOptions.map((font) => (
                            <option key={font} value={font} style={{ fontFamily: font }}>
                              {font}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Advanced Settings */}
                <Card>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Paramètres Avancés
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Animations</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={siteSettings.animations}
                            onChange={(e) => setSiteSettings({...siteSettings, animations: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Mode sombre</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={siteSettings.darkMode}
                            onChange={(e) => setSiteSettings({...siteSettings, darkMode: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {/* SEO Tab */}
            {activeTab === 'seo' && (
              <Card>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Optimisation SEO
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Titre SEO
                      </label>
                      <input
                        type="text"
                        value={seoSettings.title}
                        onChange={(e) => setSeoSettings({...seoSettings, title: e.target.value})}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Titre pour les moteurs de recherche"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {seoSettings.title.length}/60 caractères
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description SEO
                      </label>
                      <textarea
                        value={seoSettings.description}
                        onChange={(e) => setSeoSettings({...seoSettings, description: e.target.value})}
                        rows={3}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Description pour les moteurs de recherche"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {seoSettings.description.length}/160 caractères
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mots-clés
                      </label>
                      <input
                        type="text"
                        value={seoSettings.keywords}
                        onChange={(e) => setSeoSettings({...seoSettings, keywords: e.target.value})}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="mot-clé1, mot-clé2, mot-clé3"
                      />
                    </div>

                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                        alert('🤖 OPTIMISATION SEO IA\n\n✅ Analyse du contenu terminée\n📈 Score SEO: 85/100\n🎯 Suggestions appliquées\n🔍 Mots-clés optimisés\n\n💡 Votre mini-site est optimisé pour les moteurs de recherche !');
                      }}
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      Optimiser avec IA
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <Card>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Analytics en Temps Réel
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {analytics.views.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600">Vues totales</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-gray-900">
                          {analytics.uniqueVisitors.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600">Visiteurs uniques</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-900">
                          {analytics.conversionRate}
                        </div>
                        <div className="text-xs text-gray-600">Taux conversion</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Pages populaires
                      </h4>
                      <div className="space-y-2">
                        {analytics.topPages.map((page, idx) => (
                          <div key={idx} className="flex justify-between text-xs">
                            <span className="text-gray-600">{page.page}</span>
                            <span className="font-medium">{page.percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                        alert('📊 RAPPORT ANALYTICS DÉTAILLÉ\n\n📈 Vues: ' + analytics.views.toLocaleString() + '\n👥 Visiteurs uniques: ' + analytics.uniqueVisitors.toLocaleString() + '\n⏱️ Temps moyen: ' + analytics.avgTimeOnSite + '\n📉 Taux de rebond: ' + analytics.bounceRate + '\n💰 Conversion: ' + analytics.conversionRate + '\n\n📋 Rapport complet généré !');
                      }}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Rapport Complet
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Main Content - Preview */}
          <div className="lg:col-span-3">
            <Card className="p-6">
              <div className="flex justify-center">
                <div className={`${getPreviewWidth()} transition-all duration-300`}>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                    {/* Preview Header */}
                    <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        </div>
                        <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-500">
                          siports.com/exhibitor/port-solutions-inc
                        </div>
                      </div>
                    </div>

                    {/* Preview Content */}
                    <div className="min-h-96">
                      {sections
                        .filter(s => s.visible)
                        .sort((a, b) => a.order - b.order)
                        .map((section) => (
                          <motion.div
                            key={section.id}
                            className={`border-2 border-transparent hover:border-blue-300 transition-colors relative ${
                              activeSection === section.id ? 'border-blue-500' : ''
                            }`}
                            onClick={() => setActiveSection(section.id)}
                          >
                            {/* Section Status Indicator */}
                            <div className="absolute top-2 right-2 z-10">
                              <Badge 
                                variant={
                                  section.status === 'approved' ? 'success' :
                                  section.status === 'pending' ? 'warning' :
                                  section.status === 'rejected' ? 'error' : 'default'
                                } 
                                size="sm"
                              >
                                {section.status === 'approved' ? 'Validé' :
                                 section.status === 'pending' ? 'En attente' :
                                 section.status === 'rejected' ? 'Rejeté' : 'Brouillon'}
                              </Badge>
                            </div>

                            {/* Hero Section */}
                            {section.type === 'hero' && (
                              <div 
                                className="relative h-64 bg-cover bg-center flex items-center justify-center"
                                style={{ 
                                  backgroundImage: section.content.backgroundImage 
                                    ? `url(${section.content.backgroundImage})` 
                                    : 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)'
                                }}
                              >
                                <div 
                                  className="absolute inset-0 bg-black"
                                  style={{ opacity: section.content.overlay || 0.4 }}
                                ></div>
                                <div className={`relative text-center text-white px-6 ${
                                  section.content.textAlign === 'left' ? 'text-left' : 
                                  section.content.textAlign === 'right' ? 'text-right' : 'text-center'
                                }`}>
                                  <h1 className="text-3xl font-bold mb-4">
                                    {section.content.title}
                                  </h1>
                                  <p className="text-lg mb-6 opacity-90">
                                    {section.content.subtitle}
                                  </p>
                                  <button 
                                    className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                                    style={{ color: siteSettings.primaryColor }}
                                  >
                                    {section.content.ctaText}
                                  </button>
                                </div>
                              </div>
                            )}

                            {/* About Section */}
                            {section.type === 'about' && (
                              <div className="p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                  {section.content.title}
                                </h2>
                                
                                <div className={`${
                                  section.content.layout === 'two-columns' ? 'grid grid-cols-1 md:grid-cols-2 gap-8' : ''
                                }`}>
                                  <div>
                                    <p className="text-gray-600 mb-6">
                                      {section.content.description}
                                    </p>
                                    
                                    {section.content.features.length > 0 && (
                                      <div className="grid grid-cols-2 gap-4">
                                        {section.content.features.map((feature: string, index: number) => (
                                          <div key={index} className="flex items-center space-x-2">
                                            <div 
                                              className="w-2 h-2 rounded-full"
                                              style={{ backgroundColor: siteSettings.primaryColor }}
                                            ></div>
                                            <span className="text-sm text-gray-700">{feature}</span>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                  
                                  {section.content.layout === 'two-columns' && section.content.stats.length > 0 && (
                                    <div className="grid grid-cols-2 gap-4">
                                      {section.content.stats.map((stat: any, index: number) => (
                                        <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                                          <div className="text-2xl font-bold text-blue-600 mb-1">
                                            {stat.number}
                                          </div>
                                          <div className="text-sm text-gray-600">{stat.label}</div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Products Section */}
                            {section.type === 'products' && (
                              <div className="p-8 bg-gray-50">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                  {section.content.title}
                                </h2>
                                <div className={`${
                                  section.content.layout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' :
                                  section.content.layout === 'list' ? 'space-y-6' :
                                  'grid grid-cols-1 md:grid-cols-2 gap-6'
                                }`}>
                                  {section.content.products.map((product: any, index: number) => (
                                    <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                                      <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-32 object-cover rounded-lg mb-4"
                                      />
                                      <h3 className="font-semibold text-gray-900 mb-2">
                                        {product.name}
                                      </h3>
                                      <p className="text-gray-600 text-sm mb-4">
                                        {product.description}
                                      </p>
                                      <div className="flex flex-wrap gap-1 mb-4">
                                        {product.features.map((feature: string, idx: number) => (
                                          <Badge key={idx} variant="info" size="sm">
                                            {feature}
                                          </Badge>
                                        ))}
                                      </div>
                                      {product.price && (
                                        <div className="text-lg font-bold text-blue-600 mb-3">
                                          {product.price}
                                        </div>
                                      )}
                                      <Button size="sm" className="w-full">
                                        Demander un devis
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Gallery Section */}
                            {section.type === 'gallery' && (
                              <div className="p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                  {section.content.title}
                                </h2>
                                <div className={`${
                                  section.content.layout === 'masonry' ? 'columns-1 md:columns-2 lg:columns-3 gap-6' :
                                  'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                                }`}>
                                  {section.content.images.map((image: string, index: number) => (
                                    <div key={index} className="mb-6 break-inside-avoid">
                                      <img
                                        src={image}
                                        alt={`Galerie ${index + 1}`}
                                        className="w-full rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Contact Section */}
                            {section.type === 'contact' && (
                              <div className="p-8 bg-gray-50">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                  {section.content.title}
                                </h2>
                                
                                <div className={`${
                                  section.content.layout === 'form-info' ? 'grid grid-cols-1 lg:grid-cols-2 gap-8' : ''
                                }`}>
                                  {/* Contact Info */}
                                  <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                      Informations de contact
                                    </h3>
                                    <div className="space-y-3">
                                      {section.content.address && (
                                        <div className="flex items-center space-x-3">
                                          <MapPin className="h-5 w-5 text-blue-600" />
                                          <span className="text-gray-700">{section.content.address}</span>
                                        </div>
                                      )}
                                      {section.content.phone && (
                                        <div className="flex items-center space-x-3">
                                          <Phone className="h-5 w-5 text-blue-600" />
                                          <span className="text-gray-700">{section.content.phone}</span>
                                        </div>
                                      )}
                                      {section.content.email && (
                                        <div className="flex items-center space-x-3">
                                          <Mail className="h-5 w-5 text-blue-600" />
                                          <span className="text-gray-700">{section.content.email}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  
                                  {/* Contact Form */}
                                  {section.content.showForm && (
                                    <div>
                                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Envoyez-nous un message
                                      </h3>
                                      <form className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                          <input
                                            type="text"
                                            placeholder="Nom"
                                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                          />
                                          <input
                                            type="email"
                                            placeholder="Email"
                                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                          />
                                        </div>
                                        <input
                                          type="text"
                                          placeholder="Sujet"
                                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <textarea
                                          rows={4}
                                          placeholder="Message"
                                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <Button className="w-full">
                                          Envoyer le message
                                        </Button>
                                      </form>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      
                      {sections.filter(s => s.visible).length === 0 && (
                        <div className="flex items-center justify-center h-64 text-gray-500">
                          <div className="text-center">
                            <Layout className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>Ajoutez des sections pour commencer à créer votre mini-site</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};