import { Component, inject, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Cliente } from '../models/cliente.model';
import { ClienteService } from '../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { BrasilapiCidade, BrasilapiEstado } from '../models/brasilapi.model';
import { BrasilapiService } from '../services/brasilapi.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    NgxMaskDirective,
  ],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss'
})
export class Cadastro implements OnInit {

  private service = inject(ClienteService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snack: MatSnackBar = inject(MatSnackBar);
  private brasilApiService = inject(BrasilapiService);


  cliente: Cliente = Cliente.newCliente();
  atualizando: boolean = false;
  estados: BrasilapiEstado[] = [];
  cidades: BrasilapiCidade[] = [];

  ngOnInit() {
    this.route.queryParamMap.subscribe((query: any) => {
      const id = query.params?.id;
      if (id) {
        const cliente = this.service.obterClientePorId(id);
        if (cliente) {
          this.atualizando = true;
          this.cliente = cliente;
          // this.estados$ = this.brasilApiService.obterEstados();
          // this.cidades$ = this.brasilApiService.obterCidadesPorEstado(this.cliente.estado!.sigla);
        }
      }
      // console.log('Params recebidos no cadastro:', id);
    });
    this.carregarEstados();
  }

  salvar() {
    if (this.atualizando) {
      this.service.atualizar(this.cliente);
      this.mostrarMensagem('Cliente atualizado com sucesso!');
      this.router.navigate(['/consulta']);
      return;
    }
    this.service.salvar(this.cliente);
    this.cliente = Cliente.newCliente();
    this.mostrarMensagem('Cliente criado com sucesso!');
    this.router.navigate(['/consulta']);
  }

  mostrarMensagem(mensagem: string) {
    this.snack.open(mensagem, 'Ok', { duration: 3000 });
  }

  carregarEstados() {
    this.brasilApiService.obterEstados().subscribe((estados) => {
      this.estados = estados;
      this.carregarCidades();
    });
  }

  carregarCidades() {
    if (this.cliente.estado) {
      this.brasilApiService.obterCidadesPorEstado(this.cliente.estado).subscribe((cidades) => {
        this.cidades = cidades;
      });
    } else {
      this.cidades = [];
    }
  }
}
