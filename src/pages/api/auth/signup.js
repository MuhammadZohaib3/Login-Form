import { save } from "../../../../services/user";



export default function handler(req, res) {
    if(req.method!== "POST") {
        res.status(404).send();

    }
   const { email, password } = req.body;
   try {
     save(email,password);
    res.status(201).json();
   }catch(err) {
    res.status(400).json({message : err});
   }
 
  };
  