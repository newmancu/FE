const inner = document.getElementById('inner-circle')
const outer = document.getElementById('outer-circle')

document.body.style = "cursor: none;"
const links = document.getElementsByTagName('a')

for (let i=0; i < links.length; ++i){
  links[i].style = "cursor: none;"
}


function thorrle(cb, delay=1000){
  let shouldWait = false
  let waitingArgs
  const timeoutFunc = () => {
    if (waitingArgs == null)
    {
      shouldWait = false
    } else {
      cb(...waitingArgs)
      waitingArgs = null
      setTimeout(timeoutFunc, delay)
    }
  }

  return (...args) => {
    if (shouldWait)
    {
      waitingArgs = args
      return
    } 
      
    cb(...args)
    shouldWait = true
    setTimeout(timeoutFunc, delay)
  }
}
const setPosOut = thorrle((X, Y) => {
  outer.style = `top: ${Y}; left: ${X}`  
}, 1000/15);

const setPosIn = thorrle((X, Y) => {
  inner.style = `top: ${Y}; left: ${X}`
}, 1000/100);

document.addEventListener('mousemove', function (event) {
  setPosOut(event.clientX, event.clientY) 
  setPosIn(event.clientX, event.clientY)  
})