import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule,FormsModule,ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
visible: any = true;
loginObject : any = {
  username : '',
  password : ''
};


constructor(private authService:AuthService,private messageService:MessageService,private router:Router) { }


loginUser = async () => {
  try {
    const response = await this.authService.login(this.loginObject);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Welcome!', life: 3000 });
    setTimeout(()=>{
      this.visible = false;
      this.router.navigate(['/home']);
    },1000)
  } catch (error : any) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.msg, life: 3000 });
    console.log(error);  
  }
}
  

}
