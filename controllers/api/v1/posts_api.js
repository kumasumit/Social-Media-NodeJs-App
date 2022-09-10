module.exports.index = function(req,res)
{
    return res.json(200, {
        message: "Lists of posts",
        posts: []
    })
    // here we are returning json with 200 success request
}