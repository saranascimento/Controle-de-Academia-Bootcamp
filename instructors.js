const fs = require('fs')
const data = require('./data.json')
const { age, date } = require('./utils')
const Intl = require('intl')

exports.index = function(req, res) {
    return res.render("instructors/index", {instructors: data.instructors})
}

// show
exports.show = function(req, res) {
    // req.params
    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor) {
        return id == instructor.id
    })

    if(!foundInstructor) return res.send("Instructor not found!")

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at)
    }

    return res.render("instructors/show", { instructor })
}

// create
exports.post = function(req, res) {
    
    const keys = Object.keys(req.body)

    for(key of keys) {
        
        if(req.body[key] == "") {
            return res.send("Por favor, preencha todos os campos!")
        }
            
    }

    let { avatar_url, birth, name, services, gender } = req.body

    
    birth = Date.parse(birth) 
    const created_at = Date.now()
    const id = Number(data.instructors.length + 1)

    data.instructors.push({ 
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    }) 

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write file error")

        return res.redirect(`/instructors/${id}`)
    })

    // return res.send(req.body)
}

// edit
exports.edit = function(req, res) {
    // req.params
    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor) {
        return id == instructor.id
    })

    if(!foundInstructor) return res.send("Instructor not found!")


    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth)
        
    }
    console.log(foundInstructor.birth)


    return res.render('instructors/edit', { instructor })
}

// put
exports.put = function(req, res) {
    // req.body
    const { id } = req.body
    console.log(data)

    const foundInstructor = data.instructors.find(function(instructor) {
        return id == instructor.id
    })

    if(!foundInstructor) return res.send("Instructor not found!")

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.instructors[id -1] = instructor
    console.log(data.instructor)

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write error!")
        
        return res.redirect(`/instructors/${id}`)
    })
}

// delete
exports.delete = function(req, res) {
    const { id } = req.body

    const filteredInstructors = data.instructors.filter(function(instructor) {
        return instructor.id != id
    })

    data.instructors = filteredInstructors

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error!")

        return res.redirect("/instructors")
    })
}