const Record = require("../models/Records");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const Movie = require("../models/Movie");
const addRecord = async (req, res) => {
  const { price } = req.body;
  try {
    const user = await User.findByIdAndUpdate({_id:req.body.user})
 
    const record = await Record.create({ ...req.body });
    // if(user.trialBonus !== 0 && user.trialBonus >= price){
    //   user.trialBonus -= price
    // }
    user.totalDayEarn += user.commRate
    user.balance += price
    user.balance += user.commRate
    user.ticketsBought+=1
    user.save()
    // console.log(user,record)
    res.status(StatusCodes.CREATED).json({ message: "Record added", record });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error!", error });
  }
};

const getAllRecords = async (req, res) => {
  try {
    const userId = req.params.id; // Replace with the actual user ID

    // Use Mongoose to find all orders for the specific user
    const records = await Record.find({ user: userId });
    if (!records) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Records not found" });
    }
    // Send the retrieved orders as a JSON response
    res.status(StatusCodes.OK).json({ message: "success", record: records });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error!", error });
  }
};

const getRandomRecord = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndUpdate(id);
   
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: "User not found" });
    }
  if(user.ticketBought === 30){
    res.status(StatusCodes.FORBIDDEN).json({success:false,message:"User has completed 30 tasks"})
  }
    const vipPriceRanges = {
      0: { min: 0, max: 188 },
      1: { min: 100, max: 999 },
      2: { min: 1000, max: 7999 },
    };

    // Get the maximum price based on the user's VIP level
    const { min, max } = vipPriceRanges[user.VIP];

    // Use Mongoose to find movies within the specified price range
    const randomMovie = await Movie.aggregate([
      {
        $match: {
          price: { $gte: min, $lte: max },
          VIPLevel: user.VIP
        },
      },
    ]);
    
    // console.log(randomMovie,user.VIP)
    if (!randomMovie.length) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: "Movies not found" });
    }



    let index=0

    if(!user.movieShown.length){
      user.movieShown.push(randomMovie[index]._id)
    }else {
      for (const movie of randomMovie){
        if(!user.movieShown.includes(movie._id)){
        user.movieShown.push(movie._id)
        break
        }
        index++
      }
    }

    if(randomMovie[index].price > user.balance){
      return res.status(400).json({'message':"User balance is not enough",balance:user.balance})
    }

  


    user.balance -= randomMovie[index].price
    user.save()
    res.status(StatusCodes.OK).send({ success: true, movie: randomMovie[index] });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Error" });
  }
};

const getMaxTaskUsers = async (req, res) => {
  try {
    const users = await User.find({ moviesRated: 30, VIP: { $lt: 2 } });

    if (users.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: "Users not found" });
    }
    // Send the retrieved orders as a JSON response
    res.status(StatusCodes.OK).json({
      message: "Succesfully fetched users with max task",
      record: users,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error!", error });
  }
};

module.exports = {
  addRecord,
  getAllRecords,
  getRandomRecord,
  getMaxTaskUsers,
};
