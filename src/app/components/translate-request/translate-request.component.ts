import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-translate-request',
  standalone: true,
  imports: [NgClass, FormsModule],
  templateUrl: './translate-request.component.html',
  styleUrl: './translate-request.component.css'
})
export class TranslateRequestComponent {
  requestLangSelected: string = 'en';
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

    console.log(this.requestLangSelected)
  }
}
