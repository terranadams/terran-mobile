import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AccelaService } from './accela.service';
import { AnimationController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-accela',
  templateUrl: './accela.page.html',
  styleUrls: ['./accela.page.scss'],
})
export class AccelaPage implements OnInit {
  @ViewChild('content', { read: ElementRef, static: true })
  content!: ElementRef;

  constructor(
    public accelaService: AccelaService,
    private animationCtrl: AnimationController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.getAccessToken();
  }

  getAccessToken() {
    this.loadingCtrl
      .create({ message: 'Getting Access Token...' })
      .then((loadingEl) => {
        loadingEl.present();

        this.accelaService.getAccessToken().subscribe(
          (response: any) => {
            this.accelaService.accessToken = response.access_token;
            console.log(`Access token: ${this.accelaService.accessToken}`);
            loadingEl.dismiss();
            this.getRecords();
          },
          (error) => {
            console.error('Error:', error);
            loadingEl.dismiss();
          }
        );
      });
  }

  getRecords() {
    this.loadingCtrl
      .create({ message: 'Getting Some Records...' })
      .then((loadingEl) => {
        loadingEl.present();

        this.accelaService.getRecords(this.accelaService.accessToken).subscribe(
          (response) => {
            if (response && response.result && response.result.length > 0) {
              this.accelaService.recordsArray = response.result.map((record: any) => ({
                name: record.name,
                value: record.value,
                assignedUser: record.assignedUser,
              }));
              console.log(response)
              loadingEl.dismiss();
            } else {
              console.log('No records found.');
              loadingEl.dismiss();
            }
          },
          (error) => {
            console.error('Error:', error);
            loadingEl.dismiss();
          }
        );
      });
  }

  ionViewWillEnter() {
    const animation = this.animationCtrl
      .create()
      .addElement(this.content.nativeElement)
      .duration(200)
      .fromTo('opacity', 0, 1);
    animation.play();
  }
}
