	//////////////////////////////////////////////////////////////
	//                ZTree 
	//////////////////////////////////////////////////////////////
	var database = [];
	var checkArr = [];

	$(function() {
	    var dbTreeSetting = {
	        check: {
	            enable: true
	        },
	        data: {
	            simpleData: {
	                enable: true
	            }
	        },
	        callback: {
	            onClick: function(event, treeId, treeNode, clickFlag) {
	            	var index = treeNode.id - treeNode.pId * 100 - 1;
	                var node = database[index];	
	                //console.log(node)
	                reloadTable(index+1,node);
	            }
	        }
	    };
	
	    var tableTreeSetting = {
	        check: {
	            enable: true
	        },
	        data: {
	            simpleData: {
	                enable: true
	            }
	        },
	        callback: {
	            onCheck: function(e, treeId, treeNode) {
	                var tbIndex = Math.floor(treeNode.id / 10000) - 1;
	                var fdIndex = treeNode.id - (tbIndex + 1) * 10000 - 1;
	                checkArr[tbIndex][fdIndex] = treeNode.checked;
	            }
	        }
	    };
	    	
	
	    function reloadTable(tbIndex,node) {
	        var tableNode = []
	        var id = tbIndex * 10000;
	        var i = 0;	        
	        tableNode.push({
	            id: 10000,
	            pId: 0,
	            name: node[0].tableName,
	            nocheck: true,
	            open: true,
	            click: false
	        });
	        node[1].forEach(function(a) {
	            tableNode.push({
	                id: id + i + 1,
	                pId: 10000,
	                name: a.fieldName,
	                checked: checkArr[tbIndex-1][i++]
	            });	            
	        })
	        $.fn.zTree.init($("#treeRight"), tableTreeSetting, tableNode);
	    }
	
	    $("body").on("showDBInfo",showDBInfo);

	    function showDBInfo(event, data){	    	    	
	    	if(data) 
	    		initProcess(data);
	    }
		function initProcess(data) {
	        //console.log("data",data);
			$("#treeLeft").empty();
	    	$("#treeRight").empty();
	    	var zNodes = [];
	    	database = [];
	    	checkArr = [];

	        var dbIndex = 1;
	        var tbIndex = 1;
	        
	        database = data;
	        
	        console.log(database);
	        zNodes.push({
                id: dbIndex,
                pId: 0,
                name: "database", //TODO change to dbName
                open: true,
                checked: true
            })
	        
            for (var tb in database) {
                
                zNodes.push({
                    id: (dbIndex * 100 + (tbIndex)),
                    pId: dbIndex,
                    name: database[tb][0].tableName,
                    checked: true
                });
                var arr = [];
                database[tb][1].forEach(function() {
                    arr.push(true)
                })
                checkArr.push(arr);
                tbIndex++;
                
            }            
	
	        $.fn.zTree.init($("#treeLeft"), dbTreeSetting, zNodes);
	    }
	});


	