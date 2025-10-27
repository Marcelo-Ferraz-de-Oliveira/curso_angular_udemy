import { Component, inject, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Cliente } from './cliente';
import { ClienteService } from '../services/cliente.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss'
})
export class Cadastro implements OnInit {

  private service = inject(ClienteService);
  private route = inject(ActivatedRoute);

  cliente: Cliente = Cliente.newCliente();
  atualizando: boolean = false;

  ngOnInit() {
    this.route.queryParamMap.subscribe((query: any) => {
      const id = query.params?.id;
      if (id) {
        const cliente = this.service.obterClientePorId(id);
        if (cliente) {
          this.atualizando = true;
          this.cliente = cliente;
        }
      }
      console.log('Params recebidos no cadastro:', id);
    });
  }

  salvar() {
    this.service.salvar(this.cliente);
    this.cliente = Cliente.newCliente();
  }

}
