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
  return `<li class="list-group-item"><span><a href="${obj.Link}">${obj.Title}</a></span></li>
  `;
}

function plotResults(results){
  let plot_position=document.getElementById("results-plot")
  innerHTML='<ul class="list-group" style="text-align: center;">'
  for(i=0;i<results.length;i++){
    innerHTML+=renderLink(results[i])
  }
  innerHTML+="</ul>"
  plot_position.innerHTML=innerHTML
}