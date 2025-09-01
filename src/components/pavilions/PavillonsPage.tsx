import React, { useState, useEffect } from 'react';
import { Building2, Cog, GraduationCap, Landmark, Users, TrendingUp, Globe, Lightbulb, Award, Target, BarChart3, Calendar, MapPin, Handshake, Wrench, BookOpen, Mouse as Museum } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';

interface Pavilion {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
  objectives: string[];
  features: string[];
  targetAudience: string[];
  exhibitors: number;
  visitors: number;
  conferences: number;
}

export const PavillonsPage: React.FC = () => {
  const [selectedPavilion, setSelectedPavilion] = useState<string | null>(null);
  const [metrics, setMetrics] = useState({
    totalExhibitors: 0,
    totalVisitors: 0,
    totalConferences: 0,
    countries: 0
  });

  const pavilions: Pavilion[] = [
    {
      id: 'institutional',
      name: 'Pavillon Partenariat Institutionnel',
      title: 'Networking B2B & Coopération Internationale',
      description: 'Facilite les échanges et la coopération entre institutions gouvernementales, autorités portuaires et entreprises pour structurer de nouvelles routes maritimes.',
      icon: Landmark,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      objectives: [
        'Faciliter les échanges institutionnels',
        'Développer la coopération internationale',
        'Structurer de nouvelles routes maritimes',
        'Optimiser la connectivité mondiale'
      ],
      features: [
        'Outils de mise en relation B2B/B2G',
        'Gestion des partenariats institutionnels',
        'Plateforme de négociation d\'accords',
        'Suivi des projets de coopération'
      ],
      targetAudience: [
        'Autorités portuaires',
        'Ministères et gouvernements',
        'Organisations internationales',
        'Investisseurs institutionnels'
      ],
      exhibitors: 85,
      visitors: 1800,
      conferences: 12
    },
    {
      id: 'industry',
      name: 'Pavillon Industrie Portuaire',
      title: 'Échange d\'Expertise & Innovation Technologique',
      description: 'Met en relation les équipementiers, industriels et fournisseurs pour l\'échange de savoir-faire et le transfert de technologies innovantes.',
      icon: Cog,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      objectives: [
        'Promouvoir l\'innovation technologique',
        'Faciliter le transfert de technologies',
        'Développer l\'échange d\'expertise',
        'Accompagner la transformation digitale'
      ],
      features: [
        'Showroom virtuel d\'équipements',
        'Plateforme d\'échange d\'expertise',
        'Démonstrations technologiques',
        'Catalogue d\'innovations'
      ],
      targetAudience: [
        'Équipementiers portuaires',
        'Industriels maritimes',
        'Fournisseurs de technologies',
        'Intégrateurs de solutions'
      ],
      exhibitors: 120,
      visitors: 2200,
      conferences: 8
    },
    {
      id: 'operations',
      name: 'Pavillon Performance & Exploitation',
      title: 'Excellence Opérationnelle & Optimisation',
      description: 'Optimise la performance et l\'exploitation des ports à travers le partage de bonnes pratiques et solutions d\'excellence opérationnelle.',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      objectives: [
        'Optimiser les performances portuaires',
        'Partager les bonnes pratiques',
        'Améliorer l\'efficacité opérationnelle',
        'Développer l\'excellence opérationnelle'
      ],
      features: [
        'Benchmarking des performances',
        'Partage de bonnes pratiques',
        'Solutions d\'optimisation',
        'Outils de mesure de performance'
      ],
      targetAudience: [
        'Opérateurs portuaires',
        'Gestionnaires de terminaux',
        'Consultants en performance',
        'Directeurs d\'exploitation'
      ],
      exhibitors: 65,
      visitors: 1500,
      conferences: 6
    },
    {
      id: 'academic',
      name: 'Pavillon Académique et Scientifique',
      title: 'Formation, Innovation & Durabilité',
      description: 'Promeut la formation, la recherche et l\'innovation dans le secteur portuaire avec un focus sur la durabilité et l\'éco-responsabilité.',
      icon: GraduationCap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      objectives: [
        'Renforcer les compétences sectorielles',
        'Promouvoir l\'innovation durable',
        'Développer la recherche appliquée',
        'Former les talents de demain'
      ],
      features: [
        'Catalogue de formations',
        'Projets de recherche',
        'Solutions durables',
        'Programmes d\'échange'
      ],
      targetAudience: [
        'Universités et écoles',
        'Centres de formation',
        'Instituts de recherche',
        'Étudiants et chercheurs'
      ],
      exhibitors: 45,
      visitors: 800,
      conferences: 10
    },
    {
      id: 'museum',
      name: 'Musée des Ports',
      title: 'Expérience Immersive & Patrimoine Maritime',
      description: 'Offre une expérience immersive inédite sur l\'histoire, l\'évolution et l\'avenir des ports mondiaux avec des contenus interactifs innovants.',
      icon: Museum,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      objectives: [
        'Valoriser le patrimoine portuaire',
        'Offrir une expérience immersive',
        'Éduquer sur l\'évolution des ports',
        'Inspirer l\'avenir du secteur'
      ],
      features: [
        'Visite virtuelle interactive',
        'Timeline historique',
        'Réalité augmentée',
        'Contenus multimédias'
      ],
      targetAudience: [
        'Grand public',
        'Étudiants',
        'Professionnels du secteur',
        'Historiens maritimes'
      ],
      exhibitors: 15,
      visitors: 700,
      conferences: 4
    }
  ];

  useEffect(() => {
    // Calcul des métriques globales
    const totalExhibitors = pavilions.reduce((sum, p) => sum + p.exhibitors, 0);
    const totalVisitors = pavilions.reduce((sum, p) => sum + p.visitors, 0);
    const totalConferences = pavilions.reduce((sum, p) => sum + p.conferences, 0);
    
    setMetrics({
      totalExhibitors,
      totalVisitors,
      totalConferences,
      countries: 40
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-4">
              Pavillons Thématiques SIPORTS 2026
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Hub central pour le développement, l'innovation et la connectivité mondiale 
              de l'écosystème portuaire international
            </p>
          </motion.div>
        </div>
      </div>

      {/* Métriques Globales */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <Card className="text-center p-6">
            <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {metrics.totalExhibitors}+
            </div>
            <div className="text-gray-600">Exposants</div>
          </Card>

          <Card className="text-center p-6">
            <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {metrics.totalVisitors.toLocaleString()}+
            </div>
            <div className="text-gray-600">Visiteurs Professionnels</div>
          </Card>

          <Card className="text-center p-6">
            <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {metrics.totalConferences}+
            </div>
            <div className="text-gray-600">Conférences & Panels</div>
          </Card>

          <Card className="text-center p-6">
            <div className="bg-orange-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
              <Globe className="h-8 w-8 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {metrics.countries}
            </div>
            <div className="text-gray-600">Pays Représentés</div>
          </Card>
        </motion.div>

        {/* Pavillons Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {pavilions.map((pavilion, index) => {
            const Icon = pavilion.icon;
            const isSelected = selectedPavilion === pavilion.id;
            
            return (
              <motion.div
                key={pavilion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${isSelected ? 'lg:col-span-2 xl:col-span-3' : ''}`}
              >
                <Card 
                  hover 
                  className={`h-full cursor-pointer transition-all duration-300 ${
                    isSelected ? 'ring-2 ring-blue-500 shadow-xl' : ''
                  }`}
                  onClick={() => setSelectedPavilion(isSelected ? null : pavilion.id)}
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start space-x-4 mb-4">
                      <div className={`${pavilion.bgColor} p-3 rounded-lg`}>
                        <Icon className={`h-6 w-6 ${pavilion.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {pavilion.name}
                        </h3>
                        <p className="text-lg text-gray-700 font-medium mb-2">
                          {pavilion.title}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {pavilion.description}
                        </p>
                      </div>
                    </div>

                    {/* Métriques du Pavillon */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {pavilion.exhibitors}
                        </div>
                        <div className="text-xs text-gray-600">Exposants</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {pavilion.visitors.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600">Visiteurs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {pavilion.conferences}
                        </div>
                        <div className="text-xs text-gray-600">Conférences</div>
                      </div>
                    </div>

                    {/* Contenu Détaillé (si sélectionné) */}
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-gray-200 pt-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Objectifs */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                              <Target className="h-4 w-4 mr-2" />
                              Objectifs
                            </h4>
                            <ul className="space-y-2">
                              {pavilion.objectives.map((objective, idx) => (
                                <li key={idx} className="text-sm text-gray-600 flex items-start">
                                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0" />
                                  {objective}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Fonctionnalités */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                              <Lightbulb className="h-4 w-4 mr-2" />
                              Fonctionnalités
                            </h4>
                            <ul className="space-y-2">
                              {pavilion.features.map((feature, idx) => (
                                <li key={idx} className="text-sm text-gray-600 flex items-start">
                                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-2 flex-shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Public Cible */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                              <Users className="h-4 w-4 mr-2" />
                              Public Cible
                            </h4>
                            <div className="space-y-2">
                              {pavilion.targetAudience.map((audience, idx) => (
                                <Badge key={idx} variant="info" size="sm" className="mr-2 mb-2">
                                  {audience}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex space-x-4">
                          <Button
                            onClick={() => {
                              alert(`🏛️ VISITE VIRTUELLE\n\n📍 Pavillon: ${pavilion.name}\n🎯 ${pavilion.exhibitors} exposants\n👥 ${pavilion.visitors.toLocaleString()} visiteurs\n\n🚀 Visite immersive lancée !`);
                            }}
                          >
                            <MapPin className="h-4 w-4 mr-2" />
                            Visiter le Pavillon
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => {
                              alert(`🤝 NETWORKING PAVILLON\n\n🏛️ ${pavilion.name}\n👥 ${pavilion.visitors.toLocaleString()} participants\n🎯 Secteurs: ${pavilion.targetAudience.join(', ')}\n\n💼 Session de networking ouverte !`);
                            }}
                          >
                            <Handshake className="h-4 w-4 mr-2" />
                            Networking
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => {
                              alert(`📅 PROGRAMME PAVILLON\n\n🏛️ ${pavilion.name}\n🎤 ${pavilion.conferences} conférences\n📋 Programme détaillé:\n• Conférences techniques\n• Ateliers pratiques\n• Sessions networking\n\n📖 Programme complet affiché !`);
                            }}
                          >
                            <Calendar className="h-4 w-4 mr-2" />
                            Programme
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {/* CTA si non sélectionné */}
                    {!isSelected && (
                      <div className="flex justify-between items-center">
                        <Button variant="outline" size="sm">
                          Découvrir
                        </Button>
                        <div className="text-xs text-gray-500">
                          Cliquez pour plus de détails
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Section Innovation & Durabilité */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Focus Innovation & Durabilité
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  La plateforme SIPORTS met l'accent sur l'équipement, l'innovation, 
                  la formation et la durabilité pour accompagner la transition digitale 
                  et écologique des ports mondiaux.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                    <Wrench className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Équipement</h3>
                  <p className="text-sm text-gray-600">
                    Technologies et équipements portuaires de pointe
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                    <Lightbulb className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Innovation</h3>
                  <p className="text-sm text-gray-600">
                    Solutions innovantes et transformation digitale
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-orange-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Formation</h3>
                  <p className="text-sm text-gray-600">
                    Développement des compétences et transfert de savoir-faire
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                    <Award className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Durabilité</h3>
                  <p className="text-sm text-gray-600">
                    Infrastructures durables et éco-responsabilité
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};