import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-project-card',
    imports: [CommonModule, TranslateModule],
    template: `
<article class="project-card" [class.project-card--reversed]="isReversed" [class.project-card--mobile]="isMobile">
      <div class="project__image-container">
        <img [src]="image" [alt]="titleKey | translate" class="project__image">
      </div>
      
      <div class="project__content">
        <h3 class="project__title">{{ titleKey | translate }}</h3>
        <p class="project__stack">{{ stackKey | translate }}</p>
        <p class="project__description">{{ descriptionKey | translate }}</p>
        
        <div class="project__actions">
          <a [href]="demoUrl" target="_blank" class="project__button project__button--primary">
            {{ 'PORTFOLIO.LIVE_TEST' | translate }}
          </a>
          <a [href]="repoUrl" target="_blank" class="project__button project__button--secondary">
            {{ 'PORTFOLIO.GITHUB' | translate }}
          </a>
        </div>
      </div>
    </article>
  `,
    styles: [`
    .project-card {
      display: flex;
      align-items: center;
      gap: 35px;
      width: 100%;
      position: relative;
      z-index: 5;
      margin-bottom: 6rem;
      max-width: 1168px; 
      margin-left: auto;
      margin-right: auto;
    }

    .project-card--reversed {
      flex-direction: row-reverse;
    }

    .project__image-container {
      width: 620px;
      height: 339px;
      display: flex; 
      justify-content: center; 
      align-items: center; 
      flex-shrink: 0;
    }

    .project__image {
      max-width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 10;
    }

    .project__content {
      width: 513px;
      height: 339px;
      display: flex; 
      flex-direction: column; 
      justify-content: center; 
      z-index: 10;
      position: relative;
      flex-shrink: 0;
    }

    .project__title {
      font-size: var(--font-size-heading-medium);
      color: var(--color-accent-secondary);
      font-weight: 700;
      margin-bottom: 1rem;
      position: relative;
      z-index: 15;
    }

    .project__stack {
      color: var(--color-accent-primary);
      font-size: 23px;
      margin-bottom: 1rem;
      position: relative;
      z-index: 15;
    }

    .project__description {
      color: var(--color-text-primary);
      font-size: var(--font-size-base);
      margin-bottom: 2rem;
      line-height: 1.6;
      position: relative;
      z-index: 15;
    }

    .project__actions {
      display: flex;
      gap: 1.5rem;
      position: relative;
      z-index: 15;
    }

    .project__button {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 15px 30px;
      border-radius: 10px;
      font-size: 23px;
      transition: all 0.3s ease;
      text-decoration: none;

      &--primary {
        width: 150px;
        background-color: var(--color-accent-secondary);
        color: var(--color-text-primary);

        &:hover {
          background-color: var(--color-accent-primary);
        }
      }

      &--secondary {
        width: 150px;
        border: 1px solid var(--color-accent-primary);
        color: var(--color-text-primary);
        background-color: transparent;

        &:hover {
          background-color: var(--color-accent-primary);
        }
      }
    }

    /* Maintain horizontal layout down to 500px */
    @media (max-width: 1200px) {
      .project-card {
        max-width: 95%;
        gap: 25px;
      }
      
      .project__image-container {
        width: 55%;
        height: auto;
        aspect-ratio: 620/339;
      }
      
      .project__content {
        width: 40%;
        height: auto;
        min-height: 300px;
      }
    }

    @media (max-width: 1000px) {
      .project__title {
        font-size: 28px;
      }
      
      .project__stack {
        font-size: 20px;
      }
      
      .project__description {
        font-size: 16px;
      }
      
      .project__button {
        font-size: 18px;
        padding: 12px 24px;
      }
    }
    
    @media (max-width: 800px) {
      .project-card {
        gap: 20px;
      }
    }
    
    @media (max-width: 700px) {
      .project__title {
        font-size: 24px;
      }
      
      .project__stack {
        font-size: 18px;
      }
      
      .project__description {
        font-size: 14px;
        margin-bottom: 1.5rem;
      }
      
      .project__button {
        font-size: 16px;
        padding: 10px 20px;
      }
    }

    /* Switch to vertical layout only below 500px */
    @media (max-width: 650px) {
      .project-card, 
      .project-card--reversed {
        flex-direction: column;
        align-items: center;
        gap: 15px;
        text-align: center;
        margin-bottom: 4rem;
      }

      .project__image-container {
        width: 100%;
        max-width: 450px;
        height: auto;
        aspect-ratio: 620/339;
      }

      .project__content {
        width: 100%;
        max-width: 450px;
        height: auto;
        min-height: 220px;
      }

      .project__actions {
        justify-content: center;
      }
      
      .project__description {
        margin-bottom: 1rem;
      }
    }
    
    @media (max-width: 400px) {
      .project__content {
        min-height: 200px;
      }
      
      .project__button {
        padding: 10px 15px;
        font-size: 16px;
      }
    }
    
    @media (max-width: 350px) {
      .project__title {
        font-size: 20px;
      }
      
      .project__stack {
        font-size: 16px;
      }
      
      .project__description {
        font-size: 14px;
        line-height: 1.4;
      }
      
      .project__button {
        width: 120px;
        padding: 8px 12px;
        font-size: 14px;
      }
    }
  `]
})
export class ProjectCardComponent {
  @Input() image!: string;
  @Input() titleKey!: string;
  @Input() stackKey!: string;
  @Input() descriptionKey!: string;
  @Input() demoUrl!: string;
  @Input() repoUrl!: string;
  @Input() isReversed = false;
  
  get isMobile(): boolean {
    return window.innerWidth <= 650;
  }
}