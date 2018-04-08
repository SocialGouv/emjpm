import RowModal from "./RowModal";
import fetch from "isomorphic-fetch";
import Modal from "react-modal";
import "bootstrap/dist/css/bootstrap.css";
import "../../static/css/hero.css";
import "../../static/css/panel.css";
import "../../static/css/footer.css";
import "../../static/css/custom.css";
import Form from "react-jsonschema-form";


const schema = {
    type: "object",
    required: [],
    properties: {
        co_comment: { type: "string", title: "message", default: "" }
    }

};

const formData = {};




class Commentaire extends React.Component {
    state = {
        data: [],
        datamesure: [],
        updatemessage: ""
    };

    componentDidMount() {
        const url = "http://localhost:3005/api/v1/commentaires/index";
        fetch((url), {
            method: "POST",
            headers: {
                'Access-Control-Allow-Credentials': 'true',
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
            mandataire_id: this.props.currentMandataire.mandataire_id,
            user_id:1
            })
        })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    data: json
                });
            });
    }
    updateState(e) {
        this.setState({updatemessage: e.target.value});
    }

    onSubmit = ({formData}) => {
        const url = "http://localhost:3005/api/v1/commentaires";
        fetch((url), {
            method: "POST",
            headers: {
                'Access-Control-Allow-Credentials': 'true',
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                co_comment: formData.co_comment,
                mandataire_id: this.props.currentMandataire.mandataire_id,
                user_id: 1
            })
        })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    datamesure: json
                });
            })
    };

    onUpdate = ({comment}) => {
        const url = "http://localhost:3005/api/v1/commentaires";
        fetch((url), {
            method: "PUT",
            headers: {
                'Access-Control-Allow-Credentials': 'true',
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                co_id: comment.id,
                co_comment: this.state.updatemessage
            })
        })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    datamesure: json
                });
            });
    };


    onDelete = (comments) => {
        const url = "http://localhost:3005/api/v1/commentaires";
        fetch((url), {
            method: "DELETE",
            headers: {
                'Access-Control-Allow-Credentials': 'true',
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                co_id: comments.co_id
            })
        })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    datamesure: json
                });
            });
    };

    render() {

        const formData = {
            co_comment: `${this.state.data}`,
        };

        return (
<div className="form-group">
<label htmlFor="exampleFormControlTextarea1"><b>Ajoutez vos notes </b></label>
{/*<textarea className="form-control" id="exampleFormControlTextarea1" placeholder={"Ecrivez votre note"} rows="3" style={{boxShadow: "3px 3px"}}> </textarea>*/}
<br />
    <Form
        schema={schema}
        formData={formData}
        onSubmit={this.onSubmit}
   >

        <div style={{ textAlign: "left", paddingBottom: "10px" }}>
            <button type="submit" style={{
                color: "white",
                backgroundColor: "#e69a0e",
                boxShadow: "3px 3px grey"
            }} className="btn btn-warning">
                Enregistrer
            </button>
        </div>
    </Form>

<hr />
    {this.state.data.map(comments => (

        <div>
        <div style={{backgroundColor: "#b5b5b5", fontSize: "0.8em"}}> {comments.co_comment} <br /></div>
        <button type="submit" onClick={() => this.onDelete(comments)}> supprimer </button>

            <div>
                <input type = "text" value = {comments.co_comment}
                       onChange = {e => this.updateState(e)} />
                <button type="submit" onClick={() => this.onUpdate(comments)}> supprimer </button>
            </div>

        </div>
    ))}
</div>

        )
    }
};

export default Commentaire;