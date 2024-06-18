import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from '../../_service/master.service';
import { LoginUser } from '../../../_model/loginUser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private masterService: MasterService) {}
  
  onSubmit() {
    // Check if username or password is empty
    if (!this.username.trim()) {
      alert('Please enter a username');
      return;
    }
    if (!this.password.trim()) {
      alert('Please enter a password');
      return;
    }

    const loginUser: LoginUser = { username: this.username, password: this.password };
    this.masterService.loginUser(loginUser).subscribe(response => {
      if (response.success) {
        localStorage.setItem('userId', response.userId); // Save userId in local storage
        this.router.navigate(['customer/all']);
      } else {
        alert('Login failed');
      }
    }, error => {
      console.error('Login failed', error);
      alert('Login failed');
    });
  }

  redirectToSignUp() {
    this.router.navigate(['register']);
  }
}

