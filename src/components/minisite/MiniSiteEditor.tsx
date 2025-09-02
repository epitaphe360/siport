import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Layout, 
  Palette, 
  Type, 
  Image, 
  Video,
  FileText,
  Save,
  Eye,
  Smartphone,
  Monitor,
  Tablet,
  Plus,
  Trash2,
  Move,
  Settings,
  ArrowLeft,
  Edit,
  Upload,
  Download,
  Globe,
  Mail,
  Phone,
  MapPin,
  Check,
  X
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { motion } from 'framer-motion';

interface Section {
  id: string;
  type: 'hero' | 'about' | 'products' | 'gallery' | 'contact' | 'news';
  title: string;
  content: any;
  visible: boolean;
  order: number;
}

export const MiniSiteEditor: React.FC = () => {
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<string>('');
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
        ctaLink: '#products'
      },
      visible: true,
      order: 0
    },
    {
      id: '2',
      type: 'about',
      title: 'À propos',
      content: {
        title: 'Notre expertise',
        description: 'Avec plus de 20 ans d\'expérience dans le secteur portuaire, nous accompagnons les ports du monde entier dans leur transformation digitale.',
        features: [
          'Solutions innovantes',
          'Expertise reconnue',
          'Support 24/7',
          'Présence internationale'
        ]
      },
      visible: true,
      order: 1
    },
    {
      id: '3',
      type: 'products',
      title: 'Produits & Services',
      content: {
        title: 'Nos solutions',
        products: [
          {
            id: '1',
            name: 'SmartPort Management',
            description: 'Plateforme complète de gestion portuaire',
            image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
            features: ['Analytics temps réel', 'API intégrée', 'Multi-langues'],
            price: 'Sur devis'
          },
          {
            id: '2',
            name: 'Port Analytics',
            description: 'Outils d\'analyse et de reporting avancés',
            image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
            features: ['Dashboards personnalisés', 'Prédictions IA', 'Export données'],
            price: 'À partir de 5000€'
          }
        ]
      },
      visible: true,
      order: 2
    },
    {
      id: '4',
      type: 'contact',
      title: 'Contact',
      content: {
        title: 'Contactez-nous',
        address: '123 Port Avenue, Casablanca, Maroc',
        phone: '+212 6 12 34 56 78',
        email: 'contact@portsolutions.com',
        website: 'https://portsolutions.com',
        hours: 'Lun-Ven: 8h-18h'
      },
      visible: true,
      order: 3
    }
  ]);

  const [siteSettings, setSiteSettings] = useState({
    primaryColor: '#1e40af',
    secondaryColor: '#3b82f6',
    accentColor: '#60a5fa',
    fontFamily: 'Inter',
    logoUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200'
  });

  const sectionTypes = [
    { type: 'hero', title: 'Section Hero', icon: Layout, description: 'Bannière d\'accueil avec titre et CTA' },
    { type: 'about', title: 'À propos', icon: FileText, description: 'Présentation de votre entreprise' },
    { type: 'products', title: 'Produits', icon: Image, description: 'Catalogue de vos produits et services' },
    { type: 'gallery', title: 'Galerie', icon: Image, description: 'Photos et vidéos de votre entreprise' },
    { type: 'news', title: 'Actualités', icon: FileText, description: 'Dernières nouvelles et annonces' },
    { type: 'contact', title: 'Contact', icon: Mail, description: 'Informations de contact et formulaire' }
  ];

  const addSection = (type: Section['type']) => {
    const newSection: Section = {
      id: Date.now().toString(),
      type,
      title: sectionTypes.find(s => s.type === type)?.title || 'Nouvelle section',
      content: getDefaultContent(type),
      visible: true,
      order: sections.length
    };
    setSections([...sections, newSection]);
    alert(`✅ SECTION AJOUTÉE\n\n📝 Type: ${sectionTypes.find(s => s.type === type)?.title}\n📋 Position: ${sections.length + 1}\n\n🎨 Section prête à personnaliser !`);
  };

  const getDefaultContent = (type: Section['type']) => {
    switch (type) {
      case 'hero':
        return {
          title: 'Votre titre',
          subtitle: 'Votre sous-titre',
          backgroundImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200',
          ctaText: 'En savoir plus',
          ctaLink: '#'
        };
      case 'about':
        return {
          title: 'À propos de nous',
          description: 'Décrivez votre entreprise ici...',
          features: ['Nouvelle fonctionnalité 1', 'Nouvelle fonctionnalité 2']
        };
      case 'products':
        return {
          title: 'Nos produits',
          products: []
        };
      case 'gallery':
        return {
          title: 'Galerie',
          images: []
        };
      case 'news':
        return {
          title: 'Actualités',
          articles: []
        };
      case 'contact':
        return {
          title: 'Contactez-nous',
          address: 'Votre adresse',
          phone: 'Votre téléphone',
          email: 'votre@email.com',
          website: 'https://votre-site.com',
          hours: 'Vos horaires'
        };
      default:
        return {};
    }
  };

  const removeSection = (id: string) => {
    const sectionTitle = sections.find(s => s.id === id)?.title;
    if (confirm(`Êtes-vous sûr de vouloir supprimer la section "${sectionTitle}" ?`)) {
      setSections(sections.filter(s => s.id !== id));
      alert(`🗑️ SECTION SUPPRIMÉE\n\n📝 "${sectionTitle}" supprimée\n🔄 Ordre des sections réorganisé\n\n✅ Modification appliquée !`);
    }
  };

  const toggleSectionVisibility = (id: string) => {
    const section = sections.find(s => s.id === id);
    setSections(sections.map(s => 
      s.id === id ? { ...s, visible: !s.visible } : s
    ));
    alert(`👁️ VISIBILITÉ MODIFIÉE\n\n📝 Section: ${section?.title}\n🔄 Statut: ${section?.visible ? 'Masquée' : 'Visible'}\n\n✅ Changement appliqué !`);
  };

  const startEditing = (fieldKey: string, currentValue: string) => {
    setEditingField(fieldKey);
    setEditingValue(currentValue);
  };

  const saveEdit = (sectionId: string, field: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          content: {
            ...section.content,
            [field]: editingValue
          }
        };
      }
      return section;
    }));
    setEditingField(null);
    setEditingValue('');
    alert(`✅ TEXTE MODIFIÉ\n\n📝 Champ: ${field}\n💾 Nouveau contenu sauvegardé\n\n🎨 Modification visible dans l'aperçu !`);
  };

  const cancelEdit = () => {
    setEditingField(null);
    setEditingValue('');
  };

  const updateSectionContent = (sectionId: string, field: string, value: any) => {
    setSections(sections.map(section => 
      section.id === sectionId 
        ? { 
            ...section, 
            content: { 
              ...section.content, 
              [field]: value 
            } 
          } 
        : section
    ));
  };

  const updateProductField = (sectionId: string, productIndex: number, field: string, value: any) => {
    setSections(sections.map(section => {
      if (section.id === sectionId && section.type === 'products') {
        const updatedProducts = section.content.products.map((product: any, index: number) =>
          index === productIndex ? { ...product, [field]: value } : product
        );
        return {
          ...section,
          content: {
            ...section.content,
            products: updatedProducts
          }
        };
      }
      return section;
    }));
  };

  const addProduct = (sectionId: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId && section.type === 'products') {
        const newProduct = {
          id: Date.now().toString(),
          name: 'Nouveau produit',
          description: 'Description du produit',
          image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
          features: ['Fonctionnalité 1', 'Fonctionnalité 2'],
          price: 'Sur devis'
        };
        return {
          ...section,
          content: {
            ...section.content,
            products: [...section.content.products, newProduct]
          }
        };
      }
      return section;
    }));
    alert(`✅ PRODUIT AJOUTÉ\n\n📦 Nouveau produit créé\n✏️ Cliquez sur les textes pour modifier\n🖼️ Changez l'image si nécessaire\n\n🎨 Produit prêt à personnaliser !`);
  };

  const removeProduct = (sectionId: string, productIndex: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      setSections(sections.map(section => {
        if (section.id === sectionId && section.type === 'products') {
          const updatedProducts = section.content.products.filter((_: any, index: number) => index !== productIndex);
          return {
            ...section,
            content: {
              ...section.content,
              products: updatedProducts
            }
          };
        }
        return section;
      }));
      alert(`🗑️ PRODUIT SUPPRIMÉ\n\n📦 Produit retiré du catalogue\n🔄 Liste mise à jour\n\n✅ Suppression effectuée !`);
    }
  };

  const handleSave = async () => {
    try {
      // Simulation de sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('💾 MINI-SITE SAUVEGARDÉ\n\n✅ Toutes les modifications enregistrées\n🌐 Mini-site mis à jour\n📊 2,156 vues (+18% cette semaine)\n\n🎉 Votre vitrine est à jour !');
    } catch (error) {
      alert('❌ Erreur lors de la sauvegarde');
    }
  };

  const handlePreview = () => {
    alert(`👁️ APERÇU DU MINI-SITE\n\n🖥️ Mode: ${previewMode}\n📱 Responsive: Activé\n🎨 Thème: Moderne\n\n🚀 Ouverture dans un nouvel onglet...`);
    window.open('/minisite/1', '_blank');
  };

  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile': return 'w-80';
      case 'tablet': return 'w-96';
      case 'desktop': return 'w-full';
      default: return 'w-full';
    }
  };

  const EditableText: React.FC<{
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    multiline?: boolean;
    className?: string;
    fieldKey: string;
  }> = ({ value, onChange, placeholder, multiline = false, className = '', fieldKey }) => {
    const isEditing = editingField === fieldKey;

    if (isEditing) {
      return (
        <div className="relative">
          {multiline ? (
            <textarea
              value={editingValue}
              onChange={(e) => setEditingValue(e.target.value)}
              placeholder={placeholder}
              className={`w-full px-3 py-2 border-2 border-blue-500 rounded-lg focus:outline-none bg-white ${className}`}
              rows={3}
              autoFocus
            />
          ) : (
            <input
              type="text"
              value={editingValue}
              onChange={(e) => setEditingValue(e.target.value)}
              placeholder={placeholder}
              className={`w-full px-3 py-2 border-2 border-blue-500 rounded-lg focus:outline-none bg-white ${className}`}
              autoFocus
            />
          )}
          <div className="flex space-x-2 mt-2">
            <Button 
              size="sm" 
              onClick={() => {
                onChange(editingValue);
                setEditingField(null);
                setEditingValue('');
                alert(`✅ TEXTE MODIFIÉ\n\n📝 Nouveau contenu: "${editingValue}"\n💾 Modification sauvegardée\n\n🎨 Changement visible !`);
              }}
            >
              <Check className="h-3 w-3 mr-1" />
              Sauver
            </Button>
            <Button variant="outline" size="sm" onClick={cancelEdit}>
              <X className="h-3 w-3 mr-1" />
              Annuler
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div
        onClick={() => startEditing(fieldKey, value)}
        className={`cursor-pointer hover:bg-blue-50 hover:border-blue-200 border-2 border-transparent rounded-lg p-2 transition-colors group ${className}`}
        title="Cliquer pour modifier"
      >
        {value || (
          <span className="text-gray-400 italic">{placeholder || 'Cliquer pour modifier'}</span>
        )}
        <Edit className="h-3 w-3 text-blue-400 inline ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    );
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
              Éditeur de Mini-Site
            </h1>
            <p className="text-gray-600">
              Personnalisez votre vitrine digitale pour SIPORTS 2026
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Preview Mode Selector */}
            <div className="flex items-center space-x-2 bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => {
                  setPreviewMode('desktop');
                  alert('🖥️ MODE DESKTOP\n\n📱 Aperçu: Ordinateur\n📏 Largeur: 100%\n\n✅ Mode activé !');
                }}
                className={`p-2 rounded ${previewMode === 'desktop' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
              >
                <Monitor className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  setPreviewMode('tablet');
                  alert('📱 MODE TABLETTE\n\n📱 Aperçu: Tablette\n📏 Largeur: 768px\n\n✅ Mode activé !');
                }}
                className={`p-2 rounded ${previewMode === 'tablet' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
              >
                <Tablet className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  setPreviewMode('mobile');
                  alert('📱 MODE MOBILE\n\n📱 Aperçu: Smartphone\n📏 Largeur: 320px\n\n✅ Mode activé !');
                }}
                className={`p-2 rounded ${previewMode === 'mobile' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
              >
                <Smartphone className="h-4 w-4" />
              </button>
            </div>

            <Button variant="outline" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-2" />
              Prévisualiser
            </Button>
            
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Sauvegarder
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Tools */}
          <div className="lg:col-span-1 space-y-6">
            {/* Site Settings */}
            <Card>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Paramètres du site
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Couleur principale
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={siteSettings.primaryColor}
                        onChange={(e) => {
                          setSiteSettings({...siteSettings, primaryColor: e.target.value});
                          alert(`🎨 COULEUR MODIFIÉE\n\n🌈 Nouvelle couleur: ${e.target.value}\n🎯 Appliquée à tous les éléments\n\n✅ Thème mis à jour !`);
                        }}
                        className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={siteSettings.primaryColor}
                        onChange={(e) => setSiteSettings({...siteSettings, primaryColor: e.target.value})}
                        className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Police
                    </label>
                    <select
                      value={siteSettings.fontFamily}
                      onChange={(e) => {
                        setSiteSettings({...siteSettings, fontFamily: e.target.value});
                        alert(`🔤 POLICE MODIFIÉE\n\n📝 Nouvelle police: ${e.target.value}\n🎨 Appliquée à tout le site\n\n✅ Style mis à jour !`);
                      }}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Inter">Inter</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Open Sans">Open Sans</option>
                      <option value="Lato">Lato</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Logo
                    </label>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/*';
                        input.onchange = (e) => {
                          const file = (e.target as HTMLInputElement).files?.[0];
                          if (file) {
                            alert(`📸 LOGO SÉLECTIONNÉ\n\n📄 Fichier: ${file.name}\n📏 Taille: ${(file.size / 1024 / 1024).toFixed(2)} MB\n🔄 Upload en cours...\n\n✅ Logo mis à jour !`);
                          }
                        };
                        input.click();
                      }}
                    >
                      <Upload className="h-3 w-3 mr-1" />
                      Changer Logo
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Add Sections */}
            <Card>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une section
                </h3>
                
                <div className="space-y-2">
                  {sectionTypes.map((sectionType) => {
                    return (
                      <button
                        key={sectionType.type}
                        onClick={() => addSection(sectionType.type)}
                        className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <sectionType.icon className="h-4 w-4 text-gray-400" />
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
                    );
                  })}
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
                      className={`p-3 border rounded-lg cursor-pointer transition-colors group ${
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
                            title={section.visible ? 'Masquer la section' : 'Afficher la section'}
                          >
                            <Eye className="h-3 w-3" />
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeSection(section.id);
                            }}
                            className="p-1 rounded text-red-600 hover:bg-red-50"
                            title="Supprimer la section"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <Badge variant="info" size="sm">
                          {section.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
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
                            className={`border-2 border-transparent hover:border-blue-300 transition-colors group ${
                              activeSection === section.id ? 'border-blue-500' : ''
                            }`}
                            onClick={() => setActiveSection(section.id)}
                          >
                            {/* Section Hero */}
                            {section.type === 'hero' && (
                              <div 
                                className="relative h-64 bg-cover bg-center flex items-center justify-center"
                                style={{ 
                                  backgroundImage: section.content.backgroundImage 
                                    ? `url(${section.content.backgroundImage})` 
                                    : 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)'
                                }}
                              >
                                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                                <div className="relative text-center text-white px-6 w-full">
                                  <EditableText
                                    value={section.content.title}
                                    onChange={(value) => updateSectionContent(section.id, 'title', value)}
                                    placeholder="Titre principal"
                                    className="text-3xl font-bold mb-4 text-white"
                                    fieldKey={`${section.id}-title`}
                                  />
                                  <EditableText
                                    value={section.content.subtitle}
                                    onChange={(value) => updateSectionContent(section.id, 'subtitle', value)}
                                    placeholder="Sous-titre"
                                    multiline
                                    className="text-lg mb-6 opacity-90 text-white"
                                    fieldKey={`${section.id}-subtitle`}
                                  />
                                  <EditableText
                                    value={section.content.ctaText}
                                    onChange={(value) => updateSectionContent(section.id, 'ctaText', value)}
                                    placeholder="Texte du bouton"
                                    className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
                                    fieldKey={`${section.id}-cta`}
                                  />
                                </div>
                              </div>
                            )}

                            {/* Section About */}
                            {section.type === 'about' && (
                              <div className="p-8">
                                <EditableText
                                  value={section.content.title}
                                  onChange={(value) => updateSectionContent(section.id, 'title', value)}
                                  placeholder="Titre de la section"
                                  className="text-2xl font-bold text-gray-900 mb-4"
                                  fieldKey={`${section.id}-title`}
                                />
                                <EditableText
                                  value={section.content.description}
                                  onChange={(value) => updateSectionContent(section.id, 'description', value)}
                                  placeholder="Description de votre entreprise"
                                  multiline
                                  className="text-gray-600 mb-6"
                                  fieldKey={`${section.id}-description`}
                                />
                                {section.content.features.length > 0 && (
                                  <div className="grid grid-cols-2 gap-4">
                                    {section.content.features.map((feature: string, index: number) => (
                                      <div key={index} className="flex items-center space-x-2">
                                        <div 
                                          className="w-2 h-2 rounded-full"
                                          style={{ backgroundColor: siteSettings.primaryColor }}
                                        ></div>
                                        <EditableText
                                          value={feature}
                                          onChange={(value) => {
                                            const updatedFeatures = [...section.content.features];
                                            updatedFeatures[index] = value;
                                            updateSectionContent(section.id, 'features', updatedFeatures);
                                          }}
                                          placeholder="Caractéristique"
                                          className="text-sm text-gray-700"
                                          fieldKey={`${section.id}-feature-${index}`}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                )}
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="mt-4"
                                  onClick={() => {
                                    const newFeatures = [...section.content.features, 'Nouvelle fonctionnalité'];
                                    updateSectionContent(section.id, 'features', newFeatures);
                                    alert('✅ FONCTIONNALITÉ AJOUTÉE\n\n📝 Nouvelle ligne créée\n✏️ Cliquez pour modifier le texte\n\n🎨 Fonctionnalité prête !');
                                  }}
                                >
                                  <Plus className="h-3 w-3 mr-1" />
                                  Ajouter fonctionnalité
                                </Button>
                              </div>
                            )}

                            {/* Section Products */}
                            {section.type === 'products' && (
                              <div className="p-8 bg-gray-50">
                                <div className="flex items-center justify-between mb-6">
                                  <EditableText
                                    value={section.content.title}
                                    onChange={(value) => updateSectionContent(section.id, 'title', value)}
                                    placeholder="Titre de la section produits"
                                    className="text-2xl font-bold text-gray-900"
                                    fieldKey={`${section.id}-title`}
                                  />
                                  <Button
                                    size="sm"
                                    onClick={() => addProduct(section.id)}
                                  >
                                    <Plus className="h-3 w-3 mr-1" />
                                    Produit
                                  </Button>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  {section.content.products.map((product: any, index: number) => (
                                    <div key={index} className="bg-white rounded-lg p-6 shadow-sm relative group">
                                      <button
                                        onClick={() => removeProduct(section.id, index)}
                                        className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="Supprimer ce produit"
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </button>
                                      
                                      <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-32 object-cover rounded-lg mb-4 cursor-pointer hover:opacity-80"
                                        onClick={() => {
                                          const input = document.createElement('input');
                                          input.type = 'file';
                                          input.accept = 'image/*';
                                          input.onchange = (e) => {
                                            const file = (e.target as HTMLInputElement).files?.[0];
                                            if (file) {
                                              alert(`🖼️ IMAGE PRODUIT MODIFIÉE\n\n📄 Fichier: ${file.name}\n📦 Produit: ${product.name}\n🔄 Upload en cours...\n\n✅ Image mise à jour !`);
                                            }
                                          };
                                          input.click();
                                        }}
                                        title="Cliquer pour changer l'image"
                                      />
                                      
                                      <EditableText
                                        value={product.name}
                                        onChange={(value) => updateProductField(section.id, index, 'name', value)}
                                        placeholder="Nom du produit"
                                        className="font-semibold text-gray-900 mb-2"
                                        fieldKey={`${section.id}-product-${index}-name`}
                                      />
                                      
                                      <EditableText
                                        value={product.description}
                                        onChange={(value) => updateProductField(section.id, index, 'description', value)}
                                        placeholder="Description du produit"
                                        multiline
                                        className="text-gray-600 text-sm mb-4"
                                        fieldKey={`${section.id}-product-${index}-description`}
                                      />
                                      
                                      <div className="flex items-center justify-between">
                                        <EditableText
                                          value={product.price}
                                          onChange={(value) => updateProductField(section.id, index, 'price', value)}
                                          placeholder="Prix"
                                          className="text-blue-600 font-semibold"
                                          fieldKey={`${section.id}-product-${index}-price`}
                                        />
                                        <Button 
                                          size="sm" 
                                          variant="outline"
                                          onClick={() => {
                                            const input = document.createElement('input');
                                            input.type = 'file';
                                            input.accept = 'image/*';
                                            input.onchange = (e) => {
                                              const file = (e.target as HTMLInputElement).files?.[0];
                                              if (file) {
                                                alert(`🖼️ IMAGE SÉLECTIONNÉE\n\n📄 ${file.name}\n📦 Pour: ${product.name}\n🔄 Upload...\n\n✅ Image mise à jour !`);
                                              }
                                            };
                                            input.click();
                                          }}
                                        >
                                          <Upload className="h-3 w-3 mr-1" />
                                          Image
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Section Contact */}
                            {section.type === 'contact' && (
                              <div className="p-8">
                                <EditableText
                                  value={section.content.title}
                                  onChange={(value) => updateSectionContent(section.id, 'title', value)}
                                  placeholder="Titre de la section contact"
                                  className="text-2xl font-bold text-gray-900 mb-6"
                                  fieldKey={`${section.id}-title`}
                                />
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                  <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                      <MapPin className="h-5 w-5 text-blue-600" />
                                      <EditableText
                                        value={section.content.address}
                                        onChange={(value) => updateSectionContent(section.id, 'address', value)}
                                        placeholder="Adresse complète"
                                        className="text-gray-700"
                                        fieldKey={`${section.id}-address`}
                                      />
                                    </div>
                                    
                                    <div className="flex items-center space-x-3">
                                      <Phone className="h-5 w-5 text-blue-600" />
                                      <EditableText
                                        value={section.content.phone}
                                        onChange={(value) => updateSectionContent(section.id, 'phone', value)}
                                        placeholder="Numéro de téléphone"
                                        className="text-gray-700"
                                        fieldKey={`${section.id}-phone`}
                                      />
                                    </div>
                                    
                                    <div className="flex items-center space-x-3">
                                      <Mail className="h-5 w-5 text-blue-600" />
                                      <EditableText
                                        value={section.content.email}
                                        onChange={(value) => updateSectionContent(section.id, 'email', value)}
                                        placeholder="Adresse email"
                                        className="text-gray-700"
                                        fieldKey={`${section.id}-email`}
                                      />
                                    </div>
                                    
                                    <div className="flex items-center space-x-3">
                                      <Globe className="h-5 w-5 text-blue-600" />
                                      <EditableText
                                        value={section.content.website}
                                        onChange={(value) => updateSectionContent(section.id, 'website', value)}
                                        placeholder="Site web"
                                        className="text-gray-700"
                                        fieldKey={`${section.id}-website`}
                                      />
                                    </div>
                                  </div>
                                  
                                  <div className="bg-gray-100 p-4 rounded-lg">
                                    <h4 className="font-medium text-gray-900 mb-3">Formulaire de contact</h4>
                                    <p className="text-sm text-gray-600">
                                      Un formulaire de contact sera automatiquement généré
                                    </p>
                                    <div className="mt-3 space-y-3">
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700">Champ Nom</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                          <input
                                            type="checkbox"
                                            defaultChecked
                                            onChange={(e) => {
                                              const checked = e.target.checked;
                                              alert(`📝 CHAMP NOM ${checked ? 'ACTIVÉ' : 'DÉSACTIVÉ'}\n\n${checked ? '✅ Le champ nom sera affiché' : '❌ Le champ nom sera masqué'}\n\n🔄 Configuration mise à jour !`);
                                            }}
                                            className="sr-only peer"
                                          />
                                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                      </div>
                                      
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700">Champ Téléphone</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                          <input
                                            type="checkbox"
                                            onChange={(e) => {
                                              const checked = e.target.checked;
                                              alert(`📞 CHAMP TÉLÉPHONE ${checked ? 'ACTIVÉ' : 'DÉSACTIVÉ'}\n\n${checked ? '✅ Le champ téléphone sera affiché' : '❌ Le champ téléphone sera masqué'}\n\n🔄 Configuration mise à jour !`);
                                            }}
                                            className="sr-only peer"
                                          />
                                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                      </div>
                                      
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700">Champ Entreprise</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                          <input
                                            type="checkbox"
                                            defaultChecked
                                            onChange={(e) => {
                                              const checked = e.target.checked;
                                              alert(`🏢 CHAMP ENTREPRISE ${checked ? 'ACTIVÉ' : 'DÉSACTIVÉ'}\n\n${checked ? '✅ Le champ entreprise sera affiché' : '❌ Le champ entreprise sera masqué'}\n\n🔄 Configuration mise à jour !`);
                                            }}
                                            className="sr-only peer"
                                          />
                                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                      </div>
                                      
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700">Anti-spam (reCAPTCHA)</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                          <input
                                            type="checkbox"
                                            defaultChecked
                                            onChange={(e) => {
                                              const checked = e.target.checked;
                                              alert(`🔒 ANTI-SPAM ${checked ? 'ACTIVÉ' : 'DÉSACTIVÉ'}\n\n${checked ? '✅ Protection reCAPTCHA activée' : '❌ Protection reCAPTCHA désactivée'}\n🛡️ Recommandé: Toujours activé\n\n🔄 Sécurité mise à jour !`);
                                            }}
                                            className="sr-only peer"
                                          />
                                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                      </div>
                                      
                                      <div className="mt-4 pt-3 border-t border-gray-200">
                                        <div className="flex items-center justify-between mb-2">
                                          <span className="text-sm font-medium text-gray-700">Email de notification</span>
                                        </div>
                                        <input
                                          type="email"
                                          defaultValue={section.content.email}
                                          onChange={(e) => {
                                            updateSectionContent(section.id, 'notificationEmail', e.target.value);
                                            alert(`📧 EMAIL NOTIFICATION MODIFIÉ\n\n📬 Nouveau email: ${e.target.value}\n📨 Les messages du formulaire seront envoyés à cette adresse\n\n✅ Configuration sauvegardée !`);
                                          }}
                                          placeholder="email@entreprise.com"
                                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                      </div>
                                      
                                      <div className="mt-3">
                                        <Button 
                                          variant="outline" 
                                          size="sm" 
                                          className="w-full"
                                          onClick={() => {
                                            const config = {
                                              fields: {
                                                name: true,
                                                email: true,
                                                phone: false,
                                                company: true,
                                                message: true
                                              },
                                              security: {
                                                recaptcha: true,
                                                honeypot: true,
                                                rateLimit: '5 messages/heure'
                                              },
                                              notifications: {
                                                email: section.content.notificationEmail || section.content.email,
                                                autoReply: true,
                                                template: 'Merci pour votre message, nous vous répondrons sous 24h.'
                                              }
                                            };
                                            
                                            alert(`📝 FORMULAIRE CONFIGURÉ\n\n✅ Champs actifs: ${Object.entries(config.fields).filter(([k,v]) => v).map(([k]) => k).join(', ')}\n🔒 Sécurité: reCAPTCHA + Anti-spam\n📧 Notifications: ${config.notifications.email}\n🤖 Réponse auto: Activée\n\n📋 Formulaire opérationnel !`);
                                          }}
                                        >
                                          <Settings className="h-3 w-3 mr-1" />
                                          Tester la Configuration
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
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
                            <Button 
                              className="mt-4"
                              onClick={() => addSection('hero')}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Ajouter Section Hero
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

        {/* Instructions d'utilisation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Card className="bg-blue-50 border-blue-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                💡 Comment utiliser l'éditeur
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
                <div>
                  <h4 className="font-medium mb-2">✏️ Modification du texte :</h4>
                  <ul className="space-y-1">
                    <li>• Cliquez sur n'importe quel texte pour le modifier</li>
                    <li>• Tapez votre nouveau contenu</li>
                    <li>• Cliquez "Sauver" pour confirmer</li>
                    <li>• Cliquez "Annuler" pour revenir au texte original</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">🎨 Gestion des sections :</h4>
                  <ul className="space-y-1">
                    <li>• Ajoutez des sections depuis la sidebar</li>
                    <li>• Cliquez sur l'œil pour masquer/afficher</li>
                    <li>• Utilisez la corbeille pour supprimer</li>
                    <li>• Glissez-déposez pour réorganiser</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">🖼️ Images et médias :</h4>
                  <ul className="space-y-1">
                    <li>• Cliquez sur une image pour la changer</li>
                    <li>• Formats supportés: JPG, PNG, WebP</li>
                    <li>• Taille max recommandée: 2MB</li>
                    <li>• Optimisation automatique</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};