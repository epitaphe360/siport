import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, MapPin, Users, ArrowRight, Calendar } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useExhibitorStore } from '../../store/exhibitorStore';
import { motion } from 'framer-motion';

export const FeaturedExhibitors: React.FC = () => {
  const { exhibitors, fetchExhibitors, isLoading } = useExhibitorStore();
  const featuredExhibitors = exhibitors.filter(e => e.featured).slice(0, 3);

  useEffect(() => {
    if (exhibitors.length === 0) {
      fetchExhibitors();
    }
  }, [exhibitors.length, fetchExhibitors]);

  const getCategoryLabel = (category: string) => {
    const labels = {
      'institutional': 'Institutionnel',
      'port-industry': 'Industrie Portuaire',
      'port-operations': 'Exploitation & Gestion',
      'academic': 'Académique & Formation'
    };
    return labels[category as keyof typeof labels] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'institutional': 'success',
      'port-industry': 'error',
      'port-operations': 'info',
      'academic': 'warning'
    };
    return colors[category as keyof typeof colors] || 'default';
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Exposants à la Une
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-lg p-6 h-80">
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-20 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Exposants à la Une
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez les leaders de l'industrie portuaire qui participent au salon SIPORTS 2026
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredExhibitors.map((exhibitor, index) => (
            <motion.div
              key={exhibitor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="h-full">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={exhibitor.logo}
                        alt={exhibitor.companyName}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {exhibitor.companyName}
                        </h3>
                        <p className="text-sm text-gray-500">{exhibitor.sector}</p>
                      </div>
                    </div>
                    {exhibitor.verified && (
                      <Badge variant="success" size="sm">
                        Vérifié
                      </Badge>
                    )}
                  </div>

                  {/* Category */}
                  <div className="mb-4">
                    <Badge 
                      variant={getCategoryColor(exhibitor.category) as any}
                      size="sm"
                    >
                      {getCategoryLabel(exhibitor.category)}
                    </Badge>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-6 flex-grow line-clamp-3">
                    {exhibitor.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{exhibitor.miniSite.views} vues</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{exhibitor.products.length} produits</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <Link to={`/exhibitors/${exhibitor.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        Voir le Profil
                      </Button>
                    </Link>
                    <Link to={`/appointments?exhibitor=${exhibitor.id}`}>
                      <Button size="sm" className="ml-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        RDV
                      </Button>
                    </Link>
                    {exhibitor.website && (
                      <a
                        href={exhibitor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/exhibitors">
            <Button size="lg">
              Voir Tous les Exposants
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};