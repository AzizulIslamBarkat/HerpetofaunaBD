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
String.prototype.replaceAll = function(strReplace, strWith) {
  var esc = strReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  var reg = new RegExp(esc, 'ig');
  return this.replace(reg, strWith);
};
document.getElementById('search-text').focus()
getJSON("./archive_data.json",(err,data)=>{
    if(err){
      document.write("Something Went Wrong. Please Try Again Later. :-(")
    }else{
      keys_=Object.keys(data)
      keys_.sort(function(a, b){
        if(a < b) { return 1; }
        if(a > b) { return -1; }
        return 0;
      })
      key_len=keys_.length
      console.log(data)
      for(j=0;j<key_len;j++){
        data[keys_[j]].sort((a,b)=>{
          if(a.title < b.title){return -1}
          if(a.title > b.title){return 1}
          return 0
        })
        document.getElementById('archive-wrapper').innerHTML+=renderYear(data[keys_[j]],keys_[j])
      }
      document.getElementById('search-text').addEventListener('keyup',(ev)=>{
        otherData={}
        document.getElementById('archive-wrapper').innerHTML=''
        search_term=document.getElementById('search-text').value
        keys_=Object.keys(data)
        keys_.sort(function(a, b){
          if(a < b) { return 1; }
          if(a > b) { return -1; }
          return 0;
        })
        key_len=keys_.length
        if(search_term){
          for(x=0;x<key_len;x++){
            year=keys_[x]
            inner_arr=data[year]
            for(y=0;y<inner_arr.length;y++){
              if(inner_arr[y].title.toLowerCase().includes(search_term.toLowerCase())){
                if(otherData[year]===undefined){otherData[year]=[]}
                otherData[year].push({"title":inner_arr[y].title.replaceAll(search_term,`<span class="highlight">${search_term}</span>`),"link":inner_arr[y].link})
              }
            }
          }
        }else{
          otherData=data
        }
        for(j=0;j<key_len;j++){
          if(otherData[keys_[j]]!==undefined){
            otherData[keys_[j]].sort((a,b)=>{
              if(a.title < b.title){return -1}
              if(a.title > b.title){return 1}
              return 0
            })
            document.getElementById('archive-wrapper').innerHTML+=renderYear(otherData[keys_[j]],keys_[j])
          }
        }
      })
    }
})
function renderYear(data,year){
  year_data=`<ul>
  <h2 class="year-heading">${year}</h2>`
  for(i=0;i<data.length;i++){
    year_data+=renderLink(data[i])
  }
  year_data+=`</ul>`
  return year_data
}

function renderLink(data_col){
  return `<li><a href="${data_col.link}">${data_col.title}</a></li>`
}