const checkDate = ({ date }) => {

  console.log("de",date.setMonth(new Date(date).getMonth() + 1));
  if (new Date(new Date(date).setMonth(new Date(date).getMonth() + 1)) < new Date(Date.now())) {
    return false;
  }
};

export default checkDate;

// new Date( new Date(Date.now()).setMonth((new Date(Date.now()).getMonth())-2)).getMonth()
