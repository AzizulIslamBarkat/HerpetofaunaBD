import json
import unidecode

def isACombOf(i):
    for char in i:
        if char.lower() not in "arbm":
            return False,char
    return True,""

with open("./archive_data_categorized.json") as handle:
    archiveData=json.load(handle)

try:
    print("Archive Updater V2.0 for https://herpetofaunabd.net")
    while True:
        print("*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#")
        year=str(input("Year: "))
        if not year.isnumeric():
            print("[Error] Year Can Contain Only Numbers. Lets Try It Again...")
        elif not len(year.strip())==4:
            print("[Error] Year Has To Be A 4 Digit Number. Lets Try It Again...")
        else:
            title=""
            link=""
            cat=""
            while True:
                title=str(input("Title: "))
                if len(title.strip())==0:
                    print("[Error] Title Has To Be A Non-Empty Sentence. Lets Try It Again...")
                else:
                    break
            
            while True:
                link=str(input("Link: "))
                if len(link.strip())==0:
                    print("[Error] Link Has To Be A Non-Empty Sentence. Lets Try It Again...")
                else:
                    break
            
            while True:
                choices=str(input("""\
In Which Category This Article Belongs?
A -> Amphibia
R -> Reptile
B -> Bird
M -> Mammal
Your Choice: \
"""))
                bl,vl=isACombOf(choices)
                if choices.strip()=="":
                    print("[Error] Please Enter One or More Categories for this Article. Lets Try It Again...")
                elif not bl:
                    print(f"[Error] '{vl}' Is Not A Valid Choice. Lets Try It Again")
                else:
                    cat=choices.replace(" ","").upper()
                    break
            
            if not (year in archiveData):
                archiveData[year]=[]
            
            archiveData[year].append({
                "title":unidecode.unidecode(title),
                "link":link,
                "category":cat
            })
except KeyboardInterrupt:
    print("[INFO] Writing to the file buffer.")
    with open("./archive_data_categorized__.json","w") as handle:
        json.dump(archiveData,handle,indent=4)
    print("[INFO] Changes has been made to the file buufer.")