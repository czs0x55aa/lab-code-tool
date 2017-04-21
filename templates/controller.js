(function () {
    'use strict';
    angular.module('angle')
    .controller('<< table_name >>Controller', << table_name >>Controller)
    .controller('<< table_name >>EditController', << table_name >>EditController)

    << table_name >>Controller.$inject = ['$scope', '$stateParams', '$state', 'ngDialog','MyDialogs', 'toaster', '$filter', '$q', '<< table_name >>'];
    function << table_name >>Controller($scope, $stateParams, $state, ngDialog, MyDialogs, toaster, $filter, $q, << table_name >>) {

        $scope.p = { pageIndex: 1, pageSize: 15, sort: 'CreationTime', 'isAsc': false };
        var load = $scope.load = function () {
            $scope.isLoading = true;
            if ($scope.list) {
                $scope.p.pageIndex = $scope.list.PageIndex;
            }
            << table_name >>.get($scope.p, function (r) {
                $scope.list = r.Result;
                $scope.isLoading = false;
            });
        }
        load();

        var edit = $scope.edit = function (ID) {
            if (ID)
                $state.go('app.<< base_path >>.<< table_name >>.edit', { ID: ID });
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
                $state.go('app.<< base_path >>.<< table_name >>.edit', { ID: items[0] });
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
                << table_name >>.Deletes(IDs, function (r) {
                    if (r.Success) {
                        toaster.pop('success', '操作成功提示', '数据删除成功！')
                        load();
                    }
                });
            }, function (reason) {
            });
        }
    }

    << table_name >>EditController.$inject = ['$rootScope', '$scope', '$stateParams', '$state', 'ngDialog','MyDialogs', 'toaster', '$filter', 'editableOptions', 'editableThemes', '$q', 'SysReceiptConfig', '<< table_name >>','DicWarehouse',
        <%- for dic_name in dic_name_list %>
        '<< dic_name >>',
        <%- endfor %>
    ];
    function << table_name >>EditController($rootScope, $scope, $stateParams, $state, ngDialog,MyDialogs, toaster, $filter, editableOptions, editableThemes, $q, SysReceiptConfig, << table_name >>, DicWarehouse,
        <%- for dic_name in dic_name_list %>
        <%- if loop.index + 1 != loop.length %>
        << dic_name >>,
        <%- else %>
        << dic_name >>
        <%- endif %>
        <%- endfor %>
    ) {
        $scope.subIDs = { "IDs": [], "FID": $stateParams.ID };
        $scope.d = { << table_name >>Detail: [] };
        var load = $scope.load = function () {
            if ($stateParams.ID) {
                $scope.isLoading = true
                $scope.subIDs = { "IDs": [], "FID": $stateParams.ID };
                << table_name >>.Get({ ID: $stateParams.ID }, function (r) {
                    $scope.d = r.Result;
                    $scope.isLoading = false;
                })
            } else {
                var myDate = new Date();
                $scope.d.MakeDate = $filter('date')(myDate, 'yyyy-MM-dd');
                $scope.d.MakingPeople = $rootScope.user.Name;
                $scope.d.DataStatus = 0;
                $scope.d.Operator = $rootScope.user.Name;
                $scope.d.FillPerson = $rootScope.user.Name;
                $scope.d.FillDate = $filter('date')(myDate, 'yyyy-MM-dd');
                $scope.d.Year = $filter('date')(myDate, 'yyyy');
                SysReceiptConfig.GetBillNO({ TypeTab: "<< table_name >>" }, function (r) {
                    $scope.d.ReceiptNum = r.Result.BillNO;
                    $scope.d.ISO = r.Result.ISO;

                });
            }
        }
        load();

        var save = $scope.save = function () {
            $scope.isLoading = true
            if ($scope.subIDs.IDs.length > 0)
                << table_name >>.DeleteDetails($scope.subIDs, function (r) {
                    if (r.Success) {
                    }
                    $scope.isLoading = false;
                });
            << table_name >>.Post($scope.d, function (r) {
                if (r.Success) {
                    var msg = $scope.d.ID ? '更新成功！' : '添加成功！'
                    toaster.pop('success', '操作成功提示', msg);
                    $scope.isLoading = false;
                    if ($stateParams.ID)
                        load();
                    else
                        $state.go('app.<< base_path >>.<< table_name >>.edit', { ID: r.Result.ID });
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
            $scope.d.<< table_name >>Detail.push($scope.inserted);
        };

        //新添加的从列表中直接移除，原数据库的记录则保存ID
        $scope.removeItem = function (index, ID) { //string Id, string FID
            $scope.d.<< table_name >>Detail.splice(index, 1);
            if (ID)
                $scope.subIDs.IDs.push(ID);
        };

        <%- for dic_name in dic_name_list %>
        // << loop.index >>. << dic_name >>
        $scope.Dic<< dic_name >>s = []; //字典
        $scope.loadDic<< dic_name >>s = function () {
            if (!$scope.Dic<< dic_name >>s.length)
                Dic<< dic_name >>.Get({}, function (r) {
                    $scope.Dic<< dic_name >>s = r.Result.Data;
                })
        };
        $scope.showDic<< dic_name >> = function (item) {
            if (item.<< dic_name >>CD && $scope.Dic<< dic_name >>s.length) {
                var selected = $filter('filter')($scope.Dic<< dic_name >>s, { SYS_USER_CD: item.<< dic_name >>CD });
                item.<< dic_name >>Name = selected.length ? selected[0].SYS_CD_NM : "";
            }
            return item.<< dic_name >>Name;

        };

        <%- endfor %>

        $scope.DicWarehouses = []; //字典
        $scope.loadDicWarehouses = function () {
            if (!$scope.DicWarehouses.length)
                DicWarehouse.Get({}, function (r) {
                    $scope.DicWarehouses = r.Result.Data;
                })
        };

        $scope.showDicWarehouse = function (item) {
            if (item.WarehouseCD && $scope.DicWarehouses.length) {
                var selected = $filter('filter')($scope.DicWarehouses, { SYS_USER_CD: item.WarehouseCD });
                item.WarehouseName = selected.length ? selected[0].SYS_CD_NM : "";
            }
            return item.WarehouseName;

        };

        // 提交
        $scope.confirm = function (status) {
            MyDialogs.Confirm().then(function (value) {
                $scope.isLoading = true
                $scope.d.DataStatus = 2;
                << table_name >>.Post($scope.d, function (r) {
                    if (r.Success) {
                        $scope.isLoading = false;
                        toaster.pop('success', '操作成功提示', "提交成功！");
                        if ($stateParams.ID)
                            load();
                        else
                            $state.go('app.<< base_path >>.<< table_name >>.edit', { ID: r.Result.ID });
                    }
                })

            });

        }

        // 审核
        $scope.check = function (status) {
            MyDialogs.Check().then(function (value) {
                $scope.isLoading = true
                << table_name >>.Audit({ 'ID': $scope.d.ID, 'AuditStatus': parseInt($scope.d.AuditStatus) + parseInt(status), 'AuditOpinions': value }, function (r) {
                    if (r.Success) {
                        $scope.isLoading = false;
                        toaster.pop('success', '操作成功提示', "审核成功！");
                        if ($stateParams.ID)
                            load();
                        else
                            $state.go('app.<< base_path >>.<< table_name >>.edit', { ID: r.Result.ID });
                    }
                })
            });
        }

        $scope.showAudit = function (FID) {
            MyDialogs.ShowAuditOpinion(FID);
       }

    }

})();
