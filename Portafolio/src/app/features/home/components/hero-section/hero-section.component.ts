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
      <img class="hero__image" src="assets/img/hero.png" alt="Hero image">
      <div class="hero__image-shadow"></div>
      
      <!-- Mobile Vector Shape - only visible under 900px -->
      <div class="hero__mobile-vector">
        <img src="assets/img/Vector shape hero.png" alt="Vector Shape" class="hero__mobile-vector-image">
      </div>
    </div>

    <div class="hero__text-wrapper">
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

  <!-- Desktop Vector Shape - stays above 900px -->
  <div class="hero__vector-shape">
    <img src="assets/img/Vector shape hero.png" alt="Vector Shape" class="hero__vector-image">
  </div>

  <div class="hero__footer">
    <div class="hero__line-container">
      <div class="hero__line"></div>
    </div>

    <div class="hero__social">
      <a href="https://github.com/MilanMoreno" target="_blank" class="hero__social-link">
        <img src="assets/img/github.png" alt="GitHub">
      </a>
      <a class="hero__social-link" (click)="copyEmail()">
        <img src="assets/img/email.png" alt="Email">
      </a>
      <a href="https://www.linkedin.com/in/milan-moreno-9a7482360//" target="_blank" class="hero__social-link">
        <img src="assets/img/linkedin.png" alt="LinkedIn">
      </a>
      <span class="hero__email">milan.moreno&#64;gmail.com</span>
    </div>

    <a href="#about" class="hero__scroll">
      {{ 'HERO.SCROLLDOWN' | translate }}
    </a>
  </div>

  <div class="hero__notification" [class.hero__notification--visible]="(clipboardService.copyStatus$ | async)">
    {{ 'HERO.EMAIL_COPIED' | translate }}
  </div>
