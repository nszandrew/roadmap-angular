// src/app/pages/home/home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-home',
  template: `<h1>Bem-vindo ao Roadmap!</h1>`,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}
