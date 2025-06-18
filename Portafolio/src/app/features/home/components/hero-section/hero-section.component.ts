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
        <div class="hero__left-container">
          <img 
            class="hero__image" 
            src="assets/img/hero.png" 
            alt="Hero image">
          <div class="hero__image-shadow"></div>
        </div>
        
        <div class="hero__text-container">
          <div class="hero__intro">
            <div class="hero__intro-text" [@fadeInLeft]>
              {{ 'HERO.IAM' | translate }}
            </div>
            <div class="hero__name-container" [@fadeInUp]>
              <h1 class="hero__name">{{ 'HERO.NAME' | translate }}</h1>
              <p class="hero__title">{{ 'HERO.JOBTITLE' | translate }}</p>
              
              <div class="hero__cta-wrapper">
                <a href="#contact" class="hero__cta">
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
  <img src="assets/img/github.png" alt="GitHub"> <!-- ← KEINE class hier -->
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
      
      <div class="hero__vector-shape"></div>
    </section>
  `,
    styles: [`
    .hero {
      position: relative;
      height: 100vh;
      min-height: 700px;
      background-color: var(--color-background-primary);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding-top: var(--header-height);
      box-sizing: border-box;
    }

    .hero__content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex: 1;
      width: 100%;
      padding: 0 100px;
      margin-top: calc(-1 * var(--header-height));
      position: relative;
      z-index: 3;
    }

    .hero__text-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 40%;
      z-index: 3;
      gap: 80px;
    }

    .hero__left-container {
      position: relative;
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2;
      margin-top: 80px;
    }

    .hero__image {
      height: 75vh;
      object-fit: contain;
      position: relative;
      z-index: 3;
    }

    .hero__image-shadow {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: url('/assets/img/hero-shadows.png') no-repeat;
      background-size: contain;
      z-index: 2;
      opacity: 0.8;
    }

    .hero__intro {
      display: flex;
      align-items: center;
      gap: 0px; 
    }

    .hero__intro-text {
      transform: rotate(-90deg);
      font-size: 32px;
      padding-left: 0;        
      margin-right: 15px;     
      color: var(--color-text-primary);
      white-space: nowrap;
    }

    .hero__name-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .hero__name {
      margin: 0;
      line-height: 1.2;
      font-size: 48px;
      color: var(--color-text-primary);
    }

    .hero__title {
      color: var(--color-accent-secondary);
      font-size: 32px;
      margin: 0;
      line-height: 1.2;
    }

    .hero__cta-wrapper {
      margin-top: 20px;
    }

    .hero__cta {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 120px;
      height: 40px;
      border-radius: 10px;
      background-color: var(--color-accent-primary);
      color: white;
      font-size: 16px;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .hero__cta:hover {
      transform: scale(1.05);
      background-color: var(--color-accent-secondary);
    }

    .hero__vector-shape {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url('/assets/img/Vector shape hero.png') no-repeat;
      background-size: cover;
      background-position: bottom center;
      z-index: 1;
      opacity: 0.8;
    }

    .hero__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 100px;
      padding: 0 100px;
      z-index: 20;
      margin-top: auto;
      position: relative;
      flex-shrink: 0;
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
      font-size: 16px;
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

    @media (max-width: 1200px) {
      .hero__content {
        padding: 0 50px;
        flex: 1 0 auto;
      }

      .hero__footer {
        padding: 0 50px;
        position: relative;
        bottom: 0;
        left: 0;
        right: 0;
      }

      .hero__image {
        height: 65vh;
      }
    }

    @media (max-width: 900px) {
      .hero {
        height: 100vh;
        min-height: 100vh;
        padding-bottom: 0;
        position: relative;
        display: flex;
        flex-direction: column;
      }

      .hero__cta-wrapper {
        margin-top: 10px;
      }

      .hero__content {
        flex-direction: column;
        padding: 20px;
        gap: 2rem;
        margin-top: 0px;
        flex: 1;
        justify-content: center;
        align-items: center;
      }

      .hero__left-container {
        width: 100%;
        order: 1;
        flex-shrink: 0;
      }

      .hero__text-container {
        width: 100%;
        align-items: center;
        text-align: center;
        gap: 20px;
        order: 2;
        flex-shrink: 0;
      }

      .hero__image {
        height: 30vh;
        width: auto;
        max-width: 100%;
      }

      .hero__intro {
        flex-direction: column;
        justify-content: center;
        gap: 1rem;
      }

      .hero__intro-text {
        transform: none;
        margin-left: 0;
      }

      .hero__footer {
        position: relative;
        bottom: auto;      
        left: auto;
        right: auto;
        padding: 0 20px;
        height: 80px;
        background-color: transparent;
        backdrop-filter: none;
        z-index: 10;
        margin-top: auto;
        flex-shrink: 0;
      }

      .hero__email {
        display: none;
      }

      .hero__image-shadow {
        right: 0;
        bottom: -50px;
        width: 100%;
        height: 100%;
      }
    }

    @media (max-width: 600px) {
      .hero__name {
        font-size: 24px;
      }

      .hero__title {
        font-size: 18px;
      }

      .hero__intro-text {
        font-size: 14px;
      }

      .hero__cta {
        width: 100px;
        height: 35px;
        font-size: 14px;
      }

      .hero__social-link img {
        width: 25px;
        height: 25px;
      }

      .hero__scroll {
        font-size: 14px;
      }
    }

    @media (max-width: 400px) {
      .hero__name {
        font-size: 20px;
      }

      .hero__title {
        font-size: 16px;
      }

      .hero__intro-text {
        font-size: 12px;
      }

      .hero__cta {
        width: 80px;
        height: 28px;
        font-size: 11px;
      }

      .hero__image {
        height: 20vh;
      }
    }
   
   @media (max-width: 320px) {
     .hero__name {
       font-size: 18px;
     }

     .hero__title {
       font-size: 14px;
     }

     .hero__intro-text {
       font-size: 11px;
     }

     .hero__cta {
       width: 70px;
       height: 25px;
       font-size: 10px;
     }

     .hero__image {
       height: 18vh;
     }
     
     .hero__social-link img {
       width: 20px;
       height: 20px;
     }
     
     .hero__scroll {
       font-size: 12px;
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