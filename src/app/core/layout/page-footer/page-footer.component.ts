import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ClipboardManagerService } from '../../../shared/services/clipboard/clipboard.service';

@Component({
  selector: 'app-page-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  template: `
    <footer class="footer">
      <div class="footer__container">
        <div class="footer__brand">
          <img 
            src="assets/img/logo.png" 
            alt="Logo" 
            class="footer__logo"
            routerLink="/">
          <a routerLink="/legal/imprint" class="footer__legal-link">
            {{ 'FOOTER.IMPRINT' | translate }}
          </a>
        </div>

        <div class="footer__copyright">
          &copy; Milan Moreno
        </div>

        <div class="footer__social">
          <a 
            href="https://github.com/MilanMoreno" 
            target="_blank" 
            class="footer__social-link">
            <img src="assets/img/github.png" alt="GitHub">
          </a>
          <button 
            class="footer__social-link"
            (click)="copyEmail()">
            <img src="assets/img/email.png" alt="Email">
          </button>
          <a 
            href="https://www.linkedin.com/in/thomas-mustermann-a4072a25b/"
            target="_blank" 
            class="footer__social-link">
            <img src="assets/img/linkedin.png" alt="LinkedIn">
          </a>
        </div>

        <a 
          routerLink="/legal/imprint" 
          class="footer__mobile-legal">
          {{ 'FOOTER.IMPRINT' | translate }}
        </a>
      </div>

      <div 
        class="footer__notification"
        [class.footer__notification--visible]="(clipboardService.copyStatus$ | async)">
        {{ 'FOOTER.EMAIL_COPIED' | translate }}
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      position: relative;
      height: var(--footer-height);
      background-color: var(--color-background-primary);
      border-top: 2px solid var(--color-accent-primary);
      z-index: 55;
    }

    .footer__container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      padding: 0 100px;
      max-width: 1920px;
      margin: 0 auto;
    }

    .footer__brand {
      display: flex;
      flex-direction: column;
    }

    .footer__logo {
      width: 420px;
      margin: 0;
      cursor: pointer;
    }

    .footer__legal-link {
      width: 50%;
      text-align: left;
      color: var(--color-text-primary);
      margin-top: -25px;

      &:hover {
        color: var(--color-accent-primary);
      }
    }

    .footer__copyright {
      color: var(--color-text-primary);
      font-size: 23px;
    }

    .footer__social {
      display: flex;
      align-items: center;
      gap: 13px;
      z-index: 66;
    }

    .footer__social-link {
      background: none;
      border: none;
      padding: 0;
      
      img {
        transition: filter 0.3s ease;

        &:hover {
          filter: brightness(0) saturate(100%) invert(76%) sepia(15%) 
                 saturate(4614%) hue-rotate(71deg) brightness(102%) contrast(101%);
        }
      }
    }

    .footer__mobile-legal {
      display: none;
      color: var(--color-text-primary);
      margin-bottom: 5px;

      &:hover {
        color: var(--color-accent-primary);
      }
    }

    .footer__notification {
      position: fixed;
      bottom: -3000px;
      left: 50%;
      border-radius: 10px;
      background-color: rgba(0, 0, 0, 0.3);
      padding: 10px;
      color: var(--color-text-primary);
      transform: translateX(-50%);
      transition: all 0.2s ease-in-out;
      z-index: 999;

      &--visible {
        bottom: 50px;
      }
    }

    @media (max-width: 875px) {
      .footer__container {
        flex-direction: column;
        padding: 20px;
      }

      .footer__copyright {
        text-align: center;
        margin-bottom: 10px;
      }

      .footer__social {
        margin-bottom: 10px;
      }

      .footer__brand {
        img {
          max-width: 70vw;
        }

        .footer__legal-link {
          display: none;
        }
      }

      .footer__mobile-legal {
        display: block;
      }
    }
  `]
})
export class PageFooterComponent {
  constructor(public clipboardService: ClipboardManagerService) {}

  copyEmail(): void {
    this.clipboardService.copyToClipboard('milan.moreno20@gmail.com');
  }
}