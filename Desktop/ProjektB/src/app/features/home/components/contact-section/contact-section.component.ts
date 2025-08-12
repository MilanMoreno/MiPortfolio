import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { fadeInLeft, fadeInUp } from '../../../../shared/animations/fade.animations';
import { SupabaseService } from '../../../../shared/services/supabase/supabase.service';
import { MockContactService } from '../../../../shared/services/mock-contact.service';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  privacyPolicy: boolean;
}

@Component({
    selector: 'app-contact-section',
    imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
    template: `
    <section class="contact" id="contact">
      <div class="contact__container">
        <header class="contact__header">
          <div class="contact__title-wrapper">
            <div class="contact__line"></div>
            <h2 class="contact__title">{{ 'CONTACT.HEADLINE' | translate }}</h2>
          </div>
        </header>

        <div class="contact__content">
          <div class="contact__intro">
            <h3 class="contact__subtitle" [@fadeInUp]>
              {{ 'CONTACT.INTRODUCTION' | translate }}
            </h3>
            <p>{{ 'CONTACT.DESCRIPTION_1' | translate }}</p>
            <p>
              {{ 'CONTACT.DESCRIPTION_2' | translate }}
              <strong>{{ 'CONTACT.DESCRIPTION_3' | translate }}</strong>
            </p>
          </div>

          <form 
            class="contact__form" 
            (ngSubmit)="onSubmit(contactForm)"
            #contactForm="ngForm"
            [@fadeInLeft]>
            
            <div class="contact__form-group">
              <input
                type="text"
                id="name"
                name="name"
                [(ngModel)]="formData.name"
                #name="ngModel"
                required
                minlength="2"
                [placeholder]="'CONTACT.NAME_PLACEHOLDER' | translate"
                [class.is-invalid]="shouldShowNameError(name)">
              
              <div class="contact__error-container">
                <span class="contact__error" *ngIf="shouldShowNameError(name)">
                  {{ 'CONTACT.NAME_ERROR' | translate }}
                </span>
              </div>
            </div>

            <div class="contact__form-group">
              <input
                type="email"
                id="email"
                name="email"
                [(ngModel)]="formData.email"
                #email="ngModel"
                required
                [placeholder]="'CONTACT.EMAIL_PLACEHOLDER' | translate"
                [class.is-invalid]="shouldShowEmailError(email)">
              
              <div class="contact__error-container">
                <span class="contact__error" *ngIf="shouldShowEmailError(email)">
                  {{ getEmailErrorMessage(email) | translate }}
                </span>
              </div>
            </div>

            <div class="contact__form-group">
              <textarea
                id="message"
                name="message"
                [(ngModel)]="formData.message"
                #message="ngModel"
                required
                minlength="1"
                rows="4"
                [placeholder]="'CONTACT.MESSAGE_PLACEHOLDER' | translate"
                [class.is-invalid]="shouldShowMessageError(message)">
              </textarea>
              
              <div class="contact__error-container">
                <span class="contact__error" *ngIf="shouldShowMessageError(message)">
                  {{ 'CONTACT.MESSAGE_ERROR' | translate }}
                </span>
              </div>
            </div>

            <div class="contact__form-group">
              <label class="contact__checkbox-label">
                <input
                  type="checkbox"
                  name="privacyPolicy"
                  [(ngModel)]="formData.privacyPolicy"
                  #privacyPolicy="ngModel"
                  required>
                <span class="contact__checkbox-custom"></span>
                <span class="contact__checkbox-text">
                  {{ 'CONTACT.PRIVACY_POLICY_TEXT1' | translate }}
                  <a (click)="navigateToPrivacy()">
                    {{ 'CONTACT.PRIVACY_POLICY_TEXT2' | translate }}
                  </a>
                  {{ 'CONTACT.PRIVACY_POLICY_TEXT3' | translate }}
                </span>
              </label>
              
              <div class="contact__error-container">
                <span class="contact__error" *ngIf="shouldShowPrivacyError(privacyPolicy)">
                  {{ 'CONTACT.PRIVACY_POLICY_ERROR' | translate }}
                </span>
              </div>
            </div>

            <div class="contact__form-actions">
              <button 
                type="submit" 
                class="contact__submit"
                [disabled]="contactForm.invalid || isSubmitting">
                {{ 'CONTACT.SEND_BUTTON' | translate }}
              </button>
            </div>

            <div *ngIf="submitSuccess" class="contact__success-message">
              {{ 'CONTACT.SUCCESS_MESSAGE' | translate }}
            </div>

            <div *ngIf="submitError" class="contact__error-message">
              {{ errorMessage }}
            </div>
          </form>
        </div>

        <a href="#hero" class="contact__scroll-top">
          <svg viewBox="0 0 32 32" fill="currentColor">
            <path d="M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0zm0 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm1.879 7.121l5.707 5.707a1 1 0 01-1.414 1.414L17 11.071V24a1 1 0 01-2 0V11.07l-5.172 5.173a1 1 0 01-1.414-1.414l5.707-5.707a1 1 0 011.414 0 1 1 0 011.344 0z"/>
          </svg>
        </a>
      </div>

      <img 
        class="contact__shadow" 
        src="assets/img/shadow-purple-big.png" 
        alt=""
      />
    </section>
  `,
    styles: [`
    .contact {
      position: relative;
      display: flex;
      justify-content: center;
      width: 100%;
    }

    .contact__container {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: var(--color-background-primary);
      min-height: 600px;
      height: auto;
      padding: 4rem 48px;
      width: 100%;
      max-width: 1920px;
    }

    .contact__header {
      display: flex;
      align-items: center;
      width: 100%;
      margin-bottom: 8rem;
      z-index: 60;
      position: relative;
    }

    .contact__title-wrapper {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      gap: 2rem;
      position: relative;
    }

    .contact__line {
      background-color: var(--color-accent-secondary);
      height: 4px;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 100vw;
      margin-left: -100vw;
      z-index: 1;
    }

    .contact__title {
      font-size: var(--font-size-heading-large);
      color: var(--color-text-primary);
      margin: 0;
      position: relative;
      z-index: 2;
      background-color: var(--color-background-primary);
      padding-left: 2rem;
    }

    .contact__content {
      display: flex;
      justify-content: center;
      gap: 4rem;
      width: 100%;
      max-width: 1200px;
      padding: 0 2rem;
    }

    .contact__intro {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 470px;
      z-index: 60;

      p {
        font-size: 16px;
        color: var(--color-text-primary);
      }
    }

    .contact__subtitle {
      color: var(--color-text-primary);
      font-size: var(--font-size-heading-medium);
      margin: 0;
    }

    .contact__form {
      width: 680px;
      z-index: 60;
      position: relative;
    }

    .contact__form-group {
      margin-bottom: 2.5rem;
      position: relative;
    }

    .contact__error-container {
      position: relative;
      min-height: 20px;
      margin-top: 8px;
    }

    .contact__input,
    input,
    textarea {
      width: 100%;
      font-size: 17px;
      border: 1px solid var(--color-accent-secondary);
      border-radius: 10px;
      padding: 15px 25px;
      background-color: rgba(20, 29, 47, 0.1);
      color: var(--color-text-primary);

      &::placeholder {
        color: var(--color-text-primary);
      }

      &:hover {
        border-color: var(--color-accent-primary);
      }

      &:focus {
        outline: none;
        border-color: var(--color-accent-primary);
      }

      &.is-invalid {
        border-color: red;
      }
    }

    textarea {
      min-height: 150px;
      resize: vertical;
    }

    .contact__checkbox-label {
      display: flex;
      align-items: center;
      gap: 1rem;
      color: var(--color-text-primary);
      cursor: pointer;

      input[type="checkbox"] {
        display: none;
      }
    }

    .contact__checkbox-custom {
      width: 30px;
      height: 24px;
      border: 4px solid var(--color-accent-secondary);
      border-radius: 0px;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 6px;
        height: 12px;
        border: solid var(--color-text-primary);
        border-width: 0 2px 2px 0;
        transform: translate(-50%, -50%) rotate(45deg) scale(0);
        transition: transform 0.2s ease;
      }
    }

    input[type="checkbox"]:checked + .contact__checkbox-custom {
      border-color: var(--color-accent-primary);

      &::after {
        transform: translate(-50%, -50%) rotate(45deg) scale(1);
      }
    }

    .contact__checkbox-text {
      font-size: 16px;

      a {
        color: var(--color-accent-secondary);
          padding: 4px 8px;
          border-radius: 4px;
          display: inline-block;
          min-height: 20px;
          line-height: 1.4;
        margin: 0 5px;
        cursor: pointer;

        &:hover {
            background-color: rgba(112, 230, 28, 0.1);
          color: var(--color-accent-primary);
        }
      }
    }

    .contact__error {
      display: block;
      color: red;
      font-size: 14px;
      position: absolute;
      left: 0;
    }

    .contact__form-actions {
      display: flex;
      justify-content: center;
      margin-top: 2rem;
    }

    .contact__submit {
      width: 180px;
      background-color: var(--color-accent-primary);
      border: none;
      border-radius: 10px;
      padding: 10px 20px;
      color: var(--color-text-primary);
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      &:not(:disabled):hover {
        background-color: var(--color-accent-secondary);
      }
    }

    .contact__success-message {
      margin-top: 1rem;
      padding: 1rem;
      background-color: rgba(112, 230, 28, 0.2);
      border: 1px solid var(--color-accent-primary);
      border-radius: 10px;
      color: var(--color-text-primary);
      text-align: center;
    }

    .contact__error-message {
      margin-top: 1rem;
      padding: 1rem;
      background-color: rgba(255, 0, 0, 0.2);
      border: 1px solid red;
      border-radius: 10px;
      color: var(--color-text-primary);
      text-align: center;
    }

    .contact__scroll-top {
      position: absolute;
      right: 28px;
      bottom: 28px;
      height: 30px;
      width: 30px;
      color: var(--color-text-primary);
      transition: color 0.3s ease;

      &:hover {
        color: var(--color-accent-primary);
      }
    }

    .contact__shadow {
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 1;
      max-width: 50%;
      padding-top:30px;
      height: auto; 
    }

    /* Responsive Design */
    @media (max-width: 1395px) {
      .contact__content { 
        flex-direction: column;
        align-items: center;
      }

      .contact__intro { 
        width: 100%;
        max-width: 80vw;
        text-align: center;
        font-size: 16px;
      } 

      .contact__form {
        width: 100%;
        max-width: 80vw;
      }
    }

    /* Hide shadow at medium screen sizes where it would overlap the form */
    @media (max-width: 1400px) and (min-width: 768px) {
      .contact__shadow {
        display: none;
      }
    }

    @media (max-width: 768px) {
      .contact__scroll-top {
        right: 10px;
        bottom: 10px;
        height: 27px;
        width: 27px;
      }

      .contact__title {
        font-size: 44px;
      }

      .contact__subtitle {
        font-size: 20px;
      }

      .contact__shadow {
        max-width: 30%;
        opacity: 1.3;
      }

      .contact__line {
        height: 3px;
      }
    }

    @media (max-width: 480px) {
      .contact__checkbox-text {
        font-size: 15px;
      }

      .contact__submit {
        width: 170px;
        padding: 12px 12px;
        font-size: 16px;
      }

      .contact__scroll-top {
        right: 10px;
        bottom: 10px;
        height: 26px;
        width: 26px;
      }

      .contact__shadow {
        max-width: 25%;
        opacity: 1.3;
      }
      
      .contact__title {
        font-size: 26px;
        padding-left: 1rem;
      }
      
      .contact__subtitle {
        font-size: 16px;
      }
      
      input, textarea {
        font-size: 16px;
        padding: 10px 15px;
      }

      .contact__line {
        height: 2px;
      }
    }
    
    @media (max-width: 350px) {
      .contact__title {
        font-size: 24px;
        padding-left: 0.5rem;
      }
      
      .contact__subtitle {
        font-size: 16px;
      }
      
      .contact__submit {
        width: 170px;
        padding: 12px 12px;
        font-size: 16px;
      }
      
      .contact__checkbox-text {
        font-size: 14px;
      }

      .contact__checkbox-custom {
        width: 50px;
        height: 24px;
        border: 4px solid var(--color-accent-secondary);
        border-radius: 0px;
        position: relative;
      }

      input, textarea {
        font-size: 16px;
        padding: 8px 10px;
      }
      
      .contact__scroll-top {
        height: 26px;
        width: 26px;
      }
    }
   
    @media (max-width: 320px) {
      .contact__title {
        font-size: 22px;
        padding-left: 0.5rem;
      }
      
      .contact__subtitle {
        font-size: 14px;
      }
      
      .contact__submit {
        width: 170px;
        padding: 12px 12px;
        font-size: 16px;
      }
      
      .contact__checkbox-text {
        font-size: 13px;
      }
      
      input, textarea {
        font-size: 16px;
        padding: 6px 8px;
      }
      
      .contact__scroll-top {
        height: 22px;
        width: 22px;
        bottom: 8px;
        right: 8px;
      }
    }
  `],
    animations: [fadeInLeft, fadeInUp]
})
export class ContactSectionComponent {
  formData: ContactFormData = {
    name: '',
    email: '',
    message: '',
    privacyPolicy: false
  };

  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  errorMessage = '';
  formSubmitted = false;

