import React, { useState } from 'react';
import { 
  User, 
  Building2, 
  Mail, 
  Phone, 
  Globe, 
  MapPin,
  Edit,
  Save,
  X,
  Camera,
  Linkedin,
  Target,
  Award,
  Calendar,
  Eye,
  Upload,
  Video,
  Image as ImageIcon,
  FileText,
  Plus,
  Trash2
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useAuthStore } from '../../store/authStore';
import { motion } from 'framer-motion';

export const DetailedProfilePage: React.FC = () => {
  const { user, updateProfile, isLoading } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState<'basic' | 'company' | 'objectives' | 'media'>('basic');
  
  const [formData, setFormData] = useState({
    // Basic Information
    firstName: user?.profile.firstName || '',
    lastName: user?.profile.lastName || '',
    position: user?.profile.position || '',
    phone: user?.profile.phone || '',
    linkedin: user?.profile.linkedin || '',
    bio: user?.profile.bio || '',
    
    // Company Information (for Exhibitors/Partners)
    company: user?.profile.company || '',
    companyDescription: user?.profile.companyDescription || '',
    website: user?.profile.website || '',
    sectors: user?.profile.sectors || [],
    products: user?.profile.products || [],
    companySize: user?.profile.companySize || '',
    
    // Participation Objectives
    participationObjectives: user?.profile.participationObjectives || [],
    thematicInterests: user?.profile.thematicInterests || [],
    collaborationTypes: user?.profile.collaborationTypes || [],
    expertise: user?.profile.expertise || [],
    
    // Visitor Specific (if applicable)
    visitObjectives: user?.profile.visitObjectives || [],
    competencies: user?.profile.competencies || [],
    
    // Media
    videos: user?.profile.videos || [],
    images: user?.profile.images || []
  });

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    // Reset form data
    setFormData({
      firstName: user?.profile.firstName || '',
      lastName: user?.profile.lastName || '',
      position: user?.profile.position || '',
      phone: user?.profile.phone || '',
      linkedin: user?.profile.linkedin || '',
      bio: user?.profile.bio || '',
      company: user?.profile.company || '',
      companyDescription: user?.profile.companyDescription || '',
      website: user?.profile.website || '',
      sectors: user?.profile.sectors || [],
      products: user?.profile.products || [],
      companySize: user?.profile.companySize || '',
      participationObjectives: user?.profile.participationObjectives || [],
      thematicInterests: user?.profile.thematicInterests || [],
      collaborationTypes: user?.profile.collaborationTypes || [],
      expertise: user?.profile.expertise || [],
      visitObjectives: user?.profile.visitObjectives || [],
      competencies: user?.profile.competencies || [],
      videos: user?.profile.videos || [],
      images: user?.profile.images || []
    });
    setIsEditing(false);
  };

  // Available options for dropdowns
  const availableSectors = [
    'Port Operations', 'Maritime Technology', 'Logistics', 'Infrastructure', 
    'Equipment Manufacturing', 'Consulting', 'Research', 'Government', 
    'Training & Education', 'Finance & Investment'
  ];

  const availableThematicInterests = [
    'Digital Transformation', 'Sustainability', 'Automation', 'Green Energy',
    'Maritime Defense', 'Port Logistics', 'Smart Ports', 'Renewable Energy',
    'Maritime Security', 'Supply Chain', 'Innovation', 'Training'
  ];

  const availableCollaborationTypes = [
    'Technology Transfer', 'Joint Ventures', 'Distribution Partnership',
    'Research Partnership', 'Investment', 'Consulting', 'Training',
    'Public-Private Partnership', 'Knowledge Transfer'
  ];

  const availableParticipationObjectives = [
    'Find distributors', 'Find clients', 'Technology partnerships',
    'Talent acquisition', 'Market expansion', 'Innovation showcase',
    'Investment opportunities', 'Research collaboration'
  ];

  const availableVisitObjectives = [
    'Find suppliers', 'Technology scouting', 'Partnership opportunities',
    'Job opportunities', 'Market research', 'Learning & networking',
    'Investment opportunities'
  ];

  const companySizes = ['1-10', '11-50', '51-200', '201-1000', '1000+'];

  const addItem = (field: string, value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field as keyof typeof prev] as string[]), value.trim()]
      }));
    }
  };

  const removeItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).filter((_, i) => i !== index)
    }));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Accès non autorisé
          </h3>
          <p className="text-gray-600">
            Veuillez vous connecter pour accéder à votre profil
          </p>
        </div>
      </div>
    );
  }

  const sections = [
    { id: 'basic', label: 'Informations de Base', icon: User },
    { id: 'company', label: 'Profil Entreprise', icon: Building2 },
    { id: 'objectives', label: 'Objectifs & Intérêts', icon: Target },
    { id: 'media', label: 'Médias & Contenu', icon: ImageIcon }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Profil Détaillé
            </h1>
            <p className="text-gray-600">
              Gérez toutes vos informations professionnelles pour optimiser votre réseautage
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Card & Navigation */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="text-center">
              <div className="relative">
                <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-lg"></div>
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    <div className="h-24 w-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                      {user.profile.avatar ? (
                        <img
                          src={user.profile.avatar}
                          alt={user.name}
                          className="h-24 w-24 rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-12 w-12 text-gray-400" />
                      )}
                    </div>
                    <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="pt-16 pb-6 px-6">
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {user.profile.firstName} {user.profile.lastName}
                </h2>
                <p className="text-gray-600 mb-2">{user.profile.position}</p>
                <p className="text-sm text-gray-500 mb-4">{user.profile.company}</p>
                
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Badge variant="info" size="sm">
                    {user.type === 'exhibitor' ? 'Exposant' : 
                     user.type === 'partner' ? 'Partenaire' : 'Visiteur'}
                  </Badge>
                  <Badge variant="success" size="sm">
                    <Eye className="h-3 w-3 mr-1" />
                    1,247 vues
                  </Badge>
                </div>

                {/* Profile Completeness */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Profil complété</span>
                    <span className="font-medium text-gray-900">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-2">
                  {user.profile.linkedin && (
                    <a
                      href={user.profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-700"
                    >
                      <Linkedin className="h-4 w-4" />
                      <span className="text-sm">LinkedIn</span>
                    </a>
                  )}
                  
                  {user.profile.website && (
                    <a
                      href={user.profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-700"
                    >
                      <Globe className="h-4 w-4" />
                      <span className="text-sm">Site web</span>
                    </a>
                  )}
                </div>
              </div>
            </Card>

            {/* Section Navigation */}
            <Card>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Sections du Profil</h3>
                <nav className="space-y-2">
                  {sections.map(section => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id as any)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeSection === section.id
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{section.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {sections.find(s => s.id === activeSection)?.label}
                  </h2>
                  {!isEditing ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Modifier
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancel}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Annuler
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSave}
                        disabled={isLoading}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Sauvegarder
                      </Button>
                    </div>
                  )}
                </div>

                {/* Basic Information Section */}
                {activeSection === 'basic' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Prénom *
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{user.profile.firstName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom *
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{user.profile.lastName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <div className="flex items-center space-x-2 py-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <p className="text-gray-900">{user.email}</p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Téléphone
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <div className="flex items-center space-x-2 py-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <p className="text-gray-900">{user.profile.phone}</p>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Poste/Fonction *
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.position}
                            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{user.profile.position}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          LinkedIn
                        </label>
                        {isEditing ? (
                          <input
                            type="url"
                            value={formData.linkedin}
                            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <div className="flex items-center space-x-2 py-2">
                            <Linkedin className="h-4 w-4 text-gray-400" />
                            <p className="text-gray-900">{user.profile.linkedin || 'Non renseigné'}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description Professionnelle *
                      </label>
                      {isEditing ? (
                        <textarea
                          value={formData.bio}
                          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Décrivez votre activité, vos expertises, vos objectifs..."
                        />
                      ) : (
                        <p className="text-gray-900 py-2 leading-relaxed">{user.profile.bio || 'Aucune description renseignée'}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Company Information Section */}
                {activeSection === 'company' && (user.type === 'exhibitor' || user.type === 'partner') && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom de l'Entreprise *
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{user.profile.company}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Site Web
                        </label>
                        {isEditing ? (
                          <input
                            type="url"
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <div className="flex items-center space-x-2 py-2">
                            <Globe className="h-4 w-4 text-gray-400" />
                            <p className="text-gray-900">{user.profile.website || 'Non renseigné'}</p>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Taille de l'Entreprise
                        </label>
                        {isEditing ? (
                          <select
                            value={formData.companySize}
                            onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Sélectionner</option>
                            {companySizes.map(size => (
                              <option key={size} value={size}>{size} employés</option>
                            ))}
                          </select>
                        ) : (
                          <p className="text-gray-900 py-2">{user.profile.companySize || 'Non renseigné'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pays
                        </label>
                        <div className="flex items-center space-x-2 py-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <p className="text-gray-900">{user.profile.country}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description de l'Entreprise
                      </label>
                      {isEditing ? (
                        <textarea
                          value={formData.companyDescription}
                          onChange={(e) => setFormData({ ...formData, companyDescription: e.target.value })}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Présentez votre entreprise, ses activités principales, sa mission..."
                        />
                      ) : (
                        <p className="text-gray-900 py-2 leading-relaxed">{user.profile.companyDescription || 'Aucune description d\'entreprise'}</p>
                      )}
                    </div>

                    {/* Sectors */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Secteurs d'Activité
                      </label>
                      {isEditing ? (
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-2">
                            {formData.sectors.map((sector, index) => (
                              <div key={index} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                <span>{sector}</span>
                                <button
                                  onClick={() => removeItem('sectors', index)}
                                  className="ml-2 text-blue-600 hover:text-blue-800"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                          <select
                            onChange={(e) => {
                              if (e.target.value && !formData.sectors.includes(e.target.value)) {
                                addItem('sectors', e.target.value);
                                e.target.value = '';
                              }
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Ajouter un secteur</option>
                            {availableSectors.map(sector => (
                              <option key={sector} value={sector}>{sector}</option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2 py-2">
                          {user.profile.sectors?.map((sector, index) => (
                            <Badge key={index} variant="info" size="sm">
                              {sector}
                            </Badge>
                          ))}
                          {(!user.profile.sectors || user.profile.sectors.length === 0) && (
                            <p className="text-gray-500 text-sm">Aucun secteur renseigné</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Products/Services */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Produits/Services Proposés
                      </label>
                      {isEditing ? (
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-2">
                            {formData.products.map((product, index) => (
                              <div key={index} className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                <span>{product}</span>
                                <button
                                  onClick={() => removeItem('products', index)}
                                  className="ml-2 text-green-600 hover:text-green-800"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              placeholder="Ajouter un produit/service"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  addItem('products', e.currentTarget.value);
                                  e.currentTarget.value = '';
                                }
                              }}
                            />
                            <Button
                              type="button"
                              size="sm"
                              onClick={(e) => {
                                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                if (input.value.trim()) {
                                  addItem('products', input.value);
                                  input.value = '';
                                }
                              }}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2 py-2">
                          {user.profile.products?.map((product, index) => (
                            <Badge key={index} variant="success" size="sm">
                              {product}
                            </Badge>
                          ))}
                          {(!user.profile.products || user.profile.products.length === 0) && (
                            <p className="text-gray-500 text-sm">Aucun produit/service renseigné</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Objectives Section */}
                {activeSection === 'objectives' && (
                  <div className="space-y-6">
                    {/* Participation Objectives */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Objectifs de Participation au Salon
                      </label>
                      {isEditing ? (
                        <div className="space-y-2">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {availableParticipationObjectives.map(objective => (
                              <label key={objective} className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={formData.participationObjectives.includes(objective)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setFormData({
                                        ...formData,
                                        participationObjectives: [...formData.participationObjectives, objective]
                                      });
                                    } else {
                                      setFormData({
                                        ...formData,
                                        participationObjectives: formData.participationObjectives.filter(o => o !== objective)
                                      });
                                    }
                                  }}
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <span className="text-sm text-gray-700">{objective}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2 py-2">
                          {user.profile.participationObjectives?.map((objective, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              <span className="text-sm text-gray-700">{objective}</span>
                            </div>
                          ))}
                          {(!user.profile.participationObjectives || user.profile.participationObjectives.length === 0) && (
                            <p className="text-gray-500 text-sm">Aucun objectif de participation renseigné</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Thematic Interests */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Thématiques d'Intérêt
                      </label>
                      {isEditing ? (
                        <div className="space-y-2">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {availableThematicInterests.map(interest => (
                              <label key={interest} className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={formData.thematicInterests.includes(interest)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setFormData({
                                        ...formData,
                                        thematicInterests: [...formData.thematicInterests, interest]
                                      });
                                    } else {
                                      setFormData({
                                        ...formData,
                                        thematicInterests: formData.thematicInterests.filter(i => i !== interest)
                                      });
                                    }
                                  }}
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <span className="text-sm text-gray-700">{interest}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2 py-2">
                          {user.profile.thematicInterests?.map((interest, index) => (
                            <Badge key={index} variant="warning" size="sm">
                              {interest}
                            </Badge>
                          ))}
                          {(!user.profile.thematicInterests || user.profile.thematicInterests.length === 0) && (
                            <p className="text-gray-500 text-sm">Aucune thématique d'intérêt renseignée</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Collaboration Types */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Types de Collaboration Recherchés
                      </label>
                      {isEditing ? (
                        <div className="space-y-2">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {availableCollaborationTypes.map(type => (
                              <label key={type} className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={formData.collaborationTypes.includes(type)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setFormData({
                                        ...formData,
                                        collaborationTypes: [...formData.collaborationTypes, type]
                                      });
                                    } else {
                                      setFormData({
                                        ...formData,
                                        collaborationTypes: formData.collaborationTypes.filter(t => t !== type)
                                      });
                                    }
                                  }}
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <span className="text-sm text-gray-700">{type}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2 py-2">
                          {user.profile.collaborationTypes?.map((type, index) => (
                            <Badge key={index} variant="error" size="sm">
                              {type}
                            </Badge>
                          ))}
                          {(!user.profile.collaborationTypes || user.profile.collaborationTypes.length === 0) && (
                            <p className="text-gray-500 text-sm">Aucun type de collaboration renseigné</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Expertise */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Domaines d'Expertise
                      </label>
                      {isEditing ? (
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-2">
                            {formData.expertise.map((exp, index) => (
                              <div key={index} className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                                <span>{exp}</span>
                                <button
                                  onClick={() => removeItem('expertise', index)}
                                  className="ml-2 text-purple-600 hover:text-purple-800"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              placeholder="Ajouter une expertise"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  addItem('expertise', e.currentTarget.value);
                                  e.currentTarget.value = '';
                                }
                              }}
                            />
                            <Button
                              type="button"
                              size="sm"
                              onClick={(e) => {
                                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                if (input.value.trim()) {
                                  addItem('expertise', input.value);
                                  input.value = '';
                                }
                              }}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2 py-2">
                          {user.profile.expertise?.map((exp, index) => (
                            <Badge key={index} variant="default" size="sm">
                              {exp}
                            </Badge>
                          ))}
                          {(!user.profile.expertise || user.profile.expertise.length === 0) && (
                            <p className="text-gray-500 text-sm">Aucune expertise renseignée</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Visitor Specific Objectives */}
                {activeSection === 'objectives' && user.type === 'visitor' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Objectifs de Visite
                      </label>
                      {isEditing ? (
                        <div className="space-y-2">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {availableVisitObjectives.map(objective => (
                              <label key={objective} className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={formData.visitObjectives?.includes(objective)}
                                  onChange={(e) => {
                                    const current = formData.visitObjectives || [];
                                    if (e.target.checked) {
                                      setFormData({
                                        ...formData,
                                        visitObjectives: [...current, objective]
                                      });
                                    } else {
                                      setFormData({
                                        ...formData,
                                        visitObjectives: current.filter(o => o !== objective)
                                      });
                                    }
                                  }}
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <span className="text-sm text-gray-700">{objective}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2 py-2">
                          {user.profile.visitObjectives?.map((objective, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                              <span className="text-sm text-gray-700">{objective}</span>
                            </div>
                          ))}
                          {(!user.profile.visitObjectives || user.profile.visitObjectives.length === 0) && (
                            <p className="text-gray-500 text-sm">Aucun objectif de visite renseigné</p>
                          )}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Compétences et Expertises
                      </label>
                      {isEditing ? (
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-2">
                            {(formData.competencies || []).map((comp, index) => (
                              <div key={index} className="flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                                <span>{comp}</span>
                                <button
                                  onClick={() => removeItem('competencies', index)}
                                  className="ml-2 text-orange-600 hover:text-orange-800"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              placeholder="Ajouter une compétence"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  const current = formData.competencies || [];
                                  setFormData({
                                    ...formData,
                                    competencies: [...current, e.currentTarget.value]
                                  });
                                  e.currentTarget.value = '';
                                }
                              }}
                            />
                            <Button
                              type="button"
                              size="sm"
                              onClick={(e) => {
                                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                if (input.value.trim()) {
                                  const current = formData.competencies || [];
                                  setFormData({
                                    ...formData,
                                    competencies: [...current, input.value]
                                  });
                                  input.value = '';
                                }
                              }}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2 py-2">
                          {user.profile.competencies?.map((comp, index) => (
                            <Badge key={index} variant="warning" size="sm">
                              {comp}
                            </Badge>
                          ))}
                          {(!user.profile.competencies || user.profile.competencies.length === 0) && (
                            <p className="text-gray-500 text-sm">Aucune compétence renseignée</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Media Section */}
                {activeSection === 'media' && (
                  <div className="space-y-6">
                    {/* Videos */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vidéos de Présentation
                      </label>
                      {isEditing ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {formData.videos.map((video, index) => (
                              <div key={index} className="relative border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <Video className="h-5 w-5 text-blue-600" />
                                  <button
                                    onClick={() => removeItem('videos', index)}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                                <p className="text-sm text-gray-600 truncate">{video}</p>
                              </div>
                            ))}
                          </div>
                          <div className="flex space-x-2">
                            <input
                              type="url"
                              placeholder="URL de la vidéo (YouTube, Vimeo...)"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  addItem('videos', e.currentTarget.value);
                                  e.currentTarget.value = '';
                                }
                              }}
                            />
                            <Button
                              type="button"
                              size="sm"
                              onClick={(e) => {
                                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                if (input.value.trim()) {
                                  addItem('videos', input.value);
                                  input.value = '';
                                }
                              }}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
                          {user.profile.videos?.map((video, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex items-center space-x-2 mb-2">
                                <Video className="h-4 w-4 text-blue-600" />
                                <span className="text-sm font-medium text-gray-900">Vidéo {index + 1}</span>
                              </div>
                              <a 
                                href={video} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:underline truncate block"
                              >
                                {video}
                              </a>
                            </div>
                          ))}
                          {(!user.profile.videos || user.profile.videos.length === 0) && (
                            <p className="text-gray-500 text-sm">Aucune vidéo ajoutée</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Images */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Images de Présentation
                      </label>
                      {isEditing ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {formData.images.map((image, index) => (
                              <div key={index} className="relative">
                                <img
                                  src={image}
                                  alt={`Image ${index + 1}`}
                                  className="w-full h-24 object-cover rounded-lg border border-gray-200"
                                />
                                <button
                                  onClick={() => removeItem('images', index)}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                          <div className="flex space-x-2">
                            <input
                              type="url"
                              placeholder="URL de l'image"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  addItem('images', e.currentTarget.value);
                                  e.currentTarget.value = '';
                                }
                              }}
                            />
                            <Button
                              type="button"
                              size="sm"
                              onClick={(e) => {
                                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                if (input.value.trim()) {
                                  addItem('images', input.value);
                                  input.value = '';
                                }
                              }}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-2">
                          {user.profile.images?.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Image ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg border border-gray-200"
                            />
                          ))}
                          {(!user.profile.images || user.profile.images.length === 0) && (
                            <p className="text-gray-500 text-sm col-span-full">Aucune image ajoutée</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Upload Section */}
                    {isEditing && (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">
                          Glissez-déposez vos fichiers ou cliquez pour sélectionner
                        </p>
                        <p className="text-xs text-gray-500">
                          Formats supportés: JPG, PNG, MP4, PDF (max 10MB)
                        </p>
                        <Button variant="outline" size="sm" className="mt-3">
                          <Upload className="h-4 w-4 mr-2" />
                          Sélectionner des fichiers
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};