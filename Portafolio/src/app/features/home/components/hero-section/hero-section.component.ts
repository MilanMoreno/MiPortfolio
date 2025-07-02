import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ClipboardManagerService } from '../../../../shared/services/clipboard/clipboard.service';
import { fadeInLeft, fadeInUp } from '../../../../shared/animations/fade.animations';

@Component({
    selector: 'app-contacts-section',
    imports: [CommonModule, TranslateModule],
    template: `
<section class="contact" id="contact">
  <div class="contact__container">
    <div class="contact__header">
      <h2 class="contact__title" [@fadeInUp]>{{ 'CONTACT.TITLE' | translate }}</h2>
      <p class="contact__subtitle" [@fadeInLeft]>{{ 'CONTACT.SUBTITLE' | translate }}</p>
    </div>
    
    <div class="contact__content">
      <div class="contact__info" [@fadeInLeft]>
        <div class="contact__info-item">
          <h3 class="contact__info-title">{{ 'CONTACT.EMAIL_TITLE' | translate }}</h3>
          <button class="contact__email-button" (click)="copyEmail()">
            <img src="assets/img/email.png" alt="Email" class="contact__icon">
            <span class="contact__email">milan.moreno&#64;gmail.com</span>
          </button>
        </div>
        
        <div class="contact__info-item">
          <h3 class="contact__info-title">{{ 'CONTACT.SOCIAL_TITLE' | translate }}</h3>
          <div class="contact__social">
            <a href="https://github.com/MilanMoreno" target="_blank" class="contact__social-link">
              <img src="assets/img/github.png" alt="GitHub">
              <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/milan-moreno-9a7482360/" target="_blank" class="contact__social-link">
              <img src="assets/img/linkedin.png" alt="LinkedIn">
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
        
        <div class="contact__info-item">
          <h3 class="contact__info-title">{{ 'CONTACT.AVAILABILITY' | translate }}</h3>
          <p class="contact__availability">{{ 'CONTACT.AVAILABILITY_TEXT' | translate }}</p>
        </div>
      </div>
      
      <div class="contact__form-wrapper" [@fadeInUp]>
        <form class="contact__form">
          <div class="contact__form-group">
            <label for="name" class="contact__label">{{ 'CONTACT.NAME' | translate }}</label>
            <input type="text" id="name" class="contact__input" [placeholder]="'CONTACT.NAME_PLACEHOLDER' | translate">
          </div>
          
          <div class="contact__form-group">
            <label for="email" class="contact__label">{{ 'CONTACT.EMAIL' | translate }}</label>
            <input type="email" id="email" class="contact__input" [placeholder]="'CONTACT.EMAIL_PLACEHOLDER' | translate">
          </div>
          
          <div class="contact__form-group">
            <label for="subject" class="contact__label">{{ 'CONTACT.SUBJECT' | translate }}</label>
            <input type="text" id="subject" class="contact__input" [placeholder]="'CONTACT.SUBJECT_PLACEHOLDER' | translate">
          </div>
          
          <div class="contact__form-group">
            <label for="message" class="contact__label">{{ 'CONTACT.MESSAGE' | translate }}</label>
            <textarea id="message" class="contact__textarea" rows="5" [placeholder]="'CONTACT.MESSAGE_PLACEHOLDER' | translate"></textarea>
          </div>
          
          <button type="submit" class="contact__submit">
            {{ 'CONTACT.SEND_MESSAGE' | translate }}
          </button>
        </form>
      </div>
    </div>
    
    <div class="contact__footer">
      <div class="contact__line-container">
        <div class="contact__line"></div>
      </div>
      
      <div class="contact__footer-content">
        <p class="contact__footer-text">{{ 'CONTACT.FOOTER_TEXT' | translate }}</p>
        <a href="#hero" class="contact__back-to-top">
          {{ 'CONTACT.BACK_TO_TOP' | translate }}
        </a>
      </div>
    </div>
  </div>
  
  <div class="contact__notification" [class.contact__notification--visible]="(clipboardService.copyStatus$ | async)">
    {{ 'CONTACT.EMAIL_COPIED' | translate }}
  </div>
</section>
  `,
    styles: [`
    .contact {
      position: relative;
      min-height: 100vh;
      background-color: var(--color-background-primary);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding: 100px 0;
      box-sizing: border-box;
    }

    .contact__container {
      width: 100%;
      max-width: 1920px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      flex: 1;
      position: relative;
      z-index: 5;
      padding: 0 100px;
    }

    .contact__header {
      text-align: center;
      margin-bottom: 80px;
    }

    .contact__title {
      font-size: 64px;
      color: var(--color-text-primary);
      margin: 0 0 20px 0;
      line-height: 1.1;
    }

    .contact__subtitle {
      font-size: 24px;
      color: var(--color-text-secondary);
      margin: 0;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .contact__content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      margin-bottom: 100px;
    }

    .contact__info {
      display: flex;
      flex-direction: column;
      gap: 40px;
    }

    .contact__info-item {
      background: rgba(255, 255, 255, 0.05);
      padding: 30px;
      border-radius: 15px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .contact__info-title {
      font-size: 24px;
      color: var(--color-accent-primary);
      margin: 0 0 20px 0;
    }

    .contact__email-button {
      display: flex;
      align-items: center;
      gap: 15px;
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .contact__email-button:hover {
      transform: translateX(10px);
    }

    .contact__icon {
      width: 24px;
      height: 24px;
      transition: filter 0.3s ease;
    }

    .contact__email-button:hover .contact__icon {
      filter: brightness(0) saturate(100%) invert(76%) sepia(15%) 
             saturate(4614%) hue-rotate(71deg) brightness(102%) contrast(101%);
    }

    .contact__email {
      font-size: 20px;
      color: var(--color-text-primary);
      transition: color 0.3s ease;
    }

    .contact__email-button:hover .contact__email {
      color: var(--color-accent-primary);
    }

    .contact__social {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .contact__social-link {
      display: flex;
      align-items: center;
      gap: 15px;
      color: var(--color-text-primary);
      text-decoration: none;
      font-size: 18px;
      transition: all 0.3s ease;
    }

    .contact__social-link:hover {
      color: var(--color-accent-primary);
      transform: translateX(10px);
    }

    .contact__social-link img {
      width: 24px;
      height: 24px;
      transition: filter 0.3s ease;
    }

    .contact__social-link:hover img {
      filter: brightness(0) saturate(100%) invert(76%) sepia(15%) 
             saturate(4614%) hue-rotate(71deg) brightness(102%) contrast(101%);
    }

    .contact__availability {
      font-size: 18px;
      color: var(--color-text-secondary);
      margin: 0;
      line-height: 1.5;
    }

    .contact__form-wrapper {
      background: rgba(255, 255, 255, 0.05);
      padding: 40px;
      border-radius: 15px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .contact__form {
      display: flex;
      flex-direction: column;
      gap: 25px;
    }

    .contact__form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .contact__label {
      font-size: 16px;
      color: var(--color-text-primary);
      font-weight: 500;
    }

    .contact__input,
    .contact__textarea {
      padding: 15px 20px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.05);
      color: var(--color-text-primary);
      font-size: 16px;
      transition: all 0.3s ease;
    }

    .contact__input:focus,
    .contact__textarea:focus {
      outline: none;
      border-color: var(--color-accent-primary);
      background: rgba(255, 255, 255, 0.1);
    }

    .contact__input::placeholder,
    .contact__textarea::placeholder {
      color: var(--color-text-secondary);
    }

    .contact__textarea {
      resize: vertical;
      min-height: 120px;
    }

    .contact__submit {
      background-color: var(--color-accent-primary);
      color: white;
      border: none;
      padding: 18px 40px;
      border-radius: 10px;
      font-size: 18px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 10px;
    }

    .contact__submit:hover {
      background-color: var(--color-accent-secondary);
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }

    .contact__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 100px;
      position: relative;
      margin-top: auto;
    }

    .contact__line-container {
      position: relative;
      width: 100px;
      overflow: visible;
    }

    .contact__line {
      position: absolute;
      right: 0;
      width: 99999px;
      height: 4px;
      background-color: var(--color-accent-secondary);
    }

    .contact__footer-content {
      display: flex;
      align-items: center;
      gap: 40px;
      position: relative;
      z-index: 15;
    }

    .contact__footer-text {
      font-size: 18px;
      color: var(--color-text-secondary);
      margin: 0;
    }

    .contact__back-to-top {
      color: var(--color-text-primary);
      font-size: 18px;
      text-decoration: none;
      transition: all 0.3s ease;
      position: relative;
    }

    .contact__back-to-top:hover {
      color: var(--color-accent-primary);
      transform: translateY(-2px);
    }

    .contact__back-to-top::after {
      content: '↑';
      margin-left: 8px;
      font-size: 20px;
    }

    .contact__notification {
      position: fixed;
      bottom: -100%;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba(0, 0, 0, 0.8);
      padding: 1rem 2rem;
      border-radius: 10px;
      color: var(--color-text-primary);
      transition: bottom 0.3s ease;
      z-index: 100;
    }

    .contact__notification--visible {
      bottom: 2rem;
    }

    /* Responsive Design */
    @media (max-width: 1200px) {
      .contact__container {
        padding: 0 50px;
      }

      .contact__content {
        gap: 60px;
      }
    }

    @media (max-width: 900px) {
      .contact__container {
        padding: 0 30px;
      }

      .contact__content {
        grid-template-columns: 1fr;
        gap: 50px;
      }

      .contact__title {
        font-size: 48px;
      }

      .contact__subtitle {
        font-size: 20px;
      }

      .contact__footer {
        flex-direction: column;
        gap: 20px;
        height: auto;
        padding: 30px 0;
      }

      .contact__footer-content {
        flex-direction: column;
        gap: 20px;
      }
    }

    @media (max-width: 600px) {
      .contact {
        padding: 50px 0;
      }

      .contact__container {
        padding: 0 20px;
      }

      .contact__header {
        margin-bottom: 50px;
      }

      .contact__title {
        font-size: 36px;
      }

      .contact__subtitle {
        font-size: 18px;
      }

      .contact__content {
        gap: 40px;
        margin-bottom: 60px;
      }

      .contact__info {
        gap: 30px;
      }

      .contact__info-item {
        padding: 25px;
      }

      .contact__form-wrapper {
        padding: 30px;
      }

      .contact__form {
        gap: 20px;
      }

      .contact__input,
      .contact__textarea {
        padding: 12px 15px;
      }

      .contact__submit {
        padding: 15px 30px;
        font-size: 16px;
      }
    }

    @media (max-width: 400px) {
      .contact__title {
        font-size: 28px;
      }

      .contact__subtitle {
        font-size: 16px;
      }

      .contact__info-item {
        padding: 20px;
      }

      .contact__form-wrapper {
        padding: 25px;
      }

      .contact__info-title {
        font-size: 20px;
      }
    }
  `],
    animations: [fadeInLeft, fadeInUp]
})
export class ContactsSectionComponent {
  constructor(public clipboardService: ClipboardManagerService) {}

  copyEmail(): void {
    this.clipboardService.copyToClipboard('milan.moreno@gmail.com');
  }
}