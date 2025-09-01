import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft,
  CheckCircle,
  X,
  Eye,
  Clock,
  AlertTriangle,
  FileText,
  MessageCircle,
  Shield,
  Loader,
  Edit,
  Flag,
  User,
  Building2
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { motion } from 'framer-motion';

interface PendingContent {
  id: string;
  exhibitorId: string;
  exhibitorName: string;
  sectionType: string;
  sectionTitle: string;
  content: any;
  submittedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
  moderatorId?: string;
  moderatorComment?: string;
  changes: string[];
  priority: 'low' | 'medium' | 'high';
}

const mockPendingContent: PendingContent[] = [
  {
    id: 'content-1',
    exhibitorId: 'exhibitor-1',
    exhibitorName: 'Ocean Tech Solutions',
    sectionType: 'about',
    sectionTitle: 'Section À propos',
    content: {
      title: 'Notre expertise IoT maritime',
      description: 'Avec plus de 15 ans d\'expérience dans l\'IoT maritime, nous développons des solutions innovantes...',
      features: ['Solutions IoT innovantes', 'Expertise maritime reconnue']
    },
    submittedAt: new Date(Date.now() - 3600000),
    status: 'pending',
    changes: ['Mise à jour description', 'Ajout nouvelles fonctionnalités'],
    priority: 'medium'
  },
  {
    id: 'content-2',
    exhibitorId: 'exhibitor-2',
    exhibitorName: 'African Ports Development',
    sectionType: 'products',
    sectionTitle: 'Catalogue Produits',
    content: {
      title: 'Nos services de consulting',
      products: [
        {
          name: 'Port Development Consulting',
          description: 'Conseil stratégique pour le développement portuaire'
        }
      ]
    },
    submittedAt: new Date(Date.now() - 7200000),
    status: 'pending',
    changes: ['Nouveau produit ajouté', 'Prix mis à jour'],
    priority: 'high'
  }
];

