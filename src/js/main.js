FazendaRank = new (Backbone.View.extend({
	Models: {},
	Collections: {},
	Views: {},
	start: function(rootEl){
	    this.render(rootEl);
	},
	render: function(rootEl){
	    this.el = rootEl;
	    this.renderItems();
	    return this;
	},
	renderItems: function(){
		this.items = new FazendaRank.Collections.Items();
		this.itemViews = new FazendaRank.Views.ItemViews({collection: this.items});
	    this.itemViews.render().$el.appendTo(this.el);
	}
}))();	

FazendaRank.Models.Data = Backbone.Model.extend({});

FazendaRank.Collections.Items = Backbone.Collection.extend({
	model: FazendaRank.Models.Data,
	url: "fazenda.json", 
	parse: function(response){
       return response.data;
    },
    initialize: function(){
    	this.comparator = function(model) {
    		var get_positive, 
    			get_negative, 
    			total_positive_negative, 
    			percent_positive, 
    			percent_negative;

    		get_positive = Number(model.get("positive")); 
			get_negative = Number(model.get("negative") || 0);
			total_positive_negative = get_positive + get_negative ;
			percent_positive = Math.round((get_positive / total_positive_negative)*100) || 0;
			percent_negative = Math.round((get_negative / total_positive_negative)*100) || 0;
			model.set({ positive: percent_positive, negative: percent_negative });
			return -model.get('positive');
		}
    }
});

FazendaRank.Views.ItemViews = Backbone.View.extend({
	initialize: function(){
		this.listenToOnce(this.collection, 'reset', this.renderForEach);
		this.listenToOnce(this.collection, 'sort', this.renderForEach);
	},
	tagName: 'ul',
	className: "listArtists",
	render: function(){
	   	this.collection.trigger('reset');
    	return this;
   	},
	renderForEach: function(){
		this.$el.empty();
		this.collection.forEach(this.renderEach, this);
		this.collection.fetch();
	},
	renderEach: function(tweet){
		this.itemView = new FazendaRank.Views.ItemView();	
		this.itemView.model = tweet;
		this.itemView.model.set({ id: this.collection.indexOf(tweet)+1 });
		this.itemView.render().$el.appendTo(this.el);
	}
});

FazendaRank.Views.ItemView = Backbone.View.extend({
	events: {
		'mouseover a': 'show',
		'mouseout a': 'hide',
	},
	template: _.template('<a href="#" class="item<%= id %>"><div class="image"><img src="<%= picture %>"><div class="position"><span><%= id %></span></div></div>\
	<div class="text"><h2><%= name %></h2><p><%= description %></p></div>\
	<div class="percent tooltip">\
		<div class="brdl"></div>\
		<div class="positive"><h6>Gostam</h6><span><%= positive %>%</span></div>\
		<div class="negative"><h6>Não Gostam</h6><span><%= negative %>%</span></div>\
		<div class="brdr"></div>\
	</div></a>'),
	tagName: 'li',
	render: function(){
		var innerHtml = this.template(this.model.toJSON());
		this.$el.html(innerHtml);	
		return this;
	},
	show: function(e){
		$(e.currentTarget).find(".tooltip")[0].style.visibility = "visible";
	},
	hide: function(e){
		$(e.currentTarget).find(".tooltip")[0].style.visibility = "hidden";
	}	
});



  
	
