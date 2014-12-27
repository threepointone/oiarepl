#!/usr/bin/env node

// node style repl
var repl = require('repl');
var compile = require('oia/compile');

var buffering = false, buffer='';
var r = repl.start({
	prompt: '~ ',
	input: process.stdin,
	output: process.stdout,
	useGlobal: true,
	ignoreUndefined: true,
	eval: function(cmd, context, filename, callback){

		cmd = cmd[0]==='('? cmd.substring(1, cmd.length-1).trim() : cmd;
		var result; 
		if(cmd[0]==='!'){
			if(buffering){
				if(cmd.length===1){
					buffering = false;
					r.prompt= '~ ';
					try{
						global._last = result = eval(compile('oia(do ' + buffer + ')').code, context);	
						buffer= '';
					}
					catch(e){
						global._err = e;
						buffer= '';
						buffering = false;
						return callback(e);	
					}					
					return callback(null, result);										
				}
				return callback(new Error('cannot start new block while previous one is open'));
			}
			buffering = true;
			buffer+= cmd.substring(1) + '\n';
			r.prompt= '';
			return callback();
		}
		if(buffering){
			buffer+= cmd + '\n';
			r.prompt= '';
			return callback();
		}
		
		try{
			global._last = result = eval(compile('oia(do ' + cmd + ')').code, context);	
			buffer= '';
		}
		catch(e){
			global._err = e;
			buffer= '';

			return callback(e);	
		}
		return callback(null, result);
	}
});
