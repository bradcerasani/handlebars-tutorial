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

  // Custom Function Helper - Grader
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

  var templateScriptThree = $('#student').html();
  var templateThree = Handlebars.compile(templateScriptThree);

  $('.grader-results').append(templateThree(user))

  // Custom Block Helper
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

  var templateScriptFour = $('#student-scores').html();
  var templateFour = Handlebars.compile(templateScriptFour);

  $('.student-score-results').append(templateFour(students))

});
