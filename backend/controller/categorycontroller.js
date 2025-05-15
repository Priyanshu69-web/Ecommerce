import categorymodel from "../models/categorymodel.js";
import slugify from "slugify";


export const createCategoryController =async (req,res)=>{
    try{
        const {name}=req.body;
          if(!name){
            return res.status(401).send({message:"Name is required"});

          }
          const existingCategory =await categorymodel.findOne({name});
          if(existingCategory){
            return res.status(200).send({
                success:false,
                message:"Category Already Exists",
            });
          }
          const category =await new categorymodel({
            name,
            slug:slugify(name),
          }).save();
          res.status(201).send({
            success:true,
            message:"new category created",
            category,
          });

    } catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"error in category",
        })
    }

};

export const categorycontroller =async (req,res)=>{
    try{
        const category =await categorymodel.find({});
        res.status(200).send({
            success:true,
            message:"all category list",
            category,
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"error while getting all categories",
        });
    }
};

export const updateCategoryController=async (req,res)=>{
    try{
        const {name}=req.body;
        const{id}=req.params;
        const category =await categorymodel.findByIdAndUpdate(
            id,
            {name, slug:slugify(name)},
            {new:true}

        );
        res.status(200).send({
            success:true,
            message:"category updated successfully",
            category,
        });

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error while updating category ",
            error,
        });
    }
};

export const sinlgeCategoryController =async (req,res)=>{
    try{
        const category =await categorymodel.findOne({slug:req.params.slug});
        res.status(200).send({
            success:true,
            message:"get single category successfully",
            category,

        });


    } catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"error while sinlge category",
        });

    }
};

export const delteCategoryConstroller=async (req,res)=>{
    try{
        const {id}=req.params;
        await categorymodel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:"category deleted successfully",

        });

    } catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error while deleteing category",
            error, 
        });
    }
}