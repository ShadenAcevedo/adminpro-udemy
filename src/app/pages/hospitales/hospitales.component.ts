import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  constructor(public hospitalService: HospitalService, public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();

    this.modalUploadService.notificacion.subscribe( () => this.cargarHospitales());
  }

  buscarHospital( termino: string ) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.hospitalService.buscarHospital(termino)
      .subscribe(hospitales => this.hospitales = hospitales);
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales()
      .subscribe(hospitales => {
        this.hospitales = hospitales;
      });
  }

  guardarHospital( hospital: Hospital ) {
    this.hospitalService.actualizarHospital(hospital).subscribe();
  }

  borrarHospital( hospital: Hospital ) {
    this.hospitalService.borrarHospital(hospital._id)
      .subscribe(() => this.cargarHospitales());
  }

  crearHospital() {
    swal({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerModel: true
    }).then((valor: string) => {
      if (!valor || valor.length === 0) {
        return;
      }

      this.hospitalService.crearHospital(valor)
        .subscribe( () => this.cargarHospitales());
    });
  }

  actualizarImagen( hospital: Hospital ) {
    this.modalUploadService.mostrarModal('hospitales', hospital._id);
  }

}
