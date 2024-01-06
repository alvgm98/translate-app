import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { CopyModalService } from '../copy-modal/copy-modal.service';
import { LangDropdownComponent } from '../lang-dropdown/lang-dropdown.component';
import { ENGLISH_LANG, LANGS, Lang, SPANISH_LANG } from '../../data/langs.data';

@Component({
  selector: 'app-translate-response',
  standalone: true,
  imports: [NgClass, LangDropdownComponent],
  templateUrl: './translate-response.component.html',
  styleUrl: './translate-response.component.css'
})
export class TranslateResponseComponent implements OnChanges {
  ENGLISH_LANG: Lang = ENGLISH_LANG;
  SPANISH_LANG: Lang = SPANISH_LANG;

  @Input() translatedMessage!: string;
  @Input() responseLangSelected!: Lang;

  // Emitimos el lenguaje al que queremos que nos traduzcan el texto.
  @Output() selectResponseLangEvent = new EventEmitter<Lang>();
  selectResLang(lang: Lang) {
    this.responseLangSelected = lang;
    this.selectResponseLangEvent.emit(this.responseLangSelected);
  }

  constructor(private clipboarService: ClipboardService, private copyModalService: CopyModalService) { }

  copytext() {
    this.clipboarService.copyFromContent(this.translatedMessage);
    this.copyModalService.show();
  }

  /* SWAP LANGS FUNCTIONS */

  @Output() swapLangEvent = new EventEmitter<void>();
  swapLang() {
    this.swapLangEvent.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['responseLangSelected']) {
      this.selectDropdownLangInCaseOfSwap();
    }
  }

  /* DROPDOWN VARIABLES & FUNCTIONS */

  dropdownLangSelected: Lang = LANGS[0];
  hideDropdown: boolean = true;

  selectDropdownLang(lang: Lang) {
    this.dropdownLangSelected = lang;
    this.selectResLang(this.dropdownLangSelected);
    this.closeDropdown()
  }

  selectDropdownLangInCaseOfSwap() {
    if (this.responseLangSelected != ENGLISH_LANG && this.responseLangSelected != SPANISH_LANG && this.responseLangSelected != this.dropdownLangSelected) {
      this.selectDropdownLang(this.responseLangSelected);
    }
  }

  openDropdown() {
    this.hideDropdown = !this.hideDropdown;
  }

  closeDropdown() {
    this.hideDropdown = true;
  }
}
