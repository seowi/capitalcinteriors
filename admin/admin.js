$(function () {

	$("[data-toggle='tooltip']").tooltip();


	$(document).on("click", "#featured .featured-new" , function() {
		form = $("#featured form");
		form.find("input[type='file']").trigger('click');
	});
	$(document).on("change", "#featured form input[type='file']" , function() {
		$(".featured-new i.fa-plus").hide();		
		$(".featured-new i.fa-refresh").show();
		$(this).parents("form").trigger('submit');
	});
	$(document).on("click", "#featured .image-delete" , function() {
		if($(".featured-image:visible").length==1){
			alert("You can't delete all featured images. Add a new one and then try deleting this again.");
			return false;
		}
		var r = confirm("Definitely delete this featured image?");
		if (r == true) {
			wrapper = $(this).parents("li");
			filename = wrapper.data("id");
			console.log(filename)
			$.get("?deleteFeatured=" + filename);
			wrapper.hide();
		}
	});


	$(document).on("click", ".project-delete" , function() {
		var r = confirm("Definitely delete this item?");
		if (r == true) {
			form = $(this).parents("form");
			form.find("input[name='deleted']").val(1);
			form.trigger("submit");
		}
	});

	$(document).on("keyup", "input[name='url']" , function() {
	  	$(this).parents(".form-group").find(".url-validate").hide();
		url = $(this).val();
		id = $(this).parents("form").find("input[name='id']").val();
		type = $(this).parents("form").find("input[name='type']").val();
		getURL = "?checkURL=" + url + "&id=" + id + "&type=" + type;
		console.log(getURL);
		$.get( getURL, function( data ) {
			console.log(data);
		  if(data==0){
		  	$(".modal-edit:visible").find(".url-available").show();
		  }else{
		  	$(".modal-edit:visible").find(".url-taken").show();
		  }
		});
	});

	$(document).on("click", ".image-new, .icon-new" , function() {
		form = $(this).parents("form").next("form.image-upload");
		select = form.find("input[type='file']");
		select.trigger('click');
		if($(this).is(".icon-new")){
			select.attr("data-dest","icon");
		}else{
			select.attr("data-dest","images");
		}
		return false;
	});

	$(document).on("change", "form.image-upload input[type='file']" , function() {
		$(".image-new:visible i.fa-plus").hide();		
		$(".image-new:visible i.fa-refresh").show();
		$(this).parents("form").trigger('submit');
	});

	$(document).on("click", ".image-primary:visible" , function() {
		wrapper = $(this).parents(".row");
		wrapper.find(".project-image").removeClass("primary");
		$(this).parents(".project-image").addClass("primary");
		return false;
	});
	$(document).on("click", ".image-delete:visible" , function() {
		if($(".project-image:visible").length==1){
			alert("You can't delete all project images. Add a new one and then try deleting this again.");
			return false;
		}
		wrapper = $(this).parents(".project-image");
		if(wrapper.is(".primary")){
			$(".project-image:visible:first").addClass("primary");
		}
		wrapper.hide();
		return false;
	});

    $(document).on("submit", "form[id^=project-edit-]" , function(e) {
    	// Validate
    	if($("input[name='title']:visible").val()==""){
    		alert("You must specify a project title");
    		return false;
    	}
    	if($(".url-taken:visible").length>0){
    		alert("The URL you've chosen is not available.");
    		return false;
    	}
    	if($(".project-image:visible").length==0){
    		alert("You must upload at least one project image.");
    		return false;
    	}
    	// Create list of images
    	var images = "";
		$(this).find('.project-image[data-id]:visible').each(function(){
			id = $(this).data("id");
			images = images + "," + id;
		});
		$(this).find("input[name='images']").val(images);
		// Set primary image
		primary = $(".modal.project-edit:visible .project-image.primary img").parents(".project-image").data("id");
		$(this).find("input[name='image-primary']").val(primary);
    });

    $(document).on("submit", "form[id^=press-edit-]" , function(e) {
    	// Validate
    	if($("input[name='title']:visible").val()==""){
    		alert("You must specify an article title");
    		return false;
    	}
    	if(+$(".modal-edit:visible input[name='icon']").val()==0){
    		alert("You must upload a publication icon");
    		return false;
    	}
    	if($(".url-taken:visible").length>0){
    		alert("The URL you've chosen is not available.");
    		return false;
    	}
    	if($(".project-image:visible").length==0){
    		alert("You must upload at least one article image.");
    		return false;
    	}
    	// Create list of images
    	var images = "";
		$(this).find('.project-image[data-id]:visible').each(function(){
			id = $(this).data("id");
			images = images + "," + id;
		});
		$(this).find("input[name='images']").val(images);
    });

    $(document).on("submit", "form.image-upload" , function(e) {
		var formObj = $(this);
		var formURL = formObj.attr("action");
		var formData = new FormData(this);
		$.ajax({
			url: formURL,
	        context: this,
			type: 'POST',
			data:  formData,
			mimeType:"multipart/form-data",
			contentType: false,
			cache: false,
			processData:false,
			success: function(data, textStatus, jqXHR){
				if(data.indexOf(' ')>=0){
					alert(data);
				}else{
					console.log(data);
					dest = $(".modal-edit:visible form.image-upload input[type='file']");
					if(dest.attr("data-dest")=="icon"){
						$(".article-icon:visible").attr("src","../img/projects/" + data + ".jpg");
						$(".modal-edit:visible input[name='icon']").val(data);
						$(".modal-press-icon:visible").removeClass("new");
					}else{
						wrapper = $(".modal-edit:visible .project-image:first").clone().insertBefore(".image-new:visible");
						img = wrapper.find("img");
						img.attr("src","../img/projects/" + data + "-p.jpg");
						wrapper.find("a.image-view").attr("href","../img/projects/" + data + ".jpg");
						wrapper.attr("data-id",data).removeClass("primary").show();
						if($(".project-image:visible").length==1){
							wrapper.addClass("primary");
						}
					}
					$("[data-toggle='tooltip']").tooltip();
				}	
				$(".image-new:visible i.fa-refresh").hide();
				$(".image-new:visible i.fa-plus").show();	
			},
			error: function(jqXHR, textStatus, errorThrown){
				alert("Error: " + data);
			}          
		});
		e.preventDefault(); 
		// e.unbind();
		return false;
    });

	$('ul').height($('ul').height());
	$( ".projects.sortable" ).sortable({
		stop: function( event, ui ) {
			projects = "";
			$('.projects.sortable li').each(function(){
				id = $(this).data("id");
				projects = projects + "," + id;
			});
			$.get( "?orderProjects="+projects, function( data ) {});
			console.log("?orderProjects="+projects);
		}
	});
	$( ".featured.sortable" ).sortable({
		stop: function( event, ui ) {
			featured = "";
			$('.featured.sortable li[data-id]').each(function(){
				id = $(this).data("id");
				featured = featured + "," + id;
			});
			$.get( "?orderFeatured="+featured, function( data ) {});
			console.log("?orderFeatured="+featured);
		}
	});
	$(".projects.sortable li").on("mousedown", function () {
	    $(this).addClass("mouseDown");
	}).on("mouseup", function () {
	    $(this).removeClass("mouseDown");
	});

	$( ".modal-edit .sortable" ).sortable({
		items: "li:not(.image-new)"
	});

});