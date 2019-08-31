import cookie from "cookie";
import PropTypes from "prop-types";
import React from "react";
import initApollo from "./init-apollo";

function parseCookies(req, options = {}) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie, options);
}

export default App => {
  return class Apollo extends React.Component {
    static propTypes = {
      apolloState: PropTypes.object.isRequired
    };

    static async getInitialProps(context) {
      const { ctx } = context;

      const { req, res } = ctx;

      const apollo = initApollo(
        {
          serviceId: "",
          antenneId: ""
        },
        {
          getToken: () => parseCookies(req).token
        }
      );

      ctx.apolloClient = apollo;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      if (res && res.finished) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        return {};
      }

      // Extract query data from the Apollo store
      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState
      };
    }

    constructor(props) {
      super(props);
      // `getDataFromTree` renders the component first, the client is passed off as a property.
      // After that rendering is done using Next's normal rendering pipeline
      this.apolloClient = initApollo(props.apolloState, {
        getToken: () => parseCookies().token
      });
    }

    render() {
      return <App apolloClient={this.apolloClient} {...this.props} />;
    }
  };
};
