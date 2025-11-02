import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BrasilapiCidade, BrasilapiEstado } from '../models/brasilapi.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrasilapiService {
  private client: HttpClient = inject(HttpClient);

  obterEstados(): Observable<BrasilapiEstado[]> {
    return this.client.get<BrasilapiEstado[]>('https://brasilapi.com.br/api/ibge/uf/v1');
  }

  obterCidadesPorEstado(uf: string): Observable<BrasilapiCidade[]> {
    return this.client.get<BrasilapiCidade[]>(`https://brasilapi.com.br/api/ibge/municipios/v1/${uf}`);
  }

}
