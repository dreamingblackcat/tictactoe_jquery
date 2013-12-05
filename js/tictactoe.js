$(function(){
		
		var GameLogic={
			current: "X",
			occupied: function(pos){
				if($("#"+pos).text()==="X" || $("#"+pos).text()==="O"){
						
						return true;
					}
				else{
					
					return false;
				}
			},
			conditions:{
					'00': [['01','02'],['10','20'],['11','22']],
					'01': [['00','02'],['11','21']],
					'02': [['00','01'],['12','22'],['11','20']],
					'10': [['00','20'],['11','12']],
					'11': [['00','22'],['02','20'],['10','12'],['01','21']],
					'12':[['02','22'],['10','11']],
					'20': [['21','22'],['00','10'],['11','02']],
					'21': [['01','11'],['20','22']],
					'22': [['20','21'],['11','00'],['02','12']]
				},
			changeCurrent: function(){
				GameLogic.counter++;
				console.log(GameLogic.counter);
				if(GameLogic.current==="O")GameLogic.current="X";
				else GameLogic.current="O";
			},
			counter: 1,
			checkGameOver: function(){
				if(GameLogic.counter<9){
					return false;
				}else return true;
			},
			checkWinner: function(cell,value){

				cellNumber=cell.charAt(4)+""+cell.charAt(5);
				
				var currentConditions=GameLogic.conditions[cellNumber];
				for(var i=0;i<currentConditions.length;i++){
					var ok=true;
					for(var j=0;j<currentConditions[i].length;j++){
					if($("#cell"+currentConditions[i][j]).text()!==value)
						ok=false;

				 }
				if(ok)return true;
			}
				return false;
			},
			reset: function(){
				GameLogic.resetGame();
				GameLogic.clearNotifications();
			},
			resetGame: function(){
				GameLogic.counter=1;
				$(".cell").text("");
			},
			notify: function(type,message){
				if(type==="alert")$('#alert').text(message);
				else $('#message').text(message);
			},
			clearNotifications: function(){
				$("#message").text("");
				$("#alert").text("");
			}
		};
		abcde=GameLogic.checkGameOver;
		$(".cell").hide();
		$("#start").on('click',function(){
			$(".cell").slideDown();
		});
		$("#reset").on('click',function(){
			GameLogic.resetGame();
		});
		$(".cell").on('click',function(){
			GameLogic.clearNotifications();
			if(!GameLogic.occupied($(this).attr("id")))$(this).text(GameLogic.current);
			else{
			 GameLogic.notify("alert","This block is already marked");
			 return true;
			}
			if(GameLogic.checkWinner($(this).attr("id"),GameLogic.current)){
					GameLogic.notify("success","Congratulation!"+GameLogic.current+"has won!");
					GameLogic.resetGame();
					return true;
			}
			if(GameLogic.checkGameOver()){
				GameLogic.notify("drawn","Sorry! It's a draw !");
				return true;
			}
			GameLogic.changeCurrent();
		});
		// $(".cell").hover(function(){
		// 	var n=$(this).attr("id").charAt(4)+""+$(this).attr("id").charAt(5);
		// 	currentConditions=GameLogic.conditions[n];
		// 	for(var i=0;i<currentConditions.length;i++){
		// 		console.log(currentConditions[i])
		// 		for(var j=0;j<currentConditions[i].length;j++){
		// 				$("#cell"+currentConditions[i][j]).css("backgroundColor","red");
		// 				$("#cell"+currentConditions[i][j]).text("abc:"+i+j);
		// 		 	}
		// 		 }
		// 		},function(){
		// 		$(".cell").css("backgroundColor","#4285F4;");
		// });


	});