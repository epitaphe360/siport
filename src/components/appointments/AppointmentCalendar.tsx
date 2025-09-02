import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  Users, 
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  ArrowLeft
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useAppointmentStore } from '../../store/appointmentStore';
import { motion } from 'framer-motion';

export const AppointmentCalendar: React.FC = () => {
  const {
    appointments,
    timeSlots,
    isLoading,
    fetchAppointments,
    fetchTimeSlots,
    bookAppointment,
    cancelAppointment,
    updateAppointmentStatus,
    createTimeSlot
  } = useAppointmentStore();

  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showCreateSlotModal, setShowCreateSlotModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingMessage, setBookingMessage] = useState('');
  const [newSlotData, setNewSlotData] = useState({
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '09:30',
    duration: 30,
    type: 'in-person' as 'in-person' | 'virtual' | 'hybrid',
    maxBookings: 1,
    location: ''
  });
  
  // Récupérer l'ID de l'exposant depuis l'URL ou les paramètres
  const exhibitorId = searchParams.get('exhibitor') || 
                     location.pathname.split('/').pop() || 
                     '1'; // Fallback

  useEffect(() => {
    fetchAppointments();
    fetchTimeSlots(exhibitorId);
  }, [fetchAppointments, fetchTimeSlots]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const formatTime = (time: string) => {
    return time;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      case 'completed': return 'info';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmé';
      case 'pending': return 'En attente';
      case 'cancelled': return 'Annulé';
      case 'completed': return 'Terminé';
      default: return status;
    }
  };

  const getMeetingTypeIcon = (type: string) => {
    switch (type) {
      case 'virtual': return Video;
      case 'in-person': return MapPin;
      case 'hybrid': return Users;
      default: return Calendar;
    }
  };

  const handleBookSlot = async () => {
    if (!selectedSlot) return;
    
    await bookAppointment(selectedSlot, bookingMessage);
    setShowBookingModal(false);
    setSelectedSlot(null);
    setBookingMessage('');
  };

  const handleCreateSlot = async () => {
    // Validation des données
    if (!newSlotData.date || !newSlotData.startTime || !newSlotData.endTime) {
      alert('❌ Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Vérifier que l'heure de fin est après l'heure de début
    if (newSlotData.startTime >= newSlotData.endTime) {
      alert('❌ L\'heure de fin doit être après l\'heure de début');
      return;
    }

    const slotData = {
      date: new Date(newSlotData.date),
      startTime: newSlotData.startTime,
      endTime: newSlotData.endTime,
      duration: newSlotData.duration,
      type: newSlotData.type,
      maxBookings: newSlotData.maxBookings,
      currentBookings: 0,
      available: true,
      location: newSlotData.location || undefined
    };
    
    try {
      await createTimeSlot(slotData);
      
      alert(`✅ CRÉNEAU CRÉÉ AVEC SUCCÈS\n\n📅 Date: ${new Date(newSlotData.date).toLocaleDateString('fr-FR')}\n⏰ Horaire: ${newSlotData.startTime} - ${newSlotData.endTime}\n📍 Type: ${newSlotData.type === 'in-person' ? 'Présentiel' : newSlotData.type === 'virtual' ? 'Virtuel' : 'Hybride'}\n👥 Capacité: ${newSlotData.maxBookings} personne(s)\n${newSlotData.location ? `📍 Lieu: ${newSlotData.location}` : ''}\n\n🎯 Créneau disponible pour réservation !`);
      
      setShowCreateSlotModal(false);
      setNewSlotData({
        date: new Date().toISOString().split('T')[0],
        startTime: '09:00',
        endTime: '09:30',
        duration: 30,
        type: 'in-person',
        maxBookings: 1,
        location: ''
      });
      
      // Recharger les créneaux
      fetchTimeSlots(exhibitorId);
    } catch (error) {
      alert('❌ Erreur lors de la création du créneau. Veuillez réessayer.');
    }
  };

  const handleBookSlotImproved = async () => {
    if (!selectedSlot) return;
    
    const slot = timeSlots.find(s => s.id === selectedSlot);
    if (!slot) {
      alert('❌ Créneau non trouvé');
      return;
    }
    
    try {
      await bookAppointment(selectedSlot, bookingMessage);
      
      alert(`✅ RENDEZ-VOUS RÉSERVÉ\n\n📅 Date: ${new Date(slot.date).toLocaleDateString('fr-FR')}\n⏰ Horaire: ${slot.startTime} - ${slot.endTime}\n📍 Type: ${slot.type === 'in-person' ? 'Présentiel' : slot.type === 'virtual' ? 'Virtuel' : 'Hybride'}\n${slot.location ? `📍 Lieu: ${slot.location}` : ''}\n${bookingMessage ? `💬 Message: ${bookingMessage}` : ''}\n\n📧 Confirmation envoyée par email !`);
      
      setShowBookingModal(false);
      setSelectedSlot(null);
      setBookingMessage('');
    } catch (error) {
      alert('❌ Erreur lors de la réservation. Veuillez réessayer.');
    }
  };

  const handleConfirmAppointment = async (appointmentId: string) => {
    try {
      await updateAppointmentStatus(appointmentId, 'confirmed');
      alert('✅ RENDEZ-VOUS CONFIRMÉ\n\n📅 Le rendez-vous a été confirmé\n📧 Notification envoyée au visiteur\n📱 Rappel programmé\n\n🎯 Rendez-vous validé !');
    } catch (error) {
      alert('❌ Erreur lors de la confirmation');
    }
  };

  const handleRejectAppointment = async (appointmentId: string) => {
    const reason = prompt('Motif du refus (optionnel):');
    try {
      await cancelAppointment(appointmentId);
      alert(`❌ RENDEZ-VOUS REFUSÉ\n\n📅 Le rendez-vous a été annulé\n${reason ? `💬 Motif: ${reason}` : ''}\n📧 Notification envoyée au visiteur\n\n🔄 Créneau libéré pour d'autres réservations`);
    } catch (error) {
      alert('❌ Erreur lors du refus');
    }
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    if (confirm('Êtes-vous sûr de vouloir annuler ce rendez-vous ?')) {
      try {
        await cancelAppointment(appointmentId);
        alert('✅ RENDEZ-VOUS ANNULÉ\n\n📅 Le rendez-vous a été annulé\n📧 Notification envoyée\n🔄 Créneau libéré\n\n✅ Annulation effectuée !');
      } catch (error) {
        alert('❌ Erreur lors de l\'annulation');
      }
    }
  };

  const todaySlots = timeSlots.filter(slot => {
    const slotDate = new Date(slot.date);
    return slotDate.toDateString() === selectedDate.toDateString();
  });

  const todayAppointments = appointments.filter(appointment => {
    const slot = timeSlots.find(s => s.id === appointment.timeSlotId);
    if (!slot) return false;
    const slotDate = new Date(slot.date);
    return slotDate.toDateString() === selectedDate.toDateString();
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Bouton de retour */}
        <div className="mb-6">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au Tableau de Bord
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1 min-w-0 mr-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Calendrier des Rendez-vous
            </h2>
            <p className="text-gray-600 mt-1">
              Gérez vos créneaux et rendez-vous - Exposant #{exhibitorId}
            </p>
          </div>
          
          <div className="flex-shrink-0">
            <Button onClick={() => setShowCreateSlotModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nouveau Créneau
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <Card className="lg:col-span-1">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Calendrier</h3>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  <div className="text-center">
                    <h4 className="font-medium text-gray-900">
                      {formatDate(selectedDate)}
                    </h4>
                  </div>
                  
                  {/* Quick date navigation */}
                  <div className="grid grid-cols-3 gap-2">
                    {[-1, 0, 1].map(offset => {
                      const date = new Date();
                      date.setDate(date.getDate() + offset);
                      const isSelected = date.toDateString() === selectedDate.toDateString();
                      
                      return (
                        <button
                          key={offset}
                          onClick={() => setSelectedDate(date)}
                          className={`p-2 text-sm rounded-lg transition-colors ${
                            isSelected 
                              ? 'bg-blue-100 text-blue-700 font-medium' 
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {offset === -1 ? 'Hier' : offset === 0 ? 'Aujourd\'hui' : 'Demain'}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>

            {/* Time Slots */}
            <Card className="lg:col-span-2">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">
                  Créneaux disponibles - {formatDate(selectedDate)}
                </h3>
              </div>
              <div className="p-4">
                {isLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="animate-pulse">
                        <div className="h-16 bg-gray-200 rounded-lg"></div>
                      </div>
                    ))}
                  </div>
                ) : todaySlots.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Aucun créneau disponible pour cette date</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {todaySlots.map((slot) => {
                      const MeetingIcon = getMeetingTypeIcon(slot.type);
                      const isBooked = slot.currentBookings >= slot.maxBookings;
                      
                      return (
                        <motion.div
                          key={slot.id}
                          whileHover={{ scale: 1.02 }}
                          className={`p-4 border rounded-lg transition-colors ${
                            isBooked 
                              ? 'border-gray-200 bg-gray-50' 
                              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer'
                          }`}
                          onClick={() => {
                            if (!isBooked) {
                              setSelectedSlot(slot.id);
                              setShowBookingModal(true);
                            }
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-lg ${
                                isBooked ? 'bg-gray-200' : 'bg-blue-100'
                              }`}>
                                <MeetingIcon className={`h-4 w-4 ${
                                  isBooked ? 'text-gray-500' : 'text-blue-600'
                                }`} />
                              </div>
                              
                              <div>
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium text-gray-900">
                                    {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                                  </span>
                                  <Badge 
                                    variant={slot.type === 'virtual' ? 'info' : slot.type === 'hybrid' ? 'warning' : 'default'}
                                    size="sm"
                                  >
                                    {slot.type === 'virtual' ? 'Virtuel' : 
                                     slot.type === 'hybrid' ? 'Hybride' : 'Présentiel'}
                                  </Badge>
                                </div>
                                
                                <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                  <span className="flex items-center space-x-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{slot.duration} min</span>
                                  </span>
                                  
                                  {slot.location && (
                                    <span className="flex items-center space-x-1">
                                      <MapPin className="h-3 w-3" />
                                      <span>{slot.location}</span>
                                    </span>
                                  )}
                                  
                                  <span className="flex items-center space-x-1">
                                    <Users className="h-3 w-3" />
                                    <span>{slot.currentBookings}/{slot.maxBookings}</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {isBooked ? (
                                <Badge variant="error" size="sm">Complet</Badge>
                              ) : (
                                <Badge variant="success" size="sm">Disponible</Badge>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Appointments List */}
          <Card>
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Mes Rendez-vous</h3>
            </div>
            <div className="p-4">
              {todayAppointments.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Aucun rendez-vous prévu pour cette date</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => {
                    const slot = timeSlots.find(s => s.id === appointment.timeSlotId);
                    if (!slot) return null;
                    
                    const MeetingIcon = getMeetingTypeIcon(appointment.meetingType);
                    
                    return (
                      <motion.div
                        key={appointment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <MeetingIcon className="h-4 w-4 text-blue-600" />
                            </div>
                            
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-gray-900">
                                  {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                                </span>
                                <Badge 
                                  variant={getStatusColor(appointment.status) as any}
                                  size="sm"
                                >
                                  {getStatusLabel(appointment.status)}
                                </Badge>
                              </div>
                              
                              {appointment.message && (
                                <p className="text-sm text-gray-600 mt-1">
                                  {appointment.message}
                                </p>
                              )}
                              
                              {appointment.meetingLink && (
                                <a 
                                  href={appointment.meetingLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-blue-600 hover:underline mt-1 inline-block"
                                >
                                  Rejoindre la réunion
                                </a>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {appointment.status === 'pending' && (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleConfirmAppointment(appointment.id)}
                                >
                                  <Check className="h-3 w-3 mr-1" />
                                  Confirmer
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleRejectAppointment(appointment.id)}
                                >
                                  <X className="h-3 w-3 mr-1" />
                                  Refuser
                                </Button>
                              </>
                            )}
                            
                            {appointment.status === 'confirmed' && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleCancelAppointment(appointment.id)}
                              >
                                <X className="h-3 w-3 mr-1" />
                                Annuler
                              </Button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </Card>

          {/* Booking Modal */}
          {showBookingModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Réserver un rendez-vous
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message (optionnel)
                    </label>
                    <textarea
                      value={bookingMessage}
                      onChange={(e) => setBookingMessage(e.target.value)}
                      placeholder="Décrivez brièvement l'objet de votre rendez-vous..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowBookingModal(false);
                      setSelectedSlot(null);
                      setBookingMessage('');
                    }}
                  >
                    Annuler
                  </Button>
                  <Button onClick={handleBookSlotImproved}>
                    Réserver
                  </Button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Create Slot Modal */}
          {showCreateSlotModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Créer un nouveau créneau
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={newSlotData.date}
                      onChange={(e) => setNewSlotData({...newSlotData, date: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Heure début
                      </label>
                      <input
                        type="time"
                        value={newSlotData.startTime}
                        onChange={(e) => setNewSlotData({...newSlotData, startTime: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Heure fin
                      </label>
                      <input
                        type="time"
                        value={newSlotData.endTime}
                        onChange={(e) => setNewSlotData({...newSlotData, endTime: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type de rendez-vous
                    </label>
                    <select
                      value={newSlotData.type}
                      onChange={(e) => setNewSlotData({...newSlotData, type: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="in-person">Présentiel</option>
                      <option value="virtual">Virtuel</option>
                      <option value="hybrid">Hybride</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lieu (optionnel)
                    </label>
                    <input
                      type="text"
                      value={newSlotData.location}
                      onChange={(e) => setNewSlotData({...newSlotData, location: e.target.value})}
                      placeholder="Ex: Stand A-12, Salle de réunion B-5"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre max de réservations
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={newSlotData.maxBookings}
                      onChange={(e) => setNewSlotData({...newSlotData, maxBookings: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowCreateSlotModal(false);
                      setNewSlotData({
                        date: new Date().toISOString().split('T')[0],
                        startTime: '09:00',
                        endTime: '09:30',
                        duration: 30,
                        type: 'in-person',
                        maxBookings: 1,
                        location: ''
                      });
                    }}
                  >
                    Annuler
                  </Button>
                  <Button onClick={handleCreateSlot}>
                    <Plus className="h-4 w-4 mr-2" />
                    Créer le créneau
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};