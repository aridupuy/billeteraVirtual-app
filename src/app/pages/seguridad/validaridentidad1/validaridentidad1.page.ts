import { QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CameraPreview } from '@ionic-native/camera-preview/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-validaridentidad1',
  templateUrl: './validaridentidad1.page.html',
  styleUrls: ['./validaridentidad1.page.scss'],
})
export class Validaridentidad1Page implements OnInit {
  smallPreview: boolean;
  IMAGE_PATH: any;
  colorEffect = 'none';
  setZoom = 2;
  flashMode = 'off';
  isToBack = true;

  constructor(private navCtrl: NavController, private cameraPreview: CameraPreview, private screenOrientation: ScreenOrientation, public route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE).then(
      () => {
        this.cameraPreview.startCamera({ x: 0, y: 0, width: window.screen.height, height: window.screen.width, previewDrag: true, camera: "rear", toBack: true });
      }
    );

  }
  ionViewDidEnter() {

    this.cameraPreview.show();
  }
  public ACTIVAR_TEST = false;
  takePicture() {
    console.log("aca1");
    if (!this.ACTIVAR_TEST)
      this.cameraPreview.takePicture({
        width: 1600,
        height: 768,
        quality: 80
      }).then((imageData) => {
        this.IMAGE_PATH = 'data:image/jpeg;base64,' + imageData;
        console.log(this.IMAGE_PATH);
        let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
        if (p == null)
          p = { foto_frente_dni: false };
        p["foto_frente_dni"] = this.IMAGE_PATH;
        this.cameraPreview.hide();
        const navigationExtras: NavigationExtras = {
          queryParams: {
            param: JSON.stringify(p)
          },
          replaceUrl: true
        };
        // this.cameraPreview.stopCamera(); 
        if (p.editar == true) {
          this.navCtrl.navigateRoot("revisarfotos", navigationExtras);
        }
        else {
          // this.navCtrl.navigateRoot("revisarfotos", navigationExtras); //temp
          this.navCtrl.navigateRoot("validaridentidad2", navigationExtras);
        }
      }, (err) => {
        console.log(err);
        this.IMAGE_PATH = 'assets/img/test.jpg';
      })
    if (this.ACTIVAR_TEST) {
      let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
      if (p == null)
        p = { foto_frente_dni: false };
     
      // this.cameraPreview.hide();
      console.log("aca1bis");
      const navigationExtras: NavigationExtras = {
        queryParams: {
          param: JSON.stringify(p)
        },
        replaceUrl: true
      };
      // this.cameraPreview.stopCamera(); 
      if (p.editar == true) {
        this.navCtrl.navigateRoot("revisarfotos", navigationExtras);
      }
      else {
        // this.navCtrl.navigateRoot("revisarfotos", navigationExtras); //temp
        this.navCtrl.navigateRoot("validaridentidad2", navigationExtras);
      }
    }


  }
  ngOnDestroy() {
    console.log("identidad1 onDestroy");

    // this.cameraPreview.stopCamera();
  }
  ionViewWillLeave() {

    // this.cameraPreview.hide();
    // this.cameraPreview.stopCamera();
    console.log("identidad1 camara apagada");
  }
  noPuedo() { }
}
