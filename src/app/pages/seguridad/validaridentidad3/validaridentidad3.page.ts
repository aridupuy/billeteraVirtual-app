import { NavigationExtras, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CameraPreview } from '@ionic-native/camera-preview/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Platform } from '@ionic/angular';



@Component({
  selector: 'app-validaridentidad3',
  templateUrl: './validaridentidad3.page.html',
  styleUrls: ['./validaridentidad3.page.scss'],
})
export class Validaridentidad3Page implements OnInit {
  smallPreview: boolean;
  IMAGE_PATH: any;
  colorEffect = 'none';
  setZoom = 1;
  flashMode = 'off';
  isToBack = true;
  constructor(private navCtrl: NavController, private cameraPreview: CameraPreview, private screenOrientation: ScreenOrientation, public route: ActivatedRoute, public router: Router, protected platform: Platform) { }


  ngOnInit() {

    // document.querySelectorAll("#fot2").forEach((view)=>{
    //   view.setAttribute("style","display:none");
    // });
  }
  async ionViewDidEnter() {
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
    console.log("enter view 3");
    await this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then(async () => {
      await this.cameraPreview.startCamera({ x: 0, y: 0, width: width, height: heigth, previewDrag: true, camera: "front", toBack: true });
      // this.cameraPreview.switchCamera();
      await this.cameraPreview.show();
    });
  }
  public ACTIVAR_TEST = false;
  public mostrar = true;
  takePicture() {
    console.log("aca3");
    if (!this.ACTIVAR_TEST) {
      console.log("aca3Camara");
      this.cameraPreview.takePicture({
        width: 1600,
        height: 768,
        quality: 80
      }).then((imageData) => {
        this.IMAGE_PATH = 'data:image/jpeg;base64,' + imageData;
        let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
        if (p == null)
          p = { foto_frente: false };
        p["foto_frente"] = this.IMAGE_PATH;

        const navigationExtras: NavigationExtras = {
          queryParams: {
            param: JSON.stringify(p)
          }
        };
        this.cameraPreview.stopCamera();
        
        if (p.reintentar == true) {
          return this.navCtrl.navigateRoot("procesarfotos", navigationExtras);
        }
        if (p.revalidar == true) {
          return this.navCtrl.navigateRoot("validaridentidad4", navigationExtras);
          
        }
        if (p.editar == true) {
          this.navCtrl.navigateRoot("revisarfotos", navigationExtras);
          return;
        }
        else {
          this.cameraPreview.hide();
          this.cameraPreview.stopCamera();
          this.navCtrl.navigateRoot("validaridentidad4", navigationExtras);
          // this.navCtrl.navigateRoot("revisarfotos", );
        }
      });
    }

    if (this.ACTIVAR_TEST) {
      console.log("aca3bis");
      let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
      if (p == null)
        p = { foto_frente: false };

      const navigationExtras: NavigationExtras = {
        queryParams: {
          param: JSON.stringify(p)
        },
        replaceUrl: true
      };
      if (p.editar == true) {
        this.navCtrl.navigateRoot("revisarfotos", navigationExtras);
      }
      else {
        this.navCtrl.navigateRoot("validaridentidad4", navigationExtras);
        return false;
      }
    }
    //esto va!

  }
  // public mostrar = true;
  // ngOnDestroy() {
  //   this.cameraPreview.stopCamera();
  // }
  ionViewWillLeave() {
    this.cameraPreview.hide();
    this.cameraPreview.stopCamera();
    this.screenOrientation.unlock();
    console.log("identidad3 camara apagada");
  }
}
