{
    console.log("sumit-top");
    // method to submit the form data for new post using AJAX/Jquery
    let createPost = function () {
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
                    console.log(data.data.post._id);
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

    //method to create a Post in the Dom for displaying created Posted from above
    let newPostDom = function (post) {
        return $(`<li id="post-${post._id}">
             <small>
              <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
             </small>
        <p>
            ${post.content} <br />
            ${post.userId.name} 
            <!-- display.name only if post.userId exists, if it does not do nothing -->
        </p>
        <div class="post-comments">
              <form id="post-${post._id}-create-comments-form" action="/comments/create" method="POST">
                <input
                  type="text"
                  name="content"
                  placeholder="Add Comments ...."
                  required
                />
                <input type="hidden" name="post" 
                value="${post._id}" />
                <input type="submit" value="Add Comment" />
              </form>
            <div class="post-comments-list">
                <ul id="post_comments_${post._id}">
                </ul>
            </div>
        </div>
    </li>
    `)

    }

    //method to delete a post from DOM
    let deletePost = function(deleteLink){
        // console.log("sumit-rahul");
        $(deleteLink).click(function(event){
            event.preventDefault();
            //this will prevent the default behaviour on click of that delete link
            // console.log("ritesh");
            //here we make the ajax get request
            $.ajax({
                type: 'GET',
                url: $(deleteLink).prop('href'),
                //this will give you href="/posts/destroy/<%= post.id %>"
                // the complete value stored in href will pass here
                success: function(data){
                    // console.log(data.data.post_id);
                    // console.log($(`#post-${data.data.post_id}`));
                    $(`#post-${data.data.post_id}`).remove();
                    //this will remove the li with the post_id link from the ul of div with id posts-list-container
                } ,
                error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }
    
    createPost();
}