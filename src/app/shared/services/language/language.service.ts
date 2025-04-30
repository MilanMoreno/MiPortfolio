// language.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private STORAGE_KEY = 'selected_language';
  private defaultLanguage = 'de'; // Standardsprache

  private languageSubject = new BehaviorSubject<string>(this.getInitialLanguage());
  public currentLanguage$ = this.languageSubject.asObservable();

  constructor() { }

  private getInitialLanguage(): string {
    // Überprüfen, ob eine Sprache im LocalStorage gespeichert ist
    const savedLanguage = localStorage.getItem(this.STORAGE_KEY);
    return savedLanguage || this.defaultLanguage;
  }

  setLanguage(lang: string) {
    // Speichern der ausgewählten Sprache im LocalStorage
    localStorage.setItem(this.STORAGE_KEY, lang);
    // Aktualisieren des Subjects, um die Komponenten zu benachrichtigen
    this.languageSubject.next(lang);
  }

  getCurrentLanguage(): string {
    return this.languageSubject.value;
  }
}
