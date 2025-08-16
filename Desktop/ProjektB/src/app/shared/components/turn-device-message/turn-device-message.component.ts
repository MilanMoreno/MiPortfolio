import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-turn-device-message',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="turn-device-overlay">
      <div class="turn-device-content">
        <div class="turn-device-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
            <path d="M7 13l3-3 3 3"/>
          </svg>
        </div>
        <h2 class="turn-device-title">Turn Your Device</h2>
        <p class="turn-device-subtitle">Please rotate your device to portrait mode for the best experience</p>
      </div>
    </div>
  `,
  styles: [`
    .turn-device-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: var(--color-background-primary);
      display: none;
      justify-content: center;
      align-items: center;
      z-index: 99999;
      backdrop-filter: blur(10px);
    }

    .turn-device-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 2rem;
      max-width: 400px;
    }

    .turn-device-icon {
      color: var(--color-accent-primary);
      margin-bottom: 1.5rem;
      animation: rotateDevice 2s ease-in-out infinite;
    }

    @keyframes rotateDevice {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(-15deg); }
      75% { transform: rotate(15deg); }
    }

    .turn-device-title {
      font-size: 2rem;
      color: var(--color-text-primary);
      margin: 0 0 1rem 0;
      font-weight: 700;
    }

    .turn-device-subtitle {
      font-size: 1.125rem;
      color: var(--color-text-primary);
      margin: 0;
      opacity: 0.8;
      line-height: 1.5;
    }

    /* Samsung Galaxy specific detection - 914x412 in landscape */
    @media screen and (width: 914px) and (height: 412px) and (orientation: landscape) {
      .turn-device-overlay {
        display: flex !important;
      }
    }

    /* Additional Samsung Galaxy variants that might have similar dimensions */
    @media screen and (min-width: 910px) and (max-width: 920px) and (min-height: 408px) and (max-height: 416px) and (orientation: landscape) {
      .turn-device-overlay {
        display: flex !important;
      }
    }

    /* Specific Samsung Galaxy S20/S21 landscape detection */
    @media screen and (device-width: 914px) and (device-height: 412px) and (orientation: landscape) {
      .turn-device-overlay {
        display: flex !important;
      }
    }

    /* iPhone 14 Pro Max landscape detection - 932x430 */
    @media screen and (width: 932px) and (height: 430px) and (orientation: landscape) {
      .turn-device-overlay {
        display: flex !important;
      }
    }

    /* Additional iPhone 14 Pro Max variants with slight dimension differences */
    @media screen and (min-width: 930px) and (max-width: 935px) and (min-height: 428px) and (max-height: 432px) and (orientation: landscape) {
      .turn-device-overlay {
        display: flex !important;
      }
    }

    /* Device-specific iPhone 14 Pro Max detection */
    @media screen and (device-width: 932px) and (device-height: 430px) and (orientation: landscape) {
      .turn-device-overlay {
        display: flex !important;
      }
    }
  `]
})
export class TurnDeviceMessageComponent {}