const service = require('./gacha-service');

async function play(req,res,next){
  try{
    const { userId, userName } = req.body;

    const result = await service.play(userId,userName);

    res.status(200).json({
      message: result
    });
  }catch(err){
    next(err);
  }
}

async function history(req,res,next){
  try{
    const data = await service.history(req.params.userId);
    res.json(data);
  }catch(err){
    next(err);
  }
}

module.exports = {
  play,
  history
};
