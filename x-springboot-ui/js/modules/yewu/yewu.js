$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'yewu/yewu/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '名字', name: 'name', index: 'update_content', width: 80 },
			{ label: '标题', name: 'title', index: 'title', width: 80 },
			{ label: '价格', name: 'price', index: 'price', width: 80 }
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });

    new AjaxUpload('#upload', {
        action: baseURL + 'sys/oss/upload/apk?token=' + token,
        name: 'file',
        autoSubmit:true,
        responseType:"json",
        onSubmit:function(file, extension){
            if(vm.config.type == null){
                alert("云存储配置未配置");
                return false;
            }
            if (!(extension && /^(apk)$/.test(extension.toLowerCase()))){
                alert('只支持APK文件！');
                return false;
            }
        },
        onComplete : function(file, r){
            if(r.code == 0){
            	console.log(r);
                vm.yewu = r.yewu;
                vm.add();
            }else{
                alert(r.msg);
            }
        }
    });

});

var vm = new Vue({
	el:'#app',
	data:{
		showList: true,
		title: null,
		yewu: {},
        config: {}
	},
    created: function(){
        this.getConfig();
    },
	methods: {
		query: function () {
			vm.reload();
		},
        getConfig: function () {
            $.getJSON(baseURL + "sys/oss/config", function(r){
                vm.config = r.config;
            });
        },
		add: function(){
			vm.showList = false;
			vm.title = "新增";
		},
		update: function (event) {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(id)
		},
		saveOrUpdate: function (event) {
			var url = vm.yewu.id == null ? "yewu/yewu/save" : "yewu/yewu/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.yewu),
			    success: function(r){
			    	if(r.code === 0){
						alert('操作成功', function(index){
							vm.reload();
						});
					}else{
						alert(r.msg);
					}
				}
			});
		},
		del: function (event) {
			var ids = getSelectedRows();
			if(ids == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "yewu/yewu/delete",
                    contentType: "application/json",
				    data: JSON.stringify(ids),
				    success: function(r){
						if(r.code == 0){
							alert('操作成功', function(index){
								$("#jqGrid").trigger("reloadGrid");
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		getInfo: function(id){
			$.get(baseURL + "yewu/yewu/info/"+id, function(r){
                vm.yewu = r.yewu;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                page:page
            }).trigger("reloadGrid");
		}
	}
});
