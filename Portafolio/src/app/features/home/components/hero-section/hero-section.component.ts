import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ClipboardManagerService } from '../../../../shared/services/clipboard/clipboard.service';
import { fadeInLeft, fadeInUp } from '../../../../shared/animations/fade.animations';

@Component({
    selector: 'app-hero-section',
    imports: [CommonModule, TranslateModule],
    template: `
    <section class="hero" id="hero">
      <div class="hero__content">
        <div class="hero__profile-section">
          <div class="hero__profile-image-container">
            <img 
              class="hero__profile-image" 
              src="assets/img/me.jpeg" 
              alt="Milan Moreno">
            <div class="hero__glow-effect"></div>
            <div class="hero__wave-shape"></div>
          </div>
          
          <div class="hero__text-container">
            <div class="hero__vertical-text">
              <span>{{ 'HERO.IAM' | translate }}</span>
            </div>
            
            <div class="hero__main-content">
              <h1 class="hero__name" [@fadeInUp]>{{ 'HERO.NAME' | translate }}</h1>
              <p class="hero__title" [@fadeInUp]>{{ 'HERO.JOBTITLE' | translate }}</p>
              
              <div class="hero__cta-container">
                <a href="#contact" class="hero__cta-button">
                  {{ 'HERO.LETSTALK' | translate }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="hero__footer">
        <div class="hero__line-container">
          <div class="hero__line"></div>
        </div>
        
        <div class="hero__social">
         <a 
  href="https://github.com/MilanMoreno" 
  target="_blank" 
  class="hero__social-link">
  <img src="assets/img/github.png" alt="GitHub"> 
</a><a 
  class="hero__social-link"
  (click)="copyEmail()">
  <img src="assets/img/email.png" alt="Email">
</a>
<a 
  href="https://www.linkedin.com/in/milan-moreno-9a7482360//"
  target="_blank" 
  class="hero__social-link">
  <img src="assets/img/linkedin.png" alt="LinkedIn">
</a>
          <span class="hero__email">milan.moreno&#64;gmail.com</span>
        </div>

        <a href="#about" class="hero__scroll">
          {{ 'HERO.SCROLLDOWN' | translate }}
        </a>
      </div>

      <div 
        class="hero__notification"
        [class.hero__notification--visible]="(clipboardService.copyStatus$ | async)">
        {{ 'HERO.EMAIL_COPIED' | translate }}
      </div>
    </section>
  `,
    styles: [`
    .hero {
      position: relative;
      width: 100%;
      height: 100vh; 
      background-color: var(--color-background-primary);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-top: var(--header-height); 
      overflow-x: hidden;
    }

    .hero__content {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      padding: 0 5%;
      margin-top: -var(--header-height);
    }

    .hero__profile-section {
      display: flex;
      width: 100%;
      max-width: 1200px;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 5;
    }

    .hero__profile-image-container {
      position: relative;
      width: 45%;
      max-width: 500px;
      z-index: 10;
    }

    .hero__profile-image {
      width: 100%;
      height: auto;
      border-radius: 0;
      position: relative;
      z-index: 10;
    }

    .hero__glow-effect {
      position: absolute;
      top: 0;
      left: 0;
      width: 150%;
      height: 150%;
      background: 
        radial-gradient(circle at 30% 50%, rgba(151, 71, 255, 0.6) 0%, rgba(151, 71, 255, 0) 35%),
        radial-gradient(circle at 70% 50%, rgba(112, 230, 28, 0.6) 0%, rgba(112, 230, 28, 0) 35%);
      z-index: 5;
      transform: translate(-20%, -20%);
      filter: blur(30px);
      opacity: 0.8;
      pointer-events: none;
    }

    .hero__wave-shape {
      position: absolute;
      bottom: -20%;
      right: -20%;
      width: 140%;
      height: 140%;
      background-color: var(--color-background-primary);
      border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
      transform: rotate(-10deg);
      z-index: 1;
    }

    .hero__text-container {
      display: flex;
      width: 50%;
      align-items: center;
      z-index: 10;
    }

    .hero__vertical-text {
      writing-mode: vertical-rl;
      transform: rotate(180deg);
      font-size: 1.5rem;
      margin-right: 1.5rem;
      color: var(--color-text-primary);
    }

    .hero__main-content {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .hero__name {
      font-size: 4rem;
      font-weight: 700;
      margin: 0;
      color: var(--color-text-primary);
      line-height: 1.1;
    }

    .hero__title {
      font-size: 2rem;
      color: var(--color-accent-secondary);
      margin: 0;
      margin-bottom: 1.5rem;
    }

    .hero__cta-container {
      margin-top: 1rem;
    }

    .hero__cta-button {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      background-color: var(--color-accent-primary);
      color: white;
      padding: 0.75rem 2rem;
      font-size: 1.25rem;
      font-weight: 600;
      border-radius: 10px;
      transition: all 0.3s ease;
    }

    .hero__cta-button:hover {
      transform: scale(1.05);
      background-color: var(--color-accent-secondary);
    }

    .hero__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 80px;
      padding: 0 100px;
      z-index: 10;
    }

    .hero__line-container {
      position: relative;
      width: 100px;
    }

    .hero__line {
      position: absolute;
      right: 0;
      width: 99999px;
      height: 4px;
      background-color: var(--color-accent-secondary);
    }

    .hero__social {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .hero__social-link {
      display: inline-block;
    }

    .hero__social-link:hover {
      /* No transform or button-like behavior */
    }

    .hero__social-link:hover img {
      filter: brightness(0) saturate(100%) invert(76%) sepia(15%) saturate(4614%) hue-rotate(71deg) brightness(102%) contrast(101%);
    }

    .hero__email {
      margin-left: 15px;
      font-size: 23px;
      color: var(--color-text-primary);
      cursor: pointer;
    }

    .hero__email:hover {
      color: var(--color-accent-primary);
    }

    .hero__scroll {
      transform: rotate(90deg);
      color: var(--color-text-primary);
      font-size: 20px;
      transition: color 0.3s ease;
    }

    .hero__scroll:hover {
      color: var(--color-accent-primary);
    }

    .hero__notification {
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

    .hero__notification--visible {
      bottom: 2rem;
    }

    @media (max-width: 1024px) {
      .hero__profile-section {
        flex-direction: column;
        gap: 2rem;
        text-align: center;
      }

      .hero__text-container {
        width: 100%;
        flex-direction: column;
        margin-top: 1rem;
      }

      .hero__vertical-text {
        writing-mode: horizontal-tb;
        transform: none;
        margin-right: 0;
        margin-bottom: 1rem;
      }

      .hero__profile-image-container {
        width: 70%;
        max-width: 350px;
      }
    }

    @media (max-width: 768px) {
      .hero__footer {
        padding: 0 2rem;
      }

      .hero__name {
        font-size: 3rem;
      }

      .hero__title {
        font-size: 1.5rem;
      }
    }

    @media (max-width: 480px) {
      .hero__profile-image-container {
        width: 90%;
      }

      .hero__name {
        font-size: 2.5rem;
      }

      .hero__title {
        font-size: 1.25rem;
        margin-bottom: 1rem;
      }

      .hero__cta-button {
        padding: 0.6rem 1.5rem;
        font-size: 1rem;
      }

      .hero__footer {
        height: 60px;
        padding: 0 1rem;
      }

      .hero__email {
        display: none;
      }

      .hero__scroll {
        font-size: 0.875rem;
      }
    }
  `],
    animations: [fadeInLeft, fadeInUp]
})
export class HeroSectionComponent {
  constructor(public clipboardService: ClipboardManagerService) {}

  copyEmail(): void {
    this.clipboardService.copyToClipboard('milan.moreno.crea@gmail.com');
  }
}