</section>
  `,
    styles: [`
    .hero {
      position: relative;
      height: 100vh;
      min-height: 700px;
      background-color: #141D2F;
      display: flex;
      flex-direction: column;
      overflow: visible;
      padding-top: var(--header-height);
      box-sizing: border-box;
    }

    .hero__content {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex: 1;
      width: 100%;
      padding: 0 50px;
      margin-top: calc(-1 * var(--header-height));
      position: relative;
      z-index: 3;
      gap: 2rem;
    }

    .hero__left-container {
      position: relative;
      width: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2;
      margin-top: 80px;
      flex-shrink: 0;
    }

    .hero__image {
      height: 75vh;
      object-fit: contain;
      position: relative;
      z-index: 3;
    }

    .hero__image-shadow {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      background: url('/assets/img/hero-shadows.png') no-repeat center center;
      background-size: contain;
      z-index: 2;
      opacity: 0.8;
      pointer-events: none;
    }

    /* Mobile Vector Shape - full-width curtain that covers everything */
    .hero__mobile-vector {
      display: none;
      position: absolute;
      bottom: -40px; /* Position it to extend below the image */
      left: -50%; /* Start much further to the left */
      right: -50%; /* Extend much further to the right */
      transform: translateX(10%) rotate(2deg); /* Slight rotation for curve effect */
      width: 200%; /* Much wider - like a full curtain */
      max-width: none; /* Remove max-width limitation */
      height: 100px; /* Taller for better coverage */
      z-index: 4; /* Above the hero image */
      pointer-events: none;
    }

    .hero__mobile-vector-image {
      width: 100%;
      height: 100%;
      object-fit: cover; /* Fill the container while maintaining aspect ratio */
      object-position: center;
    }

    /* Desktop Vector Shape - keeps existing behavior above 900px */
    .hero__vector-shape {
      position: absolute;
      bottom: -60%;
      left: -10%;
      width: 120%;
      height: 180vh;
      z-index: 4;
      pointer-events: none;
      overflow: visible;
      transform: translateY(250px);
    }

    .hero__vector-image {
      position: absolute;
      top: 0;
      padding-bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      height: 100%;
      object-fit: contain;
      opacity: 1;
    }

    .hero__text-wrapper {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-left: -50px;
      z-index: 3;
    }

    .hero__intro-text {
      transform: rotate(-90deg);
      font-size: 32px;
      color: var(--color-text-primary);
      white-space: nowrap;
      flex-shrink: 0;
    }

    .hero__name-container {
      display: flex;
      flex-direction: column;
      gap: 5px;
      max-width: 718px;
      max-height: 172px;
      overflow: visible;
    }

    .hero__name {
      margin: 0;
      line-height: 1.1;
      font-size: 72px;
      color: var(--color-text-primary);
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .hero__title {
      color: var(--color-accent-secondary);
      font-size: 42px;
      margin: 0;
      line-height: 1.1;
      font-weight: 400;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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
      position: relative;
      z-index: 35;
    }

    .hero__cta:hover {
      transform: scale(1.05);
      background-color: var(--color-accent-secondary);
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

    @media (max-width: 1300px) {
      .hero__content {
        padding: 0 50px;
      }

      .hero__footer {
        padding: 0 50px;
      }

      .hero__image {
        height: 46vh;
      }

      .hero__name {
        font-size: 60px;
      }

      .hero__title {
        font-size: 36px;
      }

      .hero__vector-shape {
        width: 120%;
        height: 160vh;
        bottom: -40%;
        left: 0%;
        transform: translateY(200px);
      }
    }

    @media (max-width: 1200px) {
      .hero__name {
        font-size: 55px;
      }

      .hero__title {
        font-size: 32px;
      }

      .hero__vector-shape {
        width: 120%;
        height: 170vh;
        bottom: -40%;
        left: 0%;
        transform: translateY(200px);
      }
    }

    @media (max-width: 1000px) {
      .hero__name {
        font-size: 50px;
      }

      .hero__title {
        font-size: 30px;
      }

      .hero__vector-shape {
        width: 127%;
        height: 168vh;
        bottom: -40%;
        left: 0%;
        transform: translateY(200px);
      }
    }

    /* Mobile layout - show mobile vector, hide desktop vector */
    @media (max-width: 900px) {
      /* Hide desktop vector shape */
      .hero__vector-shape {
        display: none;
      }

      /* Show mobile vector shape */
      .hero__mobile-vector {
        display: flex;
      }
      
      .hero {
        height: 100vh;
        min-height: 100vh;
        padding-bottom: 0;
        position: relative;
        display: flex;
        flex-direction: column;
      }

      .hero__name { 
        font-size: 45px;
        white-space: normal;
      }

      .hero__title {
        font-size: 26px;
        white-space: normal;
      }

      .hero__cta {
        font-size: 16px;
      }

      .hero__cta-wrapper {
        margin-top: 10px;
      }

      .hero__content {
        flex-direction: column;
        padding: 20px;
        gap: 1rem; 
        margin-top: 0px;
        flex: 1;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 50;
      }

      .hero__left-container {
        width: 100%;
        order: 1;
        flex-shrink: 0;
        margin-top: 0;
        position: relative;
        z-index: 2;
      }

      .hero__text-wrapper {
        width: 100%;
        order: 2; 
        flex-shrink: 0;
        margin-left: 0; 
        flex-direction: column; 
        align-items: center;
        text-align: center;
        gap: 0rem;
        position: relative;
        z-index: 100; 
        margin-top: 0px; 
      }

      .hero__name-container {
        max-width: 100%; 
        max-height: none; 
        align-items: center;
        position: relative;
        z-index: 30;
      }

      .hero__intro-text {
        transform: none; 
        font-size: 24px;
        position: relative;
        z-index: 30;
      }

      .hero__image {
        height: 44vh;
        width: 55vh;
        max-width: 100%;
      }

      .hero__image-shadow {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 150%;
      }

      .hero__footer {
        position: relative;
        bottom: auto;      
        left: auto;
        right: auto;
        padding: 0 0px;
        height: 92px;
        background-color: transparent;
        backdrop-filter: none;
        z-index: 10;
        margin-top: auto;
        flex-shrink: 0;
      }

      .hero__email {
        display: none;
      }
    }

    @media (max-width: 600px) {
      .hero__name {
        font-size: 40px;
      }

      .hero__title {
        font-size: 24px;
      }

      .hero__intro-text {
        font-size: 24px;
      }

      .hero__image {
        height: 40vh;
      }

      .hero__mobile-vector {
        width: 220%; /* Even wider for smaller screens */
        max-width: none;
        height: 90px;
        bottom: -60px;
        left: -60%;
        transform: translateX(15%) rotate(3deg);
      }
    }

    @media (max-width: 450px) {
      .hero__name {
        font-size: 32px;
      }

      .hero__title {
        font-size: 18px;
      }

      .hero__intro-text {
        font-size: 24px;
      }

      .hero__image {
        height: 36vh;
      }
  .hero__content {
      flex-direction: column;
    padding: 0px;
    gap: 0rem;
    margin-top: 0px;
    flex: 1;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 50;
    }
      .hero__mobile-vector {
    width: 171%;
    max-width: none;
    height: 37px;
    bottom: -20px;
    left: -69%;
    transform: translate(20%) rotate(4deg);
  }


    }

    @media (max-width: 350px) {
      .hero__name {
        font-size: 28px;
      }

      .hero__title {
        font-size: 20px;
      }

      .hero__intro-text {
        font-size: 20px;
      }

      .hero__image {
        height: 33vh;
      }

      .hero__line {
        width: 50px !important;
      }
      
      .hero__line-container {
        width: 50px !important;
      }
    }

    @media (max-width: 300px) {
      .hero__name {
        font-size: 24px;
      }

      .hero__title {
        font-size: 16px;
      }

      .hero__intro-text {
        font-size: 16px;
      }

      .hero__image {
        height: 28vh;
      }
      
      .hero__cta {
        width: 90px;
        height: 32px;
        font-size: 12px;
      }

      .hero__content {
        padding: 10px;
      }

      .hero__mobile-vector {
        width: 280%; /* Ultra-wide for complete coverage */
        max-width: none;
        height: 80px;
        bottom: -76px;
        left: -90%;
        transform: translateX(25%) rotate(5deg);
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