import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-races',
  templateUrl: './races.page.html',
  styleUrls: ['./races.page.scss'],
})
export class RacesPage implements OnInit {
  nama = '';
  dataRaces: any;
  modalTambah: any;
  id: any;
  name: any;
  story: any;
  modalEdit: any;

  openModalEdit(isOpen: boolean, idget: any) {
    this.modalEdit = isOpen;
    this.id = idget;
    console.log(this.id);
    this.takeRaces(this.id);
    this.modalTambah = false;
    this.modalEdit = true;
  }

  resetModal() {
    this.id = null;
    this.name = '';
    this.story = '';
  }

  openModalTambah(isOpen: boolean) {
    this.modalTambah = isOpen;
    this.resetModal();
    this.modalTambah = true;
    this.modalEdit = false;
  }
  
  cancel() {
    this.modal.dismiss();
    this.modalTambah = false;
    this.modalEdit = false;
    this.resetModal();
  }

  constructor(private api: ApiService, private modal: ModalController, private authService: AuthenticationService, private router: Router) { this.nama = this.authService.nama }

  ngOnInit() {
    this.getRaces();
  }

  getRaces() {
    this.api.tampil('tampil.php').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.dataRaces = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  addRaces() {
    if (this.name != '' && this.story != '') {
      let data = {
        name: this.name,
        story: this.story,
      }
      this.api.tambah(data, 'tambah.php')
        .subscribe({
          next: (hasil: any) => {
            this.resetModal();
            console.log('berhasil tambah mainan');
            this.getRaces();
            this.modalTambah = false;
            this.modal.dismiss();
          },
          error: (err: any) => {
            console.log('gagal tambah mainan');
          }
        })
    } else {
      console.log('gagal tambah mainan karena masih ada data yg kosong');
    }
  }

  deleteRaces(id: any) {
    this.api.hapus(id,
      'hapus.php?id=').subscribe({
        next: (res: any) => {
          console.log('sukses', res);
          this.getRaces();
          console.log('berhasil hapus data');
        },
        error: (error: any) => {
          console.log('gagal');
        }
      })
  }

  takeRaces(id: any) {
    this.api.lihat(id,
      'lihat.php?id=').subscribe({
        next: (hasil: any) => {
          console.log('sukses', hasil);
          let races = hasil;
          this.id = races.id;
          this.name = races.name;
          this.story = races.story;
        },
        error: (error: any) => {
          console.log('gagal ambil data');
        }
      })
  }

  editRaces() {
    let data = {
      id: this.id,
      name: this.name,
      story: this.story
    }
    this.api.edit(data, 'edit.php')
      .subscribe({
        next: (hasil: any) => {
          console.log(hasil);
          this.resetModal();
          this.getRaces();
          console.log('berhasil edit mainan');
          this.modalEdit = false;
          this.modal.dismiss();
        },
        error: (err: any) => {
          console.log('gagal edit mainan');
        }
      })
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}