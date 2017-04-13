(function () {
    'use strict';
    angular.module('angle')
    .controller('YbTestMainController', YbTestMainController)
    .controller('YbTestMainEditController', YbTestMainEditController)

YbTestMainController.$inject = ['$scope', '$stateParams', '$state', 'ngDialog', 'toaster', '$filter',  '$q','YbTestMain'];
    function YbTestMainController($scope, $stateParams, $state, ngDialog, toaster, $filter, $q, YbTestMain) {

        $scope.p = { pageIndex: 1, pageSize: 15, sort: 'CreationTime', 'isAsc': false };
        var load = $scope.load = function () {
            $scope.isLoading = true;
            if ($scope.p) {
                $scope.p.pageIndex = $scope.p.PageIndex;
            }
            YbTestMain.get($scope.p, function (r) {
                $scope.list = r.Result;
                $scope.isLoading = false;
            });
        }
        load();

        var edit = $scope.edit = function (ID) {
            if (ID)
                $state.go('app.YbTest.YbTestMain.edit', { ID: ID });
            else {
                var items = [];
                for (var x in $scope.list.Data) {
                    if ($scope.list.Data[x].select == true) {
                        items.push($scope.list.Data[x].ID);
                    }
                }
                if (items.length != 1) {
                    toaster.pop('error', '警告', '请您选择一条记录！')
                    return;
                }
                $state.go('app.YbTest.YbTestMain.edit', { ID: items[0] });
            }
        }

        var del = $scope.del = function () {
            ngDialog.openConfirm({
                template: 'app/views/dialog/confirm.html',
                className: 'ngdialog-theme-default',
                data: { title: '删除确认', msg: '您是否确认要删除此记录？' }
            }).then(function (value) {
                var IDs = [];
                for (var x in $scope.list.Data) {
                    if ($scope.list.Data[x].select == true) {
                        IDs.push($scope.list.Data[x].ID);
                    }
                }
                if (IDs.length < 1) {
                    toaster.pop('error', '警告', '您至少得选择一条记录才能删除！')
                    return;
                }
                YbTestMain.Deletes(IDs, function (r) {
                    if (r.Success) {
                        toaster.pop('success', '操作成功提示', '数据删除成功！')
                        load();
                    }
                });
            }, function (reason) {
            });
        }
    }

    YbTestMainEditController.$inject = ['$rootScope', '$scope', '$stateParams','$state', 'ngDialog', 'toaster', '$filter','editableOptions', 'editableThemes', '$q','SysReceiptConfig', 'YbTestMain'];
    function YbTestMainEditController($rootScope, $scope, $stateParams, $state, ngDialog, toaster, $filter, editableOptions, editableThemes, $q,SysReceiptConfig, YbTestMain) {
        $scope.subIDs = { "IDs": [], "FID": $stateParams.ID };
        $scope.d = { YbTestMainDetail: [] };
        var load = $scope.load = function () {
            if ($stateParams.ID) {
                $scope.isLoading = true
                $scope.subIDs = { "IDs": [], "FID": $stateParams.ID };
                YbTestMain.Get({ ID: $stateParams.ID }, function (r) {
                    $scope.d = r.Result;
                    $scope.isLoading = false;
                })
            }else{
                 var myDate = new Date();
                 $scope.d.MakeDate = $filter('date')(myDate, 'yyyy-MM-dd');
                 $scope.d.MakingPeople = $rootScope.user.Name;
                 SysReceiptConfig.GetBillNO({ TypeTab: "YbTestMain" }, function (r) {
                      $scope.d.ReceiptNum = r.Result.BillNO;
                      $scope.d.ISO = r.Result.ISO;              
                   });          
                }
        }
        load();

        var save = $scope.save = function () {
            $scope.isLoading = true
            if ($scope.subIDs.IDs.length > 0)
                YbTestMain.DeleteDetails($scope.subIDs, function (r) {
                    if (r.Success) {
                    }
                    $scope.isLoading = false;
                });
            YbTestMain.Post($scope.d, function (r) {
                if (r.Success) {
                    var msg = $scope.d.ID ? '更新成功！' : '添加成功！'
                    toaster.pop('success', '操作成功提示', msg);
                    $scope.isLoading = false;
                    if ($stateParams.ID)
                        load();
                    else
                        $state.go('app.YbTest.YbTestMain.edit', { ID: r.Result.ID });
                }
            })
        }

        $scope.addItem = function () {
            $scope.inserted = {
                "ID": "",
                "FID": $stateParams.ID,
                "DataStatus": "",
                "AuditStatus": "",
                "AuditDate": "",
                "AuditCD": "",
                "AuditName": "",
                "AuditOpinions": "",
                "ISO": "",
                "ReceiptNum": "",
                "MakingPeople": "",
                "MakeDate": "",
                "SupplyUnit": "",
                "SupplyUnitCD": "",
                "PurchaseBatch": "",
                "FirstCheckState": "",
                "SmokeStatus": "",
                "StateName": "",
                "LastModifierUserCD": "",
        };
    $scope.d.YbTestMainDetail.push($scope.inserted);
};

//新添加的从列表中直接移除，原数据库的记录则保存ID
$scope.removeItem = function (index, ID) { //string Id, string FID
    $scope.d.YbTestMainDetail.splice(index, 1);
    if (ID)
        $scope.subIDs.IDs.push(ID);
};
}

})();