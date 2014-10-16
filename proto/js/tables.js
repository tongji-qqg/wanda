var tables = [{
			name:"TB_SF_STUDENT",
			comment:"学生表",
			type:1,
			id:0,
			columns:[{
				name:"id",
				comment:"主键",
				dataType:"varchar",
				key:0
			},{
				name:"name",
				comment:"名称",
				dataType:"varchar",
				key:0
			}]				
		},{
			name:"TB_SF_TEACHER",
			comment:"教师表",
			type:1,
			id:1,
			columns:[{
				name:"ID",
				comment:"主键",
				dataType:"varchar",
				key:0
			},{
				name:"NAME",
				comment:"名称",
				dataType:"varchar",
				key:0
			}]				
		},{
			name:"TB_SF_HOMEWORK",
			comment:"作业表",
			type:1,
			id:1,
			columns:[{
				name:"HWID",
				comment:"作业表ID",
				dataType:"varchar",
				key:0
			},{
				name:"CONTENT",
				comment:"作业内容",
				dataType:"varchar",
				key:0
			},{
				name:"CONTENT",
				comment:"作业内容",
				dataType:"varchar",
				key:0
			},{
				name:"SENDER",
				comment:"作业发送者",
				dataType:"int",
				key:0
			},{
				name:"RECIPIENTS",
				comment:"作业接受者列表",
				dataType:"varchar",
				key:0
			},{
				name:"NUMBER",
				comment:"作业接受者人数",
				dataType:"int",
				key:0
			}]				
		},{
			name:"TB_SF_HOMEWORK_INFO",
			comment:"作业详情",
			type:1,
			id:1,
			columns:[{
				name:"ID",
				comment:"主键",
				dataType:"varchar",
				key:0
			},{
				name:"HWID",
				comment:"作业表ID",
				dataType:"varchar",
				key:0
			},{
				name:"RECIPIENT_INFO",
				comment:"接受者信息",
				dataType:"varchar",
				key:0
			},{
				name:"CONTENT",
				comment:"发送内容",
				dataType:"varchar",
				key:0
			},{
				name:"SEND_TIME",
				comment:"发送时间",
				dataType:"datetime",
				key:0
			},{
				name:"STATUS",
				comment:"发送状态",
				dataType:"int",
				key:0
			}]				
		},{
			name:"TB_SF_ANNOUNCEMENT",
			comment:"公告表",
			type:1,
			id:1,
			columns:[{
				name:"ID",
				comment:"主键",
				dataType:"varchar",
				key:0
			},{
				name:"NAME",
				comment:"名称",
				dataType:"varchar",
				key:0
			}]				
		},{
			name:"TB_SF_ANNOUNCEMENT_INFO",
			comment:"公告详情",
			type:1,
			id:1,
			columns:[{
				name:"ID",
				comment:"主键",
				dataType:"varchar",
				key:0
			},{
				name:"NAME",
				comment:"名称",
				dataType:"varchar",
				key:0
			}]				
		},{
			name:"TB_SF_MSG_SEND",
			comment:"发件箱消息",
			type:1,
			id:1,
			columns:[{
				name:"ID",
				comment:"主键",
				dataType:"varchar",
				key:0
			},{
				name:"NAME",
				comment:"名称",
				dataType:"varchar",
				key:0
			}]				
		},{
			name:"TB_SF_STUDENT_GROUP",
			comment:"学生组",
			type:1,
			id:1,
			columns:[{
				name:"ID",
				comment:"主键",
				dataType:"varchar",
				key:0
			},{
				name:"NAME",
				comment:"名称",
				dataType:"varchar",
				key:0
			}]				
		},{
			name:"TB_SF_MSG_RECEIVED",
			comment:"收件箱消息",
			type:1,
			id:1,
			columns:[{
				name:"ID",
				comment:"主键",
				dataType:"varchar",
				key:0
			},{
				name:"NAME",
				comment:"名称",
				dataType:"varchar",
				key:0
			}]				
		}]