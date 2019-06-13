import * as React from "react";

class FetchCommentaires extends React.Component {
  state = {
    data: []
  };

  updateCommentaires() {
    if (this.props.getCommentaires) {
      this.props.getCommentaires().then(data => {
        this.setState({ data });
      });
    }
  }
  componentDidMount() {
    this.updateCommentaires();
  }

  onSubmit = ({ formData }) => {
    if (this.props.onSubmit) {
      this.props
        .onSubmit(formData)
        .then(json => {
          this.setState({
            data: json
          });
        })
        .catch(function(error) {
          alert("Impossible de soumettre le commentaire");
          throw e;
        });
    }
  };

  onDelete = comment => {
    if (this.props.onDelete) {
      this.props.onDelete(comment.id).then(json => {
        this.setState({
          data: json
        });
      });
    }
  };

  render() {
    return this.props.render({
      onSubmit: this.onSubmit,
      data: this.state.data,
      onDelete: this.onDelete
    });
  }
}

export default FetchCommentaires;
