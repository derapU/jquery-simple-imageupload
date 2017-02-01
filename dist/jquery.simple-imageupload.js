/*! Simple Imageupload - v0.1.0 - 2017-02-01
* https://github.com/derapU/jquery-simple-imageupload
* Copyright (c) 2017 Andreas Berghaus; Licensed MIT */
( function ( $ ) {
	"use strict";

	var SimpleImageupload;

	$.fn.simple_imageupload = function ( opts ) {
		return this.each( function () {
			if ( undefined !== this.simple_imageupload ) {
				this.simple_imageupload.revert();
			}
			this.simple_imageupload = new SimpleImageupload( $( this ), opts );
			return this.simple_imageupload;
		} );
	};

	SimpleImageupload = function ( $input, opts ) {
		this.init( $input, opts );
		return this;
	};
	SimpleImageupload.prototype = {
		default_opts: {
			placeholder:   'Click to choose image',
			current_image: null,
			trigger:       null,
			events: {
				change: function () {}
			}
		},
		opts: null,
		initial_value: null,

		$container: null,
		$preview: null,
		$input: null,

		init: function ( $input, opts ) {
			this.initial_value = $input.val();

			// configure and save the original field
			this.opts   = $.extend( true, {}, this.default_opts, opts );
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
			var self = this,
				$reader,
				$preview = this.$preview;

			// display revert-icon
			if ( 0 < this.$input.prop( 'files' ).length ) {
				this.$container.find( '._revert' ).removeClass( '_revert-hidden' );
			}
			else {
				this.$container.find( '._revert' ).addClass( '_revert-hidden' );
			}

			if ( undefined === this.$input.prop( 'files' )[0] ) {
				if ( null !== this.opts.current_image ) {
					this.set_preview_image( this.opts.current_image );
				}
				return;
			}

			if ( undefined === FileReader ) {
				// TODO:
				// preview not available
				return;
			}

			// create filereader
			$reader = $( new FileReader() ).on( 'load', function ( e ) {
				self.set_preview_image( e.target.result );
			} );

			if ( this.$input.prop( 'files' ).length === 0 ) {
				self.set_preview_image();
			}
			else {
				// we support only a single file per input-field by now
				$reader[0].readAsDataURL( this.$input.prop( 'files' )[0] );
			}
		},
		set_preview_image: function ( url ) {
			if ( undefined !== url ) {
				this.$preview
				.css( 'background-image', 'url("' + url + '")' )
				.removeClass( 'simple-imageupload-empty' );
				return;
			}

			// remove the preview
			this.$preview
			.css( 'background-image', '' )
			.addClass( 'simple-imageupload-empty' );
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
				'top',
				'bottom',
				'left',
				'right',
				'height',
				'width'
			] );
			this.$container.append( '<a href="#" class="_revert _revert-hidden"></a>' );
		},
		create_preview: function () {
			this.$preview = $( '<div class="simple-imageupload-preview simple-imageupload-empty">' )
				.attr( 'data-placeholder', this.opts.placeholder );

			this.update_preview();
		},

		bind_events: function () {
			var self = this;

			if ( null !== this.opts.trigger ) {
				this.opts.trigger.on( 'click', function () {
					self.$input.trigger( 'click' );
				} );
			}

			this.$preview.on( 'click', function () {
				self.$input.trigger( 'click' );
			} );

			this.$input.on( 'change', function () {
				self.update_preview();
				self.opts.events.change.apply( self, [$( this ).val()] );
			} );

			this.$container.find( '._revert' ).on( 'click', function () {
				self.$input.val( self.initial_value );
				self.update_preview();
			} );
		},
		set_current_image: function ( url ) {
			this.opts.current_image = url;
		},
		reset: function () {
			var $file = this.$input;

			$file.wrap( '<form>' ).closest( 'form' ).get( 0 ).reset();
			$file.unwrap();

			this.update_preview();
		},

		revert: function () {
			this.$container.replaceWith( this.$input );
			this.$input.val( this.initial_value );
			this.$input.get( 0 ).simple_imageupload = undefined;
		}
	};
} ( jQuery ) );

//# sourceMappingURL=jquery.simple-imageupload.js.map