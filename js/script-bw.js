let currentID;

function fetch() {
    let mainContainer = document.getElementsByClassName("main-container")[0];

    fetch(
        'http://localhost:3000/photosBW?resourceIdentifier=BW',
        {
            method:'get'
        }   
        )
    .then(function(response){
        response.json().then((data)=>{
            for(let i=0; i<data.length; i++) {
                let photoContainer = document.createElement('div');
                photoContainer.setAttribute('class', 'photo-container');
                
                let overlay = document.createElement('div');
                overlay.setAttribute('class', 'overlay');
            
                let descriptionTitle = document.createElement('div');
                descriptionTitle.setAttribute('class', 'description-title');
                descriptionTitle.innerText="Description";



                let photo = document.createElement('img');
                photo.setAttribute('class', 'photo');
                photo.setAttribute('src', data[i].url);

                let description = document.createElement('div');
                description.setAttribute('class', 'description');
                description.innerText=data[i].description;

                let edit = document.createElement('button');
                edit.setAttribute('class', 'created');
                edit.innerText = 'Edit';
                edit.onclick = function() {
                    document.getElementById('url').value = data[i].url;
                    document.getElementById('description-input').value = data[i].description;
                    currentID = data[i].id;
                }

                let Delete = document.createElement('button');
                edit.setAttribute('class', 'created');
                Delete.innerText = 'Delete';
                Delete.onclick = function() {
                    Delete(data[i].id);
                }
                
                photoContainer.appendChild(photo);
                photoContainer.appendChild(overlay);
                photoContainer.appendChild(descriptionTitle);
                photoContainer.appendChild(description);
                photoContainer.appendChild(edit);
                photoContainer.appendChild(Delete);
            }
        })
    })
}

function add() {
    let photoContainer = document.createElement('div');
    let url = document.getElementById('url').value;
    let descriptionInput = document.getElementById('description-input').value;

    let newPhoto = {
        url: url,
        description: descriptionInput
    }

    fetch('http://localhost:3000/photosBW', 
        {
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                type: 'bw',
                newPhoto: newPhoto
            })
        }).then(function(response) {
            window.location.reload();
        })
}

function update() {
    let url = document.getElementById('url').value;
    let descriptionInput = document.getElementById('description-input').value;
    
    let newPhoto = {
        url: url,
        description: descriptionInput
    }

    fetch('http://localhost:3000/photosBW' + currentID, 
    {
        method: 'put',
        headers:  {'Content-Type': 'application/json'},
        body: JSON.stringify(newPhoto)
    }).then(function(response) {
        window.location.reload();
    })
}

function Delete(id) {
    let name = document.getElementById('name').value;
    let photo = document.getElementById('url').value;

    fetch('http://localhost:3000/photosBW' + id, 
    {
        method: 'delete'
    }).then(function(response) {
        window.location.reload();
    })
}

fetch();