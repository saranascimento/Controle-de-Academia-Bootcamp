// create
exports.post = function(req,res) {
    //req.query

    //req.body
    // {"avatar_url": "https://www.google.com/","name": "Sara Gomes do Nascimento Santana","birth": "225549-05-22","gender": "M","services": ""}
    

    // ["avatar_url","name","birth","gender","services"]
    const keys = Object.keys(req.body)

    for(key of keys) {
        // req.body.key == ""
        if(req.body[key] == "") {
            return res.send("Por favor, preencha todos os campos!")
        }
            
    }

    return res.send(req.body)
}

