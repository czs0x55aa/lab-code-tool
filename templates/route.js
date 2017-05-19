.state('app.<< base_path >>.<< table_name >>', {
   url: '/<< table_name >>',
   title: '<< table_name >>',
   abstract: true,
   templateUrl: helper.basepath('<< base_path >>/home.html')
})
.state('app.<< base_path >>.<< table_name >>.list', {
    url: '/list',
    controller: '<< table_name >>Controller',
    templateUrl: helper.basepath('<< base_path >>/<< table_name >>.html'),
    resolve: helper.resolveFor('toaster', 'ngDialog')
})
.state('app.<< base_path >>.<< table_name >>.edit', {
    url: '/edit?ID',
    templateUrl: helper.basepath('<< base_path >>/<< table_name >>edit.html'),
    controller: '<< table_name >>EditController',
    resolve: helper.resolveFor('toaster', 'ngDialog', 'xeditable')
})
.state('app.<< base_path >>.<< table_name >>.view', {
  url: '/view?ID&type',
  templateUrl: helper.basepath('<< base_path >>/<< table_name >>View.html'),
  controller: '<< table_name >>ViewController',
  resolve: helper.resolveFor('toaster')
})
