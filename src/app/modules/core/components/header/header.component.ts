import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../../pages/main/hero/hero.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, HeroComponent, TranslateModule]
})
export class HeaderComponent implements AfterViewInit {
  isGerman: boolean = true;
  logoUrl: string = 'assets/img/logo.png';
  linkUrl: string = '#hero';
  burgerMenuOpen: boolean = false;

  @ViewChild('burgerMenu') burgerMenu!: ElementRef;
  @ViewChild('burger') burger!: ElementRef;
  @ViewChild('checkbox4') checkbox!: ElementRef<HTMLInputElement>;
  @ViewChild('header') header!: ElementRef;

  constructor(private translate: TranslateService) { }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  ngAfterViewInit() {
  }

  toggleBurgerMenu(): void {
    if (!this.checkbox.nativeElement.checked) {
      this.openBurgerMenu();
    } else {
      this.closeBurgerMenu();
    }
  }

  openBurgerMenu(): void {
    this.burgerMenuOpen = true;
    this.burgerMenu.nativeElement.classList.remove('d-none');
    this.burgerMenu.nativeElement.classList.remove('slide-out');
    setTimeout(() => {
      this.burgerMenu.nativeElement.classList.add('slide-in');
    }, 10);
    setTimeout(() => {
      this.header.nativeElement.classList.add('fixed');
    }, 1000);
  }

  closeBurgerMenu(): void {
    this.burgerMenuOpen = false;
    this.burgerMenu.nativeElement.classList.remove('slide-in');
    this.burgerMenu.nativeElement.classList.add('slide-out');
    setTimeout(() => {
      this.burgerMenu.nativeElement.classList.add('d-none');
      this.checkbox.nativeElement.checked = false;
    }, 1000);
    this.header.nativeElement.classList.remove('fixed');
  }

  linkClicked(): void {
    this.closeBurgerMenu();
  }
}