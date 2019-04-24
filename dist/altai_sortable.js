/*
* Name: set_sortable
* Title: Set Sortable
* Description: Reorder elements in a list or grid.
*
*/

// jQuery & Rails
import $ from "jquery"
import jQuery from "jquery"
import Rails from "@rails/ujs"

(($, window, document) => $.fn.extend({
  altaiSortable(options) {

    // Lets & Constants
    let action
    let log
    let settings
    const object = $(this)

    // Settings
    settings = {
      debug: true
    }
    settings = $.extend(settings, options)

    // Log
    log = message => {
      if (settings.debug) {
        return console.log(message)
      } else {
        return undefined
      }
    }

    // Action
    action = () => {
      object.each( () => {
        $(this).sortable({
          containment: "body",
          cursor: "move",
          option: "grid",
          handle: ".handle",
          update(event, ui) {
            Rails.ajax({
              url: $(this).data("url"),
              type: "PATCH",
              data: $(this).sortable("serialize")
            })
          }
        })
        log("Altai Sortable Activated")
      })
    }

    // If object found run actions
    if (object.length > 0) {
      action()
    }
  }
}))(jQuery, window, document)
