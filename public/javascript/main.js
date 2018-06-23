 
 $('.delete-story').on('click', (event) => removeSavedStory(event))

 function removeSavedStory(event) {
     const id = $(event.target).data("id");
     
     console.log(event);
    $(event.target).closest('.article-js').remove();
    $.ajax({
        url: `/api/${id}`,
        type: 'DELETE',
        success: function(result) {
            console.log("Delete sucessfull")
        },
    });
 }

 $('.save-story').on("click" ,(event) => {saveStory(event)})

function saveStory(event) {
   const $story = $(event.target);
   const title = $story.closest('js-link')
   console.log($story.closest('') )

   console.log(title);

}