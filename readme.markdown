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

Wrap Handlebars templates in script tag:

```
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

```
<script id="people-list" type="text/x-handlebars-template">
  {{#each people}}
    <li>{{ firstName }} {{ lastName }}</li>
  {{/each}}
</script>
```

Since we are passing the people object as an *array* of objects, we can use a block helper and reference the people directly:

```
<script id="people-list" type="text/x-handlebars-template">
  {{#people}}
    <li>{{ firstName }} {{ lastName }}</li>
  {{/people}}
</script>
```

#### 3. Handlebars Compile Function

Two-step execution:

1. Compile template with `Handlebars.compile(template)` (returns JS function)
2. Invoke data object passed to it (returns HTML string with interpolated object values inserted into HTML)

Sumamry: `Handlebars.compile(template)` returns a JS function. We then use this compiled function to execute the data object and return a string with HTML and interpolated object values. We can then insert this into our HTML.

#### Example:

```
<script id="person" type="text/x-handlebars-template">
  <h1>{{ firstName }} {{ lastName }}</h1>
</script>
```

```js
var person = {
  firstName: "Betty",
  lastName: "White"
}

var templateScript = $('#person').html();
var template = Handlebars.compile(templateScript);

$('header').append(template(person));
```

**Result:**

```html
<header>
  <h1>Betty White</h1>
</header>
```

### Handlebars Syntax

#### Expressions

```js
{{ content }}
```

#### Comments

```js
{{! this is a Handlebars comment }}

<!-- regular HTML comments will be in the output -->
```

#### Blocks

Standard block syntax:

```js
{{#each}}
  Something
{{/each}}
```

if block:

```js
{{#if somethingIsTrue}}
  Yep, that's true.
{{/if}}
```

#### Paths (with dot notation)

A path is a property lookup. If we have a _name_ property that contains an object, we can use nested paths (dot notation) to lookup any property.

```js
var obj = {
  name: {
    firstName: "Betty",
    lastName: "White"
  }
}
```

```
{{ name.firstName }}
```

#### Parent Path

Handlebars has a parent path `../` to lookup properties on parents of the current context.

```js
// This is ugly as sin.

var people = {
  groupName: "celebrities",
  users: [
    {
      name: {
        firstName: "Michael",
        lastName: "Jordan"
      }
    },
    {
      name: {
        firstName: "Betty",
        lastName: "White"
      }
    }
  ]
};
```

We can use the parent path `../` to get the groupName property:

```
<script id="people-list" type="x-handlebars-template">
  {{#users}}
    <li>{{ name.firstName }} {{ name.lastname }} is in the {{../groupName }} group.</li>
  {{/users}}
</script>
```

#### Context

Handlebars refers to the object you passed to its function as the _context_.

#### Triple Stash {{{ ... }}} for Non-Escaped HTML

`{{ ... }}` will output escaped HTML
`{{{ ... }}}` will output un-escaped HTML

#### Partials (sub-templates)

To render a section of a template within a larger template, use partials.

```
{{> description}}
```

Registering a partial:

```js
Handlebars.registerPartial("description", $("#person-description").html());
```

### Helpers (Conditionals and Loops)

















