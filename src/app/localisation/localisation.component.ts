import { Component, OnInit, NgZone } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
const { Geolocation, Toast } = Plugins;


@Component({
  selector: 'app-localisation',
  templateUrl: './localisation.component.html',
  styleUrls: ['./localisation.component.scss'],
})
export class LocalisationComponent implements OnInit {

   public lat: any;
  public lng: any;
  showingCurrent: boolean = true;
  address: string;
  constructor(private nativeGeocoder: NativeGeocoder, private ngZone: NgZone) { }

  ngOnInit() {
    this.setCurrentPosition();
  }

  async setCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.ngZone.run(() => {
      this.lat = coordinates.coords.latitude;
      this.lng = coordinates.coords.longitude;
    })
    this.showingCurrent = true;
  }

  async geocode() {
    if (this.address != "") {
      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
      };
      this.nativeGeocoder.forwardGeocode(this.address, options)
        .then((result: NativeGeocoderResult[]) => {
          this.ngZone.run(() => {
            this.lat = parseFloat(result[0].latitude);
            this.lng = parseFloat(result[0].longitude);
            // this.myMap.triggerResize()
            //   .then(() => (this.myMap as any)._mapsWrapper.setCenter({ lat: this.lat, lng: this.lng }));
          })
          this.showingCurrent = false;
        })
        .catch((error: any) => console.log(error));
    }
    else {
      await Toast.show({
        text: 'Please add address to Geocode'
      });
    }
  }

}
