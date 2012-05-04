angular.service('Comment', function(){
	return {
		query:function() { 
			var comments = [];
			for(var key in localStorage) {
				if(key.indexOf("comment_") == 0) {
					comments.push(JSON.parse(localStorage[key]));
				}
			}
			return comments; 
		},
		delete:function(i) {
			localStorage.removeItem("comment_"+i);
		},
		get:function(i) { 
			if(localStorage["comment_"+i]) return JSON.parse(localStorage["comment_"+i]);
		},
		store:function(comment) {
			if(!comment.hasOwnProperty('id')) {
				var comments = this.query();
				var highest = 0;
				for(var i=0; i<comments.length; i++) {
					if(comments[i].id > highest) highest=comments[i].id;
				}
				comment.id = ++highest;
			}
			comment.updated = new Date();
			localStorage["comment_"+comment.id] = JSON.stringify(comment);
		}
	}
	
});
