"use strict";

var args = process.argv;
args.splice(0, 2);

exports.next = function(){
	args.shift()
	while(args[0].indexOf("--") == 0) args.shift();
	return args[0] || null;
};

exports.values = function(){
	if(!args[0]) return {};
	var names = Array.prototype.slice.call(arguments);
	var arg, values = {};

	while(args[0] && args[0].indexOf("--") == 0){
		arg = args.shift().replace("--", "");

		if(arg.indexOf("=") != -1){
			var k = arg.split("=")[0];

			if(names.indexOf(k) == -1) throw new Error("Unexpected key `" + k + "`.");

			values[k] = arg.replace(k + "=", "").replace(/^"/, "").replace(/"$/, "");
		} else {
			if(names.indexOf(arg) == -1) throw new Error("Unexpected key `" + arg + "`.");
			values[arg] = args.shift();
		}
	}

	return values;
};

exports.options = function(){
	if(!args[0]) return {};
	var names = Array.prototype.slice.call(arguments);
	var arg, options = {};

	for(var name in names) if(name.hasOwnProperty(name)) {
		options[names[name]] = false;
	}

	while(args[0] && args[0].indexOf("-") == 0){
		arg = args.shift().replace("-", "");

		if(!names[arg]) throw new Error("Unexpected key `" + arg + "`.");

		options[names[arg]] = true;
	}

	return options;
};

exports.expect = function(){
	if(!args[0]) throw new Error("Expected argument.");
	var names = Array.prototype.slice.call(arguments);
	if(names.indexOf(args[0]) == -1) throw new Error("Unexpected argument `" + args[0] + "`.");
	return args.shift();
};

exports.read = function(){
	if(!args[0]) throw new Error("Expected word.");
	return args.shift();
};