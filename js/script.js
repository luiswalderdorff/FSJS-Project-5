// Did they automaticially capitalize letters with CSS?
// Variables

const $gallery = $("#gallery");


// Fetches randomuser data
fetch("https://randomuser.me/api/?results=12&nat=gb")
// returns response in json format
  .then(function(response) { //it always uses that in the function, that was returned before
    return response.json();
  })
  .then(function(data) {
    // gives me only the results of the data
    const users = data.results;
    // displays results on the page
    displayUsers(users);
    $(".card").click(function(event) {
      const click = event.target;
      // Loops through modules and only displays the one that fits the clicked user
      for(let i = 0; i < $(".modal-container").length; i++) {
        // only checks for src if it is an image and it is clear it has a src (to prevent errors)
        if (click.parentNode.parentNode.children[0].children[0].tagName == "IMG") {
          //Loops through modules and only shows the one that has the same img src as clicked user
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
      // Close Modal by clicking on x
      $(".modal-close-btn").click(function (event) {
        const click = $(event.target);
        // Different functions if the button or the strong x is pressed
        if (click.parent().parent().hasClass("modal-container")) {
          click.parent().parent().hide();
        } else if (click.parent().parent().parent().hasClass("modal-container")) {
          click.parent().parent().parent().hide();
        }
      })
      // Modal arrow functionality
      $(".modal-prev").click(function (event) {
        const click = $(event.target);
        // If the previous element has class modal-container show it and hide current modal window
        if (click.parent().parent().prev().hasClass("modal-container") !== false) {
        click.parent().parent().hide();
        click.parent().parent().prev().show();
        // If not, show the last window with modal-container class and hide current modal window
      } else {
        click.parent().parent().hide();
        $(".modal-container:last").show();
      }
      })
      // Same as before, with next button
      $(".modal-next").click(function (event) {
        const click = $(event.target);
        if (click.parent().parent().next().hasClass("modal-container") !== false) {
        click.parent().parent().hide();
        click.parent().parent().next().show();
      } else {
        click.parent().parent().hide();
        $(".modal-container:first").show();
      }
      })
    })
  })

//Dispays
function displayUsers(data) {
  //Visible Users
  var userHTML = '';
  // Creates html for each user in the data array
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

  // Hidden Modal Interface
  var modalHTML = '';
  data.forEach(function(results) {
      modalHTML += `    <div class="modal-container">
                          <div class="modal">
                            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                            <div class="modal-info-container">
                                <img class="modal-img" src="${results.picture.large}" alt="profile picture">
                                <h3 id="name" class="modal-name cap">${results.name.first} ${results.name.last}</h3>
                                <p class="modal-text">${results.email}</p>
                                <p class="modal-text cap">${results.location.city}</p>
                                <hr>
                                <p class="modal-text">${results.phone}</p>
                                <p class="modal-text cap">${results.location.street}, ${results.location.city}, ${results.location.postcode}</p>
                                <p class="modal-text">${results.dob.date.substring(0,10)}</p>
                            </div>
                          </div>

                        <div class="modal-btn-container">
                            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                            <button type="button" id="modal-next" class="modal-next btn">Next</button>
                        </div>
                      </div>`
  })
  modalHTML += ""
  $("body").append(modalHTML);
  $(".modal-container").hide();
};
