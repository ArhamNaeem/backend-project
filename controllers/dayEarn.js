const moment = require('moment');
const User = require('../models/User'); // Import your user model

const updateUserDayEarn = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const currentDate = moment();
    const currentDay = currentDate.date();

    if (!user.lastEarnedDate || !moment(user.lastEarnedDate).isSame(currentDate, 'day') || !moment(user.lastEarnedDate).isSame(currentDate,'month') || !moment(user.lastEarnedDate).isSame(currentDate, 'year') ) {
      user.totalDayEarn = 0; 
    }

    // const earning = req.body.earning;

    // user.totalDayEarn += earning;

    user.lastEarnedDate = currentDate.toDate();

    await user.save();

    return res.status(200).json({success:true, user });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getUserDayEarn = async (req,res)=>{
    try {
        const userId = req.params.userId;
    
        const user = await User.findById(userId);
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

       res.status(200).json({success:true,dayEarn:user.totalDayEarn})

    }catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
      }    
}


module.exports = { updateUserDayEarn,getUserDayEarn };
