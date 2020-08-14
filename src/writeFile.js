const fs = require('fs');
const { v4: uuidv4 } = require('uuid')
const log = console.log;
let fileArr = [];
const getFile = ({title,content},callback)=> {
        const obj = {
            id:uuidv4(),
            title,
            content
        }
        try {
            const file = fs.readFileSync('note.json');
            const str = file.toString();
            let parsedStr = JSON.parse(str);
            parsedStr.push(obj);
            fs.writeFileSync('note.json',JSON.stringify(parsedStr));
        }
        catch (err) {
            fileArr = [];
            fileArr.push(obj);
            fs.writeFileSync('note.json',JSON.stringify(fileArr));
            callback(err,'Success');
        }
}

    const takeFile = (callback) =>{
        try{
            const file = fs.readFileSync('note.json');
            const str = file.toString();
            let parsedStr = JSON.parse(str);
            callback(undefined,parsedStr)
        } catch(err){
            callback('Empty File Please Load in Some Note...',undefined)
        }
    }

    const deleteFile = (id,callback) =>{
        try{
            const file = fs.readFileSync('note.json');
            const str = file.toString();
            let parsedStr = JSON.parse(str);
            let arr = parsedStr.filter(item=>item.id !== id);
            fs.writeFileSync('note.json',JSON.stringify(arr));
            callback(undefined,arr);
        } catch(err){
            callback('Cannot be deleted because the file does not exist.....',undefined)
        }
    }

    const editId = (id,callback) =>{
        try{
            const file = fs.readFileSync('note.json');
            const str = file.toString();
            let parsedStr = JSON.parse(str);
            let arr1 = parsedStr.filter(item=>item.id === id);
            let arr2 = parsedStr.filter(item=>item.id !== id);
            fs.writeFileSync('note.json',JSON.stringify(arr2));
            callback(undefined,arr1);
        } catch(err){
            callback('Cannot be deleted because the file does not exist.....',undefined)
        } 
    }

module.exports = {
    getFile:getFile,
    takeFile:takeFile,
    deleteFile:deleteFile,
    editId:editId
} 