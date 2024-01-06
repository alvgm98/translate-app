import { Component } from '@angular/core';
import { CopyModalService } from './copy-modal.service';

@Component({
  selector: 'component-copy-modal',
  standalone: true,
  imports: [],
  templateUrl: './copy-modal.component.html',
  styleUrl: './copy-modal.component.css'
})
export class CopyModalComponent {
  hidden: boolean = true;

  constructor(private copyModalService: CopyModalService) {
    this.copyModalService.showModal$.subscribe(() => {
      this.showModal();
    })
  }

  showModal() {
    this.hidden = false;

    // Volvemos a esconder el modal.
    setTimeout(() => {
      this.hideModal();
    }, 2500);
  }

  hideModal() {
    this.hidden = true;
  }
}
