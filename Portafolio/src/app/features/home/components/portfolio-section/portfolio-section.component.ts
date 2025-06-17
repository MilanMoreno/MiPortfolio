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
    styleUrls: ['./portfolio-section.component.scss'],
    standalone: true
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