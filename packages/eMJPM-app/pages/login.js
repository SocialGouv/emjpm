import fetch from "isomorphic-fetch";
import Form from "react-jsonschema-form";
import styled from "styled-components";
import Router from "next/router";
import FooterBottom from "../src/components/FooterBottom"

import Navigation from "../src/components/Navigation";
import Footer from "../src/components/Footer";

// todo: move to _document.js
import "bootstrap/dist/css/bootstrap.css";
import "../static/css/hero.css";
import "../static/css/panel.css";
import "../static/css/footer.css";
import "../static/css/custom.css";

const schema = {
  title: "Se connecter",
  type: "object",
  required: ["username","password"],
  properties: {
    username: { type: "string", title: "", default: "" },
    password: { type: "string", title: "", default: "" },
    // done: {
    //   type: "boolean",
    //   title: " se souvenir de mes informations ",
    //   default: false
    // }
  }
};

const uiSchema =  {
    password: {
        "ui:placeholder": "Mot de passe",
        "ui:widget": "password",
        "ui:options": {
            label: false
        }// could also be "select"
    },
    username: {
        "ui:placeholder": "Identifiant",
        "ui:options": {
            label: false
        }
    }
};

//const formData = {};

const LoginBox = styled.div`
  text-align: center;
  background-size: cover;
  heigth: 60%;
  background-color: #cccccc;
  width: 60%;
  margin: 0 auto;
  margin-top:50px
  padding-top: 70px;
  padding-botttom: 70px;
`;

const Title = styled.div`
  text-align: left;
  font-size: 2em;
  padding-bottom: 15px;
  font-weight: bold;
`;

const FormWrapper = styled.div`
  text-align: center;
  background-size: cover;
  heigth: 30% !important;
  background-color: white;
  width: 50%;
  margin: 0 auto;
  margin-bottom: 70px;
  border: black 1px;
  border-style: solid;
  border-radius: 10px;
  padding: 10px;
  padding-right: 30%;
  display: inline-block;
`;

const FormContent = styled.div`
  text-align: left;
  padding-bottom: 10px;
`;

const API_URL = process.env.API_URL;

const doLogin = formData => {
    const url = `${API_URL}/auth/login`;
    return fetch(url, {
        credentials: "include",
        method: "POST",
        headers: {
            //  Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
        .then(res => {
            console.log(res)
            if (res.status > 400) {
                // unauthorized
                throw new Error(res.status);
            }

            return res.json();
        })
        .then(json => {
            console.log(json.url)
            Router.push(json.url);
        });
};

class LoginIndex extends React.Component {
    state = {
        error: null,
        formData: {}
    };

    onSubmit = ({ formData }) => {
        this.setState(
            {
                error: null,
                formData
            },
            () => {
                doLogin(formData).catch(e => {
                    this.setState({
                        error: "Impossible de se connecter"
                    });
                });
            }
        );
    };

  render() {
    return (
      <div className="container" >
          <div className="offset-3 col-6">
          <Title>Espace professionnels</Title>
          <div className="jumbotron" style={{backgroundColor: "white"}}>
              <div className="col-6">
                  <Form schema={schema} uiSchema={uiSchema} formData={this.state.formData} onSubmit={this.onSubmit}>

                      <FormContent>
                          {this.state.error && (
                              <div className="alert alert-danger" role="alert">
                                  {this.state.error}
                              </div>
                          )}
                          <div style={{paddingLeft: "20px"}}>
                          <button type="submit" className="btn btn-success">
                              Me connecter
                          </button>
                          </div>
                      </FormContent>
                  </Form>
              </div>
          </div>
          </div>


        <div
          style={{
            position: "fixed",
            width: "100%",
            bottom: "0"
          }}
        >
        </div>
      </div>
    );
  }
}

const Apprender = () => (
    <div>
        <Navigation />
        <div style={{ overflowY: "auto",backgroundColor: "#cad4de",minHeight: "1000px"}}>
        <br />
            <LoginIndex />
        </div>
        <FooterBottom />
    </div>
);

export default Apprender;