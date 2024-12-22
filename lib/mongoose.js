import mongoose from "mongoose";
//Ce fichier est utiliser pour permettre a uun api de se connecter a la base de donnees ,
//On aurrait pu gerer ca directement dans les api maisn vu quon allait le reutiliser plusieur fois, on a prefere le creer son fichier special

export async function initMongoose() {

    //juste la pour eviter qua chaque fois quune page se charge ou se recharge, la connection se refasse

  //connecte pour la premiere fois 
  await mongoose.connect(process.env.MONGODB_URI);
}
