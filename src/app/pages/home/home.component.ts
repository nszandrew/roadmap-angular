import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // for *ngIf, *ngFor, etc.
import { FormsModule } from '@angular/forms';   // for [(ngModel)]
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
// ... import other Angular Material modules if needed

interface Plan {
  name: string;
  price: string;
  features: string[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  // IMPORTANT: Add your required modules here
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  showPlanPopup: boolean = true;

  plans: Plan[] = [
    {
      name: 'Free',
      price: 'R$0/mês',
      features: [
        '• 3 roadmaps ativos',
        '• 30 itens por roadmap (máximo)',
        '• 5 chamadas IA por mês',
        '• Sem colaboração (somente uso individual)',
        '• Sem exportação',
        '• Acesso limitado a templates'
      ]
    },
    {
      name: 'Basic',
      price: 'R$39,90/mês',
      features: [
        '• 10 roadmaps ativos',
        '• Itens ilimitados em cada roadmap',
        '• 30 chamadas IA por mês',
        '• Exportar em PDF (ou outro formato)',
        '• Compartilhar com até 2 colaboradores',
        '• Acesso a todos os templates básicos'
      ]
    },
    {
      name: 'Premium',
      price: 'R$59,90/mês',
      features: [
        '• Ilimitados roadmaps e itens',
        '• IA praticamente sem limites',
        '• Colaboração em tempo real com quantas pessoas quiser',
        '• Histórico e versionamento do roadmap',
        '• Integração com Google Calendar ou Slack',
        '• Acesso à “Biblioteca Premium” de templates exclusivos',
        '• Relatórios e estatísticas de uso'
      ]
    }
  ];

  chatMessages: string[] = [];
  chatInput: string = '';

  closePopup(): void {
    this.showPlanPopup = false;
  }

  sendMessage(): void {
    const trimmedMessage = this.chatInput.trim();
    if (trimmedMessage) {
      this.chatMessages.push(trimmedMessage);
      this.chatInput = '';
    }
  }
}
