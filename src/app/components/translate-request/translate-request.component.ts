import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-translate-request',
  standalone: true,
  imports: [NgClass, FormsModule],
  templateUrl: './translate-request.component.html',
  styleUrl: './translate-request.component.css'
})
export class TranslateRequestComponent {
  @Input() requestLangSelected!: string;
  message: string = '';

  // Emitimos el texto a traducir
  @Output() translateEvent = new EventEmitter<string>();
  translate() {
    this.translateEvent.emit(this.message);
  }

  // Emitimos el idioma del texto a traducir
  @Output() selectRequestLangEvent = new EventEmitter<string>();
  selectReqLang(lang: string) {
    this.requestLangSelected = lang;
    this.selectRequestLangEvent.emit(this.requestLangSelected);
  }

  constructor(private _clipboarService: ClipboardService) { }

  copytext() {
    this._clipboarService.copyFromContent(this.message);
  }

}
