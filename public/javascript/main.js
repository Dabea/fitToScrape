 
 $('.delete-story').on('click', (event) => removeSavedStory(event)   
 )
 
 function removeSavedStory(event) {
     console.log(event);
    $(event.target).closest('.article-js').remove();
 }