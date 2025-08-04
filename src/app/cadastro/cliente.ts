import { UUIDTypes, v4 as uuidv4 } from 'uuid';

export class Cliente {
  id?: UUIDTypes;
  nome?: string;
  email?: string;
  cpf?: string;
  dataNascimento?: Date;

  static newCliente() {
    const cliente = new Cliente();
    cliente.id = uuidv4();
    return cliente;
  }
}
