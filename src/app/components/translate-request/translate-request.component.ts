import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClipboardService } from 'ngx-clipboard';
import { CopyModalService } from '../copy-modal/copy-modal.service';
import { LANGS, Lang } from '../../data/langs.data';
import { LangDropdownComponent } from '../lang-dropdown/lang-dropdown.component';

@Component({
  selector: 'app-translate-request',
  standalone: true,
  imports: [NgClass, FormsModule, LangDropdownComponent],
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

  constructor(private clipboarService: ClipboardService, private copyModalService: CopyModalService) { }

  copytext() {
    this.clipboarService.copyFromContent(this.message);
    this.copyModalService.show();
  }

  /* DROPDOWN VARIABLES & FUNCTIONS */

  dropdownLangSelected: Lang = LANGS[0];
  hideDropdown: boolean = true;

  selectDropdownLang(lang: Lang) {
    this.dropdownLangSelected = lang;
    this.requestLangSelected = this.dropdownLangSelected.code;
    this.closeDropdown();
  }

  openDropdown() {
    this.hideDropdown = !this.hideDropdown;
  }

  closeDropdown() {
    this.hideDropdown = true;
  }

}