export const ModerationPanel: React.FC = () => {
  const [pendingContent, setPendingContent] = useState<PendingContent[]>(mockPendingContent);
  const [selectedContent, setSelectedContent] = useState<PendingContent | null>(null);
  const [showModerationModal, setShowModerationModal] = useState(false);
  const [moderationComment, setModerationComment] = useState('');
  const [moderatingContent, setModeratingContent] = useState<string[]>([]);

  const handleApproveContent = async (content: PendingContent) => {
    setModeratingContent(prev => [...prev, content.id]);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulation de l'approbation
      alert(`✅ CONTENU APPROUVÉ - ${content.exhibitorName}\n\n📝 Section: ${content.sectionTitle}\n🌐 Publication automatique sur le mini-site\n📧 Notification envoyée à l'exposant\n\n⏱️ Mise en ligne: Immédiate`);
      
      // Retirer de la liste des contenus en attente
      setPendingContent(prev => prev.filter(c => c.id !== content.id));
      setModeratingContent(prev => prev.filter(id => id !== content.id));
      
    } catch (error) {
      setModeratingContent(prev => prev.filter(id => id !== content.id));
      alert('❌ Erreur lors de l\'approbation');
    }
  };

  const handleRejectContent = async (content: PendingContent, comment: string) => {
    setModeratingContent(prev => [...prev, content.id]);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert(`❌ CONTENU REFUSÉ - ${content.exhibitorName}\n\n📝 Section: ${content.sectionTitle}\n💬 Motif: ${comment}\n📧 Notification avec corrections envoyée\n\n🔄 L'exposant peut modifier et resoumettre`);
      
      // Mettre à jour le statut
      setPendingContent(prev => prev.map(c => 
        c.id === content.id 
          ? { ...c, status: 'rejected', moderatorComment: comment }
          : c
      ));
      
      setModeratingContent(prev => prev.filter(id => id !== content.id));
      setShowModerationModal(false);
      setSelectedContent(null);
      setModerationComment('');
      
    } catch (error) {
      setModeratingContent(prev => prev.filter(id => id !== content.id));
      alert('❌ Erreur lors du refus');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Priorité Haute';
      case 'medium': return 'Priorité Moyenne';
      case 'low': return 'Priorité Basse';
      default: return priority;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
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
              <div className="bg-orange-600 p-3 rounded-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Panneau de Modération de Contenu
                </h1>
                <p className="text-gray-600">
                  Validez les modifications des mini-sites exposants
                </p>
              </div>
            </div>
            
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Flag className="h-5 w-5 text-orange-600" />
                <span className="text-orange-800 font-medium">Modération Active</span>
                <Badge variant="warning" size="sm">{pendingContent.length} contenus en attente</Badge>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Statistiques Modération */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center p-6">
            <div className="bg-yellow-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {pendingContent.filter(c => c.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600">En Attente</div>
          </Card>

          <Card className="text-center p-6">
            <div className="bg-red-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
              <Flag className="h-6 w-6 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {pendingContent.filter(c => c.priority === 'high').length}
            </div>
            <div className="text-sm text-gray-600">Priorité Haute</div>
          </Card>

          <Card className="text-center p-6">
            <div className="bg-green-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">47</div>
            <div className="text-sm text-gray-600">Approuvés Aujourd'hui</div>
          </Card>

          <Card className="text-center p-6">
            <div className="bg-blue-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">2.4</div>
            <div className="text-sm text-gray-600">Temps Moyen (min)</div>
          </Card>
        </div>

        {/* Liste des Contenus en Attente */}
        <div className="space-y-6">
          {pendingContent.map((content, index) => (
            <motion.div
              key={content.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Building2 className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {content.exhibitorName}
                        </h3>
                        <p className="text-gray-600">{content.sectionTitle}</p>
                        <p className="text-sm text-gray-500">
                          Soumis le {formatDate(content.submittedAt)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge 
                        className={getPriorityColor(content.priority)}
                        size="sm"
                      >
                        {getPriorityLabel(content.priority)}
                      </Badge>
                      <Badge variant="warning" size="sm">
                        {content.status === 'pending' ? 'En attente' : content.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Changements */}
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Modifications apportées :</h4>
                    <div className="flex flex-wrap gap-2">
                      {content.changes.map((change, idx) => (
                        <Badge key={idx} variant="info" size="sm">
                          {change}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Aperçu du Contenu */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Aperçu du contenu :</h4>
                    {content.sectionType === 'about' && (
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-1">{content.content.title}</h5>
                        <p className="text-sm text-gray-600 line-clamp-2">{content.content.description}</p>
                      </div>
                    )}
                    {content.sectionType === 'products' && (
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-1">{content.content.title}</h5>
                        <p className="text-sm text-gray-600">{content.content.products.length} produits</p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApproveContent(content)}
                      disabled={moderatingContent.includes(content.id)}
                    >
                      {moderatingContent.includes(content.id) ? (
                        <>
                          <Loader className="h-4 w-4 mr-2 animate-spin" />
                          Approbation...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approuver
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setSelectedContent(content);
                        setShowModerationModal(true);
                      }}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Refuser avec Commentaire
                    </Button>
                    
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Prévisualiser
                    </Button>
                    
                    <Button variant="outline">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contacter Exposant
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Message si aucun contenu en attente */}
        {pendingContent.length === 0 && (
          <Card className="text-center p-12">
            <div className="bg-green-100 p-6 rounded-full w-24 h-24 mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Toute la modération est à jour !
            </h3>
            <p className="text-gray-600 mb-6">
              Aucun contenu en attente de validation
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

      {/* Modal de Refus avec Commentaire */}
      {showModerationModal && selectedContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Refuser le Contenu
            </h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                <strong>{selectedContent.exhibitorName}</strong> - {selectedContent.sectionTitle}
              </p>
              
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motif du refus et corrections demandées :
              </label>
              <textarea
                value={moderationComment}
                onChange={(e) => setModerationComment(e.target.value)}
                placeholder="Expliquez les raisons du refus et les corrections à apporter..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                rows={4}
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowModerationModal(false);
                  setSelectedContent(null);
                  setModerationComment('');
                }}
              >
                Annuler
              </Button>
              <Button 
                onClick={() => handleRejectContent(selectedContent, moderationComment)}
                disabled={!moderationComment.trim()}
                className="bg-red-600 hover:bg-red-700"
              >
                <X className="h-4 w-4 mr-2" />
                Refuser le Contenu
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};