import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './component/menu/menu.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./component/login/login.component";



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, MenuComponent, CommonModule, LoginComponent]
})
export class AppComponent {
  title = 'customer-management-app';
}
