 
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
    const  $story = $(event.target);
    const data = {
        title: $story.siblings('.js-link').text(),
        link: $story.siblings('.js-link').attr("href"),
        summary: $story.closest("h3").siblings('.js-summary').text()
    }
    $.post('/api/save', data)

    // data2  = JSON.stringify()
    // $.ajax({
    //     url: `/api/save`,
    //     type: 'POST',
    //     json:  {
    //         title: $story.siblings('.js-link').text(),
    //         link: $story.siblings('.js-link').attr("href"),
    //         summary: $story.closest("h3").siblings('.js-summary').text()
    //     },
    //     success: function(result) {
    //         console.log("Study Created sucessfull")
    //     },
    // });
}