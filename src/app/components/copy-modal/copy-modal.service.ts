import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CopyModalService {

  private showModalSource = new Subject<void>();
  showModal$ = this.showModalSource.asObservable();

  show() {
    this.showModalSource.next();
  }

}
