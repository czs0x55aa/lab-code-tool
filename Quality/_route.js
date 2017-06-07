.state('app.Quality.StripsProcessTest', {
   url: '/StripsProcessTest',
   title: 'StripsProcessTest',
   abstract: true,
   templateUrl: helper.basepath('Quality/home.html')
})
.state('app.Quality.StripsProcessTest.list', {
    url: '/list',
    controller: 'StripsProcessTestController',
    templateUrl: helper.basepath('Quality/StripsProcessTest.html'),
    resolve: helper.resolveFor('toaster', 'ngDialog')
})
.state('app.Quality.StripsProcessTest.edit', {
    url: '/edit?ID',
    templateUrl: helper.basepath('Quality/StripsProcessTestedit.html'),
    controller: 'StripsProcessTestEditController',
    resolve: helper.resolveFor('toaster', 'ngDialog', 'xeditable', 'ui.select', 'moment')
})
.state('app.Quality.StripsProcessTest.view', {
  url: '/view?ID&type',
  templateUrl: helper.basepath('Quality/StripsProcessTestView.html'),
  controller: 'StripsProcessTestViewController',
  resolve: helper.resolveFor('toaster')
})
﻿.state('app.Quality.TobaccoProcessTest', {
   url: '/TobaccoProcessTest',
   title: 'TobaccoProcessTest',
   abstract: true,
   templateUrl: helper.basepath('Quality/home.html')
})
.state('app.Quality.TobaccoProcessTest.list', {
    url: '/list',
    controller: 'TobaccoProcessTestController',
    templateUrl: helper.basepath('Quality/TobaccoProcessTest.html'),
    resolve: helper.resolveFor('toaster', 'ngDialog')
})
.state('app.Quality.TobaccoProcessTest.edit', {
    url: '/edit?ID',
    templateUrl: helper.basepath('Quality/TobaccoProcessTestedit.html'),
    controller: 'TobaccoProcessTestEditController',
    resolve: helper.resolveFor('toaster', 'ngDialog', 'xeditable', 'ui.select', 'moment')
})
.state('app.Quality.TobaccoProcessTest.view', {
  url: '/view?ID&type',
  templateUrl: helper.basepath('Quality/TobaccoProcessTestView.html'),
  controller: 'TobaccoProcessTestViewController',
  resolve: helper.resolveFor('toaster')
})