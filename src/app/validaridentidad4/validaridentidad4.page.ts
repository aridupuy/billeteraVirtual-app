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
  constructor(private navCtrl: NavController, private cameraPreview: CameraPreview, private screenOrientation: ScreenOrientation, public route: ActivatedRoute, public router: Router) { }


  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    // document.querySelectorAll("#fot2").forEach((view)=>{
    //   view.setAttribute("style","display:none");
    // });
  }
  ionViewDidEnter() {
    this.cameraPreview.startCamera({x: 0, y: 0, width: window.screen.width, height: window.screen.height, previewDrag: true, camera: "front",toBack: true});
    this.cameraPreview.switchCamera();
    this.cameraPreview.show(); 
  }

  takePicture() {
    this.cameraPreview.takePicture({
      width: 1280,
      height: 640,
      quality: 100,
    }).then((imageData) => {
      this.IMAGE_PATH = 'data:image/jpeg;base64,' + imageData;
      let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
      if(p==null)
      p={foto_frente:false};
      p["foto_frente_con_dni"] = this.IMAGE_PATH;

      const navigationExtras: NavigationExtras = {
        queryParams: {
          param: JSON.stringify(p)
        }
      };
      // this.cameraPreview.stopCamera();
      if (p.editar == true) {
        this.navCtrl.navigateRoot("revisarfotos", navigationExtras);
      }
      else {
        // this.cameraPreview.hide();
        this.navCtrl.navigateRoot("revisarfotos",navigationExtras);
        // this.navCtrl.navigateRoot("revisarfotos", );
      }
    }, (err) => {
      console.log(err);
      this.IMAGE_PATH = 'assets/img/test.jpg';
    });
  }
  // ngOnDestroy() {
  //   this.cameraPreview.stopCamera();
  // }
  public visible = true;
  ionViewWillLeave(){
    this.cameraPreview.hide();
    this.cameraPreview.stopCamera();
    this.visible = false;
    console.log("identidad4 camara apagada");
  }
}
