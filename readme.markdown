# Handlebars.js Study

These are my notes from following [Learn Everything about Handlebars.js Javascript Templating](http://javascriptissexy.com/handlebars-js-tutorial-learn-everything-about-handlebars-js-javascript-templating/).

### Why use templating?

- decouples JS and HTML for easier and more reliable file management
- most JS front-end frameworks use a templaing engine, many use Handlebars.js

### When to use templating

- anytime you use JS front-end framework
- app views updated frequently (via REST API or client input)
- multiple tech stacks process the same data
- much interactivity. very responsive

### Why Handlebars.js?

Handlebars is an extension of Mustache; it supercedes Mustache.js.

- advanced, feature-rich, active community
- logic-less templating
- cutting-edge frameworks like Meteor.js and Derby.js use Handlebars or Handlebars derivatives.

### The 3 Components of Handlebars Templating

#### 1. Handlebars.js Expressions

- Basic: `{{ content }}`
- Block: `{{#each}} Stuff {{/each}}`
- w/HTML: `<h1>{{ pageTitle }}</h1>`

**Wrap Handlebars templates in script tag:**

```html
<script id="header" type="text/x-handlebars-template">
  <li>{{ firstName }}</li>
</script>
```

#### 2. Data/Context

Pass data as a JS object to the Handlebars function. Data object (context) can be comprised of arrays, objects, strings, numbers, or any combination of these.

If the data object has an *array* of objects, you can use Handlebars `{{#each}}` helper to iterate the array, and the current context is set to each item in the array.

```js
var data = {
  people: [
    {
      firstName: "Michael",
      lastName: "Jordan",
      age: 20
    },
    {
      firstName: "Betty",
      lastName: "White",
      age: 150
    }
  ]
};
```

```html
<script id="people-list" type="text/x-handlebars-template">
{{#each people}}
  <li>{{ firstName }} {{ lastName }}</li>
{{/each}}
</script>
```

Since we are passing the people object as an *array* of objects, we can use a block helper and reference the people directly:

```html
<script id="people-list" type="text/x-handlebars-template">
{{#people}}
  <li>{{ firstName }} {{ lastName }}</li>
{{/people}}
</script>
```

#### 3. Handlebars Compile Function

Two-step execution:

1. Compile template with `Handlebars.compile(template)`
2. Invoke data object passed to it (returns HTML string with interpolated object values inserted into HTML)




