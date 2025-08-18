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
      max-width: var(--max-content-width);
      margin: 0 auto;
      padding: 0 var(--content-padding-desktop);
      box-sizing: border-box;
    }

    @media (max-width: 1024px) {
      .nav__container {
        padding: 0 var(--content-padding-tablet);
      }
    }

    @media (max-width: 768px) {
      .nav__container {
        padding: 0 var(--content-padding-mobile);
      }
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
     
    @media (max-width: 910px) {
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
        
        // Calculate responsive offset based on screen size and device type
        let offset = this.calculateScrollOffset(sectionId);
        
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
            let offset = this.calculateScrollOffset(sectionId);
            
            const targetPosition = absoluteElementTop - offset;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
          }
        }, 300);
      });
    }
    this.closeMobileMenu();
  }

  private calculateScrollOffset(sectionId: string): number {
    const headerHeight = 109; // var(--header-height)
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const isLandscape = screenWidth > screenHeight;
    
    if (sectionId === 'about') {
      // About section - responsive offset calculation with landscape optimization
      
      // LANDSCAPE DEVICES - Special handling for horizontal orientation
      if (isLandscape && screenHeight <= 500) {
        // Samsung Galaxy Note 883x412 (Landscape)
        if (screenWidth >= 880 && screenWidth <= 890 && screenHeight >= 410 && screenHeight <= 415) {
          return headerHeight + 200; // Extra offset for Galaxy Note landscape
        }
        // iPhone 12/13/14 896x414 (Landscape)
        else if (screenWidth >= 890 && screenWidth <= 900 && screenHeight >= 410 && screenHeight <= 420) {
          return headerHeight + 180;
        }
        // iPhone 14 Pro Max 932x430 (Landscape)
        else if (screenWidth >= 930 && screenWidth <= 935 && screenHeight >= 425 && screenHeight <= 435) {
          return headerHeight + 190;
        }
        // iPhone SE 667x375 (Landscape)
        else if (screenWidth >= 665 && screenWidth <= 670 && screenHeight >= 370 && screenHeight <= 380) {
          return headerHeight + 160;
        }
        // iPad Mini 1024x768 (Landscape)
        else if (screenWidth >= 1020 && screenWidth <= 1030 && screenHeight >= 765 && screenHeight <= 775) {
          return headerHeight + 220;
        }
        // iPad 1180x820 (Landscape)
        else if (screenWidth >= 1175 && screenWidth <= 1185 && screenHeight >= 815 && screenHeight <= 825) {
          return headerHeight + 240;
        }
        // iPad Pro 1366x1024 (Landscape)
        else if (screenWidth >= 1360 && screenWidth <= 1370 && screenHeight >= 1020 && screenHeight <= 1030) {
          return headerHeight + 260;
        }
        // Generic small landscape devices
        else if (screenHeight <= 450) {
          return headerHeight + 170;
        }
        // Generic medium landscape devices
        else {
          return headerHeight + 150;
        }
      }
      
      // Desktop (large screens)
      else if (screenWidth >= 1920) {
        return headerHeight + 50;
      } else if (screenWidth >= 1440) {
        return headerHeight + 30;
      } else if (screenWidth >= 1200) {
        return headerHeight + 20;
      } else if (screenWidth >= 992) {
        return headerHeight + 10;
      }
      
      // Tablet range
      else if (screenWidth >= 768) {
        return headerHeight + 40; // Portrait tablets
      }
      
      // Mobile devices - specific device handling
      else {
        // iPhone 12/13/14 Pro Max (428x926 portrait)
        if (screenWidth <= 428 && screenHeight >= 900) {
          return headerHeight + 60;
        }
        // iPhone 12/13/14 (390x844 portrait)
        else if (screenWidth <= 390 && screenHeight >= 800) {
          return headerHeight + 50;
        }
        // iPhone SE (375x667 portrait)
        else if (screenWidth <= 375 && screenHeight >= 650) {
          return headerHeight + 40;
        }
        // Samsung Galaxy S20/S21 (360x800 portrait)
        else if (screenWidth <= 360 && screenHeight >= 750) {
          return headerHeight + 45;
        }
        // Samsung Galaxy Note (412x883 portrait)
        else if (screenWidth <= 412 && screenHeight >= 850) {
          return headerHeight + 55;
        }
        // iPad Mini (768x1024 portrait)
        else if (screenWidth <= 768 && screenHeight >= 1000) {
          return headerHeight + 70;
        }
        // iPad (820x1180 portrait)
        else if (screenWidth <= 820 && screenHeight >= 1100) {
          return headerHeight + 80;
        }
        // iPad Pro (1024x1366 portrait)
        else if (screenWidth <= 1024 && screenHeight >= 1300) {
          return headerHeight + 90;
        }
        // Default mobile
        else {
          return headerHeight + 30;
        }
      }
    }
    
    else if (sectionId === 'skills') {
      // Skills section offset with landscape optimization
      if (isLandscape && screenHeight <= 500) {
        return headerHeight + 200; // Extra offset for landscape skills
      }
      if (screenWidth >= 1920) {
        return headerHeight + 150;
      } else if (screenWidth >= 1200) {
        return headerHeight + 130;
      } else if (screenWidth >= 768) {
        return headerHeight + 100;
      } else {
        return headerHeight + 80;
      }
    }
    
    else if (sectionId === 'portfolio') {
      // Portfolio section offset with landscape optimization
      if (isLandscape && screenHeight <= 500) {
        return headerHeight + 180; // Extra offset for landscape portfolio
      }
      if (screenWidth >= 1200) {
        return headerHeight + 100;
      } else if (screenWidth >= 768) {
        return headerHeight + 80;
      } else {
        return headerHeight + 60;
      }
    }
    
    else if (sectionId === 'contact') {
      // Contact section offset with landscape optimization
      if (isLandscape && screenHeight <= 500) {
        return headerHeight + 160; // Extra offset for landscape contact
      }
      if (screenWidth >= 1200) {
        return headerHeight + 120;
      } else if (screenWidth >= 768) {
        return headerHeight + 100;
      } else {
        return headerHeight + 80;
      }
    }
    
    // Default fallback
    return headerHeight + 50;
  }
}