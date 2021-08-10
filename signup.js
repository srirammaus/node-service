var db=require(__dirname+'/db.js');
conn =db.connection();


function user_checker(user,email,callback)
{
	console.log(email + "" +user)
	this.user=user;
	//var rf=refresh_token(this.user);
	var s_q="SELECT `username` FROM `auth` WHERE `username` = '"+user+"' AND `email` = '"+email+"' ;"
	
		conn.query(s_q,function(err,res,fields){
			if(err){
				var flag_s = 0;
				console.log(err)
				// reject(flag_s)
			}
			else{
				console.log("success")
				var string_ =JSON.stringify(res);
				console.log(string_);
				var parser_=JSON.parse(string_);
				if(parser_ [0] != null  ){
					var checker=Object.values(parser_[0]);
					var flag_s = 1;
					

				}
				else{
					var flag_s = 2;
					
				}

			}

			return callback(flag_s);
		

	})
}

function signup(name ,user,password ,email){
	console.log("I am Hwee")
	return new Promise((resolve,reject)=>{
		user_checker(user,email,function(flag_s){
			if(flag_s == 2){
				var query="INSERT INTO `auth` (`username`,`name`,`password`,`email`) VALUES ('"+user+"','"+name+"','"+password+"','"+email+"') ;";
				conn.query(query,function(err,res,fields){
					if(err){
						console.log(err);
						var flag_s=3;
						console.log("i ma happendinS")
						reject(flag_s);
					}else{
						var flag_s =4;
						console.log("Updated");
						resolve(flag_s);
					}
				})
			}else{
				console.log("Hap")
				flag_i=5;
				reject(flag_i)
			}
		})
	})
	// .then((flag)=>{
	// 	console.log("The Resolve Flag iss => " +  flag);
	// }).catch((Exception)=>console.log("The Rejection Flag is =>"+Exception));
}
	
function signup_(req,res,next){
	var checker= [];
	name = req.body.name
	username =  req.body.username;
	password = req.body.password;
	cpassword = req.body.cpassword;
	email = req.body.email;
	checker.push(req.body);
	stroage=JSON.stringify(checker)
	st=JSON.parse(stroage)
	lt=Object.keys(st[0]).length;
	if(lt > 5 || lt < 5){
		res.redirect('index');
	}else{
		if (password == cpassword){
			signup(name,username,password,email).then((flag)=>{
				if(flag == 4){
					result = {
						"status" : "successfully Inserted",
						"code": 1
					}
					res.send(result)
				}else{
					result = {
						"status":"somethin Wrong"
					}
					res.send(result)
				}
			}).catch((flag)=>{
				if (flag == 5){
					result = {
						"status ": "Username has taken already"
					}
					res.send(result)

				}
				else{
					result = {
						"status":"Server Error"
					}
					res.send(result)
				}
			})
		}else{
			result ={
				"Error":"password Mismatch"
			}
			res.send(result)
		}
	}

}
module.exports ={signup_ : signup_}

/*
		then((flag_s) => {
		console.log("I ama here")
		if(flag_s == 2){
			var query="INSERT INTO `auth` (`username`,`name`,`password`,`email`) VALUES ('"+user+"','"+name+"','"+password+"','"+email+"') ;";
			conn.query(query,function(err,res,fields){
				if(err){
					console.log(err);
					console.log("Something Happened here");
					var flag_s=3;
				}else{
					var flag_s =4;
					console.log("Updated");
				}
			})
		}
		return flag_s
	}).catch(flag_s => console.log("Error => " + flag_s))

}*/
// var temp="";
// console.log("This is Temp " + temp);
// signup("shrirssa","Maaadasdasdaas","pwd","pwd" ,"Edsdsdsasdasmail");
// console.log("This is Temp sdssdsd " + temp); 
//Test

// function dummy(){
// 	const w=2;
// 	return new Promise((resolve,reject)=>{
// 		if(w == 3){
// 			var flag = 3;
// 			resolve(flag);
// 		}else if(w == 2){
// 			var flag= 2;
// 			reject(flag)

// 		}else{
// 			var flag =1;
// 			reject(flag);
// 		}

// 	}).then((flag)=>console.log("The Resolved FLag is =>" + flag)).catch((flag)=>console.log("the Rejected FFlag is => " + flag))
// }
// dummy()