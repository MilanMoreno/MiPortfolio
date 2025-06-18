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
            {{ 'FOOTER.IMPRINT' | translate }}
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
      height: 60px;
      cursor: pointer;
      margin-bottom: 0;
    }

    .footer__imprint {
      color: var(--color-text-primary);
      font-size: 0.9rem;
      margin-top: -10px;
      text-align: left;
      margin-left: 30px;

      &:hover {
        color: var(--color-accent-primary);
      }
    }

    .footer__center {
      color: var(--color-text-primary);
      font-size: 0.9rem;
    }

    .footer__social {
      display: flex;
      gap: 1.5rem;
      z-index: 10;
    }

    .footer__social-link {
      display: inline-block;

      img {
        width: 20px;
        height: 20px;
      }

      &:hover {
        img {
          filter: brightness(0) saturate(100%) invert(76%) sepia(15%) 
                 saturate(4614%) hue-rotate(71deg) brightness(102%) contrast(101%);
        }
      }
    }

    @media (max-width: 768px) {
      .footer {
        padding: 1.5rem 0;
      }
      
      .footer__container {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }

      .footer__left {
        align-items: center;
      }
      
      .footer__imprint {
        text-align: center;
        margin-top: 0.5rem;
        margin-left: 0;
        font-size: 0.8rem;
      }

      .footer__social {
        gap: 1.2rem;
      }
      
      .footer__logo {
        height: 50px;
      }
      
      .footer__center {
        font-size: 0.8rem;
      }
    }
    
    @media (max-width: 480px) {
      .footer {
        padding: 1rem 0;
      }
      
      .footer__container {
        gap: 0.8rem;
      }
      
      .footer__logo {
        height: 40px;
      }
      
      .footer__social-link img {
        width: 18px;
        height: 18px;
      }
      
      .footer__social {
        gap: 1rem;
      }
      
      .footer__center {
        font-size: 0.7rem;
      }
      
      .footer__imprint {
        font-size: 0.7rem;
      }
    }
    
    @media (max-width: 350px) {
      .footer__logo {
        height: 35px;
      }
      
      .footer__social-link img {
        width: 16px;
        height: 16px;
      }
      
      .footer__social {
        gap: 0.8rem;
      }
    }
  `]
})
export class PageFooterComponent {
  constructor(public clipboardService: ClipboardManagerService) {}
}