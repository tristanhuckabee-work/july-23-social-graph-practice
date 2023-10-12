// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};
    // this.users = new Set();
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    // Your code here
    this.currentID++
    let user = {
      id: this.currentID,
      name: name
    }
    this.users[this.currentID] = user;
    let follows = new Set();
    this.follows[this.currentID] = follows;

    return this.currentID;
  }

  getUser(userID) {
    // Your code here
    return this.users[userID] || null;

    // console.log(Object.keys(this.users));
    // console.log(Object.keys(this.users).includes(`${userID}`))
    // if (!this.users[userID]) {
    // if (!Object.keys(this.users).includes(`${userID}`)) {
    //   return null;
    // }
    // return this.users[userID]
  }

  follow(userID1, userID2) {
    // Your code here
    // let set = this.follows[userID1];
    // let user2 = this.users[userID2];

    // if (set && user2) {
    //   set.add(userID2);
    //   return true;
    // } else {
    //   return false;
    // }

    if (this.users[userID1] && this.users[userID2]) {
      this.follows[userID1].add(userID2);
      return true;
    }
    return false;
  }

  getFollows(userID) {
    // Your code here
    return this.follows[userID];
    // return this.follows[userID] || new Set();
  }

  getFollowers(userID) {
    // Your code here
    let followers = new Set();

    for (let id in this.follows) {
      let currSet = this.follows[id];
      if (currSet.has(userID)) {
        // followers.add(Number(id));
        // followers.add(parseInt(id));
        followers.add(+id);
      }
    }
    return followers;
  }

  getRecommendedFollows(userID, degrees) {
    // Your code here
    let res = new Set();         // []
    let queue = [[userID]]; // [1, 2, 3]
    // let visited = new Set([userID])
    let visited = new Set(); //{1,2, 3}
    visited.add(userID);

    while (queue.length > 0) {
      let currPath = queue.shift();            // [1, 2]
      let curr = currPath[currPath.length - 1] // 2

      if (currPath.length > degrees + 2) break;
      if (currPath.length > 2) res.add(curr);
      
      for (let f of this.follows[curr]) { // 3
        if (!visited.has(f)) {
          visited.add(f);
          queue.push([...currPath, f]); // [1, 2, 3]
        }
      }
    }

    return Array.from(res);
  }
}

module.exports = SocialNetwork;