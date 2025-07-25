import { Component, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ViewportObserverService } from '../../../../shared/services/viewport/viewport.service';
import { fadeInLeft, fadeInUp } from '../../../../shared/animations/fade.animations';

@Component({
    selector: 'app-about-section',
    imports: [CommonModule, TranslateModule],
    template: `
    <section class="about" id="about">
      <div class="about__container">
        <div class="about__content">
          <div class="about__text">
            <h2 class="about__heading" [@fadeInUp]="isVisible ? 'visible' : 'void'">
              {{ 'ABOUT.HEADLINE' | translate }}
            </h2>
            
            <div class="about__description">
              <p class="about__intro" [@fadeInLeft]="isVisible ? 'visible' : 'void'">
                {{ 'ABOUT.INTRO' | translate }}
              </p>

              <div class="about__detail">
                <div class="about__icon" [@fadeInLeft]="isVisible ? 'visible' : 'void'">
                  <svg width="50" height="50" fill="none">
                    <path d="M36.7476 28.6258C35.0072 31.0127 33.1577 33.5494 32.1138 36.4902H17.891C16.8418 33.5144 14.9559 30.9404 13.1844 28.5226L13.1541 28.4812L13.1534 28.4803C12.6429 27.7852 12.1412 27.102 11.6599 26.4109L11.6589 26.4094C9.83384 23.799 8.76431 20.6191 8.76431 17.1875C8.76431 8.25023 16.0308 1 25 1C33.9688 1 41.2357 8.24986 41.2357 17.1973C41.2357 20.628 40.1666 23.7989 38.3402 26.4206L38.34 26.4207C37.8588 27.1118 37.3571 27.795 36.8466 28.4901L36.8445 28.493C36.8122 28.5372 36.78 28.5814 36.7476 28.6258ZM31.8344 42.1875C31.8344 45.949 28.7788 49 25 49C21.2211 49 18.1656 45.949 18.1656 42.1875V41.625H31.8344V42.1875ZM15.5987 19.75C17.0101 19.75 18.1656 18.6018 18.1656 17.1875C18.1656 13.426 21.2211 10.375 25 10.375C26.4114 10.375 27.5669 9.2268 27.5669 7.8125C27.5669 6.3982 26.4114 5.25 25 5.25C18.3885 5.25 13.0318 10.5877 13.0318 17.1875C13.0318 18.6018 14.1873 19.75 15.5987 19.75Z"
                      stroke="var(--color-accent-primary)"
                      stroke-width="2"/>
                  </svg>
                </div>
                <p class="about__text-block" [@fadeInUp]="isVisible ? 'visible' : 'void'">
                  {{ 'ABOUT.TEXT1' | translate }}
                </p>
              </div>

              <div class="about__detail">
                <div class="about__icon" [@fadeInLeft]="isVisible ? 'visible' : 'void'">
                  <svg width="50" height="50" fill="none">
                    <path d="M20.6587 1.99601C23.5529 2.09581 25.8483 4.49102 25.8483 7.38523V8.88224V10.8782H27.8443H34.9301H35.0299C35.5289 10.8782 36.0279 10.978 36.5269 11.1776C36.9261 11.3772 37.3253 11.5768 37.7245 11.8762L37.9241 12.0759C38.3233 12.4751 38.6227 12.8743 38.8223 13.3733C39.022 13.8723 39.1217 14.3713 39.1217 14.9701V22.0559V24.0519H41.1178H42.6148C45.6088 24.0519 48.004 26.3473 48.004 29.2415C48.004 32.2355 45.6088 34.6307 42.7146 34.6307H41.1178H39.1217V36.6267V43.7126C39.1217 46.008 37.3253 47.9042 35.0299 47.9042H27.0459V44.8104C27.0459 44.1118 26.9461 43.3134 26.6467 42.6148C26.3473 41.9162 25.9481 41.3174 25.4491 40.8184C24.2515 39.6208 22.5549 38.9222 20.7585 38.9222H20.6587C19.2615 38.9222 17.9641 39.3214 16.8663 40.1198H16.7665L16.1677 40.6188C14.8703 41.7166 14.2715 43.2136 14.2715 44.8104V47.8044H6.38722C5.38922 47.8044 4.39122 47.4052 3.59281 46.7066L3.39321 46.507C2.59481 45.7086 2.19561 44.6108 2.19561 43.513V35.6287H5.28942C6.78643 35.6287 8.28343 35.0299 9.48104 33.8323C10.0798 33.2335 10.5788 32.4351 10.8782 31.6367C11.1776 30.8383 11.3772 29.9401 11.3772 29.0419C11.2774 25.6487 8.48303 22.7545 5.18962 22.7545H1.99601V14.7705C1.99601 14.1717 2.09581 13.6727 2.29541 13.1737C2.49501 12.6747 2.79441 12.2754 3.19361 11.8762C3.99202 11.0778 4.99002 10.6786 6.18762 10.6786H13.2734H15.2695V8.68264V7.28543C15.2695 6.58683 15.3693 5.88823 15.6687 5.18962L15.7685 5.08983C16.0679 4.49102 16.4671 3.99202 16.8663 3.49301C17.3653 2.99401 17.9641 2.59481 18.5629 2.39521C19.1617 2.09581 19.8603 1.99601 20.6587 1.99601ZM20.5589 0C19.6607 0 18.6627 0.199601 17.7645 0.499002C16.8663 0.898203 16.0679 1.39721 15.3693 2.09581C14.6707 2.79442 14.1717 3.59281 13.7725 4.49102C13.3733 5.38922 13.1737 6.38723 13.1737 7.28543V8.88224H6.08782C4.49102 8.88224 2.89421 9.48104 1.79641 10.5788C1.1976 11.1776 0.798403 11.7765 0.399202 12.5749C0.199601 13.3733 0 14.1717 0 14.9701V24.9501H4.99002C7.28543 24.9501 9.18164 26.9461 9.28144 29.3413C9.28144 29.9401 9.18163 30.5389 8.88223 31.1377C8.68263 31.7365 8.28343 32.2355 7.88423 32.6347C7.08583 33.4331 6.08782 33.8323 5.08982 33.8323H0V43.7126C0 45.3094 0.698603 46.9062 1.79641 48.1038C2.99401 49.3014 4.49102 49.9002 6.18762 49.9002H16.0679V44.9102C16.0679 43.6128 16.7665 42.7146 17.3653 42.2156C18.2635 41.4172 19.3613 41.018 20.5589 41.018C20.5589 41.018 20.5589 41.018 20.6587 41.018C21.9561 41.018 23.1537 41.517 23.9521 42.3154C24.2515 42.6148 24.5509 43.014 24.7505 43.513C24.9501 43.9122 25.0499 44.4112 25.0499 44.9102V50H35.0299C38.4231 50 41.1178 47.2056 41.1178 43.8124V36.7265H42.7146C46.7066 36.7265 50 33.4331 50 29.3413C50 25.3493 46.7066 22.1557 42.6148 22.1557H41.1178V15.0699C41.1178 14.2715 41.018 13.4731 40.6188 12.6747C40.3194 11.8763 39.8204 11.2774 39.3214 10.6786C38.7225 10.0798 38.1237 9.68064 37.3253 9.38124C36.6267 9.08184 35.8283 8.98203 35.0299 8.98203C35.0299 8.98203 35.0299 8.98203 34.9301 8.98203H27.8443V7.48503C27.8443 3.39321 24.6507 0.0998004 20.5589 0C20.6587 0 20.6587 0 20.5589 0Z"
                      fill="var(--color-accent-primary)"/>
                  </svg>
                </div>
                <p class="about__text-block" [@fadeInUp]="isVisible ? 'visible' : 'void'">
                  {{ 'ABOUT.TEXT2' | translate }}
                </p>
              </div>
            </div>
          </div>

          <div class="about__image-wrapper" [@fadeInLeft]="isVisible ? 'visible' : 'void'">
            <div class="about__image-container">
              <img src="assets/img/me.jpeg" alt="Profile" class="about__image">
            </div>
            <div class="about__image-line"></div>
          </div>
        </div>
      </div>

      <img src="assets/img/shadow-purple.png" alt="" class="about__shadow">
    </section>
  `,
    styles: [`
    .about {
      position: relative;
      display: flex;
      justify-content: center;
      width: 100%;
      background-color: rgb(25, 35, 55);
    }

    .about__container {
      display: flex;
      justify-content: center;
      width: 100%;
      max-width: 1920px;
    }

    .about__content {
      display: flex;
      justify-content: space-between;
      position: relative;
      min-height: 100vh;
      z-index: 4;
      width: 100%;
      margin-left: 15%;
      padding-right: 15%;
    }

    .about__text {
      width: 471px;
      margin-right: 10%;
      z-index: 90;
    }

    .about__heading {
      font-size: var(--font-size-heading-large);
      color: var(--color-text-primary);
      margin-bottom: 2rem;
    }

    .about__description {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .about__intro {
      font-size: var(--font-size-base);
      color: var(--color-text-primary);
    }

    .about__detail {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
    }

    .about__icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100px;
    }

    .about__text-block {
      width: 359px;
      font-size: var(--font-size-base);
      color: var(--color-text-primary);
      z-index: 50;
    }

    .about__image-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      margin-top: 200px;
      margin-left: -100px;
    }

    .about__image-container {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      border: 5px solid var(--color-accent-primary);
      overflow: hidden;
      min-width: 500px;
      width: 500px;
      height: 500px;
      z-index: 30;
    }

    .about__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
 
    .about__image-line {
      position: absolute;
      right: -9999px;
      width: 9999px;
      height: 4px;
      background-color: var(--color-accent-primary);
      z-index: 30;
    }

    .about__shadow {
      position: absolute;
      z-index: 3;
      right: 0;
      top: 30%;
    }

    @media (max-width: 1305px) {
      .about__content {
        margin-left: 5%;
        padding-right: 5%;
      }
    }

    @media (max-width: 1100px) {
      .about__image-wrapper {
        display: none;
      }

      .about__container {
        width: auto;
      }

      .about__content {
        margin-left: 0;
        padding-right: 0;
        justify-content: center;
        width: 100%;
      }

      .about__text {
        margin: 0 20px;
        width: 100%;
        max-width: 600px;
      }
    }

    @media (max-width: 600px) {
      .about__heading {
        font-size: 45px;
        text-align: center;
      }

      .about__intro,
      .about__text-block {
        max-width: 100%;
        font-size: 15px;
        word-wrap: break-word;
        overflow-wrap: break-word;
        hyphens: auto;
      }

      .about__detail {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .about__icon {
        margin-bottom: 1rem;
      }

      .about__content {
        padding: 50px 20px;
        min-height: auto;
      }
    }

    @media (max-width: 400px) {
      .about__heading {
        font-size: 36px;
      }

      .about__intro,
      .about__text-block {
        font-size: 14px;
        padding: 0 10px;
      }

      .about__icon {
        width: 80px;
      }
    }

    @media (max-width: 380px) {
      .about__intro,
      .about__text-block {
        font-size: 13.5px;
        padding: 0 8px;
        width: 100%;
        max-width: 100%;
      }

      .about__text {
        margin: 0 12px;
        width: calc(100% - 24px);
      }

      .about__detail {
        gap: 0.75rem;
      }

      .about__icon {
        width: 70px;
      }
    }

    @media (max-width: 320px) {
      .about__intro,
      .about__text-block {
        font-size: 13px;
        padding: 0 5px;
        width: 100%;
      }

      .about__text {
        margin: 0 10px;
      }

      .about__detail {
        gap: 0.5rem;
      }
    }
  `],
    animations: [fadeInLeft, fadeInUp]
})
export class AboutSectionComponent implements OnInit {
  isVisible = false;

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