/*! Simple Imageupload - v0.1.0 - 2015-02-19
* https://github.com/derapU/jquery-simple-imageupload
* Copyright (c) 2015 Andreas Berghaus; Licensed MIT */
( function ( $ ) {
	"use strict";

	var SimpleImageupload;

	$.fn.simple_imageupload = function ( opts ) {
		return this.each( function () {
			this.simple_imageupload = new SimpleImageupload( $( this ), opts );
		} );
	};

	SimpleImageupload = function ( $input, opts ) {
		this.init( $input, opts );
	};
	SimpleImageupload.prototype = {
		default_opts: {
			placeholder: 'Click to choose image'
		},
		opts: null,

		$container: null,
		$preview: null,
		$input: null,

		init: function ( $input, opts ) {
			// configure and save the original field
			this.opts   = $.extend( {}, this.default_opts, opts );
			this.$input = $input;

			// create elements
			this.create_container();
			this.create_preview();


			// insert container and put input-field inside
			this.$input.before( this.$container );
			this.$container
				.append( this.$input )
				.append( this.$preview );

			// bind events
			this.bind_events();

		},

		update_preview: function () {
			var $reader,
				$preview = this.$preview;

			if ( undefined === FileReader ) {
				// TODO
				return;
			}

			// create filereader
			$reader = $( new FileReader() ).on( 'load', function ( e ) {
				$preview
					.css( 'background-image', 'url("' + e.target.result + '")' )
					.removeClass( 'simple-imageupload-empty' );
			} );

			if ( this.$input.prop( 'files' ).length === 0 ) {
				// remove the preview
				$preview
					.css( 'background-image', '' )
					.addClass( 'simple-imageupload-empty' );
			}
			else {
				// we support only a single file per input-field by now
				$reader[0].readAsDataURL( this.$input.prop( 'files' )[0] );
			}

		},

		create_container: function () {
			this.$container = $( '<div class="simple-imageupload-container"></div>' );
			this.$container.clonecss( this.$input, [
				'background-color',
				'float',
				'margin-top',
				'margin-bottom',
				'margin-left',
				'margin-right',
				'position',
				'top',
				'bottom',
				'left',
				'right',
				'height',
				'width'
			] );
		},
		create_preview: function () {
			this.$preview = $( '<div class="simple-imageupload-preview simple-imageupload-empty">' )
				.attr( 'data-placeholder', this.opts.placeholder );
		},

		bind_events: function () {
			var self = this;

			this.$preview.on( 'click', function () {
				self.$input.trigger( 'click' );
			} );

			this.$input.on( 'change', function () {
				self.update_preview();
			} );
		}
	};
} ( jQuery ) );
//# sourceMappingURL=jquery.simple-imageupload.js.map