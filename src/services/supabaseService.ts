import { supabase } from '../lib/supabase';
import { User, Exhibitor, Product, Appointment, Event, ChatMessage, ChatConversation } from '../types';

export class SupabaseService {
  
  // ==================== USERS ====================
  
  static async createUser(userData: Partial<User>): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .insert([{
        email: userData.email,
        name: userData.name,
        type: userData.type || 'visitor',
        profile: userData.profile || {}
      }])
      .select()
      .single();

    if (error) throw error;
    return this.mapUserFromDB(data);
  }

  static async getUserById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    
    return this.mapUserFromDB(data);
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    
    return this.mapUserFromDB(data);
  }

  static async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update({
        name: updates.name,
        type: updates.type,
        profile: updates.profile
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return this.mapUserFromDB(data);
  }

  // ==================== EXHIBITORS ====================
  
  static async getExhibitors(): Promise<Exhibitor[]> {
    const { data, error } = await supabase
      .from('exhibitors')
      .select(`
        *,
        user:users(*),
        products(*),
        mini_site:mini_sites(*)
      `)
      .eq('verified', true)
      .order('featured', { ascending: false })
      .order('company_name');

    if (error) throw error;
    return data.map(this.mapExhibitorFromDB);
  }

  static async getExhibitorById(id: string): Promise<Exhibitor | null> {
    const { data, error } = await supabase
      .from('exhibitors')
      .select(`
        *,
        user:users(*),
        products(*),
        mini_site:mini_sites(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    
    return this.mapExhibitorFromDB(data);
  }

  static async createExhibitor(exhibitorData: Partial<Exhibitor>): Promise<Exhibitor> {
    const { data, error } = await supabase
      .from('exhibitors')
      .insert([{
        user_id: exhibitorData.userId,
        company_name: exhibitorData.companyName,
        category: exhibitorData.category,
        sector: exhibitorData.sector,
        description: exhibitorData.description,
        logo_url: exhibitorData.logo,
        website: exhibitorData.website,
        contact_info: exhibitorData.contactInfo || {}
      }])
      .select(`
        *,
        user:users(*),
        products(*),
        mini_site:mini_sites(*)
      `)
      .single();

    if (error) throw error;
    return this.mapExhibitorFromDB(data);
  }

  static async updateExhibitor(id: string, updates: Partial<Exhibitor>): Promise<Exhibitor> {
    const { data, error } = await supabase
      .from('exhibitors')
      .update({
        company_name: updates.companyName,
        category: updates.category,
        sector: updates.sector,
        description: updates.description,
        logo_url: updates.logo,
        website: updates.website,
        verified: updates.verified,
        featured: updates.featured,
        contact_info: updates.contactInfo
      })
      .eq('id', id)
      .select(`
        *,
        user:users(*),
        products(*),
        mini_site:mini_sites(*)
      `)
      .single();

    if (error) throw error;
    return this.mapExhibitorFromDB(data);
  }

  // ==================== MINI SITES ====================
  
  static async getMiniSite(exhibitorId: string): Promise<any> {
    const { data, error } = await supabase
      .from('mini_sites')
      .select('*')
      .eq('exhibitor_id', exhibitorId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    
    return data;
  }

  static async updateMiniSite(exhibitorId: string, siteData: any): Promise<any> {
    const { data, error } = await supabase
      .from('mini_sites')
      .upsert({
        exhibitor_id: exhibitorId,
        theme: siteData.theme,
        custom_colors: siteData.customColors,
        sections: siteData.sections,
        published: siteData.published
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async incrementMiniSiteViews(exhibitorId: string): Promise<void> {
    const { error } = await supabase
      .from('mini_sites')
      .update({ 
        views: supabase.sql`views + 1`,
        last_updated: new Date().toISOString()
      })
      .eq('exhibitor_id', exhibitorId);

    if (error) throw error;
  }

  // ==================== PRODUCTS ====================
  
  static async getProductsByExhibitor(exhibitorId: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('exhibitor_id', exhibitorId)
      .order('featured', { ascending: false })
      .order('name');

    if (error) throw error;
    return data.map(this.mapProductFromDB);
  }

  static async createProduct(productData: Partial<Product>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert([{
        exhibitor_id: productData.exhibitorId,
        name: productData.name,
        description: productData.description,
        category: productData.category,
        images: productData.images || [],
        specifications: productData.specifications,
        price: productData.price,
        featured: productData.featured || false
      }])
      .select()
      .single();

    if (error) throw error;
    return this.mapProductFromDB(data);
  }

  static async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update({
        name: updates.name,
        description: updates.description,
        category: updates.category,
        images: updates.images,
        specifications: updates.specifications,
        price: updates.price,
        featured: updates.featured
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return this.mapProductFromDB(data);
  }

  static async deleteProduct(id: string): Promise<void> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // ==================== APPOINTMENTS ====================
  
  static async getAppointmentsByUser(userId: string): Promise<Appointment[]> {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        exhibitor:exhibitors(*),
        visitor:users(*),
        time_slot:time_slots(*)
      `)
      .or(`visitor_id.eq.${userId},exhibitor_id.in.(select id from exhibitors where user_id = '${userId}')`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map(this.mapAppointmentFromDB);
  }

  static async createAppointment(appointmentData: Partial<Appointment>): Promise<Appointment> {
    const { data, error } = await supabase
      .from('appointments')
      .insert([{
        exhibitor_id: appointmentData.exhibitorId,
        visitor_id: appointmentData.visitorId,
        time_slot_id: appointmentData.timeSlotId,
        message: appointmentData.message,
        meeting_type: appointmentData.meetingType || 'in-person'
      }])
      .select(`
        *,
        exhibitor:exhibitors(*),
        visitor:users(*),
        time_slot:time_slots(*)
      `)
      .single();

    if (error) throw error;
    return this.mapAppointmentFromDB(data);
  }

  static async updateAppointmentStatus(id: string, status: string): Promise<void> {
    const { error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', id);

    if (error) throw error;
  }

  // ==================== EVENTS ====================
  
  static async getEvents(): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('featured', { ascending: false })
      .order('event_date');

    if (error) throw error;
    return data.map(this.mapEventFromDB);
  }

  static async registerForEvent(eventId: string, userId: string): Promise<void> {
    // Increment registered count
    const { error } = await supabase
      .from('events')
      .update({ 
        registered: supabase.sql`registered + 1`
      })
      .eq('id', eventId);

    if (error) throw error;
  }

  // ==================== CHAT ====================
  
  static async getConversationsByUser(userId: string): Promise<ChatConversation[]> {
    const { data, error } = await supabase
      .from('conversations')
      .select(`
        *,
        messages(*)
      `)
      .contains('participants', [userId])
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data.map(this.mapConversationFromDB);
  }

  static async sendMessage(conversationId: string, senderId: string, content: string): Promise<ChatMessage> {
    const { data, error } = await supabase
      .from('messages')
      .insert([{
        conversation_id: conversationId,
        sender_id: senderId,
        content,
        type: 'text'
      }])
      .select()
      .single();

    if (error) throw error;
    return this.mapMessageFromDB(data);
  }

  private static mapNewsArticleFromDB(data: any): any {
    return {
      id: data.id,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      author: data.author,
      publishedAt: new Date(data.published_at),
      category: data.category,
      tags: data.tags || [],
      featured: data.featured,
      image: data.image,
      readTime: data.read_time,
      source: data.source,
      sourceUrl: data.source_url,
      views: data.views,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at)
    };
  }

  // ==================== NEWS ARTICLES ====================
  
  static async getNewsArticles(): Promise<any[]> {
    const { data, error } = await supabase
      .from('news_articles')
      .select('*')
      .order('featured', { ascending: false })
      .order('published_at', { ascending: false });

    if (error) throw error;
    return data.map(this.mapNewsArticleFromDB);
  }

  static async createNewsArticle(articleData: any): Promise<any> {
    const { data, error } = await supabase
      .from('news_articles')
      .insert([{
        title: articleData.title,
        excerpt: articleData.excerpt,
        content: articleData.content,
        author: articleData.author,
        published_at: articleData.publishedAt || new Date().toISOString(),
        category: articleData.category,
        tags: articleData.tags || [],
        featured: articleData.featured || false,
        image: articleData.image,
        read_time: articleData.readTime || 5,
        source: articleData.source || 'siports',
        source_url: articleData.sourceUrl
      }])
      .select()
      .single();

    if (error) throw error;
    return this.mapNewsArticleFromDB(data);
  }

  static async updateNewsArticle(id: string, updates: any): Promise<any> {
    const { data, error } = await supabase
      .from('news_articles')
      .update({
        title: updates.title,
        excerpt: updates.excerpt,
        content: updates.content,
        author: updates.author,
        category: updates.category,
        tags: updates.tags,
        featured: updates.featured,
        image: updates.image,
        read_time: updates.readTime,
        source_url: updates.sourceUrl
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return this.mapNewsArticleFromDB(data);
  }

  static async deleteNewsArticle(id: string): Promise<void> {
    const { error } = await supabase
      .from('news_articles')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  static async incrementArticleViews(id: string): Promise<void> {
    const { error } = await supabase
      .from('news_articles')
      .update({ 
        views: supabase.sql`views + 1`
      })
      .eq('id', id);

    if (error) throw error;
  }

  // ==================== MAPPING FUNCTIONS ====================
  
  private static mapUserFromDB(data: any): User {
    return {
      id: data.id,
      email: data.email,
      name: data.name,
      type: data.type,
      profile: data.profile,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at)
    };
  }

  private static mapExhibitorFromDB(data: any): Exhibitor {
    return {
      id: data.id,
      userId: data.user_id,
      companyName: data.company_name,
      category: data.category,
      sector: data.sector,
      description: data.description,
      logo: data.logo_url,
      website: data.website,
      verified: data.verified,
      featured: data.featured,
      contactInfo: data.contact_info,
      products: data.products?.map(this.mapProductFromDB) || [],
      availability: [], // À implémenter avec time_slots
      miniSite: data.mini_site ? {
        id: data.mini_site.id,
        exhibitorId: data.mini_site.exhibitor_id,
        theme: data.mini_site.theme,
        customColors: data.mini_site.custom_colors,
        sections: data.mini_site.sections,
        published: data.mini_site.published,
        views: data.mini_site.views,
        lastUpdated: new Date(data.mini_site.last_updated)
      } : {
        id: '',
        exhibitorId: data.id,
        theme: 'modern',
        customColors: { primary: '#1e40af', secondary: '#3b82f6', accent: '#60a5fa' },
        sections: [],
        published: false,
        views: 0,
        lastUpdated: new Date()
      },
      certifications: [],
      establishedYear: undefined,
      employeeCount: undefined,
      revenue: undefined,
      markets: []
    };
  }

  private static mapProductFromDB(data: any): Product {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      category: data.category,
      images: data.images || [],
      specifications: data.specifications,
      price: data.price,
      featured: data.featured,
      technicalSpecs: []
    };
  }

  private static mapAppointmentFromDB(data: any): Appointment {
    return {
      id: data.id,
      exhibitorId: data.exhibitor_id,
      visitorId: data.visitor_id,
      timeSlotId: data.time_slot_id,
      status: data.status,
      message: data.message,
      notes: data.notes,
      rating: data.rating,
      createdAt: new Date(data.created_at),
      meetingType: data.meeting_type,
      meetingLink: data.meeting_link
    };
  }

  private static mapEventFromDB(data: any): Event {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      type: data.type,
      date: new Date(data.event_date),
      startTime: data.start_time,
      endTime: data.end_time,
      capacity: data.capacity,
      registered: data.registered,
      speakers: [], // À implémenter avec une table speakers
      category: data.category,
      virtual: data.virtual,
      featured: data.featured,
      location: data.location,
      meetingLink: data.meeting_link,
      tags: data.tags || []
    };
  }

  private static mapConversationFromDB(data: any): ChatConversation {
    return {
      id: data.id,
      participants: data.participants,
      lastMessage: data.messages?.[0] ? this.mapMessageFromDB(data.messages[0]) : undefined,
      unreadCount: data.messages?.filter((m: any) => !m.read).length || 0,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at)
    };
  }

  private static mapMessageFromDB(data: any): ChatMessage {
    return {
      id: data.id,
      senderId: data.sender_id,
      receiverId: '', // À déterminer depuis la conversation
      content: data.content,
      type: data.type,
      timestamp: new Date(data.timestamp),
      read: data.read,
      attachments: data.attachments
    };
  }

  // ==================== ANALYTICS ====================
  
  static async getAnalytics(exhibitorId: string): Promise<any> {
    // Récupérer les vues du mini-site
    const { data: miniSite } = await supabase
      .from('mini_sites')
      .select('views')
      .eq('exhibitor_id', exhibitorId)
      .single();

    // Compter les rendez-vous
    const { count: appointmentsCount } = await supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true })
      .eq('exhibitor_id', exhibitorId);

    // Compter les produits
    const { count: productsCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('exhibitor_id', exhibitorId);

    return {
      miniSiteViews: miniSite?.views || 0,
      appointments: appointmentsCount || 0,
      products: productsCount || 0,
      profileViews: miniSite?.views || 0,
      connections: 0, // À implémenter
      messages: 0 // À implémenter
    };
  }

  // ==================== SEARCH ====================
  
  static async searchExhibitors(query: string, filters: any = {}): Promise<Exhibitor[]> {
    let queryBuilder = supabase
      .from('exhibitors')
      .select(`
        *,
        user:users(*),
        products(*),
        mini_site:mini_sites(*)
      `)
      .eq('verified', true);

    if (query) {
      queryBuilder = queryBuilder.or(`company_name.ilike.%${query}%,description.ilike.%${query}%,sector.ilike.%${query}%`);
    }

    if (filters.category) {
      queryBuilder = queryBuilder.eq('category', filters.category);
    }

    if (filters.sector) {
      queryBuilder = queryBuilder.ilike('sector', `%${filters.sector}%`);
    }

    const { data, error } = await queryBuilder
      .order('featured', { ascending: false })
      .order('company_name');

    if (error) throw error;
    return data.map(this.mapExhibitorFromDB);
  }

  // ==================== REAL-TIME SUBSCRIPTIONS ====================
  
  static subscribeToMessages(conversationId: string, callback: (message: ChatMessage) => void) {
    return supabase
      .channel(`messages:${conversationId}`)
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`
        }, 
        (payload) => {
          callback(this.mapMessageFromDB(payload.new));
        }
      )
      .subscribe();
  }

  static subscribeToAppointments(userId: string, callback: (appointment: Appointment) => void) {
    return supabase
      .channel(`appointments:${userId}`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'appointments'
        }, 
        (payload) => {
          if (payload.new) {
            callback(this.mapAppointmentFromDB(payload.new));
          }
        }
      )
      .subscribe();
  }
}