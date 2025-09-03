import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Calendar,
  Download,
  Share2,
  MessageCircle,
  Star,
  Award,
  Users,
  Clock,
  ArrowLeft,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { motion } from 'framer-motion';

export const MiniSitePreview: React.FC = () => {
  const { exhibitorId } = useParams<{ exhibitorId: string }>();

  // Mock data for the mini-site
  const miniSiteData = {
    id: '1',
    exhibitorId: '1',
    companyName: 'Port Solutions Inc.',
    logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200',
    theme: {
      primaryColor: '#1e40af',
      secondaryColor: '#3b82f6',
      accentColor: '#60a5fa',
      fontFamily: 'Inter'
    },
    hero: {
      title: 'Port Solutions Inc.',
      subtitle: 'Leading provider of integrated port management solutions',
      backgroundImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200',
      ctaText: 'Découvrir nos solutions',
      ctaLink: '#products'
    },
    about: {
      title: 'Notre expertise',
      description: 'Avec plus de 20 ans d\'expérience dans le secteur portuaire, nous accompagnons les ports du monde entier dans leur transformation digitale. Notre équipe d\'experts développe des solutions innovantes pour optimiser les opérations portuaires et améliorer l\'efficacité des chaînes logistiques.',
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
      ]
    },
    products: [
      {
        id: '1',
        name: 'SmartPort Management System',
        description: 'Plateforme complète de gestion portuaire avec analytics temps réel',
        image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
        features: ['Analytics temps réel', 'API intégrée', 'Multi-langues'],
        price: 'Sur devis',
        category: 'Software'
      },
      {
        id: '2',
        name: 'Port Analytics Dashboard',
        description: 'Outils d\'analyse et de reporting avancés pour optimiser les performances',
        image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
        features: ['Dashboards personnalisés', 'Prédictions IA', 'Export données'],
        price: 'À partir de 5000€',
        category: 'Analytics'
      },
      {
        id: '3',
        name: 'Mobile Port App',
        description: 'Application mobile pour la gestion des opérations portuaires en mobilité',
        image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
        features: ['Interface intuitive', 'Mode offline', 'Synchronisation cloud'],
        price: '2500€/an',
        category: 'Mobile'
      }
    ],
    news: [
      {
        id: '1',
        title: 'Nouveau partenariat avec le Port de Rotterdam',
        excerpt: 'Nous sommes fiers d\'annoncer notre nouveau partenariat stratégique...',
        date: '2024-01-15',
        image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Partenariat'
      },
      {
        id: '2',
        title: 'Lancement de la version 3.0 de SmartPort',
        excerpt: 'La nouvelle version apporte des fonctionnalités révolutionnaires...',
        date: '2024-01-10',
        image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Produit'
      }
    ],
    contact: {
      address: '123 Port Avenue, Casablanca, Maroc',
      phone: '+212 6 12 34 56 78',
      email: 'contact@portsolutions.com',
      website: 'https://portsolutions.com',
      hours: 'Lun-Ven: 8h-18h',
      social: {
        linkedin: 'https://linkedin.com/company/portsolutions',
        twitter: 'https://twitter.com/portsolutions'
      }
    },
    gallery: [
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    testimonials: [
      {
        name: 'Jean Dupont',
        position: 'Directeur Technique',
        company: 'Port de Marseille',
        comment: 'Une solution exceptionnelle qui a transformé nos opérations.',
        avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Bouton de retour */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto">
          <Link to="/minisite">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au Créateur de Mini-Site
            </Button>
          </Link>
        </div>
      </div>

      {/* Navigation Sticky */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <img
                src={miniSiteData.logo}
                alt={miniSiteData.companyName}
                className="h-10 w-10 rounded-lg"
              />
              <span className="font-bold text-gray-900">{miniSiteData.companyName}</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#accueil" className="text-gray-700 hover:text-blue-600">Accueil</a>
              <a href="#apropos" className="text-gray-700 hover:text-blue-600">À propos</a>
              <a href="#produits" className="text-gray-700 hover:text-blue-600">Produits</a>
              <a href="#actualites" className="text-gray-700 hover:text-blue-600">Actualités</a>
              <a href="#galerie" className="text-gray-700 hover:text-blue-600">Galerie</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
            </div>

            <div className="flex items-center space-x-3">
              <Button size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="relative h-96 bg-cover bg-center" style={{
        backgroundImage: `url(${miniSiteData.hero.backgroundImage})`
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white max-w-2xl"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              {miniSiteData.hero.title}
            </h1>
            <p className="text-xl mb-8 opacity-90">
              {miniSiteData.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                {miniSiteData.hero.ctaText}
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Download className="h-4 w-4 mr-2" />
                Télécharger catalogue
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="apropos" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {miniSiteData.about.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {miniSiteData.about.description}
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {miniSiteData.about.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {miniSiteData.about.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-lg shadow-sm"
              >
                <div className="bg-blue-100 p-3 rounded-lg w-12 h-12 mx-auto mb-4">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{feature}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="produits" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nos Produits & Services
            </h2>
            <p className="text-lg text-gray-600">
              Découvrez notre gamme complète de solutions portuaires
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {miniSiteData.products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="info" size="sm">
                        {product.category}
                      </Badge>
                      <span className="text-sm font-semibold text-blue-600">
                        {product.price}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {product.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      {product.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.features.map((feature, idx) => (
                        <Badge key={idx} variant="default" size="sm">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button size="sm" className="flex-1">
                        Demander un devis
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="actualites" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Actualités
            </h2>
            <p className="text-lg text-gray-600">
              Restez informé de nos dernières nouvelles
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {miniSiteData.news.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover>
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="success" size="sm">
                        {article.category}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {new Date(article.date).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      {article.excerpt}
                    </p>
                    
                    <Button variant="outline" size="sm">
                      Lire la suite
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galerie" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Galerie
            </h2>
            <p className="text-lg text-gray-600">
              Découvrez nos réalisations en images
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {miniSiteData.gallery.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="aspect-square overflow-hidden rounded-lg cursor-pointer hover:scale-105 transition-transform"
              >
                <img
                  src={image}
                  alt={`Galerie ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Disponibilités RDV */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Prendre Rendez-vous
                  </h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Planifiez une rencontre personnalisée avec notre équipe pendant SIPORTS 2026. 
                    Choisissez le format qui vous convient le mieux.
                  </p>
                </div>
                
                {/* Créneaux Disponibles */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {[
                    {
                      date: '5 Février 2026',
                      slots: ['09:00-09:30', '14:00-14:30', '16:00-16:30'],
                      type: 'Présentiel',
                      location: 'Stand A-12',
                      available: 3
                    },
                    {
                      date: '6 Février 2026',
                      slots: ['10:00-10:30', '15:00-15:30'],
                      type: 'Virtuel',
                      location: 'Visioconférence',
                      available: 2
                    },
                    {
                      date: '7 Février 2026',
                      slots: ['11:00-11:30', '13:00-13:30', '17:00-17:30'],
                      type: 'Hybride',
                      location: 'Stand + Visio',
                      available: 3
                    }
                  ].map((day, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-blue-200">
                      <div className="text-center mb-4">
                        <h4 className="font-bold text-gray-900 mb-2">{day.date}</h4>
                        <Badge variant="info" size="sm" className="mb-2">
                          {day.type}
                        </Badge>
                        <p className="text-sm text-gray-600">{day.location}</p>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        {day.slots.map((slot, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-700">{slot}</span>
                            <Badge variant="success" size="sm">Libre</Badge>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => {
                          const appointmentData = {
                            date: day.date,
                            type: day.type,
                            location: day.location,
                            availableSlots: day.slots.length,
                            exhibitor: 'Port Solutions Inc.'
                          };
                          
                          alert(`📅 DEMANDE DE RDV\n\n🏢 Exposant: ${appointmentData.exhibitor}\n📅 Date: ${appointmentData.date}\n📍 Type: ${appointmentData.type}\n🏢 Lieu: ${appointmentData.location}\n⏰ ${appointmentData.availableSlots} créneaux disponibles\n\n✅ Sélectionnez votre créneau préféré !`);
                        }}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Réserver
                      </Button>
                    </div>
                  ))}
                </div>
                
                {/* Informations RDV */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="p-4">
                    <div className="bg-green-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
                      <Clock className="h-6 w-6 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Durée</h4>
                    <p className="text-sm text-gray-600">30 minutes par rendez-vous</p>
                  </div>
                  
                  <div className="p-4">
                    <div className="bg-blue-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Format</h4>
                    <p className="text-sm text-gray-600">Présentiel, virtuel ou hybride</p>
                  </div>
                  
                  <div className="p-4">
                    <div className="bg-purple-100 p-3 rounded-lg w-12 h-12 mx-auto mb-3">
                      <CheckCircle className="h-6 w-6 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Confirmation</h4>
                    <p className="text-sm text-gray-600">Réponse sous 24h</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Contactez-nous
            </h2>
            <p className="text-lg text-gray-600">
              Nous sommes là pour répondre à vos questions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    Informations de contact
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">{miniSiteData.contact.address}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">{miniSiteData.contact.phone}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">{miniSiteData.contact.email}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Globe className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">{miniSiteData.contact.website}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">{miniSiteData.contact.hours}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    Envoyez-nous un message
                  </h3>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom
                        </label>
                        <input
                          type="text"
                          name="nom"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Votre nom complet"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sujet
                      </label>
                      <input
                        type="text"
                        name="sujet"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Objet de votre message"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        name="message"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Votre message..."
                      />
                    </div>
                    
                    <Button className="w-full">
                      Envoyer le message
                    </Button>
                  </form>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img
                src={miniSiteData.logo}
                alt={miniSiteData.companyName}
                className="h-10 w-10 rounded-lg"
              />
              <span className="font-bold text-xl">{miniSiteData.companyName}</span>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 mb-2">
                © 2024 {miniSiteData.companyName}. Tous droits réservés.
              </p>
              <p className="text-sm text-gray-500">
                Propulsé par SIPORTS 2026
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};