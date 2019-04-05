import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    loadChildren: './login/login.module#LoginModule',
    data: {
      customLayout: true
    }
  },
  {
    path: 'tabs',
    loadChildren: './+tabs/tabs.module#TabsModule',
    data: {
      title: 'Tabs',
      canActivate: [AuthGuard]
    }
  },

  {
    path: 'layout',
    data: {
      title: 'Layout',
    },
    children: [{
      path: 'configuration',
      loadChildren: './+layout/configuration/configuration.module#ConfigurationModule',
      data: {
        title: 'Configuration'
      }
    }, {
      path: 'custom',
      loadChildren: './+layout/custom/custom.module#CustomModule',
      data: {
        title: 'Disable Layout'
        // disableLayout: true
      }
    }, {
      path: 'content',
      loadChildren: './+layout/content/content.module#ContentModule',
      data: {
        title: 'Content'
      }
    }, {
      path: 'header',
      loadChildren: './+layout/header/header.module#HeaderModule',
      data: {
        title: 'Header'
      }
    }, {
      path: 'sidebar-left',
      loadChildren: './+layout/sidebar-left/sidebar-left.module#SidebarLeftModule',
      data: {
        title: 'Sidebar Left'
      }
    }, {
      path: 'sidebar-right',
      loadChildren: './+layout/sidebar-right/sidebar-right.module#SidebarRightModule',
      data: {
        title: 'Sidebar Right'
      }
    }]
  },
  {
    path: 'register',
    loadChildren: './register/register.module#RegisterModule',
    data: {
      customLayout: true
    }
  },
  {
    path: 'profile',
    loadChildren: './+profile/profile.module#ProfileModule',
    data: {
      title: 'Profile',
      canActivate: [AuthGuard]
    }
  }, {
    path: 'precios',
    loadChildren: './precios/precios.module#PreciosModule',
    data: {
      title: 'Precios',
      canActivate: [AuthGuard]
    }
  },
  {
    path: '**',
    redirectTo: 'precios/lista',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
