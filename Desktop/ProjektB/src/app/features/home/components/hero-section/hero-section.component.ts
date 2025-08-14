import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ClipboardManagerService } from '../../../../shared/services/clipboard/clipboard.service';
import { fadeInLeft, fadeInUp } from '../../../../shared/animations/fade.animations';

@Component({
    selector: 'app-hero-section',
    standalone: true,
    imports: [CommonModule, TranslateModule],
    template: `
<section class="hero" id="hero">
  <!-- Desktop Vector Shape - only visible above 900px -->
  <div class="hero__desktop-vector">
    <img src="assets/img/Vector shape hero.png" alt="Vector Shape" class="hero__desktop-vector-image">
  </div>

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

    <!-- Turn Device Message for iPad Landscape -->
    <div class="hero__turn-device">
      <div class="hero__turn-device-content">
        <div class="hero__turn-device-icon">📱</div>
        <h3>TURN YOUR DEVICE</h3>
        <p>For the best experience, please rotate your device to portrait mode</p>
      </div>
    </div>
</section>
  `,
    styles: [`
    .hero {
      position: relative;
      height: 100vh; /* CHANGED FROM 800px TO 100vh */
      max-height: 1000px;
      background-color: #141D2F;
      display: flex;
      flex-direction: column;
      overflow: visible;
      padding-top: 4%;
      padding-bottom: 0;
      box-sizing: border-box;
    }

    .hero__content {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      width: 100%;
      margin-right: 40px;
      padding: 20px 50px;
      margin-top: calc(-1 * var(--header-height));
      position: relative;
      z-index: 3;
      gap: 5rem;
    }

    .hero__left-container {
      position: relative;
      width: auto; 
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2;
      margin-top: 25px;
      flex-shrink: 0; 
    }


    img, video {
  max-width: 90%;
  height: auto;
}

    .hero__image {
margin-top:40px;
      height:90%; 
      height: 50%;
      object-fit: contain;
      padding-top:50px;
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

 
.hero__desktop-vector {
  position: absolute !important;
  left: -4% !important;
     bottom: 5% !important;   
  width: 132% !important;
     top: 55%; 
  height: 45% !important;
  pointer-events: none !important;
  z-index: 5 !important;
  transform: rotate(-2deg) !important;
}

    .hero__desktop-vector-image {
      width: 100% !important;
      height: 100% !important;
      object-fit: fill !important;
      opacity: 1 !important;
      transform: perspective(1000px) rotateX(-15deg) !important;
      border-radius: 300px 300px 0 0 / 150px 150px 0 0 !important;
    } 

    /* Mobile Vector Shape - original positioning from your code */
    .hero__mobile-vector {
      display: none;
      position: absolute;
      bottom: -40px;
      left: -50%;
      right: -50%;
      transform: translateX(10%) rotate(2deg);
      width: 200%;
      max-width: none;
      height: 100px;
      z-index: 4;
      pointer-events: none;
    }

    .hero__mobile-vector-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }

    .hero__text-wrapper {
      display: flex;
      align-items: center;
      gap: 20px;
      column-gap: 0px; 
      margin-left: -90px;
      z-index: 3;
    }

    .hero__intro-text {
      transform: rotate(-90deg);
      font-size: 58px;
      color: var(--color-text-primary);
      white-space: nowrap;
      flex-shrink: 0;
    }

    .hero__name-container {
      display: flex;
      flex-direction: column;
      row-gap: 5px;
      align-items: flex-start;
    }

    .hero__cta-wrapper {  
      margin-top: 0;   
    }

    /* Desktop: Button zentrieren oberhalb 900px */
    @media (min-width: 901px) {
      .hero__name-container {
        align-items: center;
      }
      
      .hero__cta-wrapper {
        display: flex;
        justify-content: center;
        width: 100%;
      }
    }

    .hero__name {
      margin: 0;
      line-height: 1.1;
      font-size: 90px;
      color: var(--color-text-primary);
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .hero__title {
      color: var(--color-accent-secondary);
      font-size: 54px;
      margin: 0;
      line-height: 1.1;
      font-weight: 400;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .hero__cta {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 165px;
      height: 50px;
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
      height: 10%;
      padding-bottom: 100px;
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
      font-size: 16px;
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

    /* Turn Device Message - Only for iPad Landscape */
    .hero__turn-device {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(20, 29, 47, 0.95);
      z-index: 9999;
      backdrop-filter: blur(10px);
    }

    .hero__turn-device-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      text-align: center;
      padding: 2rem;
    }

    .hero__turn-device-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
      animation: rotateDevice 2s infinite ease-in-out;
    }

    .hero__turn-device h3 {
      font-size: 2.5rem;
      color: var(--color-accent-primary);
      margin: 0 0 1rem 0;
      font-weight: 700;
    }

    .hero__turn-device p {
      font-size: 1.25rem;
      color: var(--color-text-primary);
      margin: 0;
    }

    @keyframes rotateDevice {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(-15deg); }
      75% { transform: rotate(15deg); }
    }

    /* Show Turn Device Message only for iPad Landscape */
    @media (min-width: 1070px) and (max-width: 1090px) and (min-height: 980px) and (max-height: 1000px) and (orientation: landscape) {
      .hero__turn-device {
        display: block;
      }
    }

    /* Show for iPad landscape orientation - broader range */
    @media (min-width: 1060px) and (max-width: 1100px) and (min-height: 970px) and (max-height: 1010px) and (orientation: landscape) {
      .hero__turn-device {
        display: block;
      }
    }

    /* Additional iPad landscape detection */
    @media (min-width: 1024px) and (max-width: 1366px) and (min-height: 768px) and (max-height: 1024px) and (orientation: landscape) {
      .hero__turn-device {
        display: block;
      }
    }

   /* Samsung Galaxy S20 Ultra and similar landscape phones */
   @media (min-width: 900px) and (max-width: 920px) and (min-height: 400px) and (max-height: 420px) and (orientation: landscape) {
     .hero__turn-device {
       display: block;
     }
   }
   /* iPad specific footer positioning */
   @media (min-width: 990px) and (max-width: 1080px) and (min-height: 990px) and (max-height: 1080px), 
         (min-width: 1080px) and (max-width: 1090px) and (min-height: 990px) and (max-height: 1000px) {
     .hero__footer {
       padding-bottom: 150px;
       margin-bottom: -50px;
     }
   }

    /* iPad Mini specific footer positioning - make footer more visible */
    @media (min-width: 760px) and (max-width: 780px) and (min-height: 1020px) and (max-height: 1030px) {
      .hero__footer {
        padding-bottom: 80px;
        margin-bottom: -20px;
        bottom: 5%;
        position: relative;
      }
    }
    @media (max-width: 1300px) {
      .hero__content {
        padding-right: 20px;
       
      }
      .hero{
       height: 100vh; /* CHANGED FROM 750px TO 100vh */
       }
        
      .hero__footer {
        padding: 0 50px;
      }
 
      .hero__image {
        height:450px;
         
      object-fit: contain;
      padding-top:30px;
      position: relative;
      z-index: 3;
    }
      

      .hero__name {
        font-size: 90px;
      }
.hero__desktop-vector{
        position: absolute !important;
        left: -4% !important;
       bottom: 10% !important;   
        width: 132% !important;
       top: 50%; 
        height: 45% !important;
        pointer-events: none !important;
        z-index: 5 !important;
        transform: rotate(-2deg) !important;
    }
      .hero__title { 
        font-size: 48px;
      }
    }

    @media (max-width: 1200px) {
      .hero__name {
        font-size: 70px;
      }
.hero__desktop-vector{
        position: absolute !important;
        left: -4% !important;
       bottom: 10% !important;   
        width: 132% !important;
       top: 50%; 
        height: 45% !important;
        pointer-events: none !important;
        z-index: 5 !important;
        transform: rotate(-2deg) !important;
      }
    
      .hero__title {
        font-size: 48px;
      }
        .hero__intro-text {
      font-size: 45px;
      }
      .hero__title {
        font-size: 43px;
      }
    }

    @media (max-width: 1000px) {
      .hero__name {
        font-size: 60px;
      }
.hero__desktop-vector{
        position: absolute !important;
        left: -4% !important;
       bottom: 10% !important;   
        width: 132% !important;
       top: 50%; 
        height: 45% !important;
        pointer-events: none !important;
        z-index: 5 !important;
        transform: rotate(-2deg) !important;
    }
  .hero__text-wrapper {
  margin-left:-132px;
  }
      .hero__title {
        font-size: 48px;
      }
      .hero__title {
        font-size: 38px;
      }
    }
 
    @media (max-width: 900px) {
      /* Hide desktop vector shape */
      .hero__desktop-vector {
        display: none;
      }

      /* Show mobile vector shape - positioned more to the left */
      .hero__mobile-vector {
        display: flex;
        position: absolute !important;
        bottom: -50px !important;
        left: -130px !important;
     width: 50% !important;
        z-index: 10 !important;
      }
      
      .hero {
        height: 100vh; /* CHANGED FROM 100% TO 100vh */
        min-height: 100vh; /* CHANGED FROM 100% TO 100vh */
        padding-bottom: 0;
        position: relative;
        display: flex;
        flex-direction: column;
        padding-top: 40px;
      }

      .hero__name { 
        font-size: 55px;
        white-space: normal;
      }

      .hero__title {
        font-size: 28px;
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
        padding: 0px;
        gap: 0rem; 
        margin-top: 2px;
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
        height: 360px;
      
        max-width: 100%;
         
      object-fit: contain;
      padding-top:30px;
      position: relative;
      z-index: 3;
    
      }

      .hero__image-shadow {
        left: 50%;
      top: 56%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
      }

      .hero__footer {
        position: relative;
        bottom: 1%;      
        left: 5%;
        right: 5%;
        padding: 0 0px;
        height: 18%;
        background-color: transparent;
        backdrop-filter: none;
        z-index: 10;
        top:1%;
        margin-top: 5%;
        flex-shrink: 0;
        margin-bottom: -10%;
      }

      .hero__email {
        display: none;
      }
    }

    /* Spezielle Anpassung für Bereich 601px bis 900px */
    @media (max-width: 900px) and (min-width: 601px) {
      .hero__content {
        justify-content: flex-start;
      padding-top: 25px;
        gap: 0rem;
      }

      .hero__image {
        height: 380px; 


       
      object-fit: contain;
      padding-top:30px;
      position: relative;
      z-index: 3;
    }
      

      .hero__name {
        font-size: 48px;
      }

      .hero__title {
        font-size: 28px;
      }

      .hero__intro-text {
        font-size: 20px;
      }
    }

    @media (max-width: 600px) {
      .hero__content {
        justify-content: flex-start;
        padding-top: 25px;
        gap: 0rem;
      }

      .hero__name {
        font-size: 50px;
      }

      .hero__title {
        font-size: 24px;
      }

      .hero__intro-text {
        font-size: 24px;
      }

      .hero__image {
        height: 380px; 
     
      object-fit: contain;
      padding-top:30px;
      position: relative;
      z-index: 3;
    
      }

      .hero__mobile-vector {
        width: 220%;
        max-width: none;
        height: 80px;
        bottom: -50px;
        left: -60%;
        transform: translate(0, 0) rotate(3deg);
      }
    }

    /* Spezifischer Fix für 584x748 Auflösung */
    @media (min-width: 580px) and (max-width: 590px) and (min-height: 740px) and (max-height: 750px) {
      .hero__content {
        padding-top:11%;
      }
    }

    /* Spezifischer Fix für 312x739px Auflösung */
    @media (min-width: 310px) and (max-width: 320px) and (min-height: 735px) and (max-height: 745px) {
      .hero__content {
        padding-top: 30%;
        padding-bottom:30%;
      }
    }

    /* Spezifischer Fix für iPad 990x1080 - Vector Shape höher positionieren */
    @media (max-width: 450px) {
      .hero__content {
        justify-content: flex-start;
        padding-top: 15%;
        gap: 0rem;
      }

      .hero__name {
        font-size: 48px;
      }

      .hero__title {
        font-size: 29px;
      }

      .hero__intro-text {
        font-size: 28px;
      }

      .hero__image {
        height: 300px;
        
      object-fit: contain;
      padding-top:30px;
      position: relative;
      z-index: 3;
    }
      
      
      .hero__mobile-vector {
        width: 171%;
        max-width: none;
        height: 80px;
        bottom: -40px;
        left: -75%;
        transform: translate(20%, 0) rotate(4deg);
      }
    }

    @media (max-width: 350px) {
      .hero__name {
        font-size: 33px;
      }

      .hero__title {
        font-size: 20px;
      }

      .hero__intro-text {
        font-size: 20px;
      }

      .hero__image {
        
      object-fit: contain;
      padding-top:30px;
      position: relative;
      z-index: 3;
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
        font-size: 32px;
      }

      .hero__title {
        font-size: 16px;
        font-size: 20px;
      }

      .hero__intro-text {
        font-size: 16px;
      }
      
      .hero__content {
        justify-content: flex-start;
        padding-top: 40px;
        gap: 0rem;
      }

      .hero__image {
        height: 250px;
      object-fit: contain;
      padding-top:30px;
      position: relative;
      z-index: 3;
    
      }
      
      .hero__cta {
        width: 120px;
        height: 40px;
        font-size: 14px;
      }

      .hero__content {
        padding: 10px;
      }

      .hero__mobile-vector {
        width: 280%;
        max-width: none;
        height: 70px;
        bottom: -30px;
        left: -95%;
        transform: translate(25%, 0) rotate(5deg);
      }
      
      .hero__content {
        justify-content: flex-start;
        padding-top: 60px;
        gap: 0rem;
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