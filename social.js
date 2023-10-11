// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    this.currentID += 1;
    let newUser = {
      'id': this.currentID,
      'name': name
    }
    this.users[newUser.id] = newUser;
    this.follows[this.currentID] = new Set();
    return this.currentID;
  }

  getUser(userID) {
    return this.users[userID] ? this.users[userID] : null;
  }

  follow(userID1, userID2) {
    let follows = this.follows[userID1];
    if (follows) {
      if (follows.has(userID2))   return false;
      if (!this.getUser(userID2)) return false;
      this.follows[userID1].add(userID2);
      return true;
    }
    return false;
  }

  getFollows(userID) {
    return this.follows[userID];
  }

  getFollowers(userID) {
    let followers = new Set();
    for (let f in this.follows) {
      if (this.follows[f].has(userID)) {
        followers.add(Number(f));
      }
    }
    return followers;
  }

  getRecommendedFollows(userID, degrees) {
    let recs = [];
    let queue = [[userID]];
    let visited = new Set();
    visited.add(userID);

    while (queue.length) {
      let path = queue.shift();
      let id = path[path.length - 1];

      if (path.length > degrees + 2) break;

      if (path.length > 2) recs.push(id);

      for (let f of this.follows[id]) {
        if (!visited.has(f)) {
          visited.add(f);
          queue.push([...path, f])
        }
      }
    }
    return recs;
  }
}

module.exports = SocialNetwork;