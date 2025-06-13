import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from './project-card/project-card.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-portfolio-section',
    imports: [CommonModule, TranslateModule, ProjectCardComponent],
    template: `
    <section class="portfolio" id="portfolio">
      <div class="portfolio__container">
        <header class="portfolio__header">
          <div class="portfolio__title-wrapper">
            <div class="portfolio__line portfolio__line--left"></div>
            <h2 class="portfolio__title">
              {{ "PORTFOLIO.HEADLINE" | translate }}
            </h2>
            <div class="portfolio__line-container">
              <div class="portfolio__line portfolio__line--right"></div>
            </div>
          </div>
          
          <p class="portfolio__intro">
            {{ "PORTFOLIO.INTRODUCTION" | translate }}
          </p>
        </header>

        <div class="portfolio__projects">
          <app-project-card
            *ngFor="let project of projects; let i = index"
            [image]="project.image"
            [titleKey]="project.titleKey"
            [stackKey]="project.stackKey"
            [descriptionKey]="project.descriptionKey"
            [demoUrl]="project.demoUrl"
            [repoUrl]="project.repoUrl"
            [isReversed]="i % 2 === 1">
          </app-project-card>
        </div>
      </div>

      <img 
        class="portfolio__shadow portfolio__shadow--purple" 
        src="assets/img/shadow-purple-big.png" 
        alt=""
        style="z-index: 1;">
      <img 
        class="portfolio__shadow portfolio__shadow--green" 
        src="assets/img/shadow-green-big.png" 
        alt=""
        style="z-index: 1;">
    </section>
  `,
    styles: [`
    .portfolio {
      position: relative;
      display: flex;
      justify-content: center;
      padding: 4rem 0;
    }

    .portfolio__container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      position: relative;
      z-index: 2;
    }

    .portfolio__title-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .portfolio__line {
      height: 2px;
      background-color: var(--color-accent-secondary);
    }

    .portfolio__line--left {
      width: 200px;
    }

    .portfolio__line-container {
      position: relative;
      width: 200px;
    }

    .portfolio__line--right {
      position: absolute;
      left: 0;
      width: 99999px;
    }

    .portfolio__title {
      font-size: var(--font-size-heading-large);
      color: var(--color-text-primary);
      margin: 0;
    }

    .portfolio__intro {
      text-align: center;
      color: var(--color-text-primary);
      margin-bottom: 4rem;
    }

    .portfolio__projects {
      display: flex;
      flex-direction: column;
      gap: 6rem;
      position: relative;
      z-index: 3;
    }

    .portfolio__shadow {
      position: absolute;
      z-index: 1;

      &--purple {
        left: 0;
        top: 20%;
      }

      &--green {
        right: 0;
        top: 50%;
      }
    }

    /* Project Card Styles - Horizontales Layout */
    ::ng-deep .project-card {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 3rem;
      background: transparent;
      border: none;
      box-shadow: none;
      padding: 2rem 0;
      position: relative;
      z-index: 3;
      max-width: 1200px;
      margin: 0 auto;
    }

    /* Alternierendes Layout - gerade Projekte: Bild links, ungerade: Bild rechts */
    ::ng-deep .project-card.reversed {
      flex-direction: row-reverse;
    }

    /* Bild Container - 620x339 Pixel maximale Größe */
    ::ng-deep .project-card__image-container {
      flex: 0 0 auto;
      max-width: 620px;
      width: 100%;
    }

    ::ng-deep .project-card__image,
    ::ng-deep .project-card img {
      width: 100%;
      max-width: 620px;
      height: auto;
      aspect-ratio: 620/339;
      object-fit: cover;
      border-radius: 12px;
      border: 2px solid var(--color-accent-primary, #00d4ff);
      box-shadow: 0 4px 20px rgba(0, 212, 255, 0.2);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    ::ng-deep .project-card__image:hover,
    ::ng-deep .project-card img:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 30px rgba(0, 212, 255, 0.3);
    }

    /* Text Content Container */
    ::ng-deep .project-card__content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 2rem;
      background: rgba(22, 33, 62, 0.8);
      border-radius: 12px;
      border: 2px solid var(--color-accent-primary, #00d4ff);
      backdrop-filter: blur(10px);
      min-height: 339px;
      box-shadow: 0 4px 20px rgba(0, 212, 255, 0.15);
    }

    ::ng-deep .project-card__title {
      color: var(--color-accent-primary, #00d4ff);
      font-size: var(--font-size-heading-medium, 2rem);
      margin-bottom: 1rem;
      font-weight: 700;
    }

    ::ng-deep .project-card__tech-stack {
      color: var(--color-accent-secondary, #4ade80);
      font-size: var(--font-size-small, 1rem);
      margin-bottom: 1.5rem;
      font-weight: 600;
    }

    ::ng-deep .project-card__description {
      color: var(--color-text-secondary, #b8b8b8);
      font-size: var(--font-size-body, 1rem);
      line-height: 1.6;
      margin-bottom: 2rem;
      flex-grow: 1;
    }

    ::ng-deep .project-card__buttons {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
      align-items: center;
    }

    /* Primary Button (Live Test) - 137x58 Pixel - GLEICHE GRÖSSE WIE GITHUB */
    ::ng-deep .project-card__button--primary,
    ::ng-deep .project-card__demo-button,
    ::ng-deep .btn-primary,
    ::ng-deep a[href*="developerakademie"] {
      width: 137px;
      height: 58px;
      background: linear-gradient(135deg, #9333ea, #7c3aed);
      color: white !important;
      text-decoration: none;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 14px;
      transition: all 0.3s ease;
      border: none;
      cursor: pointer;
      text-align: center;
    }

    ::ng-deep .project-card__button--primary:hover,
    ::ng-deep .project-card__demo-button:hover,
    ::ng-deep .btn-primary:hover,
    ::ng-deep a[href*="developerakademie"]:hover {
      background: linear-gradient(135deg, #7c3aed, #6366f1);
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(147, 51, 234, 0.4);
    }

    /* Secondary Button (GitHub) - 137x58 Pixel - GLEICHE GRÖSSE WIE LIVE TEST */
    ::ng-deep .project-card__button--secondary,
    ::ng-deep .project-card__repo-button,
    ::ng-deep .btn-secondary,
    ::ng-deep a[href*="github"] {
      width: 137px;
      height: 58px;
      background: transparent;
      color: var(--color-accent-primary, #00d4ff) !important;
      text-decoration: none;
      border: 1px solid var(--color-accent-primary, #00d4ff);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      font-size: 14px;
      transition: all 0.3s ease;
      cursor: pointer;
      text-align: center;
    }

    ::ng-deep .project-card__button--secondary:hover,
    ::ng-deep .project-card__repo-button:hover,
    ::ng-deep .btn-secondary:hover,
    ::ng-deep a[href*="github"]:hover {
      background: var(--color-accent-primary, #00d4ff);
      color: var(--color-background-primary, #1a1a2e) !important;
      box-shadow: 0 2px 10px rgba(0, 212, 255, 0.3);
    }

    /* Responsive für Bildschirme unter 1290px - HORIZONTAL beibehalten */
    @media (max-width: 1290px) {
      .portfolio__container {
        max-width: 1100px;
      }

      .portfolio__shadow--purple {
        width: 391.32px;
        height: 415.93px;
        top: 80px;
        left: 481.52px;
        transform: rotate(-46.66deg);
      }

      ::ng-deep .project-card {
        gap: 2rem;
        max-width: 1100px;
      }

      ::ng-deep .project-card__image-container {
        max-width: 450px;
        flex: 0 0 450px;
      }

      ::ng-deep .project-card__content {
        min-height: 280px;
        padding: 1.5rem;
      }

      ::ng-deep .project-card__title {
        font-size: 1.8rem;
      }

      ::ng-deep .project-card__description {
        font-size: 0.9rem;
      }
    }

    @media (max-width: 1100px) {
      .portfolio__container {
        max-width: 950px;
      }

      .portfolio__shadow--purple {
        width: 350px;
        height: 370px;
        top: 30px;
        left: 420px;
        transform: rotate(-46.66deg);
      }

      ::ng-deep .project-card {
        gap: 1.5rem;
        max-width: 950px;
      }

      ::ng-deep .project-card__image-container {
        max-width: 400px;
        flex: 0 0 400px;
      }

      ::ng-deep .project-card__content {
        min-height: 250px;
        padding: 1.2rem;
      }

      ::ng-deep .project-card__title {
        font-size: 1.6rem;
        margin-bottom: 0.8rem;
      }

      ::ng-deep .project-card__tech-stack {
        font-size: 0.9rem;
        margin-bottom: 1rem;
      }

      ::ng-deep .project-card__description {
        font-size: 0.85rem;
        margin-bottom: 1.5rem;
      }
    }

    @media (max-width: 950px) {
      .portfolio__container {
        max-width: 800px;
      }

      .portfolio__shadow--purple {
        width: 300px;
        height: 320px;
        top: 20px;
        left: 350px;
        transform: rotate(-46.66deg);
      }

      ::ng-deep .project-card {
        gap: 1rem;
        max-width: 800px;
      }

      ::ng-deep .project-card__image-container {
        max-width: 350px;
        flex: 0 0 350px;
      }

      ::ng-deep .project-card__content {
        min-height: 220px;
        padding: 1rem;
      }

      ::ng-deep .project-card__title {
        font-size: 1.4rem;
        margin-bottom: 0.6rem;
      }

      ::ng-deep .project-card__tech-stack {
        font-size: 0.8rem;
        margin-bottom: 0.8rem;
      }

      ::ng-deep .project-card__description {
        font-size: 0.8rem;
        margin-bottom: 1.2rem;
        line-height: 1.4;
      }
    }

    @media (max-width: 800px) {
      .portfolio__container {
        max-width: 700px;
      }

      .portfolio__shadow--purple {
        width: 250px;
        height: 270px;
        top: 10px;
        left: 280px;
        transform: rotate(-46.66deg);
      }

      ::ng-deep .project-card {
        gap: 0.8rem;
        max-width: 700px;
      }

      ::ng-deep .project-card__image-container {
        max-width: 300px;
        flex: 0 0 300px;
      }

      ::ng-deep .project-card__content {
        min-height: 190px;
        padding: 0.8rem;
      }

      ::ng-deep .project-card__title {
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
      }

      ::ng-deep .project-card__tech-stack {
        font-size: 0.75rem;
        margin-bottom: 0.6rem;
      }

      ::ng-deep .project-card__description {
        font-size: 0.75rem;
        margin-bottom: 1rem;
        line-height: 1.3;
      }

      /* Buttons etwas kleiner für bessere Proportionen - ABER GLEICH GROSS */
      ::ng-deep .project-card__button--primary,
      ::ng-deep .project-card__demo-button,
      ::ng-deep .btn-primary,
      ::ng-deep a[href*="developerakademie"] {
        width: 110px;
        height: 40px;
        font-size: 12px;
      }
      
      ::ng-deep .project-card__button--secondary,
      ::ng-deep .project-card__repo-button,
      ::ng-deep .btn-secondary,
      ::ng-deep a[href*="github"] {
        width: 110px;
        height: 40px;
        font-size: 12px;
      }
    }

    @media (max-width: 700px) {
      .portfolio__container {
        max-width: 600px;
      }

      .portfolio__shadow--purple {
        width: 200px;
        height: 220px;
        top: 5px;
        left: 220px;
        transform: rotate(-46.66deg);
      }

      ::ng-deep .project-card {
        gap: 0.6rem;
        max-width: 600px;
      }

      ::ng-deep .project-card__image-container {
        max-width: 250px;
        flex: 0 0 250px;
      }

      ::ng-deep .project-card__content {
        min-height: 160px;
        padding: 0.6rem;
      }

      ::ng-deep .project-card__title {
        font-size: 1.1rem;
        margin-bottom: 0.4rem;
      }

      ::ng-deep .project-card__tech-stack {
        font-size: 0.7rem;
        margin-bottom: 0.5rem;
      }

      ::ng-deep .project-card__description {
        font-size: 0.7rem;
        margin-bottom: 0.8rem;
        line-height: 1.2;
      }

      ::ng-deep .project-card__button--primary,
      ::ng-deep .project-card__demo-button,
      ::ng-deep .btn-primary,
      ::ng-deep a[href*="developerakademie"] {
        width: 95px;
        height: 32px;
        font-size: 11px;
      }
      
      ::ng-deep .project-card__button--secondary,
      ::ng-deep .project-card__repo-button,
      ::ng-deep .btn-secondary,
      ::ng-deep a[href*="github"] {
        width: 95px;
        height: 32px;
        font-size: 11px;
      }
    }

    /* AB HIER: Mobile Layout (Vertikal gestapelt) - NUR für Handygröße */
    @media (max-width: 600px) {
      .portfolio__title {
        font-size: 45px;
        margin: 0 10px;
      }

      .portfolio__intro {
        max-width: 80vw;
      }

      .portfolio__shadow--purple {
        width: 150px;
        height: 170px;
        top: 0px;
        left: 150px;
        transform: rotate(-46.66deg);
      }

      /* JETZT wird es vertikal - Haupt-Container: 390x552 Pixel */
      ::ng-deep .project-card {
        flex-direction: column !important;
        width: 390px;
        height: 552px;
        padding: 1rem;
        gap: 1rem;
        margin: 0 auto;
        background: rgba(22, 33, 62, 0.9);
        border-radius: 12px;
        border: 2px solid var(--color-accent-primary, #00d4ff);
        box-shadow: 0 4px 20px rgba(0, 212, 255, 0.2);
      }

      ::ng-deep .project-card.reversed {
        flex-direction: column !important;
      }

      /* Bild bleibt proportional im Container */
      ::ng-deep .project-card__image-container {
        width: 100%;
        max-width: 370px;
        margin: 0 auto;
        flex: none;
      }

      ::ng-deep .project-card__image,
      ::ng-deep .project-card img {
        width: 100%;
        height: auto;
        aspect-ratio: 620/339;
        max-height: 200px;
        object-fit: cover;
      }

      /* Text + Buttons Container: 340x305 Pixel */
      ::ng-deep .project-card__content {
        width: 340px;
        height: 305px;
        padding: 1rem;
        margin: 0 auto;
        background: rgba(22, 33, 62, 0.95);
        border-radius: 8px;
        border: 1px solid var(--color-accent-primary, #00d4ff);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 305px;
      }

      ::ng-deep .project-card__title {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
      }

      ::ng-deep .project-card__tech-stack {
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
      }

      ::ng-deep .project-card__description {
        font-size: 0.85rem;
        line-height: 1.4;
        margin-bottom: 1rem;
        flex-grow: 1;
        overflow: hidden;
      }

      /* Button Container: 375x80 Pixel (angepasst für gleich große Buttons) */
      ::ng-deep .project-card__buttons {
        width: 375px;
        height: 80px;
        display: flex;
        gap: 15px;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        padding: 0.5rem;
      }

      /* Mobile Buttons: BEIDE 137x58 Pixel - GLEICHE GRÖSSE */
      ::ng-deep .project-card__button--primary,
      ::ng-deep .project-card__demo-button,
      ::ng-deep .btn-primary,
      ::ng-deep a[href*="developerakademie"] {
        width: 137px;
        height: 58px;
        font-size: 14px;
      }
      
      ::ng-deep .project-card__button--secondary,
      ::ng-deep .project-card__repo-button,
      ::ng-deep .btn-secondary,
      ::ng-deep a[href*="github"] {
        width: 137px;
        height: 58px;
        font-size: 14px;
      }
    }

    @media (max-width: 480px) {
      /* Für sehr kleine Bildschirme Container etwas kleiner */
      ::ng-deep .project-card {
        width: 350px;
        height: 520px;
      }

      ::ng-deep .project-card__content {
        width: 320px;
        height: 285px;
      }

      ::ng-deep .project-card__buttons {
        width: 320px;
        height: 65px;
      }

      /* Buttons behalten GLEICHE GRÖSSE */
      ::ng-deep .project-card__button--primary,
      ::ng-deep .project-card__demo-button,
      ::ng-deep .btn-primary,
      ::ng-deep a[href*="developerakademie"] {
        width: 137px;
        height: 58px;
      }
      
      ::ng-deep .project-card__button--secondary,
      ::ng-deep .project-card__repo-button,
      ::ng-deep .btn-secondary,
      ::ng-deep a[href*="github"] {
        width: 137px;
        height: 58px;
      }
    }

    @media (max-width: 340px) {
      .portfolio__shadow {
        &--purple {
          top: 30%;
          height: 350px;
          width: 300px;
        }

        &--green {
          right: 0;
          top: auto;
          bottom: -200px;
          height: 500px;
        }
      }
    }
  `]
})
export class PortfolioSectionComponent {
  projects = [
    {
      image: 'assets/img/join-project.png',
      titleKey: 'PORTFOLIO.PROJECTS.0.HEADLINE',
      stackKey: 'PORTFOLIO.PROJECTS.0.TECH_STACK',
      descriptionKey: 'PORTFOLIO.PROJECTS.0.DESCRIPTION',
      demoUrl: 'https://milan-moreno.developerakademie.net/Join/index.html',
      repoUrl: 'https://github.com/MilanMoreno/Join/'
    },
    {
      image: 'assets/img/Polloloco1.png',
      titleKey: 'PORTFOLIO.PROJECTS.1.HEADLINE',
      stackKey: 'PORTFOLIO.PROJECTS.1.TECH_STACK',
      descriptionKey: 'PORTFOLIO.PROJECTS.1.DESCRIPTION',
      demoUrl: 'https://milan-moreno.developerakademie.net/PolloLoco_/index.html',
      repoUrl: 'https://github.com/MilanMoreno/PolloLoco'
    },
    {
      image: 'assets/img/quiz-app-project.png',
      titleKey: 'PORTFOLIO.PROJECTS.3.HEADLINE',
      stackKey: 'PORTFOLIO.PROJECTS.3.TECH_STACK',
      descriptionKey: 'PORTFOLIO.PROJECTS.3.DESCRIPTION',
      demoUrl: 'https://milan-moreno.developerakademie.net/easyQuizzApp/index.html',
      repoUrl: 'https://github.com/MilanMoreno/easyQuizzApp'
    }
  ];
}