  constructor(
    private supabaseService: SupabaseService,
    private mockContactService: MockContactService,
    private router: Router
  ) {}

  // Enhanced validation logic for template-driven forms
  shouldShowNameError(nameControl: NgModel): boolean {
    if (!nameControl.value && !nameControl.touched) {
      return false;
    }
    
    return (this.formSubmitted || (nameControl.touched ?? false)) && (nameControl.invalid ?? false);
  }

  shouldShowEmailError(emailControl: NgModel): boolean {
    if (!emailControl.value && !emailControl.touched) {
      return false;
    }
    
    // Custom email validation logic
    const emailValue = emailControl.value?.trim() || '';
    
    // Don't show error for very short inputs (less than 3 characters)
    if (emailValue.length > 0 && emailValue.length < 3 && !emailControl.touched) {
      return false;
    }
    
    // Show error if form submitted or field touched and has reasonable content
    return (this.formSubmitted || 
            ((emailControl.touched ?? false) && emailValue.length > 0) ||
            (emailValue.length > 3 && !this.isValidEmail(emailValue))) && 
           ((emailControl.invalid ?? false) || !this.isValidEmail(emailValue));
  }

  shouldShowMessageError(messageControl: NgModel): boolean {
    // Zeige Fehler wenn:
    // 1. Das Formular wurde abgesendet UND das Feld ist ungültig, ODER
    // 2. Das Feld wurde berührt (verlassen) UND ist ungültig
    return (this.formSubmitted && (messageControl.invalid ?? false)) ||
           ((messageControl.touched ?? false) && (messageControl.invalid ?? false));
  }

