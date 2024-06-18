import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../../../_module/Material.Module';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, MaterialModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  

}
