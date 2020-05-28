const {Router} = require('express');
const Hero = require('../models/hero');
const router = Router();
const formidable = require('formidable');
const fs = require('fs');

// http://localhost:5000/api/...

router.post("/heroes", async (req, res) => {
    try{
        const form = new formidable.IncomingForm();
        form.uploadDir = "./uploads";
        form.maxFieldsSize = 10 * 1024 * 1024; //10MB
        form.keepExtensions = true;
        form.multiples = true;
        await form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(500).json({message: "Ошибка при загрузке"})
            }

            // const hero = createHero(fields)

            const {nickname, real_name, origin_description, superpowers, catch_phrase} = fields;
            let hero = new Hero({nickname, real_name, origin_description, superpowers, catch_phrase});
            if (files.file) {
                // путь к картинке..
                const images = files.file.path.split("\\")[1];
                hero = new Hero({nickname, real_name, origin_description, superpowers, catch_phrase, images});
                await hero.save(function(err){
                    if(err) {
                        fs.unlinkSync(`./uploads/${images}`);
                        return  res.status(422)
                    }
                });
            }

            res.status(201).json(hero)
        })
    }catch (e){
        res.status(500).json({message: e})
    }
});

router.put("/heroes/:_id", async (req, res) => {
    try{
        const { _id } = req.params;
        const form = new formidable.IncomingForm();
        form.uploadDir = "./uploads";
        form.maxFieldsSize = 10 * 1024 * 1024; //10MB
        form.keepExtensions = true;
        form.multiples = true;
        await form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(500).json({message: "Ошибка при загрузке"})
            }
            const {nickname, real_name, origin_description, superpowers, catch_phrase} = fields;
            if (files.file) {
                // путь к картинке..
                const images = files.file.path.split("\\")[1];
                await Hero.findOneAndUpdate(
                    { _id },
                    { $push: { images: [images] } },
                )
            }

        await Hero.findOneAndUpdate(
                { _id },
                { $set: {
                        nickname: nickname,
                        real_name: real_name,
                        origin_description: origin_description,
                        superpowers: superpowers,
                        catch_phrase: catch_phrase,
                    }},
                { returnOriginal: false },
                (err, result) => {
                    if (err) return console.log(err);
                }
            );

            res.status(201).json("Hero saved!")
        })

    }catch (e){
        res.status(500).json({message: "Try again..."})
    }
});


router.get("/heroes", async (req, res) => {
    const perPage = 5;
    const page = req.query.currentPage || 1;
    try{
        let totalHeroes = Number;
        await Hero.countDocuments({}, (err, count) => {
            totalHeroes = count
        });

        const allHeroes = await Hero.find({}).skip(perPage * page - perPage).limit(perPage);
        res.json({heroes: allHeroes, pages: totalHeroes})
    }catch (e){
        res.status(500).json({message: "Try again..."})
    }
});

router.delete("/heroes/:_id", async (req, res) => {
    try{
        const {_id} = req.params;

        await Hero.findOne({ _id }).then(hero => {
            hero.images.map(img => {
                return fs.unlinkSync(`./uploads/${img}`)
            })
        });

       await Hero.findOneAndRemove({_id}).then(hero => res.json(hero))
    }catch(e) {
        res.status(500).json({message: "Try again..."})
    }
});

router.delete("/heroes/:_id/image/:imageName", async(req, res) => {
    try{
        const {_id, imageName} = req.params;

        fs.unlinkSync(`./uploads/${imageName}`);

        await Hero.findOneAndUpdate(
            {_id},
            { $pull: {
                images: imageName
                }}
            ).then(hero => res.json(hero))

    }catch(e){
        res.status(500).json({message: "Try again..."})
    }
});

module.exports = router;