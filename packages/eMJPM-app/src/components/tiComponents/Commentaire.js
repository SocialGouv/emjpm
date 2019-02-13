import fetch from "isomorphic-fetch";
import Form from "react-jsonschema-form";

const schema = {
  type: "object",
  required: ["comment"],
  properties: {
    comment: { type: "string", title: "message", default: "" }
  }
};

const API_URL = process.env.API_URL;

const formData = {};

const uiSchema = {
  comment: {
    "ui:widget": "textarea"
  }
};

class Commentaire extends React.Component {
  state = {
    data: [],
    datamesure: "",
    updatemessage: ""
  };

  componentDidMount() {
    const url = `${API_URL}/api/v1/mandataires/${this.props.currentMandataire.id}/commentaires`;
    fetch(url, {
      credentials: "include",
      method: "GET",
      headers: {
        "Access-Control-Allow-Credentials": "true",
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          data: json
        });
      });
  }
  updateState(e) {
    this.setState({ updatemessage: e.target.value });
  }

  onSubmit = ({ formData }) => {
    const url = `${API_URL}/api/v1/mandataires/${this.props.currentMandataire.id}/commentaires`;
    fetch(url, {
      credentials: "include",
      method: "POST",
      headers: {
        "Access-Control-Allow-Credentials": "true",
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        comment: formData.comment
      })
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          data: json
        });
      })
      .catch(function(error) {});
  };

  onDelete = comment => {
    const url = `${API_URL}/api/v1/mandataires/${this.props.currentMandataire.id}/commentaires/${
      comment.id
    }`;
    fetch(url, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Credentials": "true",
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          data: json
        });
      });
  };

  render() {
    return (
      <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1">
          <b>
            Ajoutez vos notes (ces dernières seront uniquement accessibles aux utilisateurs de votre
            TI){" "}
          </b>
        </label>
        {/*<textarea className="form-control" id="exampleFormControlTextarea1" placeholder={"Ecrivez votre note"} rows="3" style={{boxShadow: "3px 3px"}}> </textarea>*/}
        <br />
        <Form
          className="form__commentaire"
          schema={schema}
          formData={formData}
          uiSchema={uiSchema}
          onSubmit={this.onSubmit}
        >
          <div style={{ textAlign: "left", paddingBottom: "10px" }}>
            <button
              type="submit"
              style={{
                color: "white",
                backgroundColor: "#43b04a",
                boxShadow: "3px 3px grey"
              }}
              className="btn"
            >
              Enregistrer
            </button>
          </div>
        </Form>

        <hr />
        <div style={{ overflow: "scroll", height: "250px" }} data-cy="tab-comment">
          {this.state.data &&
            this.state.data.map &&
            this.state.data.map(comment => (
              <div id={comment.id}>
                <div style={{ backgroundColor: "#b5b5b5", fontSize: "0.8em" }}>
                  {comment.comment} <br />
                </div>
                Ajouté le : {comment.created_at.slice(0, 10)}{" "}
                <a type="submit" onClick={() => this.onDelete(comment)}>
                  {" "}
                  supprimer
                </a>
                <br />
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Commentaire;
