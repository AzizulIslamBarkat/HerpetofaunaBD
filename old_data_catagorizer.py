import json

OLD_ARCHIVE="./archive_data.json"
NEW_ARCHIVE="./archive_data_catagorized.json"
## Reading the old archive data

with open(OLD_ARCHIVE) as handle:
    OldArchiveJSON=json.load(handle)
with open(NEW_ARCHIVE) as handle:
    NewArchiveJSON=json.load(handle)

def oldEntryInNewJSON(title,year):
    global NewArchiveJSON
    for entry in NewArchiveJSON[year]:
        if entry["title"]==title:
            return True
    return False


def isACombOf(i):
    for char in i:
        if char.lower() not in "arbm":
            return False,char
    return True,""


for year in OldArchiveJSON:
    yearData=OldArchiveJSON[year]
    if not (year in NewArchiveJSON):
        NewArchiveJSON[year]=[]
    for oldEntry in yearData:
        oldYear=year
        oldTitle=oldEntry['title']
        oldLink=oldEntry['link']
        if not oldEntryInNewJSON(oldTitle,oldYear):
            cat=""
            while True:
                choices=str(input(f"""\
******************************
Year: {year}
Title: {oldTitle}
Link: {oldLink}
In Which Category This Article Belongs To: \
"""))
                bl,vl=isACombOf(choices)
                if choices.strip()=="":
                    print("[Error] Please Enter One or More Categories for this Article. Lets Try It Again...")
                elif not bl:
                    print(f"[Error] '{vl}' Is Not A Valid Choice. Lets Try It Again")
                else:
                    cat=choices.replace(" ","").upper()
                    break
            
            NewArchiveJSON[year].append({
                "title":oldTitle,
                "link":oldLink,
                "category":cat
            })
            with open(NEW_ARCHIVE,"w") as handle:
                json.dump(NewArchiveJSON,handle,indent=4)
