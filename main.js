$(function() {

  var shoesData = [
    {
      name: "Nike",
      price: 199.00
    },
    {
      name: "Loafers",
      price: 59.00
    },
    {
      name: "Wing Tip",
      price: 259.00
    }
  ];

  var templateScript = $('#shoe-template').html();

  var template = Handlebars.compile(templateScript);

  $(".shoesNav").append(template(shoesData));

});
