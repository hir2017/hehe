#!/usr/bin/env node
require( "babel-register")({
	presets: ['es2015', 'react', 'stage-0']
})
require( "./server" );
