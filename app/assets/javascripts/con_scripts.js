
var Con = Backbone.Model.extend({
	defaults: {
		con: ''
	}
});

var Cons = Backbone.Collection.extend({});
var cons = new Cons()

var ConView = Backbone.View.extend({
  model: new Con(),
  tagName: 'tr',
  initialize: function () {
    this.template = _.template($('.cons-list-template').html());
  },
	events: { 	// after initialize listen for the following events:
		'click .edit-con': 'edit',
		'click .update-con': 'update',
		'click .cancel' : 'cancel',
		'click .delete-con' : 'delete'
	},
	edit: function() {
		$('.edit-con').hide();
		$('.delete-con').hide();
		this.$('.update-con').show();
		this.$('.cancel').show();

		var con = this.$('.con').html();

		this.$('.con').html('<input type="text" class="form-control author-update" value="' + con + '">')
	},
	update: function() {
		this.model.set('con', $('.con-update').val());
	},
	cancel: function() {
		consView.render();
	},
	delete: function() {
		this.model.destroy();
	},
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this
  }
});

var ConsView = Backbone.View.extend({
  model: cons,
  el: $('.cons-list'),
  initialize: function() {
		var self = this;
		this.model.on('add', this.render, this);
		this.model.on('change', function() {
			setTimeout(function() {
				self.render();
			}, 30);
		} , this);
		this.model.on('remove', this.render, this);
  },
  render: function() {
    var self = this;
    this.$el.html('');
    _.each(this.model.toArray(), function(con) {
      self.$el.append((new ConView({model: con})).render().$el);
    })
    return this;
  }
});

var consView = new ConsView();
// code for adding a new con from the form.
$(document).ready(function(){
  $('.add-con').on('click', function(){
    var con = new Con({
      con: $('.con-input').val(),
    });
    $('.con-input').val('')
    console.log(con.toJSON());
    cons.add(con);
  })
})
