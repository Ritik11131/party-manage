import { AuthService } from './../auth/auth.service';
import { PartyService } from './../party.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TableModule,RouterOutlet, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule, InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule, FormsModule, InputNumberModule,CheckboxModule],
  providers: [MessageService, ConfirmationService],
  styles: [
    `:host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }`
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  productDialog: boolean = false;
  columns: any[] = [];
  parties: any[] = [];
  fieldsToShow: any[] = [
    'id',
    'name',
    'company_name',
    'whatsapp_no',
    'email',
    'remark',
    'date_of_birth',
    'anniversary_date',
    'gstin',
    'pan_no',
    'apply_tds',
    'credit_limit',
    'login_access',
    'is_active'
  ];

  fieldDefinitions: { [key: string]: string } = {
    name: 'text',
    company_name: 'text',
    email: 'text',
    whatsapp_no: 'text',
    mobile_no: 'text',
    telephone_no: 'text',
    remark: 'text',
    date_of_birth: 'date',
    anniversary_date: 'date',
    gstin: 'text',
    pan_no: 'text',
    credit_limit: 'number',
    apply_tds: 'boolean',
    login_access: 'boolean',
  };


  formObject : any[] = [];
  form: any = [];
  payload: any = {
    name: '',
    company_name: '',
    email: '',
    whatsapp_no: '',
    mobile_no: '',
    telephone_no: '',
    remark: '',
    date_of_birth: '',
    anniversary_date: '',
    gstin: '',
    pan_no: '',
    credit_limit: '',
    apply_tds: false,
    login_access: false,
  };

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, public partyService: PartyService,private authService:AuthService) { }

  ngOnInit() {
    this.handleForm();
    this.loadParties();
  }


  handleForm = () => {
    this.formObject = Object.keys(this.fieldDefinitions).map(key => ({
      key,
      label: this.partyService.toTitleCase(key.replace(/_/g, ' ')), 
      type: this.fieldDefinitions[key]
    }));

    this.form = this.partyService.chunkArray(this.formObject, 3);   
  }


  logoutUser = async () => {
    await this.authService.logout();
  }

 

  

  loadParties = async () => {
    try {
      const response: any = await this.partyService.getAllParty();
      this.columns = Object.keys(response[0]).map((value: any) => {
        return this.fieldsToShow.includes(value) && { field: value, header: this.partyService.toTitleCase(value.replace(/_/g, ' ')) };
      })      
      this.parties = response;
    } catch (error) {
      console.error('Error loading parties:', error);
    }
  }

  addNewParty = async () => {
    let response : any;
    try {
      if(this.payload.id) {
        response = await this.partyService.updateParty(this.payload);
      } else {
        response = await this.partyService.addParty(this.payload);
      }
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.msg, life: 3000 });
      this.loadParties();
      this.productDialog = false;
    } catch (error) {
      console.error('Error adding party:', error);
    }
  }


  openNew() {
    this.productDialog = true;
  }

  editParty = async (party: any) => {
    this.productDialog = true;
    this.payload = party;
  }

  deleteParty = async (event: any, obj: any) => {
    console.log(obj);

    try {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + obj.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
          const response: any = await this.partyService.deleteParty(obj.id);
          await this.loadParties();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.msg, life: 3000 });
        }
      });

    } catch (error) {
      console.error('Error loading parties:', error);
    }
  }

  hideDialog() {
    this.productDialog = false;
  }

}
