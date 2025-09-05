import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft,
  CheckCircle,
  X,
  Eye,
  Clock,
  Building2,
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  FileText,
  Download,
  AlertTriangle,
  Loader,
  Shield,
  Award,
  Target,
  Briefcase
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useAuthStore } from '../../store/authStore';
import { motion } from 'framer-motion';

interface PendingExhibitor {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  website?: string;
  country: string;
  sector: string;
  description: string;
  submittedAt: Date;
  status: 'awaiting_commercial' | 'contract_in_progress' | 'contract_finalized' | 'documents_pending';
  documents: {
    businessLicense: string;
    companyProfile: string;
    productCatalog?: string;
    logo: string;
  };
  commercialInfo: {
    standSize: string;
    packageType: 'basic' | 'premium' | 'vip';
    contractValue: string;
    paymentStatus: 'pending' | 'partial' | 'completed';
  };
  products: Array<{
    name: string;
    category: string;
    description: string;
  }>;
}

const mockPendingExhibitors: PendingExhibitor[] = [
  {
    id: 'pending-1',
    companyName: 'Ocean Tech Solutions',
    contactName: 'Jean-Pierre Dubois',
    email: 'jp.dubois@oceantech.fr',
    phone: '+33 1 23 45 67 89',
    website: 'https://oceantech-solutions.fr',
    country: 'France',
    sector: 'Technologies Maritimes',
    description: 'Spécialiste en solutions IoT pour l\'optimisation des opérations portuaires et la surveillance maritime en temps réel.',
    submittedAt: new Date('2024-01-20T10:30:00'),
    status: 'contract_finalized',
    documents: {
      businessLicense: 'license-oceantech.pdf',
      companyProfile: 'profile-oceantech.pdf',
      productCatalog: 'catalog-oceantech.pdf',
      logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    commercialInfo: {
      standSize: '36m²',
      packageType: 'premium',
      contractValue: '45,000€',
      paymentStatus: 'completed'
    },
    products: [
      {
        name: 'SmartPort IoT Platform',
        category: 'Software',
        description: 'Plateforme IoT complète pour la gestion intelligente des ports'
      },
      {
        name: 'Maritime Sensors Suite',
        category: 'Hardware',
        description: 'Capteurs maritimes pour surveillance en temps réel'
      }
    ]
  },
  {
    id: 'pending-2',
    companyName: 'African Ports Development',
    contactName: 'Amina Hassan',
    email: 'a.hassan@africanports.com',
    phone: '+212 5 22 34 56 78',
    website: 'https://africanports.com',
    country: 'Maroc',
    sector: 'Développement Portuaire',
    description: 'Consultant en développement d\'infrastructures portuaires durables en Afrique avec expertise en financement de projets.',
    submittedAt: new Date('2024-01-18T14:15:00'),
    status: 'contract_in_progress',
    documents: {
      businessLicense: 'license-africanports.pdf',
      companyProfile: 'profile-africanports.pdf',
      logo: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    commercialInfo: {
      standSize: '18m²',
      packageType: 'basic',
      contractValue: '18,000€',
      paymentStatus: 'partial'
    },
    products: [
      {
        name: 'Port Development Consulting',
        category: 'Services',
        description: 'Conseil stratégique pour le développement portuaire'
      }
    ]
  }
];

export const ExhibitorValidation: React.FC = () => {
  const { getPendingUsers, activateUser } = useAuthStore();
  const [pendingExhibitors, setPendingExhibitors] = useState<PendingExhibitor[]>(mockPendingExhibitors);
  const [pendingUsers, setPendingUsers] = useState<any[]>([]);
  const [validatingAccounts, setValidatingAccounts] = useState<string[]>([]);
  const [selectedExhibitor, setSelectedExhibitor] = useState<PendingExhibitor | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'contract_finalized': return 'success';
      case 'contract_in_progress': return 'warning';
      case 'awaiting_commercial': return 'info';
      case 'documents_pending': return 'error';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'contract_finalized': return 'Contrat Finalisé - Prêt à Activer';
      case 'contract_in_progress': return 'Contrat en Cours de Négociation';
      case 'awaiting_commercial': return 'En Attente Équipe Commerciale';
      case 'documents_pending': return 'Documents Manquants';
      default: return status;
    }
  };

  const getPackageColor = (packageType: string) => {
    switch (packageType) {
      case 'vip': return 'bg-yellow-100 text-yellow-800';
      case 'premium': return 'bg-purple-100 text-purple-800';
      case 'basic': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPackageLabel = (packageType: string) => {
    switch (packageType) {
      case 'vip': return 'Package VIP';
      case 'premium': return 'Package Premium';
      case 'basic': return 'Package Basic';
      default: return packageType;
    }
  };

  const handleValidateExhibitor = async (exhibitor: PendingExhibitor) => {
    setValidatingAccounts(prev => [...prev, exhibitor.id]);
    
    try {
      // Simulation du processus d'activation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulation de la création du compte et du mini-site
      const activationSteps = [
        '✅ Compte exposant créé avec succès',
        '✅ Mini-site généré automatiquement',
        '✅ Espace d\'administration configuré',
        '✅ Email de bienvenue envoyé',
        '✅ Accès au tableau de bord accordé',
        '✅ Publication dans le répertoire exposants'
      ];
      
      alert(`🎉 ACTIVATION RÉUSSIE - ${exhibitor.companyName}\n\n${activationSteps.join('\n')}\n\n📧 Email envoyé à: ${exhibitor.email}\n🌐 Mini-site: siports.com/exhibitor/${exhibitor.companyName.toLowerCase().replace(/\s+/g, '-')}`);
      
      // Retirer de la liste des comptes en attente
      setPendingExhibitors(prev => prev.filter(e => e.id !== exhibitor.id));
      setValidatingAccounts(prev => prev.filter(id => id !== exhibitor.id));
      
    } catch (error) {
      console.error('Erreur lors de l\'activation:', error);
      setValidatingAccounts(prev => prev.filter(id => id !== exhibitor.id));
      alert('❌ Erreur lors de l\'activation du compte. Veuillez réessayer.');
    }
  };

  const handleRejectExhibitor = async (exhibitor: PendingExhibitor) => {
    const reason = prompt(`Motif de refus pour ${exhibitor.companyName}:`);
    if (!reason) return;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert(`❌ INSCRIPTION REFUSÉE - ${exhibitor.companyName}\n\nMotif: ${reason}\n\n📧 Email de notification envoyé à: ${exhibitor.email}`);
      
      // Retirer de la liste
      setPendingExhibitors(prev => prev.filter(e => e.id !== exhibitor.id));
      
    } catch (error) {
      console.error('Erreur lors du refus:', error);
      alert('❌ Erreur lors du refus. Veuillez réessayer.');
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour au Tableau de Bord Admin
              </Button>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-red-600 p-3 rounded-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Validation des Comptes Exposants
                </h1>
                <p className="text-gray-600">
                  Examinez et validez les demandes d'inscription des exposants
                </p>
              </div>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span className="text-red-800 font-medium">Zone Critique</span>
                <Badge variant="error" size="sm">{pendingExhibitors.length} en attente</Badge>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Statistiques Rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center p-6">
            <div className="bg-yellow-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {pendingExhibitors.filter(e => e.status === 'contract_finalized').length}
            </div>
            <div className="text-sm text-gray-600">Prêts à Activer</div>
          </Card>

          <Card className="text-center p-6">
            <div className="bg-blue-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
              <Briefcase className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {pendingExhibitors.filter(e => e.status === 'contract_in_progress').length}
            </div>
            <div className="text-sm text-gray-600">Contrats en Cours</div>
          </Card>

          <Card className="text-center p-6">
            <div className="bg-green-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {pendingExhibitors.filter(e => e.commercialInfo.paymentStatus === 'completed').length}
            </div>
            <div className="text-sm text-gray-600">Paiements Complets</div>
          </Card>

          <Card className="text-center p-6">
            <div className="bg-purple-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {pendingExhibitors.filter(e => e.commercialInfo.packageType === 'premium' || e.commercialInfo.packageType === 'vip').length}
            </div>
            <div className="text-sm text-gray-600">Packages Premium+</div>
          </Card>
        </div>

        {/* Liste des Exposants en Attente */}
        <div className="space-y-6">
          {pendingExhibitors.map((exhibitor, index) => (
            <motion.div
              key={exhibitor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={exhibitor.documents.logo}
                        alt={exhibitor.companyName}
                        className="h-16 w-16 rounded-lg object-cover border-2 border-gray-200"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {exhibitor.companyName}
                        </h3>
                        <p className="text-gray-600 mb-2">{exhibitor.sector}</p>
                        <div className="flex items-center space-x-3 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{exhibitor.country}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>Soumis le {formatDate(exhibitor.submittedAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant={getStatusColor(exhibitor.status) as any}
                        size="sm"
                      >
                        {getStatusLabel(exhibitor.status)}
                      </Badge>
                      <Badge 
                        className={getPackageColor(exhibitor.commercialInfo.packageType)}
                        size="sm"
                      >
                        {getPackageLabel(exhibitor.commercialInfo.packageType)}
                      </Badge>
                    </div>
                  </div>

                  {/* Informations Détaillées */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {/* Contact */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Contact Principal
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span>{exhibitor.contactName}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span>{exhibitor.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span>{exhibitor.phone}</span>
                        </div>
                        {exhibitor.website && (
                          <div className="flex items-center space-x-2">
                            <Globe className="h-4 w-4 text-gray-400" />
                            <a href={exhibitor.website} className="text-blue-600 hover:underline">
                              {exhibitor.website}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Informations Commerciales */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Briefcase className="h-4 w-4 mr-2" />
                        Informations Commerciales
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Taille stand:</span>
                          <span className="font-medium">{exhibitor.commercialInfo.standSize}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Package:</span>
                          <Badge className={getPackageColor(exhibitor.commercialInfo.packageType)} size="sm">
                            {getPackageLabel(exhibitor.commercialInfo.packageType)}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Valeur contrat:</span>
                          <span className="font-bold text-green-600">{exhibitor.commercialInfo.contractValue}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Paiement:</span>
                          <Badge 
                            variant={exhibitor.commercialInfo.paymentStatus === 'completed' ? 'success' : 'warning'}
                            size="sm"
                          >
                            {exhibitor.commercialInfo.paymentStatus === 'completed' ? 'Complet' : 
                             exhibitor.commercialInfo.paymentStatus === 'partial' ? 'Partiel' : 'En attente'}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Produits */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Target className="h-4 w-4 mr-2" />
                        Produits & Services
                      </h4>
                      <div className="space-y-2">
                        {exhibitor.products.map((product, idx) => (
                          <div key={idx} className="p-2 bg-gray-50 rounded-lg">
                            <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                            <p className="text-xs text-gray-600">{product.category}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Description de l'entreprise</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {exhibitor.description}
                    </p>
                  </div>

                  {/* Documents */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      Documents Fournis
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-800">Licence commerciale</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-800">Profil entreprise</span>
                      </div>
                      {exhibitor.documents.productCatalog && (
                        <div className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-800">Catalogue produits</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-800">Logo officiel</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    {exhibitor.status === 'contract_finalized' && (
                      <Button 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleValidateExhibitor(exhibitor)}
                        disabled={validatingAccounts.includes(exhibitor.id)}
                      >
                        {validatingAccounts.includes(exhibitor.id) ? (
                          <>
                            <Loader className="h-4 w-4 mr-2 animate-spin" />
                            Activation en cours...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Activer le Compte Exposant
                          </>
                        )}
                      </Button>
                    )}
                    
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setSelectedExhibitor(exhibitor);
                        setShowValidationModal(true);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Examiner en Détail
                    </Button>
                    
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger Documents
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => handleRejectExhibitor(exhibitor)}
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Refuser l'Inscription
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Message si aucun exposant en attente */}
        {pendingExhibitors.length === 0 && (
          <Card className="text-center p-12">
            <div className="bg-green-100 p-6 rounded-full w-24 h-24 mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Toutes les validations sont à jour !
            </h3>
            <p className="text-gray-600 mb-6">
              Aucun compte exposant en attente de validation
            </p>
            <Link to="/dashboard">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour au Tableau de Bord Admin
              </Button>
            </Link>
          </Card>
        )}
      </div>

      {/* Modal de Validation Détaillée */}
      {showValidationModal && selectedExhibitor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Validation Détaillée - {selectedExhibitor.companyName}
              </h3>
              <button
                onClick={() => {
                  setShowValidationModal(false);
                  setSelectedExhibitor(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Informations Entreprise */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Informations Entreprise</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nom:</span>
                      <span className="font-medium">{selectedExhibitor.companyName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Secteur:</span>
                      <span className="font-medium">{selectedExhibitor.sector}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pays:</span>
                      <span className="font-medium">{selectedExhibitor.country}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Contact:</span>
                      <span className="font-medium">{selectedExhibitor.contactName}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Description</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selectedExhibitor.description}
                  </p>
                </div>
              </div>

              {/* Informations Commerciales */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Détails Commerciaux</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Package:</span>
                      <Badge className={getPackageColor(selectedExhibitor.commercialInfo.packageType)}>
                        {getPackageLabel(selectedExhibitor.commercialInfo.packageType)}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taille stand:</span>
                      <span className="font-medium">{selectedExhibitor.commercialInfo.standSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Valeur contrat:</span>
                      <span className="font-bold text-green-600">{selectedExhibitor.commercialInfo.contractValue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Statut paiement:</span>
                      <Badge 
                        variant={selectedExhibitor.commercialInfo.paymentStatus === 'completed' ? 'success' : 'warning'}
                        size="sm"
                      >
                        {selectedExhibitor.commercialInfo.paymentStatus === 'completed' ? 'Complet' : 'Partiel'}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Produits Proposés</h4>
                  <div className="space-y-2">
                    {selectedExhibitor.products.map((product, idx) => (
                      <div key={idx} className="p-3 bg-blue-50 rounded-lg">
                        <p className="font-medium text-blue-900 text-sm">{product.name}</p>
                        <p className="text-xs text-blue-700">{product.category}</p>
                        <p className="text-xs text-gray-600 mt-1">{product.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Modal */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 mt-8">
              <Button 
                variant="outline"
                onClick={() => {
                  setShowValidationModal(false);
                  setSelectedExhibitor(null);
                }}
              >
                Fermer
              </Button>
              
              {selectedExhibitor.status === 'contract_finalized' && (
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    handleValidateExhibitor(selectedExhibitor);
                    setShowValidationModal(false);
                    setSelectedExhibitor(null);
                  }}
                  disabled={validatingAccounts.includes(selectedExhibitor.id)}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Activer ce Compte
                </Button>
              )}
              
              <Button
                variant="outline"
                onClick={() => {
                  handleRejectExhibitor(selectedExhibitor);
                  setShowValidationModal(false);
                  setSelectedExhibitor(null);
                }}
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                <X className="h-4 w-4 mr-2" />
                Refuser
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'contract_finalized': return 'success';
    case 'contract_in_progress': return 'warning';
    case 'awaiting_commercial': return 'info';
    case 'documents_pending': return 'error';
    default: return 'default';
  }
}

function getStatusLabel(status: string): string {
  switch (status) {
    case 'contract_finalized': return 'Contrat Finalisé - Prêt à Activer';
    case 'contract_in_progress': return 'Contrat en Cours de Négociation';
    case 'awaiting_commercial': return 'En Attente Équipe Commerciale';
    case 'documents_pending': return 'Documents Manquants';
    default: return status;
  }
}

function getPackageColor(packageType: string): string {
  switch (packageType) {
    case 'vip': return 'bg-yellow-100 text-yellow-800';
    case 'premium': return 'bg-purple-100 text-purple-800';
    case 'basic': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getPackageLabel(packageType: string): string {
  switch (packageType) {
    case 'vip': return 'Package VIP';
    case 'premium': return 'Package Premium';
    case 'basic': return 'Package Basic';
    default: return packageType;
  }
}