import { Component, inject, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from "@angular/material/button";
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente.model';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    NgxMaskPipe,
],
  templateUrl: './consulta.html',
  styleUrl: './consulta.scss'
})
export class Consulta implements OnInit {

  nomeBusca: string = '';
  listaClientes: Cliente[] = [];
  colunasTable: string[] = ['id', 'nome', 'cpf', 'dataNascimento', 'email', 'estado', 'cidade', 'acoes'];
  deletando: string = '';

  private service = inject(ClienteService);
  private router = inject(Router);
  private snack: MatSnackBar = inject(MatSnackBar);

  ngOnInit(): void {
      this.listaClientes = this.service.pesquisarClientes('');
  }

  pesquisar() {
    // console.log('Nome da busca:', this.nomeBusca);
    this.listaClientes = this.service.pesquisarClientes(this.nomeBusca);
  }

  preparaEditar(id: string) {
    this.router.navigate(['/cadastro'], { queryParams: { id: id } });
    // this.service.preparaEditar(id);
  }

  preparaDeletar(id: string) {
    this.deletando = id;
  }

  deletar(cliente: Cliente) {
    this.service.deletar(cliente);
    this.deletando = '';
    this.nomeBusca = '';
    this.mostrarMensagem('Cliente deletado com sucesso!');
    this.pesquisar();
  }

  mostrarMensagem(mensagem: string) {
    this.snack.open(mensagem, 'Ok', { duration: 3000 });
  }
}
