// This file contains the valid status changes allowed for each user type
module.exports = {
  Researcher: {
    "RIS approval": true,
    "Associate Dean approval": true
  },
  RIS: {
    "Researcher approval": true,
    "Researcher amendment": true,
  },
  Dean: {
    "Researcher amendment": true,
    "Project approved": true,
  },
  "Associate Dean": {
    "Dean approval": true,
    "Researcher amendment": true
  }
}
