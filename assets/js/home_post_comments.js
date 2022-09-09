{
    console.log('atul');
    // method to submit the form data for new post using AJAX/Jquery
    let createComment = function () {
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function (event) {
            event.preventDefault();
            //this is where ajax post request starts
            $.ajax({
                type: "POST",
                url: "/posts/create",
                data: newPostForm.serialize(),
                //serialize will convert the form data into json data
                success: function (data) {
                    // console.log(data.data.post);
                    let newPost = newPostDom(data.data.post);
                    // console.log($(newPost));
                    // console.log($(' .delete-post-button', newPost).prop('href'));
                    // here we go to posts-lists-container and insde ul and prepend the newPost that we just added to the dom at the top, the latest post appears at the top
                    $('#posts-list-container>ul').prepend(newPost);

                    deletePost($(' .delete-post-button', newPost));
                    //this will go inside new post and find the link with class delete-post-button
                    $('#new-post-form')[0].reset();
                    //this code will reset the form values to empty after successfull form ajax/jquery post request
                    // console.log(data);
                },
                error: function (error) {
                    console.log(error.responseText);
                }

            })
        })
    }
    //here we call the function createComment
    createComment();
}