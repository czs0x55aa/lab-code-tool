﻿(function () {
    'use strict';
    angular.module('angle')
    .controller('TobaccoProcessTestController', TobaccoProcessTestController)
    .controller('TobaccoProcessTestEditController', TobaccoProcessTestEditController)
    .controller('TobaccoProcessTestViewController', TobaccoProcessTestViewController)

    TobaccoProcessTestController.$inject = ['$scope', '$stateParams', '$state', 'ngDialog','MyDialogs', 'toaster', '$filter', '$q', 'TobaccoProcessTest'];
    function TobaccoProcessTestController($scope, $stateParams, $state, ngDialog, MyDialogs, toaster, $filter, $q, TobaccoProcessTest) {

        $scope.p = { pageIndex: 1, pageSize: 15, sort: 'CreationTime', 'isAsc': false };
        var load = $scope.load = function () {
            $scope.isLoading = true;
            if ($scope.list) {
                $scope.p.pageIndex = $scope.list.PageIndex;
            }
            TobaccoProcessTest.get($scope.p, function (r) {
                $scope.list = r.Result;
                $scope.isLoading = false;
            });
        }
        load();

        var edit = $scope.edit = function (ID) {
            if (ID)
                $state.go('app.Quality.TobaccoProcessTest.edit', { ID: ID });
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
                $state.go('app.Quality.TobaccoProcessTest.edit', { ID: items[0] });
            }
        }

        var del = $scope.del = function () {
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
            MyDialogs.DeleteConfirm().then(function (value) {
                TobaccoProcessTest.Deletes(IDs, function (r) {
                    if (r.Success) {
                        toaster.pop('success', '操作成功提示', '数据删除成功！')
                        load();
                    }
                });
            }, function (reason) {
            });
        }
    }

    TobaccoProcessTestEditController.$inject = ['$rootScope', '$scope', '$stateParams', '$state', 'ngDialog','MyDialogs', 'toaster', '$filter', 'editableOptions', 'editableThemes', '$q', 'SysReceiptConfig', 'TobaccoProcessTest','DicWarehouse'];
    function TobaccoProcessTestEditController($rootScope, $scope, $stateParams, $state, ngDialog,MyDialogs, toaster, $filter, editableOptions, editableThemes, $q, SysReceiptConfig, TobaccoProcessTest, DicWarehouse) {
        $scope.subIDs = { "IDs": [], "FID": $stateParams.ID };
        $scope.d = { TobaccoProcessTestDetail: [] };
        var load = $scope.load = function () {
            if ($stateParams.ID) {
                $scope.isLoading = true
                $scope.subIDs = { "IDs": [], "FID": $stateParams.ID };
                TobaccoProcessTest.Get({ ID: $stateParams.ID }, function (r) {
                    $scope.d = r.Result;
                    $scope.isLoading = false;
                })
            } else {
                var myDate = new Date();
                $scope.d.MakeDate = $filter('date')(myDate, 'yyyy-MM-dd');
                $scope.d.MakingPeople = $rootScope.user.UserName;
                // 添加数据状态
                $scope.d.DataStatus = 0;
                 // 添加审核状态
                $scope.d.AuditStatus = 0
                $scope.d.Operator = $rootScope.user.UserName;
                $scope.d.OperatorName = $rootScope.user.UserName;
                $scope.d.FillPerson = $rootScope.user.UserName;
                $scope.d.FillingDate = $filter('date')(myDate, 'yyyy-MM-dd');
                $scope.d.Year = $filter('date')(myDate, 'yyyy');
                SysReceiptConfig.GetBillNO({ TypeTab: "TobaccoProcessTest" }, function (r) {
                    $scope.d.ReceiptNum = r.Result.BillNO;
                    $scope.d.ISO = r.Result.ISO;

                });
            }
        }
        load();

        var save = $scope.save = function () {
            $scope.isLoading = true
            if ($scope.subIDs.IDs.length > 0)
                TobaccoProcessTest.DeleteDetails($scope.subIDs, function (r) {
                    if (r.Success) {
                    }
                    $scope.isLoading = false;
                });
            TobaccoProcessTest.Post($scope.d, function (r) {
                if (r.Success) {
                    var msg = $scope.d.ID ? '更新成功！' : '添加成功！'
                    toaster.pop('success', '操作成功提示', msg);
                    $scope.isLoading = false;
                    if ($stateParams.ID)
                        load();
                    else
                        $state.go('app.Quality.TobaccoProcessTest.edit', { ID: r.Result.ID });
                }
            }, function (err) {
                toaster.pop('error', '操作错误提示', "数据录入错误，请检查。");
                $scope.isLoading = false;
            })
      }

        $scope.addItem = function () {
            $scope.inserted = {
                "ID": "",
                "FID": $stateParams.ID,
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
                "LastModifierUserCD": ""
            };
            $scope.d.TobaccoProcessTestDetail.push($scope.inserted);
        };

        //新添加的从列表中直接移除，原数据库的记录则保存ID
        $scope.removeItem = function (index, ID) { //string Id, string FID
            $scope.d.TobaccoProcessTestDetail.splice(index, 1);
            if (ID)
                $scope.subIDs.IDs.push(ID);
        };

        // 提交
        $scope.confirm = function (status) {
            MyDialogs.Confirm().then(function (value) {
                $scope.isLoading = true
                $scope.d.DataStatus = 2;
                TobaccoProcessTest.Post($scope.d, function (r) {
                    if (r.Success) {
                        $scope.isLoading = false;
                        toaster.pop('success', '操作成功提示', "提交成功！");
                        if ($stateParams.ID)
                            load();
                        else
                            $state.go('app.Quality.TobaccoProcessTest.edit', { ID: r.Result.ID });
                    }
                })

            });

        }

        // 审核
        $scope.check = function (status) {
            MyDialogs.Check().then(function (value) {
                $scope.isLoading = true
                TobaccoProcessTest.Audit({ 'ID': $scope.d.ID, 'AuditStatus': parseInt($scope.d.AuditStatus) + parseInt(status), 'AuditOpinions': value }, function (r) {
                    if (r.Success) {
                        $scope.isLoading = false;
                        toaster.pop('success', '操作成功提示', "审核成功！");
                        if ($stateParams.ID)
                            load();
                        else
                            $state.go('app.Quality.TobaccoProcessTest.edit', { ID: r.Result.ID });
                    }
                })
            });
        }

        $scope.showAudit = function (FID) {
            MyDialogs.ShowAuditOpinion(FID);
       }
    }

    TobaccoProcessTestViewController.$inject = ['$rootScope', '$scope', '$stateParams', '$state', 'TobaccoProcessTest'];
   function TobaccoProcessTestViewController($rootScope, $scope, $stateParams, $state, TobaccoProcessTest) {

       var load = $scope.load = function () {
           if ($stateParams.ID) {
               $scope.isLoading = true
               $scope.subIDs = { "IDs": [], "FID": $stateParams.ID };
               TobaccoProcessTest.Get({ ID: $stateParams.ID }, function (r) {
                   $scope.d = r.Result;
                   $scope.isLoading = false;
               })
           }
       }

       load();

       if ($stateParams.type && $stateParams.type == 1) { //直接打印
            $scope.$on("ngRepeatFinished", function (repeatFinishedEvent, element) {
                var bt = document.getElementById("print");
                bt.click();
            });
        }

   }

})();