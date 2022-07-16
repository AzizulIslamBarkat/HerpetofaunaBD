import json
import tkinter as tk
import unidecode

#GUI will be added soon :-)

#step 1 : Load the file

# file=open("./archive_data.json","r+")

# archiveData=json.load(file)

with open("./archive_data.json") as handle:
    archiveData=json.load(handle)
#ask for the infos to add

savable=False
try:
    while True:
        year=str(input("Year: "))
        title=str(input("Title: "))
        link=str(input("Link: "))
        
        title=unidecode.unidecode(title)

        if not year.isnumeric():
            print("Year must be a number.")

        elif year.strip()=="" or title.strip()=="" or link.strip()=="":
            print("You can't leave any fields empty! Try Again...")
        
        elif year in archiveData:
            if {"title":title,"link":link} in archiveData[year]:
                print(f"This entry `Year: {year} ,title: {title[0:15] if len(title)>0 else title}... ,link:{link[0:15] if len(link)>0 else link}...` already exists...")
            else:
                if not (year in archiveData):
                    archiveData[year]=[]
                
                archiveData[year].append({"title":title,"link":link})
                print("Changes Made!!")
        
        else:
            if not (year in archiveData):
                archiveData[year]=[]
                
            archiveData[year].append({"title":title,"link":link})
            print("Changes Made!!")
            

        
        choice=input("[E]xit or [C]ontinue? ([E]/C) => ").lower()
        if choice=="" or choice=="e":
            with open("./archive_data.json","w") as file:
                print(archiveData[year])
                file.write(json.dumps(archiveData,indent=4))
                print("Changes Saved Successfully...")
            print("Exiting....")
            break
        else:
            print("****************************************")

except KeyboardInterrupt:
    with open("./archive_data.json","w") as file:
        file.write(json.dumps(archiveData,indent=4))
        print("Changes Saved Successfully...")
    
    print("Force Exiting")