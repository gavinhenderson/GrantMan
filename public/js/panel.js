var current = "inbox";

updateCategory(current);

function removeActive(){
	$("#all").removeClass("is-active");
	$("#inbox").removeClass("is-active");
	$("#completed").removeClass("is-active");
	$("#search").removeClass("is-active");
}

function updateCategory(newCat){
	current = newCat;
	removeActive();
	$("#"+newCat).addClass("is-active");
	if(current!="search"){
		update();
	}else{
		search($("#searchBox")[0].value,true);
	}
}

function update(){
	$(".panel-element").remove();
	if (projects[current].length > 0) {
		projects[current].forEach(function(project){
			var statusMessage = project.status.statusMessage;
			if(statusMessage != "Project approved"){
			  statusMessage += " required";
			}
			var html = [
				"<a class='panel-block panel-element' href='/project/"+project.projectId+"'>",
				"<span class='panel-icon'>",
				"<i class='fas fa-book'></i>",
				"</span>",
				"<p style='text-align:left;width:60%'>"+project.title+"</p>",
				"<p style='text-align:right;width:40%'>"+statusMessage+" required</p>",
				"</a>"].join("");
			$(".panel").append(html);
		});
	} else {
		var html = [
			"<div class='panel-block panel-element'><p style='text-align:center;width:100%'>No projects to show</p></div>"
		]
		$(".panel").append(html);
	}

}
