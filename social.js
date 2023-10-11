// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    this.currentID++;
    this.users[this.currentID] = {
      "id": this.currentID,
      "name": name
    };
    this.follows[this.currentID] = new Set();
    return this.currentID;
  }

  getUser(userID) {
    return this.users[userID] || null;
    
    // let user = this.users[userID];
    // if (user) return user;
    // return null;
  }

  follow(userID1, userID2) {
    // Your code here
  }

  getFollows(userID) {
    // Your code here
  }

  getFollowers(userID) {
    // Your code here
  }

  getRecommendedFollows(userID, degrees) {
    // Your code here
  }
}

module.exports = SocialNetwork;