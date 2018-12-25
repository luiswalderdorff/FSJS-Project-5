// Variables

const $gallery = $("#gallery");



fetch("https://randomuser.me/api/?results=12&nat=gb")
  .then(function(response) { //it always uses that in the function, that was returned before
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
    return myJson;
  })
  .then(function(data) {
      console.log(data.results[0].nat);
      return data;
  })
  .then(function(data) {
    const users = data.results;
    displayUsers(users);
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
    // var modalHTML = '<div class="modal-container">';
    // data.forEach(function(results) {
    //     modalHTML += `    <div class="modal">
    //                         <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    //                         <div class="modal-info-container">
    //                             <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
    //                             <h3 id="name" class="modal-name cap">name</h3>
    //                             <p class="modal-text">email</p>
    //                             <p class="modal-text cap">city</p>
    //                             <hr>
    //                             <p class="modal-text">(555) 555-5555</p>
    //                             <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
    //                             <p class="modal-text">Birthday: 10/21/2015</p>
    //                         </div>
    //                       </div>
    //
    //                     // IMPORTANT: Below is only for exceeds tasks
    //                     <div class="modal-btn-container">
    //                         <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
    //                         <button type="button" id="modal-next" class="modal-next btn">Next</button>
    //                     </div>`
    // }) // end each
    // modalHTML += "</div>"
    // $("body").append(modalHTML); //noch anpassen


    }; // end each
