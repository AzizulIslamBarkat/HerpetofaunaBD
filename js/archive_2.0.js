/*
    archive_2.0.js
    archive.js rewritation for supporting catagorized data.
    Author: @nurtasin (A.K.A. bigT)
    Made for HerpetofaunaBD
*/

var getJSON = function (url, callback) {
    /* Gets JSON data from $url */
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'json'
    xhr.onload = function () {
        var status = xhr.status
        if (status === 200) {
            callback(null, xhr.response)
        } else {
            callback(status, xhr.response)
        }
    };
    xhr.send()
}

String.prototype.replaceAll = function(strReplace, strWith) {
    /* Replaces all reference of $strReplace with $strWith */
    var esc = strReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
    var reg = new RegExp(esc, 'ig')
    return this.replace(reg, strWith)
}

function capitalize(s){
    /* Capitalizes the string $s */
    return s.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase() } )
}

function renderYear(catagorized_data, year) {
    /* Renders a single year */
    year_data = `<ul>
    <h2 class="year-heading">${year}</h2>
    ${catagorized_data}</ul>`
    return year_data
}

function RenderCatagory(catagory,data){
    /* Renders a single Catagory */
    catagory_render=`<ul>
    <h5 class="catagory-heading">${catagory}</h5>`
    for (i = 0; i < data.length; i++) {
        catagory_render += renderLink(data[i])
    }
    catagory_render += "</ul>"
    return catagory_render
}
function renderLink(data_col) {
    /* Renders a single Link*/
    return `<li><a href="${data_col.link}">${data_col.title}</a></li>`
}

function getFilterCheckbox(){
    /* Returns an Object That represents the check boxes and a bolean value for the key*/
    arr=[]
    if(document.getElementById("amphibia").checked){arr.push("amphibia")}
    if(document.getElementById("reptile").checked){arr.push("reptile")}
    if(document.getElementById("bird").checked){arr.push("bird")}
    if(document.getElementById("mammal").checked){arr.push("mammal")}
    return arr

}


const SearchField=document.getElementById("search-text")
const ArchiveWrapper=document.getElementById("archive-wrapper")
const checkBoxGroup=document.getElementById("check-boxes")
//Fetching the json file and storing it as a local variable
var ArchiveDataJSON=false;
getJSON("./archive_data_catagorized.json",(stat,json)=>{
    ArchiveDataJSON=json
    renderFullArchive(null)
})


function renderFullArchive(SearchTerm){
    /* Renders the Full archive-wrapper According to the search-field and check-boxes data */
    if(ArchiveDataJSON){
        //Getting the Selected Catagories
        SelectedCatagories=getFilterCheckbox()
        AvailableYears=Object.keys(ArchiveDataJSON)
        //Variable to store all the filtered results
        FilteredResult={}
        //Variable to hold wrapper's raw HTML
        FilteredHTML=``
        //Going through every year
        for(d=0;d<AvailableYears.length;d++){
            Year=AvailableYears[d]
            DataForYear=ArchiveDataJSON[Year]
            //Scanning Every catagory
            YearRawHTML=``
            SelectedCatagories.forEach(catagory => {
                CatagoryData=DataForYear[catagory]
                FilteredCatagoryData=[]
                //Going through each entry
                CatagoryData.forEach(entry => {
                    if(SearchTerm==null){
                        FilteredCatagoryData.push(entry)
                    }
                    else if(entry.title.toLowerCase().includes(SearchTerm.toLowerCase())){
                        FilteredCatagoryData.push({
                            "title":entry.title.replaceAll(SearchTerm,`<span class="highlight">${SearchTerm}</span>`),
                            "link":entry.link
                        })
                    }
                });
                if(FilteredCatagoryData.length>0){
                    YearRawHTML+=RenderCatagory(capitalize(catagory),FilteredCatagoryData)
                }
            });
            if(YearRawHTML.length>0){
                FilteredHTML+=renderYear(YearRawHTML,Year)
            }
        }
        if(FilteredHTML.length>0){
            ArchiveWrapper.innerHTML=FilteredHTML
        }
        else{
            ArchiveWrapper.innerHTML=`<br><br><h3 class="text-center">No Entry Found That Matches With '${SearchTerm}' And Obeys The Filter </h3><br><br>`
        }
    }
}

SearchField.addEventListener("keyup",(ev)=>{
    renderFullArchive(SearchField.value)
})
checkBoxGroup.addEventListener("click",(ev)=>{
    renderFullArchive(SearchField.value)
})