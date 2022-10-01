# Dynamic DOM experiment

**Project Status:** playground, STOPPED

A playground repository to reproduce RxJS-like behaviour with as goal to create a fully dynamic dependencyless DOM framework in vanilla JS.

## Conclusion

### Reactivity

Bad idea to reinvent the [RxJS](https://rxjs.dev/) wheel. Working on this codebase was a good learning experience to understand their design choices. 

Upon stumbling on issues, the workarounds make you automatically lean towards RxJS paradigms. Reproducing reactive logic would serve as a great lesson for advanced JS students to recognize memory leaks and zombie logic.

### Dynamic DOM

The [`dyn(obj)`](./demo/js/index.js) syntax is AWESOME. It is very intuitive, but the elephant in the room is that your teardown logic will be inaccessible when Proxying setters using the `a = b` syntax. If the object is destroyed, the hooks/mutators (== RxJS subscriptions/pipes) will keep triggering.

#### Proposed solution

Teardown logic can be gathered in the return value of `dyn()`. An alternative is to automatically remove teardown logic by using either custom elements like `<dyn-div>` which have access to [HTMLElement lifecycle events](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks) or using [hacks](http://www.backalleycoder.com/2012/04/25/i-want-a-damnodeinserted/) like `animationstart` to derive it from native HTML elements.

In this sandbox, even reactive arguments were supported. It felt like a breakthrough to use them until combining two reactive arguments felt off. If you want to inject two reactive parameters and need them settled, you'd need to merge them beforehand and pass them as `fn(...arguments)`, which will require some

## HTML/JS support

Plain HTML starts to feel outdated. Where are the reactive programming languages? (angular somewhat solved it)

## Future

Might come back to this later, but limitations of HTML5 let me down a bit too much to be sure.