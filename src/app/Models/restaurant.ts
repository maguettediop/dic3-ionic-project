import { Plat } from './plat';
export class Restaurant {
	id: number;
    nom: string;
    location: string;
    plats: Plat[]= new Array(10);
}
