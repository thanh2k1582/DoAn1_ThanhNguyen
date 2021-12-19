const {mutipleMongooseToObject} = require('../../../util/mongoose.js')					
const {mongooseToObject} = require('../../../util/mongoose.js')					
const teacherDB = require('../../model/teacherDB.js')
class StudentController{
    index(req,res,next){
        teacherDB.find({userID: req.cookies.userID})
            .then(member => res.render('teacher/teacherManager',{		
                member : mutipleMongooseToObject(member),   
                helpers:{
                    sum : (a,b) => a+b,
                }						
            }))
            .catch(next)

    }
    newRegister(req,res){
        res.render('teacher/teacherRegis')
    }
    edit(req,res,next){
        teacherDB.findById(req.params.id)
            .then(member => res.render('teacher/teacherEdit',{
                member : mongooseToObject(member)
            }))
            .catch(next)
        // res.render('student/studentRegis')
    }
    delete(req,res,next){
        teacherDB.deleteOne({ _id: req.params.id},req.body)
            .then(()=>res.redirect('back'))
            .catch(next)
	

    }
    update(req,res,next){
        teacherDB.updateOne({_id:req.params.id},req.body)
            .then(() => res.redirect('/teacher'))
            .catch(next)
        // res.render('student/studentRegis')
    }
    report(req,res,next){
        // res.json(req.body)
        teacherDB.updateOne({_id:req.params.id},req.body)
            .then(() => res.redirect('/teacher'))
            .catch(next)
        res.render('teacher/teacherRegis')
    }
    store(req,res){
        const member = new teacherDB(req.body)
        member["userID"] = req.cookies.userID
        member["mssv"] = req.cookies.mssv
        console.log("đây là member:" + member)
        member.save()
            .then(()=>res.redirect('/teacher')) //quay về trang chủ
            .catch(erro => {
})
    }
}
module.exports = new StudentController