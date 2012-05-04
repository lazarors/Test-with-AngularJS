function Comment($route){
  var self = this;

  $route.when('/comments',{template: 'partials/list.html',   controller: List});
  $route.when('/comments/add',{template: 'partials/add.html', controller: Add});
  $route.when('/comments/edit/:commentId',{template: 'partials/edit.html', controller: Edit});
  $route.when('/comments/:commentId',{template: 'partials/detail.html', controller: Detail});
  $route.otherwise({redirectTo: '/comments'});

  $route.onChange(function(){
    self.params = $route.current.params;
  });

  $route.parent(this);
}

function List(Comment_){
	var self = this;
	self.comments = Comment_.query();
  
	self.delete = function(id){
		Comment_.delete(id);
		self.comments = Comment_.query();
		self.$root.$eval();	
	}

  self.counting = function(){
    var count = 0;
    angular.forEach(self.comments, function(self){
      count += self.done ? 0 : 1;
    });
    return count;
  };

  self.done = function(id){
    var trCommentId = "#id"+id;
    $(trCommentId).addClass("done-true");
    $(trCommentId+ " .actions").remove();
  }
	
	self.edit = function(id){
		window.location = "./index.html#/comments/edit/"+id;
	}

	self.detail = function(id){
		window.location = "./index.html#/comments/"+id;
	}

}

function Detail(Comment_){
  var self = this;
  self.comment = Comment_.get(self.params.commentId);

  if(typeof self.comment === "undefined") window.location = "./index.html";
}

function Add(Comment_){
	var self = this;
	self.comment = { title:"", body:""};

	self.cancel = function(){
		window.location = "./index.html";
	}
  
	self.save = function(){
		Comment_.store(self.comment);
		window.location = "./index.html";
	}
  
}

function Edit(Comment_){
	var self = this;
		
	if(self.params.hasOwnProperty("commentId")) self.comment = Comment_.get(self.params.commentId);
	else self.comment = { title:"", body:""};

	self.cancel = function(){
		window.location = "./index.html";
	}
  
	self.save = function(){
		Comment_.store(self.comment);
		window.location = "./index.html";
	}
  
}