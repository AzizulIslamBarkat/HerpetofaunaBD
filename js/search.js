var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

document.getElementById('search-text').innerText=localStorage.getItem('search-text')
getJSON("./search_index.json",(err,data)=>{
  if(err){
    document.write("Something went wrong!!")
  }else{
    searchTerm=String(localStorage.getItem('search-text'))
    if(searchTerm.trim()===''){
      document.write("Please Enter Something To Search And Try Again.")
    }else{
      results=[]
      for(i=0;i<data.length;i++){
        if(data[i].Tags.includes(searchTerm.toLowerCase())){
          results.push(data[i])
        }
      }
      document.title=`Search Results for '${localStorage.getItem('search-text')}' | Herpetofauna of Bangladesh`
      document.getElementById("result-count").innerText=results.length
      plotResults(results)
    }
  }
})

function renderLink(obj){
  return `
  <div class="link-card"><a class="link-wrapper" href="${obj.Link}"><h3 class="link">${obj.Title}</h3></a></div>
  `;
}

function plotResults(results){
  let plot_position=document.getElementById("results-plot")
  innerHTML='<p id="animal-profile">Animal Profiles</p><br>'
  for(i=0;i<results.length;i++){
    innerHTML+=renderLink(results[i])
  }
  plot_position.innerHTML=innerHTML
}