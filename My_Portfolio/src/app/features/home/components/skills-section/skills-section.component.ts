import { Component, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ViewportObserverService } from '../../../../shared/services/viewport/viewport.service';
import { fadeInLeft, fadeInUp } from '../../../../shared/animations/fade.animations';

interface Skill {
  name: string;
  icon: string;
}

@Component({
    selector: 'app-skills-section',
    imports: [CommonModule, TranslateModule],
    template: `
    <section class="skills" id="skills">
      <div class="skills__container">
        <div class="skills__mobile-cta">
          <a href="#portfolio" class="skills__mobile-button">
            {{ "SKILLS.GET_IN_TOUCH" | translate }}
          </a>
        </div>

        <div class="skills__grid" [@fadeInLeft]="isVisible ? 'visible' : 'void'">
          <div class="skills__item" *ngFor="let skill of skillsList">
            <img [src]="skill.icon" [alt]="skill.name">
            <span>{{ skill.name }}</span>
          </div>
        </div>

        <div class="skills__content">
          <div class="skills__header">
            <h2 class="skills__title" [@fadeInUp]="isVisible ? 'visible' : 'void'">
              {{ "SKILLS.MY_SKILLS" | translate }}
            </h2>
            <div class="skills__line"></div>
          </div>

          <p class="skills__description">
            {{ "SKILLS.DESCRIPTION" | translate }}
          </p>

          <div class="skills__cta">
            <a href="#portfolio" class="skills__button">
              {{ "SKILLS.GET_IN_TOUCH" | translate }}
            </a>
          </div>
        </div>
      </div>

      <img src="assets/img/green-shadow.png" alt="" class="skills__shadow">
    </section>
  `,
    styles: [`
    .skills {
      position: relative;
      display: flex;
      justify-content: center;
      width: 100%;
      min-height: 100vh;
      background-color: var(--color-background-primary);
    }

    .skills__container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 1920px;
      padding: 0 10%;
    }

    .skills__grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
      max-width: 600px;
      z-index: 51;
    }

    .skills__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;

      img {
        width: 50px;
        height: 50px;
        transition: transform 0.3s ease;

        &:hover {
          animation: skillBounce 1s linear;
        }
      }

      span {
        color: var(--color-text-primary);
        font-size: var(--font-size-base);
        font-weight: 700;
      }
    }

    @keyframes skillBounce {
      20%, 50%, 80%, to {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-30px);
      }
      70% {
        transform: translateY(-15px);
      }
      90% {
        transform: translateY(-4px);
      }
    }

    .skills__content {
      max-width: 500px;
    }

    .skills__header {
      display: flex;
      align-items: center;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .skills__title {
      font-size: 90px;
      color: var(--color-text-primary);
      margin: 0;
    }

    .skills__line {
      display: none;
      height: 4px;
      width: 10vw;
      background-color: var(--color-accent-secondary);
    }

    .skills__description {
      font-size: var(--font-size-base);
      color: var(--color-text-primary);
      margin-bottom: 2rem;
      text-align: right;
    }

    .skills__cta {
      display: flex;
      justify-content: flex-end;
    }

    .skills__button {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 150px;
      height: 45px;
      background-color: var(--color-accent-primary);
      color: var(--color-text-primary);
      border-radius: 10px;
      font-size: 18px;
      transition: all 0.3s ease;

      &:hover {
        background-color: var(--color-accent-secondary);
        transform: scale(1.05);
      }
    }

    .skills__mobile-cta {
      display: none;
    }

    .skills__shadow {
      position: absolute;
      left: 0;
      top: 30%;
      z-index: 50;
      opacity: 0.3;
      max-width: 30%;
    }

    @media (max-width: 1200px) {
      .skills__container {
        padding: 0 5%;
      }

      .skills__grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (max-width: 1200px) and (min-width: 600px) {
      .skills__shadow {
        opacity: 0.2;
        max-width: 20%;
        left: 0;
        bottom: 10%;
      }
    }

    @media (max-width: 600px) {
      .skills__shadow {
        opacity: 0.1;
        max-width: 15%;
        left: 0;
        bottom: 5%;
      }
    }

    @media (max-width: 890px) {
      .skills__container {
        flex-direction: column-reverse;
        gap: 4rem;
        padding: 4rem 2rem;
      }

      .skills__content {
        text-align: center;
        max-width: 100%;
      }

      .skills__header {
        justify-content: center;
      }

      .skills__description {
        text-align: center;
      }

      .skills__cta {
        justify-content: center;
      }

      .skills__grid {
        grid-template-columns: repeat(4, 1fr);
        max-width: 100%;
      }
    }

    @media (max-width: 580px) {
      .skills__title {
        font-size: 32px;
      }

      .skills__grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .skills__line {
        display: block;
      }

      .skills__cta {
        display: none;
      }

      .skills__mobile-cta {
        display: block;
        margin-bottom: 2rem;
      }

      .skills__mobile-button {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 120px;
        height: 40px;
        background-color: var(--color-accent-primary);
        color: var(--color-text-primary);
        border-radius: 10px;
        font-size: 14px;
        transition: all 0.3s ease;

        &:hover {
          background-color: var(--color-accent-secondary);
          transform: scale(1.05);
        }
      }
    }

    @media (max-width: 480px) {
      .skills__title {
        font-size: 28px;
      }
      
      .skills__item {
        padding: 15px;
        
        img {
          width: 40px;
          height: 40px;
        }
        
        span {
          font-size: 12px;
        }
      }
      
      .skills__mobile-button {
        width: 100px;
        height: 35px;
        font-size: 12px;
      }
    }
    
    @media (max-width: 350px) {
      .skills__title {
        font-size: 24px;
      }
      
      .skills__item {
        padding: 10px;
        
        img {
          width: 30px;
          height: 30px;
        }
        
        span {
          font-size: 10px;
        }
      }
      
      .skills__mobile-button {
        width: 90px;
        height: 30px;
        font-size: 11px;
      }
    }
  `],
    animations: [fadeInLeft, fadeInUp]
})
export class SkillsSectionComponent implements OnInit {
  isVisible = false;

  skillsList: Skill[] = [
    { name: 'Angular', icon: 'assets/img/skills/Angular.png' },
    { name: 'TypeScript', icon: 'assets/img/skills/typescript.png' },
    { name: 'JavaScript', icon: 'assets/img/skills/Javascript.png' },
    { name: 'HTML', icon: 'assets/img/skills/html.png' },
    { name: 'Firebase', icon: 'assets/img/skills/firebase.png' },
    { name: 'Git', icon: 'assets/img/skills/git.png' },
    { name: 'CSS', icon: 'assets/img/skills/css.png' },
    { name: 'API', icon: 'assets/img/skills/Api.png' },
    { name: 'SCRUM', icon: 'assets/img/skills/scrum.png' },
    { name: 'Material', icon: 'assets/img/skills/material.png' }
  ];

  constructor(
    private elementRef: ElementRef,
    private viewportObserver: ViewportObserverService
  ) {}

  ngOnInit(): void {
    this.viewportObserver
      .observeElement(this.elementRef.nativeElement)
      .subscribe(visible => this.isVisible = visible);
  }
}