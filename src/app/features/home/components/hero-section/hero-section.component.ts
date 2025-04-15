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
        <div class="hero__text-container">
          <div class="hero__intro">
            <div class="hero__intro-text" [@fadeInLeft]>
              {{ 'HERO.IAM' | translate }}
            </div>
            <div class="hero__name-container" [@fadeInUp]>
              <h1 class="hero__name">{{ 'HERO.NAME' | translate }}</h1>
              <p class="hero__title">{{ 'HERO.JOBTITLE' | translate }}</p>
            </div>
          </div>
          
          <a href="#contact" class="hero__cta">
            {{ 'HERO.LETSTALK' | translate }}
          </a>
        </div>

        <div class="hero__right-container">
          <div class="hero__image-wrapper">
            <img 
              class="hero__image" 
              src="assets/img/hero.png" 
              alt="Hero image">
          </div>
          <div class="hero__image-shadow"></div>
        </div>
      </div>

      <div class="hero__footer">
        <div class="hero__line"></div>
        
        <div class="hero__social">
          <a 
            href="https://github.com/MilanMoreno" 
            target="_blank" 
            class="hero__social-link">
            <img src="assets/img/github.png" alt="GitHub">
          </a>
          <button 
            class="hero__social-link"
            (click)="copyEmail()">
            <img src="assets/img/email.png" alt="Email">
          </button>
          <a 
            href="https://www.linkedin.com/in/thomas-mustermann-a4072a25b/"
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
      height: calc(100vh - var(--header-height));
      background-color: var(--color-background-primary);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .hero__content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: calc(100vh - var(--header-height) - 100px);
      width: 100%;
      padding: 0 100px;
    }

    .hero__text-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 40%;
      z-index: 3;
    }

    .hero__intro {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .hero__intro-text {
      transform: rotate(-90deg);
      font-size: 32px;
      color: var(--color-text-primary);
      white-space: nowrap;
      margin-left: -1rem;
    }

    .hero__name {
      margin: 0;
      line-height: 1;
      font-size: 64px;
      color: var(--color-text-primary);
    }

    .hero__title {
      color: var(--color-accent-secondary);
      font-size: 32px;
      margin: 0;
      line-height: 1;
    }

    .hero__cta {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 165px;
      height: 58px;
      border-radius: 10px;
      background-color: var(--color-accent-primary);
      color: var(--color-text-primary);
      font-size: 23px;
      margin-top: 30px;
      margin-left: 70px;
      transition: all 0.3s ease;

      &:hover {
        width: 170px;
        height: 62px;
        background-color: var(--color-accent-secondary);
      }
    }

    .hero__right-container {
      position: relative;
      width: 60%;
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    .hero__image-wrapper {
      position: relative;
      z-index: 2;
      margin-right: 50px;
    }

    .hero__image {
      height: 75vh;
      object-fit: contain;
      animation: float 6s ease-in-out infinite;
    }

    .hero__image-shadow {
      position: absolute;
      right: -150px;
      bottom: -100px;
      width: 120%;
      height: 120%;
      background: url('/assets/img/hero-shadows.png') no-repeat center/cover;
      z-index: 1;
      transform: rotate(-5deg);
      opacity: 0.8;
    }

    .hero__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 100px;
      padding: 0 100px;
      z-index: 10;
    }

    .hero__line {
      width: 100px;
      height: 4px;
      background-color: var(--color-accent-secondary);
    }

    .hero__social {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .hero__social-link {
      background: none;
      border: none;
      padding: 0;
      transition: transform 0.3s ease;
      
      &:hover {
        transform: scale(1.1);
        
        img {
          filter: brightness(0) saturate(100%) invert(76%) sepia(15%) 
                 saturate(4614%) hue-rotate(71deg) brightness(102%) contrast(101%);
        }
      }
    }

    .hero__email {
      margin-left: 15px;
      font-size: 23px;
      color: var(--color-text-primary);
      cursor: pointer;

      &:hover {
        color: var(--color-accent-primary);
      }
    }

    .hero__scroll {
      transform: rotate(90deg);
      color: var(--color-text-primary);
      font-size: 20px;
      transition: color 0.3s ease;

      &:hover {
        color: var(--color-accent-primary);
      }
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

      &--visible {
        bottom: 2rem;
      }
    }

    @media (max-width: 1200px) {
      .hero__content {
        padding: 0 50px;
      }

      .hero__text-container {
        width: 45%;
      }

      .hero__image {
        height: 65vh;
      }
    }

    @media (max-width: 900px) {
      .hero__content {
        flex-direction: column;
        padding: 0 20px;
      }

      .hero__text-container {
        width: 100%;
        align-items: center;
        text-align: center;
      }

      .hero__right-container {
        display: none;
      }

      .hero__intro {
        justify-content: center;
      }

      .hero__cta {
        margin-left: 0;
      }

      .hero__footer {
        padding: 0 20px;
      }

      .hero__email {
        display: none;
      }
    }

    @media (max-width: 600px) {
      .hero__name {
        font-size: 48px;
      }

      .hero__title {
        font-size: 28px;
      }

      .hero__intro-text {
        font-size: 24px;
      }

      .hero__cta {
        width: 140px;
        height: 50px;
        font-size: 20px;
      }

      .hero__social {
        gap: 15px;
      }

      .hero__scroll {
        font-size: 16px;
      }
    }

    @media (max-width: 400px) {
      .hero__name {
        font-size: 36px;
      }

      .hero__title {
        font-size: 24px;
      }

      .hero__intro-text {
        font-size: 20px;
      }

      .hero__cta {
        width: 120px;
        height: 45px;
        font-size: 18px;
      }
    }
  `],
    animations: [fadeInLeft, fadeInUp]
})
export class HeroSectionComponent {
  constructor(public clipboardService: ClipboardManagerService) {}

  copyEmail(): void {
    this.clipboardService.copyToClipboard('milan.moreno20@gmail.com');
  }
}