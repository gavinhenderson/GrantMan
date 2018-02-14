var current = "inbox";

updateCategory(current);

function removeActive(){
  $("#all").removeClass('is-active');
  $("#inbox").removeClass('is-active');
  $("#completed").removeClass('is-active');
  $("#deleted").removeClass('is-active');
  $("#search").removeClass('is-active');
}

function updateCategory(newCat){
  current = newCat;
  removeActive();
  $("#"+newCat).addClass('is-active');
  if(current!='search'){
    update()
  }
}

function update(){
  $('.panel-element').remove();
  projects[current].forEach(function(project){
    var html = [
      "<a class='panel-block panel-element' href='/project?id="+project.id+"'>",
      "<span class='panel-icon'>",
      "<i class='fas fa-book'></i>",
      "</span>",
      "<p style='text-align:left;width:70%'>"+project.name+"</p>",
      "<p style='text-align:right;width:30%'>"+project.status+"</p>",
      "</a>"].join("");
    $('.panel').append(html);
  });
}
