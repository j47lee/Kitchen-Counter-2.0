var Recipe = require('../app/models/recipe.js');

module.exports = function(userIngArray, user){

  Recipe.find({}, function(err,recipes){

    // clears matches array every time in case user ingredients were deleted
    user.matches = [];
    user.save();

    // loop through each recipe
    for (var i = 0; i < recipes.length; i++) {

          var totalmatches = 0;
          var recipeIngArray = recipes[i].ingredients.split(",");
          // loop through each ingredient in one recipe
          for (var j = 0; j < recipeIngArray.length; j++) {
              // loop through each ingredient of the user
              for (var k = 0; k < userIngArray.length; k++) {
                if (recipeIngArray[j] == userIngArray[k]) {
                  // console.log('ingredients match', recipeIngArray[j], userIngArray[k]);
                  totalmatches++;
                } else {
                }
              } // end k for loop user ingredients
          } // end j for loop each recipe ingredients

          // comparison totalmatches results
          if (totalmatches/recipeIngArray.length === 1) {
          console.log('Recipe matches:--------------', recipes[i].title);
          user.matches.push(recipes[i]);
          // console.log('-----user matches', user.matches, i);
          // console.log('----user', user);
          user.save();
          }

    } // end i loop each recipe
    // console.log(user.matches);
    // return user.matches
  });// end Recipe.find

};
