import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatAnchor, MatButtonModule } from "@angular/material/button";
@Component({
  selector: 'app-consulta',
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatAnchor
],
  templateUrl: './consulta.html',
  styleUrl: './consulta.scss'
})
export class Consulta {

}
