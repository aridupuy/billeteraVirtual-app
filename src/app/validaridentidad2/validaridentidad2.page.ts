import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CameraPreview } from '@ionic-native/camera-preview/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';


@Component({
  selector: 'app-validaridentidad2',
  templateUrl: './validaridentidad2.page.html',
  styleUrls: ['./validaridentidad2.page.scss'],
})
export class Validaridentidad2Page implements OnInit {
  smallPreview: boolean;
  IMAGE_PATH: any;
  colorEffect = 'none';
  setZoom = 1;
  flashMode = 'off';
  isToBack = true;
  constructor(private navCtrl: NavController, private cameraPreview: CameraPreview, private screenOrientation: ScreenOrientation, public route: ActivatedRoute, public router: Router) { }


  ngOnInit() {
    console.log("identidad 2 onInit");
    // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

  }
  ionViewDidEnter() {

    // document.querySelectorAll("#fot1").forEach((view)=>{
    //   view.setAttribute("style","display:none");
    // });
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE).then(
      () => {
        console.log("identidad 2 ViewDidEnter");
        let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
        if (p.editar == true) {
          this.cameraPreview.startCamera({ x: 0, y: 0, width: window.screen.height, height: window.screen.width, previewDrag: true, camera: "rear", toBack: true });
        }
        this.cameraPreview.show();
      }
    );


  }
  public ACTIVAR_TEST = false;
  takePicture() {
    console.log("aca2");
    if (!this.ACTIVAR_TEST){
      this.cameraPreview.takePicture({
        width: 1280,
        height: 640,
        quality: 100
      }).then((imageData) => {
        this.cameraPreview.stopCamera();
        this.IMAGE_PATH = 'data:image/jpeg;base64,' + imageData;
        console.log(this.IMAGE_PATH);
        let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
        if (p == null)
          p = { foto_dorso_dni: false };
        p["foto_dorso_dni"] = this.IMAGE_PATH;
        // this.cameraPreview.hide();
        // this.cameraPreview.stopCamera();
        const navigationExtras: NavigationExtras = {
          queryParams: {
            param: JSON.stringify(p)
          }
        };

        if (p.editar == true) {
          this.navCtrl.navigateRoot("revisarfotos", navigationExtras);
        }
        else {
          this.navCtrl.navigateRoot("validaridentidad3", navigationExtras);
        }
      }, (err) => {
        console.log(err+" aca");
        this.IMAGE_PATH = 'assets/img/test.jpg';
      })
    }
    if (this.ACTIVAR_TEST) {
      console.log("aca2bis");
      let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
      if (p == null)
        p = { foto_dorso_dni: false };
     
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
        this.navCtrl.navigateRoot("validaridentidad3", navigationExtras);
        return true;
      }
    }
  }
  ngOnDestroy() {
    // this.cameraPreview.stopCamera();
  }
  ionViewWillLeave() {


    // this.cameraPreview.hide();
    // this.cameraPreview.stopCamera();
    console.log("identidad2 camara apagada");

  }
  noPuedo() { }
}
