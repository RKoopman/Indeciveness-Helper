// Backbone Model

var Pro = Backbone.Model.extend({
	defaults: {
		pro: ''
	}
});

// Backbone Collection

var Pros = Backbone.Collection.extend({});

// instantiate a Collection
var pros = new Pros()

// individual Pros
var ProView = Backbone.View.extend({
  model: new Pro(),
  tagName: 'tr', // refers the to HTML tag given to each instantiate Pro object.
  initialize: function () {
    this.template = _.template($('.pros-list-template').html());
  },
	events: { 	// after initialize listen for the following events:
		'click .edit-pro': 'edit',
		'click .update-pro': 'update',
		'click .cancel' : 'cancel',
		'click .delete-pro' : 'delete'
	},
	edit: function() {
		$('.edit-pro').hide();
		$('.delete-pro').hide();
		this.$('.update-pro').show();
		this.$('.cancel').show();

		var pro = this.$('.pro').html();

		this.$('.pro').html('<input type="text" class="form-control author-update" value="' + pro + '">')
	},
	update: function() {
		this.model.set('pro', $('.pro-update').val());
	},
	cancel: function() {
		prosView.render();
	},
	delete: function() {
		this.model.destroy();
	},
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this
  }
});
// all Pros
var ProsView = Backbone.View.extend({
  model: pros,
  el: $('.pros-list'), // el is where all the event binding takes place. Referes to <tbody class="pros-list"></tbody>
  initialize: function() {
		var self = this;
		this.model.on('add', this.render, this); // 'everytime a pro is added, render this view'
		this.model.on('change', function() {
			setTimeout(function() {
				self.render();
			}, 30);
		} , this);
		this.model.on('remove', this.render, this);
  },
  render: function() {
    var self = this; // this wont work in -.each() loop, set to new var.
    this.$el.html(''); // clears the form after a new entry has been added. (entries will repeat)
    _.each(this.model.toArray(), function(pro) { // _.each is a function that iterates through all the pros, and runs a function for each.
      self.$el.append((new ProView({model: pro})).render().$el); // for each item in pros array, give it (append) a new ProView with that pro as the model ({model: pro}), then render it in the element (.$el)
    })
    return this;        // don't need
  }
});

var prosView = new ProsView();
// code for adding a new pro from form ('.pro-input' & '.add-pro').
$(document).ready(function(){               // on document ready do,
  $('.add-pro').on('click', function(){    // the the add-pro button is clicked, run this function:
    var pro = new Pro({                   // instantiate a pro object with the following values:
      pro: $('.pro-input').val(),     // .val() referes to the value in that field.
    });
    $('.pro-input').val('')              // reset all the values to blank.
    console.log(pro.toJSON());
    pros.add(pro);                        // add that instantiated pro to the pros array.
  })                                          // * because it was added to the pros array, the above function will run and add it to the table.
})
