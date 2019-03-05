import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes =
[
  {
    path: '',  pathMatch: 'full',
    loadChildren: './login/login.module#LoginModule',
    data: {
      customLayout: true
    }
  },
    {
      path: 'home',
      component: HomeComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'accordion',
      loadChildren: './+accordion/accordion.module#AccordionModule',
      data: {
        title: 'Accordion',
        canActivate: [AuthGuard]
      }
    }, {
      path: 'pivot',
      loadChildren: './+pivot/pivot.module#PivotModule',
      data: {
        title: 'Pivot',
        canActivate: [AuthGuard]
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
      children: [
        {
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
        }
      ]
    }, {
      path: 'boxs',
      data: {
        title: 'Boxs',
      },
      children: [
        {
          path: 'info-box',
          loadChildren: './+boxs/box-info/box-info.module#BoxInfoModule',
          data: {
            title: 'Info Box',
            canActivate: [AuthGuard]
          }
        }, {
          path: 'small-box',
          loadChildren: './+boxs/box-small/box-small.module#BoxSmallModule',
          data: {
            title: 'Small Box',
            canActivate: [AuthGuard]
          }
        }, {
          path: 'chart-box',
          loadChildren: './+boxs/box-chart/box-chart.module#BoxChartModule',
          data: {
            title: 'Chart Box',
            canActivate: [AuthGuard]
          }
        }
      ]
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
  },
  {
   path: 'chart',
   loadChildren: './+chart/chart.module#ChartModule',
   data: {
     title: 'Chart',
     canActivate: [AuthGuard]
   }
 },
 {
  path: 'exportexcel',
  loadChildren: './+export-excel/export-excel.module#ExportExcelModule',
  data: {
    title: 'Export Excel',
    canActivate: [AuthGuard]
  }
},
{
  path: 'grid',
  loadChildren: './+grid/grid.module#GridModule',
  data: {
    title: 'Grid',
    canActivate: [AuthGuard]
  }
},
{ path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
