import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bs-home',
  template: `
      <div class="content">
          <h1>KWM gegen Corana!</h1>
          
          <p>
            In der derzeitigen Situation sollen ältere Personen Einkäufe durch jüngere Personen übernehmen 
            lassen. Wir wollen für dieses Szenario eine einfache Web-basierte Applikation erstellen. Hilfesuchende, 
            ältere Personen soll es ermöglicht werden, dass Sie eine „Einkaufsliste“ online stellen – dies soll 
            natürlich möglichst einfach möglich sein. Angemeldete Freiwillige sollen einfach bekannt geben 
            können, dass Sie einen gewissen Einkauf übernehmen möchten.
          </p>
      </div>
  `,
  styles: []
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
