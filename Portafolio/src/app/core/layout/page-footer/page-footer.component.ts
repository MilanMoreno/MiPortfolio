import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ClipboardManagerService } from '../../../shared/services/clipboard/clipboard.service';

@Component({
    selector: 'app-page-footer',
    imports: [CommonModule, RouterModule, TranslateModule],
    template: `
    <footer class="footer">  
      <div class="footer__container">
        <div class="footer__left">
          <img 
            src="assets/img/logo.png" 
            alt="Logo" 
            class="footer__logo"
            routerLink="/">
          <a routerLink="/legal/imprint" class="footer__imprint">
            Imprint
          </a>
        </div>

        <div class="footer__center">
          © Milan Moreno 2025
        </div>

        <div class="footer__social">
          <a 
            href="https://github.com/MilanMoreno" 
            target="_blank" 
            class="footer__social-link">
            <img src="assets/img/github.png" alt="GitHub">
          </a>
          <a 
            href="mailto:milan.moreno.crea@gmail.com"
            class="footer__social-link">
            <img src="assets/img/email.png" alt="Email">
          </a>
          <a 
            href="https://www.linkedin.com/in/milan-moreno-9a7482360/"
            target="_blank" 
            class="footer__social-link">
            <img src="assets/img/linkedin.png" alt="LinkedIn">
          </a>
        </div>
      </div>
    </footer>
  `,
    styles: [`
    .footer {
      width: 100%;
      background-color: var(--color-background-primary); 
      padding: 2rem 0;
      border-top: 2px solid var(--color-accent-primary);
    }

    .footer__container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .footer__left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .footer__logo {
      height: 80px;
      cursor: pointer;
      margin-bottom: 0;
    }

    .footer__imprint {
      color: var(--color-text-primary);
      font-size: 1rem;
      margin-top: -10px;
      text-align: left;
      margin-left: 30px;

      &:hover {
        color: var(--color-accent-primary);
      }
    }

    .footer__center {
      color: var(--color-text-primary);
      font-size: 1rem;
    }

    .footer__social {
      display: flex;
      gap: 1.5rem;
      z-index: 10;
    }

    .footer__social-link {
      display: inline-block;

      img {
        width: 24px;
        height: 24px;
      }

      &:hover {
        img {
          filter: brightness(0) saturate(100%) invert(76%) sepia(15%) 
                 saturate(4614%) hue-rotate(71deg) brightness(102%) contrast(101%);
        }
      }
    }

    @media (max-width: 768px) {
      .footer__container {
        flex-direction: column;
        gap: 1.5rem;
        text-align: center;
      }

      .footer__left {
        align-items: center;
      }
      
      .footer__imprint {
        text-align: center;
        margin-top: 0.5rem;
      }

      .footer__social {
        gap: 1.5rem;
      }
    }
  `]
})
export class PageFooterComponent {
  constructor(public clipboardService: ClipboardManagerService) {}
}