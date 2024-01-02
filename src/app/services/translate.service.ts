import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITranslateResponse } from '../interfaces/translate-response.model';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(private _http: HttpClient) { }

  translate(message: string, requestLang: string, responseLang: string): Observable<ITranslateResponse> {
    return this._http
      .get<ITranslateResponse>(`https://api.mymemory.translated.net/get?q=${message}&langpair=${requestLang}|${responseLang}`);
  }
}
