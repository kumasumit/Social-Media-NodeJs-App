{
    console.log("sumit");
    // method to submit the form data for new post using AJAX/Jquery
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(event){
            event.preventDefault();
            //this is where ajax post request starts
            $.ajax({
                type:"POST",
                url:"/posts/create",
                data: newPostForm.serialize(),
                //serialize will convert the form data into json data
                success:function(data){
                    console.log(data);
                },
                error: function(error){
                    console.log(error.responseText);
                } 
                
            })
        })
    }
    createPost();
}