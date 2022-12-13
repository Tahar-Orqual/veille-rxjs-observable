- [Lexique](#lexique)
- [Design Patern Observer](#design-patern-observer)
  - [Exemple 1](#exemple-1)
  - [Limites](#limites)
- [Programation Réactive](#programation-réactive)
  - [Example](#example)
  - [Concepts](#concepts)
    - [Valeurs qui varient dans le temps](#valeurs-qui-varient-dans-le-temps)
    - [Flots d'événements](#flots-dévénements)
    - [Suivis de dépendances](#suivis-de-dépendances)
    - [Propagations automatiques du changement](#propagations-automatiques-du-changement)
  - [Exemple 3](#exemple-3)
- [RxJS](#rxjs)
  - [Démo](#démo)
  - [Observables, Subjects et Operators](#observables-subjects-et-operators)
  - [Angular](#angular)
- [Source](#source)

# Lexique

**_Observer Design Patern_**: Le patron observateur est un patron de conception 
en programmation. Il s'agit de l'un des vingt-trois patrons de l'ouvrage du « Gang of Four » 
Design Patterns – Elements of Reusable Object-Oriented Software1.
Il est utilisé pour envoyer un **signal** à des modules qui jouent le rôle d'**observateurs**. 
En cas de notification, les observateurs effectuent alors l'action adéquate en fonction des 
informations qui parviennent depuis les modules qu'ils observent (les **observables**).
![Diagramme UML du patron de conception Observateur](assets/img/Observer.svg.png)

**_Programmation réactive_**: En informatique, la programmation réactive est un paradigme 
de programmation visant à conserver une cohérence d'ensemble en propageant les modifications 
d'une source réactive (modification d'une variable, entrée utilisateur, etc.) aux éléments 
dépendants de cette source.[...] La programmation réactive est née à partir du 
**patron de conception observateur** [...]

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

**_RxJS_**: Reactive Extensions Library for JavaScript
RxJS est une librairie npm qui donne une implémentation de la programation réactive en 
javascript. Elle inclus de base dans le
framework Angular pour gérer des événements asynchrone comme une
intéraction utilisateur ou une requête http.

# Design Patern Observer

## Exemple 1

```ts
abstract class Observer {
  /**
   * Name of the observable used for unregister
   */
  name: string = '';

  /**
   * Notify is called any time there is a notification triggered by the Subject
   */
  notify(): void {
    /* Abstract method */
  }
}

class ConcreteObserverA implements Observer {
  name = 'ConcreteObserverA';
  notify(): void {
    console.log(this.name);
  }
}

class ConcreteObserverB implements Observer {
  name = 'ConcreteObserverB';
  notify(): void {
    console.log(this.name);
  }
}

class Subject {
  /**
   * Collection of class that implement Observer
   */
  observerCollection: Observer[] = [];

  /**
   * Add an observer to the collection
   * @param observer A class that implement Observer
   */
  registerObserver(observer: Observer): void {
    this.observerCollection.push(observer);
  }

  /**
   * Remove an observer from the collection
   * @param observer A class that implement Observer
   */
  unRegisterObserver(observer: Observer): void {
    this.observerCollection = this.observerCollection.filter(
      (obs) => JSON.stringify(obs) !== JSON.stringify(observer),
    );
  }

  /**
   * Trigger the notify() method of all observer of the collection
   */
  notifyObservers(): void {
    for (const observer of this.observerCollection) {
      observer.notify();
    }
  }
}
```

Extrait de [exemple 1](apps/exemple1/src/index.ts)

## Limites

Ce type de programmation comporte cela dit quelque point négatifs:

- **Encapsulation**: Le patron de conception Observateur est souvent utilisé pour faire 
  des machines à états. Malheureusement, les états sont souvent sauvegardés dans des 
  variables qui doivent être visibles par tous les observateurs.

- **Manque de composabilité**: Le code qui en résulte n'est pas assez composable. Par 
  exemple, il n'est pas toujours facile d'ajouter ou de supprimer un glisser-déposer 
  (drag and drop) à un élément lorsqu'il y a beaucoup d'observateurs qui ont plus ou 
  moins la même fonctionnalité.

- **Lisibilité réduite**: Il est difficile de faire correspondre les entrées aux sorties 
  (syndrome du plat de spaghettis).

- **Gestion des ressources**: La vie d'un observateur doit être spécifiée explicitement, 
  ce qui peut provoquer une mauvaise gestion des ressources. Dans certains cas, pour 
  des soucis de performances, il est utile de n'activer un observateur qu'au moment 
  où nous en avons besoin. Exemple : si l'utilisateur n'utilise pas le glisser-déposer 
  (drag and drop), il est alors inutile de récupérer les coordonnées de la souris 
  sans cesse.

- **Séparation des préoccupations**
  Il faut diviser le code de sorte que chaque méthode ait sa propre fonctionnalité, et 
  que celle-ci soit unique, autrement dit, il faut respecter le SRP (Single Responsible 
  Principle). Exemple : Dans le cas d'une application qui sert à dessiner avec la souris, 
  les observateurs de l'application ne vont pas que construire le chemin de la souris mais 
  vont aussi appeler des méthodes pour l'afficher, ce qui n'est pas une bonne pratique.

- **Cohérence des données**: Avec le patron de conception Observateur, il n'y a aucune 
  garantie que les données restent cohérentes.

- **Uniformité**: Le fait que la mise en place des différents observateurs est effectuée 
  par plusieurs méthodes, diminue l'uniformité du code.

La programmation réactive est née à partir du patron de conception observateur afin de 
corriger ses défauts

# Programation Réactive

## Example

```ts
type Subscription<T> = (input: T) => void;

class Observer<T> {
  private subscriptions: Subscription<T>[] = [];

  constructor(_value?: T) {}

  subscribe(subscription: Subscription<T>): number {
    this.subscriptions = [...this.subscriptions, subscription];
    return this.subscriptions.length - 1;
  }

  unsubcribe(subscriptionId: number): void {
    this.subscriptions = this.subscriptions.filter((subscription, index) => {
      return index !== subscriptionId;
    });
  }

  next(value: T) {
    for (const subscription of this.subscriptions) {
      subscription(value);
    }
  }
}
```

Extrait de [exemple 2](apps/exemple2/src/index.ts)

## Concepts

La programmation réactive est basée sur des concepts comme des variations des valeurs 
dans le temps, des flots d’événements pour modéliser les mises à jour discrètes, des 
suivis de dépendances, et des propagations automatiques du changement.

### Valeurs qui varient dans le temps

À tout instant t de l'exécution du programme, toutes les expressions du programme doivent 
rester correctes. Par conséquent, les valeurs des variables évoluent dans le temps au 
fur et à mesure de l'exécution du programme de manière automatique et discrète.

### Flots d'événements

Lorsqu'une variable change de valeur, toutes les variables qui dépendent d'elle sont 
mises à jour, ce qui nécessite un événement / message.

Il est important en programmation réactive d'écouter tous les événements qui 
peuvent survenir.

### Suivis de dépendances

Les dépendances entre les variables, directes ou indirectes, doivent être suivies. Si 
une nouvelle dépendance fait son apparition, alors elle devra être sauvegardée afin 
de pouvoir propager dans un futur proche, d'éventuelles mises à jour de valeurs.

### Propagations automatiques du changement

Lorsqu'une variable subit une mise à jour, toutes les autres variables qui en dépendent 
doivent être informées afin qu'elles puissent se mettre à jour.

_La propagation doit se poursuivre automatiquement jusqu'à ce que toutes les variables 
qui en dépendent directement ou indirectement soient à jour._

## Exemple 3

[exemple 3](apps/exemple3/src/index.ts)

# RxJS
## Démo

- créer un dossier dans app
- copier tout depuis exemple3 (sauf le dossier node_modules)
- ```bash
  npm i rxjs
  ```
- suprimer le dossier `directive` (src/utils/reactive)
- aller dans `<app-name>/src/app/utils/list/list.ts`
- replacer la ligne 10 par:
  ```ts
  private listSubject = new Subject<Listable<T>[]>();
  list$ = this.listSubject.asObservable();
  ```
## Observables, Subjects et Operators

Un **Observable** ([documentation](https://rxjs.dev/guide/observable)) est une class capable d'accépter des souscriptions via une methode 
`subscribe()` qui va être déclanché
dés que l'observable reçois une nouvelle valeur.

Un **Subject** ([documentation](https://rxjs.dev/guide/subject)) est une classe qui étends la classe _Observable_
avec une methode `next()` qui permet de déclancher toutes les
souscriptions avec la valeur passer en paramétre.

C'est cette classe que vous serez le plus souvent ammener à
utiliser avec la methode `toObservable()` pour rendre un
_Observable_ à partir de ce Subject (et donc ne pas exposer la
methode `next()`)

Il existe d'autre façon de créer un observable comme par exemple
`from()` ([documentation](https://rxjs.dev/api/index/function/from))

Un **Operator** est une fonction qui sert à controller le flux
d'un _Observable_ via l'utilisation de la methode `pipe()`

Les _Operators_ les plus souvent rencontré sont `takeUntil()` ([documentation](https://rxjs.dev/api/operators/takeUntil)) 
et `switchMap()` ([documentation](https://rxjs.dev/api/index/function/switchMap))

## Angular

L'utilisation d'_Observable_ est parfois induite de certain
composant des librairies interne de Angular:

- HttpClient: ([documentation](https://angular.io/api/common/http/HttpClient#request))
- AsyncPipe: ([documentation](https://angular.io/api/common/AsyncPipe))
- ActivatedRoute: ([documentation](https://angular.io/api/router/ActivatedRoute))

# Source

- https://fr.wikipedia.org/wiki/Programmation_r%C3%A9active
- https://www.npmjs.com/package/rxjs
- https://rxjs.dev/
- https://angular.io/
