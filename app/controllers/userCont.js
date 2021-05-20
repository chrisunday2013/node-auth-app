exports.all.Access = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.tutorBoard = (req, res) => {
  res.status(200).send("Tutor Content.");
};


exports.studentBoard = (req, res) => {
  res.status(200).send("Student Content.");
};



