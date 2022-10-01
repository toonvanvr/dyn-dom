import { Var } from '../../lib/dist/var/var.js'
import { dyn } from '../../lib/dist/dyn/dyn.js'
import { merge } from '../../lib/dist/var/merge.js'

let i = 0
const counter = new Var(i)
const style = new Var('color: orange')
const textColor = new Var('orange')
const attrName = new Var('width')
const attrNames = ['width', 'height']
const colors = ['blue', 'red', 'green', 'grey', 'purple', 'yellow', 'teal', 'lightblue', 'lightred']
setInterval(() => {
  i++
  counter.set(i)
  const color = colors[i % colors.length]
  textColor.set(color)
  attrName.set(attrNames[i % attrNames.length])
  style.set(`color: ${color}`)
}, 1000)


/** @type {HTMLDivElement} */
const div = document.querySelector('#target')
const dynDiv = dyn(div)

dynDiv.innerHTML = counter
dynDiv.style.color = textColor
dynDiv.setAttribute(attrName, counter)

const debug = document.createElement('div')
document.body.appendChild(debug)
dyn(debug).innerHTML = attrName
merge(attrName, counter).hook(console.log)