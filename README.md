# Lexique

***Programmation réactive***: En informatique, la programmation réactive est un paradigme de programmation visant à conserver une cohérence d'ensemble en propageant les modifications d'une source réactive (modification d'une variable, entrée utilisateur, etc.) aux éléments dépendants de cette source.[...] La programmation réactive est née à partir du **patron de conception observateur** [...]


```ts
var b = 1
var c = 2
var a = b + c
b = 10
console.log(a) // 3 (not 12 because "=" is not a reactive assignment operator)

// now imagine you have a special operator "$=" 
// that changes the value of a variable (executes code on 
// the right side of the operator and assigns result to left 
// side variable) not only when explicitly initialized, but
// also when referenced variables (on the right side of the 
// operator) are changed
var b = 1
var c = 2
var a $= b + c
b = 10
console.log(a) // 12
```

***Observer Design Patern***: Le patron observateur est un patron de conception de la famille des patrons comportementaux. Il s'agit de l'un des vingt-trois patrons de l'ouvrage du « Gang of Four » Design Patterns – Elements of Reusable Object-Oriented Software1. 
Il est utilisé pour envoyer un **signal** à des modules qui jouent le rôle d'**observateurs**. En cas de notification, les observateurs effectuent alors l'action adéquate en fonction des informations qui parviennent depuis les modules qu'ils observent (les **observables**).

![Diagramme UML du patron de conception Observateur](assets/img/Observer.svg.png)

***RxJS***: Reactive Extensions Library for JavaScript
RxJS is a library for reactive programming using Observables, to make it easier to compose asynchronous or callback-based code. This project is a rewrite of Reactive-Extensions/RxJS with better performance, better modularity, better debuggable call stacks, while staying mostly backwards compatible, with some breaking changes that reduce the API surface


# Source

- https://fr.wikipedia.org/wiki/Programmation_r%C3%A9active
- https://www.npmjs.com/package/rxjs
- https://rxjs.dev/

