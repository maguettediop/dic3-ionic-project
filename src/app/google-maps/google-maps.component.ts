import { Component, Input, Renderer2, ElementRef, OnInit , Inject , NgZone} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Plugins } from '@capacitor/core';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

const { Geolocation, Network } = Plugins;

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent implements OnInit {

  @Input('apiKey') apiKey: string;
  @Input('adress') adress: string;
    public map: any;
    public markers: any[] = [];
    private mapsLoaded: boolean = false;
    private networkHandler = null;
    //public nativeGeocoder: NativeGeocoder;
    //public ngZone: NgZone;
    public lat: any;  public lng: any;

    constructor(private nativeGeocoder: NativeGeocoder, private ngZone: NgZone, private renderer: Renderer2, private element: ElementRef, @Inject(DOCUMENT) private _document){

    }

    ngOnInit(){

        this.init().then((res) => {
            console.log("Google Maps ready.")
        }, (err) => {    
            console.log(err);
        });

    }

    private init(): Promise<any> {

        return new Promise((resolve, reject) => {

            this.loadSDK().then((res) => {

                this.initMap().then((res) => {
                    resolve(true);
                }, (err) => {
                    reject(err);
                });

            }, (err) => {

                reject(err);

            });

        });

    }

    private loadSDK(): Promise<any> {

        console.log("Loading Google Maps SDK");

        return new Promise((resolve, reject) => {

            if(!this.mapsLoaded){

                Network.getStatus().then((status) => {

                    if(status.connected){

                        this.injectSDK().then((res) => {
                            resolve(true);
                        }, (err) => {
                            reject(err);
                        });

                    } else {

                        if(this.networkHandler == null){

                            this.networkHandler = Network.addListener('networkStatusChange', (status) => {

                                if(status.connected){

                                    this.networkHandler.remove();

                                    this.init().then((res) => {
                                        console.log("Google Maps ready.")
                                    }, (err) => {    
                                        console.log(err);
                                    });

                                }

                            });

                        }

                        reject('Not online');
                    }

                }, (err) => {

                    // NOTE: navigator.onLine temporarily required until Network plugin has web implementation
                    if(navigator.onLine){

                        this.injectSDK().then((res) => {
                            resolve(true);
                        }, (err) => {
                            reject(err);
                        });

                    } else {
                        reject('Not online');
                    }

                });

            } else {
                reject('SDK already loaded');
            }

        });


    }

    private injectSDK(): Promise<any> {

        return new Promise((resolve, reject) => {

            window['mapInit'] = () => {
                this.mapsLoaded = true;
                resolve(true);
            }

            let script = this.renderer.createElement('script');
            script.id = 'googleMaps';

            if(this.apiKey){
                script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
            } else {
                script.src = 'https://maps.googleapis.com/maps/api/js?callback=mapInit';       
            }

            this.renderer.appendChild(this._document.body, script);

        });

    }

    private initMap(): Promise<any> {

        return new Promise((resolve, reject) => {

            Geolocation.getCurrentPosition().then((position) => {

                console.log(position);
                let lat = position.coords.latitude;
            	let lng = position.coords.longitude;
                let latLng = new google.maps.LatLng(lat, lng);

                let mapOptions = {
                    zoom: 14,
                    center: latLng,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
               		 mapTypeControl: false
                };

                this.map = new google.maps.Map(this.element.nativeElement, mapOptions);
                this.geocode();
                this.addMyPosition(latLng);
                this.addRestoPosition();
                resolve(true);

            }, (err) => {

                reject('Could not initialise map');

            });

        });

    }

   /* addHousePosition() {
        const icon = this.baseUrl + 'home-address.svg';
        const latLng = new google.maps.LatLng(4.068998, 9.7118953);
        const marker = new google.maps.Marker({
            map: this.map,
            position: latLng,
            animation: google.maps.Animation.DROP,
            title: 'House position',
            icon: {
                url: icon,
                size: new google.maps.Size(32, 32),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(16, 16),
                scaledSize: new google.maps.Size(32, 32)
            }
        });
        this.addInfoWindowToMarker(marker);
    }*/
    public addMarker(lat: number, lng: number): void {

        let latLng = new google.maps.LatLng(lat, lng);

        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latLng
        });

        this.markers.push(marker);

    }
       addMyPosition(latLng) {
        const marker = new google.maps.Marker({
            map: this.map,
            position: latLng,
            animation: google.maps.Animation.DROP,
            title: 'Ma position'
        });
        this.addInfoWindowToMarker(marker);
    }
    addRestoPosition() {

        const icon = 'assets/restaurant.svg';
        const latLng = new google.maps.LatLng(this.lat,this.lng);
        const marker = new google.maps.Marker({
            map: this.map,
            position: latLng,
            animation: google.maps.Animation.DROP,
            title: 'Resto position',
            icon: {
                url: icon,
                size: new google.maps.Size(32, 32),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(16, 16),
                scaledSize: new google.maps.Size(32, 32)
            }
        });
        this.addInfoWindowToMarker(marker);
    }
    addInfoWindowToMarker(marker) {
        const infoWindowContent = '<div id="content">' + marker.title + '</div>';
        const infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent
        });
        marker.addListener('click', () => {
            infoWindow.open(this.map, marker);
        });
    }

    geocode()
    {
    	this.nativeGeocoder.forwardGeocode(this.adress, {  useLocale: true,
    maxResults: 5 })
        .then((result: NativeGeocoderResult[]) => {
          this.ngZone.run(() => {
            this.lat = parseFloat(result[0].latitude);
            this.lng = parseFloat(result[0].longitude);
            console.log(this.lat+ this.lng);
          })
          let showingCurrent = false;
        })
        .catch((error: any) => console.log(error));

    }
}
