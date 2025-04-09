import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavigationBarComponent } from './core/layout/navigation-bar/navigation-bar.component';
import { PageFooterComponent } from './core/layout/page-footer/page-footer.component';
import { CustomCursorComponent } from './shared/components/custom-cursor/custom-cursor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TranslateModule,
    NavigationBarComponent,
    PageFooterComponent,
    CustomCursorComponent
  ],
  template: `
    <div class="app-container">
      <app-navigation-bar></app-navigation-bar>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      <app-page-footer></app-page-footer>
      <app-custom-cursor></app-custom-cursor>
    </div>
  `,
  styles: [`
    .app-container {
      display: block;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: var(--color-background-primary);
    }

    .main-content {
      min-height: calc(100vh - var(--header-height) - var(--footer-height));
    }
  `]
})
export class AppComponent {
  constructor(private translateService: TranslateService) {
    this.initializeLanguage();
  }

  private initializeLanguage(): void {
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }
}