  shouldShowPrivacyError(privacyControl: NgModel): boolean {
    return this.formSubmitted && !this.formData.privacyPolicy;
  }

  getEmailErrorMessage(emailControl: NgModel): string {
    const emailValue = emailControl.value?.trim() || '';
    
    if (!emailValue) {
      return 'CONTACT.EMAIL_ERROR';
    }
    
    if (!this.isValidEmail(emailValue)) {
      return 'CONTACT.EMAIL_FORMAT_ERROR';
    }
    
    return 'CONTACT.EMAIL_ERROR';
  }

  private isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  async onSubmit(form: NgForm): Promise<void> {
    this.formSubmitted = true;
    
    console.log('🚀 Contact form submission started');
    
    // Mark all fields as touched to show validation errors
    Object.keys(form.controls).forEach(key => {
      form.controls[key].markAsTouched();
    });
    
    // Check if form is valid
    if (form.invalid) {
      console.warn('⚠️ Form validation failed - form is invalid');
      return;
    }
    
    // Additional custom validation
    const emailValid = this.isValidEmail(this.formData.email?.trim() || '');
    const messageValid = (this.formData.message?.trim() || '').length >= 1;
    const nameValid = (this.formData.name?.trim() || '').length >= 2;
    
    if (!emailValid || !messageValid || !nameValid || !this.formData.privacyPolicy) {
      console.warn('⚠️ Custom validation failed:', {
        emailValid,
        messageValid,
        nameValid,
        privacyPolicyAccepted: this.formData.privacyPolicy
      });
      return;
    }

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    try {
      console.log('📤 Attempting to submit to Supabase database...');
      // Try Supabase first
      let result = await this.supabaseService.submitContactForm({
        name: this.formData.name,
        email: this.formData.email,
        message: this.formData.message
      });

      // If Supabase fails, use mock service as fallback
      if (!result.success) {
        console.warn('⚠️ Supabase failed, trying mock service as fallback...');
        result = await this.mockContactService.submitContactForm({
          name: this.formData.name,
          email: this.formData.email,
          message: this.formData.message
        });
      }

      if (result.success) {
        console.log('✅ Contact form submitted successfully!', result.data);
        this.submitSuccess = true;
        
        // Reset form and data
        this.resetForm(form);
      } else {
        console.error('❌ Contact form submission failed:', result.error);
        this.submitError = true;
        this.errorMessage = result.error || 'There was an error sending your message. Please try again later.';
      }
    } catch (error) {
      console.error('❌ Unexpected error during submission:', error);
      // Final fallback to mock service
      try {
        console.log('🔄 Trying mock service as final fallback...');
        const mockResult = await this.mockContactService.submitContactForm({
          name: this.formData.name,
          email: this.formData.email,
          message: this.formData.message
        });
        
        if (mockResult.success) {
          console.log('✅ Mock service submission successful!', mockResult.data);
          this.submitSuccess = true;
          this.resetForm(form);
        } else {
          console.error('❌ Mock service also failed:', mockResult.error);
          this.submitError = true;
          this.errorMessage = 'There was an error sending your message. Please try again later.';
        }
      } catch (mockError) {
        console.error('❌ All submission methods failed:', mockError);
        this.submitError = true;
        this.errorMessage = 'There was an error sending your message. Please try again later.';
      }
    } finally {
      this.isSubmitting = false;
      console.log('🏁 Contact form submission process completed');
    }
  }

  navigateToPrivacy() {
    this.router.navigate(['/legal/privacy']).then(() => {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }, 0);
    });
  }
  private resetForm(form: NgForm): void {
    // Reset Angular form
    form.resetForm();
    
    // Reset component data
    this.formSubmitted! = false;
    
    // Reset form data
    this.formData! = {
      name: '',
      email: '',
      message: '',
      privacyPolicy: false
    };
    
    // Hide success message after delay
    setTimeout(() => {
      this.submitSuccess! = false;
    }, 3000);
  }
}
