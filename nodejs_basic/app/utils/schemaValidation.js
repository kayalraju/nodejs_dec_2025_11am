const joi=require('joi');

const studentSchema=joi.object({
    name:joi.string().min(3).max(30).required(),
    phone:joi.string().min(10).max(10).required(),
    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }),
    password:joi.string().min(8).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})


const productSchema=joi.object({
    name:joi.string().min(3).max(30).required(),
    description:joi.string().min(3).max(30).required(),
    price:joi.number().required(),
    image:joi.string().required(),
})

module.exports={studentSchema,productSchema}