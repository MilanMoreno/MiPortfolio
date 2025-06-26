import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ClipboardManagerService } from '../../../../shared/services/clipboard/clipboard.service';
import { fadeInLeft, fadeInUp } from '../../../../shared/animations/fade.animations';

@Component({
    selector: 'app-hero-section',
    imports: [CommonModule, TranslateModule],
    template: `
<section class="hero" id="hero">
  <div class="hero__content">
    <div class="hero__left-container">
      <img class="hero__image" src="assets/img/hero.png" alt="Hero image">
      <div class="hero__image-shadow"></div>
    </div>

    <div class="hero__text-wrapper">
      <div class="hero__intro-text" [@fadeInLeft]>
        {{ 'HERO.IAM' | translate }}
      </div>

      <div class="hero__name-container" [@fadeInUp]>
        <h1 class="hero__name">{{ 'HERO.NAME' | translate }}</h1>
        <p class="hero__title">{{ 'HERO.JOBTITLE' | translate }}</p>

        <div class="hero__cta-wrapper">
          <a href="#contact" class="hero__cta">
            {{ 'HERO.LETSTALK' | translate }}
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Desktop Vector Shape bleibt hier -->
  <div class="hero__vector-shape">
    <img src="assets/img/Vector shape hero.png" alt="Vector Shape" class="hero__vector-image">
  </div>

  <div class="hero__footer">
    <div class="hero__line-container">
      <div class="hero__line"></div>
    </div>

    <div class="hero__social">
      <a href="https://github.com/MilanMoreno" target="_blank" class="hero__social-link">
        <img src="assets/img/github.png" alt="GitHub">
      </a>
      <a class="hero__social-link" (click)="copyEmail()">
        <img src="assets/img/email.png" alt="Email">
      </a>
      <a href="https://www.linkedin.com/in/milan-moreno-9a7482360//" target="_blank" class="hero__social-link">
        <img src="assets/img/linkedin.png" alt="LinkedIn">
      </a>
      <span class="hero__email">milan.moreno&#64;gmail.com</span>
    </div>

    <a href="#about" class="hero__scroll">
      {{ 'HERO.SCROLLDOWN' | translate }}
    </a>
  </div>

  <div class="hero__notification" [class.hero__notification--visible]="(clipboardService.copyStatus$ | async)">
    {{ 'HERO.EMAIL_COPIED' | translate }}
  </div>
</section>
  `,
    styles: [`
    .hero {
      position: relative;
      height: 100vh;
      min-height: 700px;
      background-color: #141D2F;
      display: flex;
      flex-direction: column;
      overflow: visible; /* Wichtig: overflow ändern damit Vector sichtbar ist */
      padding-top: var(--header-height);
      box-sizing: border-box;
    }

    .hero__content {
      display: flex;
      justify-content: flex-start; /* Links ausrichten statt space-between */
      align-items: center;
      flex: 1;
      width: 100%;
      padding: 0 50px; /* Weniger Padding für mehr Platz */
      margin-top: calc(-1 * var(--header-height));
      position: relative;
      z-index: 3;
      gap: 2rem; /* Gap zwischen Bild und Text */
    }

    .hero__left-container {
      position: relative;
      width: auto; /* Automatische Breite */
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2;
      margin-top: 80px;
      flex-shrink: 0; /* Container soll nicht schrumpfen */
    }

    .hero__image {
      height: 75vh;
      object-fit: contain;
      position: relative;
      z-index: 3;
    }

    .hero__image-shadow {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      background: url('/assets/img/hero-shadows.png') no-repeat center center;
      background-size: contain;
      z-index: 2;
      opacity: 0.8;
      pointer-events: none;
    }

    /* Vector Shape - strategisch positioniert um Arme/Ellenbogen zu verdecken */
    .hero__vector-shape {
      position: absolute;
      bottom: -60%; /* Höher positioniert damit Vector die Arme schneidet */
      left: -10%; /* Leicht nach links verschoben */
      width: 120%; /* Breiter für bessere Abdeckung */
      height: 180vh; /* Angepasste Höhe */
      z-index: 4; /* Höher als das Bild (z-index: 3) damit es vor dem Bild liegt */
      pointer-events: none;
      overflow: visible;
      transform: translateY(250px); /* 250px weiter nach unten verschieben */
    }

    .hero__vector-image {
      position: absolute;
      top: 0;
      padding-bottom:20px;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      height: 100%;
      object-fit: contain;
      opacity: 1; /* 100% undurchsichtig - vollständige Verdeckung */
    }

    /* Neuer Wrapper für "I am" + Name/Titel */
    .hero__text-wrapper {
      display: flex;
      align-items: center;
      gap: 20px; /* Abstand zwischen "I am" und Name/Titel */
      margin-left: -50px; /* Ganzer Text-Block nach links */
      z-index: 3;
    }

    /* "I am" Text direkt vor Name+Titel */
    .hero__intro-text {
      transform: rotate(-90deg);
      font-size: 32px;
      color: var(--color-text-primary);
      white-space: nowrap;
      flex-shrink: 0; /* Soll nicht schrumpfen */
    }

    /* WICHTIG: Name+Titel Container mit fester Größe wie bei Dominik */
    .hero__name-container {
      display: flex;
      flex-direction: column;
      gap: 5px; /* Reduzierter Gap zwischen Name und Titel */
      max-width: 718px; /* Maximale Breite wie bei Dominik */
      max-height: 172px; /* Maximale Höhe wie bei Dominik */
      overflow: visible; /* Sichtbar lassen statt hidden */
    }

    .hero__name {
      margin: 0;
      line-height: 1.1; /* Reduzierte line-height für kompakteren Look */
      font-size: 72px; /* Reduzierte Schriftgröße damit es in 172px passt */
      color: var(--color-text-primary);
      font-weight: 700; /* Bold wie bei Dominik */
      white-space: nowrap; /* Text bleibt in einer Zeile */
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .hero__title {
      color: var(--color-accent-secondary);
      font-size: 42px; /* Reduzierte Schriftgröße für bessere Proportionen */
      margin: 0;
      line-height: 1.1; /* Kompakte line-height */
      font-weight: 400; /* Normal weight wie bei Dominik */
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .hero__cta-wrapper {
      margin-top: 20px;
    }

    .hero__cta {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 120px;
      height: 40px;
      border-radius: 10px;
      background-color: var(--color-accent-primary);
      color: white;
      font-size: 16px;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .hero__cta:hover {
      transform: scale(1.05);
      background-color: var(--color-accent-secondary);
    }

    .hero__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 100px;
      padding: 0 100px;
      z-index: 20;
      margin-top: auto;
      position: relative;
      flex-shrink: 0;
    }

    .hero__line-container {
      position: relative;
      width: 100px;
    }

    .hero__line {
      position: absolute;
      right: 0;
      width: 99999px;
      height: 4px;
      background-color: var(--color-accent-secondary);
    }

    .hero__social {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .hero__social-link {
      display: inline-block;
    }

    .hero__social-link:hover {
      /* No transform or button-like behavior */
    }

    .hero__social-link:hover img {
      filter: brightness(0) saturate(100%) invert(76%) sepia(15%) saturate(4614%) hue-rotate(71deg) brightness(102%) contrast(101%);
    }

    .hero__email {
      margin-left: 15px;
      font-size: 23px;
      color: var(--color-text-primary);
      cursor: pointer;
    }

    .hero__email:hover {
      color: var(--color-accent-primary);
    }

    .hero__scroll {
      transform: rotate(90deg);
      color: var(--color-text-primary);
      font-size: 20px;
      transition: color 0.3s ease;
    }

    .hero__scroll:hover {
      color: var(--color-accent-primary);
    }

    .hero__notification {
      position: fixed;
      bottom: -100%;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba(0, 0, 0, 0.8);
      padding: 1rem 2rem;
      border-radius: 10px;
      color: var(--color-text-primary);
      transition: bottom 0.3s ease;
      z-index: 100;
    }

    .hero__notification--visible {
      bottom: 2rem;
    }

    @media (max-width: 1300px) {
      /* Vector bleibt bis 900px sichtbar - nur andere Anpassungen */
      .hero__content {
        padding: 0 50px;
      }

      .hero__footer {
        padding: 0 50px;
      }

      .hero__image {
        height: 65vh;
      }

      /* Name+Titel für kleinere Screens anpassen */
      .hero__name {
        font-size: 60px;
      }

      .hero__title {
        font-size: 36px;
      }

      .hero__vector-shape {
        width: 120%;
        height: 157vh;
        bottom: -40%;
        left: 0%;
        transform: translateY(200px);
      }
    }

    @media (max-width: 1200px) {
      /* Weitere Anpassungen für 1200px und kleiner */
      .hero__name {
        font-size: 55px;
      }

      .hero__title {
        font-size: 32px;
      }

      /* Vector für kleinere Bildschirme anpassen */  
      .hero__vector-shape {
        width: 120%;
        height: 157vh;
        bottom: -40%;
        left: 0%;
        transform: translateY(200px);
      }
    }

    @media (max-width: 1000px) {
      /* Letzte Anpassungen bevor Vector verschwindet */
      .hero__name {
        font-size: 50px;
      }

      .hero__title {
        font-size: 30px;
      }

      .hero__vector-shape {
        width: 115%;
        height: 120vh;
        bottom: -30%;
        left: 0.0%;
        transform: translateY(161px);
      }
    }

    @media (max-width: 900px) {
      /* NUR MOBILE ÄNDERUNGEN: Vector Shape direkt unter dem Bild positionieren */
      .hero__vector-shape {
        position: absolute;
        width: 100%;
        height: 120px; /* Höher damit sie die Ellenbogen verdeckt */
        bottom: auto;
        top: 50%; /* In der Mitte positioniert */
        left: 0;
        transform: translateY(-20%); /* Leicht nach oben versetzt um Ellenbogen zu verdecken */
        z-index: 4; /* Über dem Bild damit es die Ellenbogen verdeckt */
        opacity: 1;
        pointer-events: none;
        background-color: transparent; /* Transparent damit PNG sichtbar ist */
      }

      /* Vector Image mit der richtigen Farbe #192336 */
      .hero__vector-image {
        display: block; /* Bild wieder anzeigen */
        /* Filter für Farbe #192336 (gleiche wie Desktop) */
        filter: brightness(0) saturate(100%) invert(15%) sepia(12%) saturate(1150%) hue-rotate(192deg) brightness(95%) contrast(88%);
      }

      .hero {
        height: 100vh;
        min-height: 100vh;
        padding-bottom: 0;
        position: relative;
        display: flex;
        flex-direction: column;
      }

      .hero__name { 
        font-size: 45px;
        white-space: normal; /* Text kann umbrechen auf Mobile */
      }

      .hero__title {
        font-size: 29px;
        white-space: normal;
      }

      .hero__cta {
        font-size: 16px;
      }

      .hero__cta-wrapper {
        margin-top: 10px;
      }

      .hero__content {
        flex-direction: column;
        padding: 20px;
        gap: 0; /* Kein Gap - Vector Shape sitzt zwischen Bild und Text */
        margin-top: 0px;
        flex: 1;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 5; /* Über der Vector Shape */
      }

      .hero__left-container {
        width: 100%;
        order: 1;
        flex-shrink: 0;
        margin-top: 0;
        position: relative;
        margin-bottom: 0; /* Kein Abstand nach unten */
      }

      .hero__text-wrapper {
        width: 100%;
        order: 3; /* Nach Vector Shape */
        flex-shrink: 0;
        margin-left: 0; /* Margin-left auf Mobile zurücksetzen */
        flex-direction: column; /* Vertikal auf Mobile */
        align-items: center;
        text-align: center;
        gap: 1rem;
        position: relative;
        z-index: 6; /* Text soll über der Vector Shape stehen */
        margin-top: 20px; /* Abstand zur Vector Shape */
      }

      .hero__name-container {
        max-width: 100%; /* Volle Breite auf Mobile */
        max-height: none; /* Keine Höhenbegrenzung auf Mobile */
        align-items: center;
      }

      /* "I am" Text für Mobile anpassen */
      .hero__intro-text {
        transform: none; /* Keine Rotation auf Mobile */
        font-size: 24px;
      }

      .hero__image {
        height: 30vh;
        width: auto;
        max-width: 100%;
      }

      .hero__image-shadow {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
      }

      .hero__footer {
        position: relative;
        bottom: auto;      
        left: auto;
        right: auto;
        padding: 0 20px;
        height: 80px;
        background-color: transparent;
        backdrop-filter: none;
        z-index: 10;
        margin-top: auto;
        flex-shrink: 0;
      }

      .hero__email {
        display: none;
      }
    }

    @media (max-width: 600px) {
      /* Vector Shape kleiner für kleinere Bildschirme */
      .hero__vector-shape {
        height: 100px; /* Kleinere Höhe aber immer noch genug um Ellenbogen zu verdecken */
        background-color: transparent; /* Transparent für PNG */
        transform: translateY(-20%); /* Position beibehalten */
      }

      /* Vector Image behalten mit ursprünglicher Farbe */
      .hero__vector-image {
        display: block; /* Bild anzeigen */
        /* Kein Filter - ursprüngliche PNG-Farbe verwenden */
      }

      .hero__name {
        font-size: 45px;
      }

      .hero__title {
        font-size: 23px;
      }

      .hero__intro-text {
        font-size: 14px;
      }

      .hero__cta {
        width: 100px;
        height: 35px;
        font-size: 16px;
      }

      .hero__social-link img {
        width: 25px;
        height: 25px;
      }

      .hero__scroll {
        font-size: 14px;
      }

      .hero__image {
        height: 25vh;
      }
    }

    @media (max-width: 400px) {
      /* Vector Shape noch kleiner */
      .hero__vector-shape {
        height: 80px; /* Noch kleinere Höhe aber ausreichend */
        background-color: transparent; /* Transparent für PNG */
        transform: translateY(-20%); /* Position beibehalten */
      }

      /* Vector Image behalten mit ursprünglicher Farbe */
      .hero__vector-image {
        display: block; /* Bild anzeigen */
        /* Kein Filter - ursprüngliche PNG-Farbe verwenden */
      }

      .hero__name {
        font-size: 45px;
      }

      .hero__title {
        font-size: 29px;
      }

      .hero__intro-text {
        font-size: 12px;
      }

      .hero__cta {
        width: 80px;
        height: 28px;
        font-size: 14px;
      }

      .hero__image {
        height: 22vh;
      }
    }

    /* WICHTIG: Diese Media Query muss AUSSERHALB der anderen stehen! */
    @media (max-width: 350px) {
      .hero__line {
        width: 50px !important; /* Halb so lang */
      }
      
      .hero__line-container {
        width: 50px !important; /* Container auch anpassen */
      }
    }
   
    @media (max-width: 320px) {
      .hero__name {
        font-size: 18px;
      }

      .hero__title {
        font-size: 14px;
      }

      .hero__intro-text {
        font-size: 11px;
      }

      .hero__cta {
        width: 70px;
        height: 25px;
        font-size: 12px;
      }

      .hero__image {
        height: 20vh;
      }
      
      .hero__social-link img {
        width: 20px;
        height: 20px;
      }
      
      .hero__scroll {
        font-size: 12px;
      }

      /* Noch kürzer bei 320px */
      .hero__line {
        width: 40px !important;
      }
      
      .hero__line-container {
        width: 40px !important;
      }
    }

    /* NEU: Vector Shape unter 280px verstecken */
    @media (max-width: 280px) {
      .hero__vector-shape {
        display: none;
      }
    }
  `],
    animations: [fadeInLeft, fadeInUp]
})
export class HeroSectionComponent {
  constructor(public clipboardService: ClipboardManagerService) {}

  copyEmail(): void {
    this.clipboardService.copyToClipboard('milan.moreno.crea@gmail.com');
  }
}