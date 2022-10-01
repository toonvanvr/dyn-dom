import { dyn } from '../../lib/dist/index.js'
import { Var } from '../../lib/dist/util/var.js'

let i = 0
const counter = new Var(i)
setInterval(() => counter.set(++i), 1000)

const div = document.querySelector('#target')
dyn(div).innerHTML = counter