import { Component, inject, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from "@angular/material/button";
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../cadastro/cliente';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-consulta',
  imports: [
    DatePipe,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
],
  templateUrl: './consulta.html',
  styleUrl: './consulta.scss'
})
export class Consulta implements OnInit {

  nomeBusca: string = '';
  listaClientes: Cliente[] = [];
  colunasTable: string[] = ['id', 'nome', 'cpf', 'dataNascimento', 'email', 'acoes']

  private service = inject(ClienteService);
  private router = inject(Router);

  ngOnInit(): void {
      this.listaClientes = this.service.pesquisarClientes('');
  }

  pesquisar() {
    // console.log('Nome da busca:', this.nomeBusca);
    this.listaClientes = this.service.pesquisarClientes(this.nomeBusca);
  }

  preparaEditar(id: string) {
    console.log('Editar cliente id:', id);
    this.router.navigate(['/cadastro'], { queryParams: { id: id } });
    // this.service.preparaEditar(id);
  }

}
