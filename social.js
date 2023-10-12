// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
    this.followers = {};
  }

  addUser(name) {
    this.currentID++;
    this.users[this.currentID] = {
      "id": this.currentID,
      "name": name
    };
    this.follows[this.currentID] = new Set();
    this.followers[this.currentID] = new Set();
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
    if (!this.users[userID2]) {
      return false;
    } else {
      this.follows[userID1].add(userID2);
      this.followers[userID2].add(userID1);
      return true;
    }
  }

  getFollows(userID) {
    // Your code here
    return this.follows[userID];

    // if (this.follows[userID]) {
    //   return this.follows[userID];
    // }
    // return [];
  }

  getFollowers(userID) {
    // Your code here
    // return this.followers[userID];
    const follow = new Set();
    if (this.users[userID]) {
      // const follow = [];
      for (let ele in this.follows) {
        if (this.follows[ele].has(userID)) {
          // follow.push(Number(ele));
          follow.add(parseInt(ele));
        }
      }
      // return new Set(follow);
    }
    // return new Set();
    return follow;
  }

  getRecommendedFollows(userID, degrees) {
    // Your code here
    let recs = [];
    let queue = [[userID]];
    let visited = new Set([userID])

    while (queue.length) {
      let currPath = queue.shift();
      let currNode = currPath[currPath.length - 1];

      if (currPath.length > degrees + 2) break;
      if (currPath.length > 2) recs.push(currNode);

      for (let f of this.follows[currNode]) {
        if (!visited.has(f)) {
          visited.add(f);
          queue.push([...currPath, f])
        }
      }
    }
    return recs;
  }
}

module.exports = SocialNetwork;