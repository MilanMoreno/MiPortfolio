import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../shared/services/language/language.service';

@Component({
    selector: 'app-navigation-bar',
    standalone: true,
    imports: [CommonModule, RouterModule, TranslateModule],
    template: `
    <nav class="nav">
      <div class="nav__container">
        <a class="nav__logo" (click)="navigateToHome()">
          <img src="assets/img/logo.png" alt="Logo" class="nav__logo-img">
        </a>

        <div class="nav__right-section">
          <!-- Desktop Menu -->
          <div class="nav__menu">
            <ul class="nav__list">
              <li *ngFor="let item of menuItems">
                <a (click)="navigateToSection(item.href)" class="nav__link">
                  {{ item.label | translate }} 
                </a>
              </li>
            </ul>
          </div>

          <!-- Desktop Language Selector -->
          <div class="nav__language">
            <button 
              class="nav__lang-btn" 
              *ngFor="let lang of languages"
              (click)="switchLanguage(lang.code)">
              <img [src]="lang.flag" [alt]="lang.name">
            </button>
          </div>

          <!-- Mobile Menu Toggle -->
          <button 
            class="nav__mobile-toggle" 
            [class.nav__mobile-toggle--active]="isMobileMenuOpen"
            (click)="toggleMobileMenu()">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div class="nav__mobile-menu" [class.nav__mobile-menu--open]="isMobileMenuOpen">
        <div class="nav__mobile-content">
          <ul class="nav__mobile-list">
            <li *ngFor="let item of menuItems">
              <a (click)="navigateToSection(item.href)" class="nav__mobile-link">
                {{ item.label | translate }}
              </a>
            </li>
          </ul>
          
          <!-- Mobile Language Selector -->
          <div class="nav__mobile-language">
            <button 
              class="nav__mobile-lang-btn" 
              *ngFor="let lang of languages"
              (click)="switchLanguage(lang.code)">
              <img [src]="lang.flag" [alt]="lang.name">
              <span>{{ lang.name }}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  `,
    styles: [`
    .nav {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: var(--header-height);
      background-color: var(--color-background-primary);
      z-index: 100;
    }

  .nav__container {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: none;                 /* Deckel weg */
  margin: 0;                       /* nicht zentrieren */
  padding: 0 clamp(16px, 5vw, 72px); /* Seitenabstand variabel */
}


    .nav__logo {
      flex-shrink: 0;
      height: 80px;
      display: flex;
      align-items: center;
    }

    .nav__logo-img {
      height: 100%;
      width: auto;
    }

    .nav__right-section {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .nav__list {
      display: flex;
      gap: 2rem;
      list-style: none;
    }

    .nav__link {
      color: var(--color-text-primary);
      font-size: var(--font-size-heading-small);
      text-transform: uppercase;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 0;
        height: 2px;
        background-color: var(--color-accent-primary);
        transition: width 0.3s ease;
      }

      &:hover::after {
        width: 100%;
      }
    }

    .nav__language {
      display: flex;
      gap: 0.5rem;
    }

    .nav__lang-btn {
      width: 20px;
      height: 20px;
      padding: 0;
      border: none;
      background: none;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .nav__lang-btn {
      width: 40px;
      height: 40px;
      padding: 8px;
      border: none;
      background: none;
      cursor: pointer;
      border-radius: 50%;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: rgba(112, 230, 28, 0.1);
      }

      img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        pointer-events: none;
      }
    }

    .nav__mobile-toggle {
      display: none;
      width: 30px;
      height: 24px;
      position: relative;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;

      span {
        display: block;
        width: 100%;
        height: 2px;
        background-color: var(--color-text-primary);
        position: absolute;
        left: 0;
        transition: all 0.3s ease;

        &:first-child {
          top: 0;
        }

        &:nth-child(2) {
          top: 50%;
          transform: translateY(-50%);
        }

        &:last-child {
          bottom: 0;
        }
      }

      &--active {
        span {
          &:first-child {
            transform: rotate(45deg);
            top: 50%;
          }

          &:nth-child(2) {
            opacity: 0;
          }

          &:last-child {
            transform: rotate(-45deg);
            bottom: 50%;
          }
        }
      }
    }

    .nav__mobile-menu {
      position: fixed;
      top: var(--header-height);
      left: 0;
      width: 100%;
      height: calc(100vh - var(--header-height));
      background-color: var(--color-background-primary);
      transform: translateX(100%);
      transition: transform 0.3s ease;
      z-index: 99;

      &--open {
        transform: translateX(0);
      }
    }

    .nav__mobile-content {
      padding: 2rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .nav__mobile-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .nav__mobile-link {
      color: var(--color-text-primary);
      font-size: var(--font-size-heading-small);
      text-transform: uppercase;
    }

    .nav__mobile-language {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .nav__mobile-lang-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: none;
      border: 1px solid var(--color-accent-primary);
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      color: var(--color-text-primary);
      cursor: pointer;

      img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
      }

      &:hover {
        background-color: var(--color-accent-primary);
      }
    }

    .nav__mobile-lang-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: none;
      border: 2px solid var(--color-accent-primary);
      padding: 12px 16px;
      border-radius: 8px;
      color: var(--color-text-primary);
      cursor: pointer;
      transition: all 0.2s ease;
      min-width: 120px;
      justify-content: center;

      &:hover {
        background-color: var(--color-accent-primary);
        transform: scale(1.02);
      }

      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        pointer-events: none;
      }

      span {
        font-size: 16px;
        font-weight: 500;
        pointer-events: none;
      }
    }
     
    @media (max-width: 923px) {
      .nav__menu,
      .nav__language {
        display: none;
      }
 
      .nav__mobile-toggle {
        display: block;
      }
    }

   @media (max-width: 350px) {
.nav__logo-img {
      height: 75%;
      width: auto;
    }}

  `]
})
export class NavigationBarComponent {
  isMobileMenuOpen = false;

