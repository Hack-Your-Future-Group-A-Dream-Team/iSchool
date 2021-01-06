const UserModel = require('../models/User');

const saveFavorite = async(req, res) => {

    try {
        const userid = req.body.userid;
        const user = await UserModel.findById(userid);
        if (user === null) {
            return res.status(500).json({ res: `User with id ${userid} is not found over the database` });
        }
        const newFavorites =  req.body.listOfSchools;
        const results = await UserModel.updateOne({_id:userid}, {$set:{listOfSchools: newFavorites}, });
        
        return res.status(200).json({ res: results });

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

module.exports = { saveFavorite: saveFavorite, getFavorites: getFavorites };