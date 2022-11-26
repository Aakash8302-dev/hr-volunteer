import Student from '../../../models/studentModel'
import connectDB from '../../../utils/connectDB'


export default async function StudentApi(req,res){
    await connectDB();

    if(req.method === "GET"){

        const student = await Student.find({});

        if(student){
            res.status(200).json(student);
        }
        
    }else if(req.method === "POST"){

        try {
            const {name,regNo, dept, companies} = req.body;

            const exists = await Student.find({regNo: regNo})

            if(exists.length > 0){
                throw new Error("User already exists");
            }else{
                const newStudent = await Student.create({
                    name,
                    regNo,
                    dept,
                    companies,
                })
    
                if(newStudent){
                    res.status(200).json(newStudent)
                }
            }

        } catch (error) {
            res.json({
                error:error.message
            });
        }
    }else if(req.method === "PUT"){

        try {
            const {name, dept, regNo,companies} = req.body;

            const studentFound = await Student.find({regNo: regNo});
    
            if(studentFound){
                const updatedStudent = await Student.findByIdAndUpdate(studentFound[0]._id, {
                    "companies": companies
                })   
    
                res.json(updatedStudent);
            }else{
                throw new Error("Student Not Found")
            }
        } catch (error) {
            res.status(400).json({
                error:error.message
            });
        }
    }
}