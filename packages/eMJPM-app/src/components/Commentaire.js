const Commentaire = () => (
    <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1"><b>Ajoutez vos notes </b></label>
        <textarea className="form-control" id="exampleFormControlTextarea1" placeholder={"Ecrivez votre note"} rows="3" style={{boxShadow: "3px 3px"}}> </textarea>
        <br />
        <button type="button" style={{color: "white",backgroundColor: "#e69a0e",boxShadow: "3px 3px grey"}} className="btn btn-warning">Enregistrer</button>
   <hr />
        <div style={{backgroundColor: "#b5b5b5",fontSize: "0.8em"}}> Elle préfère qu'on l'appelle entre 9h et 10h. <br /></div>

    </div>

);

export default Commentaire;