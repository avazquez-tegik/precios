export const adminLteConf = {
  skin: 'blue',
  isSidebarLeftCollapsed: true,
  // isSidebarLeftExpandOnOver: true,
  // isSidebarLeftMouseOver: false,
  // isSidebarLeftMini: true,
  // sidebarRightSkin: 'black',
  // isSidebarRightCollapsed: true,
  // isSidebarRightOverContent: true,
  // layout: 'normal',
  sidebarLeftMenu: [
    {label: 'CONTENIDO', separator: true},
    {label: 'Accordion', route: 'accordion', iconClasses: 'fa fa-tasks'},
    {label: 'Tabla Pivote', route: 'pivot', iconClasses: 'fa fa-bar-chart'},
    {label: 'Grafica', route: 'chart', iconClasses: 'fa fa-pie-chart'},
    {label: 'Reporte Excel', route: 'exportexcel', iconClasses: 'fa fa-mail-forward'},
    {label: 'Grid', route: 'grid', iconClasses: 'fa fa-th'},
    {label: 'Widgets', iconClasses: 'glyphicon glyphicon-th-large', children: [
        {label: 'Info Box', route: 'boxs/info-box'},
        {label: 'Small Box', route: 'boxs/small-box'},
        {label: 'Chart Box', route: 'boxs/chart-box'}
      ]},

      {label: 'Tabs', route: 'tabs', iconClasses: 'fa fa fa-th-list'},
      {label: 'Login', route: '/', iconClasses: 'fa fa-user'},
      {label: 'Register', route: 'register', iconClasses: 'fa fa-vcard-o'},
  ]
};
