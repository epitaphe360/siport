import React, { useState } from 'react';
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
  Award
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { motion } from 'framer-motion';

interface MiniSiteSection {
  id: string;
  type: 'hero' | 'about' | 'products' | 'gallery' | 'contact' | 'news';
  title: string;
  content: any;
  visible: boolean;
  order: number;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  lastModified: Date;
  moderatorComment?: string;
}

export const MiniSiteEditor: React.FC = () => {
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [pendingChanges, setPendingChanges] = useState(false);
  const [submittingForApproval, setSubmittingForApproval] = useState(false);

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
        ctaLink: '#products'
      },
      visible: true,
      order: 0,
      status: 'approved',
      lastModified: new Date(Date.now() - 86400000)
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
        ]
      },
      visible: true,
      order: 1,
      status: 'pending',
      lastModified: new Date(Date.now() - 3600000),
      moderatorComment: 'En attente de validation du contenu technique'
    },
    {
      id: '3',
      type: 'products',
      title: 'Produits & Services',
      content: {
        title: 'Nos solutions IoT',
        products: [
          {
            name: 'SmartPort IoT Platform',
            description: 'Plateforme IoT complète pour la gestion intelligente des ports',
            image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
            features: ['Analytics temps réel', 'API intégrée', 'Multi-capteurs']
          },
          {
            name: 'Maritime Sensors Suite',
            description: 'Suite de capteurs maritimes pour surveillance en temps réel',
            image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
            features: ['Résistance marine', 'Transmission satellite', 'Autonomie 5 ans']
          }
        ]
      },
      visible: true,
      order: 2,
      status: 'draft',
      lastModified: new Date(Date.now() - 1800000)
    }
  ]);

  const [siteSettings, setSiteSettings] = useState({
    primaryColor: '#1e40af',
    secondaryColor: '#3b82f6',
    accentColor: '#60a5fa',
    fontFamily: 'Inter',
    logoUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200',
    companyName: 'Ocean Tech Solutions',
    status: 'draft' as 'draft' | 'pending' | 'approved'
  });

  const handleSaveChanges = async () => {
    setPendingChanges(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('✅ Modifications sauvegardées en brouillon\n\nVos changements ont été enregistrés. Soumettez-les pour validation quand vous êtes prêt.');
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
      
      // Mettre à jour le statut des sections
      setSections(prev => prev.map(section => ({
        ...section,
        status: 'pending',
        lastModified: new Date()
      })));
      
      setSiteSettings(prev => ({ ...prev, status: 'pending' }));
      
      alert('🔄 SOUMISSION POUR VALIDATION\n\n✅ Modifications envoyées à l\'équipe de modération\n⏱️ Délai de validation: 24-48h\n📧 Vous recevrez un email de confirmation\n\n💡 Votre mini-site actuel reste visible pendant la validation.');
      
      setSubmittingForApproval(false);
    } catch (error) {
      setSubmittingForApproval(false);
      alert('❌ Erreur lors de la soumission');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return CheckCircle;
      case 'pending': return Clock;
      case 'rejected': return AlertTriangle;
      case 'draft': return FileText;
      default: return FileText;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'rejected': return 'text-red-600';
      case 'draft': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved': return 'Approuvé';
      case 'pending': return 'En validation';
      case 'rejected': return 'Refusé';
      case 'draft': return 'Brouillon';
      default: return status;
    }
  };

  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile': return 'w-80';
      case 'tablet': return 'w-96';
      case 'desktop': return 'w-full';
      default: return 'w-full';
    }
  };

  const hasPendingChanges = sections.some(s => s.status === 'draft') || siteSettings.status === 'draft';
  const hasRejectedContent = sections.some(s => s.status === 'rejected');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
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
                Éditeur de Mini-Site - {siteSettings.companyName}
              </h1>
              <p className="text-gray-600">
                Personnalisez votre vitrine digitale pour SIPORTS 2026
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Statut Global */}
              <div className="flex items-center space-x-2">
                <div className={`p-2 rounded-lg ${
                  siteSettings.status === 'approved' ? 'bg-green-100' :
                  siteSettings.status === 'pending' ? 'bg-yellow-100' :
                  siteSettings.status === 'rejected' ? 'bg-red-100' : 'bg-gray-100'
                }`}>
                  {siteSettings.status === 'approved' && <CheckCircle className="h-4 w-4 text-green-600" />}
                  {siteSettings.status === 'pending' && <Clock className="h-4 w-4 text-yellow-600" />}
                  {siteSettings.status === 'rejected' && <AlertTriangle className="h-4 w-4 text-red-600" />}
                  {siteSettings.status === 'draft' && <FileText className="h-4 w-4 text-gray-600" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Statut: {getStatusLabel(siteSettings.status)}
                  </p>
                  {siteSettings.status === 'pending' && (
                    <p className="text-xs text-yellow-600">Validation en cours (24-48h)</p>
                  )}
                </div>
              </div>

              {/* Preview Mode Selector */}
              <div className="flex items-center space-x-2 bg-white rounded-lg p-1 shadow-sm">
                <button
                  onClick={() => setPreviewMode('desktop')}
                  className={`p-2 rounded ${previewMode === 'desktop' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                >
                  <Monitor className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPreviewMode('tablet')}
                  className={`p-2 rounded ${previewMode === 'tablet' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                >
                  <Tablet className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPreviewMode('mobile')}
                  className={`p-2 rounded ${previewMode === 'mobile' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                >
                  <Smartphone className="h-4 w-4" />
                </button>
              </div>

              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Prévisualiser
              </Button>
              
              <Button 
                onClick={handleSaveChanges}
                disabled={pendingChanges}
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
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span className="text-red-800 font-medium">Contenu refusé détecté</span>
                <Badge variant="error" size="sm">Action requise</Badge>
              </div>
              <p className="text-red-700 text-sm mt-2">
                Certaines sections ont été refusées par la modération. Consultez les commentaires et apportez les corrections nécessaires.
              </p>
            </div>
          )}

          {siteSettings.status === 'pending' && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <span className="text-yellow-800 font-medium">Validation en cours</span>
                <Badge variant="warning" size="sm">24-48h</Badge>
              </div>
              <p className="text-yellow-700 text-sm mt-2">
                Vos modifications sont en cours de validation par notre équipe de modération. Vous recevrez un email de confirmation.
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Sections Management */}
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
                      Couleur principale
                    </label>
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
                        className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Sections List avec Statuts */}
            <Card>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Sections ({sections.length})
                </h3>
                
                <div className="space-y-2">
                  {sections.map((section) => {
                    const StatusIcon = getStatusIcon(section.status);
                    const statusColor = getStatusColor(section.status);
                    
                    return (
                      <div
                        key={section.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          activeSection === section.id 
                            ? 'border-blue-300 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setActiveSection(section.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Move className="h-4 w-4 text-gray-400 cursor-move" />
                            <span className="text-sm font-medium text-gray-900">
                              {section.title}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <StatusIcon className={`h-4 w-4 ${statusColor}`} />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSections(prev => prev.map(s => 
                                  s.id === section.id ? { ...s, visible: !s.visible } : s
                                ));
                              }}
                              className={`p-1 rounded ${
                                section.visible ? 'text-green-600' : 'text-gray-400'
                              }`}
                            >
                              <Eye className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Badge 
                            variant={
                              section.status === 'approved' ? 'success' :
                              section.status === 'pending' ? 'warning' :
                              section.status === 'rejected' ? 'error' : 'default'
                            }
                            size="sm"
                          >
                            {getStatusLabel(section.status)}
                          </Badge>
                          
                          <span className="text-xs text-gray-500">
                            {new Date(section.lastModified).toLocaleDateString('fr-FR')}
                          </span>
                        </div>

                        {section.moderatorComment && (
                          <div className="mt-2 p-2 bg-yellow-50 rounded text-xs text-yellow-800">
                            💬 {section.moderatorComment}
                          </div>
                        )}
                      </div>
                    );
                  })}
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
                      <span className="text-xs font-bold text-blue-600">1</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Modification</p>
                      <p className="text-xs text-gray-600">Éditez votre contenu</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-yellow-600">2</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Soumission</p>
                      <p className="text-xs text-gray-600">Envoi pour validation</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-green-600">3</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Publication</p>
                      <p className="text-xs text-gray-600">Mise en ligne automatique</p>
                    </div>
                  </div>
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
                          siports.com/exhibitor/{siteSettings.companyName.toLowerCase().replace(/\s+/g, '-')}
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
                            className={`relative border-2 transition-colors ${
                              activeSection === section.id ? 'border-blue-500' : 'border-transparent hover:border-blue-300'
                            }`}
                            onClick={() => setActiveSection(section.id)}
                          >
                            {/* Statut Overlay */}
                            <div className="absolute top-2 right-2 z-10">
                              <Badge 
                                variant={
                                  section.status === 'approved' ? 'success' :
                                  section.status === 'pending' ? 'warning' :
                                  section.status === 'rejected' ? 'error' : 'default'
                                }
                                size="sm"
                              >
                                {getStatusLabel(section.status)}
                              </Badge>
                            </div>

                            {section.type === 'hero' && (
                              <div 
                                className="relative h-64 bg-cover bg-center flex items-center justify-center"
                                style={{ 
                                  backgroundImage: section.content.backgroundImage 
                                    ? `url(${section.content.backgroundImage})` 
                                    : `linear-gradient(135deg, ${siteSettings.primaryColor} 0%, ${siteSettings.secondaryColor} 100%)`
                                }}
                              >
                                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                                <div className="relative text-center text-white px-6">
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

                            {section.type === 'about' && (
                              <div className="p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                  {section.content.title}
                                </h2>
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
                            )}

                            {section.type === 'products' && (
                              <div className="p-8 bg-gray-50">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                  {section.content.title}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                      <div className="flex flex-wrap gap-1">
                                        {product.features.map((feature: string, idx: number) => (
                                          <Badge key={idx} variant="info" size="sm">
                                            {feature}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
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