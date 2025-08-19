// User related types
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

// Contact related types
export interface Contact {
  id: string;
  user_id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  position?: string;
  address?: string;
  birthday?: string;
  notes?: string;
  tags?: string[];
  group_id?: string;
  importance?: 'low' | 'medium' | 'high';
  last_contact_date?: string;
  created_at: string;
  updated_at: string;
}

// Group related types
export interface Group {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  created_at: string;
  updated_at: string;
}

// Relationship types
export interface Relationship {
  id: string;
  user_id: string;
  contact_id_1: string;
  contact_id_2: string;
  relationship_type: string;
  strength?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Event/Meeting types
export interface Event {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  start_date: string;
  end_date?: string;
  location?: string;
  attendees?: string[]; // contact IDs
  type?: 'meeting' | 'call' | 'email' | 'social' | 'other';
  status?: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Activity/Interaction types
export interface Activity {
  id: string;
  user_id: string;
  contact_id: string;
  type: 'meeting' | 'call' | 'email' | 'message' | 'note';
  title: string;
  description?: string;
  date: string;
  duration?: number; // in minutes
  created_at: string;
  updated_at: string;
}

// Analytics types
export interface Analytics {
  totalContacts: number;
  totalGroups: number;
  totalInteractions: number;
  activeContactsThisMonth: number;
  upcomingEvents: number;
  networkGrowth: {
    date: string;
    count: number;
  }[];
  interactionFrequency: {
    contact_id: string;
    contact_name: string;
    frequency: number;
  }[];
  groupDistribution: {
    group_id: string;
    group_name: string;
    count: number;
  }[];
}
