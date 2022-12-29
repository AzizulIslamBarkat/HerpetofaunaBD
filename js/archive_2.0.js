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

function orderKeys(obj) {

    var keys = Object.keys(obj).sort(function keyOrder(k1, k2) {
        if (k1 < k2) return -1;
        else if (k1 > k2) return +1;
        else return 0;
    }).reverse();

    var i, after = {};
    for (i = 0; i < keys.length; i++) {
        after[keys[i]] = obj[keys[i]];
        delete obj[keys[i]];
    }

    for (i = 0; i < keys.length; i++) {
        obj[keys[i]] = after[keys[i]];
    }
    return obj;
}

String.prototype.replaceAll = function (strReplace, strWith) {
    /* Replaces all reference of $strReplace with $strWith */
    var esc = strReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
    var reg = new RegExp(esc, 'ig')
    return this.replace(reg, strWith)
}

function capitalize(s) {
    /* Capitalizes the string $s */
    return s.toLowerCase().replace(/\b./g, function (a) { return a.toUpperCase() })
}

function renderYear(catagorized_data, year) {
    /* Renders a single year */
    year_data = `<ul>
    <h2 class="year-heading">${year}</h2>`
    catagorized_data.forEach(entry => {
        year_data += renderLink(entry)
    })
    return year_data + "</ul>"
}

function RenderCatagory(catagory, data) {
    /* Renders a single Catagory */
    catagory_render = `<ul>
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

function getFilterCheckbox() {
    /* Returns an Object That represents the check boxes and a bolean value for the key*/
    arr = []
    if (document.getElementById("amphibia").checked) { arr.push("A") }
    if (document.getElementById("reptile").checked) { arr.push("R") }
    if (document.getElementById("bird").checked) { arr.push("B") }
    if (document.getElementById("mammal").checked) { arr.push("M") }
    return arr

}


const SearchField = document.getElementById("search-text")
const ArchiveWrapper = document.getElementById("archive-wrapper")
const checkBoxGroup = document.getElementById("check-boxes")
//Fetching the json file and storing it as a local variable
var ArchiveDataJSON = false;
getJSON("./archive_data_catagorized.json", (stat, json) => {
    ArchiveDataJSON = json
    PaperCount=0
    Object.keys(ArchiveDataJSON).forEach((year)=>{
        PaperCount+=ArchiveDataJSON[year].length
    })
    document.getElementById("entry-count").innerText=PaperCount
    renderFullArchive("")
})


function renderFullArchive(SearchTerm) {
    /* Renders the Full archive-wrapper According to the search-field and check-boxes data */
    if (ArchiveDataJSON) {
        //Getting the Selected Catagories
        SelectedCatagories = getFilterCheckbox()
        //Arranging the keys reverse alphabetically
        AvailableYears = Object.keys(ArchiveDataJSON).sort().reverse()
        //Variable to store all the filtered results
        FilteredResult = {}
        //Variable to hold wrapper's raw HTML
        FilteredHTML = ``
        //Going through every year
        for (d = 0; d < AvailableYears.length; d++) {
            Year = AvailableYears[d]
            //                                                 Arranging Titles Alphabetically
            DataForYear = ArchiveDataJSON[Year].sort((a, b) => (a.title > b.title) ? 1 : (a.title < b.title) ? -1 : 0)
            //Scanning Every entry
            YearRawHTML = ``
            selectedEntries = []
            iternum = DataForYear.length
            //Going through every entry of a particular year
            DataForYear.forEach(entry => {
                //Going though every selected category
                SelectedCatagories.forEach(category => {
                    if (entry.category.includes(category)) {
                        if (SearchTerm == "") {
                            selectedEntries.push({
                                "title": entry.title,
                                "link": entry.link});
                        }
                        else if (entry.title.toLowerCase().includes(SearchTerm.toLowerCase())) {
                            selectedEntries.push( {
                                "title": entry.title.replaceAll(SearchTerm, `<span class="highlight">${SearchTerm}</span>`),
                                "link": entry.link
                            })
                        }
                    }
                });
            })
            if (selectedEntries.length > 0) {
                //Filtering Entries On Basis Of Unique Title
                selectedEntries = selectedEntries.filter((value, index, self) =>
                    index === self.findIndex((t) => (
                        t.title === value.title
                    ))
                )
                FilteredHTML += renderYear(selectedEntries, Year)
            }
        }
        if (FilteredHTML.length > 0) {
            ArchiveWrapper.innerHTML = FilteredHTML
        }
        else {
            ArchiveWrapper.innerHTML = `<br><br><h3 class="text-center">No Entry Found That Matches With '${SearchTerm}' And Obeys The Filter </h3><br><br>`
        }
    }
}

SearchField.addEventListener("keyup", (ev) => {
    renderFullArchive(SearchField.value)
})
checkBoxGroup.addEventListener("click", (ev) => {
    renderFullArchive(SearchField.value)
})