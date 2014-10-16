(function($){

	var resourceHtml = 
		'<div class="metaResource">'
			+'<div class="form-group bianhao">'
				+'<label class="col-sm-2 control-label">源元数据编号</label>'
				+'<div class="col-sm-10">'
					+'<input type="text" class="form-control" name="metaId" placeholder="元数据编号">'
				+'</div>'
			+'</div>'
			+'<div class="form-group">'
				+'<label class="col-sm-2 control-label">数据信息</label>'
				+'<div class="col-sm-7">'
					+'<div class="zTreeDemoBackground left">'
						+'<ul name="zTree" class="ztree"></ul>'
					+'</div>'
				+'</div>'
				+'<div class="col-sm-3" style="margin-top:15px">'
					+'<p><a class="btn btn-sm btn-primary" name="addp" href="#" title="增加父节点" onclick="return false;">增加父节点</a></p>'
					+'<p><a class="btn btn-sm btn-primary" name="addc" href="#" title="增加叶子节点" onclick="return false;">增加叶子节点</a></p>'
					+'<p><a class="btn btn-sm btn-primary" name="edit" href="#" title="编辑名称" onclick="return false;">编辑名称</a></p>'
					+'<p><a class="btn btn-sm btn-primary" name="del"  href="#" title="删除节点" onclick="return false;">删除节点</a></p>'
					+'<p><a class="btn btn-sm btn-primary" name="clear" href="#" title="清空子节点" onclick="return false;">清空子节点</a></p>'
				+'</div>'
			+'</div>'
		+'</div>';
	
	$('#newResourceButton').click(function(){

		createTree('#resourceMetaForm');
		
		return false;
	})

	var resCount = 0;
	function createTree(location){
		var MoveTest = {
			errorMsg: "放错了...请选择正确的类别！",
			curTarget: null,
			curTmpTarget: null,
			noSel: function() {
				try {
					window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
				} catch(e){}
			},
			dragTree2Dom: function(treeId, treeNodes) {
				return !treeNodes[0].isParent;
			},
			prevTree: function(treeId, treeNodes, targetNode) {
				return !targetNode.isParent && targetNode.parentTId == treeNodes[0].parentTId;
			},
			nextTree: function(treeId, treeNodes, targetNode) {
				return !targetNode.isParent && targetNode.parentTId == treeNodes[0].parentTId;
			},
			innerTree: function(treeId, treeNodes, targetNode) {
				return targetNode!=null && targetNode.isParent && targetNode.tId == treeNodes[0].parentTId;
			},
			dragMove: function(e, treeId, treeNodes) {
				var p = null, pId = 'dom_' + treeNodes[0].pId;
				if (e.target.id == pId) {
					p = $(e.target);
				} else {
					p = $(e.target).parent('#' + pId);
					if (!p.get(0)) {
						p = null;
					}
				}

				$('.domBtnDiv .active').removeClass('active');
				if (p) {
					p.addClass('active');
				}
			},
			dropTree2Dom: function(e, treeId, treeNodes, targetNode, moveType) {
				var domId = "doms";
				var zTree = $.fn.zTree.getZTreeObj(resId);
				console.log(e, treeId, treeNodes, targetNode, moveType)
				if (moveType == null && (domId == e.target.id || $(e.target).parents("#" + domId).length > 0)) {
					
					//zTree.removeNode(treeNodes[0]);
					var path = getPath(treeNodes[0],treeId)
					var newDom = $("span[domId='" + path + "'']");
					if (newDom.length > 0) {
						newDom.removeClass("domBtn_Disabled");
						newDom.addClass("domBtn");
					} else {
						$("#" + domId).append("<span class='domBtn' domId='" + path + "'>" +path + "</span>");
					}
					MoveTest.updateType();
				} else if ( $(e.target).parents(".domBtnDiv").length > 0) {
					//alert(MoveTest.errorMsg);
					zTree.removeNode(treeNodes[0]);
				} else {
					zTree.removeNode(treeNodes[0]);
				}
				function getPath(node, treeId){
					var metaId = $("input",newRes).val() + ',';
					var tail   = node.name;
					var pNode  = node;
					var count  = 0;
					while(pNode.level != 0 && ++count < 5){
						pNode = pNode.getParentNode();
						tail  = pNode.name + ',' + tail;
						console.log(pNode)
					}
					return metaId + tail;
				}
			},
			dom2Tree: function(e, treeId, treeNode) {
				console.log(e, treeId, treeNode,MoveTest.curTarget,MoveTest.curTmpTarget);
				var target = MoveTest.curTarget, tmpTarget = MoveTest.curTmpTarget;
				if (target)
					target.remove();
				if (tmpTarget)
					tmpTarget.remove();
				MoveTest.updateType();
				MoveTest.curTarget = null;
				MoveTest.curTmpTarget = null;
			},
			updateType: function() {
				var zTree = $.fn.zTree.getZTreeObj(resId),
				nodes = zTree.getNodes();
				for (var i=0, l=nodes.length; i<l; i++) {
					var num = nodes[i].children ? nodes[i].children.length : 0;
					nodes[i].name = nodes[i].name.replace(/ \(.*\)/gi, "") + " (" + num + ")";
					zTree.updateNode(nodes[i]);
				}
			},
			bindDom: function() {
				$(".domBtnDiv").bind("mousedown", MoveTest.bindMouseDown);
			},
			bindMouseDown: function(e) {
				var target = e.target;
				if (target!=null && target.className=="domBtn") {
					var doc = $(document), target = $(target),
					docScrollTop = doc.scrollTop(),
					docScrollLeft = doc.scrollLeft();
					target.addClass("domBtn_Disabled");
					target.removeClass("domBtn");
					curDom = $("<span class='dom_tmp domBtn'>" + target.text() + "</span>");
					curDom.appendTo("body");

					curDom.css({
						"top": (e.clientY + docScrollTop + 3) + "px",
						"left": (e.clientX + docScrollLeft + 3) + "px"
					});
					MoveTest.curTarget = target;
					MoveTest.curTmpTarget = curDom;

					doc.bind("mousemove", MoveTest.bindMouseMove);
					doc.bind("mouseup", MoveTest.bindMouseUp);
					doc.bind("selectstart", MoveTest.docSelect);
				}
				if(e.preventDefault) {
					e.preventDefault();
				}
			},
			bindMouseMove: function(e) {
				MoveTest.noSel();
				var doc = $(document), 
				docScrollTop = doc.scrollTop(),
				docScrollLeft = doc.scrollLeft(),
				tmpTarget = MoveTest.curTmpTarget;
				if (tmpTarget) {
					tmpTarget.css({
						"top": (e.clientY + docScrollTop + 3) + "px",
						"left": (e.clientX + docScrollLeft + 3) + "px"
					});
				}
				return false;
			},
			bindMouseUp: function(e) {
				var doc = $(document);
				doc.unbind("mousemove", MoveTest.bindMouseMove);
				doc.unbind("mouseup", MoveTest.bindMouseUp);
				doc.unbind("selectstart", MoveTest.docSelect);

				var target = MoveTest.curTarget, tmpTarget = MoveTest.curTmpTarget;
				if (tmpTarget) tmpTarget.remove();

				if ($(e.target).parents('#'+resId).length == 0) {
					if (target) {
						target.removeClass("domBtn_Disabled");
						target.addClass("domBtn");
					}
					MoveTest.curTarget = null;
					MoveTest.curTmpTarget = null;
				}
			},
			bindSelect: function() {
				return false;
			}
		};
		var setting = {
			view: {
				selectedMulti: false
			},
			edit: {
				enable: true,
				showRemoveBtn: true,
				showRenameBtn: true,
				drag: {
					prev: MoveTest.prevTree,
					next: MoveTest.nextTree,
					inner: MoveTest.innerTree
				}
			},
			data: {
				keep: {
					parent:true,
					leaf:false
				},
				simpleData: {
					enable: true
				}
			},
			callback: {
				beforeDrag: beforeDrag,
				beforeRename: beforeRename,
				beforeDrag: MoveTest.dragTree2Dom,
				onDrop: MoveTest.dropTree2Dom,
				onDragMove: MoveTest.dragMove,
				onMouseUp: MoveTest.dom2Tree
			}
		};

		var zNodes =[
			{ id:1, pId:0, name:"table 1", open:true},
			{ id:11, pId:1, name:"field 1-1,string"},
			{ id:12, pId:1, name:"field 1-2,string"},
			{ id:13, pId:1, name:"field 1-3,string"},
			{ id:2, pId:0, name:"table 2", open:true},
			{ id:21, pId:2, name:"field 2-1,string"},
			{ id:22, pId:2, name:"field 2-2,string"},
			{ id:23, pId:2, name:"field 2-3,string"},
			{ id:3, pId:0, name:"table 3", open:true},
			{ id:31, pId:3, name:"field 3-1,string"},
			{ id:32, pId:3, name:"field 3-2,string"},
			{ id:33, pId:3, name:"field 3-3,string"}
		];
		
		function beforeDrag(treeId, treeNodes) {
			return false;
		}
		
		function beforeRename(treeId, treeNode, newName) {
			if (newName.length == 0) {
				alert("节点名称不能为空.");
				var zTree = $.fn.zTree.getZTreeObj(resId);
				setTimeout(function(){zTree.editName(treeNode)}, 10);
				return false;
			}
			return true;
		}
		

		var newCount = 1;
		function add(e) {
			var zTree = $.fn.zTree.getZTreeObj(resId),
			isParent = e.data.isParent,
			nodes = zTree.getSelectedNodes(),
			treeNode = nodes[0];
			if (treeNode) {
				treeNode = zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, isParent:isParent, name:"new node" + (newCount++)});
			} else {
				treeNode = zTree.addNodes(null, {id:(100 + newCount), pId:0, isParent:isParent, name:"new node" + (newCount++)});
			}
			if (treeNode) {
				zTree.editName(treeNode[0]);
			} else {
				alert("叶子节点被锁定，无法增加子节点");
			}
		};
		function edit() {
			var zTree = $.fn.zTree.getZTreeObj(resId),
			nodes = zTree.getSelectedNodes(),
			treeNode = nodes[0];
			if (nodes.length == 0) {
				alert("请先选择一个节点");
				return;
			}
			zTree.editName(treeNode);
		};
		function remove(e) {
			var zTree = $.fn.zTree.getZTreeObj(resId),
			nodes = zTree.getSelectedNodes(),
			treeNode = nodes[0];
			if (nodes.length == 0) {
				alert("请先选择一个节点");
				return;
			}
			var callbackFlag = $("#callbackTrigger").attr("checked");
			zTree.removeNode(treeNode, callbackFlag);
		};
		function clearChildren(e) {
			var zTree = $.fn.zTree.getZTreeObj(resId),
			nodes = zTree.getSelectedNodes(),
			treeNode = nodes[0];
			if (nodes.length == 0 || !nodes[0].isParent) {
				alert("请先选择一个父节点");
				return;
			}
			zTree.removeChildNodes(treeNode);
		};
		

		var newRes = $(resourceHtml);
		var resId  = 'zTree' + resCount++;
		$(location).prepend(newRes);
		$('ul',newRes).attr('id',resId);

		$.fn.zTree.init($('ul',newRes), setting, zNodes);
		MoveTest.updateType();
		MoveTest.bindDom();
		$("a[name=addp]",newRes ).bind("click", {isParent:true}, add);
		$("a[name=addc]",newRes ).bind("click", {isParent:false}, add);
		$("a[name=edit]",newRes ).bind("click", edit);
		$("a[name=del]",newRes ).bind("click", remove);
		$("a[name=clear]",newRes ).bind("click", clearChildren);
	}
	(function(){
		var setting = {
			view: {
				selectedMulti: false
			},
			edit: {
				enable: true,
				showRemoveBtn: true,
				showRenameBtn: true,
			},
			data: {
				keep: {
					parent:true,
					leaf:false
				},
				simpleData: {
					enable: true
				}
			},
			callback: {
				beforeDrag: beforeDrag,
				beforeRename: beforeRename,
				beforeClick: zTreeBeforeClick,
				onClick: zTreeOnClick
			}
		};
		var zNodes =[
			{ id:1, pId:0, name:"table 1", open:true},
			{ id:11, pId:1, name:"field 1-1,string"},
			{ id:12, pId:1, name:"field 1-2,string"},
			{ id:13, pId:1, name:"field 1-3,string"},
			{ id:2, pId:0, name:"table 2", open:true},
			{ id:21, pId:2, name:"field 2-1,string"},
			{ id:22, pId:2, name:"field 2-2,string"},
			{ id:23, pId:2, name:"field 2-3,string"},
			{ id:3, pId:0, name:"table 3", open:true},
			{ id:31, pId:3, name:"field 3-1,string"},
			{ id:32, pId:3, name:"field 3-2,string"},
			{ id:33, pId:3, name:"field 3-3,string"}
		];
		function zTreeBeforeClick(treeId, treeNode, clickFlag){ 
			var zTree = $.fn.zTree.getZTreeObj('treeDemo');
			(function save(){
		    	var nodes = zTree.getSelectedNodes();
		    	if(nodes.length < 1) return;
		    	var data = {
		    		from:[],
		    		rule:""
		    	};
		    	$('span', '#doms').each(function(){
		    		data.from.push($(this).text())
		    	})
		    	data.rule = $("#rule").val();
		    	console.log(data);
		    	nodes[0].metaInfo = data;
		    	//console.log(nodes[0])
		    	$("#rule").val("");
		    	$("#doms").empty();
		    })();
			return true;
		}
		function zTreeOnClick(event, treeId, treeNode) {
		    //alert(treeNode.tId + ", " + treeNode.name);
		    var zTree = $.fn.zTree.getZTreeObj('treeDemo');
		    //console.log(event, treeId, treeNode);
		    
		    (function load(node){
		    	$("#fieldInfo").css('display','block')
		    	if(node.metaInfo){
		    		node.metaInfo.from.forEach(function(m){
		    			$("#doms").append($('<span>').addClass('domBtn').text(m));
		    		})
		    		$("#rule").val(node.metaInfo.rule);
		    	}
		    	console.log(node)
		    })(treeNode)
		};

		function beforeDrag(treeId, treeNodes) {
			return false;
		}
		
		function beforeRename(treeId, treeNode, newName) {
			if (newName.length == 0) {
				alert("节点名称不能为空.");
				var zTree = $.fn.zTree.getZTreeObj('treeDemo');
				setTimeout(function(){zTree.editName(treeNode)}, 10);
				return false;
			}
			return true;
		}
		
		var newCount = 1;
		function add(e) {
			var zTree = $.fn.zTree.getZTreeObj('treeDemo'),
			isParent = e.data.isParent,
			nodes = zTree.getSelectedNodes(),
			treeNode = nodes[0];
			if (treeNode) {
				treeNode = zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, isParent:isParent, name:"new node" + (newCount++)});
			} else {
				treeNode = zTree.addNodes(null, {id:(100 + newCount), pId:0, isParent:isParent, name:"new node" + (newCount++)});
			}
			if (treeNode) {
				zTree.editName(treeNode[0]);
			} else {
				alert("叶子节点被锁定，无法增加子节点");
			}
		};
		function edit() {
			var zTree = $.fn.zTree.getZTreeObj('treeDemo'),
			nodes = zTree.getSelectedNodes(),
			treeNode = nodes[0];
			if (nodes.length == 0) {
				alert("请先选择一个节点");
				return;
			}
			zTree.editName(treeNode);
		};
		function remove(e) {
			var zTree = $.fn.zTree.getZTreeObj('treeDemo'),
			nodes = zTree.getSelectedNodes(),
			treeNode = nodes[0];
			if (nodes.length == 0) {
				alert("请先选择一个节点");
				return;
			}
			var callbackFlag = $("#callbackTrigger").attr("checked");
			zTree.removeNode(treeNode, callbackFlag);
		};
		function clearChildren(e) {
			var zTree = $.fn.zTree.getZTreeObj('treeDemo'),
			nodes = zTree.getSelectedNodes(),
			treeNode = nodes[0];
			if (nodes.length == 0 || !nodes[0].isParent) {
				alert("请先选择一个父节点");
				return;
			}
			zTree.removeChildNodes(treeNode);
		};
		$.fn.zTree.init($('ul', '#selfInfoTree'), setting, zNodes);
		$("a[name=addp]", "#selfInfoTree" ).bind("click", {isParent:true}, add);
		$("a[name=addc]", "#selfInfoTree" ).bind("click", {isParent:false}, add);
		$("a[name=edit]","#selfInfoTree" ).bind("click", edit);
		$("a[name=del]", "#selfInfoTree" ).bind("click", remove);
		$("a[name=clear]", "#selfInfoTree" ).bind("click", clearChildren);
	})();
})($)

