import Campground from '../models/campground.js';
import Review from '../models/review.js'
import UserModel from '../models/user.js';


export const save = async (newUser) => {
    console.log(newUser)
    const { email, username, password } = newUser;
        const user = new UserModel({ email, username });
        const registeredUser = await UserModel.register(user, password);
    // Saving the new campground to the database
    const savedUser = await user.save();
    console.log(`user in service , the saved one ${registeredUser}`)
    return registeredUser;
  }