import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );
  }

  async submitContactForm(formData: {
    name: string;
    email: string;
    message: string;
  }) {
    try {
      // Log the attempt to submit the form
      console.log('Attempting to submit contact form:', formData);
      
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
        ])
        .select();

      if (error) {
        console.error('Error inserting into contact_requests:', error);
        throw error;
      }

      console.log('Successfully inserted contact request:', data);

      // Call the edge function to send email
      const { data: emailData, error: emailError } = await this.supabase.functions.invoke(
        'send-email',
        {
          body: {
            to: 'milan.moreno.crea@gmail.com',
            subject: `New Contact Form Submission from ${formData.name}`,
            name: formData.name,
            email: formData.email,
            message: formData.message,
            contactRequestId: data[0].id
          }
        }
      );

      if (emailError) {
        console.error('Error invoking send-email function:', emailError);
        throw emailError;
      }

      console.log('Email function response:', emailData);
      return { success: true, data };
    } catch (error) {
      console.error('Error submitting form:', error);
      return { success: false, error };
    }
  }
}