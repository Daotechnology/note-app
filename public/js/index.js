const noteTitle = document.querySelector("#noteTitle");
const noteText = document.querySelector("#noteText");
const saveNote = document.querySelector("#saveNote");
const listnote = document.querySelector(".listNote");
class Note {

    savenote(){
        let title = noteTitle.value;
        let content = noteText.value;
        this.takeNotes(title,content)
    }

     takeNotes(title,content){
        fetch(`/file?title=${title}&content=${content}`).then(dataUnready=>{
            dataUnready.json().then(data=>{
                if (data.content || data.title){
                    title = '';
                    content="";
                }
            })
        });
        
        

    }


    listnotetitle(){
        fetch(`/take`).then(dataUnready=>{
            dataUnready.json().then(data=>{
                data.data.map(list=>{
                    if (list.title || list.content || list.id) {
                    listnote.innerHTML +=`
                        <li data-id = ${list.id} class="list-group-item">
                        ${list.title} <button id = "del" data-id = ${list.id} class = "">del</button><button id = "edit" data-id = ${list.id} class = "">Edit</button></li>
                        `

                        document.querySelectorAll("#del").forEach(listid=>{
                            listid.addEventListener("click",(e)=>{
                                this.deleteId(e.target.dataset.id);
                            })
                        })
                        
                        document.querySelectorAll("#edit").forEach(listid=>{
                            listid.addEventListener("click",(e)=>{
                                this.editId(e.target.dataset.id);
                            })
                        })
                    }
                })
                
            })
        });
    }

    deleteId(id){
        fetch(`/delete?id=${id}`).then(dataUnready=>{
            dataUnready.json().then(data=>{
                if (data){
                    listnote.innerHTML = '';
                    this.listnotetitle();
                }
            })
        })
    }

    editId(id){
        fetch(`/edit?id=${id}`).then(dataUnready=>{
            dataUnready.json().then(data=>{
                if ( data ){
                    listnote.innerHTML = '';
                    this.listnotetitle();
                    data.data.forEach(itemList=>{
                        noteTitle.value = itemList.title;
                        noteText.value  = itemList.content;
                    })
                   
                }
            })
        })
    }

}

saveNote.addEventListener("click",(e)=>{
    e.preventDefault();
    const note = new Note()
    note.savenote();
    listnote.innerHTML = '';
    note.listnotetitle()
})

document.addEventListener("DOMContentLoaded",()=>{
    const note = new Note()
    note.listnotetitle();
})