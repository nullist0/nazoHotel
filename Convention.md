# Code Convention

## 1. In JavaScript

- Naming Variables

```
- Method : Camel Casing
- Parameters in Method : Camel Casing
```

- Indentation

```
- Indent Style : K&R
- Defualt Space : 4 spaces
```

- Comments

```
- Defualt : Must put Comment at Not-Overrided Methods.
- Contents : Description, Paramters, Returns.
```

- Examples

```js
/**
 * Do something on x,y
 * @param {int} x is value of x-axis.
 * @param {int} y is value of y-axis.
 * @returns {void}
 */
function dosomething(x, y){
    if(x == y){
        something();
    }
    else if(x > y){
        something();
    }
    else{
        something();
    }
}
```