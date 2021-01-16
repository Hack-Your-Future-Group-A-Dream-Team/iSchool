const UserModel = require('../models/User');

const saveFavorite = async(req, res) => {

    try {
        const userid = req.body.userid;
        const user = await UserModel.findById(userid);

        if (user === null) {
            return res.status(500).json({ res: `User with id ${userid} is not found over the database` });
        }

        const newFavorite =  req.body.listOfSchools;
        
        user.listOfSchools.push(newFavorite)
        //remove dublicates
        user.listOfSchools = [...new Map(user.listOfSchools.map(item => [item._id, item])).values()]
       
        await user.save()

        return res.status(200).json({ newFav: newFavorite });

    } catch (e) {
        return res.status(500).json({
            res: 'Error when adding favorite schools'
        })
    }

}

const getFavorites = async(req, res) => {

    try {
        if (req.query.userid === null || req.query.userid === undefined) {
            return res.status(500).json({ error: 'User is not defined' });
        }
        const user = await UserModel.findOne({ _id: req.query.userid});
        const listOfSchools=user.listOfSchools

        res.status(200).json({ favorites: listOfSchools });

    } catch (e) {

        console.log(e);
        return res.status(500).json({ error: 'Error fetching favorites' });

    }
}

const deleteFavorite = async(req, res) => {

    try {
        const userid = req.body.userid;
        const user = await UserModel.findById(userid);

        if (user === null) {
            return res.status(500).json({ res: `User with id ${userid} is not found over the database` });
        }

        const schoolToRemove =  req.body.schoolId;

        const results = await UserModel.findByIdAndUpdate(userid, {
                                                            $pull: {listOfSchools: {_id:schoolToRemove}}
                                                        }, {safe: true, upsert: true});
    
    return res.status(200).json({ removed: results });

    } catch (e) {
        return res.status(500).json({
            res: 'Error when removing a favorite school'
        })
    }

}

module.exports = { saveFavorite: saveFavorite, getFavorites: getFavorites, deleteFavorite:deleteFavorite };