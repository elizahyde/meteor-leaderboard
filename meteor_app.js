Players = new Meteor.Collection('players')


if (Meteor.isClient) {
  Template.leaderboard.players = function() {
    return Players.find({}, {sort: {score: -1, name: 1 }});
  };

  Template.player.selected = function() {
    return Session.equals("selected_player", this._id) ? "selected" : "";
  };

  Template.player.events({
    'click': function() {
      Session.set("selected_player", this._id);
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function() {
    if (Players.find().count() === 0) {
      var names = [ "Ada Lovelace", "Grace Hopper", "Marie Curie"];
      for (var i = 0; i < names.length; i++)
        Players.insert({name: names[i],
                        score: Math.floor(Random.fraction()*10)*5});
    }
  });
}
