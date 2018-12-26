// Did they automaticially capitalize letters with CSS?
// Variables

const $gallery = $("#gallery");



fetch("https://randomuser.me/api/?results=12&nat=gb")
  .then(function(response) { //it always uses that in the function, that was returned before
    return response.json();
  })
  .then(function(data) {
    const users = data.results;
    displayUsers(users);
    $(".card").click(function(event) {
      const click = event.target;
      console.log(click);
      // Muss noch richtige Parentnodes und so hinzufügen, damit es immer richtig feuert
      for(let i = 0; i < $(".modal-container").length; i++) {
        if (click.parentNode.parentNode.children[0].children[0].tagName == "IMG") {
          if(click.parentNode.parentNode.children[0].children[0].src === $(".modal-container")[i].children[0].children[1].children[0].src) {
            $(".modal-container").eq(i).show();
          }
        } else if (click.parentNode.children[0].children[0].tagName == "IMG") {
          if ( click.parentNode.children[0].children[0].src === $(".modal-container")[i].children[0].children[1].children[0].src ) {
            $(".modal-container").eq(i).show();
          }
        } else if (click.children[0].children[0].tagName == "IMG") {
          if (click.children[0].children[0].src === $(".modal-container")[i].children[0].children[1].children[0].src) {
            $(".modal-container").eq(i).show();
          }
        }
      }
    })
  })


  function displayUsers(data) {
    //Visible Users
    var userHTML = '';
    data.forEach(function(results) {
      userHTML += `<div class="card">
                      <div class="card-img-container">
                          <img class="card-img" src="${results.picture.large}" alt="profile picture">
                      </div>
                      <div class="card-info-container">
                          <h3 id="name" class="card-name cap">${results.name.first} ${results.name.last}</h3>
                          <p class="card-text">${results.email}</p>
                          <p class="card-text cap">${results.location.city}, ${results.location.state}</p>
                      </div>
                  </div>`
    })
    $gallery.append(userHTML);

    // Hidden Modal Interface: Try to create it when clicked. The one that is needed
    var modalHTML = '';
    data.forEach(function(results) {
        modalHTML += `    <div class="modal-container">
                            <div class="modal">
                              <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                              <div class="modal-info-container">
                                  <img class="modal-img" src="${results.picture.large}" alt="profile picture">
                                  <h3 id="name" class="modal-name cap">${results.name.first} ${results.name.last}</h3>
                                  <p class="modal-text">>${results.email}</p>
                                  <p class="modal-text cap">${results.location.city}</p>
                                  <hr>
                                  <p class="modal-text">${results.phone}</p>
                                  <p class="modal-text">${results.location.street}, ${results.location.city}, ${results.location.postcode}</p>
                                  <p class="modal-text">${results.dob.date}</p>
                              </div>
                            </div>

                          <div class="modal-btn-container">
                              <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                              <button type="button" id="modal-next" class="modal-next btn">Next</button>
                          </div>
                        </div>`
    }) // end each
    modalHTML += ""
    $("body").append(modalHTML); //noch anpassen
    $(".modal-container").hide();


    }; // end each
