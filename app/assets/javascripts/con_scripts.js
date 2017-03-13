// Backbone Model

var Con = Backbone.Model.extend({
	defaults: {
		con: ''
	}
}); // picky about semicolon


// Backbone Collection

var Cons = Backbone.Collection.extend({});

// instantiate a Collection

var cons = new Cons()


// create Backbone Views

// individual Blog
var ConView = Backbone.View.extend({
  model: new Con(),
  tagName: 'tr', // refers the to HTML tag given to each instantiate Blog object.
  initialize: function () {
    this.template = _.template($('.cons-list-template').html()); // template = <script type="text/template" class="blogs-list-template">, what does _ do?
  },
	events: { 	// after initialize listen for the following events:
		'click .edit-con': 'edit', // clicl.edit-blog refers to the class of that button, run 'edit'
		'click .update-con': 'update',
		'click .cancel' : 'cancel',
		'click .delete-con' : 'delete'
	},
	edit: function() { // when edit button is click this function changes the buttons (update and cancel), and sets the current values in the input fields.
		$('.edit-con').hide();
		$('.delete-con').hide();
		this.$('.update-con').show();
		this.$('.cancel').show();


		var con = this.$('.con').html();

		this.$('.con').html('<input type="text" class="form-control author-update" value="' + con + '">')
	},
	update: function() { // when update button is clicked will save the new date in the table row. *needed to update BlogsView bellow.
		this.model.set('con', $('.con-update').val());
	},
	cancel: function() {
		consView.render();
	},
	delete: function() {
		this.model.destroy(); // BlogsView will have to listen for the removal of an item
	},
  render: function() { //when you render the blogs:
    this.$el.html(this.template(this.model.toJSON())); // passes the info from the new blog object into the the template.
    return this
  }
});
// all Blogs
var ConsView = Backbone.View.extend({
  model: cons, // blogs refers to the collection of all current blogs, create on line 14.
  el: $('.cons-list'), // el is where all the event binding takes place. Referes to <tbody class="blogs-list"></tbody>
  initialize: function() {
		var self = this;
		this.model.on('add', this.render, this); // 'everytime a blog is added, render this view'
		this.model.on('change', function() { // responsible for making sure author, title, and url all get updated. Otherwise only author would get changed.
			setTimeout(function() {							// this.render wont work, so a function is needed.
				self.render();
			}, 30);
		} , this);
		this.model.on('remove', this.render, this);
  },
  render: function() {
    var self = this; // this wont work in -.each() loop, set to new var.
    this.$el.html(''); // clears the form after a new entry has been added. (entries will repeat)
    _.each(this.model.toArray(), function(con) { // _.each is a function that iterates through all the blogs, and runs a function for each.
      self.$el.append((new ConView({model: con})).render().$el); // for each item in blogs array, give it (append) a new BlogView with that blog as the model ({model: blog}), then render it in the element (.$el)
    })
    return this;        // don't need
  }
});


var consView = new ConsView();
// code for adding a new blog from the form.
$(document).ready(function(){               // on document ready do,
  $('.add-con').on('click', function(){    // the the add-blog button is clicked, run this function:
    var con = new Con({                   // instantiate a blog object with the following values:
      con: $('.con-input').val(),     // .val() referes to the value in that field.
    });
    $('.con-input').val('')              // reset all the values to blank.
    console.log(con.toJSON());
    cons.add(con);                        // add that instantiated blog to the blogs array.
  })                                          // * because it was added to the blogs array, the above function will run and add it to the table.
})