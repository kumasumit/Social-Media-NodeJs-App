{
    console.log("sumit");
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
                    let newPost = newPostDom(data.data.post);
                    // here we go to posts-lists-container and insde ul and prepend the newPost that we just added to the dom at the top, the latest post appears at the top
                    $('#posts-list-container>ul').prepend(newPost);
                    //this code will reset the form values to empty after successfull form ajax/jquery post request
                    $('#new-post-form')[0].reset();
                    
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
        return $(`<li id="post- ${post._id}">
             <small>
              <a href="/posts/destroy/<%= post.id %>">X</a>
             </small>
        <p>
            ${post.content} <br />
            ${post.userId.name} 
            <!-- display.name only if post.userId exists, if it does not do nothing -->
        </p>
        <div class="post-comments">
              <form action="/comments/create" method="POST">
                <input
                  type="text"
                  name="content"
                  placeholder="Add Comments ...."
                  required
                />
                <input type="hidden" name="post" value="<%= post._id %>" />
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
    createPost();
}