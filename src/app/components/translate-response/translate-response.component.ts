import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-translate-response',
  standalone: true,
  imports: [NgClass],
  templateUrl: './translate-response.component.html',
  styleUrl: './translate-response.component.css'
})
export class TranslateResponseComponent {
  @Input() translatedMessage!: string;
  @Input() responseLangSelected!: string;

  // Emitimos el lenguaje al que queremos que nos traduzcan el texto.
  @Output() selectResponseLangEvent = new EventEmitter<string>();
  selectResLang(lang: string) {
    this.responseLangSelected = lang;
    this.selectResponseLangEvent.emit(this.responseLangSelected);
  }

  constructor(private _clipboarService: ClipboardService) { }

  copytext() {
    this._clipboarService.copyFromContent(this.translatedMessage);
  }
}
