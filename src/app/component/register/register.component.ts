import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from '../../_service/master.service';
import { LoginUser } from '../../../_model/loginUser';
import { RegisterUser } from '../../../_model/regiterUser';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private router: Router, private masterService: MasterService) {}
  username: string = '';
  email: string = '';
  password: string = '';

  onRegister() {
    // Check if username or password is empty
    if (!this.username.trim()) {
      alert('Παρακαλώ εισάγετε ένα όνομα χρήστη');
      return;
    }
    if (!this.password.trim()) {
      alert('Παρακαλώ εισάγετε ένα κώδικο χρήστη');
      return;
    }

    const registerUser: RegisterUser = {
      username: this.username,
      password: this.password,
      email: this.email,
    };

    this.masterService.checkEmailExists(this.email).subscribe(
      (emailExists) => {
        if (emailExists) {
          alert('Το email χρησιμοποιείται ήδη. Παρακαλώ χρησιμοποιήστε διαφορετικό email.');
        } else {
          // Email is available, proceed with username check and registration as before
        }
      },
      (error) => {
        console.error('Error checking email availability', error);
        alert('An error occurred while checking email availability');
      }
    );

    // Check if the username already exists
    this.masterService.checkUsernameExists(this.username).subscribe(
      (exists) => {
        if (exists) {
          alert(
            'Το όνομα χρήστη υπάρχει ήδη. Παρακαλώ επιλέξτε ένα διαφορετικό όνομα χρήστη.'
          );
        } else {
          // Username is available, proceed with registration
          this.masterService
            .registerUser(registerUser)
            .pipe(
              tap((success) => {
                if (success) {
                  this.router.navigate(['login']);
                } else {
                  alert('Register failed');
                }
              }),
              catchError((error) => {
                console.error('Register failed', error);
                alert('Register failed');
                throw error;
              })
            )
            .subscribe();
        }
      },
      (error) => {
        console.error('Error checking username availability', error);
        alert('An error occurred while checking username availability');
      }
    );
  }
}
