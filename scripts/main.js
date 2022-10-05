
let apiData = {
    name: "name",
    date: "date_local",
    success: "success",
    image: "links.flickr.original",
    detail: "details",
}
const { name, date, success, image, detail} = apiData
    

const apiUrl = 'https://api.spacexdata.com/v4/launches/'

fetch(apiUrl).then(response => {
  if (response.ok) {
    return response.json()
  }
  throw new Error('Request failed');
}, networkError => console.log(networkError.message)
).then(jsonResponse => {
    jsonResponse.forEach(arrayItem => {
        generateHTML(arrayItem);
    });
});

const generateHTML = data => {
    const missionName = data.name;
    const rocketName = data.rocket;
    const launchDate = new Date (data.date_utc);
    const launchStatus = data.success == true ? "Successful" : "Unsuccessful";

    const missionPatch = data.links.patch.small
    const launchImage = data.links.flickr.original != 0 ? data.links.flickr.original : missionPatch;

    const launchDescription = data.details != null ? data.details : 'No description available';
 
       const spaceXDiv = document.querySelector('.spacex-flight');
    let element = document.createElement("div");
    element.classList.add("col-md-4")
    element.classList.add("py-2")

    element.innerHTML = 
        `

         <div class="card md-4 box-shadow mt-auto mb-auto h-100 ">
                      <h4 class="card-header">${missionName}</h4>
                      <div class="thumb">
                      <a href="${launchImage}" target="_blank" >
                        <img class="flight-img card-img-top img-fluid  autosize" loading="lazy"
                            data-src="holder.js/200x133?bg=111&fg=ffff00&auto=yes?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail "
                            src="${launchImage}"
                           alt= " ${missionName} image"
                            data-holder-rendered="true">
                            </a>
                            </div>
                        <div class="card-body">
                            <p class="card-text">${launchDescription} </p>
             
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"> Launch date:  ${launchDate}</li>
                            <li class="list-group-item">Launch success: ${launchStatus}</li>
                            <li class="list-group-item">Rocket: ${rocketName}</li>
                        </ul>
                             
                         
                        </div>
                    </div>
                </div>
`

    spaceXDiv.append(element);
}