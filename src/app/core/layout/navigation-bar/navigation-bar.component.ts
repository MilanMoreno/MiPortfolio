import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-navigation-bar',
    imports: [CommonModule, RouterModule, TranslateModule],
    template: `
    <nav class="nav">
      <div class="nav__container">
        <a class="nav__logo" href="#top">
          <img src="assets/img/logo.png" alt="Logo" class="nav__logo-img">
        </a>

        <div class="nav__menu">
          <ul class="nav__list">
            <li *ngFor="let item of menuItems">
              <a [href]="item.href" class="nav__link">
                {{ item.label | translate }}
              </a>
            </li>
          </ul>
        </div>

        <div class="nav__language">
          <button 
            class="nav__lang-btn" 
            *ngFor="let lang of languages"
            (click)="switchLanguage(lang.code)">
            <img [src]="lang.flag" [alt]="lang.name">
          </button>
        </div>

        <button 
          class="nav__mobile-toggle" 
          [class.nav__mobile-toggle--active]="isMobileMenuOpen"
          (click)="toggleMobileMenu()">
          <span></span>
          <span></span>
          <span></span>
        </button>
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
      height: 100%;
      padding: 0 2rem;
      max-width: 1920px;
      margin: 0 auto;
    }

    .nav__logo {
      height: 80px;
      display: flex;
      align-items: center;
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

    .nav__mobile-toggle {
      display: none;
    }

    @media (max-width: 768px) {
      .nav__menu,
      .nav__language {
        display: none;
      }

      .nav__mobile-toggle {
        display: block;
      }
    }
  `]
})
export class NavigationBarComponent {
  isMobileMenuOpen = false;

  menuItems = [
    { href: '#about', label: 'HEADER.ABOUT_ME' },
    { href: '#skills', label: 'HEADER.SKILLS' },
    { href: '#portfolio', label: 'HEADER.PORTFOLIO' }
  ];

  languages = [
    { code: 'fr', name: 'Français', flag: 'assets/img/france.png' },
    { code: 'tr', name: 'Türkçe', flag: 'assets/img/turkey.png' },
    { code: 'de', name: 'Deutsch', flag: 'assets/img/de.png' },
    { code: 'en', name: 'English', flag: 'assets/img/en.png' },
    { code: 'es', name: 'Español', flag: 'assets/img/sp.png' }
  ];

  constructor(private translateService: TranslateService) {
    translateService.addLangs(['fr', 'tr', 'en', 'es']);
    translateService.setDefaultLang('en');
  }

  switchLanguage(lang: string): void {
    this.translateService.use(lang);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}