$(function(){
	$("#generateBtn").click(function(){
		var data = {
			"management":{},
			"technology":{},
			"operation" :{}
		};

		$("#mgmForm input").each(function() {
			//console.log($(this))
            data.management[$(this).attr('id')] = $(this).val();
        });
        $("#techForm input").each(function() {
			//console.log($(this))
            data.technology[$(this).attr('id')] = $(this).val();
        });
        ////////////////////////////////////////////////
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		var nodes = zTree.getNodes();
		data.technology.format= []
		if(nodes.length) iterateNodes(data.technology.format, nodes);
        console.log(data)
        function iterateNodes(target,nodes){
        	for(var i=0;i<nodes.length;i++){
        		var info = nodes[i].name.split(',');
        		var node = {
        			name : info[0]        			
        		};
        		if(info.length > 1)
        			node.type = info[1];
        		if(info.length > 2)
        			node.info = info[2]
        		if(nodes[i].metaInfo)
        		{
        			if(nodes[i].metaInfo.from && nodes[i].metaInfo.from.length > 0)
        				node.from = nodes[i].metaInfo.from;
        			if(nodes[i].metaInfo.rule && nodes[i].metaInfo.rule!="") 
        				node.rule = nodes[i].metaInfo.rule;
        		}
        		if(nodes[i].children){
        			node.fields = []
        			iterateNodes(node.fields,nodes[i].children);
        		}
        		target.push(node);
        	}
        }

        data.operation.metaRef = [];
        $('#resourceMetaForm .metaResource').each(function(){
        	var metaId = $('input',$(this)).val();
        	data.operation.metaRef.push(metaId);
        })
        ////////////////////////////////////////////////
		var tab = window.open();
		$(tab.document.body).html("<pre id='json'>"+syntaxHighlight(data)+"</pre>");
		tab.focus();
	})
	function syntaxHighlight(json) {
	    if (typeof json != 'string') {
	         json = JSON.stringify(json, undefined, 2);
	    }
	    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
	        var cls = 'number';
	        if (/^"/.test(match)) {
	            if (/:$/.test(match)) {
	                cls = 'key';
	            } else {
	                cls = 'string';
	            }
	        } else if (/true|false/.test(match)) {
	            cls = 'boolean';
	        } else if (/null/.test(match)) {
	            cls = 'null';
	        }
	        return '<span class="' + cls + '">' + match + '</span>';
    });
}
})