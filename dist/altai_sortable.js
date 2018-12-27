/*
* Name: set_sortable
* Title: Set Sortable
* Description: Reorder elements in a list or grid.
*
*/

// jQuery
var jQuery;

// Rails
var Rails;

(function($, window, document) {
  $.fn.extend({
    altaiSortable: function(options) {
      // Variables
      var action, log, settings;
      var object = $(this);

      // Default settings
      settings = {
        debug: true
      };
      settings = $.extend(settings, options);

      // Log
      log = function(message) {
        if (settings.debug) {
          if (typeof ((console === "undefined") && (console === null))) {
            return console.log(message);
          } else {
            return undefined;
          }
        } else {
          return undefined;
        }
      };

      // Action
      action = function() {
        object.each(function() {
          $(this).sortable({
            // axis: "y",
            containment: "body",
            cursor: "move",
            option: "grid",
            handle: ".handle",
            update: function(e, ui) {
              Rails.ajax({
                url: $(this).data("url"),
                type: "PATCH",
                data: $(this).sortable("serialize")
              });
            }
          });
        });
      };

      // If object found run actions
      if (object.length > 0) {
        return this.each(function() {
          action();
          log("Altai Sortable Activated");
        });
      }
    }
  });
})(jQuery, window, document);
