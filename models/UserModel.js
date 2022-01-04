var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
	
	fullName: {
		type: String,
		required: true
	},	
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	fatherName: {
		type: String,
		required: false
	},
	aadhar_number: {
		type: Number
	},
    dob:{
        type:Date
    },
	mobile_number: {
		type: String
	},
	// isMobileNumberConfirmed: {
	// 	type: Boolean,		
	// 	default: 0
	// },
	// mobileOtp: {
	// 	type: String,
	// },
	address:{
        type:String
    },
	location: {
		city: { type: String }
	},
	no_animal_holding:{
        type:String,
    },
    token: { type: String },
	profilepic:{
		type:String
	}
	
},
	{
	timestamps: true
});



module.exports = mongoose.model("user", UserSchema);