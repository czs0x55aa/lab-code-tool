.state('app.YbTest.YbTestMain', {
   url: '/YbTestMain',
   title: 'YbTestMain',
   abstract: true,
   templateUrl: helper.basepath('YbTest/home.html')
})
.state('app.YbTest.YbTestMain.list', {
    url: '/list',
    controller: 'YbTestMainController',
    templateUrl: helper.basepath('YbTest/YbTestMain.html'),
    resolve: helper.resolveFor('toaster', 'ngDialog')
})
.state('app.YbTest.YbTestMain.edit', {
    url: '/edit?ID', 
    templateUrl: helper.basepath('YbTest/YbTestMainEdit.html'),
    controller: 'YbTestMainEditController', 
    resolve: helper.resolveFor('toaster', 'ngDialog', 'xeditable')
})