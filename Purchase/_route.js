.state('app.Purchase.CaboPurchaseApprove', {
   url: '/CaboPurchaseApprove',
   title: 'CaboPurchaseApprove',
   abstract: true,
   templateUrl: helper.basepath('Purchase/home.html')
})
.state('app.Purchase.CaboPurchaseApprove.list', {
    url: '/list',
    controller: 'CaboPurchaseApproveController',
    templateUrl: helper.basepath('Purchase/CaboPurchaseApprove.html'),
    resolve: helper.resolveFor('toaster', 'ngDialog')
})
.state('app.Purchase.CaboPurchaseApprove.edit', {
    url: '/edit?ID',
    templateUrl: helper.basepath('Purchase/CaboPurchaseApproveedit.html'),
    controller: 'CaboPurchaseApproveEditController',
    resolve: helper.resolveFor('toaster', 'ngDialog', 'xeditable')
})
﻿.state('app.Purchase.CooperPurchaseApprove', {
   url: '/CooperPurchaseApprove',
   title: 'CooperPurchaseApprove',
   abstract: true,
   templateUrl: helper.basepath('Purchase/home.html')
})
.state('app.Purchase.CooperPurchaseApprove.list', {
    url: '/list',
    controller: 'CooperPurchaseApproveController',
    templateUrl: helper.basepath('Purchase/CooperPurchaseApprove.html'),
    resolve: helper.resolveFor('toaster', 'ngDialog')
})
.state('app.Purchase.CooperPurchaseApprove.edit', {
    url: '/edit?ID',
    templateUrl: helper.basepath('Purchase/CooperPurchaseApproveedit.html'),
    controller: 'CooperPurchaseApproveEditController',
    resolve: helper.resolveFor('toaster', 'ngDialog', 'xeditable')
})
﻿.state('app.Purchase.EstimateInInventory', {
   url: '/EstimateInInventory',
   title: 'EstimateInInventory',
   abstract: true,
   templateUrl: helper.basepath('Purchase/home.html')
})
.state('app.Purchase.EstimateInInventory.list', {
    url: '/list',
    controller: 'EstimateInInventoryController',
    templateUrl: helper.basepath('Purchase/EstimateInInventory.html'),
    resolve: helper.resolveFor('toaster', 'ngDialog')
})
.state('app.Purchase.EstimateInInventory.edit', {
    url: '/edit?ID',
    templateUrl: helper.basepath('Purchase/EstimateInInventoryedit.html'),
    controller: 'EstimateInInventoryEditController',
    resolve: helper.resolveFor('toaster', 'ngDialog', 'xeditable')
})
﻿.state('app.Purchase.GoodsStock', {
   url: '/GoodsStock',
   title: 'GoodsStock',
   abstract: true,
   templateUrl: helper.basepath('Purchase/home.html')
})
.state('app.Purchase.GoodsStock.list', {
    url: '/list',
    controller: 'GoodsStockController',
    templateUrl: helper.basepath('Purchase/GoodsStock.html'),
    resolve: helper.resolveFor('toaster', 'ngDialog')
})
.state('app.Purchase.GoodsStock.edit', {
    url: '/edit?ID',
    templateUrl: helper.basepath('Purchase/GoodsStockedit.html'),
    controller: 'GoodsStockEditController',
    resolve: helper.resolveFor('toaster', 'ngDialog', 'xeditable')
})
﻿.state('app.Purchase.IndustryCommMaterial', {
   url: '/IndustryCommMaterial',
   title: 'IndustryCommMaterial',
   abstract: true,
   templateUrl: helper.basepath('Purchase/home.html')
})
.state('app.Purchase.IndustryCommMaterial.list', {
    url: '/list',
    controller: 'IndustryCommMaterialController',
    templateUrl: helper.basepath('Purchase/IndustryCommMaterial.html'),
    resolve: helper.resolveFor('toaster', 'ngDialog')
})
.state('app.Purchase.IndustryCommMaterial.edit', {
    url: '/edit?ID',
    templateUrl: helper.basepath('Purchase/IndustryCommMaterialedit.html'),
    controller: 'IndustryCommMaterialEditController',
    resolve: helper.resolveFor('toaster', 'ngDialog', 'xeditable')
})
﻿.state('app.Purchase.IndustryCommPrice', {
   url: '/IndustryCommPrice',
   title: 'IndustryCommPrice',
   abstract: true,
   templateUrl: helper.basepath('Purchase/home.html')
})
.state('app.Purchase.IndustryCommPrice.list', {
    url: '/list',
    controller: 'IndustryCommPriceController',
    templateUrl: helper.basepath('Purchase/IndustryCommPrice.html'),
    resolve: helper.resolveFor('toaster', 'ngDialog')
})
.state('app.Purchase.IndustryCommPrice.edit', {
    url: '/edit?ID',
    templateUrl: helper.basepath('Purchase/IndustryCommPriceedit.html'),
    controller: 'IndustryCommPriceEditController',
    resolve: helper.resolveFor('toaster', 'ngDialog', 'xeditable')
})
﻿.state('app.Purchase.IndustryCommProtocol', {
   url: '/IndustryCommProtocol',
   title: 'IndustryCommProtocol',
   abstract: true,
   templateUrl: helper.basepath('Purchase/home.html')
})
.state('app.Purchase.IndustryCommProtocol.list', {
    url: '/list',
    controller: 'IndustryCommProtocolController',
    templateUrl: helper.basepath('Purchase/IndustryCommProtocol.html'),
    resolve: helper.resolveFor('toaster', 'ngDialog')
})
.state('app.Purchase.IndustryCommProtocol.edit', {
    url: '/edit?ID',
    templateUrl: helper.basepath('Purchase/IndustryCommProtocoledit.html'),
    controller: 'IndustryCommProtocolEditController',
    resolve: helper.resolveFor('toaster', 'ngDialog', 'xeditable')
})
﻿.state('app.Purchase.LocalArrivalRecords', {
   url: '/LocalArrivalRecords',
   title: 'LocalArrivalRecords',
   abstract: true,
   templateUrl: helper.basepath('Purchase/home.html')
})
.state('app.Purchase.LocalArrivalRecords.list', {
    url: '/list',
    controller: 'LocalArrivalRecordsController',
    templateUrl: helper.basepath('Purchase/LocalArrivalRecords.html'),
    resolve: helper.resolveFor('toaster', 'ngDialog')
})
.state('app.Purchase.LocalArrivalRecords.edit', {
    url: '/edit?ID',
    templateUrl: helper.basepath('Purchase/LocalArrivalRecordsedit.html'),
    controller: 'LocalArrivalRecordsEditController',
    resolve: helper.resolveFor('toaster', 'ngDialog', 'xeditable')
})
﻿.state('app.Purchase.MaterialTransport', {
   url: '/MaterialTransport',
   title: 'MaterialTransport',
   abstract: true,
   templateUrl: helper.basepath('Purchase/home.html')
})
.state('app.Purchase.MaterialTransport.list', {
    url: '/list',
    controller: 'MaterialTransportController',
    templateUrl: helper.basepath('Purchase/MaterialTransport.html'),
    resolve: helper.resolveFor('toaster', 'ngDialog')
})
.state('app.Purchase.MaterialTransport.edit', {
    url: '/edit?ID',
    templateUrl: helper.basepath('Purchase/MaterialTransportedit.html'),
    controller: 'MaterialTransportEditController',
    resolve: helper.resolveFor('toaster', 'ngDialog', 'xeditable')
})
﻿.state('app.Purchase.OtherInInventory', {
   url: '/OtherInInventory',
   title: 'OtherInInventory',
   abstract: true,
   templateUrl: helper.basepath('Purchase/home.html')
})
.state('app.Purchase.OtherInInventory.list', {
    url: '/list',
    controller: 'OtherInInventoryController',
    templateUrl: helper.basepath('Purchase/OtherInInventory.html'),
    resolve: helper.resolveFor('toaster', 'ngDialog')
})
.state('app.Purchase.OtherInInventory.edit', {
    url: '/edit?ID',
    templateUrl: helper.basepath('Purchase/OtherInInventoryedit.html'),
    controller: 'OtherInInventoryEditController',
    resolve: helper.resolveFor('toaster', 'ngDialog', 'xeditable')
})
﻿.state('app.Purchase.RemoteArrivalRecords', {
   url: '/RemoteArrivalRecords',
   title: 'RemoteArrivalRecords',
   abstract: true,
   templateUrl: helper.basepath('Purchase/home.html')
})
.state('app.Purchase.RemoteArrivalRecords.list', {
    url: '/list',
    controller: 'RemoteArrivalRecordsController',
    templateUrl: helper.basepath('Purchase/RemoteArrivalRecords.html'),
    resolve: helper.resolveFor('toaster', 'ngDialog')
})
.state('app.Purchase.RemoteArrivalRecords.edit', {
    url: '/edit?ID',
    templateUrl: helper.basepath('Purchase/RemoteArrivalRecordsedit.html'),
    controller: 'RemoteArrivalRecordsEditController',
    resolve: helper.resolveFor('toaster', 'ngDialog', 'xeditable')
})
﻿.state('app.Purchase.RemotePurchaseNavicert', {
   url: '/RemotePurchaseNavicert',
   title: 'RemotePurchaseNavicert',
   abstract: true,
   templateUrl: helper.basepath('Purchase/home.html')
})
.state('app.Purchase.RemotePurchaseNavicert.list', {
    url: '/list',
    controller: 'RemotePurchaseNavicertController',
    templateUrl: helper.basepath('Purchase/RemotePurchaseNavicert.html'),
    resolve: helper.resolveFor('toaster', 'ngDialog')
})
.state('app.Purchase.RemotePurchaseNavicert.edit', {
    url: '/edit?ID',
    templateUrl: helper.basepath('Purchase/RemotePurchaseNavicertedit.html'),
    controller: 'RemotePurchaseNavicertEditController',
    resolve: helper.resolveFor('toaster', 'ngDialog', 'xeditable')
})
﻿.state('app.Purchase.SlicePurchaseApprove', {
   url: '/SlicePurchaseApprove',
   title: 'SlicePurchaseApprove',
   abstract: true,
   templateUrl: helper.basepath('Purchase/home.html')
})
.state('app.Purchase.SlicePurchaseApprove.list', {
    url: '/list',
    controller: 'SlicePurchaseApproveController',
    templateUrl: helper.basepath('Purchase/SlicePurchaseApprove.html'),
    resolve: helper.resolveFor('toaster', 'ngDialog')
})
.state('app.Purchase.SlicePurchaseApprove.edit', {
    url: '/edit?ID',
    templateUrl: helper.basepath('Purchase/SlicePurchaseApproveedit.html'),
    controller: 'SlicePurchaseApproveEditController',
    resolve: helper.resolveFor('toaster', 'ngDialog', 'xeditable')
})
﻿.state('app.Purchase.StripsPurchaseApprove', {
   url: '/StripsPurchaseApprove',
   title: 'StripsPurchaseApprove',
   abstract: true,
   templateUrl: helper.basepath('Purchase/home.html')
})
.state('app.Purchase.StripsPurchaseApprove.list', {
    url: '/list',
    controller: 'StripsPurchaseApproveController',
    templateUrl: helper.basepath('Purchase/StripsPurchaseApprove.html'),
    resolve: helper.resolveFor('toaster', 'ngDialog')
})
.state('app.Purchase.StripsPurchaseApprove.edit', {
    url: '/edit?ID',
    templateUrl: helper.basepath('Purchase/StripsPurchaseApproveedit.html'),
    controller: 'StripsPurchaseApproveEditController',
    resolve: helper.resolveFor('toaster', 'ngDialog', 'xeditable')
})
﻿.state('app.Purchase.TobaccoPurchaseApprove', {
   url: '/TobaccoPurchaseApprove',
   title: 'TobaccoPurchaseApprove',
   abstract: true,
   templateUrl: helper.basepath('Purchase/home.html')
})
.state('app.Purchase.TobaccoPurchaseApprove.list', {
    url: '/list',
    controller: 'TobaccoPurchaseApproveController',
    templateUrl: helper.basepath('Purchase/TobaccoPurchaseApprove.html'),
    resolve: helper.resolveFor('toaster', 'ngDialog')
})
.state('app.Purchase.TobaccoPurchaseApprove.edit', {
    url: '/edit?ID',
    templateUrl: helper.basepath('Purchase/TobaccoPurchaseApproveedit.html'),
    controller: 'TobaccoPurchaseApproveEditController',
    resolve: helper.resolveFor('toaster', 'ngDialog', 'xeditable')
})