import Work from "./Work.js"
import WorkSimple from "./WorkSimple.js"
const segment3 = document.querySelector(".middle-segment")
const segment4 = document.querySelector(".under-left-segment")
const segment5 = document.querySelector(".under-middle-segment")
const segment6 = document.querySelector(".right-segment")
const segment7 = document.querySelector(".left-segment")
const text = document.querySelector(".text.center")
const a = 6
const b = 10
const c = 4
const imageForm = document.createElement("form")
const div = document.createElement("div")
imageForm.setAttribute("class","imageform")
for(let i =0; i<3; i++) {
    const inner = document.createElement("input")
    inner.setAttribute("class","inner")
    div.appendChild(inner)
}
div.setAttribute("class","innerbox")
imageForm.appendChild(div)
const add = document.createElement("input")
add.setAttribute("value","Add")
add.setAttribute("class","pusher")
add.setAttribute("type","button")
imageForm.appendChild(add)
let out = document.createElement("p", 'class="output"')
out.innerHTML = "Result : " + ((a+b)/2)*c
let isShown = false
const button = document.querySelector("button.execute")
const button2 = document.querySelector("input.divide")
const inner = document.querySelector(".argument")
const form = document.querySelector(".dividers")
const radio = document.querySelector("input[value=u]")
const radio2 = document.querySelector("input[value=l]")
const cookie = document.cookie.split(";")
let counter = 0
const exist = []

//task 1
segment3.addEventListener("click", () => {
    rewrite()
})
segment4.addEventListener("click", () => {
    rewrite()
})
function rewrite() {
    const temp = segment3.innerHTML
    segment3.innerHTML = segment4.innerHTML
    segment4.innerHTML = temp
}

//task 2
button.addEventListener("click", () => {
    if(!isShown){
        segment5.appendChild(out)
    }
    else {
        segment5.removeChild(out)
    }
    isShown=!isShown
})

//task 3
button2.addEventListener("click", () => {
    const dividers = []
    for (let i = 1;i <= parseInt(inner.value);i++) {
        if(parseInt(inner.value) % i == 0){
            dividers.push(i)
        }
    }
    alert(dividers)
    document.cookie = "dividers=" + dividers
})

for (let i = 0;i<cookie.length; i++) {
    if( cookie[i].split("=")[0].trim() == "dividers") {
        if(cookie[i].split("=")[1] != "0") {
            form.setAttribute("style", "display:none")
            const save = confirm(cookie[i] + ". Зберегти результат?")
            if(save) {
                alert("Увас знайдені куки, перезавантажте сторінку")
            }
            else {
                document.cookie = "dividers = 0"
                window.location.reload()
            }
        }
    }
}

//task 4
radio.addEventListener("change", () => {
    segment6.setAttribute("style", "text-transform:capitalize")
    localStorage.setItem("case" , "u")
})
radio2.addEventListener("change", () => {
    segment6.setAttribute("style", "text-transform:none")
    localStorage.setItem("case" , "l")
})

//task 5
for (let i = 0; i < localStorage.length;i++) {
    let name = localStorage.key(i)
    if (name.substring(0,5) =="image") {
        const data = localStorage.getItem(name).split(",")
        if(parseInt(name.substring(5)) > counter) {
            counter = parseInt(name.substring(5))
        }
        addImage(data[1],data[2],data[0],name.substring(5),segment6)
        exist.push(name.substring(5,-1))
    }
    if(name == "case") {
        const data = localStorage.getItem(name)
        if(data == "u") {
            segment6.setAttribute("style", "text-transform:capitalize")
            radio.setAttribute("checked","checked")
        } else {
            segment6.setAttribute("style", "text-transform:none")
            radio2.setAttribute("checked","checked")
        }
    }
}
let open = false
text.addEventListener("click", () => {
    if(!open) { 
        segment7.appendChild(imageForm)
    } else { 
        segment7.removeChild(imageForm)
    }
    open = !open
})

function addImage(height,width,src,index,parent) {
    const image = document.createElement("img")
    image.setAttribute("src",src)
    image.setAttribute("style", "height: " + height + "px;width: " + width + "px;")
    const cont = document.createElement("div")
    const del = document.createElement("button")
    del.setAttribute("target", "i" + index)
    del.innerHTML = "Delete"
    del.addEventListener("click", () => {
        segment6.removeChild(document.getElementById(del.getAttribute("target")))
        localStorage.removeItem("image"+index)
    })
    del.setAttribute("class","pusher")
    cont.appendChild(image)
    cont.appendChild(del)
    cont.setAttribute("id","i" + index)
    cont.setAttribute("class", "imagebox")
    parent.appendChild(cont)
    localStorage.setItem("image" + index, src + "," + height + "," + width)
}
add.addEventListener("click", () => {
    const data = document.querySelectorAll(".inner")
    addImage(data[1].value,data[2].value,data[0].value,counter,segment6)
    let rep = true
    counter++
})
import URL from "./URL.js"
//task6
const output = document.querySelector(".controller")
const data = {
    begin: "Begin",
    start: "start",
    stop: "stop",
    reload: "reload",
    left: "left",
    right: "right",
    close: "close",
    end: "end",
    speed: 50
}
const work = new WorkSimple(segment3, output,data)

document.querySelector(".Play").addEventListener("click", () => {
    if(segment3.querySelector(".work")!=null) {
        return
    } 
    if(output.querySelector("span")) {
        output.removeChild(output.querySelector("span"))
    }
    work.mount()
})

document.querySelector(".Save").addEventListener("click", () => {
    fetch(URL, {
        method: "POST",
        headers: {
            'Content-Type': 'text/plain'
        },
        body: JSON.stringify(data)
    
    }).then(r => r.text()).then(r => console.log(r))
})
