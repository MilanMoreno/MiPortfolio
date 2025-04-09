import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, ElementRef, AfterViewInit, OnDestroy, ChangeDetectorRef, viewChild, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ViewportService } from '../../../../shared/services/viewport/viewport-service.service';
import { slideInOutLeft, slideInOutRight, slideInFromBottom } from '../../../../shared/animations/animations';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, RouterModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [
    slideInOutLeft,
    slideInOutRight,
    slideInFromBottom
  ]
})

export class ContactComponent {
  slideIn = 'out';
  slideInRight = 'out';
  slideInBottom: string = 'out';
  private subscription: Subscription | undefined;

  http = inject(HttpClient);

@ViewChild('emailAlert', { static: false}) emailAlert!: ElementRef;

  constructor(
    private el: ElementRef,
    private viewportService: ViewportService,
    private cdr: ChangeDetectorRef
  ) { }

  contactData = {
    name: '',
    email: '',
    message: '',
    privacyPolicy: false,
  };

  mailTest = false;

  post = {
    endPoint: 'https://thomas-mustermann.com/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
      },
    },
  };

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData), this.post.options)
        .subscribe({
          next: (response) => {
            ngForm.resetForm();
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
        this.showSendingAlert();
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      ngForm.resetForm();
    }
  }

  ngAfterViewInit() {
    this.subscription = this.viewportService.observeElement(this.el.nativeElement).subscribe(isIntersecting => {
      this.slideIn = isIntersecting ? 'in' : 'out';
      this.slideInRight = isIntersecting ? 'in' : 'out';
      this.slideInBottom = isIntersecting ? 'in' : 'out';
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  showSendingAlert() {
    this.emailAlert.nativeElement.classList.remove('d-none');
    setTimeout(() => this.emailAlert.nativeElement.classList.add('slide-in'), 100);
    setTimeout(() => {
      this.emailAlert.nativeElement.classList.remove('slide-in');
      this.emailAlert.nativeElement.classList.add('slide-out');
    }, 3000);
    setTimeout(() => {
      this.emailAlert.nativeElement.classList.remove('slide-out');
      this.emailAlert.nativeElement.classList.add('d-none');
    }, 3000);
  }
  }


