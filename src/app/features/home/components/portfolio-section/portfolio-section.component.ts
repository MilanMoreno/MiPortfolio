import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectCardComponent } from './project-card/project-card.component';

interface ProjectData {
  image: string;
  titleKey: string;
  stackKey: string;
  descriptionKey: string;
  demoUrl: string;
  repoUrl: string;
}

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
            <div class="portfolio__line portfolio__line--right"></div>
          </div>
          
          <p class="portfolio__intro">
            {{ "PORTFOLIO.INTRODUCTION" | translate }}
          </p>
        </header>

        <div class="portfolio__projects">
          <app-project-card
            *ngFor="let project of projects"
            [image]="project.image"
            [titleKey]="project.titleKey"
            [stackKey]="project.stackKey"
            [descriptionKey]="project.descriptionKey"
            [demoUrl]="project.demoUrl"
            [repoUrl]="project.repoUrl">
          </app-project-card>
        </div>
      </div>

      <img 
        class="portfolio__shadow portfolio__shadow--purple" 
        src="assets/img/shadow-purple-big.png" 
        alt="">
      <img 
        class="portfolio__shadow portfolio__shadow--green" 
        src="assets/img/shadow-green-big.png" 
        alt="">
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
      flex: 1;
      max-width: 200px;
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
    }

    .portfolio__shadow {
      position: absolute;
      z-index: 40;

      &--purple {
        left: 0;
        top: 20%;
      }

      &--green {
        right: 0;
        top: 50%;
        z-index: 51;
      }
    }

    @media (max-width: 1275px) {
      .portfolio__shadow--purple {
        left: 0;
        top: 25%;
        height: 750px;
        width: 400px;
      }
    }

    @media (max-width: 790px) {
      .portfolio__shadow--purple {
        top: 30%;
        height: 650px;
      }
    }

    @media (max-width: 580px) {
      .portfolio__title {
        font-size: 45px;
        margin: 0 10px;
      }

      .portfolio__intro {
        max-width: 80vw;
      }

      .portfolio__shadow--purple {
        top: 25%;
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
  projects: ProjectData[] = [
    {
      image: 'assets/img/join-project.png',
      titleKey: 'PORTFOLIO.PROJECTS.0.HEADLINE',
      stackKey: 'PORTFOLIO.PROJECTS.0.TECH_STACK',
      descriptionKey: 'PORTFOLIO.PROJECTS.0.DESCRIPTION',
      demoUrl: 'https://milan-moreno.developerakademie.net/JOIN%20Projekt%20Okt-Nov%202024/index.html',
      repoUrl: 'https://github.com/MilanMoreno/Portfolio'
    },
    {
      image: 'assets/img/Polloloco1.png',
      titleKey: 'PORTFOLIO.PROJECTS.1.HEADLINE',
      stackKey: 'PORTFOLIO.PROJECTS.1.TECH_STACK',
      descriptionKey: 'PORTFOLIO.PROJECTS.1.DESCRIPTION',
      demoUrl: 'https://milan-moreno.developerakademie.net/PolloLoco_/index.html',
      repoUrl: 'https://github.com/MilanMoreno/Portfolio'
    },
    {
      image: 'assets/img/pokedex-project.png',
      titleKey: 'PORTFOLIO.PROJECTS.2.HEADLINE',
      stackKey: 'PORTFOLIO.PROJECTS.2.TECH_STACK',
      descriptionKey: 'PORTFOLIO.PROJECTS.2.DESCRIPTION',
      demoUrl: 'https://milan-moreno.developerakademie.net/pokedex/index.html',
      repoUrl: 'https://github.com/MilanMoreno/Pokedex'
    },
    {
      image: 'assets/img/quiz-app-project.png',
      titleKey: 'PORTFOLIO.PROJECTS.3.HEADLINE',
      stackKey: 'PORTFOLIO.PROJECTS.3.TECH_STACK',
      descriptionKey: 'PORTFOLIO.PROJECTS.3.DESCRIPTION',
      demoUrl: 'https://milan-moreno.developerakademie.net/quizApp/index.html',
      repoUrl: 'https://github.com/MilanMoreno/Quizapp'
    }
  ];
}