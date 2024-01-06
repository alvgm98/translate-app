import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClipboardService } from 'ngx-clipboard';
import { CopyModalService } from '../copy-modal/copy-modal.service';
import { ENGLISH_LANG, LANGS, Lang, SPANISH_LANG } from '../../data/langs.data';
import { LangDropdownComponent } from '../lang-dropdown/lang-dropdown.component';

@Component({
  selector: 'app-translate-request',
  standalone: true,
  imports: [NgClass, FormsModule, LangDropdownComponent],
  templateUrl: './translate-request.component.html',
  styleUrl: './translate-request.component.css'
})
export class TranslateRequestComponent implements OnChanges {
  ENGLISH_LANG: Lang = ENGLISH_LANG;
  SPANISH_LANG: Lang = SPANISH_LANG;

  @Input() requestLangSelected!: Lang;
  message: string = '';

  // Emitimos el texto a traducir
  @Output() translateEvent = new EventEmitter<string>();
  translate() {
    this.translateEvent.emit(this.message);
  }

  // Emitimos el idioma del texto a traducir
  @Output() selectRequestLangEvent = new EventEmitter<Lang>();
  selectReqLang(lang: Lang) {
    this.requestLangSelected = lang;
    this.selectRequestLangEvent.emit(this.requestLangSelected);
  }

  constructor(private clipboarService: ClipboardService, private copyModalService: CopyModalService) { }

  copytext() {
    this.clipboarService.copyFromContent(this.message);
    this.copyModalService.show();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['requestLangSelected']) {
      this.selectDropdownLangInCaseOfSwap();
    }
  }

  /* DROPDOWN VARIABLES & FUNCTIONS */

  dropdownLangSelected: Lang = LANGS[0];
  hideDropdown: boolean = true;

  selectDropdownLang(lang: Lang) {
    this.dropdownLangSelected = lang;
    this.selectReqLang(this.dropdownLangSelected);
    this.closeDropdown();
  }

  selectDropdownLangInCaseOfSwap() {
    if (this.requestLangSelected != ENGLISH_LANG && this.requestLangSelected != SPANISH_LANG && this.requestLangSelected != this.dropdownLangSelected) {
      this.selectDropdownLang(this.requestLangSelected);
    }
  }

  openDropdown() {
    this.hideDropdown = !this.hideDropdown;
  }

  closeDropdown() {
    this.hideDropdown = true;
  }

}
