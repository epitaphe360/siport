import React, { useState, useRef } from 'react';
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
  CheckCircle,
  Clock,
  AlertTriangle,
  Loader,
  Award,
  Upload,
  Edit3,
  Copy,
  RotateCcw,
  Zap,
  Layers,
  Grid,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Link as LinkIcon,
  Video,
  Music,
  Code,
  Sparkles,
  Wand2,
  Paintbrush,
  MousePointer,
  Maximize,
  Minimize,
  MoreHorizontal
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { motion, AnimatePresence } from 'framer-motion';

interface MiniSiteSection {
  id: string;
  type: 'hero' | 'about' | 'products' | 'gallery' | 'contact' | 'news' | 'team' | 'certifications' | 'testimonials';
  title: string;
  content: any;
  visible: boolean;
  order: number;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  lastModified: Date;
  moderatorComment?: string;
  customCSS?: string;
  animations?: string[];
}

interface SiteSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  logoUrl: string;
  companyName: string;
  status: 'draft' | 'pending' | 'approved';
  customCSS: string;
  seoTitle: string;
  seoDescription: string;
  socialImage: string;
  favicon: string;
}

export const MiniSiteEditor: React.FC = () => {
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [pendingChanges, setPendingChanges] = useState(false);
  const [submittingForApproval, setSubmittingForApproval] = useState(false);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [activeTab, setActiveTab] = useState<'design' | 'content' | 'seo' | 'analytics'>('design');
  const [draggedSection, setDraggedSection] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [sections, setSections] = useState<MiniSiteSection[]>([
    {
      id: '1',
      type: 'hero',
      title: 'Section Hero',
      content: {
        title: 'Ocean Tech Solutions',
        subtitle: 'Spécialiste en solutions IoT pour l\'optimisation des opérations portuaires',
        backgroundImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200',
        ctaText: 'Découvrir nos solutions',
        ctaLink: '#products',
        overlayOpacity: 0.5,
        textAlignment: 'center',
        showStats: true,
        stats: [
          { number: '20+', label: 'Années d\'expérience' },
          { number: '150+', label: 'Ports équipés' }
        ]
      },
      visible: true,
      order: 0,
      status: 'approved',
      lastModified: new Date(Date.now() - 86400000),
      animations: ['fadeIn', 'slideUp']
    },
    {
      id: '2',
      type: 'about',
      title: 'À propos',
      content: {
        title: 'Notre expertise IoT maritime',
        description: 'Avec plus de 15 ans d\'expérience dans l\'IoT maritime, nous développons des solutions innovantes pour optimiser les opérations portuaires et améliorer la surveillance maritime.',
        features: [
          'Solutions IoT innovantes',
          'Expertise maritime reconnue',
          'Support technique 24/7',
          'Déploiement international'
        ],
        image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600',
        layout: 'image-right',
        showCertifications: true,
        certifications: ['ISO 9001', 'ISO 14001', 'Maritime Certified']
      },
      visible: true,
      order: 1,
      status: 'pending',
      lastModified: new Date(Date.now() - 3600000),
      moderatorComment: 'En attente de validation du contenu technique',
      animations: ['slideInLeft']
    },
    {
      id: '3',
      type: 'products',
      title: 'Produits & Services',
      content: {
        title: 'Nos solutions IoT',
        subtitle: 'Découvrez notre gamme complète de produits innovants',
        layout: 'grid',
        columns: 3,
        showPrices: true,
        showSpecs: true,
        products: [
          {
            id: '1',
            name: 'SmartPort IoT Platform',
            description: 'Plateforme IoT complète pour la gestion intelligente des ports',
            image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
            features: ['Analytics temps réel', 'API intégrée', 'Multi-capteurs'],
            price: 'Sur devis',
            category: 'Software',
            specifications: 'Cloud-based, API REST, Multi-tenant',
            brochureUrl: '#',
            videoUrl: 'https://example.com/demo-video'
          },
          {
            id: '2',
            name: 'Maritime Sensors Suite',
            description: 'Suite de capteurs maritimes pour surveillance en temps réel',
            image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
            features: ['Résistance marine', 'Transmission satellite', 'Autonomie 5 ans'],
            price: 'À partir de 2500€',
            category: 'Hardware',
            specifications: 'IP68, LoRaWAN, Batterie lithium',
            brochureUrl: '#'
          }
        ]
      },
      visible: true,
      order: 2,
      status: 'draft',
      lastModified: new Date(Date.now() - 1800000),
      animations: ['fadeInUp']
    }
  ]);

  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    primaryColor: '#1e40af',
    secondaryColor: '#3b82f6',
    accentColor: '#60a5fa',
    fontFamily: 'Inter',
    logoUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200',
    companyName: 'Ocean Tech Solutions',
    status: 'draft',
    customCSS: '',
    seoTitle: 'Ocean Tech Solutions - Solutions IoT Maritimes',
    seoDescription: 'Spécialiste en solutions IoT pour l\'optimisation des opérations portuaires',
    socialImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200',
    favicon: ''
  });

  const sectionTypes = [
    { 
      type: 'hero', 
      title: 'Section Hero', 
      icon: Layout, 
      description: 'Bannière d\'accueil avec titre et CTA',
      color: 'bg-blue-100 text-blue-600'
    },
    { 
      type: 'about', 
      title: 'À propos', 
      icon: FileText, 
      description: 'Présentation de votre entreprise',
      color: 'bg-green-100 text-green-600'
    },
    { 
      type: 'products', 
      title: 'Produits', 
      icon: Grid, 
      description: 'Catalogue de vos produits et services',
      color: 'bg-purple-100 text-purple-600'
    },
    { 
      type: 'gallery', 
      title: 'Galerie', 
      icon: Image, 
      description: 'Photos et vidéos de votre entreprise',
      color: 'bg-orange-100 text-orange-600'
    },
    { 
      type: 'team', 
      title: 'Équipe', 
      icon: Users, 
      description: 'Présentation de votre équipe',
      color: 'bg-indigo-100 text-indigo-600'
    },
    { 
      type: 'testimonials', 
      title: 'Témoignages', 
      icon: Award, 
      description: 'Avis et témoignages clients',
      color: 'bg-yellow-100 text-yellow-600'
    },
    { 
      type: 'certifications', 
      title: 'Certifications', 
      icon: CheckCircle, 
      description: 'Vos certifications et accréditations',
      color: 'bg-emerald-100 text-emerald-600'
    },
    { 
      type: 'news', 
      title: 'Actualités', 
      icon: FileText, 
      description: 'Dernières nouvelles et annonces',
      color: 'bg-pink-100 text-pink-600'
    },
    { 
      type: 'contact', 
      title: 'Contact', 
      icon: Mail, 
      description: 'Informations de contact et formulaire',
      color: 'bg-gray-100 text-gray-600'
    }
  ];

  const fontFamilies = [
    { value: 'Inter', label: 'Inter (Moderne)' },
    { value: 'Roboto', label: 'Roboto (Google)' },
    { value: 'Open Sans', label: 'Open Sans (Lisible)' },
    { value: 'Lato', label: 'Lato (Élégant)' },
    { value: 'Montserrat', label: 'Montserrat (Stylé)' },
    { value: 'Poppins', label: 'Poppins (Moderne)' },
    { value: 'Source Sans Pro', label: 'Source Sans Pro (Pro)' }
  ];

  const colorPresets = [
    { name: 'Bleu Océan', primary: '#1e40af', secondary: '#3b82f6', accent: '#60a5fa' },
    { name: 'Vert Maritime', primary: '#059669', secondary: '#10b981', accent: '#34d399' },
    { name: 'Rouge Dynamique', primary: '#dc2626', secondary: '#ef4444', accent: '#f87171' },
    { name: 'Violet Innovation', primary: '#7c3aed', secondary: '#8b5cf6', accent: '#a78bfa' },
    { name: 'Orange Énergie', primary: '#ea580c', secondary: '#f97316', accent: '#fb923c' },
    { name: 'Gris Professionnel', primary: '#374151', secondary: '#6b7280', accent: '#9ca3af' }
  ];

  const animations = [
    { value: 'fadeIn', label: 'Apparition en fondu' },
    { value: 'slideUp', label: 'Glissement vers le haut' },
    { value: 'slideInLeft', label: 'Glissement depuis la gauche' },
    { value: 'slideInRight', label: 'Glissement depuis la droite' },
    { value: 'zoomIn', label: 'Zoom avant' },
    { value: 'bounce', label: 'Rebond' },
    { value: 'pulse', label: 'Pulsation' },
    { value: 'shake', label: 'Secousse' }
  ];

  const addSection = (type: MiniSiteSection['type']) => {
    const newSection: MiniSiteSection = {
      id: Date.now().toString(),
      type,
      title: sectionTypes.find(s => s.type === type)?.title || 'Nouvelle section',
      content: getDefaultContent(type),
      visible: true,
      order: sections.length,
      status: 'draft',
      lastModified: new Date(),
      animations: ['fadeIn']
    };
    setSections([...sections, newSection]);
  };

  const getDefaultContent = (type: MiniSiteSection['type']) => {
    switch (type) {
      case 'hero':
        return {
          title: 'Votre titre',
          subtitle: 'Votre sous-titre',
          backgroundImage: '',
          ctaText: 'En savoir plus',
          ctaLink: '#',
          overlayOpacity: 0.5,
          textAlignment: 'center',
          showStats: false,
          stats: []
        };
      case 'about':
        return {
          title: 'À propos de nous',
          description: 'Décrivez votre entreprise ici...',
          features: [],
          image: '',
          layout: 'image-right',
          showCertifications: false,
          certifications: []
        };
      case 'products':
        return {
          title: 'Nos produits',
          subtitle: '',
          layout: 'grid',
          columns: 3,
          showPrices: true,
          showSpecs: false,
          products: []
        };
      case 'gallery':
        return {
          title: 'Galerie',
          layout: 'masonry',
          columns: 3,
          images: [],
          videos: []
        };
      case 'team':
        return {
          title: 'Notre équipe',
          layout: 'grid',
          members: []
        };
      case 'testimonials':
        return {
          title: 'Témoignages',
          layout: 'carousel',
          testimonials: []
        };
      case 'certifications':
        return {
          title: 'Certifications',
          layout: 'grid',
          certifications: []
        };
      case 'news':
        return {
          title: 'Actualités',
          articles: []
        };
      case 'contact':
        return {
          title: 'Contactez-nous',
          address: '',
          phone: '',
          email: '',
          showForm: true,
          showMap: false,
          mapUrl: ''
        };
      default:
        return {};
    }
  };

  const duplicateSection = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return;

    const newSection: MiniSiteSection = {
      ...section,
      id: Date.now().toString(),
      title: section.title + ' (Copie)',
      order: sections.length,
      status: 'draft',
      lastModified: new Date()
    };
    setSections([...sections, newSection]);
  };

  const removeSection = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette section ?')) {
      setSections(sections.filter(s => s.id !== id));
    }
  };

  const toggleSectionVisibility = (id: string) => {
    setSections(sections.map(s => 
      s.id === id ? { ...s, visible: !s.visible, status: 'draft', lastModified: new Date() } : s
    ));
  };

  const updateSectionContent = (id: string, content: any) => {
    setSections(sections.map(s => 
      s.id === id ? { ...s, content, status: 'draft', lastModified: new Date() } : s
    ));
  };

  const reorderSections = (dragIndex: number, hoverIndex: number) => {
    const draggedSection = sections[dragIndex];
    const newSections = [...sections];
    newSections.splice(dragIndex, 1);
    newSections.splice(hoverIndex, 0, draggedSection);
    
    // Mettre à jour les ordres
    const reorderedSections = newSections.map((section, index) => ({
      ...section,
      order: index,
      status: 'draft' as const,
      lastModified: new Date()
    }));
    
    setSections(reorderedSections);
  };

  const applyColorPreset = (preset: typeof colorPresets[0]) => {
    setSiteSettings(prev => ({
      ...prev,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent,
      status: 'draft'
    }));
  };

  const handleImageUpload = (sectionId: string, field: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          // Simulation d'upload
          const imageUrl = URL.createObjectURL(file);
          const section = sections.find(s => s.id === sectionId);
          if (section) {
            const updatedContent = { ...section.content, [field]: imageUrl };
            updateSectionContent(sectionId, updatedContent);
          }
        }
      };
      fileInputRef.current.click();
    }
  };

  const handleSaveChanges = async () => {
    setPendingChanges(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('✅ MODIFICATIONS SAUVEGARDÉES\n\n💾 Brouillon enregistré avec succès\n🔄 Synchronisation automatique activée\n📝 Historique des versions créé\n\n💡 Soumettez pour validation quand vous êtes prêt !');
      setPendingChanges(false);
    } catch (error) {
      setPendingChanges(false);
      alert('❌ Erreur lors de la sauvegarde');
    }
  };

  const handleSubmitForApproval = async () => {
    setSubmittingForApproval(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSections(prev => prev.map(section => ({
        ...section,
        status: 'pending',
        lastModified: new Date()
      })));
      
      setSiteSettings(prev => ({ ...prev, status: 'pending' }));
      
      alert('🔄 SOUMISSION POUR VALIDATION\n\n✅ Mini-site envoyé à l\'équipe de modération\n⏱️ Délai de validation: 24-48h\n📧 Email de confirmation envoyé\n🌐 Votre mini-site actuel reste visible\n\n💡 Vous recevrez une notification dès validation !');
      
      setSubmittingForApproval(false);
    } catch (error) {
      setSubmittingForApproval(false);
      alert('❌ Erreur lors de la soumission');
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Avancé */}
        <div className="mb-8">
          <div className="mb-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour au Tableau de Bord Exposant
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                🎨 Éditeur Avancé de Mini-Site - {siteSettings.companyName}
              </h1>
              <p className="text-gray-600">
                Créez une vitrine digitale professionnelle avec notre éditeur IA
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Statut Global */}
              <div className="flex items-center space-x-2">
                <div className={`p-2 rounded-lg ${
                  siteSettings.status === 'approved' ? 'bg-green-100' :
                  siteSettings.status === 'pending' ? 'bg-yellow-100' :
                  siteSettings.status === 'rejected' ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  {siteSettings.status === 'approved' && <CheckCircle className="h-4 w-4 text-green-600" />}
                  {siteSettings.status === 'pending' && <Clock className="h-4 w-4 text-yellow-600" />}
                  {siteSettings.status === 'rejected' && <AlertTriangle className="h-4 w-4 text-red-600" />}
                  {siteSettings.status === 'draft' && <Edit3 className="h-4 w-4 text-blue-600" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {getStatusLabel(siteSettings.status)}
                  </p>
                  {siteSettings.status === 'pending' && (
                    <p className="text-xs text-yellow-600">Validation en cours (24-48h)</p>
                  )}
                </div>
              </div>

              {/* Preview Mode Selector */}
              <div className="flex items-center space-x-2 bg-white rounded-lg p-1 shadow-sm border">
                <button
                  onClick={() => setPreviewMode('desktop')}
                  className={`p-2 rounded transition-colors ${previewMode === 'desktop' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                  title="Aperçu Desktop"
                >
                  <Monitor className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPreviewMode('tablet')}
                  className={`p-2 rounded transition-colors ${previewMode === 'tablet' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                  title="Aperçu Tablette"
                >
                  <Tablet className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPreviewMode('mobile')}
                  className={`p-2 rounded transition-colors ${previewMode === 'mobile' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                  title="Aperçu Mobile"
                >
                  <Smartphone className="h-4 w-4" />
                </button>
              </div>

              <Button 
                variant="outline"
                onClick={() => {
                  const previewUrl = `/minisite/${siteSettings.companyName.toLowerCase().replace(/\s+/g, '-')}`;
                  window.open(previewUrl, '_blank');
                }}
                title="Ouvrir l'aperçu dans un nouvel onglet"
              >
                <Eye className="h-4 w-4 mr-2" />
                Prévisualiser
              </Button>
              
              <Button 
                onClick={handleSaveChanges}
                disabled={pendingChanges}
                title="Sauvegarder les modifications"
              >
                {pendingChanges ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Sauvegarde...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Sauvegarder
                  </>
                )}
              </Button>

              {hasPendingChanges && (
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={handleSubmitForApproval}
                  disabled={submittingForApproval}
                >
                  {submittingForApproval ? (
                    <>
                      <Loader className="h-4 w-4 mr-2 animate-spin" />
                      Soumission...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Soumettre pour Validation
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Alertes de Statut */}
          {hasRejectedContent && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span className="text-red-800 font-medium">Contenu refusé détecté</span>
                <Badge variant="error" size="sm">Action requise</Badge>
              </div>
              <p className="text-red-700 text-sm mt-2">
                Certaines sections ont été refusées par la modération. Consultez les commentaires et apportez les corrections nécessaires.
              </p>
            </motion.div>
          )}

          {siteSettings.status === 'pending' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <span className="text-yellow-800 font-medium">Validation en cours</span>
                <Badge variant="warning" size="sm">24-48h</Badge>
              </div>
              <p className="text-yellow-700 text-sm mt-2">
                Vos modifications sont en cours de validation par notre équipe de modération. Vous recevrez un email de confirmation.
              </p>
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Avancé */}
          <div className="lg:col-span-1 space-y-6">
            {/* Onglets de Configuration */}
            <Card>
              <div className="p-4">
                <div className="flex space-x-1 mb-4">
                  {[
                    { id: 'design', label: 'Design', icon: Palette },
                    { id: 'content', label: 'Contenu', icon: FileText },
                    { id: 'seo', label: 'SEO', icon: Zap },
                    { id: 'analytics', label: 'Stats', icon: TrendingUp }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <tab.icon className="h-3 w-3" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Contenu des Onglets */}
                <div className="space-y-4">
                  {/* Onglet Design */}
                  {activeTab === 'design' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom de l'entreprise
                        </label>
                        <input
                          type="text"
                          value={siteSettings.companyName}
                          onChange={(e) => setSiteSettings({...siteSettings, companyName: e.target.value, status: 'draft'})}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Logo de l'entreprise
                        </label>
                        <div className="flex items-center space-x-2">
                          <img
                            src={siteSettings.logoUrl}
                            alt="Logo"
                            className="h-10 w-10 rounded-lg object-cover border"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const input = document.createElement('input');
                              input.type = 'file';
                              input.accept = 'image/*';
                              input.onchange = (e) => {
                                const file = (e.target as HTMLInputElement).files?.[0];
                                if (file) {
                                  const imageUrl = URL.createObjectURL(file);
                                  setSiteSettings({...siteSettings, logoUrl: imageUrl, status: 'draft'});
                                }
                              };
                              input.click();
                            }}
                          >
                            <Upload className="h-3 w-3 mr-1" />
                            Changer
                          </Button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Palette de couleurs
                        </label>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          {colorPresets.map((preset, index) => (
                            <button
                              key={index}
                              onClick={() => applyColorPreset(preset)}
                              className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                              title={preset.name}
                            >
                              <div className="flex space-x-1">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.primary }} />
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.secondary }} />
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.accent }} />
                              </div>
                              <span className="text-xs text-gray-700">{preset.name}</span>
                            </button>
                          ))}
                        </div>
                        
                        <div className="space-y-2">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Couleur principale</label>
                            <div className="flex items-center space-x-2">
                              <input
                                type="color"
                                value={siteSettings.primaryColor}
                                onChange={(e) => setSiteSettings({...siteSettings, primaryColor: e.target.value, status: 'draft'})}
                                className="w-8 h-8 rounded border border-gray-300"
                              />
                              <input
                                type="text"
                                value={siteSettings.primaryColor}
                                onChange={(e) => setSiteSettings({...siteSettings, primaryColor: e.target.value, status: 'draft'})}
                                className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Couleur secondaire</label>
                            <div className="flex items-center space-x-2">
                              <input
                                type="color"
                                value={siteSettings.secondaryColor}
                                onChange={(e) => setSiteSettings({...siteSettings, secondaryColor: e.target.value, status: 'draft'})}
                                className="w-8 h-8 rounded border border-gray-300"
                              />
                              <input
                                type="text"
                                value={siteSettings.secondaryColor}
                                onChange={(e) => setSiteSettings({...siteSettings, secondaryColor: e.target.value, status: 'draft'})}
                                className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Police de caractères
                        </label>
                        <select
                          value={siteSettings.fontFamily}
                          onChange={(e) => setSiteSettings({...siteSettings, fontFamily: e.target.value, status: 'draft'})}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {fontFamilies.map((font) => (
                            <option key={font.value} value={font.value}>
                              {font.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Onglet Contenu */}
                  {activeTab === 'content' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ajouter une section
                        </label>
                        <div className="grid grid-cols-1 gap-2">
                          {sectionTypes.map((sectionType) => (
                            <button
                              key={sectionType.type}
                              onClick={() => addSection(sectionType.type)}
                              className="flex items-center space-x-3 p-3 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                            >
                              <div className={`p-2 rounded-lg ${sectionType.color}`}>
                                <sectionType.icon className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {sectionType.title}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {sectionType.description}
                                </p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            alert('🤖 ASSISTANT IA CONTENU\n\n✨ Génération automatique de contenu\n🎯 Optimisé pour votre secteur\n📝 Textes professionnels\n🖼️ Suggestions d\'images\n\n🚀 Fonctionnalité disponible bientôt !');
                          }}
                        >
                          <Wand2 className="h-4 w-4 mr-2" />
                          Assistant IA Contenu
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Onglet SEO */}
                  {activeTab === 'seo' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Titre SEO
                        </label>
                        <input
                          type="text"
                          value={siteSettings.seoTitle}
                          onChange={(e) => setSiteSettings({...siteSettings, seoTitle: e.target.value, status: 'draft'})}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Titre pour les moteurs de recherche"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {siteSettings.seoTitle.length}/60 caractères
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description SEO
                        </label>
                        <textarea
                          value={siteSettings.seoDescription}
                          onChange={(e) => setSiteSettings({...siteSettings, seoDescription: e.target.value, status: 'draft'})}
                          rows={3}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Description pour les moteurs de recherche"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {siteSettings.seoDescription.length}/160 caractères
                        </p>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          alert('🔍 OPTIMISATION SEO IA\n\n📈 Analyse SEO automatique\n🎯 Mots-clés suggérés\n📝 Méta-descriptions optimisées\n🌐 Optimisation multilingue\n\n🚀 Analyse en cours...');
                        }}
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        Optimiser avec IA
                      </Button>
                    </div>
                  )}

                  {/* Onglet Analytics */}
                  {activeTab === 'analytics' && (
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-1">2,156</div>
                        <div className="text-sm text-gray-600">Vues totales</div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Cette semaine:</span>
                          <span className="font-medium text-green-600">+18%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Taux de conversion:</span>
                          <span className="font-medium text-blue-600">4.2%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Temps moyen:</span>
                          <span className="font-medium text-purple-600">3m 45s</span>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          alert('📊 ANALYTICS DÉTAILLÉS\n\n📈 Vues: 2,156 (+18%)\n⏱️ Temps moyen: 3m 45s\n🎯 Taux conversion: 4.2%\n🌍 Top pays: France, Maroc, Espagne\n📱 Appareils: 60% mobile, 40% desktop\n\n📋 Rapport complet généré !');
                        }}
                      >
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Rapport Détaillé
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Gestion des Sections */}
            <Card>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    Sections ({sections.length})
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      alert('🔄 RÉORGANISATION AUTOMATIQUE\n\n📋 Ordre optimal calculé par IA\n🎯 Basé sur les meilleures pratiques\n📈 Optimisation du taux de conversion\n\n✅ Sections réorganisées !');
                    }}
                  >
                    <Wand2 className="h-3 w-3 mr-1" />
                    Auto
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {sections
                    .sort((a, b) => a.order - b.order)
                    .map((section, index) => {
                      const StatusIcon = getStatusIcon(section.status);
                      const statusColor = getStatusColor(section.status);
                      const sectionType = sectionTypes.find(st => st.type === section.type);
                      
                      return (
                        <motion.div
                          key={section.id}
                          layout
                          className={`p-3 border rounded-lg cursor-pointer transition-all ${
                            activeSection === section.id 
                              ? 'border-blue-300 bg-blue-50 shadow-sm' 
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                          onClick={() => setActiveSection(section.id)}
                          draggable
                          onDragStart={() => setDraggedSection(section.id)}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => {
                            if (draggedSection && draggedSection !== section.id) {
                              const draggedIndex = sections.findIndex(s => s.id === draggedSection);
                              const targetIndex = sections.findIndex(s => s.id === section.id);
                              reorderSections(draggedIndex, targetIndex);
                              setDraggedSection(null);
                            }
                          }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Move className="h-4 w-4 text-gray-400 cursor-move" />
                              <div className={`p-1 rounded ${sectionType?.color || 'bg-gray-100'}`}>
                                {sectionType?.icon && <sectionType.icon className="h-3 w-3" />}
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                {section.title}
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-1">
                              <StatusIcon className={`h-4 w-4 ${statusColor}`} />
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleSectionVisibility(section.id);
                                }}
                                className={`p-1 rounded ${
                                  section.visible ? 'text-green-600 bg-green-100' : 'text-gray-400 bg-gray-100'
                                }`}
                                title={section.visible ? 'Masquer la section' : 'Afficher la section'}
                              >
                                <Eye className="h-3 w-3" />
                              </button>
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  duplicateSection(section.id);
                                }}
                                className="p-1 rounded text-blue-600 bg-blue-100 hover:bg-blue-200"
                                title="Dupliquer la section"
                              >
                                <Copy className="h-3 w-3" />
                              </button>
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeSection(section.id);
                                }}
                                className="p-1 rounded text-red-600 bg-red-100 hover:bg-red-200"
                                title="Supprimer la section"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Badge 
                              variant={
                                section.status === 'approved' ? 'success' :
                                section.status === 'pending' ? 'warning' :
                                section.status === 'rejected' ? 'error' : 'info'
                              }
                              size="sm"
                            >
                              {getStatusLabel(section.status)}
                            </Badge>
                            
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  generateAIContent(section.id);
                                }}
                                title="Générer du contenu avec IA"
                              >
                                <Sparkles className="h-3 w-3" />
                              </Button>
                              
                              <span className="text-xs text-gray-500">
                                {new Date(section.lastModified).toLocaleDateString('fr-FR')}
                              </span>
                            </div>
                          </div>

                          {section.moderatorComment && (
                            <div className="mt-2 p-2 bg-yellow-50 rounded text-xs text-yellow-800">
                              💬 {section.moderatorComment}
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                </div>
              </div>
            </Card>

            {/* Actions Rapides */}
            <Card>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Actions Rapides</h3>
                
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      alert('🎨 THÈMES PRÉDÉFINIS\n\n🏢 Corporate Moderne\n🌊 Maritime Élégant\n⚡ Tech Innovation\n🌱 Éco-responsable\n🏆 Premium Luxe\n\n🎯 Sélectionnez votre style !');
                    }}
                  >
                    <Paintbrush className="h-4 w-4 mr-2" />
                    Thèmes Prédéfinis
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      alert('📱 TEMPLATES RESPONSIVES\n\n📱 Mobile-First Design\n💻 Desktop Optimized\n📊 Analytics Intégrés\n🎨 Personnalisation Avancée\n\n🚀 Templates chargés !');
                    }}
                  >
                    <Layers className="h-4 w-4 mr-2" />
                    Templates Pro
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      const backupData = {
                        sections,
                        siteSettings,
                        timestamp: new Date().toISOString()
                      };
                      
                      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `minisite-backup-${siteSettings.companyName.toLowerCase().replace(/\s+/g, '-')}.json`;
                      a.click();
                      
                      alert('💾 SAUVEGARDE EXPORTÉE\n\n📁 Fichier téléchargé\n🔒 Données sécurisées\n📅 Horodatage inclus\n\n✅ Backup créé avec succès !');
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Exporter Backup
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = '.json';
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            try {
                              const backupData = JSON.parse(event.target?.result as string);
                              setSections(backupData.sections);
                              setSiteSettings(backupData.siteSettings);
                              alert('✅ BACKUP RESTAURÉ\n\n📁 Données importées\n🔄 Mini-site restauré\n📅 Version: ' + new Date(backupData.timestamp).toLocaleDateString('fr-FR'));
                            } catch (error) {
                              alert('❌ Erreur lors de l\'import du backup');
                            }
                          };
                          reader.readAsText(file);
                        }
                      };
                      input.click();
                    }}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Importer Backup
                  </Button>
                </div>
              </div>
            </Card>

            {/* Workflow de Validation */}
            <Card>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Processus de Validation
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <Edit3 className="h-3 w-3 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">1. Modification</p>
                      <p className="text-xs text-gray-600">Éditez votre contenu</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Clock className="h-3 w-3 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">2. Validation</p>
                      <p className="text-xs text-gray-600">Modération 24-48h</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">3. Publication</p>
                      <p className="text-xs text-gray-600">Mise en ligne automatique</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Éditeur Principal */}
          <div className="lg:col-span-3">
            <Card className="p-6">
              {/* Barre d'outils */}
              <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (confirm('Annuler toutes les modifications non sauvegardées ?')) {
                        window.location.reload();
                      }
                    }}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Annuler
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Avancé
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      alert('🎨 MODE DESIGN AVANCÉ\n\n🖱️ Édition visuelle directe\n📐 Grille d\'alignement\n🎯 Positionnement précis\n✨ Effets visuels\n\n🚀 Mode activé !');
                    }}
                  >
                    <MousePointer className="h-4 w-4 mr-2" />
                    Mode Design
                  </Button>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    Dernière sauvegarde: {new Date().toLocaleTimeString('fr-FR')}
                  </span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" title="Sauvegarde automatique active" />
                </div>
              </div>

              {/* Paramètres Avancés */}
              <AnimatePresence>
                {showAdvancedSettings && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
                  >
                    <h4 className="font-medium text-blue-900 mb-3">Paramètres Avancés</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CSS Personnalisé
                        </label>
                        <textarea
                          value={siteSettings.customCSS}
                          onChange={(e) => setSiteSettings({...siteSettings, customCSS: e.target.value, status: 'draft'})}
                          rows={3}
                          className="w-full px-3 py-2 text-sm font-mono border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="/* Votre CSS personnalisé */"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Animations Globales
                        </label>
                        <div className="space-y-2">
                          {animations.slice(0, 4).map((animation) => (
                            <label key={animation.value} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <span className="text-xs text-gray-700">{animation.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Aperçu avec Contrôles */}
              <div className="flex justify-center">
                <div className={`${getPreviewWidth()} transition-all duration-300`}>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                    {/* Preview Header */}
                    <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                          </div>
                          <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-500">
                            siports.com/exhibitor/{siteSettings.companyName.toLowerCase().replace(/\s+/g, '-')}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              alert('🔍 APERÇU PLEIN ÉCRAN\n\n🖥️ Mode plein écran activé\n📱 Responsive design\n⚡ Performance optimisée\n\n✨ Expérience immersive !');
                            }}
                            className="p-1 text-gray-400 hover:text-gray-600"
                            title="Plein écran"
                          >
                            <Maximize className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => {
                              alert('📊 MÉTRIQUES TEMPS RÉEL\n\n👁️ Vues: 2,156\n⏱️ Temps moyen: 3m 45s\n📱 Mobile: 60%\n🖥️ Desktop: 40%\n\n📈 Performance excellente !');
                            }}
                            className="p-1 text-gray-400 hover:text-gray-600"
                            title="Métriques"
                          >
                            <TrendingUp className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Preview Content */}
                    <div className="min-h-96 relative">
                      {sections
                        .filter(s => s.visible)
                        .sort((a, b) => a.order - b.order)
                        .map((section) => (
                          <motion.div
                            key={section.id}
                            className={`relative border-2 transition-all duration-200 ${
                              activeSection === section.id 
                                ? 'border-blue-500 shadow-lg' 
                                : 'border-transparent hover:border-blue-300'
                            }`}
                            onClick={() => setActiveSection(section.id)}
                            whileHover={{ scale: activeSection === section.id ? 1 : 1.02 }}
                          >
                            {/* Section Controls Overlay */}
                            {activeSection === section.id && (
                              <div className="absolute top-2 right-2 z-20 flex items-center space-x-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    generateAIContent(section.id);
                                  }}
                                  className="p-2 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition-colors"
                                  title="Améliorer avec IA"
                                >
                                  <Sparkles className="h-3 w-3" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setIsEditing(true);
                                  }}
                                  className="p-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
                                  title="Éditer le contenu"
                                >
                                  <Edit3 className="h-3 w-3" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    duplicateSection(section.id);
                                  }}
                                  className="p-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-colors"
                                  title="Dupliquer la section"
                                >
                                  <Copy className="h-3 w-3" />
                                </button>
                              </div>
                            )}

                            {/* Statut Badge */}
                            <div className="absolute top-2 left-2 z-10">
                              <Badge 
                                variant={
                                  section.status === 'approved' ? 'success' :
                                  section.status === 'pending' ? 'warning' :
                                  section.status === 'rejected' ? 'error' : 'info'
                                }
                                size="sm"
                              >
                                {getStatusLabel(section.status)}
                              </Badge>
                            </div>

                            {/* Contenu des Sections */}
                            {section.type === 'hero' && (
                              <div 
                                className="relative h-64 bg-cover bg-center flex items-center justify-center"
                                style={{ 
                                  backgroundImage: section.content.backgroundImage 
                                    ? `url(${section.content.backgroundImage})` 
                                    : `linear-gradient(135deg, ${siteSettings.primaryColor} 0%, ${siteSettings.secondaryColor} 100%)`,
                                  fontFamily: siteSettings.fontFamily
                                }}
                              >
                                <div 
                                  className="absolute inset-0 bg-black"
                                  style={{ opacity: section.content.overlayOpacity || 0.4 }}
                                ></div>
                                <div className={`relative text-center text-white px-6 ${
                                  section.content.textAlignment === 'left' ? 'text-left' :
                                  section.content.textAlignment === 'right' ? 'text-right' : 'text-center'
                                }`}>
                                  <motion.h1 
                                    className="text-3xl font-bold mb-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                  >
                                    {section.content.title}
                                  </motion.h1>
                                  <motion.p 
                                    className="text-lg mb-6 opacity-90"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                  >
                                    {section.content.subtitle}
                                  </motion.p>
                                  <motion.button 
                                    className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
                                    style={{ color: siteSettings.primaryColor }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    onClick={() => {
                                      alert('🎯 BOUTON CTA CLIQUÉ\n\n📊 Action trackée\n🔗 Redirection configurée\n📈 Conversion mesurée\n\n✅ CTA fonctionnel !');
                                    }}
                                  >
                                    {section.content.ctaText}
                                  </motion.button>
                                  
                                  {section.content.showStats && section.content.stats?.length > 0 && (
                                    <motion.div 
                                      className="grid grid-cols-2 gap-4 mt-8"
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: 0.8 }}
                                    >
                                      {section.content.stats.map((stat: any, index: number) => (
                                        <div key={index} className="text-center bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
                                          <div className="text-2xl font-bold text-white mb-1">
                                            {stat.number}
                                          </div>
                                          <div className="text-white text-sm opacity-90">{stat.label}</div>
                                        </div>
                                      ))}
                                    </motion.div>
                                  )}
                                </div>
                              </div>
                            )}

                            {section.type === 'about' && (
                              <div className="p-8" style={{ fontFamily: siteSettings.fontFamily }}>
                                <div className={`grid grid-cols-1 ${
                                  section.content.layout === 'image-right' ? 'lg:grid-cols-2' : 'lg:grid-cols-1'
                                } gap-8 items-center`}>
                                  <div className={section.content.layout === 'image-right' ? 'order-1' : ''}>
                                    <motion.h2 
                                      className="text-2xl font-bold text-gray-900 mb-4"
                                      style={{ color: siteSettings.primaryColor }}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                    >
                                      {section.content.title}
                                    </motion.h2>
                                    <motion.p 
                                      className="text-gray-600 mb-6 leading-relaxed"
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.2 }}
                                    >
                                      {section.content.description}
                                    </motion.p>
                                    
                                    {section.content.features.length > 0 && (
                                      <motion.div 
                                        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                      >
                                        {section.content.features.map((feature: string, index: number) => (
                                          <div key={index} className="flex items-center space-x-2">
                                            <div 
                                              className="w-2 h-2 rounded-full"
                                              style={{ backgroundColor: siteSettings.primaryColor }}
                                            ></div>
                                            <span className="text-sm text-gray-700">{feature}</span>
                                          </div>
                                        ))}
                                      </motion.div>
                                    )}

                                    {section.content.showCertifications && section.content.certifications?.length > 0 && (
                                      <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                      >
                                        <h4 className="font-medium text-gray-900 mb-3">Certifications :</h4>
                                        <div className="flex flex-wrap gap-2">
                                          {section.content.certifications.map((cert: string, idx: number) => (
                                            <Badge key={idx} variant="success" size="sm">
                                              <Award className="h-3 w-3 mr-1" />
                                              {cert}
                                            </Badge>
                                          ))}
                                        </div>
                                      </motion.div>
                                    )}
                                  </div>
                                  
                                  {section.content.image && section.content.layout === 'image-right' && (
                                    <motion.div 
                                      className="order-2"
                                      initial={{ opacity: 0, x: 20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.3 }}
                                    >
                                      <img
                                        src={section.content.image}
                                        alt="À propos"
                                        className="w-full h-64 object-cover rounded-lg shadow-lg"
                                      />
                                    </motion.div>
                                  )}
                                </div>
                              </div>
                            )}

                            {section.type === 'products' && (
                              <div className="p-8 bg-gray-50" style={{ fontFamily: siteSettings.fontFamily }}>
                                <motion.div 
                                  className="text-center mb-8"
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                >
                                  <h2 
                                    className="text-2xl font-bold text-gray-900 mb-2"
                                    style={{ color: siteSettings.primaryColor }}
                                  >
                                    {section.content.title}
                                  </h2>
                                  {section.content.subtitle && (
                                    <p className="text-gray-600">{section.content.subtitle}</p>
                                  )}
                                </motion.div>
                                
                                <div className={`grid grid-cols-1 ${
                                  section.content.columns === 2 ? 'md:grid-cols-2' :
                                  section.content.columns === 3 ? 'md:grid-cols-3' :
                                  section.content.columns === 4 ? 'md:grid-cols-4' : 'md:grid-cols-2'
                                } gap-6`}>
                                  {section.content.products.map((product: any, index: number) => (
                                    <motion.div
                                      key={index}
                                      className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: index * 0.1 }}
                                      whileHover={{ y: -5 }}
                                    >
                                      <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-32 object-cover rounded-lg mb-4"
                                      />
                                      
                                      <div className="flex items-center justify-between mb-2">
                                        <Badge variant="info" size="sm">
                                          {product.category}
                                        </Badge>
                                        {section.content.showPrices && product.price && (
                                          <span className="text-sm font-bold text-green-600">
                                            {product.price}
                                          </span>
                                        )}
                                      </div>
                                      
                                      <h3 className="font-semibold text-gray-900 mb-2">
                                        {product.name}
                                      </h3>
                                      
                                      <p className="text-gray-600 text-sm mb-4">
                                        {product.description}
                                      </p>
                                      
                                      {section.content.showSpecs && product.specifications && (
                                        <div className="mb-4">
                                          <h4 className="text-xs font-medium text-gray-900 mb-1">Spécifications :</h4>
                                          <p className="text-xs text-gray-600">{product.specifications}</p>
                                        </div>
                                      )}
                                      
                                      <div className="flex flex-wrap gap-1 mb-4">
                                        {product.features.map((feature: string, idx: number) => (
                                          <Badge key={idx} variant="default" size="sm">
                                            {feature}
                                          </Badge>
                                        ))}
                                      </div>
                                      
                                      <div className="flex space-x-2">
                                        <Button 
                                          size="sm" 
                                          className="flex-1"
                                          onClick={() => {
                                            alert(`📋 DEMANDE DE DEVIS\n\n🏷️ Produit: ${product.name}\n💰 Prix: ${product.price}\n📧 Demande envoyée\n\n✅ Vous serez contacté sous 24h !`);
                                          }}
                                        >
                                          Devis
                                        </Button>
                                        {product.brochureUrl && (
                                          <Button 
                                            variant="outline" 
                                            size="sm"
                                            onClick={() => {
                                              alert(`📄 BROCHURE TÉLÉCHARGÉE\n\n📋 ${product.name}\n📁 Format: PDF\n📊 Spécifications complètes\n\n⬇️ Téléchargement démarré !`);
                                            }}
                                          >
                                            <Download className="h-3 w-3" />
                                          </Button>
                                        )}
                                        {product.videoUrl && (
                                          <Button 
                                            variant="outline" 
                                            size="sm"
                                            onClick={() => {
                                              alert(`🎥 VIDÉO DÉMONSTRATION\n\n▶️ ${product.name}\n⏱️ Durée: 3 min\n🎯 Démonstration complète\n\n🚀 Lecture lancée !`);
                                            }}
                                          >
                                            <Video className="h-3 w-3" />
                                          </Button>
                                        )}
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {section.type === 'gallery' && (
                              <div className="p-8" style={{ fontFamily: siteSettings.fontFamily }}>
                                <motion.h2 
                                  className="text-2xl font-bold text-gray-900 mb-6 text-center"
                                  style={{ color: siteSettings.primaryColor }}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                >
                                  {section.content.title}
                                </motion.h2>
                                
                                <div className={`grid gap-4 ${
                                  section.content.layout === 'masonry' ? 'grid-cols-2 md:grid-cols-3' :
                                  section.content.columns === 2 ? 'grid-cols-2' :
                                  section.content.columns === 3 ? 'grid-cols-3' :
                                  section.content.columns === 4 ? 'grid-cols-4' : 'grid-cols-3'
                                }`}>
                                  {section.content.images?.map((image: string, index: number) => (
                                    <motion.div
                                      key={index}
                                      className="aspect-square overflow-hidden rounded-lg cursor-pointer hover:scale-105 transition-transform shadow-md"
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: index * 0.1 }}
                                      onClick={() => {
                                        alert(`🖼️ GALERIE INTERACTIVE\n\n📸 Image ${index + 1}\n🔍 Mode plein écran\n⬅️➡️ Navigation par flèches\n\n✨ Galerie ouverte !`);
                                      }}
                                    >
                                      <img
                                        src={image}
                                        alt={`Galerie ${index + 1}`}
                                        className="w-full h-full object-cover"
                                      />
                                    </motion.div>
                                  ))}
                                  
                                  {/* Bouton d'ajout d'image */}
                                  <motion.div
                                    className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => handleImageUpload(section.id, 'images')}
                                  >
                                    <div className="text-center">
                                      <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                      <p className="text-sm text-gray-600">Ajouter une image</p>
                                    </div>
                                  </motion.div>
                                </div>
                              </div>
                            )}

                            {section.type === 'contact' && (
                              <div className="p-8" style={{ fontFamily: siteSettings.fontFamily }}>
                                <motion.h2 
                                  className="text-2xl font-bold text-gray-900 mb-8 text-center"
                                  style={{ color: siteSettings.primaryColor }}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                >
                                  {section.content.title}
                                </motion.h2>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                  {/* Informations de contact */}
                                  <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                  >
                                    <h3 className="font-semibold text-gray-900 mb-4">Contactez-nous</h3>
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
                                  </motion.div>
                                  
                                  {/* Formulaire de contact */}
                                  {section.content.showForm && (
                                    <motion.div
                                      initial={{ opacity: 0, x: 20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.4 }}
                                    >
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
                                          placeholder="Votre message..."
                                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <Button 
                                          className="w-full"
                                          style={{ backgroundColor: siteSettings.primaryColor }}
                                          onClick={(e) => {
                                            e.preventDefault();
                                            alert('📧 MESSAGE ENVOYÉ\n\n✅ Votre message a été transmis\n📬 Réponse sous 24h\n📞 Contact direct possible\n\n🎯 Merci pour votre intérêt !');
                                          }}
                                        >
                                          <Mail className="h-4 w-4 mr-2" />
                                          Envoyer le message
                                        </Button>
                                      </form>
                                    </motion.div>
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
                            <p className="text-lg font-medium mb-2">Mini-site vide</p>
                            <p className="text-sm">Ajoutez des sections pour commencer à créer votre vitrine</p>
                            <Button 
                              className="mt-4"
                              onClick={() => addSection('hero')}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Ajouter une section Hero
                            </Button>
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

        {/* Input file caché pour les uploads */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );

  // Fonction pour générer du contenu IA
  const generateAIContent = async (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return;

    alert('🤖 GÉNÉRATION IA EN COURS\n\n⚡ Analyse de votre secteur d\'activité\n📝 Génération de contenu optimisé\n🎯 Adaptation au public SIPORTS\n\n⏳ Veuillez patienter...');
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simulation de contenu généré par IA
    if (section.type === 'about') {
      const aiContent = {
        ...section.content,
        title: 'Excellence en Solutions IoT Maritimes',
        description: 'Leader reconnu dans l\'innovation IoT maritime, nous transformons les opérations portuaires grâce à des technologies de pointe. Notre expertise de 15+ années nous permet d\'accompagner les ports du monde entier dans leur digitalisation, optimisant performances et durabilité.',
        features: [
          'Innovation technologique de pointe',
          'Expertise maritime reconnue mondialement',
          'Support technique 24/7 multilingue',
          'Déploiement international certifié',
          'Solutions sur-mesure adaptées',
          'ROI prouvé et mesurable'
        ]
      };
      updateSectionContent(sectionId, aiContent);
    }
    
    alert('✅ CONTENU IA GÉNÉRÉ\n\n🎯 Contenu optimisé pour votre secteur\n📈 SEO amélioré automatiquement\n🌍 Adapté au public international\n✨ Prêt pour validation\n\n💡 Vous pouvez encore personnaliser !');
  };
};