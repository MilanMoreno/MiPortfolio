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
    { code: 'tr', name: 'Türkçe',  flag: 'assets/img/turkey.png' },
    { code: 'de', name: 'Deutsch', flag: 'assets/img/de.png' },
    { code: 'en', name: 'English', flag: 'assets/img/en.png' },
    { code: 'es', name: 'Español', flag: 'assets/img/sp.png' }
  ];

  constructor(
    private translateService: TranslateService,
    private languageService: LanguageService,
    private router: Router
  ) {
    this.translateService.addLangs(['fr', 'tr', 'en', 'es', 'de']);
  }

  navigateToHome(): void {
    this.router.navigate(['/']).then(() => {
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
    });
    this.closeMobileMenu();
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

  /** 1) Neu: Scrollt immer exakt auf die Überschrift (Heading) der Section */
  navigateToSection(sectionId: string): void {
    const doScroll = () => {
      const el = this.getScrollTarget(sectionId);
      if (!el) return;

      // 2× rAF: messen nach Orientation-/Layout-Änderung
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const offset = this.getStickyOffset();
          const y = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        });
      });
    };

    if (this.router.url === '/') {
      this.closeMobileMenu();
      doScroll();
    } else {
      this.router.navigate(['/']).then(() => {
        this.closeMobileMenu();
        setTimeout(doScroll, 50); // lässt Home+About rendern
      });
    }
  }

  /** 2) Neu: Ziel-Element priorisiert die Überschrift innerhalb der Section */
  private getScrollTarget(sectionId: string): HTMLElement | null {
    if (sectionId === 'about') {
      return (document.querySelector('#about .about__heading') as HTMLElement)
          || document.getElementById('about');
    }
    if (sectionId === 'skills') {
      return (document.querySelector('#skills .skills__heading') as HTMLElement)
          || document.getElementById('skills');
    }
    if (sectionId === 'portfolio') {
      return (document.querySelector('#portfolio .portfolio__heading') as HTMLElement)
          || document.getElementById('portfolio');
    }
    if (sectionId === 'contact') {
      return (document.querySelector('#contact .contact__heading') as HTMLElement)
          || document.getElementById('contact');
    }
    return document.getElementById(sectionId);
  }

  /** 3) Neu: Offset wird live aus Header + Spacer gemessen (pixelgenau) */
  private getStickyOffset(): number {
    const header = document.querySelector('.nav') as HTMLElement;
    const spacer = document.querySelector('.section-spacer') as HTMLElement;
    const headerH = header ? header.getBoundingClientRect().height : 0;
    const spacerH = spacer ? parseFloat(getComputedStyle(spacer).height || '0') : 0;

    // optional nutzbar per CSS: scroll-margin-top: var(--scroll-offset)
    document.documentElement.style.setProperty('--scroll-offset', `${headerH + spacerH}px`);
    return headerH + spacerH;
  }
}
