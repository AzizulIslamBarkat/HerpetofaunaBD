document.title=document.getElementById('main-heading').innerText+" | Herpetofauna Of Bangladesh"


document.querySelector('meta[name="description"]').setAttribute("content","Read More About "+document.getElementById('main-heading').innerText+" on Herpetofauna Of Bangladesh")


let bn=document.getElementsByClassName('bn')
let en=document.getElementsByClassName('en')
const langSwitch=document.getElementById('lang-switch')
let isEn=true
for(i=0;i<bn.length;i++){
    bn[i].hidden=true;
}

langSwitch.addEventListener('click',ev=>{
    isEn=!isEn;
    if(isEn){
        for(i=0;i<bn.length;i++){
            bn[i].hidden=true;
        }
        for(i=0;i<en.length;i++){
            en[i].hidden=false;
        }
        langSwitch.innerText="Read In Bengali"
        langSwitch.style.backgroundColor='#12cc34'
    }else{
        for(i=0;i<bn.length;i++){
            bn[i].hidden=false;
        }
        for(i=0;i<en.length;i++){
            en[i].hidden=true;
        }
        langSwitch.innerText="Read In English"
        langSwitch.style.backgroundColor='#1234cc'
    }
})