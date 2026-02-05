const Recipes=require("../models/recipe")
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const filename= Date.now() + '-' +  file.fieldname 
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })

const getRecipes=async(req,res)=>{
   const recipes=await Recipes.find()
   return res.json(recipes)
}

const getRecipe=async(req,res)=>{
    const recipe=await Recipes.findById(req.params.id)
    res.json(recipe)

   
}
const addRecipe = async (req, res) => {
    console.log(req.user);
    const { title, ingredients, instructions, time } = req.body;

    if (!title || !ingredients || !instructions) {
        return res.status(400).json({ message: "Required fields cannot be empty" });
    }

    try {
        const newRecipe = await Recipes.create({
            title,
            ingredients,
            instructions,
            time,
            coverImage: req.file.filename,
            createdBy:req.user.id
        });

        return res.status(201).json(newRecipe);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

const editRecipe=async(req,res)=>{
    const{title,ingredients,instructions,time}=req.body
    let recipe=await Recipes.findById(req.params.id)
    try{
        if(recipe)
        {
            await Recipes.findByIdAndUpdate(req.params.id,{...req.body,coverImage:req.file.filename},{new:true})
            res.json({title,ingredients,instructions,time})
        }
    }
    catch(err)
    {
        return res.status(404).json({message:"error"})
    }

}
const delRecipe=async(req,res)=>{
    
  try {
    const recipe = await Recipes.findByIdAndDelete(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    return res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};




module.exports={getRecipes,getRecipe,addRecipe,editRecipe,delRecipe,upload}