import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subcription: Subscription;

  constructor() {


    this.subcription = this.regresaObservable()
    .subscribe(
      numero => console.log('subs ', numero),
      error => console.error('Error ', error),
      () => console.log('observador terminó')
    );
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

  regresaObservable(): Observable<number> {

    return new Observable( (observer: Subscriber<any>) => {
      let contador = 0;
      const intervalo = setInterval( () => {
        contador += 1;
        const salida = {
          valor: contador
        };
        observer.next(salida);

      }, 1000);
    }).pipe(
      map( resp => resp.valor),
      filter( (valor, index) => {
        if ( (valor % 2) === 1 ) {
          // impar
          return true;
        } else {
          // par
          return false;
        }
      })
    );
  }

}
