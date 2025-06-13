import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project-card',
  standalone: true, // <-- This is the key!
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {
  @Input() image!: string;
  @Input() titleKey!: string;
  @Input() stackKey!: string;
  @Input() descriptionKey!: string;
  @Input() demoUrl!: string;
  @Input() repoUrl!: string;
  @Input() isReversed: boolean = false;
}
