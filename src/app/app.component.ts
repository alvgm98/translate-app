import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateRequestComponent } from './components/translate-request/translate-request.component';
import { TranslateResponseComponent } from './components/translate-response/translate-response.component';
import { TranslateService } from './services/translate.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TranslateRequestComponent, TranslateResponseComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private _translateService: TranslateService) { }

  message: string = '';
  requestLangSelected: string = 'en';
  responseLangSelected: string = 'es';

  // Recibimos el texto a traducir desde el hijo.
  getMessage(message: string) {
    this.message = message;
    this.translate();
  }

  // Recibimos el Request Language Seleccionado desde el hijo.
  getReqLangSelected(requestLangSelected: string) {
    // Evitamos traducir al mismo idioma intercambiando el idioma seleccionado en response y request.
    if (requestLangSelected == this.responseLangSelected) {
      this.responseLangSelected = this.requestLangSelected;
    }
    // Asignamos el idioma.
    this.requestLangSelected = requestLangSelected;

    // Si no hay texto que traducir evitamos el mensaje de error de la API.
    if (this.message.length > 0) {
      this.translate();
    }
  }

  // Recibimos el Response Language Seleccionado desde el hijo.
  getResLangSelected(responseLangSelected: string) {
    // Evitamos traducir al mismo idioma intercambiando el idioma seleccionado en response y request.
    if (responseLangSelected == this.requestLangSelected) {
      this.requestLangSelected = this.responseLangSelected;
    }
    // Asignamos el idioma.
    this.responseLangSelected = responseLangSelected;

    // Si no hay texto que traducir evitamos el mensaje de error de la API.
    if (this.message.length > 0) {
      this.translate();
    }
  }

  translatedMessage: string = '';

  translate() {
    console.log(this.message, "---", this.requestLangSelected, "|", this.responseLangSelected);
    this._translateService.translate(this.message, this.requestLangSelected, this.responseLangSelected).subscribe(response => {
      console.log(response);
      if (response.responseData != null && response.responseData.translatedText != null && response.responseStatus == 200) {
        this.translatedMessage = response.responseData.translatedText;
      }
      /* Cuando no hay nada escrito la API devuelve un error.
       * necesitamos esta parte del codigo para eliminar el texto traducido en caso de que se borre el texto a traducir */
      if (response.responseStatus != 200) {
        this.translatedMessage = '';
      }
    })
  }
}
