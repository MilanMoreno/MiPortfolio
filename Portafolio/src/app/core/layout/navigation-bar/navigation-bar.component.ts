import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../shared/services/language/language.service';

@Component({
    selector: 'app-navigation-bar',
    imports: [CommonModule, RouterModule, TranslateModule],
    template: `
    <nav class="nav">
      <div class="nav__container">
        <a class="nav__logo" [routerLink]="['/']">
          <img src="assets/img/logo.png" alt="Logo" class="nav__logo-img">
        </a>

        <!-- Desktop Menu -->
        <div class="nav__menu">
          <ul class="nav__list">
            <li *ngFor="let item of menuItems">
              <a class="nav__link" (click)="scrollToSection(item.fragment, $event)">
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

      <!-- Mobile Menu -->
      <div class="nav__mobile-menu" [class.nav__mobile-menu--open]="isMobileMenuOpen">
        <div class="nav__mobile-content">
          <ul class="nav__mobile-list">
            <li *ngFor="let item of menuItems">
              <a class="nav__mobile-link" (click)="scrollToSection(item.fragment, $event); closeMobileMenu()">
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
      height: 90px;
      background-color: var(--color-background-primary);
      z-index: 100;
    }

    .nav__container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      padding: 0 1rem;
      max-width: 1920px;
      margin: 0 auto;
    }

    .nav__logo {
      height: 60px;
      display: flex;
      align-items: center;
      text-decoration: none;
    }

    .nav__logo-img {
      height: 100%;
      width: auto;
    }

    .nav__list {
      display: flex;
      gap: 2rem;
      list-style: none;
    }

    .nav__link {
      color: var(--color-text-primary);
      font-size: 18px;
      text-transform: uppercase;
      position: relative;
      text-decoration: none;
      cursor: pointer;

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
      text-decoration: none;
      cursor: pointer;
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

    @media (max-width: 768px) {
      .nav {
        height: 70px;
      }
      
      .nav__logo {
        height: 50px;
      }
      
      .nav__menu,
      .nav__language {
        display: none;
      }

      .nav__mobile-toggle {
        display: block;
      }
      
      .nav__mobile-link {
        font-size: 20px;
      }
      
      .nav__mobile-lang-btn {
        padding: 0.4rem 0.8rem;
        
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
    
    @media (max-width: 480px) {
      .nav {
        height: 60px;
      }
      
      .nav__logo {
        height: 40px;
      }
      
      .nav__mobile-link {
        font-size: 18px;
      }
      
      .nav__mobile-lang-btn {
        padding: 0.3rem 0.6rem;
        font-size: 12px;
        
        img {
          width: 16px;
          height: 16px;
        }
      }
    }
    
    @media (max-width: 350px) {
      .nav {
        height: 50px;
      }
      
      .nav__logo {
        height: 35px;
      }
      
      .nav__mobile-link {
        font-size: 16px;
      }
    }
  `]
})
export class NavigationBarComponent {
  isMobileMenuOpen = false;

  menuItems = [
    { fragment: 'about', label: 'HEADER.ABOUT_ME' },
    { fragment: 'skills', label: 'HEADER.SKILLS' },
    { fragment: 'portfolio', label: 'HEADER.PORTFOLIO' }
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
    private languageService: LanguageService
  ) {
    translateService.addLangs(['fr', 'tr', 'en', 'es', 'de']);
  }

  /**
   * Smoothly scrolls to a section by ID
   * @param sectionId - The ID of the target section
   * @param event - The click event
   */
  scrollToSection(sectionId: string, event: Event): void {
    event.preventDefault(); // Prevent default behavior
    
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate offset for fixed header
      const headerHeight = this.getHeaderHeight();
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Get current header height based on screen size
   */
  private getHeaderHeight(): number {
    const width = window.innerWidth;
    if (width <= 350) return 50;
    if (width <= 480) return 60;
    if (width <= 768) return 70;
    return 90;
  }

  switchLanguage(lang: string): void {
    this.languageService.setLanguage(lang);
    this.closeMobileMenu();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
}