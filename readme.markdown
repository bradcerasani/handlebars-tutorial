# Handlebars.js Study

These are my notes from [Learn Everything about Handlebars.js JavaScript Templating](http://javascriptissexy.com/handlebars-js-tutorial-learn-everything-about-handlebars-js-javascript-templating/).

### Why use templating?

- decouples JS and HTML for easier and more reliable file management
- most JS front-end frameworks use a templating engine, many use Handlebars.js

### When to use templating

- anytime you use JS front-end framework
- app views updated frequently (via REST API or client input)
- multiple tech stacks process the same data
- much interactivity. very responsive

### Why Handlebars.js?

Handlebars is an extension of Mustache; it supersedes Mustache.js

- advanced, feature-rich, active community
- logic-less templating
- cutting-edge frameworks like Meteor.js and Derby.js use Handlebars or Handlebars derivatives.

## The 3 Components of Handlebars Templating

### 1. Handlebars.js Expressions

- Basic: `{{ content }}`
- Block: `{{#each}} Stuff {{/each}}`
- w/HTML: `<h1>{{ pageTitle }}</h1>`

Wrap Handlebars templates in script tag:

```
<script id="header" type="text/x-handlebars-template">
  <h1>{{ firstName }}</h1>
</script>
```

### 2. Data/Context

Pass data as a JS object to the Handlebars function. Data object (context) can be comprised of arrays, objects, strings, numbers, or any combination of these.

If the data object has an *array* of objects, you can use Handlebars `{{#each}}` helper to iterate the array, and the current context is set to each item in the array.

```js
var data = {
  people: [
    {
      firstName: "Michael",
      lastName: "Jackson",
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

### 3. Handlebars Compile Function

Two-step execution:

1. Compile template with `Handlebars.compile(template)` (returns JS function)
2. Invoke data object passed to it (returns HTML string with interpolated object values inserted into HTML)

Summary: `Handlebars.compile(template)` returns a JS function. We then use this compiled function to execute the data object and return a string with HTML and interpolated object values. We can then insert this into our HTML.

### Example:

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

###### Result:

```html
<header>
  <h1>Betty White</h1>
</header>
```

## Handlebars Syntax

### Expressions

```
{{ content }}
```

### Comments

```
{{! this is a Handlebars comment }}
<!-- regular HTML comments will be in the output -->
```

### Blocks

Standard block syntax:

```
{{#each}}
  Something
{{/each}}
```

if block:

```
{{#if somethingIsTrue}}
  Yep, that's true.
{{/if}}
```

### Paths (with dot notation)

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

### Parent Path

Handlebars has a parent path `../` to lookup properties on parents of the current context.

```js
var people = {
  groupName: "celebrities",
  users: [
    {
      name: {
        firstName: "Michael",
        lastName: "Jackson"
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
  <div>{{ name.firstName }} {{ name.lastname }} is in the {{../groupName }} group.</div>
{{/users}}
</script>
```

### Context

Handlebars refers to the object you passed to its function as the _context_.

### Triple Stash {{{ ... }}} for Non-Escaped HTML

`{{ ... }}` will output escaped HTML

`{{{ ... }}}` will output un-escaped HTML

### Partials (sub-templates)

To render a section of a template within a larger template, use partials.

```
{{> description}}
```

Registering a partial:

```js
Handlebars.registerPartial("description", $("#person-description").html());
```

## Built-In Helpers (Conditionals and Loops)

As we learned earlier, handlebars is a logic-less templating engine. We use helpers for executing logic.

### Each Helper

The `{{#each}}` helper allows you to iterate over an array or object.

```js
var fruits = {
  allFruits: ["Tangerine", "Mango", "Banana"]
}
```

```
<script id="fruits-template" type="x-handlebars-template">
{{#each allFruits}}
  <li>{{ this }}</li>
{{/each}}
</script>
```

###### Result:

```html
<li>Tangerine</li>
<li>Mango</li>
<li>Banana</li>
```

If the data object passed to the `each` helper is _not_ an array, the entire object is the current context and we use the `this` keyword.

```js
var people = {
  firstName: "Betty",
  lastName: "White"
};
```

As opposed to this:

```js
var people = {
  customers: {
    {
      firstName: "Betty",
      lastName: "White"
    }
  }
}
```

We use the `this` keyword:

```
{{#each this}}
<li>{{ firstName }} {{ lastName }}</li>
{{/each}}
```

We can also use nested properties with the `each` helper:

```js
// gross example
var fruits = {
  allFruits: [
    {
      fruitName: "Tangerine",
      naitiveTo: [
        {
          country: "Venezuela"
        }
      ]
    },
    {
      fruitName: "Mango"
    }
  ]
};
```

```
{{#each allFruits}}
<li>{{ fruitName }} {{ naitiveTo.0.country }}</li>
{{/each}}
```

###### Result:

```html
<li>Tangerine Venezuela</li>
<li>Mango</li>
```

### If Helper

The `{{#if}}` helper works like a regular `if` statement, except it __does not accept any conditional logic__. It checks for truthy values such as true and non-empty/non-null values.


Check `value.length` to catch cases where an array might be empty:

```
<div class="user-data">
{{#if userActive.length}}
  Welcome, {{ firstName }}
{{/if}}
</div>
```

### Else Helper

```
<div class="user-data">
{{#if userActive.length}}
  Welcome, {{ firstName }}
{{else}}
  Please log in.
{{/if}}
</div>
```

### Unless Helper

The `{{#unless}}` helper is best used if you _only_ want to check for **falsy** values.

```
<div class="user-data">
{{#unless userLoggedIn}}
  Please log in.
{{/unless}}
</div>
```

### With Helper

The `{{#with}}` helper allows us to target a specific property of the object. You probably won't use it much.

```js
var people = {
  groupName: "celebrities",
  celebrity: {
    firstName: "Betty",
    lastName: "White"
  }
}
```

We can use `{{#with}}` block to target the groupName property where we need access to its values:

```
<script id="people-list" type="text/x-handlebars-template">
<h1>{{ groupName }} Group</h1>
<ul>
{{#with celebrity}}
  <li>{{ firstName }} {{ lastName }}</li>
{{/with}}
</ul>
</script>
```

###### Result:

```html
<h1>Celebrities Group</h1>
<ul>
  <li>Betty White</li>
</ul>
```

## Custom Helpers

Custom helpers allow us to use any kind of JavaScript logic. We register custom helpers before the rest of the Handlebars.js code.

Two types:

1. function helper
2. block helper

### Custom Function Helpers

Custom function helper that executes conditional logic:

```js
var user = {
  name: "Betty",
  score: 85
}

Handlebars.registerHelper("grader", function(score) {
  console.log("Grade: " + score);

  if(score >= 90) {
    return "A";
  } else if (score >= 80 && score < 90) {
    return "B";
  } else if (score >= 70 && score <80) {
    return "C";
  } else {
    return "D";
  }
});
```

```
<script id="student" type="text/x-handlebars-template">
<li>{{ name }} got a {{ grader score }}.</li>
</script>
```

### Custom Block Helpers

When we register a custom block helper, Handlebars automatically adds an `options` object as the last parameter in the callback function. The `options` object has a `fn` method, a `hash` object, and an `inverse` method.

#### options.fn

`options.fn` takes an object (your data) as a parameter that it uses as the context inside the custom helper block template.

```js
var students = [
  {
    firstName: "Betty",
    lastName: "White",
    score: [22, 34, 45, 67]
  },
  {
    firstName: "Michael",
    lastName: "Jackson",
    score: [10, 34, 67, 90]
  }
];

Handlebars.registerHelper("studentScore", function(students, options) {
  var templateWithData = "";

  for (var i = students.length - 1; i >= 0; i--) {
    students[i].score = students[i].score.reduce(function(prev, cur, index, array) {
      return prev + cur;
    });
    templateWithData += options.fn(students[i]);
  }
  return templateWithData;
});
```

```
<script id="student-scores" type="text/x-handlebars-template">
{{#studentScore this}}
  <li>{{ firstName }} {{ lastName }}, your total score is <b>{{ score }}</b></li>
{{/studentScore}}
</script>
```

###### Result:

```html
<li>Betty White, your total score is <b>201</b></li>
<li>Michael Jackson, your total score is <b>168</b></li>
```

#### options.inverse

`options.inverse` is used as the `else` section of any block statement. You use `options.fn` when the expression in the callback is truthy, and `options.inverse` when it is falsey.

#### options.hash

Handlebars expressions take not only strings and variables as arguments, but key-value pairs as well. Use spaces to separate key-value pairs, **not** commas.

```
{{#hashExample firstName="Betty" lastName="White" age="150"}}
```

```js
Handlebars.registerHelper("hashExample", function(object, options) {
  console.log(JSON.stringify(options.hash));
});
```

###### Result:

```html
firstName:"Betty",lastName:"White",age:150
```

## Four Ways to Add/Load Templates

### 1. Script Tags

Fastest and simplest, however **least** desirable.

```
<script id="my-template" type="text/x-handlebars-template">
{{ content }}
</script>
```

#### Pros

- quick to setup and use

#### Cons

- terrible to maintain
- poor memory management in large-scale applications
- cannot be precompiled (all compiling done in in-browser)

### 2. Custom Function

You can place all of your templates in HTML files (without the `<script>` tag) and load/compile in one go.

Function by [koorchik](http://stackoverflow.com/users/1067068/koorchik) on StackOverflow.

```js
function render(tmpl_name, tmpl_data) {
    if ( !render.tmpl_cache ) {
        render.tmpl_cache = {};
    }

    if ( ! render.tmpl_cache[tmpl_name] ) {
        var tmpl_dir = '/static/templates';
        var tmpl_url = tmpl_dir + '/' + tmpl_name + '.html';

        var tmpl_string;
        $.ajax({
            url: tmpl_url,
            method: 'GET',
            async: false,
            success: function(data) {
                tmpl_string = data;
            }
        });

        render.tmpl_cache[tmpl_name] = _.template(tmpl_string);
    }

    return render.tmpl_cache[tmpl_name](tmpl_data);
}
```

```js
var rendered_html = render('template', object);
```

#### Pros

- templates can be kept in separate files
- lightweight
- versatile (facilitates use of precompiled and uncompiled templates)

#### Cons

- unknown

### 3. AMD + Require.js

AMD is a specification for loading modules and their dependencies asynchronously. We use a `define()` function to register our modules and dependencies (including templates) and Require.js will load our templates.

```js
var userTemplate = "text!templates/user_template.html";

define(['jquery', 'handlebars', userTemplate], function($, Handlebars, UserTemplate) {
  userTemplateDataObject: {
    firstName: "Betty",
    lastName: "White"
    age: 150
  },
  userTemplateCompiled: Handlebars.compile(userTemplate),
  render: function() {
    this.$(".user-template-container").html(this.userTemplateCompiled(userTemplateDataObject));
  }
});
```

#### Pros

- templates can be kept in separate files
- good organization with AMD module
- works well in collaborative environments
- Require.js can concat files to reduce HTTP requests

#### Cons

- steep learning curve

### 4. Precompile Templates

With `<script>` tag and AMD/Require.js methods, Handlebars has to compile templates on the client side (bad). To reduce latency and speed up page execution, Handlebars has a Node.js module to precompile your templates.

See [Handlebars Docs](http://handlebarsjs.com/precompilation.html) for more.

#### Pros

- precompiled template files are JS, can be minified and concatenated
- better performance

#### Cons

- requires Node.js installed (is that really a con?)
- making changes to files is a two-step process (change HTML, run compile script)



[Try Handlebars](http://tryhandlebarsjs.com/)
