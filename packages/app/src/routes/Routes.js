import { Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./Auth";

const routes = [
  {
    Component: require("~/pages/mandataires/mesures/[mesure_id]/accept")
      .default,
    path: "/mandataires/mesures/:mesure_id(\\d+)/accept",
  },
  {
    Component: require("~/pages/services/mesures/[mesure_id]/accept").default,
    path: "/services/mesures/:mesure_id(\\d+)/accept",
  },
  {
    Component: require("~/pages/admin/etablissements/add").default,
    path: "/admin/etablissements/add",
  },
  {
    Component: require("~/pages/mandataires/add-mesures").default,
    path: "/mandataires/add-mesures",
  },
  {
    Component: require("~/pages/services/add-mesures").default,
    path: "/services/add-mesures",
  },
  {
    Component: require("~/pages/admin/tribunaux/add-tribunal").default,
    path: "/admin/tribunaux/add-tribunal",
  },
  {
    Component: require("~/pages/admin/liste-blanche/ajout-individuel").default,
    path: "/admin/liste-blanche/ajout-individuel",
  },
  {
    Component: require("~/pages/direction/liste-blanche/ajout-individuel")
      .default,
    path: "/direction/liste-blanche/ajout-individuel",
  },
  {
    Component: require("~/pages/admin/liste-blanche/ajout-prepose").default,
    path: "/admin/liste-blanche/ajout-prepose",
  },
  {
    Component: require("~/pages/direction/liste-blanche/ajout-prepose").default,
    path: "/direction/liste-blanche/ajout-prepose",
  },
  {
    Component: require("~/pages/admin/liste-blanche/ajout-service").default,
    path: "/admin/liste-blanche/ajout-service",
  },
  {
    Component: require("~/pages/direction/liste-blanche/ajout-service").default,
    path: "/direction/liste-blanche/ajout-service",
  },
  {
    Component: require("~/pages/services/antennes/[antenne_id]").default,
    path: "/services/antennes/:antenne_id(\\d+)",
  },
  {
    Component: require("~/pages/admin/api-logs/[api_log_id]").default,
    path: "/admin/api-logs/:api_log_id(\\d+)",
  },
  {
    Component: require("~/pages/application/authorization").default,
    path: "/application/authorization",
  },
  {
    Component: require("~/pages/mandataires/mesures/[mesure_id]/close").default,
    path: "/mandataires/mesures/:mesure_id(\\d+)/close",
  },
  {
    Component: require("~/pages/services/mesures/[mesure_id]/close").default,
    path: "/services/mesures/:mesure_id(\\d+)/close",
  },
  {
    Component: require("~/pages/admin/editors/create").default,
    path: "/admin/editors/create",
  },
  {
    Component: require("~/pages/direction/enquetes/create").default,
    path: "/direction/enquetes/create",
  },
  {
    Component: require("~/pages/services/antennes/create").default,
    path: "/services/antennes/create",
  },
  {
    Component: require("~/pages/admin/liste-blanche/[id]/delete").default,
    path: "/admin/liste-blanche/:id(\\d+)/delete",
  },
  {
    Component: require("~/pages/admin/users/[user_id]/delete").default,
    path: "/admin/users/:user_id(\\d+)/delete",
  },
  {
    Component: require("~/pages/magistrats/mesures/[mesure_id]/delete").default,
    path: "/magistrats/mesures/:mesure_id(\\d+)/delete",
  },
  {
    Component: require("~/pages/mandataires/mesures/[mesure_id]/delete")
      .default,
    path: "/mandataires/mesures/:mesure_id(\\d+)/delete",
  },
  {
    Component: require("~/pages/services/mesures/[mesure_id]/delete").default,
    path: "/services/mesures/:mesure_id(\\d+)/delete",
  },
  {
    Component: require("~/pages/direction/donnees-demographiques").default,
    path: "/direction/donnees-demographiques",
  },
  {
    Component: require("~/pages/mandataires/mesures/[mesure_id]/edit").default,
    path: "/mandataires/mesures/:mesure_id(\\d+)/edit",
  },
  {
    Component: require("~/pages/services/antennes/[antenne_id]/edit").default,
    path: "/services/antennes/:antenne_id(\\d+)/edit",
  },
  {
    Component: require("~/pages/services/mesures/[mesure_id]/edit").default,
    path: "/services/mesures/:mesure_id(\\d+)/edit",
  },
  {
    Component: require("~/pages/direction/edit-informations").default,
    path: "/direction/edit-informations",
  },
  {
    Component: require("~/pages/magistrats/edit-informations").default,
    path: "/magistrats/edit-informations",
  },
  {
    Component: require("~/pages/mandataires/edit-informations").default,
    path: "/mandataires/edit-informations",
  },
  {
    Component: require("~/pages/services/edit-informations").default,
    path: "/services/edit-informations",
  },
  {
    Component: require("~/pages/admin/editors/[editor_id]").default,
    path: "/admin/editors/:editor_id(\\d+)",
  },
  {
    Component: require("~/pages/direction/edit-password").default,
    path: "/direction/edit-password",
  },
  {
    Component: require("~/pages/magistrats/edit-password").default,
    path: "/magistrats/edit-password",
  },
  {
    Component: require("~/pages/mandataires/edit-password").default,
    path: "/mandataires/edit-password",
  },
  {
    Component: require("~/pages/services/edit-password").default,
    path: "/services/edit-password",
  },
  {
    Component: require("~/pages/direction/enquetes/[enquete_id]/reponse/[enquete_reponse_id]")
      .default,
    path:
      "/direction/enquetes/:enquete_id(\\d+)/reponse/:enquete_reponse_id(\\d+)",
  },
  {
    Component: require("~/pages/account/forgot-password").default,
    path: "/account/forgot-password",
  },
  {
    Component: require("~/pages/admin/etablissements/[id]").default,
    path: "/admin/etablissements/:id(\\d+)",
  },
  {
    Component: require("~/pages/admin/liste-blanche/[id]").default,
    path: "/admin/liste-blanche/:id(\\d+)",
  },
  {
    Component: require("~/pages/admin/liste-blanche/services/[id]").default,
    path: "/admin/liste-blanche/services/:id(\\d+)",
  },
  {
    Component: require("~/pages/direction/liste-blanche/[id]").default,
    path: "/direction/liste-blanche/:id(\\d+)",
  },
  {
    Component: require("~/pages/direction/liste-blanche/services/[id]").default,
    path: "/direction/liste-blanche/services/:id(\\d+)",
  },
  {
    Component: require("~/pages/mandataires/enquetes/[enquete_id]/import")
      .default,
    path: "/mandataires/enquetes/:enquete_id(\\d+)/import",
  },
  {
    Component: require("~/pages/services/enquetes/[enquete_id]/import").default,
    path: "/services/enquetes/:enquete_id(\\d+)/import",
  },
  {
    Component: require("~/pages/mandataires/import-mesures").default,
    path: "/mandataires/import-mesures",
  },
  {
    Component: require("~/pages/services/import-mesures").default,
    path: "/services/import-mesures",
  },
  { Component: require("~/pages/admin/index").default, path: "/admin" },
  {
    Component: require("~/pages/admin/api-logs/index").default,
    path: "/admin/api-logs",
  },
  {
    Component: require("~/pages/admin/editors/index").default,
    path: "/admin/editors",
  },
  {
    Component: require("~/pages/admin/etablissements/index").default,
    path: "/admin/etablissements",
  },
  {
    Component: require("~/pages/admin/liste-blanche/index").default,
    path: "/admin/liste-blanche",
  },
  {
    Component: require("~/pages/admin/services/index").default,
    path: "/admin/services",
  },
  {
    Component: require("~/pages/admin/tribunaux/index").default,
    path: "/admin/tribunaux",
  },
  {
    Component: require("~/pages/admin/users/index").default,
    path: "/admin/users",
  },
  {
    Component: require("~/pages/direction/index").default,
    path: "/direction",
  },
  {
    Component: require("~/pages/direction/enquetes/index").default,
    path: "/direction/enquetes",
  },
  {
    Component: require("~/pages/direction/enquetes/[enquete_id]/index").default,
    path: "/direction/enquetes/:enquete_id(\\d+)",
  },
  {
    Component: require("~/pages/direction/liste-blanche/index").default,
    path: "/direction/liste-blanche",
  },
  {
    Component: require("~/pages/inscription/index").default,
    path: "/inscription",
  },
  {
    Component: require("~/pages/magistrats/index").default,
    path: "/magistrats",
  },
  {
    Component: require("~/pages/magistrats/gestionnaires/[gestionnaire_id]/index")
      .default,
    path: "/magistrats/gestionnaires/:gestionnaire_id",
  },
  {
    Component: require("~/pages/mandataires/index").default,
    path: "/mandataires",
  },
  {
    Component: require("~/pages/mandataires/enquetes/[enquete_id]/index")
      .default,
    path: "/mandataires/enquetes/:enquete_id(\\d+)",
  },
  {
    Component: require("~/pages/mandataires/mesures/[mesure_id]/index").default,
    path: "/mandataires/mesures/:mesure_id(\\d+)",
  },
  {
    Component: require("~/pages/services/index").default,
    path: "/services",
  },
  {
    Component: require("~/pages/services/enquetes/[enquete_id]/index").default,
    path: "/services/enquetes/:enquete_id(\\d+)",
  },
  {
    Component: require("~/pages/services/mesures/[mesure_id]/index").default,
    path: "/services/mesures/:mesure_id(\\d+)",
  },
  {
    Component: require("~/pages/direction/informations").default,
    path: "/direction/informations",
  },
  {
    Component: require("~/pages/magistrats/informations").default,
    path: "/magistrats/informations",
  },
  {
    Component: require("~/pages/mandataires/informations").default,
    path: "/mandataires/informations",
  },
  {
    Component: require("~/pages/services/informations").default,
    path: "/services/informations",
  },
  {
    Component: require("~/pages/signup/invitation").default,
    path: "/signup/invitation",
  },
  {
    Component: require("~/pages/direction/mandataires/list").default,
    path: "/direction/mandataires/list",
  },
  { Component: require("~/pages/login").default, path: "/login" },
  {
    Component: require("~/pages/magistrats/map").default,
    path: "/magistrats/map",
  },
  {
    Component: require("~/pages/mandataires/map").default,
    path: "/mandataires/map",
  },
  {
    Component: require("~/pages/services/map").default,
    path: "/services/map",
  },
  {
    Component: require("~/pages/services/members").default,
    path: "/services/members",
  },
  {
    Component: require("~/pages/magistrats/mesures/[mesure_id]").default,
    path: "/magistrats/mesures/:mesure_id(\\d+)",
  },
  {
    Component: require("~/pages/magistrats/mesures").default,
    path: "/magistrats/mesures",
  },
  {
    Component: require("~/pages/mandataires/mesures").default,
    path: "/mandataires/mesures",
  },
  {
    Component: require("~/pages/services/mesures").default,
    path: "/services/mesures",
  },
  {
    Component: require("~/pages/mandataires/mesures/[mesure_id]/reactivate")
      .default,
    path: "/mandataires/mesures/:mesure_id(\\d+)/reactivate",
  },
  {
    Component: require("~/pages/services/mesures/[mesure_id]/reactivate")
      .default,
    path: "/services/mesures/:mesure_id(\\d+)/reactivate",
  },
  {
    Component: require("~/pages/magistrats/gestionnaires/[gestionnaire_id]/reservation")
      .default,
    path: "/magistrats/gestionnaires/:gestionnaire_id/reservation",
  },
  {
    Component: require("~/pages/account/reset-password").default,
    path: "/account/reset-password",
  },
  {
    Component: require("~/pages/admin/services/[service_id]").default,
    path: "/admin/services/:service_id(\\d+)",
  },
  {
    Component: require("~/pages/application/token-request").default,
    path: "/application/token-request",
  },
  {
    Component: require("~/pages/admin/users/[user_id]").default,
    path: "/admin/users/:user_id(\\d+)",
  },
];

const publicRoutes = [
  {
    Component: require("~/pages/login").default,
    path: "/login",
  },
  {
    Component: require("~/pages/signup").default,
    path: "/signup",
  },
  {
    Component: require("~/pages/signup/invitation").default,
    path: "/signup/invitation",
  },
  {
    Component: require("~/pages/inscription").default,
    path: "/inscription",
  },
  {
    Component: require("~/pages/account/reset-password").default,
    path: "/account/reset-password",
  },
  {
    Component: require("~/pages/account/forgot-password").default,
    path: "/account/forgot-password",
  },
  {
    Component: require("~/pages/application/authorization").default,
    path: "/application/authorization",
  },
  {
    Component: require("~/pages/application/token-request").default,
    path: "/application/token-request",
  },
  {
    Component: require("~/pages/stats/[departement_code]").default,
    path: "/stats/:departement_code",
  },
  { Component: require("~/pages/stats/index").default, path: "/stats" },
  {
    Component: require("~/pages/politique-confidentialite").default,
    path: "/politique-confidentialite",
  },
  {
    Component: require("~/pages/signup/index").default,
    path: "/signup",
  },
  {
    Component: require("~/pages/mentions-legales").default,
    path: "/mentions-legales",
  },
  {
    Component: require("~/pages/conditions-utilisation").default,
    path: "/conditions-utilisation",
  },
  {
    Component: require("~/pages/signup/congratulation").default,
    path: "/signup/congratulation",
  },
];

function Routes() {
  return (
    <Switch>
      {publicRoutes.map(({ path, Component, exact = true }) => {
        return (
          <Route key={path} path={path} exact={exact}>
            <Component />
          </Route>
        );
      })}
      <PrivateRoute>
        {routes.map(({ path, Component, exact = true }) => {
          return (
            <Route key={path} path={path} exact={exact}>
              <Component />
            </Route>
          );
        })}
      </PrivateRoute>
    </Switch>
  );
}

export default Routes;
