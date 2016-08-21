$(function () {

	$("[data-toggle='tooltip']").tooltip();


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
		project = $(this).parents("form").find("input[name='id']").val();
		$.get( "?checkURL=" + url + "&id=" + project, function( data ) {
		  if(data==0){
		  	$("form[id^=project-edit-]:visible").find(".url-available").show();
		  }else{
		  	$("form[id^=project-edit-]:visible").find(".url-taken").show();
		  }
		});
	});

	$(document).on("click", ".image-new" , function() {
		form = $(this).parents("form").next("form.image-upload");
		form.find("input[type='file']").trigger('click');
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
					wrapper = $("div[id^='modal-edit-']:visible .project-image:first").clone().insertBefore(".image-new:visible");
					img = wrapper.find("img");
					img.attr("src","../img/projects/" + data + "-p.jpg");
					wrapper.attr("data-id",data).removeClass("primary").show();
					if($(".project-image:visible").length==1){
						wrapper.addClass("primary");
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
	$(".projects.sortable li").on("mousedown", function () {
	    $(this).addClass("mouseDown");
	}).on("mouseup", function () {
	    $(this).removeClass("mouseDown");
	});

	$( "form[id^=project-edit-] .sortable" ).sortable({
		items: "li:not(.image-new)"
	});

});