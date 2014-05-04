$(function() {

  // The List of Shoes
  var shoesData = {
    allShoes: [
      {
        name: "Nike",
        price: 199.00,
        color: "black",
        size: 10
      },
      {
        name: "Loafers",
        price: 59.00,
        color: "blue",
        size: 9
      },
      {
        name: "Wing Tip",
        price: 259.00,
        color: "brown",
        size: 11
      }
    ]
  };

  var templateScript = $('#shoe-template').html();
  var template = Handlebars.compile(templateScript);

  Handlebars.registerPartial("description", $("#shoe-description").html());

  $(".shoesNav").append(template(shoesData));

  // The List of Celebrities
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

  var templateScriptTwo = $('#people-list').html();
  var templateTwo = Handlebars.compile(templateScriptTwo);

  $('.people').append(templateTwo(people))

});
