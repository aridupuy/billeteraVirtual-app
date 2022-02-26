import { async } from 'rxjs';
import { Platform } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CameraPreview } from '@ionic-native/camera-preview/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-validaridentidad4',
  templateUrl: './validaridentidad4.page.html',
  styleUrls: ['./validaridentidad4.page.scss'],
})
export class Validaridentidad4Page implements OnInit {
  smallPreview: boolean;
  IMAGE_PATH: any;
  colorEffect = 'none';
  setZoom = 1;
  flashMode = 'off';
  isToBack = true;
  constructor(private navCtrl: NavController, private cameraPreview: CameraPreview, private screenOrientation: ScreenOrientation, public route: ActivatedRoute, public router: Router, protected platform: Platform) { }


  ngOnInit() {
    // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    // document.querySelectorAll("#fot2").forEach((view)=>{
    //   view.setAttribute("style","display:none");
    // });
  }
  async ionViewDidEnter() {
    console.log("enter view 4");
    let width;
    let heigth;
    if (this.platform.isLandscape()) {
      width = window.screen.height;
      heigth = window.screen.width;
    }
    else if (this.platform.isPortrait()) {
      heigth = window.screen.height;
      width = window.screen.width;
    }
    await this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then(async () => {
      await this.cameraPreview.startCamera({ x: 0, y: 0, width: width, height: heigth, previewDrag: true, camera: "front", toBack: true });
      // this.cameraPreview.switchCamera();
      await this.cameraPreview.show();
    });

  }
  public ACTIVAR_TEST = false;
  takePicture() {
    console.log("aca4");
    this.cameraPreview.takePicture({
      width: 1600,
      height: 768,
      quality: 80
    }).then((imageData) => {
      this.IMAGE_PATH = 'data:image/jpeg;base64,' + imageData;
      let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
      if (p == null)
        p = { foto_frente_con_dni: false };
      p["foto_frente_con_dni"] = this.IMAGE_PATH;

      const navigationExtras: NavigationExtras = {
        queryParams: {
          param: JSON.stringify(p)
        }
      };
      // this.cameraPreview.stopCamera();
      if (p.reintentar == true) {
        return this.navCtrl.navigateRoot("procesarfotos", navigationExtras);
      }
      if (p.revalidar == true) {
        return this.navCtrl.navigateRoot("procesarfotos", navigationExtras);
      }
      if (p.editar == true) {
        this.navCtrl.navigateRoot("revisarfotos", navigationExtras);
      }
      else {
        // this.cameraPreview.hide();
        this.navCtrl.navigateRoot("revisarfotos", navigationExtras);
        // this.navCtrl.navigateRoot("revisarfotos", );
      }
    }, (err) => {
      console.log(err);
      this.IMAGE_PATH = 'assets/img/test.jpg';
    });
    if (this.ACTIVAR_TEST) {
      let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
      if (p == null)
        p = { foto_frente_con_dni: false };

      // this.cameraPreview.hide();
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
        this.navCtrl.navigateRoot("revisarfotos", navigationExtras);
      }
    }
  }
  // ngOnDestroy() {
  //   this.cameraPreview.stopCamera();
  // }
  public visible = true;
  ionViewWillLeave() {
    this.cameraPreview.hide();
    this.cameraPreview.stopCamera();
    this.visible = false;
    console.log("identidad4 camara apagada");
  }
}
