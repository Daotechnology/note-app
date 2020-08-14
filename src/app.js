const express = require('express');
const log = console.log;
//express itself is a function
const app = express();
const getFile = require('./writeFile.js');
const hbs = require('hbs');
const port = process.env.PORT || 3000;
const path = require('path');
const { takeFile,deleteFile , editId} = require('./writeFile.js');
const pathName = path.join(__dirname,'../public');
const templatePath = path.join(__dirname,'../template/views');
const partialPath = path.join(__dirname,'../template/partials');

//set handle bar as my default view Engine

app.set('view engine','hbs');
app.set('views',templatePath)
hbs.registerPartials(partialPath);

app.use(express.static(pathName));  //use to serve a static file

app.get('',(req,res)=>{
    res.render('index',{
        name:'Guest'
    })
})

app.get('/take',(req,res)=>{
    takeFile((error,data)=>{
        if (data) {
         return res.send({
            data,
            })
        }
        return res.send({
            data,
        })
        
    })
})

app.get('/delete*',(req,res)=>{
    let id = req.query.id ;
    deleteFile(id,(err,data)=>{
        if ( err ) {
            return res.send({
                error:'Nothing to delete ,or not in the Database'
            })
        }
            return res.send({
                data:data,
            })
    })
})

app.get('/edit*',(req,res)=>{
    let id = req.query.id ;
    editId(id, (err,data) =>{
        if ( err ) {
            return res.send({
                error:'Nothing to delete,or not in the Database'
            })
        }
            return res.send({ data })
    })
})

app.get('/file*',(req,res)=>{
    let title = req.query.title;
    let content = req.query.content
    if (title == '' || content == '') {
        return res.send({
            error:'The Title or the content must not be empty'
        })
    }

    getFile.getFile({title,content},(err,success)=>{
        if ( success ) {
            return res.send({
                title,
                content2
            })
        }
            return res.send({
                error:'Error 404'
            })
    })

})

    app.listen(port,()=>{
    log('Port Created on Port ' + port);
})





