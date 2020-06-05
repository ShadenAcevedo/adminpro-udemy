import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import {
  SidebarService,
  SharedService,
  SettingsService,
  UsuarioService,
  LoginGuardGuard,
  SubirArchivoService,
} from './service.index';

@NgModule({
  declarations: [],
  providers: [
    SidebarService,
    SharedService,
    SettingsService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadService
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServiceModule { }
