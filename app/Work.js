export default class WorkSimple{

    constructor(parent, output, data) {
        this.parent = parent
        this.output = output
        this.data = data
    }

    _iniObject(){
        const controls = document.createElement("div")
        controls.className = "controls"
        const status = document.createElement("span")
        status.innerHTML = this.data.begin
        this.status = status
        const start = document.createElement("button")
        const close = document.createElement("button")
        const stop = document.createElement("button")
        const reload = document.createElement("button")
        this.close = close
        close.innerHTML = this.data.close
        start.innerHTML = this.data.start
        stop.innerHTML = this.data.stop
        reload.innerHTML = this.data.reload
        controls.append(status,start,stop,reload,close)        
        this.start = start
        this.stop = stop
        this.reload = reload
        const work =  document.createElement("div")
        work.addEventListener("click", (e) => e.stopPropagation())
        work.className = "work"
        const canvas = document.createElement("canvas")
        canvas.className = "canvas"
        this.canvas = canvas
        const square = canvas.getContext("2d")
        work.append(controls,canvas)
        this.square = square
        return work
    }

    mount(){
        this.parent.appendChild(this._iniObject())
        this.x = Math.floor(Math.random() * (this.canvas.scrollWidth - 5))
        this.deg = Math.random() + 5
        this.y = 0
        this.direction = Math.random() > 0.5 ? 1 : -1
        this.start.addEventListener("click", this._start)
        this.stop.addEventListener("click", this._stop)
        this.reload.addEventListener("click", this._reload)
        this.close.addEventListener("click", () => {
            this._unmount()
        })
        window.addEventListener("resize", () => {
            this.canvas.width = this.parent.width * 0.5
        })
        localStorage.setItem("record","")
        this.start.style.display = "inline-block"
        
    }

    _setStatus(title) {
        this.status.innerHTML = title
        const date = new Date()
        let record = `${title}=>${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}\n`
        localStorage.setItem("record", localStorage.getItem("record") + record)
    }

    _unmount() {
        this.parent.removeChild(this.parent.querySelector(".work"))
        const span = document.createElement("span")
        span.className = "Record"
        span.innerHTML = localStorage.getItem("record")
        this.output.appendChild(span)
    }

    _start = (e) => {
        this._beginAnim()
        this.canvas.opacity = 1
        this.start.style.display = "none"
        this.stop.style.display = "inline-block"
        this._setStatus(this.data.start)
    }

    _beginAnim() {
        this.anim = setInterval(this._action, 1000/this.data.speed)
    }

    _action = () => {
        this.canvas.width = this.parent.scrollWidth * 0.5
        this.canvas.height = this.parent.scrollHeight * 0.7
        this.square.fillStyle = "#900"
        this.square.clearRect(0, 0 ,this.canvas.width + 10, this.canvas.height + 10)
            this.square.fillRect(this.x, this.y, 10, 10)
            if(this.x + 1 * this.deg > this.canvas.width && this.direction == 1) {
                this.y += (this.x - this.canvas.width) / this.deg
                this.x = this.canvas.width
                this.direction *= -1
                this._setStatus(this.data.right)
            } else if (this.x - 1 * this.deg < 0 && this.direction == -1){
                this.y += this.x / this.deg
                this.x = 0
                this.direction *= -1
                this._setStatus(this.data.left)
            } else {
                this.y+=1
                this.x += 1 * this.deg * this.direction
            }
            if(this.y > this.canvas.height) {
                clearInterval(this.anim)
                this.square.clearRect(0, 0 ,this.canvas.width + 10, this.canvas.height + 10)
                this.reload.style.display="inline-block"
                this.stop.style.display="none"
                this._setStatus(this.data.end)
            }

            
    }
    
    _stop = () => {
        this.start.style.display = "inline-block"
        this.stop.style.display = "none"
        this._setStatus(this.data.stop)
        clearInterval(this.anim)
    }

    _reload = () => {
        this.reload.style.display = "none"
        this.stop.style.display = "inline-block"
        this.x = Math.floor(Math.random() * 32)
        this.deg = Math.random() + 5
        this.y = 0
        this.canvas.opacity = 1
        this.direction = Math.random() > 0.5 ? 1 : -1
        this._setStatus(this.data.reload)
        this._beginAnim()
    }
}