import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../guards/auth.guard';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'menu',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../menu/menu.module').then(m => m.MenuPageModule)
          }
        ]
      },
      {
        path: 'plats',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../plats/plats.module').then(m => m.Tab2PageModule)
          },
          {
            path: 'ajouter',
            loadChildren: () =>
              import('../plats/ajouter/ajouter.module').then(m => m.AjouterPageModule)
          },
          {
            path: 'modifier/:id',
            loadChildren: () =>
              import('../plats/modifier/modifier.module').then(m => m.ModifierPageModule)
          },
          {
            path: 'details',
            loadChildren: () => import('../plats/details/details.module').then( m => m.DetailsPageModule)
          }
        ]
      },
      {
        path: 'restaurants',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../restaurants/restaurants.module').then(m => m.RestaurantsPageModule)
          },
          {
            path: 'ajouter',
            loadChildren: () =>
              import('../restaurants/ajouter-restaurant/ajouter-restaurant.module').then(m => m.AjouterRestaurantPageModule)
          },
          {
            path: 'modifier/:id',
            loadChildren: () =>
              import('../restaurants/modifier-restaurant/modifier-restaurant.module').then(m => m.ModifierRestaurantPageModule)
          },
          {
            path: 'details/:id',
            loadChildren: () =>
              import('../restaurants/details/details.module').then(m => m.DetailsPageModule)
          },
           {
              path: 'carte/:id',
              loadChildren: () => import('../carte/carte.module').then( m => m.CartePageModule)
            }
        ]
      },
      {
        path: 'compte',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../compte/tab3.module').then(m => m.Tab3PageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
