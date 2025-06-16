import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { Observable, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private tokenRefresh$: Observable<any> = EMPTY;

  constructor() {
    // Initialize Supabase client with anon key
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false
        }
      }
    );
  }

  async submitContactForm(formData: {
    name: string;
    email: string;
    message: string;
  }) {
    try {
      console.log('Attempting to submit contact form:', formData);
      
      // Use the REST API directly with the anon key for public access
      const { data, error } = await this.supabase
        .from('contact_requests')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            subject: 'Contact Form Submission',
            processed: false,
            email_sent: false
          }
        ]);

      if (error) {
        console.error('Error inserting into contact_requests:', error);
        throw error;
      }

      console.log('Successfully submitted contact form');
      
      return { success: true, data };
    } catch (error) {
      console.error('Error submitting form:', error);
      return { success: false, error };
    }
  }
}