  menuItems = [
    { href: 'about', label: 'HEADER.ABOUT_ME' },
    { href: 'skills', label: 'HEADER.SKILLS' },
    { href: 'portfolio', label: 'HEADER.PORTFOLIO' }
  ];

  languages = [
    { code: 'fr', name: 'Français', flag: 'assets/img/france.png' },
    { code: 'tr', name: 'Türkçe', flag: 'assets/img/turkey.png' },
    { code: 'de', name: 'Deutsch', flag: 'assets/img/de.png' },
    { code: 'en', name: 'English', flag: 'assets/img/en.png' },
    { code: 'es', name: 'Español', flag: 'assets/img/sp.png' }
  ];

  constructor(
    private translateService: TranslateService,
    private languageService: LanguageService,
    private router: Router
  ) {
    // Add languages - this is okay here or could be moved to app init
    translateService.addLangs(['fr', 'tr', 'en', 'es', 'de']);
    // Removed setDefaultLang - AppComponent handles initialization
  }

  navigateToHome(): void {
    this.router.navigate(['/']).then(() => {
      // Scroll to top smoothly when navigating to home
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 0);
    });
    this.closeMobileMenu();
  }

  switchLanguage(lang: string): void {
    this.languageService.setLanguage(lang); // Use LanguageService to set and save
    this.closeMobileMenu();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  navigateToSection(sectionId: string): void {
    // Check if we're on the home page
    if (this.router.url === '/') {
      // We're on home page, scroll directly to section without page refresh
      let element = document.getElementById(sectionId);
      
      // Fallback: if element not found by ID, try to find by selector
      if (!element) {
        if (sectionId === 'about') {
          // Try multiple selectors to find the about section
          element = document.querySelector('app-about-section') as HTMLElement ||
                   document.querySelector('#about-section') as HTMLElement ||
                   document.querySelector('.about') as HTMLElement ||
                   document.querySelector('app-about') as HTMLElement;
        } else if (sectionId === 'skills') {
          element = document.querySelector('app-skills-section') as HTMLElement ||
                   document.querySelector('#skills-section') as HTMLElement ||
                   document.querySelector('.skills') as HTMLElement ||
                   document.querySelector('app-skills') as HTMLElement;
        } else if (sectionId === 'portfolio') {
          element = document.querySelector('app-portfolio-section') as HTMLElement ||
                   document.querySelector('#portfolio-section') as HTMLElement ||
                   document.querySelector('.portfolio') as HTMLElement ||
                   document.querySelector('app-portfolio') as HTMLElement;
        } else if (sectionId === 'contact') {
          element = document.querySelector('app-contact-section') as HTMLElement ||
                   document.querySelector('#contact-section') as HTMLElement ||
                   document.querySelector('.contact') as HTMLElement ||
                   document.querySelector('app-contact') as HTMLElement;
        }
      }
      
      if (element) {
        console.log('Found element for section:', sectionId, element);
        
        // Get element position
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        
        // Calculate responsive offset based on screen size
        let offset = 120; // Base offset
        
        if (sectionId === 'about') {
          // About section needs special offset to show the title properly
          if (window.innerWidth >= 2560) {
            offset = 200;
          } else if (window.innerWidth >= 1920) {
            offset = 180;
          } else if (window.innerWidth >= 1440) {
            offset = 160;
          } else if (window.innerWidth >= 1200) {
            offset = 140;
          } else if (window.innerWidth >= 992) {
            offset = 120;
          } else if (window.innerWidth >= 768) {
            offset = 100;
          } else {
            offset = 80;
          }
        } else if (sectionId === 'skills') {
          // Skills section offset
          if (window.innerWidth >= 1920) {
            offset = 150;
          } else if (window.innerWidth >= 1200) {
            offset = 130;
          } else {
            offset = 110;
          }
        }
        
        const targetPosition = absoluteElementTop - offset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    } else {
      // We're on a different page, navigate to home using Angular Router then scroll
      this.router.navigate(['/']).then(() => {
        // Wait a bit for the component to load, then scroll
        setTimeout(() => {
          let element = document.getElementById(sectionId);
          
          // Fallback: if element not found by ID, try to find by selector
          if (!element) {
            if (sectionId === 'about') {
              element = document.querySelector('app-about-section') as HTMLElement ||
                       document.querySelector('#about-section') as HTMLElement ||
                       document.querySelector('.about') as HTMLElement ||
                       document.querySelector('app-about') as HTMLElement;
            } else if (sectionId === 'skills') {
              element = document.querySelector('app-skills-section') as HTMLElement ||
                       document.querySelector('#skills-section') as HTMLElement ||
                       document.querySelector('.skills') as HTMLElement ||
                       document.querySelector('app-skills') as HTMLElement;
            } else if (sectionId === 'portfolio') {
              element = document.querySelector('app-portfolio-section') as HTMLElement ||
                       document.querySelector('#portfolio-section') as HTMLElement ||
                       document.querySelector('.portfolio') as HTMLElement ||
                       document.querySelector('app-portfolio') as HTMLElement;
            } else if (sectionId === 'contact') {
              element = document.querySelector('app-contact-section') as HTMLElement ||
                       document.querySelector('#contact-section') as HTMLElement ||
                       document.querySelector('.contact') as HTMLElement ||
                       document.querySelector('app-contact') as HTMLElement;
            }
          }
          
          if (element) {
            console.log('Found element after navigation for section:', sectionId, element);
            
            const elementRect = element.getBoundingClientRect();
            const absoluteElementTop = elementRect.top + window.pageYOffset;
            let offset = 120;
            
            if (sectionId === 'about') {
              if (window.innerWidth >= 2560) {
                offset = 200;
              } else if (window.innerWidth >= 1920) {
                offset = 180;
              } else if (window.innerWidth >= 1440) {
                offset = 160;
              } else if (window.innerWidth >= 1200) {
                offset = 140;
              } else if (window.innerWidth >= 992) {
                offset = 120;
              } else if (window.innerWidth >= 768) {
                offset = 100;
              } else {
                offset = 80;
              }
            } else if (sectionId === 'skills') {
              if (window.innerWidth >= 1920) {
                offset = 150;
              } else if (window.innerWidth >= 1200) {
                offset = 130;
              } else {
                offset = 110;
              }
            }
            
            const targetPosition = absoluteElementTop - offset;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
          }
        }, 300);
      });
    }
    this.closeMobileMenu();
  }
}