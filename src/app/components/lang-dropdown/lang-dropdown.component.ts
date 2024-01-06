import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LANGS, Lang } from '../../data/langs.data';

@Component({
  selector: 'component-lang-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './lang-dropdown.component.html',
  styleUrl: './lang-dropdown.component.css'
})
export class LangDropdownComponent {
  langs: Lang[] = LANGS;

  @Input() dropdownLangSelected!: Lang;

  @Output() selectDropdownLangEvent = new EventEmitter<Lang>();
  selectDropdownLang(lang: Lang) {
    this.selectDropdownLangEvent.emit(lang);
  }
}
